import cron from 'node-cron';
import { env } from './config/env';

export const cronInit = () => {
    
    if(env.server.crontab) {
        
        //cron.schedule('*/5 * * * * *', () => {
            //console.log('running a task...');
        //});

        /*cron.schedule('02 * * * * *', () => {
           
        });*/

    }
    
}

