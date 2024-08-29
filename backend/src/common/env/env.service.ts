import { Injectable } from '@nestjs/common';
import * as Joi from '@hapi/joi';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

@Injectable()
export class EnvService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const config = dotenv.parse(fs.readFileSync('.env'));
    this.envConfig = this.validateInput(config);
  }

  private validateInput(envConfig: { [key: string]: string }): {
    [key: string]: string;
  } {
    const envSchema: Joi.ObjectSchema = Joi.object({
      MONGO_URI: Joi.string().required(),
      JWT_SECRET: Joi.string().required(),
      JWT_EXPIRY: Joi.string()
        .pattern(/^\d+(s|m|h)$/)
        .required(),
      PORT: Joi.number().default(3000),
      FE_URL: Joi.string().required(),
      ALLOWED_METHODS: Joi.string().required(),
      ALLOWED_HEADERS: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } = envSchema.validate(envConfig, {
      allowUnknown: true,
      abortEarly: false,
    });

    if (error) {
      console.error('Invalid Environment configuration:', error.message);
      process.exit(1); // Stop the application
    }

    return validatedEnvConfig;
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
