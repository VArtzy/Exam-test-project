// window.onblur = () => {
//     confirm('Anda terkena illegal access!!!')
//     location.href = './ilegal.html'
// }

let video = document.getElementById('video')
if(navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
    .then((s) => {
        video.srcObject = s
    })
    .catch((err) => {
        alert('Nyalain blok kameranya, buka aksesnya, jangan lupa cek source kamera kamu.')
        location.href = '/index.html'
    })
    console.log('Nice, Berhasil menggunakan kamera.')
}else{
    console.log('Nyalain blok kameranya, buka aksesnya, jangan lupa cek source kamera kamu.');
}

// Waktu ujian

function Waktu() {

const countToDate = new Date().setMinutes(new Date().getMinutes() + 10)
let previousTimeBetweenDates

let interval = setInterval(() => {
  const currentDate =  new Date()
  const timeBetweenDates = Math.ceil((countToDate - currentDate) / 1000)

  flipAllCards(timeBetweenDates)

  previousTimeBetweenDates = timeBetweenDates
  
  if (previousTimeBetweenDates < 0) {
    alert('Mneer entek wektune')
    location.href = './index.html'
    clearInterval(interval)
  }
}, 250)

function flipAllCards(time) {
  const seconds = time % 60
  const minutes = Math.floor((time / 60) % 60)
  
  flip(document.querySelector("[data-minutes-tens]"), Math.floor(minutes / 10));
  flip(document.querySelector("[data-minutes-ones]"), minutes % 10);
  flip(document.querySelector("[data-seconds-tens]"), Math.floor(seconds / 10));
  flip(document.querySelector("[data-seconds-ones]"), seconds % 10);
}

function flip(flipCard, newNumber) {
  const topHalf = flipCard.querySelector('.top')
  const startNumber = parseInt(topHalf.textContent)
  if(newNumber === startNumber) return

  const bottomHalf = flipCard.querySelector('.bottom')
  const topFlip = document.createElement("div")
  topFlip.classList.add('top-flip')
  const bottomFlip = document.createElement("div")
  bottomFlip.classList.add('bottom-flip')

  top.textContent = startNumber
  bottomHalf.textContent = startNumber
  topFlip.textContent = startNumber
  bottomFlip.textContent = newNumber

  topFlip.addEventListener("animationstart", e => {
    topHalf.textContent = newNumber
  })

  topFlip.addEventListener("animationend", e => {
    topFlip.remove()
  })

  bottomFlip.addEventListener("animationend", e => {
    bottomHalf.textContent = newNumber
    bottomFlip.remove()
})
  flipCard.append(topFlip, bottomFlip)
}

}

// Sistem penilaian

let nilai = 0;
let jawabanUser = [];
const radioBenar = document.querySelectorAll('#benar');
const submit = document.querySelector('.submit');

function setCookie(name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

window.onclick = e => {

  jawabanUser = [];

  radioBenar.forEach(el => {
      jawabanUser.push(el.checked);
  });
  

  console.log(jawabanUser)
} 

submit.addEventListener('click', () => {

  nilai = 0

  jawabanUser.forEach(j => {
    if(j){
      nilai += 100
    }
  })

  console.log(nilai);

  setCookie('nilai', nilai, 7)
})

// Audio setting
var soals = document.querySelector('.soals');
let alrPlay = false;
var audioPlayer = document.querySelector('.green-audio-player');
var playPause = audioPlayer.querySelector('#playPause');
var playpauseBtn = audioPlayer.querySelector('.play-pause-btn');
var loading = audioPlayer.querySelector('.loading');
var progress = audioPlayer.querySelector('.progress');
var sliders = audioPlayer.querySelectorAll('.slider');
var volumeBtn = audioPlayer.querySelector('.volume-btn');
var volumeControls = audioPlayer.querySelector('.volume-controls');
var volumeProgress = volumeControls.querySelector('.slider .progress');
var player = audioPlayer.querySelector('audio');
var currentTime = audioPlayer.querySelector('.current-time');
var totalTime = audioPlayer.querySelector('.total-time');
var speaker = audioPlayer.querySelector('#speaker');

var draggableClasses = ['pin'];
var currentlyDragged = null;

window.addEventListener('mousedown', function (event) {

  if (!isDraggable(event.target)) return false;

  currentlyDragged = event.target;
  let handleMethod = currentlyDragged.dataset.method;

  this.addEventListener('mousemove', window[handleMethod], false);

  window.addEventListener('mouseup', () => {
    currentlyDragged = false;
    window.removeEventListener('mousemove', window[handleMethod], false);
  }, false);
});

playpauseBtn.addEventListener('click', togglePlay);
player.addEventListener('timeupdate', updateProgress);
player.addEventListener('volumechange', updateVolume);
player.addEventListener('loadedmetadata', () => {
  totalTime.textContent = formatTime(player.duration);
});
player.addEventListener('canplay', makePlay);
player.addEventListener('ended', function () {
  playPause.attributes.d.value = "M18 12L0 24V0";
  player.currentTime = 0;
});

volumeBtn.addEventListener('click', () => {
  volumeBtn.classList.toggle('open');
  volumeControls.classList.toggle('hidden');
});

window.addEventListener('resize', directionAware);

sliders.forEach(slider => {
  let pin = slider.querySelector('.pin');
  slider.addEventListener('click', window[pin.dataset.method]);
});

directionAware();

function isDraggable(el) {
  let canDrag = false;
  let classes = Array.from(el.classList);
  draggableClasses.forEach(draggable => {
    if (classes.indexOf(draggable) !== -1)
    canDrag = true;
  });
  return canDrag;
}

function inRange(event) {
  let rangeBox = getRangeBox(event);
  let rect = rangeBox.getBoundingClientRect();
  let direction = rangeBox.dataset.direction;
  if (direction == 'horizontal') {
    var min = rangeBox.offsetLeft;
    var max = min + rangeBox.offsetWidth;
    if (event.clientX < min || event.clientX > max) return false;
  } else {
    var min = rect.top;
    var max = min + rangeBox.offsetHeight;
    if (event.clientY < min || event.clientY > max) return false;
  }
  return true;
}

function updateProgress() {
  var current = player.currentTime;
  var percent = current / player.duration * 100;
  progress.style.width = percent + '%';

  currentTime.textContent = formatTime(current);
}

function updateVolume() {
  volumeProgress.style.height = player.volume * 100 + '%';
  if (player.volume >= 0.5) {
    speaker.attributes.d.value = 'M14.667 0v2.747c3.853 1.146 6.666 4.72 6.666 8.946 0 4.227-2.813 7.787-6.666 8.934v2.76C20 22.173 24 17.4 24 11.693 24 5.987 20 1.213 14.667 0zM18 11.693c0-2.36-1.333-4.386-3.333-5.373v10.707c2-.947 3.333-2.987 3.333-5.334zm-18-4v8h5.333L12 22.36V1.027L5.333 7.693H0z';
  } else if (player.volume < 0.5 && player.volume > 0.05) {
    speaker.attributes.d.value = 'M0 7.667v8h5.333L12 22.333V1L5.333 7.667M17.333 11.373C17.333 9.013 16 6.987 14 6v10.707c2-.947 3.333-2.987 3.333-5.334z';
  } else if (player.volume <= 0.05) {
    speaker.attributes.d.value = 'M0 7.667v8h5.333L12 22.333V1L5.333 7.667';
  }
}

function getRangeBox(event) {
  let rangeBox = event.target;
  let el = currentlyDragged;
  if (event.type == 'click' && isDraggable(event.target)) {
    rangeBox = event.target.parentElement.parentElement;
  }
  if (event.type == 'mousemove') {
    rangeBox = el.parentElement.parentElement;
  }
  return rangeBox;
}

function getCoefficient(event) {
  let slider = getRangeBox(event);
  let rect = slider.getBoundingClientRect();
  let K = 0;
  if (slider.dataset.direction == 'horizontal') {

    let offsetX = event.clientX - slider.offsetLeft;
    let width = slider.clientWidth;
    K = offsetX / width;

  } else if (slider.dataset.direction == 'vertical') {

    let height = slider.clientHeight;
    var offsetY = event.clientY - rect.top;
    K = 1 - offsetY / height;

  }
  return K;
}

// function rewind(event) {
//     if (inRange(event)) {
//       player.currentTime = player.duration * getCoefficient(event);
//   }
// }

function changeVolume(event) {
  if (inRange(event)) {
    player.volume = getCoefficient(event);
  }
}

function formatTime(time) {
  var min = Math.floor(time / 60);
  var sec = Math.floor(time % 60);
  return min + ':' + (sec < 10 ? '0' + sec : sec);
}

function togglePlay() {
  if(alrPlay === false) {
    if (player.paused) {
      playPause.attributes.d.value = "M0 0h6v24H0zM12 0h6v24h-6z";
      player.play();
      soals.style['display'] = 'block';
      alrPlay = true;
      Waktu();
    } else {
      playPause.attributes.d.value = "M18 12L0 24V0";
      player.pause();
      alrPlay = true;
    }
  }
}

function makePlay() {
  playpauseBtn.style.display = 'block';
  loading.style.display = 'none';
}

function directionAware() {
  if (window.innerHeight < 250) {
    volumeControls.style.bottom = '-54px';
    volumeControls.style.left = '54px';
  } else if (audioPlayer.offsetTop < 154) {
    volumeControls.style.bottom = '-164px';
    volumeControls.style.left = '-3px';
  } else {
    volumeControls.style.bottom = '52px';
    volumeControls.style.left = '-3px';
  }
}