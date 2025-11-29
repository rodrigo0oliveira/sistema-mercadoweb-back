// src/services/auth/user/user.service.ts
import User from "../../../models/user";
import bcrypt from "bcryptjs";

const SALT = 10;

const getAll = async () => {
  return User.find({}, { password: 0 }).sort({ createdAt: -1 }).lean();
};

const getById = async (id: string) => {
  return User.findById(id, { password: 0 }).lean();
};

const create = async (payload: any) => {
  const exists = await User.findOne({ email: payload.email });
  if (exists) throw new Error("Email já cadastrado");
  const hashed = await bcrypt.hash(payload.password, SALT);
  const user = await User.create({ ...payload, password: hashed });
  return { id: user._id, name: user.name, email: user.email, cpf: user.cpf, role: user.role };
};

const update = async (id: string, payload: any) => {
  if (payload.password) payload.password = await bcrypt.hash(payload.password, SALT);
  return User.findByIdAndUpdate(id, payload, { new: true, projection: { password: 0 } }).lean();
};

const remove = async (id: string) => {
  const r = await User.findByIdAndDelete(id);
  return !!r;
};

export default { getAll, getById, create, update, remove };
