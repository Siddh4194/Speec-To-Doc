// const env = reuire('env')
const express = require('express');
const mongoose = require('mongoose');
const port = 3001;


const app = express();

pass ='mongodb+srv://Siddh1418:vfpYtzGxw8hSdjmG@chatbot.4zqxkh3.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(pass, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('Connected to MongoDB');
  });


app.get('/',(req,res)=>{
    res.send("Backend API");
})

app.listen(port, ()=>{
    console.log(`api is running on port ${port}`);
})