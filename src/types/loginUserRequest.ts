import { Request } from 'express';
import { RequestParams } from './requestParamsType.js';
import { RequestBody } from './requestBodyType.js';
import { LoginUserDto } from '../modules/user/dto/loginUserDto.js';

export type LoginUserRequest = Request<RequestParams, RequestBody, LoginUserDto>;
