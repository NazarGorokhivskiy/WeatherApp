// Swipes for slider
let slider = document.getElementById('slider');

let swipeManager = new SwipeManager(slider);
swipeManager.onLeft = left;
swipeManager.onRight = right;

// ...
