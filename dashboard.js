// Logout button
document.getElementById('logout').addEventListener('click', () => {
  localStorage.removeItem('user');
  window.location.href = 'index.html';
});

// Example dynamic data (later fetch from DB)
document.getElementById('todayTask').innerText = "✔ Complete daily English challenge";
document.getElementById('practice').innerText = "📘 Practice speaking by recording audio";
document.getElementById('interviewPrep').innerText = "🎤 Learn self introduction";

// Redirect to Today's Task page when the card is clicked
const todaysTaskCard = document.getElementById("todaysTaskCard");

todaysTaskCard.addEventListener("click", () => {
    window.location.href = "practice.html"; // change if your page has a different name or folder
});

// Redirect: Practice → m.html
document.getElementById("practiceCard").addEventListener("click", () => {
  window.location.href = "main.html";
});

// Redirect: Interview Preparation → interview.html
document.getElementById("interviewPrepCard").addEventListener("click", () => {
  window.location.href = "interview.html";
});

// // Redirect: Pronunciation Test → pronunciation.html
// document.getElementById("pronunciationCard").addEventListener("click", () => {
//   window.location.href = "pronunciation.html";
// });

document.addEventListener("DOMContentLoaded", () => {
  const pronunciationCard = document.getElementById("pronunciationCard");
  pronunciationCard.addEventListener("click", () => {
    window.location.href = "pronounciation.html";
  });
});