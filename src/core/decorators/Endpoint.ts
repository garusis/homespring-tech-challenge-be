import 'reflect-metadata';

type TEndpointSettings = {
  path: string;
  method: 'get' | 'post' | 'put' | 'delete' | 'head'; // Let's limit this for now
};

const endpointsKey = Symbol.for('endpoints');

export function getEndpoints(target: any): Array<TEndpointSettings> {
  return [];
}

export default function Endpoint(settings: TEndpointSettings): MethodDecorator {
  return function (target) {
    void 0;
  };
}
