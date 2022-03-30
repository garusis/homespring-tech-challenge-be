import { Container, Service } from 'typedi';
import request from 'supertest';
import BSApp from './BSApp';

@Service()
class MockController {
  private static internalInstancesCount = 0;

  static get instancesCount() {
    return this.internalInstancesCount;
  }

  constructor() {
    MockController.internalInstancesCount += 1;
  }
}

describe('BSApp', () => {
  let bsApp: BSApp;

  beforeAll(() => {
    bsApp = Container.get(BSApp);
  });

  it('Setups the API with a default health check', async () => {
    await request(bsApp.app).get('/health').expect(200);
  });

  it('Loads a provided list of controllers', () => {
    expect(MockController.instancesCount).toBe(0);

    bsApp.setupControllers([MockController]);

    expect(MockController.instancesCount).toBe(1);
  });
});
