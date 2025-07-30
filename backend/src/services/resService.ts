import { Response } from "express";

export class ResService {
  static async handleErr(res: Response, err: any) {
    res.send({ success: false, err });
  }

  static async handleSuccess(res: Response, data: any) {
    res.send({ success: true, data });
  }
}
