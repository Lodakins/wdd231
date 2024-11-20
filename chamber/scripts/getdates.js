// use the date object
const today = new Date();

const year = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastmodified");

year.innerHTML = `${today.getFullYear()}`

lastModified.innerHTML = `${document.lastModified}`

const toggleBtn = document.querySelector("#toggle-btn");
const iconimg = document.querySelector("#icon");
const menu = document.querySelector("nav.navigation");

toggleBtn.addEventListener("click", e => {
  if (e.target.classList.contains("open")) {
    // menu.style.display = "none";
    menu.classList.remove("open");
    e.target.classList.remove("open");
    iconimg.src = "/chamber/images/hamburger.svg";
  } else {
    // menu.style.display = "flex";
    iconimg.src = "/chamber/images/cancel.svg";
    e.target.classList.add("open");
    menu.classList.add("open");
  }
});