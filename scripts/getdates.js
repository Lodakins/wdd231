// use the date object
const today = new Date();

const year = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastmodified");

year.innerHTML = `${today.getFullYear()}`

lastModified.innerHTML = `${document.lastModified}`