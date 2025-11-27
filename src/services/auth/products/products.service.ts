import Product from "../../../models/Products"
class ProductService {

    async getAll() {
        return await Product.find();
    }

    async getById(id: string) {
        return await Product.findById(id);
    }

    async create(data: any) {
        const product = new Product(data);
        return await product.save();
    }

    async update(id: string, data: any) {
        return await Product.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string) {
        return await Product.findByIdAndDelete(id);
    }
}

export default new ProductService();
