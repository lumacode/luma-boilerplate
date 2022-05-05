import jwt from 'jsonwebtoken';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { env } from '../config/env';
import { knex as db } from '../config/db'
import { create as createUser } from '../services/userService';
import { ifExistsInDb } from '../services/commonService';


function createToken(user){
    return jwt.sign({
        id: user.id,
        email: user.email,
        revokeToken: user.token,
        rol: user.rol
    }, env.passport.secretJwtKey, 
        {expiresIn: "365 days"})
}


export const signIn = async (req, res) => {

    if(!req.body.email || !req.body.password){
        return res.status(400).json({msg: 'Please, send your email and password'})
    }
    
    const [user] = await db.select(['id','email', 'password', 'token', 'rol']).table('users').where({email: req.body.email}); 
    console.log(user)
    if(!user){
        return res.status(401).json({status: "error", message: "Invalid credentials"})
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if(isMatch){
        return res.status(200).json({token: createToken(user)})
    }

    return res.status(401).json({
        msg: "The email or password are incorrect"
    })

}

export const signUp = async (req, res) => {

    try {

        const { name, email, password } = req.body;
       
        if(name && email && password){

            //Validate fields
            const validate_name = !validator.isEmpty(name);
            const validate_email = !validator.isEmpty(email) && validator.isEmail(email);
            const validate_password = password.length >= 8;
            if(!validate_name || !validate_email || !validate_password) return res.json({status: "error", fieldsError: {name: !validate_name, email: !validate_email, password: !validate_password}})

            //Validate if user did not exists
            const [emailExist] = await ifExistsInDb(['email'], 'users',  {email: email});
            
            if(emailExist) return res.status(400).json({error: 'The user is already register'});

            //Call service
            const user = await createUser(req.body)

            //Return user ok 
            return res.status(200).json({status: "ok", message: "User created successfully", userId: user})
            
        }
        
        //Return error
        return res.status(404).json({status: "error", message: "must be name, email and password"})

    } catch (error) {
        console.log(error)
        res.status(500).json({status: "error", message: 'Fatal error, user error type.'})
    }

   

}