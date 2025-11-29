import { Request, Response } from "express";
import saleService from "../../services/auth/sale/sale.service";



class SaleController {
  async getAll(req: Request, res: Response) {
    try {
      const sales = await saleService.getAll();
      return res.status(200).json(sales);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const sale = await saleService.getById(req.params.id);
      if (!sale) return res.status(404).json({ message: "Venda não encontrada" });
      return res.status(200).json(sale);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const payload = {
  ...req.body,
  user: (req as any).user?.id || req.body.user,
};

      const newSale = await saleService.create(payload);
      return res.status(201).json(newSale);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const deleted = await saleService.remove(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Venda não encontrada" });
      }

      return res.status(200).json({ message: "Venda removida com sucesso!" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new SaleController();
