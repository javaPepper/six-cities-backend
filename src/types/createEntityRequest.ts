import { Request } from 'express';
import { RequestParams } from './requestParamsType.js';
import { RequestBody } from './requestBodyType.js';

export type CreateEntityRequest<T> = Request<RequestParams, RequestBody, T>;
