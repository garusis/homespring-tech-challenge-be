import 'reflect-metadata';

type TEndpointSettings = {
  path: string;
  method: 'get' | 'post' | 'put' | 'delete' | 'head'; // Let's limit this for now
};

const endpointsKey = Symbol.for('endpoints');

export function getEndpoints(target: any): Array<TEndpointSettings> {
  return Reflect.getMetadata(endpointsKey, target) || [];
}

export default function Endpoint(settings: TEndpointSettings): MethodDecorator {
  return function (target) {
    let currentEndpoints = Reflect.getMetadata(
      endpointsKey,
      target,
    ) as Array<TEndpointSettings>;
    if (!currentEndpoints) {
      currentEndpoints = [];
      Reflect.defineMetadata(endpointsKey, currentEndpoints, target);
    }
    currentEndpoints.push(settings);
  };
}
