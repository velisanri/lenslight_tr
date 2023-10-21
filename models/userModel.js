import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const {Schema} = mongoose;

const userSchema = new Schema(
{
    username: {
        type:String,
        required: [true,"Kullanici adi girmen gerekiyor"],
        unique:true,
        lowercase:true,
        validate:[validator.isAlphanumeric,"Sadece harf ve sayi girmen gerekiyor"],
    },
    email:{
        type:String,
        required:[true,"Email girmen gerekiyor"],
        unique:true,
        validate:[validator.isEmail,"Girdiginiz email yanlis"],
    },
    password:{
        type:String,
        required:true[true,"Sifre girmen gerekiyor"],
        minLength:[4,"En az 4 karakter girmen gerekiyor"],
    },
    followers:[{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    ],
    followings:[{
    type:Schema.Types.ObjectId,
    ref:"User",
    },
    ],
},

{
    timestamps:true
}
);

userSchema.pre("save",function(next) {
    const user = this;
    bcrypt.hash(user.password,10,(err,hash) => {
        user.password = hash;
        next();
    });
});

const User = mongoose.model("User",userSchema);

export default User;
