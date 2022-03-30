// eslint-disable-next-line max-classes-per-file
import { Request, Response } from 'express';
import { Container } from 'typedi';
import Endpoint, { getEndpoints } from './Endpoint';
import BSApp from '../BSApp';

class MockController {
  @Endpoint({ path: 'test', method: 'get' })
  method(req: Request, res: Response) {
    res.sendStatus(200);
  }
}

describe('Endpoint', () => {
  let bsApp: BSApp;

  beforeAll(() => {
    bsApp = Container.get(BSApp);
  });

  it('Attaches the endpoint settings to the method', async () => {
    const mock = new MockController();
    expect(getEndpoints(mock)).toEqual([{ path: 'test', method: 'get' }]);
  });
});
