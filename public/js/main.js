$(document).ready(function() {
    "use strict";

    $.ajax({
        type: 'GET',
        url: '/fetchposts'
    }).done(function(data){
        var parsedData = JSON.parse(data);
        var template = $("#post-template").text();
        parsedData.forEach(function(post){
            post.url = post.url +" target='_blank'"
            var html = Mustache.render(template, post);
            $("#recent-posts").append(html);
        });
    });

    // Typing intro
    $(".cw-inner h1 span").typed({
        strings: ["Web Developer / Consultant / Educator"],
        typeSpeed: 20
    });

    // Smooth Scroll Easing
    $('a.page-scroll').on('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

    // Prettyphoto
    $("a[class^='prettyPhoto']").prettyPhoto({
        theme: 'pp_default'
    });

    // Featured Slider
    $("#featured-works").owlCarousel({
        navigation: false, 
        slideSpeed: 300,
        pagination: true,
        singleItem: true
    });

    // Menu Click Close
    $('.sidebar-nav li a').on("click", function() {
        $("#sidebar-wrapper").toggleClass("active");
    });

    // Closes the sidebar menu
    $("#menu-close").on("click", function() {
        $("#sidebar-wrapper").toggleClass("active");
    });

    // Opens the sidebar menu
    $("#menu-toggle").on("click", function() {
        $("#sidebar-wrapper").toggleClass("active");
    });

    // Stats 
    $('#stats').appear(function() {
        $('.stat1').animateNumber({
            number: 50
        }, 1500);
        $('.stat2').animateNumber({
            number: 150
        }, 1700);
        $('.stat3').animateNumber({
            number: 400
        }, 1850);
        $('.stat4').animateNumber({
            number: 250
        }, 1800);
    }, {
        accX: 0,
        accY: -200
    });

    // Skills 
    $('#skills').appear(function() {
        $('.skill-bar').removeClass("skill-anim");
    }, {
        accX: 0,
        accY: -200
    });

    // Validate contact form
    $('#contact').validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            message: {
                required: true
            }
        },
        messages: {
            name: {
                required: "Your good name here",
                minlength: "Min least 2 characters"
            },
            email: {
                required: "Your Email Address here"
            },
            message: {
                required: "Write something here to send this form.",
                minlength: "thats all? really?"
            }
        },
        submitHandler: function(form) {
            $(form).ajaxSubmit({
                type: "POST",
                data: $(form).serialize(),
                url: "/sendemail",
                success: function() {
                    $('#contact :input').attr('disabled', 'disabled');
                    $('#contact').fadeTo("slow", 0.15, function() {
                        $(this).find(':input').attr('disabled', 'disabled');
                        $(this).find('label').css('cursor', 'default');
                        $('#success').fadeIn();
                    });
                },
                error: function() {
                    $('#contact').fadeTo("slow", 0.15, function() {
                        $('#error').fadeIn();
                    });
                }
            });
        }
    });

});

// Isotope
$(window).load(function() {
    "use strict";
    var $container = $('#folio');
    $container.isotope({
        itemSelector: '.folio-item',
        transitionDuration: '0.6s'
    });
    var $optionSets = $('.folio-filter'),
        $optionLinks = $optionSets.find('a');
    $optionLinks.click(function() {
        var $this = $(this);
        if ($this.hasClass('selected')) {
            return false;
        }
        var $optionSet = $this.parents('.folio-filter');
        $optionSet.find('.selected').removeClass('selected');
        $this.addClass('selected');
        // make option object dynamically, i.e. { filter: '.my-filter-class' }
        var options = {},
            key = $optionSet.attr('data-option-key'),
            value = $this.attr('data-option-value');
        value = value === 'false' ? false : value;
        options[key] = value;
        if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {
            changeLayoutMode($this, options);
        } else {
            $container.isotope(options);
        }
        return false;
    });
});