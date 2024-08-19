import { inject, injectable } from 'inversify';
import { BaseController } from '../../controller/baseController.js';
import { Component } from '../../types/components.enum.js';
import { Logger } from '../../logger/logger.interface.js';
import { Config } from '../../appConfig/config.interface.js';
import { Schema } from '../../appConfig/schema.js';
import { UserService } from './userService.interface.js';
import { Response } from 'express';
import { CreateEntityRequest } from '../../types/createEntityRequest.js';
import { HttpError } from '../../rest/httpError.js';
import { StatusCodes } from 'http-status-codes';
import { fillDTO } from '../../utils/common.js';
import { UserRdo } from './rdo/userRdo.js';
import { HttpMethods } from '../../types/enums.js';
import { LoginUserRequest } from '../../types/loginUserRequest.js';
import { CreateUserDto } from './dto/createUserDto.js';

@injectable()
export class UserController extends BaseController {
    constructor(
        @inject(Component.Logger) protected readonly logger: Logger,
        @inject(Component.Config) private readonly config: Config<Schema>,
        @inject(Component.UserService) private readonly userService: UserService
    ) {
        super(logger);
        this.logger.info('UserController\'s route registration');
        this.addRoute({ path: '/register', method: HttpMethods.Post, handler: this.create });
    }

    public async create(
        { body }: CreateEntityRequest<CreateUserDto>,
        res: Response
    ): Promise<void> {
        const existedUser = await this.userService.findByEmail(body.email);

        if (existedUser) {
            throw new HttpError(
                StatusCodes.CONFLICT,
                `The user with email ${body.email} already exists`,
                'UserController'
            );
        }

        const result = await this.userService.create(body, this.config.get('SALT'));
        this.created(res, fillDTO(UserRdo, result));
    }

    public async login(
        { body }: LoginUserRequest,
        _res: Response
    ): Promise<void> {
        const existedUser = await this.userService.findByEmail(body.email);

        if(!existedUser) {
            throw new HttpError(
                StatusCodes.UNAUTHORIZED,
                `User with email ${body.email} was not found`,
                'UserController'
            );
        }

        throw new HttpError(
            StatusCodes.NOT_IMPLEMENTED,
            'Not implemented',
            'UserController'
        );
    }
}
