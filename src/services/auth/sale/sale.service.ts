import Sale from "../../../models/Sale";

const getAll = async () => {
  return Sale.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 })
    .lean();
};

const getById = async (id: string) => {
  return Sale.findById(id)
    .populate("user", "name email")
    .lean();
};

const create = async (payload: any) => {
  const quantidade = Number(payload.quantidade ?? 1);
  const valorUnitario = Number(payload.valorUnitario ?? 0);
  const total = parseFloat((quantidade * valorUnitario).toFixed(2));

  const sale = await Sale.create({
    ...payload,
    quantidade,
    valorUnitario,
    total,
  });

  return sale;
};

const remove = async (id: string) => {
  const r = await Sale.findByIdAndDelete(id);
  return !!r;
};

export default { getAll, getById, create, remove };
