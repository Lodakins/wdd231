const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("#gridContainer");



// The following code could be written cleaner. How? We may have to simplfiy our HTMl and think about a default view.

gridbutton.addEventListener("click", () => {
	// example using arrow function
	display.classList.add("business-cont");
	display.classList.remove("list");
});

listbutton.addEventListener("click", showList); // example using defined function

function showList() {
	display.classList.add("list");
	display.classList.remove("business-cont");
}


async function loadAllBusiness(){

    let businessHtml="";

    const response = await fetch("/chamber/data/members.json");

    const data = await response.json();
    console.log(data.business);


    data.business.forEach(el => {
        businessHtml+=`
            <section>
                    <img src="${el.icon}" alt="${el.name}" >
                    <h3>${el.name}</h3>
                    <p>${el.address}</p>
                    <p>${el.phone}</p>
                    <p>${el.membershipLevel}</p>
                    <a href="${el.websiteUrl}" target="_blank">View Website</a>
                </section>
        `;
    });

    display.innerHTML=businessHtml;

}

loadAllBusiness()