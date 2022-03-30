import 'reflect-metadata';

type TEndpointSettings = {
  path: string;
  method: 'get' | 'post' | 'put' | 'delete' | 'head'; // Let's limit this for now
};

type TEndpointDescriptor = TEndpointSettings & {
  descriptor: TypedPropertyDescriptor<any>;
};

const endpointsKey = Symbol.for('endpoints');

export function getEndpoints(target: any): Array<TEndpointDescriptor> {
  return Reflect.getMetadata(endpointsKey, target) || [];
}

export default function Endpoint(settings: TEndpointSettings): MethodDecorator {
  return function (target, propertyKey, descriptor) {
    let currentEndpoints = Reflect.getMetadata(
      endpointsKey,
      target,
    ) as Array<TEndpointDescriptor>;
    if (!currentEndpoints) {
      currentEndpoints = [];
      Reflect.defineMetadata(endpointsKey, currentEndpoints, target);
    }
    currentEndpoints.push({ ...settings, descriptor });
  };
}
