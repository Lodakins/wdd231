let trendingCont = document.querySelector('.trending-card-cont');
let searchBtn = document.querySelector('#searchButton');


let bookmarks=[];
async function getAllMovies(params) {
    let listStorage = localStorage.getItem('bookmark');
    let listBkStg = listStorage? Array.from(JSON.parse(listStorage)):[] ;
    const url = 'https://moviesdatabase.p.rapidapi.com/titles?titleType=movie&info=base_info&startYear=2020&limit=16';
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

    if(resp.result <=0){
        trendingCont.innerHTML="<p> Movie not showing. Contact Administrator</p>";
        return;
    }

    let trending="";

    resp.results.forEach((el)=>{
        const item = listBkStg.some((ele) => ele.id == el.id);
        trending+=`<div class="trending-card" style="background-image:url(${el.primaryImage ? el?.primaryImage.url: "images/ebweblogo.png"})">
                        <div class="trending-header">
                            <i class="fa-solid fa-bookmark trending-icon bookmark-icon ${item ? "bookmarked" : ""}" data-attr='${JSON.stringify(el).replaceAll("'","")}'></i>
                        </div>
                        <div class="trending-body" >
                            <div class="details">
                                <p>${el?.releaseYear?.year}</p>
                                <p>${el?.titleType?.isSeries ? "Series" : "Movies"}</p>
                                <p>PG</p>
                            </div>
                            <h3 class="title">${el.titleText.text}</h3>
                        </div>
                    </div>`;
    });

    trendingCont.innerHTML=trending;

} catch (error) {
	console.error(error);
    // trendingCont.innerHTML="<p> Movie not showing. Contact Administrator</p>";
}
}


async function searchItem(val,btn){
    let listStorage = localStorage.getItem('bookmark');
    let listBkStg = listStorage? Array.from(JSON.parse(listStorage)):[] ;
    const url =  `https://moviesdatabase.p.rapidapi.com/titles/search/title/${val}?exact=false&titleType=movie&info=base_info&sort=year.decr&limit=20`;
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

        btn.innerHTML="Search";
        let trending = "";

        if(resp.result <=0){
            trendingCont.innerHTML="<p> Movie not found</p>";
            return;
        }

        resp.results.forEach((el) => {

            const item = listBkStg.some((ele) => ele.id == el.id);
            trending += `<div class="trending-card" style="background-image:url(${el.primaryImage ? el?.primaryImage.url : "images/ebweblogo.png"})">
                        <div class="trending-header">
                            <i class="fa-solid fa-bookmark trending-icon bookmark-icon ${item ? "bookmarked" : ""}" data-attr='${JSON.stringify(el).replaceAll("'","")}'></i>
                        </div>
                        <div class="trending-body" >
                            <div class="details">
                                <p>${el?.releaseYear?.year}</p>
                                <p>${el?.titleType?.isSeries ? "Series" : "Movies"}</p>
                                <p>PG</p>
                            </div>
                            <h3 class="title">${el.titleText.text}</h3>
                        </div>
                    </div>`;
        });

        trendingCont.innerHTML = trending;

    } catch (error) {
        console.error(error);
    }
}


searchBtn.addEventListener('click', async function(e){
    e.preventDefault();

    let searchInput  = document.querySelector('#search').value;

    searchBtn.innerHTML='Searching....';
    if(!searchInput){
        searchBtn.innerHTML="Search";
        return;
    }
    await searchItem(searchInput,searchBtn);
   
})

document.addEventListener('click', function (e) {

    if (e.target.classList.contains('bookmark-icon')) {
        let data = JSON.parse(e.target.getAttribute('data-attr'));
        let bookmarkStorage = localStorage.getItem('bookmark');

        if (e.target.classList.contains('bookmarked')) {
            e.target.classList.remove('bookmarked');
            let bookmarkStg = Array.from(JSON.parse(bookmarkStorage));
            bookmarkStg = bookmarkStg.filter((el) => el.id != data.id);
            localStorage.clear();
            localStorage.setItem('bookmark', JSON.stringify(bookmarkStg));
            getAllMovies();
        } else {
            e.target.classList.add('bookmarked');
            if (!bookmarkStorage) {
                bookmarks.push(data);
            } else {
                let bookmarkStg = Array.from(JSON.parse(bookmarkStorage));
                bookmarks = [data, ...bookmarkStg];
            }
            localStorage.clear();
            localStorage.setItem('bookmark', JSON.stringify(bookmarks));
            bookmarks = [];
        }
    }
})

getAllMovies();