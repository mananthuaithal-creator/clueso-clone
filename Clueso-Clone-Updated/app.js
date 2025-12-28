
const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>Clueso.io Clone</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f3f4f6;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 400px;
      margin: 80px auto;
      background: white;
      padding: 25px;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }
    h2, h3 {
      text-align: center;
    }
    input, button {
      width: 100%;
      padding: 10px;
      margin-top: 10px;
      border-radius: 8px;
      border: 1px solid #d1d5db;
    }
    button {
      background: #6366f1;
      color: white;
      cursor: pointer;
      transition: transform 0.2s, background 0.2s;
    }
    button:hover {
      background: #4f46e5;
      transform: scale(1.03);
    }
    .dashboard {
      display: none;
    }
    .card {
      margin-top: 15px;
      padding: 15px;
      border-radius: 10px;
      background: #f9fafb;
    }
    .ai-box {
      margin-top: 12px;
      padding: 12px;
      background: #eef2ff;
      border-left: 4px solid #6366f1;
      border-radius: 8px;
      min-height: 50px;
    }
  </style>
</head>
<body>
  <div class="container" id="auth">
    <h2>Login</h2>
    <input placeholder="Email" />
    <input placeholder="Password" type="password"/>
    <button onclick="login()">Login</button>
  </div>

  <div class="container dashboard" id="dashboard">
    <h2>Dashboard</h2>
    <div class="card">
      <h3>Feedback</h3>
      <input id="feedback" placeholder="Enter feedback"/>
      <button onclick="sendFeedback()">Send</button>
    </div>
    <div class="card">
      <h3>AI Insights</h3>
      <button id="aiBtn" onclick="generateAI()">Generate</button>
      <div id="aiText" class="ai-box"></div>
    </div>
  </div>

<script>
function login() {
  document.getElementById("auth").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
}

function sendFeedback() {
  alert("Feedback submitted!");
}

const insights = [
  "Users prefer fast and simple feedback tools.",
  "Minimal dashboards improve engagement.",
  "Short onboarding flows increase retention."
];

function typeText(el, text) {
  el.innerHTML = "";
  let i = 0;
  const interval = setInterval(() => {
    el.innerHTML += text.charAt(i);
    i++;
    if (i >= text.length) clearInterval(interval);
  }, 30);
}

function generateAI() {
  const btn = document.getElementById("aiBtn");
  const box = document.getElementById("aiText");
  btn.disabled = true;
  btn.innerText = "Generating...";
  box.innerHTML = "Analyzing feedback...";

  setTimeout(() => {
    const insight = insights[Math.floor(Math.random() * insights.length)];
    typeText(box, "AI Insight: " + insight);
    btn.disabled = false;
    btn.innerText = "Generate";
  }, 1200);
}
</script>
</body>
</html>
  `);
});

app.listen(PORT, "127.0.0.1", () => {
  console.log("Clueso Clone running → http://localhost:5000");
});
