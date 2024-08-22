import { inject, injectable } from 'inversify';
import { ExceptionFilter } from './exceptionFilter.interface.js';
import { Component } from '../../types/components.enum.js';
import { Logger } from '../../logger/logger.interface.js';
import { Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { setErrorObject } from '../../utils/common.js';
import { ApplicationError } from './errors.enum.js';

@injectable()
export class AppExceptionFilter implements ExceptionFilter {
    constructor(
        @inject(Component.Logger) private readonly logger: Logger
    ) {
        this.logger.info('ExceptionFilter\'s registration');
    }

    public catch(err: Error, _req: Request, res: Response, _next: NextFunction): void {
        this.logger.error(err.message, err);
        res
            .status(
                StatusCodes.INTERNAL_SERVER_ERROR
            )
            .json(setErrorObject(ApplicationError.ServiceError, err.message));
    }
}
