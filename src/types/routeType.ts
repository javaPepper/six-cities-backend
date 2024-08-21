import { Response, Request, NextFunction } from 'express';
import { HttpMethods } from './enums.js';
import { Middleware } from '../rest/middleware/middleware.interface.js';

export type Route = {
    path: string;
    method: HttpMethods;
    handler: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void;
    middlewares?: Middleware[]
}
