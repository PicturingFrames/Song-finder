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
            <span>${song.title}</span>
      </div>
  </div>\n`
  }

  resultBlock.innerHTML = songsHtml;
};

searchButton.addEventListener('click', () => {
  const name = searchInput.value;
  search(name);
})
