import { inject } from 'inversify';
import { BaseController } from '../../controller/baseController.js';
import { Component } from '../../types/components.enum.js';
import { Logger } from '../../logger/logger.interface.js';
import { OfferService } from '../offer/offerService.interface.js';
import { CommentService } from './commentService.interface.js';
import { HttpMethods } from '../../types/enums.js';
import { CreateEntityRequest } from '../../types/createEntityRequest.js';
import { CommentDto } from './commentDto.js';
import { HttpError } from '../../rest/httpError.js';
import { StatusCodes } from 'http-status-codes';
import { fillDTO } from '../../utils/common.js';
import { CommentRdo } from './commentRdo.js';
import { Response, Request } from 'express';
import { OfferIdParams } from '../../types/offerIdParams.js';

export class CommentController extends BaseController {

    constructor(
        @inject(Component.Logger) protected readonly logger: Logger,
        @inject(Component.OfferService) private readonly offerService: OfferService,
        @inject(Component.CommentService) private readonly commentService: CommentService
    ) {
        super(logger);

        this.logger.info('CommentController\'s route register');

        this.addRoute({
            path: '/',
            method: HttpMethods.Get,
            handler: this.create,
        });

        this.addRoute({
            path: '/comments/:offerId',
            method: HttpMethods.Get,
            handler: this.showComments
        });
    }

    public async create({body}: CreateEntityRequest<CommentDto>, res: Response): Promise<void> {

        if(! this.offerService.isExisted(body.offerId)) {
            throw new HttpError(
                StatusCodes.NOT_FOUND,
                `Comment with ${body} was not found`,
                'CommentController'
            );
        }

        const comment = await this.commentService.create(body);
        this.created(res, fillDTO(CommentRdo, comment));
    }

    public async showComments({ params }: Request<OfferIdParams>, res: Response): Promise<void> {

        if (!this.offerService.isExisted(params.offerId)) {
            throw new HttpError(
                StatusCodes.NOT_FOUND,
                `Offer with ${params.offerId} was not found`,
                'OfferController'
            );
        }
        const comments = await this.commentService.findByOfferId(params.offerId);
        this.ok(res, fillDTO(CommentRdo, comments));
    }
}
