const audio = document.getElementById("musicPlayer");
const progressSlider = document.getElementById("progressSlider");
const currentTimeDisplay = document.getElementById("currentTime");
const totalDurationDisplay = document.getElementById("totalDuration");

const songTitle = document.getElementById("song-title");
const globalPlayButton = document.getElementById("global-play-button");
const tarantellaPlayButton = document.getElementById("tarantella-play-button")
const chillPlayButton = document.getElementById("chill-play-button");
const tokyoPlayButton = document.getElementById("tokyo-play-button");
const backgroundPlayButton = document.getElementById("background-play-button");

const playPauseIcon = document.getElementById("playPauseIcon");
const playPauseIcon01 = document.getElementById("playPauseIcon01");
const playPauseIcon02 = document.getElementById("playPauseIcon02");
const playPauseIcon03 = document.getElementById("playPauseIcon03");
const playPauseIcon04 = document.getElementById("playPauseIcon04");

let isPlaying = false;
let currentIcon = playPauseIcon01;
let playingIcon = playPauseIcon01;

let songs = { TARANTELLA: "Tarantella Napoletana" , BACKGROUND: "Background", CHILL: "Chill", TOKYO: "Tokyo" };

// Play/Pause toggle function
function togglePlayPause() {
	// if same song, toggle
	if (playingIcon == currentIcon) {
		if (isPlaying) {
			audio.pause();
			playPauseIcon.classList.remove("bi-pause-circle-fill");
			playPauseIcon.classList.add("bi-play-circle-fill");
			currentIcon.classList.remove("bi-pause-circle-fill");
			currentIcon.classList.add("bi-play-circle-fill");
		} else {
			audio.play();
			playPauseIcon.classList.remove("bi-play-circle-fill");
			playPauseIcon.classList.add("bi-pause-circle-fill");
			currentIcon.classList.remove("bi-play-circle-fill");
			currentIcon.classList.add("bi-pause-circle-fill");
		}
		isPlaying = !isPlaying;
	}
	// if different song, pause old and start new
	else {
		playingIcon.classList.remove("bi-pause-circle-fill");
		playingIcon.classList.add("bi-play-circle-fill");
		playingIcon = currentIcon;
		audio.play();
		playPauseIcon.classList.remove("bi-play-circle-fill");
		playPauseIcon.classList.add("bi-pause-circle-fill");
		currentIcon.classList.remove("bi-play-circle-fill");
		currentIcon.classList.add("bi-pause-circle-fill");
		isPlaying = true;
	}
}

// Format time to display as minutes:seconds
function formatTime(seconds) {
	let minutes = Math.floor(seconds / 60);
	seconds = Math.floor(seconds % 60);
	return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function showSongDuration() {
	totalDurationDisplay.textContent = formatTime(audio.duration);
}

// Display total duration once the audio metadata is loaded
audio.addEventListener("loadedmetadata", showSongDuration);

// Update current time and progress bar as the audio plays
audio.addEventListener("timeupdate", function () {
	const percentage = (this.currentTime / this.duration) * 100;
	progressSlider.value = percentage;
	currentTimeDisplay.textContent = formatTime(this.currentTime);
});

// Update the current time when the user seeks
progressSlider.addEventListener("input", function () {
	const seekTime = (audio.duration / 100) * progressSlider.value;
	audio.currentTime = seekTime;
});

// Handle audio ending
function resetProgressBar() {
	currentTimeDisplay.textContent = formatTime(0);
	isPlaying = false;
	showSongDuration();
	audio.pause();
	playPauseIcon.classList.remove("bi-pause-circle-fill");
	playPauseIcon.classList.add("bi-play-circle-fill");
	currentIcon.classList.remove("bi-pause-circle-fill");
	currentIcon.classList.add("bi-play-circle-fill");
	isPlaying = false;
	progressSlider.value = -100;
	totalDurationDisplay.textContent = formatTime(audio.duration);
}

audio.onended = resetProgressBar;

// Volume Control remains unchanged
document.getElementById("volumeControl").addEventListener("input", function () {
	audio.volume = this.value;
});

globalPlayButton.addEventListener("click", togglePlayPause);

tarantellaPlayButton.addEventListener("click", () => {
	if (playingIcon != playPauseIcon01){
	songTitle.innerText = songs.TARANTELLA;
	currentIcon = playPauseIcon01;
	audio.src = "./music/Tarantella.mp3";
	}
	togglePlayPause();
});
chillPlayButton.addEventListener("click", () => {
	if (playingIcon != playPauseIcon02){
	songTitle.innerText = songs.CHILL;
	currentIcon = playPauseIcon02;
	audio.src = "./music/chill.mp3";
	}
	togglePlayPause();
});
tokyoPlayButton.addEventListener("click", () => {
	if (playingIcon != playPauseIcon03){
	songTitle.innerText = songs.TOKYO;
	currentIcon = playPauseIcon03;
	audio.src = "./music/tokyo.mp3";
	}
	togglePlayPause();
});
backgroundPlayButton.addEventListener("click", () => {
	if (playingIcon != playPauseIcon04){
	songTitle.innerText = songs.BACKGROUND;
	currentIcon = playPauseIcon04;
	audio.src = "./music/background.mp3";
	}
	togglePlayPause();
});

// resetProgressBar();
