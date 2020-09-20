;
(function($) {
    "use strict";


    var nav_offset_top = $("header").height() + 50;
    /*-------------------------------------------------------------------------------
	  Navbar 
	-------------------------------------------------------------------------------*/

    //* Navbar Fixed  
    function navbarFixed() {
        if ( $(".header_area").length ) {
            $(window).scroll(function() {
                var scroll = $(window).scrollTop();
                if (scroll >= nav_offset_top ) {
                    $(".header_area").addClass("navbar_fixed");
                } else {
                    $(".header_area").removeClass("navbar_fixed");
                }
            });
        };
    };

    navbarFixed();


    /*----------------------------------------------------*/
    /*  Parallax Effect js
    /*----------------------------------------------------*/
    function parallaxEffect() {
        $(".bg-parallax").parallax();
    }

    parallaxEffect();
    $("select").niceSelect();

    /*----------------------------------------------------*/
    /*  Simple LightBox js
    /*----------------------------------------------------*/
    $(".imageGallery1 .light").simpleLightbox();

    $(".counter").counterUp({
        delay: 10,
        time: 1000
    });


    $(".skill_main").each(function() {
        $(this).waypoint(function() {
                var progressBar = $(".progress-bar");
                progressBar.each(function(indx) {
                    $(this).css("width", $(this).attr("aria-valuenow") + "%");
                });
            },
            {
                triggerOnce: true,
                offset: "bottom-in-view"

            });
    });

    /*----------------------------------------------------*/
    /*  Isotope Fillter js
    /*----------------------------------------------------*/
    function gallery_isotope() {
        if ( $(".gallery_f_inner").length ) {
            // Activate isotope in container
            $(".gallery_f_inner").imagesLoaded( function() {
                $(".gallery_f_inner").isotope({
                    layoutMode: "fitRows",
                    animationOptions: {
                        duration: 750,
                        easing: "linear"
                    }
                });
            });

            // Add isotope click function
            $(".gallery_filter li").on("click",
                function() {
                    $(".gallery_filter li").removeClass("active");
                    $(this).addClass("active");

                    var selector = $(this).attr("data-filter");
                    $(".gallery_f_inner").isotope({
                        filter: selector,
                        animationOptions: {
                            duration: 450,
                            easing: "linear",
                            queue: false,
                        }
                    });
                    return false;
                });
        }
    }

    gallery_isotope();

    /*----------------------------------------------------*/
    /*  Testimonials Slider
    /*----------------------------------------------------*/
    function testimonials_slider() {
        if ( $(".testi_slider").length ) {
            $(".testi_slider").owlCarousel({
                loop: true,
                margin: 30,
                items: 3,
                nav: false,
                autoplay: true,
                smartSpeed: 1500,
                dots: true,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1,
                    },
                    768: {
                        items: 3,
                    },
                }
            });
        }
    }

    testimonials_slider();

    $(document).ready(function() {
        $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
            disableOn: 700,
            type: "iframe",
            mainClass: "mfp-fade",
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });

        $('a.scrollLink')
            // Remove links that don't actually link to anything
            .click(function (event) {
                // On-page links
                if (
                    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                        &&
                        location.hostname == this.hostname
                ) {
                    // Figure out element to scroll to
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    // Does a scroll target exist?
                    if (target.length) {
                        // Only prevent default if animation is actually gonna happen
                        event.preventDefault();
                        $('html, body').animate({
                            scrollTop: target.offset().top
                        }, 1000, function () {
                            // Callback after animation
                            // Must change focus!
                            var $target = $(target);
                            $target.focus();
                            if ($target.is(":focus")) { // Checking if the target was focused
                                return false;
                            } else {
                                $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                                $target.focus(); // Set focus again
                            };
                        });
                    }
                }
            });

    });

    /*----------------------------------------------------*/
    /*  Google map js
    /*----------------------------------------------------*/
    var setMap = function () {

        if ($("#mapBox").length) {
            var $lat = $("#mapBox").data("lat");
            var $lon = $("#mapBox").data("lon");
            var $zoom = $("#mapBox").data("zoom");
            var $info = $("#mapBox").data("info");
            var $markerLat = $("#mapBox").data("mlat");
            var $markerLon = $("#mapBox").data("mlon");
            var map = new GMaps({
                el: "#mapBox",
                lat: $lat,
                lng: $lon,
                scrollwheel: false,
                scaleControl: true,
                streetViewControl: false,
                panControl: false,
                disableDoubleClickZoom: true,
                mapTypeControl: false,
                zoom: $zoom,
                styles: [
                    {
                        "featureType": "water",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#dcdfe6"
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "stylers": [
                            {
                                "color": "#808080"
                            },
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#dcdfe6"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#ffffff"
                            },
                            {
                                "weight": 1.8
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#d7d7d7"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#ebebeb"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#a7a7a7"
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#efefef"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#696969"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#737373"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#d6d6d6"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {},
                    {
                        "featureType": "poi",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#dadada"
                            }
                        ]
                    }
                ]
            });
            map.addMarker({
                lat: $markerLat,
                lng: $markerLon,
                title: $info,
                infoWindow: {
                    content: $info,
                    maxWidth: 500
                }

            });
        }
    };

    window.setTimeout(setMap, 1000);


})(jQuery);