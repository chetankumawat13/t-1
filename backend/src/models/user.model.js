import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        name:{
            type:String,
            required:[true,"Username is required"],
            unique:[true,'this username is already exist'],
            trim:true
        },
        email:{
            type:String,
            unique:[true,"this email is already exist"],
            required:[true,"Email is required"],
            lowercase:true,
            trim:true
        },
        password:{
            type:String,
            required:true,
            minlength:6
        },
        avatar:{
            type:String,
             default:"https://ik.imagekit.io/ad6av31ld/blank-profile-picture-973460_640.webp?updatedAt=1770787184788"
        }

},
{
    timestamps:true
}
);


const userModel =  mongoose.model("User",userSchema);

export default userModel
