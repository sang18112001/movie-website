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
            items: 2,
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

$('.owl-carousel.type-movie').owlCarousel({
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
