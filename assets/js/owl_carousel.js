$('.owl-carousel.movie-body').owlCarousel({
    margin: 50,
    responsive: {
        0: {
            items: 1,
        },
        600: {
            items: 2,
        },
        1000: {
            items: 5,
        },
    },
});

$('.owl-carousel.movie-slider').owlCarousel({
    margin: 15,
    responsive: {
        300: {
            items: 2,
        },
        500: {
            items: 4,
        },
        620: {
            items: 2
        }
    }
});

$('.owl-carousel.home-slider').owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
});

$('.owl-carousel.marvel').owlCarousel({
    responsive: {
        0: {
            items: 3,
        },
        600: {
            items: 5,
        },
        1000: {
            items: 7,
        },
    },
});

$(document).ready(function () {
    $('.owl-carousel.casts-content',).owlCarousel({
        responsive: {
            0: {
                items: 2,
            },
            600: {
                items: 3,
            },
            800: {
                items: 4,
            },
            1005: {
                items: 5,
            },
            1200: {
                items: 6,
            },
        },
    });
});

$('.owl-carousel.normal').owlCarousel({
    margin: 30,
    responsive: {
        0: {
            items: 2,
        },
        600: {
            items: 3,
        },
        1000: {
            items: 5,
        },
    },
});

$('.owl-carousel.especial').owlCarousel({
    margin: 10,
    responsive: {
        300: {
            items: 1,
        },
        800: {
            items: 1,
        },
        1000: {
            items: 3,
        },
    },
});