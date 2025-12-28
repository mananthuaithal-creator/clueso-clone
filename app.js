const express = require('express');
const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
<title>Clueso.io Clone</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

<style>
:root {
  --bg:#f3f4f6; --card:#fff; --text:#111827; --primary:#6366f1;
}
.dark {
  --bg:#111827; --card:#1f2937; --text:#f9fafb;
}
body {
  margin:0; font-family:Inter,Arial;
  background:var(--bg); color:var(--text);
}
.container {
  max-width:480px; margin:50px auto;
  background:var(--card); padding:26px;
  border-radius:14px; box-shadow:0 15px 40px rgba(0,0,0,.1);
}
input,button {
  width:100%; padding:12px; margin-top:10px;
  border-radius:10px; border:1px solid #d1d5db;
}
button {
  background:var(--primary); color:#fff;
  border:none; cursor:pointer; transition:.2s;
}
button:hover { transform:scale(1.03); }
.link { text-align:right; font-size:13px; color:var(--primary); cursor:pointer; }
.dashboard { display:none; }

.topbar {
  display:flex; justify-content:space-between; align-items:center;
  margin-bottom:15px;
}
.logout-btn { background:#ef4444; }

.card {
  background:#eef2ff; padding:16px;
  border-radius:12px; margin-top:16px;
}

.tag { font-size:12px; padding:4px 8px; border-radius:6px; }
.positive { background:#d1fae5; color:#065f46; }
.neutral { background:#fef3c7; color:#92400e; }
.negative { background:#fee2e2; color:#991b1b; }

.bar {
  height:10px; border-radius:6px; margin-top:6px;
}
.bar-pos { background:#22c55e; }
.bar-neu { background:#facc15; }
.bar-neg { background:#ef4444; }
</style>
</head>

<body>

<!-- LOGIN -->
<div class="container" id="auth">
<h2>Login</h2>
<input id="email" placeholder="Email"/>
<input id="password" type="password" placeholder="Password"/>
<div class="link" onclick="showForgot()">Forgot password?</div>
<button onclick="login()">Login</button>
</div>

<!-- RESET -->
<div class="container" id="forgot" style="display:none;">
<h2>Reset Password</h2>
<input id="resetEmail" placeholder="Email"/>
<input id="newPassword" placeholder="New Password"/>
<button onclick="resetPassword()">Reset</button>
<button onclick="backToLogin()" style="background:#9ca3af;">Back</button>
</div>

<!-- DASHBOARD -->
<div class="container dashboard" id="dashboard">
<div class="topbar">
<button onclick="toggleTheme()">Dark Mode</button>
<button class="logout-btn" onclick="logout()">Logout</button>
</div>

<h2>Dashboard</h2>

<div class="card">
<h3>Send Feedback</h3>
<input id="feedback" placeholder="Enter feedback"/>
<button onclick="sendFeedback()">Submit</button>
</div>

<div class="card">
<h3>Feedback History</h3>
<div id="feedbackList"></div>
</div>

<div class="card">
<h3>AI Insights</h3>
<button onclick="generateAI()">Generate</button>
<p id="aiText"></p>

<h4>Sentiment Meter</h4>
<p>Positive</p><div id="posBar" class="bar bar-pos"></div>
<p>Neutral</p><div id="neuBar" class="bar bar-neu"></div>
<p>Negative</p><div id="negBar" class="bar bar-neg"></div>
</div>
</div>

<script>
let USER_EMAIL="admin@clueso.com", USER_PASSWORD="admin123";
let feedbacks=JSON.parse(localStorage.getItem("feedbacks")||"[]");

function login(){
 if(email.value===USER_EMAIL&&password.value===USER_PASSWORD){
 auth.style.display="none"; dashboard.style.display="block"; renderFeedbacks();
 } else alert("Invalid credentials");
}
function logout(){ dashboard.style.display="none"; auth.style.display="block"; }
function showForgot(){ auth.style.display="none"; forgot.style.display="block"; }
function backToLogin(){ forgot.style.display="none"; auth.style.display="block"; }
function resetPassword(){
 if(resetEmail.value===USER_EMAIL){ USER_PASSWORD=newPassword.value; alert("Updated"); backToLogin();}
 else alert("Email not found");
}
function toggleTheme(){ document.body.classList.toggle("dark"); }

function sendFeedback(){
 let text=feedback.value.toLowerCase();
 if(!text) return alert("Enter feedback");
 let sentiment=text.includes("good")?"positive":text.includes("bad")?"negative":"neutral";
 feedbacks.push({text,sentiment});
 localStorage.setItem("feedbacks",JSON.stringify(feedbacks));
 feedback.value=""; renderFeedbacks();
}

function renderFeedbacks(){
 feedbackList.innerHTML=feedbacks.map(f =>
 \`<p>\${f.text} <span class="tag \${f.sentiment}">\${f.sentiment}</span></p>\`).join("");
}

function generateAI(){
 let total=feedbacks.length||1;
 let pos=feedbacks.filter(f=>f.sentiment==="positive").length;
 let neu=feedbacks.filter(f=>f.sentiment==="neutral").length;
 let neg=feedbacks.filter(f=>f.sentiment==="negative").length;

 posBar.style.width=(pos/total*100)+"%";
 neuBar.style.width=(neu/total*100)+"%";
 negBar.style.width=(neg/total*100)+"%";

 aiText.innerText="AI Insight: Most users feel "+
 (pos>neg?"positive":"neutral")+" about the product based on feedback trends.";
}
</script>

</body>
</html>
`);
});

app.listen(PORT, '127.0.0.1', () => {
  console.log('Clueso Clone running → http://localhost:5000');
});
