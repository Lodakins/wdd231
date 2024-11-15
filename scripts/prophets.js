const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

let cards = document.querySelector('#cards');


async function getProphetData(){


    const response = await fetch(url);

    const data = await response.json();
    console.log(data.prophets);

    displayProphets(data.prophets);
}


const displayProphets = (prophets) => {
    // card build code goes here
    prophets.forEach((prophet) => {
        // Create elements to add to the div.cards element
        let card = document.createElement('section');
        let fullName = document.createElement('__'); // fill in the blank
        let portrait = document.createElement('img');
    
        // Build the h2 content out to show the prophet's full name
        fullName.textContent = `${prophet.name} ${prophet.lastname}`; // fill in the blank
        // Build the image portrait by setting all the relevant attributes
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`); // fill in the blank
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');
    
        // Append the section(card) with the created elements
        card.appendChild(fullName); //fill in the blank
        card.appendChild(portrait);
    
        cards.appendChild(card);
      }); //
  }


getProphetData();