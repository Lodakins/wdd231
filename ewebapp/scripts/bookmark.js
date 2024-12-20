let trendingCont = document.querySelector('.trending-card-cont');

async function getAllMovies(params) {
   
try {

    let trending="";
    let bookmarkStorage = localStorage.getItem('bookmark');
    let bookmarkStg= bookmarkStorage? Array.from(JSON.parse(bookmarkStorage)):[] ;

    if(bookmarkStg.length <=0){
        trendingCont.innerHTML="<p class='warning'> No bookmark yet</p>";
        return;
    }

    bookmarkStg.forEach((el)=>{
        trending+=`<div class="trending-card" style="background-image:url(${el.primaryImage ? el?.primaryImage.url: "images/ebweblogo.png"})">
                        <div class="trending-header">
                            <i class="fa-solid fa-bookmark trending-icon bookmark-icon bookmarked" data-attr='${JSON.stringify(el)}'></i>
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
}
}


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