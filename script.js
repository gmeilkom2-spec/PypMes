import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// ТВОИ НАСТРОЙКИ FIREBASE (возьми их в консоли Firebase)
const firebaseConfig = {
    apiKey: "AIzaSyB_nSjHAm1M_c8MBrToZ9GCp8fXS6DMEv8",
    databaseURL: "pypms-682bc.firebaseapp.com",
    projectId: "pypms-682bc",
    appId: "1:84311636378:web:f283c2ed23f5d7e62aa223"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const messagesRef = ref(db, "messages");

const btn = document.getElementById("sendBtn");
const msgInput = document.getElementById("messageInput");
const userInput = document.getElementById("username");
const messagesDiv = document.getElementById("messages");

// Функция отправки
btn.onclick = () => {
    const name = userInput.value.trim() || "Аноним";
    const text = msgInput.value.trim();
    if (text) {
        push(messagesRef, { name, text });
        msgInput.value = "";
    }
};

// Получение сообщений в реальном времени
onChildAdded(messagesRef, (data) => {
    const msg = data.val();
    const div = document.createElement("div");
    div.className = "msg-item";

    // ПРОВЕРКА НА ГАЛОЧКУ
    const isMiron = msg.name.toLowerCase() === "miron";
    const badge = isMiron ? `<img src="images (14).png" class="badge">` : "";

    div.innerHTML = `<b>${msg.name}${badge}:</b> <span>${msg.text}</span>`;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
