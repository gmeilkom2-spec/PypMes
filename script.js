import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyB_nSjHAm1M_c8MBrToZ9GCp8fXS6DMEv8",
    databaseURL: "https://pypms-682bc-default-rtdb.europe-west1.firebasedatabase.app/", // Без этого сообщения не уйдут!
    projectId: "pypms-682bc",
    appId: "1:84311636378:web:f283c2ed23f5d7e62aa223"

// --- РЕГИСТРАЦИЯ И ЛОГИН ---
window.register = () => {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    createUserWithEmailAndPassword(auth, email, pass).catch(e => alert(e.message));
};

window.login = () => {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    signInWithEmailAndPassword(auth, email, pass).catch(e => alert(e.message));
};

// --- ПЕРЕКЛЮЧЕНИЕ ЭКРАНОВ ---
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("auth-container").style.display = "none";
        document.getElementById("chat-container").style.display = "flex";
        // Используем часть email как никнейм
        window.currentUser = user.email.split('@')[0];
    }
});

// --- ОТПРАВКА С ЭМОДЗИ ---
document.getElementById("sendBtn").onclick = () => {
    const text = document.getElementById("messageInput").value;
    if (text) {
        push(messagesRef, {
            name: window.currentUser,
            text: text,
            // Добавляем случайный эмодзи каждому сообщению
            emoji: [':robot:', ':rocket:', ':fire:', ':computer:', ':sunglasses:'][Math.floor(Math.random() * 5)]
        });
        document.getElementById("messageInput").value = "";
    }
};

// --- ОТОБРАЖЕНИЕ С ГАЛОЧКОЙ И ЭМОДЗИ ---
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
            <b>${msg.name}${badge}:</b> ${msg.text}
        </div>
    `;
    document.getElementById("messages").appendChild(div);
    document.getElementById("messages").scrollTop = 100000;
});
