import 'reflect-metadata';

const controllerPathKey = Symbol.for('controller-path');

export function getControllerPathKey(target: any) {
  return Reflect.getMetadata(controllerPathKey, target.constructor);
}

export default function Controller(controllerPath: string): ClassDecorator {
  return function (target) {
    Reflect.defineMetadata(controllerPathKey, controllerPath, target);
  };
}
