import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { insertOrUpdateIntoDb } from './commonService';

export const create = async ({ name, lastname, email, password }) => {

     //Encryp password
     const salt = await bcrypt.genSalt(10);
     const passHash = await bcrypt.hash(password, salt);

     const data = {
         name, 
         lastname, 
         email, 
         password: passHash,
         token: uuid()
     }

     //Create a new user
     const [user] = await insertOrUpdateIntoDb(data, 'users');

     return user
}

export const edit = () => {
    //
}

