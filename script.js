const tiles = document.querySelectorAll(".tiles");
const blok = document.querySelectorAll(".blok");
const button = document.querySelectorAll(".button");

const instruction = document.querySelector(".instruction");
const content = document.querySelector(".content-game");
const play = document.querySelector("#start");

const pop = document.querySelector("#pop");
const backsound = document.querySelector("#backsound");

let time = document.querySelector(".time");
let countDown = document.querySelector(".countdown");

let score = 0;

function fadeBlok(timeLimit) {
  // Ambil semua blok yang ada kemudian looping
  blok.forEach((element) => {
    let timeCountDown = setInterval(() => {
      // Jarak waktu selesai
      let now = new Date().getTime();
      let distance = timeLimit - now;

      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      time.textContent = minutes + "m : " + seconds + "s";

      if (distance < 0) {
        clearInterval(timeCountDown);
        clearInterval(move);
        document.querySelector(".countdown").style.display = "block";
        time.textContent = "Timeout";
        countDown.innerHTML = "Selesai";
      }
    }, 1000);

    // Acak posisi waktu blok tampil
    let pos = Math.floor(Math.random() * 200) + 1;
    element.style.top = pos + "px";

    let move = setInterval(frame, 1); // 1 untuk kecepatan blok paling cepat
    function frame() {
      if (pos > 800) {
        element.style.opacity = "1";
        pos = Math.floor(Math.random() * 100) - 100;
        element.style.top = pos + "px";
      } else {
        pos++;
        element.style.top = pos + "px";
      }
    }

    // Kasih event saat tombol diklik
    let but = element.nextElementSibling.nextElementSibling;
    but.addEventListener("click", function () {
      let bl = this.previousElementSibling.previousElementSibling;
      let top = bl.getAttribute("style");

      if (top > "top: 720px;" && top < "top: 750px;") {
        score++;
        document.querySelector(".score").textContent = score;
      } else {
        bl.style.opacity = "0.7";
      }
    });
  });
}

function start() {
  backsound.play(); // Nyalakan backsound
  content.style.display = "block"; // Tampilkan kotak content piano
  instruction.style.display = "none"; // sembunyikan instruksi game
  play.style.display = "none"; // Sembunyikan tombol play

  // Countdown 3 detik
  let count = 4;
  countDownTime = setInterval(() => {
    count -= 1;
    countDown.innerHTML = count != 0 ? count : "Mulai";
    if (count < 0) {
      document.querySelector(".countdown").style.display = "none";
      clearInterval(countDownTime);
    }
  }, 1000);

  setTimeout(() => {
    // Timer
    let date = new Date().getDate();
    let hour = new Date().getHours();
    let minute = new Date().getMinutes() + 3; // ganti angka 3 untuk menambah waktu berapa menit
    let timeLimit = new Date(
      "Mar " + date + ", 2022 " + hour + ":" + minute
    ).getTime();

    // Blok fade in
    fadeBlok(timeLimit);

    // Method tombol keyboard
    pressKeyboard();
  }, 4000);
}

function pressKeyboard() {
  document.onkeydown = function (e) {
    let key;
    switch (e.keyCode) {
      case 68: //ini kode untuk tombol D
        key = document.querySelector("#d");
        break;
      case 70: //ini kode untuk tombol F
        key = document.querySelector("#f");
        break;
      case 74:
        key = document.querySelector("#j");
        break;
      case 75:
        key = document.querySelector("#k");
        break;
    }
    if (key) {
      let bl = key.previousElementSibling.previousElementSibling;
      key.style.opacity = "1";
      setTimeout(() => {
        key.style.opacity = "0.7";
      }, 150);
      let top = bl.getAttribute("style");

      if (top > "top: 720px;" && top < "top: 750px;") {
        score++;
        document.querySelector(".score").textContent = score;
      } else {
        bl.style.opacity = "0.7";
      }
    }
  };
}
