import { useState,useRef,useEffect } from 'react'
import {Chatbot} from "supersimpledev"
import RobotProfile from "./assets/robot.png"
import UserProfile from "./assets/user.png"
import './App.css'
function ChatInput({chatMessages, setChatMessages}) {
        const [inputText, setInputText] = useState("");
        function saveInputText(event){
          setInputText(event.target.value);
        }
        
        function sendMessage(){
          const newchatMessages=[
            ...chatMessages,
            {
                message:inputText,
                sender:"user",
                key:"id5"
            }
            ]
          setChatMessages(newchatMessages);
            const response=Chatbot.getResponse(inputText);
            setChatMessages([
            ...newchatMessages,
            {
                message:response,
                sender:"robot",
                key:"id5"
            }
            ]);
            setInputText("");
        }
        return(
            <div className="chat-input-container">
                <input type="text" placeholder="Type your message here" size="30"onChange={saveInputText}
                  value={inputText} onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    sendMessage();
                  }

                  if (e.key === 'Escape') {
                    setInputText("");
                  }
                }} className="chat-input"/>
                <button onClick={sendMessage} className="send-message">Send</button>
                
            </div>
      )
      }
      function ChatMessage(props){
        const {message, sender} = props;
        return(
           <div className={sender==="user"?"chat-message-user":"chat-message-robot"}> 
                {sender==="robot" && <img src={RobotProfile} className="chat-message-profile"/>}
                <div className="chat-message-text">
                {message }
                </div>
                {sender==="user" && <img src={UserProfile} className="chat-message-profile"/>}
            </div>
      )
          }
        function ChatMessages({chatMessages}){
            const chatmessagesref=useRef(null);

          useEffect(() => {
            const chatmessageElem=chatmessagesref.current
            if(chatmessageElem){
              chatmessageElem.scrollTop=chatmessageElem.scrollHeight;
            }
          }, [chatMessages]);
          
          return(
            <div className="chat-messages-container" ref={chatmessagesref}>
             {chatMessages.map((msg) =>  ( 
            
            <ChatMessage
             message={msg.message} 
             sender={msg.sender} 
             key={msg.key}
             />
             ))}
             </div>
          );
             }
 function App(){
            const [chatMessages, setChatMessages]=useState([{
            message:"Hello chatbot!",
            sender:"user",
            key:"id1"
          },
          {
            message:"Hello, how can I help you?",
            sender:"robot",
            key:"id2"
          },
          {
            message:"Can you get me today's date?",
            sender:"user",
            key:"id3"
          },
          {
            message:"Todays date is september 27, 2023",
            sender:"robot",
            key:"id4"
          }]);
         // const chatMessages=array[0];
         // const setChatMessages=array[1];

          return(
            <div className="app-container">
              <ChatMessages chatMessages={chatMessages} />
              <ChatInput  chatMessages={chatMessages} setChatMessages={setChatMessages}/>
            </div>
          )}
export default App
