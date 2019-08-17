var body;
var cortina;
var picture;
var index;

window.addEventListener("load", function() {

    body = document.getElementsByTagName("body")[0];

    cortina = document.getElementById("cortina");
    picture = document.getElementById("picture");

    addPhotoEvent();
    addCloseEvent();
    addNextPrevEvents();
});

function addPhotoEvent() {
    var photos = document.getElementsByClassName("photo");

    var photosLength = photos.length;

    for (let i = 0; i < photosLength; i++) {
        var photo = photos[i];
        
        photo.addEventListener('click', clickPhoto);
    }
}

function clickPhoto(e) {
    body.style.overflow = "hidden";

    index = +e.target.getAttribute("index");

    picture.style.backgroundImage = "url(../" +  e.target.getAttribute("src") + ")";

    cortina.style.display = "block";
}

function addCloseEvent() {
    var close = document.getElementById("close");

    close.addEventListener('click', closeClick);
}


function closeClick() {
    body.style.overflow = "auto";

    cortina.style.display = "none";
}

function addNextPrevEvents() {
    
    var prev = document.getElementById("prev");
    var next = document.getElementById("next");

    prev.addEventListener('click', prevClick);
    next.addEventListener('click', nextClick)
}

function prevClick() {
    index--;
    
    var prevPhoto = document.getElementsByClassName("photo")[index];

    picture.style.backgroundImage = "url(../" + prevPhoto.getAttribute("src") + ")";
}

function nextClick() {
    index++;
    
    var nextPhoto = document.getElementsByClassName("photo")[index];

    picture.style.backgroundImage = "url(../" + nextPhoto.getAttribute("src") + ")";
}

