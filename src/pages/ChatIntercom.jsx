import React from "react";
import img_succesful from "../img/img_succesful.png";
import "../css/chatIntercom.css";
import { useEffect } from "react";

const ChatIntercom = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const userName = urlParams.get("name");

  useEffect(() => {
    if (window.Intercom && userName) {
        window.Intercom("boot", {
            app_id: "pqsj7h24",
            name: userName,
        });
    }
}, [userName]);

  return (
    <section className="chat-intercom">
      <img src={img_succesful} alt="Chat grownet" />
      <h1>Welcome to Grownet Support</h1>
      <p>{userName} an agent is waiting to speak to you.</p>
      <div className="buttons-succesful">
        <button className="bttn btn-outline" id="my-intercom">
          Open chat
        </button>
      </div>
    </section>
  );
};

export default ChatIntercom;
