import { HttpException, HttpStatus, Logger } from '@nestjs/common';
 
export default class ProviderError extends HttpException {
  constructor(messages: string | string [], path: string) {
    if (typeof messages === 'string') {
        messages = [messages];
    }
    Logger.error(`Provider Exception: ${JSON.stringify(messages)}`)
    super({
      title: 'provider Exception',
      status: HttpStatus.BAD_GATEWAY,
      detail: 'provider Exception',
      path,
      errors: messages.map((message) => ({ message })),
    }, HttpStatus.BAD_GATEWAY);
  }
}