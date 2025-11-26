import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Nome é obrigatório!"],
        trim: true
    },
    email:{
        type:String,
        required:[true,"E-mail é obrigatório!"],
        unique: [true,'E-mail já existe'],
        trim:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:[true,"A senha é obrigatória!"],
        minLength: [8,"A senha precisa ter mais de 8 caracteres!"]
    },
    role:{
        type:String,
        enum: [,'admin','funcionario'],
        default : 'funcionario'
    },
    active:{
        type:Boolean,
        default:true
    },
    age:{
        type:Number,
    },
    cpf:{
        type:String,
        required:[true,"Cpf é obrigatório"],
        unique:[true,"Cpf já cadastrado!"]
    }

},{timestamps:true})


export default mongoose.model('User',userSchema);