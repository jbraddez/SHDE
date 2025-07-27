fetch('/json/events.json')
.then(response => response.json())
.then(events => {
    const upcomingContainer = document.querySelector('.upcoming-events');
    const lastEventContainer = document.querySelector('.last-event');
    const today = new Date();

    let lastPastEvent = null;

    events.forEach(event => {
        const [day, month, year] = event.date.split('/').map(Number);
        const eventDate = new Date(`20${year}`, month - 1, day);
        today.setHours(0, 0, 0, 0);
        if (eventDate >= today) {
        document.getElementById('warning').style.display = 'none';
        const row = document.createElement('a');
        row.href = event.url || '#';
        row.target = '_blank';
        row.className = 'row';
        row.innerHTML = `
            <div class="text">
            <h3 class="title">${event.loc}</h3>
            <p class="year">${event.date}</p>
            </div>
            <img src="/events/${event.img}" alt="${event.loc}">
        `;
        upcomingContainer.appendChild(row);

        row.querySelector('img').addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openPoster(event.img);
        });
        }else{
            lastPastEvent = event;
        }
    });

    if (lastPastEvent) {
      const row = document.createElement('div');
      row.className = 'row';
      row.innerHTML = `
        <div class="text">
          <h3 class="title">${lastPastEvent.loc}</h3>
          <p class="year">${lastPastEvent.date}</p>
        </div>
        <img onclick="openPoster('${lastPastEvent.img}')" src="/events/${lastPastEvent.img}" alt="${lastPastEvent.loc}">
      `;
      lastEventContainer.appendChild(row);
    }
})
.catch(err => {
    console.error('Failed to load events:', err);
});

//poster func
const openPosterCont = document.getElementById('openPoster');
const openPosterImg = document.getElementById('openPosterImg');
let posterOpen;
function openPoster(imgPath){
    openPosterCont.style.display = 'flex';
    openPosterImg.src = '/events/' + imgPath;
    posterOpen = true;
}

function closePoster(){
    openPosterCont.style.display = 'none';
    posterOpen = false;
}

openPosterCont.addEventListener('click', (e) => {
    if (e.target === openPosterCont) closePoster();
});