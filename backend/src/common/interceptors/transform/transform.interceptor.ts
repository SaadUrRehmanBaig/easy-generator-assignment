import { AppConstants } from '@common/constants/constants';
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const message = data?.message;
        if (data?.message) delete data.message;

        return {
          success: true,
          message: message || AppConstants.MESSGES.SUCCESSFUL_REQUEST,
          data: data,
        };
      }),
      catchError((err) => {
        if (err instanceof HttpException) {
          const response =
            typeof err === 'string'
              ? { message: err }
              : (err.getResponse() as {
                  message?: string;
                  [key: string]: any;
                });
          delete response?.statusCode;
          return throwError(
            () =>
              new HttpException(
                {
                  success: false,
                  ...response,
                },
                err.getStatus(),
              ),
          );
        } else {
          return throwError(
            () =>
              new HttpException(
                {
                  success: false,
                  message: AppConstants.MESSGES.SERVER_ERROR,
                  error: 'Unexpected error occurred',
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
              ),
          );
        }
      }),
    );
  }
}
