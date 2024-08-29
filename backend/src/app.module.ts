import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvModule } from '@common/env/env.module';
import { EnvService } from '@common/env/env.service';
import { LoggerMiddleware } from '@common/middleware/logger/logger.middleware';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [EnvService],
      useFactory: (envService: EnvService) => ({
        uri: envService.get('MONGO_URI'),
      }),
    }),
    AuthModule,
    EnvModule,
  ],
  controllers: [AppController],
  providers: [AppService, EnvService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
