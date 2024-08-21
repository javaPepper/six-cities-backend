import { Request, Response, NextFunction } from 'express';

export interface Middleware {
    execute(res: Response, req: Request, next: NextFunction): void;
}
