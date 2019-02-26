let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("yt-player", {
    width: "660",
    height: "405",
    videoId: "H9j4swCAGwA",
    playerVars: { // disable yotube options
      controls: 0,
      disablekb: 0,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  const duration = player.getDuration();
  let interval;
  updateTimerDisplay();
  event.target.setVolume(100); // adjust the volume to 100%;

  $(".player").removeClass("hidden");

  clearInterval(interval);

  interval = setInterval(() => {
    const completed = player.getCurrentTime();
    const percents = (completed / duration) * 100;

    changeButtonPosition(percents);

    updateTimerDisplay();
  }, 1000);
}

function onPlayerStateChange(event) {
  const playerButton = $(".start");
  switch (event.data) {
    case 1:
      $(".player__wrapper").addClass("active");
      playerButton.addClass("paused");
      break;
    case 2:
      playerButton.removeClass("paused");
      break;
  }
}

$(".start").on("click", e => {
  const playerStatus = player.getPlayerState(); // 0 - ended, 1 - played, 2 - paused

  if (playerStatus !== 1) {
    player.playVideo();
  } else {
    player.pauseVideo();
  }
});

$(".player__splash").on("click", e => {
  player.playVideo();
});

// duration bar
$(".player__playback").on("click", e => {
  e.preventDefault();
  const bar = $(e.currentTarget);
  const newButtonPosition = e.originalEvent.layerX;
  const clickedPercents = (newButtonPosition / bar.width()) * 100;
  const newPlayerTime = (player.getDuration() / 100) * clickedPercents;

  changeButtonPosition(clickedPercents);
  player.seekTo(newPlayerTime);
});

function changeButtonPosition(percents) {
  $(".player__playback-button").css({
    left: `${percents}%`
  });
}

// sound bar
$(".sound__volume").on("click", e => {
  e.preventDefault();
  const soundBar = $(e.currentTarget);
  const newSoundButtonPosition = e.originalEvent.layerX;
  const clickedVolumePercents = (newSoundButtonPosition / soundBar.width()) * 100;
  const newSoundValue = clickedVolumePercents;
  changeSoundButtonPosition(clickedVolumePercents);
  player.setVolume(newSoundValue);
});

function changeSoundButtonPosition(percents) {
  $(".player__sound-btn").css({
    left: `${percents}%`
  });
}

// open-close volume line and button
$(".player__sound").on("click", e => {
  $(".sound__volume").toggleClass("opened");
  $(".player__sound-btn").toggleClass("opened");
});


function updateTimerDisplay() {
  $(".player__duration-completed").text(formatTime(player.getCurrentTime()));
  $(".player__duration-estimate").text(formatTime(player.getDuration()));
}

function formatTime(time) {
  const roundTime = Math.round(time);

  const minutes = Math.floor(roundTime / 60);
  const seconds = roundTime - minutes * 60;
  const formatedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return minutes + ":" + formatedSeconds;
}
