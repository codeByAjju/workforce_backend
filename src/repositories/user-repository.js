import httpStatus from 'http-status';
import models from '../models';
import bcrypt from 'bcryptjs';

const {user}=models;
export default{
  async createHashPassword(password){
    try{
      const salt= await bcrypt.genSalt();
      return await bcrypt.hash(password, salt);

    }
    catch(error){
      console.log(error);
    }
  },

    async signup(req) {
        try {
            const bodyData = req.body;
            const hashPassword = await this.createHashPassword(bodyData.password);
            bodyData.password = hashPassword;
            const result = await user.create(bodyData);
            if (result) 
              return result;
            return false;

          } catch (error) {
            throw Error(error);
          }
    },
}