
import * as express from "express";
import UserInfo from "../../types/user-info";

declare global {
  namespace Express {
    interface Request {
      userInfo?: any
    }
  }
}
