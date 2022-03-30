import { Container } from 'typedi';
import { Request, Response } from 'express';
import request from 'supertest';
import Joi from 'joi';
import Controller from './Controller';
import Endpoint from './Endpoint';
import BSApp from '../BSApp';
import ValidateQueryParams from './ValidateQueryParams';

@Controller('/test-path')
class MockController {
  @Endpoint({ path: '/test', method: 'get' })
  @ValidateQueryParams(
    Joi.object({
      q: Joi.string().required(),
      maxResults: Joi.number().min(1).options({ convert: true }),
      startIndex: Joi.number().min(0).options({ convert: true }),
    }),
  )
  method(req: Request, res: Response) {
    res.json(req.query);
  }
}

describe('Controller', () => {
  let bsApp: BSApp;

  beforeAll(() => {
    bsApp = Container.get(BSApp);
    const mock = new MockController();
  });

  it('Passes the valid parameters to the controller method when match with the schema provided', async () => {
    const query = {
      q: 'this is a search query',
      maxResults: 10,
      startIndex: 5,
    };

    await request(bsApp.app)
      .get('/test-path/test')
      .query(query)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(query);
      });
  });

  it('Returns a 400 error with details when the query params are invalid', async () => {
    const query = {
      maxResults: -1,
      startIndex: -1,
    };
    await request(bsApp.app)
      .get('/test-path/test')
      .query(query)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual([
          {
            context: { key: 'q', label: 'q' },
            message: '"q" is required',
            path: ['q'],
            type: 'any.required',
          },
          {
            context: {
              key: 'maxResults',
              label: 'maxResults',
              limit: 1,
              value: -1,
            },
            message: '"maxResults" must be greater than or equal to 1',
            path: ['maxResults'],
            type: 'number.min',
          },
          {
            context: {
              key: 'startIndex',
              label: 'startIndex',
              limit: 0,
              value: -1,
            },
            message: '"startIndex" must be greater than or equal to 0',
            path: ['startIndex'],
            type: 'number.min',
          },
        ]);
      });
  });

  it('Drops unknow parameters when provided', async () => {
    const query = {
      q: 'this is a search query',
      maxResults: 10,
      startIndex: 5,
    };
    await request(bsApp.app)
      .get('/test-path/test')
      .query(query)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(query);
      });
  });
});
