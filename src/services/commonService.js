import { knex as db } from '../config/db';
import axios from 'axios';

// Common DB services

export const ifExistsInDb = async (fields=[], table, whereCondition, whereConditionTwo=null) => {

    if(fields.length > 0 && table && whereCondition){

        if(whereConditionTwo){
            return await db.select(fields).table(table)
                                          .where(whereCondition)
                                          .where(whereConditionTwo);
        }
        //Search in db
        return await db.select(fields).table(table).where(whereCondition);
    }
    
    return false
}

export const insertOrUpdateIntoDb = async (data, table, id) => {

    if(data && table && !id){
        //Insert in db
        return await db.insert(data).into(table);
    }

    if(data && table && id){
        //Insert in db
        return await db.where({id: id}).update(data).into(table);
    }
    
    return false;
}

export const getAllDataDb = async (columns='*', table) => {

    const dataDB = await db.select(columns).from(table);
    return dataDB;

}

export const getOneDataDb = async (columns='*', table, where) => {

    const [ dataDB ] = await db.select(columns).from(table).where(where);
    return dataDB;

}

export const getOption = async (option) => {
  const optionResult = await getOneDataDb("*","options", option);
  return optionResult;
}

export const setOption = async (option, value) => {
  const optionResult = await db.where({key: option}).update({value: value}).into('options');
  return optionResult;
}

// End common DB services

// Http RequestAPI functions

export const httpRequest = async ({url, method="get", headerAuth="Authorization", token=null, uname=null, pass=null, data=null, contentType="application/json"}) => {
    try {
  
      const config = {
        method: method,
        url: url,
        headers: { 
          'Content-Type': contentType
        },
      };
  
  
      if(token){
        config.headers[headerAuth] = token
      }

      if(uname && pass){
          config['auth'] = {
            username: uname,
            password: pass
        }
      }
  
      if(data){
        config['data'] = data
      }
  
    const res = await axios(config)
    return res; 
      
    } catch (error) {
      console.log(error)
    }
    
}

// End http RequestAPI functions
