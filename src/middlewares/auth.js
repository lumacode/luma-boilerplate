import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { getOneDataDb } from '../services/commonService';

/**
 *  Rol        /   Capabilities
 *  0 (Admin)      Write and read -> arw
 *  1 (User)       Single account shipping methods (only read) -> ur
 *  2 (User)       Single account shipping methods (write and read) -> urw
 * 
 *  Group               Capabilities
 *  (u)ser or (a)dmin   r rw 
*/

export const auth = (capabilities) => {

    return async (req, res, next) => {
        
        try {
            const token = req.header("Authorization").replace('Bearer ', '');
            if(!token) return res.status(401).json({ error: "Unauthorized" });
            if(!jwt.verify(token, env.passport.secretJwtKey)) return res.status(401).json({ error: "Unauthorized" });
        
            const caps = env.passport.capabilities;

            const permissions = caps.find(cap => cap.slug === capabilities);

            const { id } = jwt.decode(token); 
            
            const  { rol }  = await getOneDataDb(['id', 'rol'], 'users', {id: id})

            if(permissions.rol === rol || rol === 0) return next();
            
            return res.status(401).json({ status: "error", message: "Unauthorized or token expired" })

        } catch (error) {
            res.status(401).json({ error: "Unauthorized" })
        }
    }
}
