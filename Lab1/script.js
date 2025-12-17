const loginModal = document.getElementById("loginModal");
const btn = document.getElementById("existingUserBtn");
const closeModal = document.getElementById("closeModal");

btn.onclick = (e) => {
  e.preventDefault();
  loginModal.style.display = "flex";
};

closeModal.onclick = () => {
  loginModal.style.display = "none";
};

window.onclick = (e) => {
  if (e.target === loginModal) loginModal.style.display = "none";
};

let slides = document.querySelectorAll('.images-slider .slide');
let currentIndex = 0;
let slideInterval;

function moveSlideTo(n) {
    slides[currentIndex].classList.remove('active');
    currentIndex = (n + slides.length) % slides.length;
    slides[currentIndex].classList.add('active');
}

function showNextSlide() {
    moveSlideTo(currentIndex + 1);
}

function startAutoSlide() {
    clearInterval(slideInterval);
    slideInterval = setInterval(showNextSlide, 3000);
}

function handleManualSlide(step) {
    clearInterval(slideInterval);
    moveSlideTo(currentIndex + step);
    startAutoSlide();
}

if (slides.length > 0) {
    slides[currentIndex].classList.add('active');
}

startAutoSlide();

document.getElementById('prevSlide').addEventListener('click', () => handleManualSlide(-1));
document.getElementById('nextSlide').addEventListener('click', () => handleManualSlide(1));

let generatedCaptcha = '';

function generateCaptcha() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function setCaptcha() {
    generatedCaptcha = generateCaptcha();
    document.getElementById('captchaValue').textContent = generatedCaptcha;
}

setCaptcha();

document.getElementById('refreshCaptcha').addEventListener('click', setCaptcha);

document.getElementById("regForm").addEventListener("submit", function (event) {
  const pass = document.getElementById("password").value;
  const confirmPass = document.getElementById("confirmPassword").value;
  const captchaInput = document.getElementById('captchaInput').value;

  if (pass !== confirmPass) {
    alert("Passwords do not match!");
    event.preventDefault();
    return;
  }

  if (captchaInput !== generatedCaptcha) {
    alert("Incorrect Captcha code. Please try again.");
    setCaptcha();
    event.preventDefault();
    return;
  }
});