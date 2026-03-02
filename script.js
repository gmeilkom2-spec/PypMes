import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyB_nSjHAm1M_c8MBrToZ9GCp8fXS6DMEv8",
    databaseURL: "https://pypms-682bc-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "pypms-682bc",
    appId: "1:84311636378:web:f283c2ed23f5d7e62aa223"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const messagesRef = ref(db, "messages");

const sendBtn = document.getElementById("sendBtn");
const msgInput = document.getElementById("messageInput");
const userInput = document.getElementById("username");
const messagesDiv = document.getElementById("messages");

const emojis = [':cat:', ':frog:', ':panda_face:', ':fox:', ':lion_face:', ':owl:'];

sendBtn.onclick = () => {
    const name = userInput.value.trim() || "Аноним";
    const text = msgInput.value.trim();

    if (text) {
        push(messagesRef, {
            name: name,
            text: text,
            emoji: emojis[Math.floor(Math.random() * emojis.length)]
        });
        msgInput.value = "";
    }
};

onChildAdded(messagesRef, (data) => {
    const msg = data.val();
    const div = document.createElement("div");
    div.className = "msg-item";

    const verifiedUsers = ["miron", "aleksia", "gleb", "diana"];
    const isVerified = verifiedUsers.includes(msg.name.toLowerCase());
    const badge = isVerified ? `<img src="images (14).png" class="badge">` : "";

    div.innerHTML = `
        <span class="avatar">${msg.emoji}</span>
        <div class="content">
            <b>${msg.name}${badge}</b>
            <span>${msg.text}</span>
        </div>
    `;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
