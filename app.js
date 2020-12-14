function init() {
    const slides = document.querySelectorAll('.slide');
    const pages = document.querySelectorAll('.page');
    const backgrounds = [
        `radial-gradient(#12376D,#010E2B,#000000)`,
         `radial-gradient(#462C1D, #020202)`,
          `radial-gradient(#306341, #000000)`
        ];
        // Tracker
        let current = 0;
        let scrollSlide = 0;

        slides.forEach((slide,index) => {
            slide.addEventListener('click', function() {
                changeDots(this),
                nextSlide(index);
                scrollSlide = index;
            })
        });

        function changeDots(dot) {
            slides.forEach(slide => {
                slide.classList.remove("active");
            })
           dot.classList.add("active");
        }

        function nextSlide(pageNumber) {
                const nextPage = pages[pageNumber];
                const currentPage = pages[current];
                const nextLeft = nextPage.querySelector('.hero .character-left');
                const nextRight = nextPage.querySelector('.hero .character-right');
                const currentLeft = currentPage.querySelector('.hero .character-left');
                const currentRight = currentPage.querySelector('.hero .character-right');
                const nextText = nextPage.querySelector('.details');
                const container = document.querySelector('.container');

                const tl = new TimelineMax({
                    onStart: function() {
                        slides.forEach(slide => {
                            slide.style.pointerEvents = 'none'
                        })
                    },
                    onComplete: function(){
                        slides.forEach(slide => {
                            slide.style.pointerEvents = 'all'
                        })
                    }
                });

        tl.fromTo(currentLeft, 0.3, {y: '-10%'}, {y: '-100%'})
        .fromTo(currentRight, 0.3, {y: '-10%'}, {y: '-100%'}, '-=0.2')
        .to(container, 0.3, {backgroundImage: backgrounds[pageNumber]})
        .fromTo(currentPage, 0.3, {opacity: 1, pointerEvents: 'all'}, {opacity: 0, pointerEvents: 'none'})
        .fromTo(nextPage, 0.3, {opacity: 0, pointerEvents: 'none'}, {opacity: 1, pointerEvents: 'all'}, '-=0.6')
        .fromTo(nextLeft, 0.3, {y: '-100%'}, {y:'-10%'}, '-=0.6')
        .fromTo(nextRight, 0.3, {y: '-100%'}, {y:'10%'}, '-=0.8')
        .fromTo(nextText, 0.3, {opacity: 0, y: 0}, {opacity: 1, y:0})
        .set(nextLeft, {clearProps: 'all'})
        .set(nextRight, {clearProps: 'all'})
        current = pageNumber;
    }
                
    document.addEventListener('wheel', throttle(scrollChange, 1500));
    document.addEventListener('touchmove', throttle(scrollChange, 1500));

    function switchDots(dotNumber) {
        const activeDot = document.querySelectorAll('.slide')[dotNumber]
        slides.forEach(slide => {
            slide.classList.remove('active')
        });
        activeDot.classList.add('active')
    }

    function scrollChange(e) {
        if(e.deltaY > 0) {
            scrollSlide += 1;
        }
        else {
            scrollSide -= 1;
        }

        if (scrollSlide > 2) {
            scrollSlide = 0;
        }
        if (scrollSlide < 0) {
            scrollSlide =  2;
        }
        switchDots(scrollSlide);
        nextSlide(scrollSlide);
    }

    const hamburger = document.querySelector('.menu');
    const hamburgerLines = document.querySelectorAll('.menu rect');
    const navOpen = document.querySelector('.nav-open');
    const contact = document.querySelector('.contact');
    const gallery = document.querySelector('.gallery');
    const social = document.querySelector('.social');
    const logo = document.querySelector('.logo');

    const tl = new TimelineMax({paused: true, reversed: true});

    tl.to(navOpen, 0.5, {y:0})
    .fromTo(gallery, 0.5, {opacity: 0, y: 10}, {opacity: 1, y:0}, '-=0.4')
    .fromTo(contact, 0.5, {opacity: 0, y: 10}, {opacity: 1, y:0}, '-=0.3')
    .fromTo(social, 0.5, {opacity: 0, y: 10}, {opacity: 1, y:0}, '-=0.2')
    .fromTo(logo, 0.2, {color:'white'}, {color: 'black'}, '-=1')
    .fromTo(hamburgerLines, 0.2, {stroke: 'white'}, {fill: 'black'}, '-=1')

    hamburger.addEventListener('click', (e) => {
        console.log(e);
        tl.reversed() ? tl.play() : tl.reverse();
    });
}


function throttle(func, limit) {
    let inThrottle;
     return function() 
        {
            const args = arguments;
            const context = this;
            if (!inThrottle) 
            {
                func.apply(context, args);
                inThrottle = true;
                 setTimeout(() => (inThrottle = false), limit);    
            }
        };
    }


    function animateFrom(elem, direction) {
        direction = direction | 1;
        
        var x = 0,
            y = direction * 100;
        if(elem.classList.contains("gs_reveal_fromLeft")) {
          x = -100;
          y = 0;
        } else if(elem.classList.contains("gs_reveal_fromRight")) {
          x = 100;
          y = 0;
        }
        gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
          duration: 1.25, 
          x: 0,
          y: 0, 
          autoAlpha: 1, 
          ease: "expo", 
          overwrite: "auto"
        });
      }
      
      function hide(elem) {
        gsap.set(elem, {autoAlpha: 0});
      }
      
      document.addEventListener("DOMContentLoaded", function() {
        gsap.registerPlugin(ScrollTrigger);
        
        gsap.utils.toArray(".gs_reveal").forEach(function(elem) {
          hide(elem);
          
          ScrollTrigger.create({
            trigger: elem,
            onEnter: function() { animateFrom(elem) }, 
            onEnterBack: function() { animateFrom(elem, -1) },
            onLeave: function() { hide(elem) }
          });
        });
      });


init();