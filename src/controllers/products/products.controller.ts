import { Request, Response } from "express";
import productService from "../../services/auth/products/products.service";

class ProductController {

    async getAll(req: Request, res: Response) {
        try {
            const products = await productService.getAll();
            return res.status(200).json(products);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const product = await productService.getById(req.params.id);

            if (!product) {
                return res.status(404).json({ message: "Produto não encontrado" });
            }

            return res.status(200).json(product);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const newProduct = await productService.create(req.body);
            return res.status(201).json(newProduct);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const updatedProduct = await productService.update(req.params.id, req.body);

            if (!updatedProduct) {
                return res.status(404).json({ message: "Produto não encontrado" });
            }

            return res.status(200).json(updatedProduct);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const deleted = await productService.delete(req.params.id);

            if (!deleted) {
                return res.status(404).json({ message: "Produto não encontrado" });
            }

            return res.status(200).json({ message: "Produto removido com sucesso!" });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default new ProductController();
