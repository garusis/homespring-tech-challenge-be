import { ObjectSchema } from 'joi';
import { Request, Response } from 'express';

export default function ValidateQueryParams(
  schema: ObjectSchema,
): MethodDecorator {
  return function (target, propertyKey, descriptor: PropertyDescriptor) {
    const previousHandler = descriptor.value;

    // eslint-disable-next-line no-param-reassign
    descriptor.value = (req: Request, res: Response) => {
      const { value, error } = schema.validate(req.query, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        res.status(400).json(error.details);
        return;
      }

      req.query = value;

      if (typeof descriptor.value === 'function') {
        previousHandler(req, res);
      }
    };
  };
}
