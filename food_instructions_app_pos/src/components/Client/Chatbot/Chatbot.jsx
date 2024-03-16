import { motion } from "framer-motion";
import "./Chatbot.css";
import { useState } from "react";
import { SiChatbot } from "react-icons/si";
function Chatbot() {
  const [textChat, setTextChat] = useState("");
  const chatbox = document.querySelector(".chatbox");

  let userMessage;
  const API_KEY = "AIzaSyAL3zym14DRJf-uCK2FKx1EIgbl68mr1Jo";

  const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent =
      className === "outgoing" ? `<p></p>` : `<span className="material-symbols-outlined">smart_toy</span><p></p>`;

    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
  };

  const generateResponse = (incomingChatLi) => {
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;
    const messageElement = incomingChatLi.querySelector("p");

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: textChat,
              },
            ],
          },
        ],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        messageElement.textContent = data.candidates[0].content.parts[0].text;
      })
      .catch((error) => {
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! Something went wrong. Please try again later.";
      });
  };
  const [inputHeight, setInputHeight] = useState("auto");
  const handleChat = () => {
    userMessage = textChat.trim();
    if (!userMessage) return;
    setTextChat("");
    setInputHeight("auto");
    // append user message to the chatbot
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    setTimeout(() => {
      const incomingChatLi = createChatLi("Thinking...", "incoming");
      chatbox.appendChild(incomingChatLi);
      generateResponse(incomingChatLi);
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
      <div>
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
