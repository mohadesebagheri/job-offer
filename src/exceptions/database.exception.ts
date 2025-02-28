import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export default class DatabaseError extends HttpException {
  constructor(messages: string | string[]) {
    if (typeof messages === 'string') {
      messages = [messages];
    }
    Logger.error(`Database Exception: ${JSON.stringify(messages)}`);
    super(
      {
        title: 'Database Exception',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        detail: 'Database Exception',
        errors: messages.map((message) => ({ message })),
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
