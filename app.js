const express = require('express');
const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<title>Clueso Clone</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

<style>
:root{
 --primary:#6366f1;
 --glass:rgba(255,255,255,.18);
 --bg:#f3f4f6;
 --text:#111;
}
.dark{
 --bg:#0f172a;
 --text:#f9fafb;
}
*{box-sizing:border-box}
body{
 margin:0;font-family:Inter,Arial;
 background:var(--bg);color:var(--text);
 min-height:100vh;
 transition:.4s;
}

/* background */
.bg{
 position:fixed;inset:0;
 background:url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f') center/cover;
 opacity:.12;
 z-index:-2;
}
.dark .bg{
 background:url('https://images.unsplash.com/photo-1518770660439-4636190af475') center/cover;
 opacity:.18;
}
.overlay{
 position:fixed;inset:0;
 background:linear-gradient(120deg,#6366f155,#22d3ee55);
 z-index:-1;
 animation:move 6s infinite alternate;
}
@keyframes move{
 from{filter:hue-rotate(0deg)}
 to{filter:hue-rotate(30deg)}
}

.container{
 max-width:420px;
 margin:70px auto;
 padding:28px;
 border-radius:18px;
 backdrop-filter:blur(18px);
 background:var(--glass);
 box-shadow:0 20px 60px rgba(0,0,0,.25);
}

.center{text-align:center}

/* logo */
.logo{
 width:70px;height:70px;
 border-radius:50%;
 background:linear-gradient(135deg,#6366f1,#22d3ee);
 display:flex;align-items:center;justify-content:center;
 margin:0 auto 10px;
 font-size:34px;color:#fff;
}

h2{
 text-align:center;
 border-bottom:3px solid var(--primary);
 display:inline-block;
 padding-bottom:4px;
}

input,button{
 width:100%;padding:12px;margin-top:12px;
 border-radius:12px;border:none;
 font-size:14px;
}
input{background:#fff}
button{
 background:linear-gradient(135deg,#6366f1,#22d3ee);
 color:#fff;cursor:pointer;
 transition:.3s;
}
button:hover{transform:scale(1.03)}

.remember{
 display:flex;justify-content:center;
 margin-top:10px;
}
.remember label{
 display:flex;align-items:center;gap:6px;
 white-space:nowrap;
}

.link{text-align:right;font-size:13px;color:#fff;cursor:pointer}

.dashboard{display:none}

.topbar{
 display:flex;justify-content:flex-end;gap:10px;
}
.topbar button{
 width:auto;padding:8px 12px;font-size:12px;
}

.card{
 background:rgba(255,255,255,.25);
 padding:16px;border-radius:14px;margin-top:16px;
}

.bar{
 height:10px;border-radius:6px;background:#ddd;overflow:hidden
}
.bar span{
 display:block;height:100%;width:0;transition:1s
}
.pos{background:#22c55e}
.neu{background:#facc15}
.neg{background:#ef4444}

#generateBtn.loading{
 animation:pulse 1.2s infinite;
 pointer-events:none;
}
@keyframes pulse{
 0%{box-shadow:0 0 6px #6366f1}
 50%{box-shadow:0 0 18px #6366f1}
 100%{box-shadow:0 0 6px #6366f1}
}
</style>
</head>

<body>
<div class="bg"></div>
<div class="overlay"></div>

<!-- LOGIN -->
<div class="container" id="auth">
<div class="logo">🔒</div>
<div class="center"><h2>Login</h2></div>

<input id="email" placeholder="Email" autocomplete="username"/>
<input id="password" type="password" placeholder="Password" autocomplete="current-password"/>

<div class="remember">
<label>
<input type="checkbox" id="rememberMe"> Remember Me
</label>
</div>

<div class="link" onclick="showForgot()">Forgot password?</div>
<button onclick="login()">Login</button>
</div>

<!-- RESET -->
<div class="container" id="forgot" style="display:none">
<h2>Reset Password</h2>
<input id="resetEmail" placeholder="Email"/>
<input id="newPassword" placeholder="New Password"/>
<button onclick="resetPassword()">Reset</button>
<button onclick="backToLogin()">Back</button>
</div>

<!-- DASHBOARD -->
<div class="container dashboard" id="dashboard">
<div class="topbar">
<button onclick="toggleTheme()">🌙</button>
<button onclick="logout()">🚪</button>
</div>

<h2>Dashboard</h2>

<div class="card">
<h3>💬 Send Feedback</h3>
<input id="feedback" placeholder="Type feedback"/>
<button onclick="sendFeedback()">Submit</button>
</div>

<div class="card">
<div style="display:flex;justify-content:space-between;align-items:center">
<h3 style="margin:0">📜 Feedback History</h3>
<button onclick="clearFeedbacks()" style="width:auto;padding:6px 10px;font-size:12px;background:linear-gradient(135deg,#ef4444,#f97316)">🗑️ Clear</button>
</div>
<div id="feedbackList"></div>
</div>

<div class="card">
<h3>🧠 AI Insights</h3>
<button id="generateBtn" onclick="generateAI()">⚡ Generate</button>

<p>😊 Positive</p><div class="bar"><span id="pos" class="pos"></span></div>
<p>😐 Neutral</p><div class="bar"><span id="neu" class="neu"></span></div>
<p>😞 Negative</p><div class="bar"><span id="neg" class="neg"></span></div>

<p id="aiText"></p>
</div>
</div>

<audio id="successSound" preload="auto">
<source src="https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3" type="audio/mpeg">
</audio>

<script>
let ADMIN_EMAIL="admin@clueso.com";
let ADMIN_PASS=localStorage.getItem("adminPass")||"admin123";
let feedbacks=JSON.parse(localStorage.getItem("feedbacks")||"[]");
let idleTimer;

const sound=document.getElementById("successSound");

if(localStorage.getItem("remember")==="true"){
 email.value=localStorage.getItem("email");
 password.value=localStorage.getItem("password");
 rememberMe.checked=true;
}
if(localStorage.getItem("theme")==="dark"){
 document.body.classList.add("dark");
}

function playSuccess(){
 sound.currentTime=0;
 sound.play().catch(()=>{});
}

function login(){
 if(email.value===ADMIN_EMAIL && password.value===ADMIN_PASS){
   if(rememberMe.checked){
     localStorage.setItem("email",email.value);
     localStorage.setItem("password",password.value);
     localStorage.setItem("remember","true");
   }
   auth.style.display="none";
   dashboard.style.display="block";
   playSuccess();
   renderFeedbacks();
   resetIdle();
 }else alert("Invalid credentials");
}

function logout(){
 dashboard.style.display="none";
 auth.style.display="block";
}

function showForgot(){auth.style.display="none";forgot.style.display="block";}
function backToLogin(){forgot.style.display="none";auth.style.display="block";}

function resetPassword(){
 if(resetEmail.value===ADMIN_EMAIL){
   ADMIN_PASS=newPassword.value;
   localStorage.setItem("adminPass",ADMIN_PASS);
   alert("Password updated");
   backToLogin();
 }else alert("Email not found");
}

function toggleTheme(){
 document.body.classList.toggle("dark");
 localStorage.setItem("theme",document.body.classList.contains("dark")?"dark":"light");
}

function sendFeedback(){
 if(!feedback.value)return;
 let text=feedback.value.toLowerCase();
 let sentiment=text.includes("good")?"positive":text.includes("bad")?"negative":"neutral";
 feedbacks.push({text,sentiment});
 localStorage.setItem("feedbacks",JSON.stringify(feedbacks));
 feedback.value="";
 renderFeedbacks();
}

function renderFeedbacks(){
 feedbackList.innerHTML=feedbacks.map(f=>\`<p>\${f.text} (\${f.sentiment})</p>\`).join("");
}

function clearFeedbacks(){
 if(!feedbacks.length)return alert("No feedback to clear");
 if(confirm("Delete all feedback history?")){
   feedbacks=[];
   localStorage.removeItem("feedbacks");
   renderFeedbacks();
 }
}

function generateAI(){
 let btn=generateBtn;
 btn.classList.add("loading");
 btn.innerText="⏳";
 setTimeout(()=>{
   let total=feedbacks.length||1;
   let p=feedbacks.filter(f=>f.sentiment==="positive").length;
   let n=feedbacks.filter(f=>f.sentiment==="neutral").length;
   let g=feedbacks.filter(f=>f.sentiment==="negative").length;
   pos.style.width=p/total*100+"%";
   neu.style.width=n/total*100+"%";
   neg.style.width=g/total*100+"%";
   aiText.innerText=p>g?"🔥 Users love it!":g>p?"⚠️ Needs improvement":"😐 Mixed feedback";
   btn.classList.remove("loading");
   btn.innerText="⚡ Generate";
   playSuccess();
 },900);
}

function resetIdle(){
 clearTimeout(idleTimer);
 idleTimer=setTimeout(logout,5*60*1000);
}
document.onmousemove=resetIdle;
document.onkeydown=resetIdle;
</script>
</body>
</html>
`);
});

app.listen(PORT, () => console.log('Running http://localhost:5000'));
