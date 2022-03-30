import 'reflect-metadata';

const controllerPathKey = Symbol('controller-path');

export function getControllerPathKey(target: any) {
  return '';
}

export default function Controller(controllerPath: string) {
  return function (target: any) {
    void 0;
  };
}
