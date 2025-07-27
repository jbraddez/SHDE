fetch('/json/events.json')
  .then(response => response.json())
  .then(events => {
    const nextEventSection = document.querySelector('.nextEvent');
    const noEventsWarning = document.getElementById('noEvents');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let nextEvent = null;

    for (const event of events) {
      const [day, month, year] = event.date.split('/').map(Number);
      const eventDate = new Date(`20${year}`, month - 1, day);

      if (eventDate >= today) {
        nextEvent = event;
        break;
      }
    }

    if (nextEvent) {
      noEventsWarning.style.display = 'none';

      const row = document.createElement('a');
      row.href = nextEvent.url || '#';
      row.target = '_blank';
      row.className = 'row';
      row.innerHTML = `
        <div class="text">
          <h3 class="title">${nextEvent.loc}</h3>
          <p class="year">${nextEvent.date}</p>
        </div>
        <img class="poster" src="/events/${nextEvent.img}" alt="${nextEvent.loc}">
      `;

      row.querySelector('.poster').addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        openPoster(nextEvent.img);
      });

      nextEventSection.appendChild(row);
      nextEventSection.insertAdjacentHTML('beforeend', `<a class="primary-btn nextEvBtn" href="/events.html">See All</a>`);
    } else {
      noEventsWarning.style.display = 'block';
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