const notification = document.querySelector('#notification');
const close = document.querySelector('#close');
const dismiss = document.querySelector('#dismiss');
const notifHeader = document.querySelector('#notif-header');
const notifContent = document.querySelector('#notif-content');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const pointsContainer = document.querySelector('#points-container');
let counter = 0;

let notificationText = [
  '0 J.R.R. Tolkien used just two fingers to type a whopping 1,200 pages of text for the books.',
  '1 Around 18,000 costumes were made for the filming of all three Lord of the Rings films. In some cases, as many of 40 clones of the same costume needed to be made.',
  '2 The Beatles tried to make a film of Lord of the Rings starring themselves, but Tolkien wasn’t keen on the idea and it was put to a speedy end.',
  '3 Christopher Tolkien, son of J.R.R. Tolkien, does not like the Lord of the Rings books written by his father.',
  '4 Christopher Lee was successful in getting the role of Saruman, but his real ambition was to play Gandalf. The producers thought his age would interfere with the fighting scenes.',
  '5 Excepteur sint occaecat cupidatat non proident, sunt in culpa'
];

next.addEventListener('click', toNextNotification);
prev.addEventListener('click', toPreviousNotification);
close.addEventListener('click', hideNotification);
dismiss.addEventListener('click', populateStorage);

document.addEventListener('keyup', e => {
  if (e.keyCode === 27) {
    hideNotification();
  }
  if (e.keyCode === 37) {
    toPreviousNotification();
  }
  if (e.keyCode === 39) {
    toNextNotification();
  }
});

function toNextNotification() {
  if (counter === notificationText.length - 1) {
    counter = 0;
  } else {
    counter++;
  }
  renderItems(counter);
}

function toPreviousNotification() {
  if (counter === 0) {
    counter = notificationText.length - 1;
  } else {
    counter--;
  }
  renderItems(counter);
}

function renderItems(index) {
  if (notificationText[index]) {
    notifHeader.innerHTML = notificationText[index].slice(2, 25);
    notifContent.innerHTML = notificationText[index];
    renderPoints(counter);
  }
}

function renderPoints(index) {
  pointsContainer.innerHTML = notificationText
  .map((item, k) => `<div class="point${k === index ? ' current' : ''}">&#8226;</div>`)
  .join('\n');
}

function hideNotification() {
  notification.classList.add('hidden');
  notification.innerHTML = '';
}

function showNotification() {
  notification.classList.remove('hidden');
}

function populateStorage() {
  if (dismiss.checked) {
    localStorage.setItem('dismiss', dismiss.checked);
  } else {
    localStorage.removeItem('dismiss');
  }
}

function loadNotification() {
  if(localStorage.getItem('dismiss') === 'true' || notificationText.length === 0) {
    hideNotification();
  } else {
    setTimeout(showNotification, 5000);
    renderItems(counter);
  }
}

loadNotification();
