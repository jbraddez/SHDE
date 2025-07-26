fetch('/json/releases.json')
.then(response => response.json())
.then(releases => {
    const container = document.querySelector('.release-container');

    releases.slice(0, 5).forEach(release => {
        const row = document.createElement('a');
        row.href = release.url;
        row.target = "_blank";
        row.className = 'row';
        row.innerHTML = `
            <div class="text">
                <h3 class="title">${release.title}</h3>
                <p class="year">${release.year}</p>
            </div>
            <img src="/albumCovers/${release.img}.webp" alt="${release.title}">
            <img src="/images/spotify.png" alt="Listen on Spotify" class="spotifyOverlay">
        `;

        container.appendChil