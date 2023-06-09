import {Router} from "express";
import controller from "../controller";
import validations from '../validations';
import middlewares from '';


    
const router=Router();
const { userController } = controller;
const { userValidator } = validations;
const {userMiddleware} = middlewares;


router.post('/signup',userController.signUp);
export default router;