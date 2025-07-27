fetch('/json/events.json')
  .then(response => response.json())
  .then(events => {
    const upcomingContainer = document.querySelector('.upcoming-events');
    const lastEventContainer = document.querySelector('.last-event');
    const today = new Date();

    let lastPastEvent = null;

    events.forEach(event => {
      const [day, month, year] = event.date.split('/').map(Number);
      const eventDate = new Date(`20${year}`, month - 1, day); // '25' → '2025'

      if (eventDate >= today) {
        const row = document.createElement('a');
        row.href = event.url || '#';
        row.target = '_blank';
        row.className = 'row';
        row.innerHTML = `
          <div class="text">
            <h3 class="title">${event.loc}</h3>
            <p class="year">${event.date}</p>
          </div>
          <img src="/albumCovers/${event.img}" alt="${event.loc}">
        `;
        upcomingContainer.appendChild(row);
      } else {
        lastPastEvent = event;
      }
    });

    if (lastPastEvent) {
      const row = document.createElement('a');
      row.href = lastPastEvent.url || '#';
      row.target = '_blank';
      row.className = 'row';
      row.innerHTML = `
        <div class="text">
          <h3 class="title">${lastPastEvent.loc}</h3>
          <p class="year">${lastPastEvent.date}</p>
        </div>
        <img src="/events/${lastPastEvent.img}" alt="${lastPastEvent.loc}">
      `;
      lastEventContainer.appendChild(row);
    }
  })
  .catch(err => {
    console.error('Failed to load events:', err);
  });
