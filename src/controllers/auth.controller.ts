import { NextFunction, Request, Response } from 'express';
import authService from '../services/auth.service';

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await authService.register(req.body);
    res.send(response).status(201);
  } catch (err: any) {
    next(err);
    return res.send(err.message).status(err.status);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { payload, password } = req.body;
    const response = await authService.login(payload, password);
    res.send(response).status(201);
  } catch (err: any) {
    next(err);
    return res.send(err.message).status(err.status);
  }
};

const authController = {
  register,
  login,
};

export default authController;
