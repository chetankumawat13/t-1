import { Router } from "express";
import { registerController, loginController , getUserController } from "../controllers/auth.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";
const authRouter = Router();

// api/auth/register

authRouter.post('/register', registerController);


// api/auth/login
authRouter.post('/login', loginController);

// api/auth/logout
authRouter.post('/logout', (req,res)=>{
    res.clearCookie('token');
    res.status(200).json({
        success:true,
        message:"User logged out successfully"
    })
})

// api/auth/getUser

authRouter.get('/getUser', authMiddleware , getUserController);





export default authRouter;