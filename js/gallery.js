
//poster func
const openPosterCont = document.getElementById('openPoster');
const openPosterImg = document.getElementById('openPosterImg');
let posterOpen;
document.querySelectorAll('section img').forEach((img)=>{
    img.addEventListener('click', ()=>{
    openPosterCont.style.display = 'flex';
    openPosterImg.src = img.src;
    posterOpen = true;
})
}); 

function closePoster(){
    openPosterCont.style.display = 'none';
    posterOpen = false;
}

openPosterCont.addEventListener('click', (e) => {
    if (e.target === openPosterCont) closePoster();
});