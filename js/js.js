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


/* An InfoBox is like an info window, but it displays
 * under the marker, opens quicker, and has flexible styling.
 * @param {GLatLng} latlng Point to place bar at
 * @param {Map} map The map on which to display this InfoBox.
 * @param {Object} opts Passes configuration options - content,
 * offsetVertical, offsetHorizontal, className, height, width
 */
function InfoBox(opts) {
    google.maps.OverlayView.call(this);
    this.latlng_ = opts.latlng;
    this.map_ = opts.map;
    this.content = opts.content;
    this.offsetVertical_ = -195;
    this.offsetHorizontal_ = 5;
    this.height_ = 165;
    this.width_ = 266;
    var me = this;
    this.boundsChangedListener_ =
        google.maps.event.addListener(this.map_, "bounds_changed", function() {
            return me.panMap.apply(me);
        });
    // Once the properties of this OverlayView are initialized, set its map so
    // that we can display it. This will trigger calls to panes_changed and
    // draw.
    this.setMap(this.map_);
}
/* InfoBox extends GOverlay class from the Google Maps API
 */
InfoBox.prototype = new google.maps.OverlayView();
/* Creates the DIV representing this InfoBox
 */
InfoBox.prototype.remove = function() {
    if (this.div_) {
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null;
    }
};
/* Redraw the Bar based on the current projection and zoom level
 */
InfoBox.prototype.draw = function() {
    // Creates the element if it doesn't exist already.
    this.createElement();
    if (!this.div_) return;
    // Calculate the DIV coordinates of two opposite corners of our bounds to
    // get the size and position of our Bar
    var pixPosition = this.getProjection().fromLatLngToDivPixel(this.latlng_);
    if (!pixPosition) return;
    // Now position our DIV based on the DIV coordinates of our bounds
    this.div_.style.width = this.width_ + "px";
    this.div_.style.left = (pixPosition.x + this.offsetHorizontal_) + "px";
    this.div_.style.height = this.height_ + "px";
    this.div_.style.top = (pixPosition.y + this.offsetVertical_) + "px";
    this.div_.style.display = 'block';
};
/* Creates the DIV representing this InfoBox in the floatPane. If the panes
 * object, retrieved by calling getPanes, is null, remove the element from the
 * DOM. If the div exists, but its parent is not the floatPane, move the div
 * to the new pane.
 * Called from within draw. Alternatively, this can be called specifically on
 * a panes_changed event.
 */
InfoBox.prototype.createElement = function() {
        var panes = this.getPanes();
        var div = this.div_;
        if (!div) {
            // This does not handle changing panes. You can set the map to be null and
            // then reset the map to move the div.
            div = this.div_ = document.createElement("div");
            div.className = "infobox"
            var contentDiv = document.createElement("div");
            contentDiv.className = "content"
            contentDiv.innerHTML = this.content;
            var closeBox = document.createElement("div");
            closeBox.className = "close";
            closeBox.innerHTML = "x";
            div.appendChild(closeBox);

            function removeInfoBox(ib) {
                return function() {
                    ib.setMap(null);
                };
            }
            google.maps.event.addDomListener(closeBox, 'click', removeInfoBox(this));
            div.appendChild(contentDiv);
            div.style.display = 'none';
            panes.floatPane.appendChild(div);
            this.panMap();
        } else if (div.parentNode != panes.floatPane) {
            // The panes have changed. Move the div.
            div.parentNode.removeChild(div);
            panes.floatPane.appendChild(div);
        } else {
            // The panes have not changed, so no need to create or move the div.
        }
    }
    /* Pan the map to fit the InfoBox.
     */
InfoBox.prototype.panMap = function() {
    // if we go beyond map, pan map
    var map = this.map_;
    var bounds = map.getBounds();
    if (!bounds) return;
    // The position of the infowindow
    var position = this.latlng_;
    // The dimension of the infowindow
    var iwWidth = this.width_;
    var iwHeight = this.height_;
    // The offset position of the infowindow
    var iwOffsetX = this.offsetHorizontal_;
    var iwOffsetY = this.offsetVertical_;
    // Padding on the infowindow
    var padX = 40;
    var padY = 40;
    // The degrees per pixel
    var mapDiv = map.getDiv();
    var mapWidth = mapDiv.offsetWidth;
    var mapHeight = mapDiv.offsetHeight;
    var boundsSpan = bounds.toSpan();
    var longSpan = boundsSpan.lng();
    var latSpan = boundsSpan.lat();
    var degPixelX = longSpan / mapWidth;
    var degPixelY = latSpan / mapHeight;
    // The bounds of the map
    var mapWestLng = bounds.getSouthWest().lng();
    var mapEastLng = bounds.getNorthEast().lng();
    var mapNorthLat = bounds.getNorthEast().lat();
    var mapSouthLat = bounds.getSouthWest().lat();
    // The bounds of the infowindow
    var iwWestLng = position.lng() + (iwOffsetX - padX) * degPixelX;
    var iwEastLng = position.lng() + (iwOffsetX + iwWidth + padX) * degPixelX;
    var iwNorthLat = position.lat() - (iwOffsetY - padY) * degPixelY;
    var iwSouthLat = position.lat() - (iwOffsetY + iwHeight + padY) * degPixelY;
    // calculate center shift
    var shiftLng =
        (iwWestLng < mapWestLng ? mapWestLng - iwWestLng : 0) +
        (iwEastLng > mapEastLng ? mapEastLng - iwEastLng : 0);
    var shiftLat =
        (iwNorthLat > mapNorthLat ? mapNorthLat - iwNorthLat : 0) +
        (iwSouthLat < mapSouthLat ? mapSouthLat - iwSouthLat : 0);
    // The center of the map
    var center = map.getCenter();
    // The new map center
    var centerX = center.lng() - shiftLng;
    var centerY = center.lat() - shiftLat;
    // center the map to the new shifted center
    map.setCenter(new google.maps.LatLng(centerY, centerX));
    // Remove the listener after panning is complete.
    google.maps.event.removeListener(this.boundsChangedListener_);
    this.boundsChangedListener_ = null;
};

function initialize() {
    var markers = []; // makers array

    var myOptions = { // map settings
        zoom: 8,
        center: new google.maps.LatLng(-33.397, 150.644),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        sensor: 'true'
    }
    var map = new google.maps.Map(document.getElementById("canvas-map"), myOptions);

    var data = [ // map data
        {
            'id': 1,
            'content': 'Hello my name is marker, I\'m from Google',
            'position': {
                'lat': -33,
                'lng': 150
            }
        },
        {
            'id': 2,
            'content': 'I am the content of this infobox. Wow, what a text.<br><br><a href="#">The good thing is: Tags are also possible</a>',
            'position': {
                'lat': -34,
                'lng': 150
            }
        },
    ]

    for (var i = 0; i < data.length; i++) {
        var current = data[i];

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(current.position.lat, current.position.lng),
            map: map,
            content: current.content
        });

        markers.push(marker);

        google.maps.event.addListener(markers[i], "click", function(e) {
            var infoBox = new InfoBox({
                latlng: this.getPosition(),
                map: map,
                content: this.content
            });
        });
    }
}

jQuery(document).ready(function() {
    initialize();
});