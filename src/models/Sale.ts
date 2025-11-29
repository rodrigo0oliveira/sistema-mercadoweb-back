import mongoose, { Document, Schema } from "mongoose";

export interface ISale extends Document {
    produtoNome: string;
    quantidade: number;
    valorUnitario: number;
    total: number;
    clienteNome?: string;
    dataVenda: Date;
    user: mongoose.Types.ObjectId; // referência ao funcionário
}

const saleSchema = new Schema<ISale>({
    produtoNome: {
        type: String,
        required: [true, "Nome do produto é obrigatório!"],
        trim: true
    },

    quantidade: {
        type: Number,
        required: [true, "Quantidade é obrigatória!"],
        min: [1, "Quantidade mínima é 1"],
        default: 1
    },

    valorUnitario: {
        type: Number,
        required: [true, "Valor unitário é obrigatório!"],
        min: [0, "Valor inválido"]
    },

    total: {
        type: Number,
        required: [true, "O total é obrigatório!"],
        min: [0, "Total inválido"]
    },

    clienteNome: {
        type: String,
        trim: true,
        default: null
    },

    dataVenda: {
        type: Date,
        default: Date.now
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Usuário responsável pela venda é obrigatório"]
    }

}, { timestamps: true });

export default mongoose.model<ISale>("Sale", saleSchema);
