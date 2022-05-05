import database from '../../database/config';
import path from 'path';

const rootPath = path.resolve('./').replace('/dist', '').replace('/src', '')

export const env = {
    server: {
        port: 5003,
        production: false,
        crontab: false,
        rootPath: rootPath,
        apiKey: 'aalRcccddft6778Lrtyp8dffreaaB'
    },
   database:{
        dbClient: database.dbClient,
        dbHost: database.dbHost,
        dbUser: database.dbUser,
        dbPassword: database.dbPassword,
        dbName: database.dbName
    },
    passport: {
        secretJwtKey: "aaarrfgttt67787(f&33hhMMMJffff.dd2w2dfghyytzzaq09.99jjnbvmmmfdsAA",
        refreshToken: false,
        capabilities: [
            {
                slug : "arw",
                rol: 1
            },
            {
                slug : "urw",
                rol: 2
            },
            {
                slug : "ur",
                rol: 3
            }
        ]
    },
    cryptoJS: {
        secretAES: "AATTYMN9989344555253er2NDFG.rhhtssAAQZPPL5569%$S55ttlopinD33.wwwq+rkklgukx"
    }

}