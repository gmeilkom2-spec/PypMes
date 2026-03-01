import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// --- КОНФИГ ---
const firebaseConfig = {
    apiKey: "AIzaSyB_nSjHAm1M_c8MBrToZ9GCp8fXS6DMEv8",
    databaseURL: "https://pypms-682bc-default-rtdb.europe-west1.firebasedatabase.app/", // Без этого сообщения не уйдут!
    projectId: "pypms-682bc",
    appId: "1:84311636378:web:f283c2ed23f5d7e62aa223"

// --- ЖДЕМ ЗАГРУЗКИ СТРАНИЦЫ ---
document.addEventListener('DOMContentLoaded', () => {
    
    // Привязываем кнопки к функциям
    window.register = () => {
        const email = document.getElementById("email").value;
        const pass = document.getElementById("password").value;
        console.log("Регистрация:", email); // Проверка в консоли
        createUserWithEmailAndPassword(auth, email, pass)
            .catch(e => alert("Ошибка: " + e.message));
    };

    window.login = () => {
        const email = document.getElementById("email").value;
        const pass = document.getElementById("password").value;
        console.log("Вход:", email); // Проверка в консоли
        signInWithEmailAndPassword(auth, email, pass)
            .catch(e => alert("Ошибка: " + e.message));
    };

    const sendBtn = document.getElementById("sendBtn");
    if (sendBtn) {
        sendBtn.addEventListener("click", () => {
            const text = document.getElementById("messageInput").value;
            if (text) {
                push(messagesRef, {
                    name: window.currentUser || "User",
                    text: text,
                    emoji: [':robot:', ':rocket:', ':fire:', ':computer:', ':sunglasses:'][Math.floor(Math.random() * 5)]
                });
                document.getElementById("messageInput").value = "";
            }
        });
    }
});

// --- СЛУШАЕМ СТАТУС ПОЛЬЗОВАТЕЛЯ ---
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("auth-container").style.display = "none";
        document.getElementById("chat-container").style.display = "flex";
        window.currentUser = user.email.split('@')[0];
    }
});

// --- ОТРИСОВКА СООБЩЕНИЙ ---
onChildAdded(messagesRef, (data) => {
    const msg = data.val();
    const messagesDiv = document.getElementById("messages");
    if (!messagesDiv) return;

    const div = document.createElement("div");
    div.className = "msg-item";

    const verifiedUsers = ["miron", "aleksia", "gleb", "diana"];
    const isVerified = verifiedUsers.includes(msg.name.toLowerCase());
    const badge = isVerified ? `<img src="images (14).png" style="width:16px; margin-left:5px;">` : "";

    div.innerHTML = `
        <span class="avatar">${msg.emoji}</span>
        <div class="content">
            <b>${msg.name}${badge}:</b> ${msg.text}
        </div>
    `;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
