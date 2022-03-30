import 'reflect-metadata';
import express from 'express';
import { Container } from 'typedi';
import { getEndpoints } from './Endpoint';
import BSApp from '../BSApp';

export default function Controller(controllerPath: string): ClassDecorator {
  return function (target) {
    const controllerEndpoints = getEndpoints(target.prototype);
    const bsApp = Container.get(BSApp);

    const router = express.Router({ mergeParams: true });

    bsApp.app.use(controllerPath, router);

    controllerEndpoints.forEach((endpoint) => {
      router[endpoint.method](endpoint.path, endpoint.descriptor.value);
    });
  };
}
