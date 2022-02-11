const musicContainer = document.getElementById('music-container');
    const playBtn = document.getElementById('play');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');

    const audio = document.getElementById('audio');
    const progress = document.getElementById('progress');
    const progressContainer = document.getElementById('progress-container');
    const title = document.getElementById('title');
    const cover = document.getElementById('cover');
    const currTime = document.querySelector('#currTime');
    const durTime = document.querySelector('#durTime');

    function playSong() {
      musicContainer.classList.add('play');
      playBtn.querySelector('i.fas').classList.remove('fa-play');
      playBtn.querySelector('i.fas').classList.add('fa-pause');

      audio.play();
    }

    function pauseSong() {
      musicContainer.classList.remove('play');
      playBtn.querySelector('i.fas').classList.add('fa-play');
      playBtn.querySelector('i.fas').classList.remove('fa-pause');

      audio.pause();
    }

    function prevSong() {
      songIndex--;

      if (songIndex < 0) {
        songIndex = songs.length - 1;
      }

      loadSong(songs[songIndex]);

      playSong();
    }

    function nextSong() {
      songIndex++;

      if (songIndex > songs.length - 1) {
        songIndex = 0;
      }

      loadSong(songs[songIndex]);

      playSong();
    }

    function updateProgress(e) {
      const { duration, currentTime } = e.srcElement;
      const progressPercent = (currentTime / duration) * 100;
      progress.style.width = `${progressPercent}%`;
    }

    function setProgress(e) {
      const width = this.clientWidth;
      const clickX = e.offsetX;
      const duration = audio.duration;

      audio.currentTime = (clickX / width) * duration;
    }

    playBtn.addEventListener('click', () => {
      const isPlaying = musicContainer.classList.contains('play');

      if (isPlaying) {
        pauseSong();
      } else {
        playSong();
      }
    });

    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);

    audio.addEventListener('timeupdate', updateProgress);

    progressContainer.addEventListener('click', setProgress);

    audio.addEventListener('ended', nextSong);

    audio.addEventListener('timeupdate', durTime);
    function allowDrop(ev) {
      ev.preventDefault();
    }

    function drag(ev) {
      ev.dataTransfer.setData("answerElementId", ev.target.id);
    }

    function drop(ev) {
      ev.preventDefault();
      const target = ev.currentTarget
      const answerElementId = ev.dataTransfer.getData("answerElementId");
      const answerElement = document.getElementById(answerElementId)

      if (target.childElementCount == 0) {
        target.appendChild(answerElement);
        return true;
      }

      return false;
    }

    function check(correctAnswer) {
      const dropTarget = document.getElementById("dropTarget")
      const givenAnswer = dropTarget.querySelector("img")
      if (givenAnswer && givenAnswer.id == correctAnswer) {
        dropTarget.classList.add("correct")
        dropTarget.classList.remove("wrong")
      } else {
        dropTarget.classList.add("wrong")
        dropTarget.classList.remove("correct")
      }
    }

    function confirmandcontinue(destination) {
      const result = confirm("Do You Wanna go to the Next Page")

      if (result) {
        window.location.href = destination;
      }
    }