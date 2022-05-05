import fs from 'fs';
import { promisify } from 'util';
import axios from 'axios';

export const downloadFile = async (fileUrl, outputLocationPath, headerName=null, token=null) => {
    
    const writeFile = promisify(fs.writeFile);
    
    const config = {
        method: 'get',
        url: fileUrl,
        responseType: 'arraybuffer',
        headers: {}
    }

    if(headerName && token){
        config.headers[headerName] = token;
    }
    const buffer = await axios(config);

    await writeFile(outputLocationPath, buffer.data);
  
}