let boiling = false;
let timerInterval;
let timeLeft = 0;

const alarmSound = document.getElementById("alarm-sound");
const clickSound = new Audio("./sounds/click.wav");
const timerDisplay = document.getElementById("timer");
const message = document.getElementById("message");
const toggleButton = document.querySelector(".toggle-button");
const toggleIcon = document.getElementById("toggle-icon");

// Toggle button functionality for start/pause
toggleButton.addEventListener("click", () => {
  playClickSound();
  if (!boiling && timeLeft > 0) {
    startTimer();
    toggleIcon.src = "./images/pause-solid.svg";
    message.textContent = "Boiling in progress...";
  } else if (boiling) {
    clearInterval(timerInterval);
    boiling = false;
    toggleIcon.src = "./images/play-solid.svg";
    message.textContent = "Timer paused";
    timerDisplay.classList.remove("timer-active");
    setEggButtonsDisabled(false);
  }
});

// Set the type of egg and the corresponding timer
function setEggType(minutes, type) {
  timeLeft = minutes * 60;
  updateTimerDisplay();
  boiling = false;
  message.textContent = `Starting timer for ${type} boiled egg!`;
  toggleIcon.src = "./images/play-solid.svg";
}

// Play alarm and notify user
function playAlarm() {
  alarmSound.play();
  document.body.style.backgroundColor = "#ffe9a8";
  setTimeout(() => {
    document.body.style.backgroundColor = "";
  }, 2000);
  message.textContent = "⏰Time's up!!\nYour egg is ready!";
}

// Play click sound for button interactions
function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

// Start countdown timer
function startTimer() {
  if (!boiling && timeLeft > 0) {
    boiling = true;
    timerDisplay.classList.add("timer-active");
    setEggButtonsDisabled(true);

    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateTimerDisplay();
      } else {
        clearInterval(timerInterval);
        playAlarm();
        boiling = false;
        toggleIcon.src = "./images/play-solid.svg";
        timerDisplay.classList.remove("timer-active");
        setEggButtonsDisabled(false);
      }
    }, 1000);
  }
}

// Format and update the timer
function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent =
    String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
}

// Disable egg buttons when timer is active
function setEggButtonsDisabled(state) {
  document.querySelectorAll(".egg-button").forEach((btn) => {
    btn.disabled = state;
    btn.style.opacity = state ? "0.5" : "1";
    btn.style.cursor = state ? "not-allowed" : "pointer";
  });
}

// Egg buttons functionality
document.querySelectorAll(".egg-button").forEach((egg) => {
  egg.addEventListener("click", () => {
    const type = egg.getAttribute("data-type");
    if (type === "soft") {
      setEggType(3, "soft");
    } else if (type === "medium") {
      setEggType(5, "medium");
    } else if (type === "hard") {
      setEggType(7, "hard");
    }
    playClickSound();
  });
});

// Reset button
document.querySelector(".reset-button").addEventListener("click", () => {
  clearInterval(timerInterval);
  playClickSound();
  timeLeft = 0;
  boiling = false;
  updateTimerDisplay();
  message.textContent = "";
  toggleIcon.src = "./images/play-solid.svg";
  document.body.style.backgroundColor = "";
  timerDisplay.classList.remove("timer-active");
  setEggButtonsDisabled(false);
});
