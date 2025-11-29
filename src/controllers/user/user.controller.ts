// src/controllers/user/user.controller.ts
import { Request, Response } from "express";
import userService from "../../services/auth/user/user.service";

class UserController {
  async getAll(req: Request, res: Response) {
    try {
      const users = await userService.getAll();
      return res.status(200).json(users);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const user = await userService.getById(req.params.id);
      if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const newUser = await userService.create(req.body);
      return res.status(201).json(newUser);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updated = await userService.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: "Usuário não encontrado" });
      return res.status(200).json(updated);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const deleted = await userService.remove(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Usuário não encontrado" });
      return res.status(200).json({ message: "Usuário removido com sucesso!" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new UserController();
