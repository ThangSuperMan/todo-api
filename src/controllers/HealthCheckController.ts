/* eslint-disable no-console */
import { Request, Response } from 'express';
import { ResponseUtil } from '../utils/Response';
import { DataSource, QueryRunner } from 'typeorm';
import { AppDataSource } from '../database/data-source';

export class HealthCheckController {
  async checkHealth(req: Request, res: Response) {
    try {
      const dataSource: DataSource = AppDataSource;
      if (!dataSource.isInitialized) {
        AppDataSource.initialize()
          .then(async () => {
            console.log('Database connection success');
          })
          .catch((err) => console.log(err));
      }

      const readResult = await dataSource.query('SELECT 1 AS read_check');
      if (!readResult || readResult.length === 0) {
        throw new Error('Read health check failed');
      }
    } catch (err: unknown) {
      console.log(`Error health check: ${err}`);

      ResponseUtil.sendError({
        res,
        message: 'Internal server error'
      });

      return;
    }

    ResponseUtil.sendResponse({
      res,
      data: null
    });
  }
}
