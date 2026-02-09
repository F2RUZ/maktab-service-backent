import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const { method, url, body, query, params } = request;
    const startTime = Date.now();

    // Log incoming request
    this.logger.log(`➡️  ${method} ${url}`);

    if (Object.keys(query).length > 0) {
      this.logger.debug(`   Query: ${JSON.stringify(query)}`);
    }

    if (Object.keys(params).length > 0) {
      this.logger.debug(`   Params: ${JSON.stringify(params)}`);
    }

    if (method !== 'GET' && body && Object.keys(body).length > 0) {
      const sanitizedBody = { ...body };
      // Hide sensitive data
      if (sanitizedBody.password) sanitizedBody.password = '***';
      if (sanitizedBody.token) sanitizedBody.token = '***';
      this.logger.debug(`   Body: ${JSON.stringify(sanitizedBody)}`);
    }

    return next.handle().pipe(
      tap({
        next: (data) => {
          const duration = Date.now() - startTime;
          this.logger.log(`⬅️  ${method} ${url} - ${duration}ms - Success ✅`);
        },
        error: (error) => {
          const duration = Date.now() - startTime;
          this.logger.error(`⬅️  ${method} ${url} - ${duration}ms - Error ❌`);
          this.logger.error(`   ${error.message}`);
        },
      }),
    );
  }
}
