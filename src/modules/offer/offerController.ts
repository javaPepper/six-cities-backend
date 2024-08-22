import { inject, injectable } from 'inversify';
import { BaseController } from '../../controller/baseController.js';
import { Component } from '../../types/components.enum.js';
import { Logger } from '../../logger/logger.interface.js';
import { HttpMethods } from '../../types/enums.js';
import { Request, Response } from 'express';
import { HttpError } from '../../rest/httpError.js';
import { StatusCodes } from 'http-status-codes';
import { OfferIdParams } from '../../types/offerIdParams.js';
import { OfferService } from './offerService.interface.js';
import { fillDTO } from '../../utils/common.js';
import { OfferRdo } from './offerRdo.js';
import { CreateEntityRequest } from '../../types/createEntityRequest.js';
import { OfferDto } from './offerDto.js';

@injectable()
export class OfferController extends BaseController {
    constructor(
        @inject(Component.Logger) protected readonly logger: Logger,
        @inject(Component.OfferService) private readonly offerService: OfferService,
    ) {
        super(logger);

        this.logger.info('OfferController\'s route register');

        this.addRoute({
            path: '/:offerId',
            method: HttpMethods.Get,
            handler: this.show,
        });

        this.addRoute({
            path: '/',
            method: HttpMethods.Get,
            handler: this.showOffers
        });
    }

    public async show({ params }: Request<OfferIdParams>, res: Response): Promise<void> {
        const { offerId } = params;
        const offer = this.offerService.findByOfferId(offerId);

        if (!offer) {
            throw new HttpError(
                StatusCodes.NOT_FOUND,
                `Offer with ${offerId} was not found`,
                'OfferController'
            );
        }
        this.ok(res, fillDTO(OfferRdo, offer));
    }

    public async showOffers(_req: Request, res: Response): Promise<void> {
        const offers = await this.offerService.find();

        this.ok(res, fillDTO(OfferRdo, offers));
    }

    public async create({ body }: CreateEntityRequest<OfferDto>, res: Response): Promise<void> {
        const result = await this.offerService.create(body);
        const offer = await this.offerService.findByOfferId(result.id);

        this.created(res, fillDTO(OfferDto, offer));
    }
}
