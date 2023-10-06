
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);

player.on('timeupdate', throttle(async (data) => {
  const currentTime = data.seconds;
  localStorage.setItem('videoplayer-current-time', currentTime.toString());
}, 1000));

const savedTime = localStorage.getItem('videoplayer-current-time');
if (savedTime) {
  player.setCurrentTime(parseFloat(savedTime));
}

player.ready().then(function () {
}).catch(function (error) {
  console.error('Помилка ініціалізації плеєра:', error);
});