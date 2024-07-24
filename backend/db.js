const mongoose = require('mongoose')
// const mongoURI =
//   'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';
const mongoURI =
  'mongodb://localhost:27017/inotebook?directConnection=true&readPreference=primary'

// const connectToMongo = ()=>{
//     mongoose.connect(mongoURI,()=>{
//         console.log('connected to mongo successfully')
//     })
// }

// module.exports = connectToMongo

async function connectToMongo() {
  await mongoose
    .connect(mongoURI)
    .then(() => console.log('Connected to Mongo Successfully'))
    .catch(err => console.log(err))
}

module.exports = connectToMongo
