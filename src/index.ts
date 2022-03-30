import dotenv from 'dotenv';
import { Container } from 'typedi';
import BSApp from './core/BSApp';

dotenv.config();

function bootstrap() {
  const bsApp = Container.get(BSApp);
  bsApp.start();
}

bootstrap();
