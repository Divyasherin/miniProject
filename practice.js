// ---------------- DOM Elements ----------------
const practiceParagraph = document.getElementById("practiceParagraph");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const playBtn = document.getElementById("playBtn");
const deleteBtn = document.getElementById("deleteBtn");
const uploadBtn = document.getElementById("uploadBtn");
const recordingSymbol = document.getElementById("recordingSymbol");
const audioPlayer = document.getElementById("audioPlayer");

const correctedText = document.getElementById("correctedText");
const suggestions = document.getElementById("suggestions");
const scoreEl = document.getElementById("score");
const feedback = document.getElementById("feedback");

let mediaRecorder;
let audioChunks = [];
let audioBlob, audioUrl, audio;
let recognition;  // Web Speech API recognizer
let transcriptText = "";

// // ---------------- Load content from DB ----------------
// async function loadPracticeContent() {
//     try {
//         const response = await fetch("http://localhost:3000/task");
//         const data = await response.json();
//         practiceParagraph.textContent = data.content;
//     } catch (error) {
//         practiceParagraph.textContent = "Failed to load content.";
//         console.error(error);
//     }
// }

const practiceContents = [
  "The sun is shining brightly today. It's a perfect day for a walk in the park. I love spending time outdoors and enjoying nature. Fresh air and exercise are just what I need.",
  "My favorite book is a classic novel. I've read it multiple times, but I still enjoy it. The characters are so well-developed and relatable. It's a great story that never gets old.",
  "Learning a new language is a challenging task. It requires dedication and consistent practice. I try to practice every day, even if it's just for a few minutes. It's amazing how much progress I've made so far.",
  "Traveling is one of my favorite things to do. I love exploring new places and trying new foods. There's something exciting about discovering new cultures and meeting new people. It's a great way to broaden your horizons.",
  "My family is very important to me. We always make time for each other, even when life gets busy. We have a tradition of having dinner together on Sundays. It's a special time for us to connect.",
  "The city is always bustling with activity. There's always something to do or see. I love the energy and excitement of city life. It's a great place to live and work.",
  "My favorite hobby is painting. I find it very relaxing and enjoyable. I love expressing myself through art and creating something beautiful. It's a great way to unwind after a long day.",
  "Learning to cook is a skill I've been wanting to develop. I've been watching videos and trying new recipes. It's not always easy, but it's worth it in the end. I love sharing my creations with friends and family.",
  "The beach is my happy place. I love the sound of the waves and the smell of the salt air. It's a great place to relax and clear my mind. I try to visit the beach at least once a month.",
  "My best friend is someone I've known since childhood. We've been through a lot together and have a special bond. I value our friendship and cherish the memories we've made. We're always there for each other.",
  "Traveling alone can be intimidating, but it's also liberating. I love the freedom to do what I want, when I want. It's a great way to meet new people and try new things. I'm more confident now than I used to be.",
  "My favorite season is autumn. I love the colors of the leaves and the crisp air. It's a great time to go for a hike or take a walk in the park. The scenery is beautiful and inspiring.",
  "Learning to play a musical instrument is a challenge I'm up for. I've been practicing for months, and it's starting to pay off. I love the feeling of creating music and expressing myself. It's a great way to relax and have fun.",
  "The mountains are a place I love to visit. I love the fresh air and the beautiful scenery. It's a great place to hike and explore. I feel so alive and connected to nature.",
  "My favorite food is Italian. I love pasta and pizza, and I'm always trying new recipes. I think it's because I grew up eating it at home. It's a comfort food for me.",
  "The library is a place I love to visit. I love the quiet atmosphere and the smell of books. It's a great place to study and learn. I feel so focused and productive there.",
  "Learning to dance is something I've always wanted to do. I've been taking classes for a few months, and it's been a blast. I love the feeling of moving to the music and expressing myself. It's a great way to exercise and have fun.",
  "The park is a place I love to visit. I love the greenery and the peaceful atmosphere. It's a great place to relax and unwind. I try to visit the park at least once a week.",
  "My favorite subject is science. I love learning about the world and how it works. I think it's because I was inspired by my teachers in school. It's a fascinating field that never gets old.",
  "Traveling with friends is one of my favorite things to do. I love sharing experiences and making memories with them. We always have so much fun together, no matter where we go. It's a great way to bond and create lasting memories.",
  "The museum is a place I love to visit. I love learning about history and culture. It's a great place to expand my knowledge and appreciate the arts. I feel so inspired and enriched after a visit.",
  "Learning to code is a skill I've been wanting to develop. I've been taking online courses and practicing every day. It's not always easy, but it's worth it in the end. I love the feeling of creating something from scratch.",
  "The beach at sunset is a breathtaking sight. I love watching the colors change and the sky turn pink. It's a great place to relax and reflect. I feel so peaceful and calm.",
  "My favorite sport is basketball. I love playing and watching it. I think it's because I played on a team in high school. It's a great way to stay active and have fun.",
  "The city at night is a magical place. I love the lights and the energy. It's a great place to explore and discover new things. I feel so alive and inspired.",
  "Learning to meditate is something I've been wanting to try. I've been practicing for a few weeks, and it's been a game-changer. I love the feeling of calm and clarity it brings. It's a great way to reduce stress and improve focus.",
  "The forest is a place I love to visit. I love the trees and the wildlife. It's a great place to hike and explore. I feel so connected to nature and at peace.",
  "My favorite holiday is Christmas. I love the decorations and the music. I think it's because I grew up with a big family and lots of traditions. It's a special time of year.",
  "Traveling with family is a great way to bond. I love sharing experiences and making memories with them. We always have so much fun together, no matter where we go. It's a great way to create lasting memories.",
  "The concert was an amazing experience. I love live music and the energy of the crowd. It's a great way to enjoy my favorite artists and connect with others. I feel so alive and inspired.",
  "Learning to write is a skill I've been developing. I've been practicing every day, and it's starting to pay off. I love the feeling of creating something from scratch and expressing myself. It's a great way to communicate and tell stories.",
  "The mountains at sunrise are a breathtaking sight. I love watching the colors change and the sky turn pink. It's a great place to relax and reflect. I feel so peaceful and calm.",
  "My favorite type of music is jazz. I love the improvisation and the complexity. I think it's because I was introduced to it by a friend in college. It's a great way to relax and enjoy some great music.",
  "The park on a sunny day is a perfect place to be. I love the greenery and the peaceful atmosphere. It's a great place to relax and unwind. I try to visit the park at least once a week.",
  "Learning to cook a new cuisine is a challenge I'm up for. I've been watching videos and trying new recipes. It's not always easy, but it's worth it in the end. I love sharing my creations with friends and family.",
  "The city is a place I love to explore. I love the energy and the excitement. It's a great place to discover new things and meet new people. I feel so alive and inspired.",
  "My favorite book is a favorite of mine. I've read it multiple times, but I still enjoy it. The characters are so well-developed and relatable. It's a great story that never gets old.",
  "Traveling is one of my favorite things to do. I love exploring new places and trying new foods. There's something exciting about discovering new cultures and meeting new people. It's a great way to broaden your horizons.",
  "The beach is my happy place. I love the sound of the waves and the smell of the salt air. It's a great place to relax and clear my mind. I try to visit the beach at least once a month.",
  "Learning to play a musical instrument is a challenge I'm up for. I've been practicing for months, and it's starting to pay off. I love the feeling of creating music and expressing myself. It's a great way to relax and have fun.",
  "The mountains are a place I love to visit. I love the fresh air and the beautiful scenery. It's a great place to hike and explore. I feel so alive and connected to nature.",
  "My favorite food is Italian. I love pasta and pizza, and I'm always trying new recipes. I think it's because I grew up eating it at home. It's a comfort food for me.",
  "The library is a place I love to visit. I love the quiet atmosphere and the smell of books. It's a great place to study and learn. I feel so focused and productive there.",
  "Learning to dance is something I've always wanted to do. I've been taking classes for a few months, and it's been a blast. I love the feeling of moving to the music and expressing myself. It's a great way to exercise and have fun.",
  "The park is a place I love to visit. I love the greenery and the peaceful atmosphere. It's a great place to relax and unwind. I try to visit the park at least once a week.",
];

function loadPracticeContent() {
    const randomIndex = Math.floor(Math.random() * practiceContents.length);
    practiceParagraph.textContent = practiceContents[randomIndex];
}

loadPracticeContent();


// // Fetch a random practice sentence from database
// function loadPracticeContent() {
//   fetch("http://localhost:5000/practice")
//     .then(response => response.json())
//     .then(data => {
//       document.getElementById("practiceText").innerText = data.content;
//     })
//     .catch(error => {
//       console.error("Error loading practice content:", error);
//       document.getElementById("practiceText").innerText = "⚠️ Unable to load content. Try again later.";
//     });
// }

// // Call this function when the page loads
// document.addEventListener("DOMContentLoaded", loadPracticeContent);

// ---------------- Start Recording ----------------
startBtn.addEventListener("click", async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    audioChunks = [];
    mediaRecorder.addEventListener("dataavailable", e => audioChunks.push(e.data));

    mediaRecorder.addEventListener("stop", () => {
        audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        audioUrl = URL.createObjectURL(audioBlob);
        audio = new Audio(audioUrl);

        audioPlayer.src = audioUrl;
        audioPlayer.style.display = "block";

        playBtn.disabled = false;
        deleteBtn.disabled = false;
        uploadBtn.disabled = false;
    });

    mediaRecorder.start();
    recordingSymbol.style.display = "block";
    startBtn.disabled = true;
    stopBtn.disabled = false;
    practiceParagraph.style.display = "none";

    // ----------- Speech Recognition (Web Speech API) ------------
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;

    transcriptText = "";

    recognition.onresult = (event) => {
        let text = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
            text += event.results[i][0].transcript;
        }
        transcriptText = text;
        console.log("Recognized:", transcriptText);
    };

    recognition.start();
});

// ---------------- Stop Recording ----------------
stopBtn.addEventListener("click", () => {
    mediaRecorder.stop();
    recognition.stop();
    recordingSymbol.style.display = "none";
    startBtn.disabled = false;
    stopBtn.disabled = true;
});

// ---------------- Play Recording ----------------
playBtn.addEventListener("click", () => {
    if (audio) audio.play();
});

// ---------------- Delete Recording ----------------
deleteBtn.addEventListener("click", () => {
    audioBlob = null;
    audioUrl = null;
    audioPlayer.src = "";
    audioPlayer.style.display = "none";

    playBtn.disabled = true;
    deleteBtn.disabled = true;
    uploadBtn.disabled = true;
});

uploadBtn.addEventListener("click", async () => {
  uploadBtn.disabled = true;

  try {
    if (!audioBlob) {
      alert("No audio recorded!");
      uploadBtn.disabled = false;
      return;
    }

    const scoreDisplayEl = document.getElementById("scoreDisplay");
    if (!scoreDisplayEl) {
      alert("Score display element not found!");
      uploadBtn.disabled = false;
      return;
    }

    // ✅ Make sure transcriptText captured
    let userText = (transcriptText || "").trim();
    console.log("🗣️ Transcript recognized:", userText);

    const paragraphText = (practiceParagraph.textContent || "").trim();

    // Normalize text → remove punctuation, lowercase
    const normalize = (txt) =>
      txt
        .replace(/[^\w\s']/g, " ")
        .split(/\s+/)
        .filter(Boolean)
        .map((w) => w.toLowerCase());

    const originalWords = normalize(paragraphText);
    const userWords = normalize(userText);

    console.log("DEBUG → Original words:", originalWords);
    console.log("DEBUG → User words:", userWords);

    // 🕒 Get audio duration safely
    const getDuration = async () => {
      return new Promise((resolve) => {
        try {
          const tempAudio = document.createElement("audio");
          const url = URL.createObjectURL(audioBlob);
          tempAudio.preload = "metadata";
          tempAudio.src = url;

          tempAudio.onloadedmetadata = () => {
            URL.revokeObjectURL(url);
            resolve(tempAudio.duration);
          };
          tempAudio.onerror = () => resolve(0);
          setTimeout(() => resolve(0), 2000);
        } catch (err) {
          resolve(0);
        }
      });
    };

    const duration = await getDuration();
    console.log("DEBUG → Audio Duration:", duration, "seconds");

    // 🚫 Case 1: Too short recording
    if (duration < 3) {
      scoreDisplayEl.className =
        "mt-4 fs-3 fw-bold text-danger animate_animated animate_bounceIn";
      scoreDisplayEl.textContent =
        "Needs Improvement — ⏱️ Recording too short (< 3 seconds).";
      uploadBtn.disabled = false;
      return;
    }

    // 🚫 Case 2: No speech detected
    if (!userText) {
      scoreDisplayEl.className =
        "mt-4 fs-3 fw-bold text-danger animate_animated animate_bounceIn";
      scoreDisplayEl.textContent =
        "Needs Improvement — ❌ No speech detected.";
      uploadBtn.disabled = false;
      return;
    }

    // ✅ Smarter Matching: partial word matches allowed
    let matched = 0;
    for (let u of userWords) {
      for (let o of originalWords) {
        if (u === o) {
          matched++;
          break;
        }
      }
    }

    console.log("✅ Matched words:", matched, "/", originalWords.length);

    // 🚫 Case 3: No words matched
    if (matched === 0) {
      scoreDisplayEl.className =
        "mt-4 fs-3 fw-bold text-danger animate_animated animate_bounceIn";
      scoreDisplayEl.textContent =
        "Needs Improvement ";
      uploadBtn.disabled = false;
      return;
    }

    // ✅ Positive feedback (30 suggestions)
    const suggestions = [
      "💪 Great job! Keep speaking confidently!",
      "🌟 Excellent pronunciation!",
      "🎯 Very clear and fluent!",
      "🔥 You’re getting better every time!",
      "👏 That was smooth and natural!",
      "🚀 Amazing! Keep practicing like this!",
      "🏆 You sound professional!",
      "💎 Brilliant clarity in your voice!",
      "🎤 Great flow, very natural!",
      "🌈 Awesome energy in your speech!",
      "✅ Accurate pronunciation and pacing!",
      "💡 You’re improving fast!",
      "🌍 Perfect tone and accent!",
      "🎶 Very smooth and fluent delivery!",
      "📣 Strong and confident speaking!",
      "🥳 Fantastic! You nailed it!",
      "💥 Superb effort, keep it up!",
      "🎇 You sound great — very impressive!",
      "🌟 Excellent clarity and focus!",
      "🔥 Wonderful pronunciation and rhythm!",
      "🏅 Great improvement from last time!",
      "💫 You’re speaking like a pro!",
      "🌻 Clear voice and confidence!",
      "🎵 Great control and tone!",
      "💖 Beautiful and fluent speech!",
      "⚡ Impressive articulation!",
      "🪄 Superb! You’re mastering this!",
      "🎉 Excellent effort and confidence!",
      "🌺 Fantastic pronunciation and expression!",
      "💯 Outstanding performance — keep shining!"
    ];

    // Determine accuracy
    const accuracy = matched / originalWords.length;
    console.log("🎯 Accuracy:", (accuracy * 100).toFixed(1), "%");

    // Select suggestion index
    const index = Math.min(
      Math.floor(accuracy * suggestions.length),
      suggestions.length - 1
    );

    // ✅ Case 4: Show GOOD feedback
    scoreDisplayEl.className =
      "mt-4 fs-3 fw-bold text-success animate_animated animate_bounceIn";
    scoreDisplayEl.textContent =
      suggestions[index] + `  (${(accuracy * 100).toFixed(1)}%)`;

    uploadBtn.disabled = false;
  } catch (err) {
    console.error("Error during scoring:", err);
    alert("Something went wrong while calculating the score!");
    uploadBtn.disabled = false;
  }
});