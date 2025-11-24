import User from  '../../models/user';
import jwt from 'jsonwebtoken';
import { isPasswordMatch,encriptPassword } from '../../utils/passwordUtils';

async function verifyIfEmailExists(email:string) {
    const user = await User.findOne({email:email})
    if(user){
        return true;
    }
    return false;
}

async function createUser(cpf:string,password:string,email:string,idade:string) {
    const hashedPassword = await encriptPassword(password);

    const newUser = new User({
        cpf:cpf,
        idade:idade,
        email:email,
        password:hashedPassword,
    });

    const user = await newUser.save();

    if(!user){
        throw new Error("User não foi criado, tente novamente!");
    }

    return user;
}

async function createToken(email:string){
    const user = await User.findOne({email:email});

    const accessToken = jwt.sign({
        userId: user?.id,
        role:user?.role
    },
    process.env.JWT_SECRET_KEY || "",
    {
        expiresIn:'15m'
    })

    return accessToken;
}

const verifyEmailAndPassword = (email:boolean,password:boolean) => {
    if(!email || !password){
        throw new Error("Email or password invalid");
    }
}



export {
    createUser,
    isPasswordMatch,
    createToken,
    verifyIfEmailExists,
    verifyEmailAndPassword
}