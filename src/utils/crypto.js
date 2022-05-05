import CryptoJS from "crypto-js";

export const encrypt = (data, secret) => {

    try {

        const encrypted = CryptoJS.AES.encrypt(data, secret);

        return encrypted.toString();
        
    } catch (error) {
        console.log(error)
    }

}

export const decrypt = (enc, secret) => {

    try {

        const decrypted = CryptoJS.AES.decrypt(enc, secret);

        return decrypted.toString(CryptoJS.enc.Utf8);
        
    } catch (error) {
        console.log(error)
    }

}

