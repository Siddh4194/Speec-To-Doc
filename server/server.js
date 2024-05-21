// const env = reuire('env')
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
require('dotenv').config();
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
// creadentials pakcages imported
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const { chatData_All } = require('./Data/dataLetter');
const markdownPdf = require('markdown-pdf')


const port = 3001;


const app = express();

app.use(
  express.urlencoded({ extended: true })
);
  
  app.use(express.json());//we can assign the limits
  app.use(bodyparser.urlencoded({extended:true}));

  // set up the cors for the ss events
  app.use(cors(
    {
    origin:['http://localhost:3000'],
    methods:['GET', 'POST','PUT','DELETE'],
    credentials:true
  }
));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
});


// Making Creadentials
app.use(session({
  secret:process.env.SECRETKEY,
  resave:false,
  saveUninitialized:false
}))
app.use(passport.initialize());
app.use(passport.session());


// generative ai connectivity
// the user unput is fetched and give back the predictios.


// ----------------------------------------------------
//-----------------------google api----------------------
//----------------------------------------------------
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

let chatInstance;
async function run(string) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  const chatHistory = [
    {
      role: "user",
      parts: chatData_All,
    },
    {
      role: "model",
      parts: ["Hi! I can answer your questions or generate creative text formats. What would you like to do?"],
    },
  ];
  // console.log(chatData_All[chatData_All.length - 1]);
  chatInstance = model.startChat({
    history: chatHistory
    ,
    generationConfig: {
      maxOutputTokens: 400,
    },
  });
  const result = await chatInstance.sendMessage(string);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
  // console.log("model is loaded successfully");
}

async function renderModelReply(string){
  const result = await chatInstance.sendMessage(string);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
}





var pass = process.env.PASS_DB;




// const mongoose = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017/speech2text';

pass ='mongodb+srv://Siddh1418:vfpYtzGxw8hSdjmG@chatbot.4zqxkh3.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// mongoose.connect(connectionString);

const db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error:'));
db.once('open', function() {
console.log('Connected to MongoDB');
});


const UserSchema = new mongoose.Schema({
  userID:String,
  name:String,
  password:String,
})

UserSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User",UserSchema);


passport.use(User.createStrategy());

// PASSPORT SERIALIZATION
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.post('/login', function(req,res){
  console.log(req.body);
  const user = new User({
    username: req.body.userId,
    password: req.body.password
  });
  passport.authenticate('local', function(err) {
    if (err) {
      // Handle authentication error
      console.error(err);
      res.status(401).send({ status: false, message: err.message });
    }
    else {
      // Authentication successful, log in the user and send response
      req.login(user, function(err) {
        if (err) {
          console.error(err);
          return res.status(400).send({ status: false, message: err.message });
        }
        res.send({ status: true, message: 'Successfully logged in' });
      });
    }
  })(req, res);
// const user = new User({
//     username: req.body.userId,
//     password: req.body.password
// });
// req.login(user,function(err){
//     if(err){
//         console.log(err);
//         res.send({status:false});
//     } else{
//       // console.log(req.body);
//       User.findOne({
//         $and: [
//           { username: req.body.userID
//             // req.body.adhar 
//           },
//           { password: req.body.password
//             // req.body.number 
//           }
//         ]
//       })
//       .exec()
//       .then(data => {
//         console.log("Executed Query:", data);
//         if (data) {
//           console.log("User found:", data);
//           res.send({status: true});
//         } else {
//           console.log("User not found");
//           res.send({status: false});
//         }
//       })
//       .catch(err => {
//         console.error("Error during findOne:", err);
//       });
//     }
// })
})

app.get('/logout', function(req, res){
  console.log("under the logout");
req.logout((err)=>{
  err ? 
  res.status(500).send({status:"Error",message:"logOut Failed"})
  :
  res.send({status:true});
});
})

app.get('/checkAuth',function(req, res){
if(req.isAuthenticated()){
  console.log("Authorized access");
    res.send({status:true,user:req.user});
} else{
    res.send({status:false});
}
});


app.post('/register', async function (req, res) {
  const { userId, password} = req.body;
  console.log(req.body);
  try {
    // Server-side validation (optional)
    if (!userId || !password) {
      throw new Error('Missing required fields: username or password');
    }
    // if (userId.length < 6 || password.length < 8) {
    //   throw new Error('Username and password must be at least 6 and 8 characters long, respectively');
    // }

    // Hash the password before saving
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Register user with Passport
    const user = await User.register({ username: userId}, password);
    passport.authenticate('local', function(err) {
      if (err) {
        // Handle authentication error
        console.error(err);
        res.status(401).send({ status: false, message: err.message });
      }
      else {
        // Authentication successful, log in the user and send response
        req.login(user, function(err) {
          if (err) {
            console.error(err);
            return res.status(400).send({ status: false, message: err.message });
          }
          res.send({ status: true, message: 'Successfully logged in' });
        });
      }
    })(req, res);
  } 
  catch (error) {
    console.error(error);
    res.status(400).send({ status: false, message: error.message });
  }
// try {
//   // Server-side validation (optional)
//   if (!userId || !password) {
//     throw new Error('Missing required fields: username or password');
//   }
//   if (userId.length < 6 || password.length < 8) {
//     throw new Error('Username and password must be at least 6 and 8 characters long, respectively');
//   }

//   // Hash the password before saving
//   // const hashedPassword = await bcrypt.hash(password, 10);

//   // Register user with Passport
//   const user = await User.register({ username: userId,name:name}, password);
//   passport.authenticate('local', function(err) {
//     if (err) {
//       // Handle authentication error
//       console.error(err);
//       res.status(401).send({ status: false, message: err.message });
//     }
//     else {
//       // Authentication successful, log in the user and send response
//       req.login(user, function(err) {
//         if (err) {
//           console.error(err);
//           return res.status(400).send({ status: false, message: err.message });
//         }
//         res.send({ status: true, message: 'Successfully logged in' });
//       });
//     }
//   })(req, res);
// }
// catch (error) {
//   console.error(error);
//   res.status(400).send({ status: false, message: error.message });
// }
});


app.post('/predict',async function(req,res){
  // console.log(req.body.input);
  let pred = await run(req.body.input);
  res.send({responce:pred});
})

app.get('/',(req,res)=>{
    res.send("Backend API");
})

app.listen(port, ()=>{
    console.log(`api is running on port ${port}`);
})