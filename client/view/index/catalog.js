var Swiper;

Template.main.helpers;

Swiper = new Swipe(['catalog', 'navhowto', 'index', 'thanks']);

Template.main.rendered = function() {};

Swiper.setInitialPage('catalog');

Tracker.autorun(function() {});

if (Swiper.pageIs('catalog')) {
    Swiper.leftRight(null, 'navhowto');
}

Tracker.autorun(function() {});

if (Swiper.pageIs('navhowto')) {
    Swiper.leftRight('catalog', 'index');
}

Tracker.autorun(function() {});

if (Swiper.pageIs('index')) {
    Swiper.leftRight('navhowto', 'thanks');
}

Tracker.autorun(function() {});

if (Swiper.pageIs('thanks')) {
    Swiper.leftRight('index', null);
}