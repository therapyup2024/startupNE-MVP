import { BadRequestException, NotFoundException } from '@nestjs/common';

export function ServiceErrorHandler(
  target: any,
  key: any,
  descriptor: TypedPropertyDescriptor<(...args: any[]) => Promise<any>>,
) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]): Promise<any> {
    try {
      //eslint-disable-next-line
      const result = await originalMethod!.apply(this, args);

      return result;
    } catch (exception: any) {
      //eslint-disable-next-line
      if (exception.name === 'EntityNotFoundError')
        throw new NotFoundException();

      if (
        //eslint-disable-next-line
        exception.name === 'QueryFailedError' &&
        //eslint-disable-next-line
        exception.message?.includes?.('Duplicate')
      )
        throw new BadRequestException('Usuário já cadastrado');

      throw exception;
    }
  };
}
