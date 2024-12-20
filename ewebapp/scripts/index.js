
let trendingCont = document.querySelector('.trending-card-cont');
let recommendedCont = document.querySelector('.recommend-card-cont');
let searchBtn = document.querySelector('#searchButton');



let bookmarks = [];
async function getAllMovies(params) {
    let listStorage = localStorage.getItem('bookmark');

    let listBkStg =  listStorage? Array.from(JSON.parse(listStorage)):[] ;
    const url = 'https://moviesdatabase.p.rapidapi.com/titles?startYear=2020&info=base_info&list=top_boxoffice_last_weekend_10&limit=6';
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
            trendingCont.innerHTML="<p> Movie or Series not found</p>";
            return;
        }


        let trending = "";

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


async function getAllRecommended() {
    let listStorage = localStorage.getItem('bookmark');
    let listBkStg = listStorage? Array.from(JSON.parse(listStorage)):[] ;
    const url = 'https://moviesdatabase.p.rapidapi.com/titles?info=base_info&list=top_rated_english_250&limit=9';
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
            recommendedCont.innerHTML="<p> Movie or Series not found</p>";
            return;
        }

        let recommend = "";

        resp.results.forEach((el) => {
            const item = listBkStg.some((ele) => ele.id == el.id);
            recommend += `<div class="recommend-card">
                            <div class="recommend-body"  style="background-image:url(${el.primaryImage ? el?.primaryImage.url : "images/ebweblogo.png"})">
                                <div class="recommend-header">
                                    <i class="fa-solid fa-bookmark recommend-icon bookmark-icon ${item ? "bookmarked" : ""}" data-attr='${JSON.stringify(el).replaceAll("'","")}'></i>
                                </div>
                            </div>
                           <div class="recommend-details">
                                <div class="details">
                                    <p>${el?.releaseYear?.year}</p>
                                    <p>${el?.titleType?.isSeries ? "Series" : "Movies"}</p>
                                    <p>PG</p>
                                </div>
                                <h3 class="title">${el.titleText.text}</h3>
                           </div>
                    </div>`;
        });

        recommendedCont.innerHTML = recommend;
    } catch (error) {
        console.error(error);
    }
}

async function searchItem(val,btn){
    let listStorage = localStorage.getItem('bookmark');
    let listBkStg =listStorage? Array.from(JSON.parse(listStorage)):[] ;
    const url = `https://moviesdatabase.p.rapidapi.com/titles/search/title/${val}?exact=false&info=base_info&sort=year.decr`;
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
            trendingCont.innerHTML="<p> Movie or Series not found</p>";
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
            getAllRecommended();
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
getAllRecommended();

