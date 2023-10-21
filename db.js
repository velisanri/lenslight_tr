import mongoose from "mongoose";
const conn = () =>
{
    mongoose.connect(process.env.DB_URI,{
        dbName:"lenslight_tr",
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>{
        console.log("Db bağlantısı sağlandı.")
    })
    .catch((err)=>{
        console.log(`Db bağlantısı sağlanamadi : ${err}`);
    });
};

export default conn;