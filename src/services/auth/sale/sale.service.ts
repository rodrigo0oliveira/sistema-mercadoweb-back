import ProductModel from "../../../models/Products";

class PromotionService {
  async applyPromo(productId: string, discount: number) {
    const product = await ProductModel.findById(productId);
    if (!product) throw new Error("Produto não encontrado");

    const promoPrice = product.price - (product.price * discount) / 100;
    product.promoPrice = promoPrice;

    await product.save();
    return product;
  }

  async removePromo(productId: string) {
    const product = await ProductModel.findById(productId);
    if (!product) throw new Error("Produto não encontrado");

    product.promoPrice = 0;

    await product.save();
    return product;
  }
}

export default new PromotionService();
