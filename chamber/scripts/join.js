window.onload= (ev)=>{
    console.log(ev);
    document.querySelector('#timestamp').value= document.lastModified;
}

document.querySelectorAll('.level-card button').forEach(function(el){
    el.addEventListener('click',function(ev){
        console.log(ev.target.dataset.attr);
        document.getElementById(ev.target.dataset.attr).showModal();
    })
})