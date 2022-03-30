import { Request, Response } from 'express';
import Joi from 'joi';
import fetch from 'node-fetch';
import { Service } from 'typedi';
import { ParsedQs } from 'qs';
import Controller from '../decorators/Controller';
import Endpoint from '../decorators/Endpoint';
import ValidateQueryParams from '../decorators/ValidateQueryParams';

@Service()
@Controller('/books')
export default class BookSearchController {
  @Endpoint({ path: '/', method: 'get' })
  @ValidateQueryParams(
    Joi.object({
      q: Joi.string().required(),
      maxResults: Joi.number().min(1).options({ convert: true }),
      startIndex: Joi.number().min(0).options({ convert: true }),
    }),
  )
  async search(req: Request, res: Response) {
    const urlSearch = new URLSearchParams();

    const setParam = (name: string, query: ParsedQs) => {
      const paramValue = query[name];
      if (!paramValue) return;
      urlSearch.set(
        name,
        typeof paramValue === 'string' ? paramValue : paramValue.toString(),
      );
    };

    urlSearch.set('key', process.env.GOOGLE_BOOKS_API_KEY ?? '');
    setParam('projection', req.query);
    setParam('q', req.query);
    setParam('startIndex', req.query);
    setParam('maxResults', req.query);
    setParam('filter', req.query);

    const booksResponse = await fetch(
      `${process.env.GOOGLE_BOOKS_API_ENDPOINT}?${urlSearch.toString()}`,
    );
    res.json(await booksResponse.json());
  }
}
