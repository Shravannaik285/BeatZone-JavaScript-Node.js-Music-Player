// 🎧 Select Elements
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const progress = document.getElementById('progress');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');

// 🎵 Playlist
const songs = [
  { title: "Dil ki Awaz", artist: "AI Generated", file: "Dil ki awaz.mp3", cover: "2.png" },
  { title: "Yadoo ki Galiyan", artist: "AI Generated", file: "Yadoo ki galiyan.mp3", cover: "3.png" }
];

let currentSongIndex = 0;
let isPlaying = false;

// 🎶 Load a song into the player
function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.file;
}

// ▶️ Play or ⏸️ Pause the song
function playSong() {
  if (!isPlaying) {
    audio.play();
    isPlaying = true;
    playBtn.textContent = "⏸️";
    cover.classList.add("playing");
  } else {
    audio.pause();
    isPlaying = false;
    playBtn.textContent = "▶️";
    cover.classList.remove("playing");
  }
}

// ⏭️ Go to Next Song
function nextSong() {
  currentSongIndex++;
  if (currentSongIndex >= songs.length) currentSongIndex = 0;
  loadSong(songs[currentSongIndex]);
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸️";
  cover.classList.add("playing");
}

// ⏮️ Go to Previous Song
function prevSong() {
  currentSongIndex--;
  if (currentSongIndex < 0) currentSongIndex = songs.length - 1;
  loadSong(songs[currentSongIndex]);
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸️";
  cover.classList.add("playing");
}

// ⏳ Update Progress Bar
audio.addEventListener('timeupdate', () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.value = progressPercent || 0;
});

// ⏩ Seek Song on Slider Change
progress.addEventListener('input', () => {
  const newTime = (progress.value / 100) * audio.duration;
  audio.currentTime = newTime;
});

// 🎵 Move to next song automatically
audio.addEventListener('ended', nextSong);

// 🎛️ Button Listeners
playBtn.addEventListener('click', playSong);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

// 🚀 Load first song by default
loadSong(songs[currentSongIndex]);

axios.get('http://localhost:3000/songs')
  .then(res => {
    const songs = res.data;
    console.log("🎶 Songs loaded from server:", songs);

    // You can now set the first song dynamically:
    const firstSong = songs[0];
    document.getElementById('title').textContent = firstSong.title;
    document.getElementById('artist').textContent = firstSong.artist;
    document.getElementById('cover').src = firstSong.cover;
    document.getElementById('audio').src = firstSong.file;
  })
  .catch(err => console.error("❌ Error loading songs:", err));
