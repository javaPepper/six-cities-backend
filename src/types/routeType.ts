import { Response, Request, NextFunction } from 'express';
import { HttpMethods } from './enums.js';

export type Route = {
    path: string;
    method: HttpMethods;
    handler: (req: Request, res: Response, next: NextFunction) => void;
}
