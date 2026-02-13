// script.js

var noClickCount = 0;
var noButtonLabels = ['No', 'You sure?', 'Really sure?', 'Think again?', 'Please?'];

// Function to handle button click events
function selectOption(option) {
    if (option === 'yes') {
        document.getElementById('question').style.display = 'none';
        document.getElementById('love-message').style.display = 'block';
        displayCatHeart();
    } else if (option === 'no') {
        handleNoInteraction();
    } else {
        alert('Invalid option!');
    }
}

function handleNoInteraction() {
    var noButton = document.getElementById('no-button');

    noClickCount += 1;
    var labelIndex = Math.min(noClickCount, noButtonLabels.length - 1);
    noButton.innerText = noButtonLabels[labelIndex];

    moveNoButtonRandomly(noButton);
}

function moveNoButtonRandomly(noButton) {
    noButton.classList.add('escape');

    var buttonRect = noButton.getBoundingClientRect();
    var margin = 12;
    var maxX = Math.max(margin, window.innerWidth - buttonRect.width - margin);
    var maxY = Math.max(margin, window.innerHeight - buttonRect.height - margin);

    var x = randomInt(margin, Math.floor(maxX));
    var y = randomInt(margin, Math.floor(maxY));

    noButton.style.left = x + 'px';
    noButton.style.top = y + 'px';
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setupNoButtonBehavior() {
    var noButton = document.getElementById('no-button');

    noButton.addEventListener('mouseenter', function() {
        handleNoInteraction();
    });

    // Touch fallback where hover is not available.
    noButton.addEventListener('click', function(event) {
        event.preventDefault();
        handleNoInteraction();
    });
}

// Function to display the before-click image initially
function displayCat() {
    var imageContainer = document.getElementById('image-container');

    imageContainer.innerHTML = '';
    imageContainer.classList.remove('after-state');

    var beforeImage = new Image();
    beforeImage.src = 'before_click.jpg';
    beforeImage.alt = 'Before click photo';
    beforeImage.className = 'before-image';

    imageContainer.appendChild(beforeImage);
}

// Function to display the cat-heart.gif
function displayCatHeart() {
    var imageContainer = document.getElementById('image-container');

    imageContainer.innerHTML = '';
    imageContainer.classList.add('after-state');

    var gallery = document.createElement('div');
    gallery.className = 'after-gallery';

    var catHeartImage = new Image();
    catHeartImage.src = 'cat-heart.gif';
    catHeartImage.alt = 'Cat Heart';
    catHeartImage.className = 'after-media cat-heart-media';

    var afterClickImage = new Image();
    afterClickImage.src = 'after_click.JPG';
    afterClickImage.alt = 'After click photo';
    afterClickImage.className = 'after-media after-click-media';

    gallery.appendChild(catHeartImage);
    gallery.appendChild(afterClickImage);
    imageContainer.appendChild(gallery);

    document.getElementById('options').style.display = 'none';
}

// Display the before-click image initially
displayCat();
setupNoButtonBehavior();
