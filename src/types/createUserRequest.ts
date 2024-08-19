import { Request } from 'express';
import { RequestParams } from './requestParamsType.js';
import { RequestBody } from './requestBodyType.js';
import { createUserDto } from '../modules/user/dto/createUserDto.js';

export type CreateUserRequest = Request<RequestParams, RequestBody, createUserDto>;
