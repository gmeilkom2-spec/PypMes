import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyB_nSjHAm1M_c8MBrToZ9GCp8fXS6DMEv8",
    databaseURL: "https://pypms-682bc-default-rtdb.europe-west1.firebasedatabase.app/", // Без этого сообщения не уйдут!
    projectId: "pypms-682bc",
    appId: "1:84311636378:web:f283c2ed23f5d7e62aa223"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const messagesRef = ref(db, "chat_messages"); // Назовем ветку chat_messages

const btn = document.querySelector("#sendBtn");
const msgInput = document.querySelector("#messageInput");
const userInput = document.querySelector("#username");
const messagesDiv = document.querySelector("#messages");

// Используем addEventListener — это надежнее
btn.addEventListener("click", () => {
    const name = userInput.value.trim() || "Аноним";
    const text = msgInput.value.trim();

    if (text !== "") {
        push(messagesRef, {
            name: name,
            text: text,
            timestamp: Date.now()
        }).then(() => {
            msgInput.value = ""; // Очищаем поле после успешной отправки
        }).catch((error) => {
            alert("Ошибка отправки: " + error.message);
        });
    }
});

// Слушаем новые сообщения
onChildAdded(messagesRef, (data) => {
    const msg = data.val();
    const div = document.createElement("div");
    div.style.marginBottom = "10px";

    // --- ОБНОВЛЕННАЯ ЛОГИКА ГАЛОЧЕК ---
    // Список никнеймов, которым нужна галочка (все маленькими буквами)
    const verifiedUsers = ["miron", "aleksia", "gleb", "diana"];
    
    // Проверяем, есть ли текущий пользователь в списке
    const isVerified = verifiedUsers.includes(msg.name.toLowerCase());
    
    // Если в списке — добавляем картинку
    const badge = isVerified ? `<img src="images (14).png" style="width:16px; margin-left:5px; vertical-align:middle;">` : "";
    // ----------------------------------

    div.innerHTML = `<strong>${msg.name}${badge}:</strong> ${msg.text}`;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; 
});
