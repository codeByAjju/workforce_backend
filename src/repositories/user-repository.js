import models from '../models'

const {user}=models;
export default{
    async signup(req) {
        try {
            console.log(req.body);
            const bodyData = req.body;
            const result = await user.create(bodyData);
            if (result) 
              return result;
            return false;

          } catch (error) {
            throw Error(error);
          }
    }
}