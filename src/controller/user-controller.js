import models from '../models';
import config from '../config';
import HttpStatus from 'http-status';
import repositories from '../repositories'


const { userRepository } = repositories;


export default{
    async signUp(req,res,next){
        try {
            console.log("inside the user controller");
            const result = await userRepository.signup(req);
            if (result) {
                return res.status(200).json({message: "submitted", status: true});
            } else {
              return res.status(400).json({message:"bad request",status:false});
            }
          } catch (error) {
            next(error);
          }
    }
}