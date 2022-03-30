import dotenv from 'dotenv';
import { Container } from 'typedi';
import BSApp from './core/BSApp';
import BookSearchController from './core/controllers/BookSearch.controller';

dotenv.config();

function bootstrap() {
  const bsApp = Container.get(BSApp);

  bsApp.setupControllers([BookSearchController]);

  bsApp.start();
}

bootstrap();
