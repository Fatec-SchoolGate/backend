import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const datetime = new Date();

    return `Hello World! Datetime: ${datetime}`;
  }
}
