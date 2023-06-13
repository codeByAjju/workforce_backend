import models from '../models';
import services from "../services/jwt"
import config from '../config';
import repositories from '../repositories'
import httpStatus from 'http-status';
import jwt  from 'jsonwebtoken';
import model from '../models';
import bcrypt from 'bcryptjs';

const { userRepository } = repositories;
const {user}=models;

export default{
    async signUp(req,res,next){
        try {
            const result = await userRepository.signup(req);
            if (result) {
                return res.status(httpStatus.OK).json({message: "submitted", status: true});
            } else {
              return res.status(httpStatus.BAD_REQUEST).json({message:"bad request",status:false});
            }
          } catch (error) {
            next(error);
          }
    },
    async signIn(req,res,next){
      try {
        const foundUser = await user.findOne({ where: { email: req.body.email } });
        if (foundUser) {
          let result = await bcrypt.compare(req.body.password, foundUser.password);
          if (result){
                let payload = {subject: user.email};
                let token = services.createToken(payload);
                return res.status(httpStatus.OK).json({ message: "Sign in success", token: token,status: true });
          }
        } else
        return res.status(httpStatus.BAD_REQUEST).json({message:"bad request error",status:false});

      } catch (error) {
        console.log(error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message:"internal server error",status:false});
      }
    }
 }