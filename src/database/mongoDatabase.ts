import { inject, injectable } from 'inversify';
import { Logger } from '../logger/logger.interface.js';
import { Component } from '../types/components.enum.js';
import { Database } from './database.interface.js';
import * as Mongoose from 'mongoose';
import { setTimeout } from 'node:timers/promises';

const TRIES_COUNT = 5;
const TRIES_TIMEOUT = 1500;

@injectable()
export class MongoDatabase implements Database {
  private mongoose!: typeof Mongoose;
  private isConnected: boolean;

  constructor(
	@inject(Component.Logger) private readonly logger: Logger
  ){
    this.isConnected = false;
  }

  private isConnectedToDatabase() {
    return this.isConnected;
  }

  public async connect(uri: string): Promise<void> {
    if(this.isConnectedToDatabase()) {
      throw new Error('MongoDB client has already been established');
    }

    this.logger.info('Connecting to the MongoDb client...');

    let attempts = 0;
    while(attempts < TRIES_COUNT) {
      try {
        this.mongoose = await Mongoose.connect(uri);
        this.isConnected = true;
        this.logger.info('Database connection successfully established');
        return;

      } catch (error) {
        attempts++;
        this.logger.error(`Failed to connect to the MongoDatabase. Attempt: ${TRIES_COUNT}`, error as Error);
        await setTimeout(TRIES_TIMEOUT);
      }
    }
    throw new Error(`Unable to establish connection after ${TRIES_COUNT} tries`);
  }

  public async disconnect(): Promise<void> {
    if(!this.isConnectedToDatabase()) {
      throw new Error('Nothing to disconnect');
    }

    await this.mongoose.disconnect();
    this.isConnected = false;
    this.logger.info('Database connection closed');
  }
}
