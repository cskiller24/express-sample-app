import { Request, Response } from 'express';

class HomeController {
  static index(req: Request, res: Response) {
    res.json({
      application_name: 'Test Project',
    });
  }
}

export default HomeController;
