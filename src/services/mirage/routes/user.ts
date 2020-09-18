import { User } from "../../../interfaces/User"
import {Request, Response} from 'miragejs'
import { handleError } from "../errorHandler";

type AuthResponse = {
    user:User,
    token: string
}


const login = (schema: any, req: Request): AuthResponse | Response => {

    const {
        username,
        password
    } = JSON.parse(req.requestBody) as Partial<User>;
    const user = schema.users.findBy({username});
    if(!user) {
        return handleError(null, "No such user exists");
    }
    if (user.password !==  password) {
        return handleError(null,"Incorrect password");
    } 
    return {
        token: '123345', 
        user: user.attrs
    }
}


const signUp = (schema: any, req: Request): AuthResponse | Response => {

    const {
        username,
        password,
        email
    } = JSON.parse(req.requestBody) as Partial<User>;
    const user = schema.users.findBy({username});

    if(user) {
        return handleError(null, "Such user already exists");
    }
    const newUser = schema.users.create({
        username,
        password,
        email,
        diaryId:[]
    });

    return {
        token: '123345', 
        user: newUser.attrs
    }
}

export default {
    login,
    signUp
}