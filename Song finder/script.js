const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultBlock = document.querySelector('.result-block');

const url = 'https://api.lyrics.ovh';

async function search(t) {
  const response = await fetch(`${url}/suggest/${t}`);
  const data = await response.json();

  showSongs(data);
}
function showSongs(data) {
  const songs = data.data;
  console.log(data)

  let songsHtml = '';

  for(let i = 0; i < songs.length; i++) {
    let song = songs[i];
    songsHtml += `<div class="song">
        <div class="title">
            <span>${song.artist.name}-</span><span>${song.title}</span>
        </div>
        <button id="lyrics-button" data-artist='${song.artist.name}' data-song='${song.title}'>Lyrics</button>
  </div>\n`
  }

  resultBlock.innerHTML = songsHtml;
};

async function showLyrics(e){
  let lyrButton = e.target;
  if (lyrButton.tagName === 'BUTTON'){
    let artist = lyrButton.dataset.artist;
    let song = lyrButton.dataset.song;
    const response = await fetch(`${url}/v1/${artist}/${song}`)
    const data = await response.json();
    console.log(data)

    if(data.error){
      alert("lyrics not found");
    } else {
      resultBlock.innerHTML = data.lyrics;
    }
  }
}

searchButton.addEventListener('click', () => {
  const name = searchInput.value;
  search(name);
});

document.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    const title = searchInput.value;
    search(title)
  }
})

resultBlock.addEventListener('click', showLyrics)
