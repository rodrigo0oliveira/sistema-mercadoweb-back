import mongoose from "mongoose";
import { INTEGER } from "sequelize";

const userSchema = new mongoose.Schema({
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
        default : 'usuario'
    },
    active:{
        type:Boolean,
        default:true
    },
    age:{
        type:Number,
    },
    cpf:{
        type:String
    }

},{timestamps:true})


export default mongoose.model('User',userSchema);