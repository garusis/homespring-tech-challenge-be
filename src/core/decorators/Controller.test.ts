import { Container } from 'typedi';
import { Request, Response } from 'express';
import request from 'supertest';
import Controller from './Controller';
import Endpoint from './Endpoint';
import BSApp from '../BSApp';

@Controller('/test-path')
class MockController {
  @Endpoint({ path: '/test', method: 'get' })
  method(req: Request, res: Response) {
    res.sendStatus(200);
  }
}

describe('Controller', () => {
  let bsApp: BSApp;

  beforeAll(() => {
    bsApp = Container.get(BSApp);
  });

  it('Attaches a new router to the app based on the controller path and attaches its endpoints', async () => {
    const mock = new MockController();
    await request(bsApp.app).get('/test-path/test').expect(200);
  });
});
