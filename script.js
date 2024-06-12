// disable scroll
const rootElement = document.querySelector(":root");
const audioIconWrapper = document.querySelector(".audio-icon-wrapper");
const audioIcon = document.querySelector(".audio-icon-wrapper i");
const song = document.querySelector("#song");
let isPlaying = false;

function disableScroll() {
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  window.onscroll = function () {
    window.scrollTo(scrollTop, scrollLeft);
  };
  rootElement.style.scrollBehavior = "auto";
}

function enableScroll() {
  window.onscroll = function () {};
  rootElement.style.scrollBehavior = "smooth";
  // localStorage.setItem('opened', 'true');
  playAudio();
}

function playAudio() {
  audioIconWrapper.style.display = "flex";
  if (!isPlaying) {
    song.play();
    audioIcon.classList.add(`fa-compact-disc`);
    audioIcon.classList.remove(`fa-pause`);
    isPlaying = true;
  }
}

audioIconWrapper.onclick = function () {
  if (isPlaying) {
    song.pause();
    audioIcon.classList.remove(`fa-compact-disc`);
    audioIcon.classList.add(`fa-pause`);
    isPlaying = false;
  } else {
    playAudio();
  }
};

// if (!localStorage.getItem('opened')) {
//   disableScroll ();

disableScroll();

// Countdown
const countdownEl = document.getElementById("countdown");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const year = new Date().getFullYear();
const newYear = new Date(`Juni 28  ${year} 00:00:00`);

function updateCountdown() {
  const currentTime = new Date();
  const diff = newYear - currentTime;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  daysEl.innerHTML = days < 10 ? `0${days}` : days;
  hoursEl.innerHTML = hours < 10 ? `0${hours}` : hours;
  minutesEl.innerHTML = minutes < 10 ? `0${minutes}` : minutes;
  secondsEl.innerHTML = seconds < 10 ? `0${seconds}` : seconds;
}

setInterval(updateCountdown, 1000);

// modal popup
const showEl = document.getElementById("show");
const closeEl = document.getElementById("close");
const lightBox = document.getElementById("lightbox");
const popUp = document.getElementById("modal-popup");

showEl.addEventListener("click", () => {
  lightBox.classList.add("active");
  popUp.classList.add("active");
  document.body.style.overflow = "hidden";
});

closeEl.addEventListener("click", (e) => {
  lightBox.classList.remove("active");
  popUp.classList.remove("active");
  document.body.style.overflow = "visible";
});

// Copy
const text = document.getElementById("text").innerText;
const btnCopy = document.getElementById("copy");

btnCopy.addEventListener("click", () => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(
      function () {
        btnCopy.innerText = "Copied!";
      },
      function (err) {
        alert("Something Went Wrong" + err);
      }
    );
  } else {
    const tempInput = document.createElement("input");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    btnCopy.innerText = "Copied!";
  }
});

const text1 = document.getElementById("text1").innerText;
const btnCopy1 = document.getElementById("copy1");

btnCopy1.addEventListener("click", () => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text1).then(
      function () {
        btnCopy1.innerText = "Copied!";
      },
      function (err) {
        alert("Something Went Wrong" + err);
      }
    );
  } else {
    const tempInput = document.createElement("input");
    tempInput.value = text1;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    btnCopy.innerText = "Copied!";
  }
});

// comment
// load from localStorage
function loadComment() {
  const commentData = JSON.parse(localStorage.getItem("comments")) || [];
  const commentContent = document.querySelector(".comment-content");
  commentContent.innerHTML = "";

  commentData.forEach((item) => {
    const profil = document.createElement("div");
    profil.classList.add("profil");
    profil.innerHTML = `<i class="fa-solid fa-user"></i>`;

    const user = document.createElement("h4");
    user.classList.add("username");
    user.textContent = item.username;

    const comment = document.createElement("p");
    comment.textContent = item.comment;

    const desc = document.createElement("div");
    desc.classList.add("comment");
    desc.appendChild(user);
    desc.appendChild(comment);

    const commentElement = document.createElement("div");
    commentElement.classList.add("volume");
    commentElement.appendChild(profil);
    commentElement.appendChild(desc);

    commentContent.appendChild(commentElement);
  });
}

// to localStorage
function saveComment() {
  const commentData = JSON.parse(localStorage.getItem("comments")) || [];
  const usernameInput = document.getElementById("username");
  const commentInput = document.getElementById("comment");

  const newComment = {
    username: usernameInput.value,
    comment: commentInput.value,
  };

  commentData.push(newComment);
  localStorage.setItem("comments", JSON.stringify(commentData));
}

document.querySelector(".comment-form").addEventListener("submit", (e) => {
  e.preventDefault();
  saveComment();
  loadComment();
  document.querySelector(".comment-form").reset();
});

window.onload = loadComment;

// ?n=
const urlParams = new URLSearchParams(window.location.search);
const nama = urlParams.get("n") || "";
const pronoun = urlParams.get("p");
const namaContainer = document.querySelector(".hero span");
namaContainer.innerText = ` ${nama}`.replace(/ ,$/, ",");

document.querySelector("#nama").value = nama;

// wa
function sendMassage() {
  const name = document.getElementById("nama").value;
  const status = document.getElementById("status").value;
  const url =
    "https://api.whatsapp.com/send?phone=6281331211991&text=Halo%20Faik%2C%0A*" +
    name +
    "*%20*" +
    status +
    "*%20di%20acara%20pernikahanmu.";

  window.open(url);
}
