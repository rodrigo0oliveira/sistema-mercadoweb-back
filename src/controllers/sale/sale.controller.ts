import { Request, Response } from "express";
import promotionService from "../../services/auth/sale/sale.service";

class PromotionController {
  async applyPromo(req: Request, res: Response) {
    try {
      const productId = req.params.id;
      const { discount } = req.body;

      if (!discount || discount <= 0) {
        return res.status(400).json({ message: "Desconto inválido" });
      }

      const updatedProduct = await promotionService.applyPromo(productId, discount);
      return res.status(200).json(updatedProduct);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async removePromo(req: Request, res: Response) {
    try {
      const productId = req.params.id;
      const updatedProduct = await promotionService.removePromo(productId);
      return res.status(200).json(updatedProduct);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new PromotionController();
