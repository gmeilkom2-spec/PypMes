// 🔥 ВСТАВЬ СВОЙ firebaseConfig
const firebaseConfig = {
  apiKey: "AIzaSyB_nSjHAm1M_c8MBrToZ9GCp8fXS6DMEv8",
  authDomain: "pypms-682bc.firebaseapp.com",
  projectId: "pypms-682bc",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const OFFICIAL_NAME = "Pypik";
const OFFICIAL_PASSWORD = "120230"; // ← поменяй пароль

let username = "";
let verified = false;

// показать поле пароля если ник Мирон
document.getElementById("loginName").addEventListener("input", (e) => {
  const pass = document.getElementById("password");
  if (e.target.value.trim().toLowerCase() === OFFICIAL_NAME) {
    pass.style.display = "block";
  } else {
    pass.style.display = "none";
    pass.value = "";
  }
});

function login() {
  const nameInput = document.getElementById("loginName").value.trim();
  const passInput = document.getElementById("password").value;

  if (!nameInput) return alert("Введите ник");

  username = nameInput;
  verified = false;

  if (username.toLowerCase() === OFFICIAL_NAME) {
    if (passInput !== OFFICIAL_PASSWORD) {
      alert("Неверный пароль для аккаунта Мирон");
      return;
    }
    verified = true;
  }

  document.getElementById("login").style.display = "none";
  document.getElementById("chat").style.display = "block";

  listenMessages();
}

function send() {
  const input = document.getElementById("input");
  const text = input.value.trim();
  if (!text) return;

  db.collection("messages").add({
    user: username,
    verified: verified,
    text: text,
    time: Date.now()
  });

  input.value = "";
}

function listenMessages() {
  db.collection("messages")
    .orderBy("time")
    .onSnapshot((snapshot) => {
      const list = document.getElementById("messages");
      list.innerHTML = "";

      snapshot.forEach((doc) => {
        const msg = doc.data();
        const li = document.createElement("li");

        li.innerHTML = `
          <strong>
            ${msg.user}
            ${msg.verified ? '<span class="badge"></span>' : ''}
          </strong>: ${msg.text}
        `;

        list.appendChild(li);
      });
    });
}
