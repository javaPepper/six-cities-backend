import { injectable } from 'inversify';
import { Controller } from '../types/controllerType.js';
import { Response, Router } from 'express';
import { Logger } from '../logger/logger.interface.js';
import { Route } from '../types/routeType.js';
import { StatusCodes } from 'http-status-codes';

@injectable()
export abstract class BaseController implements Controller {

    private readonly DEFAULT_CONTENT_TYPE = 'application/json';
    private readonly _router!: Router;

    constructor(
        protected readonly logger: Logger
    ) {
        this._router = Router();
    }

    get router() {
        return this._router;
    }

    public addRoute(route: Route): void {
        this.router[route.method](route.path, route.handler.bind(this));
        this.logger.info(`Route registered: ${route.method.toUpperCase()} ${route.path}`);
    }

    public send<T>(res: Response, statusCode: number, data: T): void {
        res
            .type(this.DEFAULT_CONTENT_TYPE)
            .status(statusCode)
            .json(data);
    }

    public ok<T>(res: Response, data: T): void {
        this.send(res, StatusCodes.OK, data);
    }

    public noContent<T>(res: Response, data: T): void {
        this.send(res, StatusCodes.NO_CONTENT, data);
    }

    public created<T>(res: Response, data: T): void {
        this.send(res, StatusCodes.CREATED, data);
    }
}
