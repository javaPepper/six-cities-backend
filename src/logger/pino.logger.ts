import { Logger as PinoInstance, pino, transport } from 'pino';
import { Logger } from '../logger/logger.interface.js';
import { getCurrentDirPath } from '../helpers/filePath.js';
import { resolve } from 'node:path';
import { injectable } from 'inversify';

@injectable()
export class PinoLogger implements Logger {
  private readonly logger: PinoInstance;

  constructor() {

    const logFilePath = './src/logs.log';
    const dirPath = getCurrentDirPath();
    const destination = resolve(dirPath, '../../', logFilePath);

    const fileTransport = transport({
      target: 'pino/file',
      options: {destination}
    });
    this.logger = pino({}, fileTransport);
  }

  public info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }

  public error(message: string, error: Error, ...args: unknown[]): void {
    this.logger.error(message, error, ...args);
  }

  public debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }
}
