const  GoogleGenerativeAI = require("@google/generative-ai");
const chatData_All = require("../Data/dataLetter");

// added the google generative ai for the api response
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
let chatInstance;
async function run(string) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  console.log(chatData_All[chatData_All.length - 1]);
  chatInstance = model.startChat({
    history: [
      {
        role: "user",
        parts: chatData_All
        // ["Developed by Siddhant Dhanaji Kadam student at NMCOE.Peth To assist student to give the positive fedback for there further jurney","programmed by Siddhant Dhanaji Kadam, And programmed in such way that I can Guide students for there admission process and many more"],
      },
      {
        role: "model",
        parts: "Great to meet you. What would you like to know?",
      },
    ],
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