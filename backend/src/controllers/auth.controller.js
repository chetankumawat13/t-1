import userModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const cookieOptions = {
  httpOnly: true,              
  sameSite: "lax",            
  maxAge: 24 * 60 * 60 * 1000, 
};


export async function registerController(req, res) {
  const { username, email, password, avatar } = req.body;
  console.log(req.body);

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ email }, { name: username }],
  });

  if (isUserAlreadyExist) {
    return res.status(409).json({
      success: false,
      message: "User already exist",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await userModel.create({
    name: username,
    email,
    password: hashedPassword,
    avatar,
  });

  const token = jwt.sign(
    {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );

  
  res.cookie("token", token, cookieOptions);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      avatar: newUser.avatar,
    },
  });
}


export async function loginController(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );


  res.cookie("token", token, cookieOptions);

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    },
  });
}


export async function getUserController(req, res) {
  const user = await userModel.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    },
  });
}