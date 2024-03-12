import { useState } from "react";
import { motion } from "framer-motion";
import { SiChatbot } from "react-icons/si";
import axios from "axios";

import "./Chatbot.css";

function Chatbot() {
  const [textChat, setTextChat] = useState("");
  const [inputHeight, setInputHeight] = useState("auto");

  const createChatLi = (message, className) => (
    <li className={`chat ${className}`}>
      {className === "outgoing" ? (
        <p>{message}</p>
      ) : (
        <>
          <span className="material-symbols-outlined">smart_toy</span>
          <p>{message}</p>
        </>
      )}
    </li>
  );

  const generateResponse = async () => {
    const API_KEY = "AIzaSyAL3zym14DRJf-uCK2FKx1EIgbl68mr1Jo";
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;
  
    try {
      const response = await axios.post(API_URL, {
        contents: [
          {
            parts: [
              {
                text: textChat,
              },
            ],
          },
        ],
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
      return "Oops! Something went wrong. Please try again later.";
    }
  };

  const handleChat = async () => {
    const userMessage = textChat.trim();
    if (!userMessage) return;
    setTextChat("");
    setInputHeight("auto");

    // Append user message to the chatbot
    const chatbox = document.querySelector(".chatbox");
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(async () => {
      const incomingChatLi = createChatLi("Thinking...", "incoming");
      chatbox.appendChild(incomingChatLi);
      const response = await generateResponse();
      chatbox.removeChild(incomingChatLi);
      chatbox.appendChild(createChatLi(response, "incoming"));
      chatbox.scrollTo(0, chatbox.scrollHeight);
    }, 600);
  };

  const handleInputChange = (event) => {
    const { scrollHeight } = event.target;
    setInputHeight(`${scrollHeight}px`);
    setTextChat(event.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
      e.preventDefault();
      handleChat();
    }
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ margin: "0% 10%" }}>
      <div className="">
        <button className="chatbot-toggler" onClick={() => document.body.classList.toggle("show-chatbot")}>
          <span className="material-symbols-outlined">
            <SiChatbot />
          </span>
          <span className="material-symbols-outlined">
            <SiChatbot />
          </span>
        </button>
        <div className="chatbot">
          <header>
            <h2>Chatbot</h2>
            <span className="material-symbols-outlined" onClick={() => document.body.classList.remove("show-chatbot")}>
              x
            </span>
          </header>
          <ul className="chatbox">
            <li className="chat incoming">
              <span className="material-symbols-outlined">smart_toy</span>
              <p>
                Hi there <br />
                How can I help you today?
              </p>
            </li>
          </ul>
          <div className="chat-input">
            <textarea
              placeholder="Enter a message...."
              required
              style={{ height: inputHeight }}
              value={textChat}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}></textarea>
            <span id="send-btn" className="material-symbols-outlined" onClick={handleChat}>
              send
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Chatbot;
