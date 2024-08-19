import { ClassConstructor, plainToInstance } from 'class-transformer';

export function fillDTO<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
    return plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });
  }
