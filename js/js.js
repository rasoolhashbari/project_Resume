$(function() {
    $('a[href*=#M]').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 1000, 'linear');
    });
});

//---------------wow--------------

new WOW().init();

// --------navbar js---------

var position = $(document).scrollTop();
$(document).ready(function() {
    $(document).scroll(function() {
        var x = $(document).scrollTop();
        if (x < position) {
            console.log(x)
            $("#my-navbar ").addClass("nav-fix");
            $("body ").addClass("padding-nav ");
        } else {
            $("#my-navbar ").removeClass("nav-fix");
            $("body ").removeClass("padding-nav ");
        }
        position = $(document).scrollTop();
    });
});

// ----------------typing effect----------------

const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Rasool", "hashbari"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});


// --------owl js-------

var owl = $('.owl-carousel');
owl.owlCarousel({
        items: 4,
        loop: false,
        stagePadding: 10,
        autoplayHoverPause: true,
        lazyLoad: true,
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 2,
                nav: true,
            },
            1000: {
                items: 4,
                nav: true,
            }
        }
    })
    // -------------نمونه کار های من---------------

var cards = $('.card1');

cards.each((index, card) => {
    $(card).prepend("<div class='shineLayer'></div>")
});

$(".card1").mousemove(function(event) {

    var card = this;
    var mouseCoord = {
        x: event.offsetX,
        y: event.offsetY
    };
    //cleanup
    mouseCoord.x = mouseCoord.x < 0 ? 0 : mouseCoord.x;
    mouseCoord.x = mouseCoord.x > $(card).width() ? $(card).width() : mouseCoord.x;
    mouseCoord.y = mouseCoord.y < 0 ? 0 : mouseCoord.y;
    mouseCoord.y = mouseCoord.y > $(card).height() ? $(card).height() : mouseCoord.y;


    var transformCard = "scale3d(1.08, 1.08, 1.08) perspective(700px)";
    transformCard += " ";
    //rotateX between -9 and +9
    transformCard += "rotateX(" + ((((mouseCoord.y / $(card).height()) * 18) - 9)) + "deg)";
    transformCard += " ";
    //rotateY between -13 and +13
    transformCard += "rotateY(" + ((((mouseCoord.x / $(card).width()) * 26) - 13) * -1) + "deg)";

    transformCard += " ";
    //translateX between -3 and +3
    transformCard += "translateX(" + (((mouseCoord.x / $(card).width()) * 6) - 3) + "px)";
    transformCard += " ";
    //translateY between -5 and +5
    transformCard += "translateY(" + (((mouseCoord.y / $(card).height()) * 10) - 5) + "px)";

    $(card).css("transform", transformCard);

    //rotateX between -5 and +5
    var transformCardImage = "rotateX(" + ((((mouseCoord.y / $(card).height()) * 10) - 5) * -1) + "deg)";
    transformCardImage += " ";
    //rotateX between -13 and +13
    transformCardImage += "rotateY(" + ((((mouseCoord.x / $(card).width()) * 26) - 13) * -1) + "deg)";
    $(card).find("img").css("transform", transformCardImage);

    //opacity of ShineLayer between 0.1 and 0.4
    var backgroundShineLayerOpacity = ((mouseCoord.y / $(card).height()) * 0.3) + 0.1;
    //bottom=0deg; left=90deg; top=180deg; right=270deg;
    var backgroundShineLayerDegree = (Math.atan2(mouseCoord.y - ($(card).height() / 2), mouseCoord.x - ($(card).width() / 2)) * 180 / Math.PI) - 90;
    backgroundShineLayerDegree = backgroundShineLayerDegree < 0 ? backgroundShineLayerDegree += 360 : backgroundShineLayerDegree
    var backgroundShineLayer = "linear-gradient(" + backgroundShineLayerDegree + "deg, rgba(255,255,255," + backgroundShineLayerOpacity + ") 0%, rgba(255,255,255,0) 80%)";
    $(card).find(".shineLayer").css("background", backgroundShineLayer);
});

$(".card1").mouseenter(function(event) {
    $(".card1").addClass("blur");
    $(this).removeClass("blur");
});

$(".card1").mouseleave(function(event) {
    var card = this;
    $(card).css("transform", "scale3d(1, 1, 1)");
    $(card).find("img").css("transform", "");
    $(card).find(".shineLayer").css("background", "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 80%)");

    $(".card1").removeClass("blur");
});

// ----------------map------------------

var myCenter = new google.maps.LatLng(38.077166, 46.285878);

function initialize() {
    var mapProp = {
        center: myCenter,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map"), mapProp);

    var marker = new google.maps.Marker({
        position: myCenter,
    });

    marker.setMap(map);
}
google.maps.event.addDomListener(window, 'load', initialize);