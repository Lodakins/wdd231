
let trendingCont = document.querySelector('.trending-card-cont');
let recommendedCont = document.querySelector('.recommend-card-cont');


async function getAllMovies(params) {
    const url = 'https://moviesdatabase.p.rapidapi.com/titles?startYear=2020&limit=6';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '4140faa556msh86a17e459830975p1b8b8djsn02f5450116c2',
		'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const resp = await response.json();

    let trending="";

    resp.results.forEach((el)=>{
        trending+=`<div class="trending-card" style="background-image:url(${el.primaryImage ? el?.primaryImage.url: "images/ebweblogo.png"})">
                        <div class="trending-header">
                            <i class="fa-solid fa-bookmark trending-icon"></i>
                        </div>
                        <div class="trending-body" >
                            <div class="details">
                                <p>${el?.releaseYear?.year}</p>
                                <p>${el.titleType.series ? "Series" : "Movies"}</p>
                                <p>PG</p>
                            </div>
                            <h3 class="title">${el.titleText.text}</h3>
                        </div>
                    </div>`;
    });

    trendingCont.innerHTML=trending;

} catch (error) {
	console.error(error);
}
}


async function getAllRecommended(){
    const url = 'https://moviesdatabase.p.rapidapi.com/titles/x/upcoming?info=base_info&limit=9';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '4140faa556msh86a17e459830975p1b8b8djsn02f5450116c2',
		'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const resp = await response.json();


    let recommend="";

    resp.results.forEach((el)=>{
        recommend+=`<div class="recommend-card">
                            <div class="recommend-body"  style="background-image:url(${el.primaryImage ? el?.primaryImage.url: "images/ebweblogo.png"})">
                                <div class="recommend-header">
                                    <i class="fa-solid fa-bookmark recommend-icon"></i>
                                </div>
                            </div>
                           <div class="recommend-details">
                                <div class="details">
                                    <p>${el?.releaseYear?.year}</p>
                                    <p>${el.titleType.series ? "Series" : "Movies"}</p>
                                    <p>PG</p>
                                </div>
                                <h3 class="title">${el.titleText.text}</h3>
                           </div>
                    </div>`;
    });

    recommendedCont.innerHTML=recommend;
} catch (error) {
	console.error(error);
}
}

getAllMovies();
getAllRecommended();

