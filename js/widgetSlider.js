let widgetSlider = {};
widgetSlider.slides = document.querySelectorAll('#slider .slide-single');
widgetSlider.leftArrow = document.getElementById('slider-left-arrow');
widgetSlider.rightArrow = document.getElementById('slider-right-arrow');
widgetSlider.imageAdresses = [];
widgetSlider.slider = document.querySelector('#slider');
widgetSlider.SLIDE_WIDTH = 0.8 * widgetSlider.slides[0].width;
widgetSlider.canBeSwiped = true;


// let slides = document.querySelectorAll('#slider .slide-single');
// let leftArrow = document.getElementById('slider-left-arrow');
// let rightArrow = document.getElementById('slider-right-arrow');
// let imageAdresses = [];
// let slider = document.querySelector('#slider');

// const SLIDE_WIDTH = 0.8 * slides[0].width;

for (let i = 0; i < widgetSlider.slides.length; i++) {
    widgetSlider.imageAdresses[i] = widgetSlider.slides[i].src;
    widgetSlider.slides[i].remove();
}

let step = 1;

function draw(direction) {
    let offset, address;
    if (direction === "right") {
        offset = -2;
        address = step < 2 ? step - 2 + 5 : step - 2 ;
    } else {
        offset = 2;
        address = step > 2 ? step + 2 - 5 : step + 2;
    }

    let img = document.createElement('img');
    img.src = widgetSlider.imageAdresses[address];
    img.classList.add('slide-single');
    img.style.opacity = '0';
    img.style.left = offset * widgetSlider.SLIDE_WIDTH + 'px';

    if (direction === "right") {
        widgetSlider.slider.prepend(img);
        step--;
        if (step < 0) step = widgetSlider.slides.length - 1;
    } else {
        widgetSlider.slider.appendChild(img);
        step++;
        if (step > widgetSlider.slides.length - 1) step = 0;
    }
}


function left() {
    // When the last swipe animation is still playing
    if (!widgetSlider.canBeSwiped) return;

    // Otherwise, swipe is allowed
    widgetSlider.canBeSwiped = false;
    draw();
    let visibleSlides = document.querySelectorAll('.slide-single');

    setTimeout(() => {
        visibleSlides[3].style.opacity = '1';

        // Moving all slides to the left
        let offset = -1;
        for (let i = 0; i < visibleSlides.length; i++) {
            visibleSlides[i].style.left = offset * widgetSlider.SLIDE_WIDTH - widgetSlider.SLIDE_WIDTH + 'px';
            offset++;
        }
    }, 0);


    scaleUp(visibleSlides[2]);
    scaleDown(visibleSlides[1]);
    
    visibleSlides[0].style.opacity = '0';
    
    setTimeout(() => {
        visibleSlides[0].remove();
        widgetSlider.canBeSwiped = true;
    }, 1000);
}

function right() {
    // When the last swipe animation is still playing
    if (!widgetSlider.canBeSwiped) return;

    // Otherwise, swipe is allowed
    widgetSlider.canBeSwiped = false;
    draw("right");
    let visibleSlides = document.querySelectorAll('.slide-single');

    setTimeout(() => {
        visibleSlides[0].style.opacity = '1';

        // Moving all slides to the right
        let offset = -1;
        for (let i = 0; i < visibleSlides.length; i++) {
            visibleSlides[i].style.left = (offset - 1) * widgetSlider.SLIDE_WIDTH + widgetSlider.SLIDE_WIDTH + 'px';
            offset++;
        }
    }, 0);

    scaleUp(visibleSlides[1]);
    scaleDown(visibleSlides[2]);
    
    visibleSlides[3].style.opacity = '0';
    
    setTimeout(() => {
        visibleSlides[3].remove();
        widgetSlider.canBeSwiped = true;
    }, 1000);
}

setUp = () => {
    for (let i = 0; i < 3; i++) {
        let img = document.createElement('img');
        img.src = widgetSlider.imageAdresses[i];
        img.classList.add('slide-single');
        img.style.left = -widgetSlider.SLIDE_WIDTH + i*widgetSlider.SLIDE_WIDTH + 'px';
        widgetSlider.slider.appendChild(img);

        if (i == 1) scaleUp(img);
    }

    turnOnListeners();
};

scaleUp = (slide) => {
    slide.style.transform = "scale(1)";
    setTimeout(() => slide.style.zIndex = "2", 0);
}

scaleDown = (slide) => {
    slide.style.transform = "scale(0.8)";
    setTimeout(() => slide.style.zIndex = "1", 200);
}

turnOnListeners = () => {
    widgetSlider.leftArrow.onclick = right;
    widgetSlider.rightArrow.onclick = left;
}

turnOffListeners = () => {
    widgetSlider.leftArrow.onclick = null;
    widgetSlider.rightArrow.onclick = null;
}

setUp();