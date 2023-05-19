const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://aakashskilldevelopment:4X6Ubs3yl6sfei8g@cluster0.qebrfk1.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connection successful');
}).catch((e) => {
  console.log(e);
});
