import { Service, Container } from 'typedi';
import Controller, { getControllerPathKey } from './Controller';

@Controller('test-path')
@Service()
class MockController {}

describe('Controller', () => {
  it('Attaches the controller path to the controller instance', () => {
    const instance = Container.get(MockController);
    expect(getControllerPathKey(instance)).toBe('test-path');
  });
});
