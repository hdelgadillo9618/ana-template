$(document).ready(function () {

  /*Preload Images*/
  if (typeof (preloadImageList) !== "undefined") {
    if (preloadImageList.length > 0) {
      checkImagesLoaded(preloadImageList);
    } else {
      whenImagesAreLoaded(0);
    }
  } else {
    whenImagesAreLoaded(0);
  }

  function checkImagesLoaded(arrayIds) {
    // Initialize the counter
    var counter = arrayIds.length;
    arrayIds.forEach(function (id) {
      var element = $('#' + id);
      if (!element.prop('complete')) {
        element.on('load', function () {
          counter--;
          whenImagesAreLoaded(counter);
        });
        element.on('error', function () {
          counter--;
          whenImagesAreLoaded(counter);
        });
      } else {
        counter--;
        whenImagesAreLoaded(counter);
      }
    });
  }

  function whenImagesAreLoaded(counter) {
    if (counter === 0) {

      setTimeout(function () { 
          
          $('.home').addClass('block');
          $('.content_navigation').addClass('block');
          $('footer').addClass('block');
          $('.content_modal').addClass('block');

      }, 400);

      setTimeout(function () {

        initButtons();

        //ScrollTrigger.config({ignoreMobileResize: true});

        if (!isMobile()) {
          const smoother = ScrollSmoother.create({
            content: "#smooth-content",
            smooth: 1,
            normalizeScroll: true,
            ignoreMobileResize: true,
            effects: true,
          });
        }else {
        }

        $('html').addClass('overflow');
        $('body').addClass('overflow');

        $('.ScrollSmoother-wrapper').addClass('block');
      }, 1000);

      setTimeout(function () {
        
        ScrollTrigger.matchMedia({

          "(min-width: 1000px)": function () {
            /*Sticky Video*/
            gsap.to("#moving-box", {
              scrollTrigger: {
                trigger: ".content_pushing_healthcare",
                start: "-1000px",
                end: "bottom bottom",
                scrub: true, // Sincroniza con el desplazamiento
                pinSpacing: false,
                markers: false,
              },
              x: 0, // Movimiento horizontal
              y: 550, // Movimiento vertical
              ease: "none",
            });

            /*Zoom Video*/
            gsap.to("#zoom-video", {
              scrollTrigger: {
                trigger: ".content_video", // Elemento activador
                start: "top center",         // Inicio de la animación
                end: "bottom top",           // Fin de la animación
                scrub: true,                 // Sincroniza con el scroll
                pinSpacing: false,
                markers: false,
              },
              scale: 1.5, // Incrementa el tamaño de la imagen (200%)
              ease: "power1.inOut", // Suaviza el efecto
            });

            /*Zoom Image*/
            gsap.to("#zoom-image", {
              scrollTrigger: {
                trigger: ".content_image_zoom", // Elemento activador
                start: "top center",         // Inicio de la animación
                end: "bottom top",           // Fin de la animación
                scrub: true,                 // Sincroniza con el scroll
                pinSpacing: false,
                markers: false,
              },
              scale: 1.1, // Incrementa el tamaño de la imagen (200%)
              ease: "power1.inOut", // Suaviza el efecto
            });

            /*Text Reveal*/
            let split = new SplitText("p.text_reveal", {type: "lines"});
            let masks;

            function makeItHappen() {
              masks = [];
              split.lines.forEach((target) => {
                let mask = document.createElement("span");
                mask.className = "mask";
                target.append(mask);
                masks.push(mask);
                gsap.to(mask, {
                  scaleX: 0,
                  transformOrigin: "right center",
                  ease: "none",
                  scrollTrigger: {
                    trigger: target,
                    markers: false,
                    scrub: true,
                    start: "top center",
                    end: "bottom center"
                  }
                });
              });
            }
            window.addEventListener("resize", newTriggers);

            function newTriggers() {
              ScrollTrigger.getAll().forEach((trigger, i) => {
                trigger.kill();
                masks[i].remove();
              });
              split.split();
              makeItHappen();
            }

            makeItHappen();

            /*Sticky Section*/
            ScrollTrigger.create({
              trigger: ".sticky_height",
              scrub: 0.5,
              start: "top top",
              end: "bottom bottom",
              pin: ".sticky_image",
              pinSpacing: false,
              markers: false,
            });

            /*Add steps class to div with 'sticky_height' class on scroll down and remove class on scroll up*/
            let viewBoxes = gsap.utils.toArray(".boxStick");
            viewBoxes.forEach((box) => {
              var idStep = box.getAttribute('data-id');
              gsap.timeline({
                scrollTrigger: {
                  trigger: box,
                  start: "top center",
                  end: "top center",
                  onEnter: () => $(box).parent().parent().addClass(idStep),
                  onEnterBack: () => $(box).parent().parent().removeClass(idStep),
                }
              })
            });

            /* Horizontal Scroll*/
            let container = document.getElementById("container2");
            var itemsBlack = container.getElementsByTagName("article");
            var widthBlackSum = 0;
            for (var i = 0; i < itemsBlack.length; ++i) {
              widthBlackSum = widthBlackSum + itemsBlack[i].scrollWidth;
            }
            gsap.to(container, {
              x: () => -(widthBlackSum - document.documentElement.clientWidth) + "px",
              ease: "none",
              scrollTrigger: {
                trigger: container,
                invalidateOnRefresh: true,
                pin: true,
                scrub: 1,
                end: () => "+=" + widthBlackSum
              }
            });

          },
        });

        /*Lottie*/
        var anim;
        var anim2 = document.getElementById('animations_lottie')
        var animation = {
          container: anim2,
          renderer: 'svg',
          loop: true,
          autoplay: true,   /*MAKE SURE THIS IS FALSE*/
          rendererSettings: {
            progressiveLoad: false
          },
          path: 'animations/data.json',
          name: 'myAnimation',
        };
        anim2 = lottie.loadAnimation(animation);
      }, 1200);

      setTimeout(function () {
        $('.content_loading').addClass('stop');
      }, 1500);

      setTimeout(function () {
        $('.content_loading').addClass('hide');
      }, 2500);

      setTimeout(function () {

        /*Show Intro*/
        $('.content_hero').addClass('show');
        $('.content_navigation').addClass('show');
        $('.content_video_sticky').addClass('show');

        /*Slider*/
        $('.slider').slick({
          fade: true,
          speed: 500,
          autoplay: false,
          autoplaySpeed: 5000,
          pauseOnFocus: false,
          pauseOnHover: false,
          dots: true,
          arrows: true
        });

        /*Slider*/
        $('.mini_slider').slick({
          fade: true,
          speed: 500,
          autoplay: true,
          autoplaySpeed: 2500,
          pauseOnFocus: false,
          pauseOnHover: false,
          dots: true,
          arrows: false
        });

        /*Menu hide*/
        const cntNavitationItem = document.querySelector(".hide_navigation");
        var prevScrollpos = window.pageYOffset;
        window.onscroll = function () {
          var menuHidden = document.getElementById('menu');
          var currentScrollPos = window.pageYOffset;
          if (prevScrollpos > currentScrollPos) {
            cntNavitationItem.classList.add("active");
          } else {
            if (!menuHidden.classList.contains('open')) {
              cntNavitationItem.classList.remove("active");
              document.querySelector('.content_up_button').classList.add('active');
            }
          }
          if (currentScrollPos < 600) {
            cntNavitationItem.classList.remove("active");
            document.querySelector('.content_up_button').classList.remove('active');
          }
          prevScrollpos = currentScrollPos;
        }

        /*Link-To Sections*/
        document.querySelectorAll('.link_sections').forEach((btn) => {
          btn.addEventListener('click', (event) => {
            event.preventDefault();
            gsap.to(window, {duration: 1, scrollTo: "#" + event.currentTarget.dataset.section});
            $('.content_navigation').removeClass('open');
            $('html').addClass('overflow');
          })
        });

        /*Add is-inview class to sections with "classView" class*/
        let viewSections = gsap.utils.toArray(".classView");
        viewSections.forEach((section) => {
          gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top center",
              end: "+=900",
              onEnter: () => onEnter(section),
              onEnterBack: () => onEnter(section),
            }
          })
        });

        function onEnter(section) {
          $(section).addClass("is-inview");
        }

        /*Background Change*/
        ScrollTrigger.create({
          trigger: '.bg_change',
          start: 'top 90%',
          end: 'bottom 10%',
          onEnter: () => {
            document.querySelector('.content_pushing_healthcare').classList.add('active_bg_change');
            document.querySelector('.content_video_zoom').classList.add('active_bg_change');
            document.querySelector('.content_awards').classList.add('active_bg_change');
            document.querySelector('.content_text_reveal').classList.add('active_bg_change');
          },
          onLeaveBack: () => {
            document.querySelector('.content_pushing_healthcare').classList.remove('active_bg_change');
            document.querySelector('.content_video_zoom').classList.remove('active_bg_change');
            document.querySelector('.content_awards').classList.remove('active_bg_change');
            document.querySelector('.content_text_reveal').classList.remove('active_bg_change');
          }
        });

        ScrollTrigger.create({
          trigger: '.bg_change_pink',
          start: 'top 90%',
          end: 'bottom 10%',
          onEnter: () => {
            document.querySelector('.content_horizontal_scroll').classList.add('active_bg_change_pink');
            document.querySelector('.content_sticky').classList.add('active_bg_change_pink');
          },
          onLeaveBack: () => {
            document.querySelector('.content_horizontal_scroll').classList.remove('active_bg_change_pink');
            document.querySelector('.content_sticky').classList.remove('active_bg_change_pink');
          }
        });

        ScrollTrigger.create({
          trigger: '.bg_change_green',
          start: 'top 90%',
          end: 'bottom 10%',
          onEnter: () => {
            document.querySelector('.content_technology').classList.add('active_bg_change_green');
            document.querySelector('.content_how').classList.add('active_bg_change_green');
            document.querySelector('.content_horizontal_scroll').classList.add('active_bg_change_green');
            document.querySelector('.content_how').classList.add('active_bg_change_green');
            document.querySelector('.content_ripple').classList.add('active_bg_change_green');
          },
          onLeaveBack: () => {
            document.querySelector('.content_technology').classList.remove('active_bg_change_green');
            document.querySelector('.content_how').classList.remove('active_bg_change_green');
            document.querySelector('.content_horizontal_scroll').classList.remove('active_bg_change_green');
            document.querySelector('.content_how').classList.remove('active_bg_change_green');
            document.querySelector('.content_ripple').classList.remove('active_bg_change_green');
          }
        });

        ScrollTrigger.create({
          trigger: '.bg_change_yellow',
          start: 'top 90%',
          end: 'bottom 10%',
          onEnter: () => {
            document.querySelector('.content_changing_world').classList.add('active_bg_change_yellow');
            document.querySelector('.content_invested').classList.add('active_bg_change_yellow');
            document.querySelector('.content_impacted').classList.add('active_bg_change_yellow');
          },
          onLeaveBack: () => {
            document.querySelector('.content_changing_world').classList.remove('active_bg_change_yellow');
            document.querySelector('.content_invested').classList.remove('active_bg_change_yellow');
            document.querySelector('.content_impacted').classList.remove('active_bg_change_yellow');
          }
        });

        ScrollTrigger.create({
          trigger: '.bg_change_white',
          start: 'top 60%',
          end: 'bottom 10%',
          onEnter: () => {
            document.querySelector('.content_big_image').classList.add('active_bg_change_white');
            document.querySelector('.content_changing_world').classList.add('active_bg_change_white');
            document.querySelector('.content_impacted').classList.add('active_bg_change_white');
            document.querySelector('.content_our_team').classList.add('active_bg_change_white');
            document.querySelector('.content_advisors').classList.add('active_bg_change_white');
          },
          onLeaveBack: () => {
            document.querySelector('.content_big_image').classList.remove('active_bg_change_white');
            document.querySelector('.content_changing_world').classList.remove('active_bg_change_white');
            document.querySelector('.content_impacted').classList.remove('active_bg_change_white');
            document.querySelector('.content_our_team').classList.remove('active_bg_change_white');
            document.querySelector('.content_advisors').classList.remove('active_bg_change_white');
          }
        });

        /*Sticky Element Left*/
        ScrollTrigger.matchMedia({
          // large
          "(min-width: 1000px)": function () {
            ScrollTrigger.create({
              trigger: ".sticky_object", // What element triggers the scroll
              scrub: 0.5, // Add a small delay of scrolling and animation. `true` is direct
              start: "top top", // Can be top, center, bottom
              end: "bottom bottom", // Can be top, center, bottom
              pin: ".column_left_sticky",
              pinSpacing: false,
              markers: false,
            });
          },
        });

      }, 3000);
    }
  }


 initButtonsModals();


  /*Is Mobile*/
  function isMobile() {
    return /Mobi|Android|iPhone/i.test(navigator.userAgent);
  }

  function initButtons() {
    /*Modal Open*/
    $('.open_modal_ernesto').click(function (e) {
      e.preventDefault();
      $('.modal_ernesto').addClass('show');
      $('#ernesto_video').trigger('play');
      smoother.paused(true);

    });

    $('.open_modal_ivonne').click(function (e) {
      e.preventDefault();
      $('.modal_ivonne').addClass('show');
      $('#ivonne_video').trigger('play');
      smoother.paused(true);

    });

    $('.open_modal_jonathan').click(function (e) {
      e.preventDefault();
      $('.modal_jonathan').addClass('show');
      $('#jonathan_video').trigger('play');
      smoother.paused(true);

    });

    $('.open_modal_katia').click(function (e) {
      e.preventDefault();
      $('.modal_katia').addClass('show');
      $('#katia_video').trigger('play');
      smoother.paused(true);

    });

    $('.open_modal_aris').click(function (e) {
      e.preventDefault();
      $('.modal_aris').addClass('show');
      $('#aris_video').trigger('play');
      smoother.paused(true);

    });

    $('.open_modal_carlos').click(function (e) {
      e.preventDefault();
      $('.modal_carlos').addClass('show');
      $('#carlos_video').trigger('play');
      smoother.paused(true);

    });

    $('.open_modal_marco').click(function (e) {
      e.preventDefault();
      $('.modal_marco').addClass('show');
      $('#marco_video').trigger('play');
      smoother.paused(true);

    });

    $('.open_modal_xochitl').click(function (e) {
      e.preventDefault();
      $('.modal_xochitl').addClass('show');
      $('#xochitl_video').trigger('play');
      smoother.paused(true);

    });

    $('.open_modal_giselle').click(function (e) {
      e.preventDefault();
      $('.modal_giselle').addClass('show');
      $('#giselle_video').trigger('play');
      smoother.paused(true);

    });


    /*Modal Close*/
    $('.btn_close_modal_testitmonial').click(function (e) {
      e.preventDefault();
      $('.content_modal').removeClass('show');
      $('.generic_video').trigger('pause');
      smoother.paused(false);

    });
  }

  function initButtonsModals(){

    /*Modal Caregiver*/
    $('.open_modal_caregiver').click(function (e) {
      e.preventDefault();

      $('.modal_patients, .modal_family, .modal_system').removeClass('show');
      $('.open_modal_patients, .open_modal_family, .open_modal_system').removeClass('active');

      if ($('.modal_caregiver').hasClass('show')) {
        $('.modal_caregiver').removeClass('show');
        $(this).removeClass('active');
      } else {
        $('.modal_caregiver').addClass('show');
        $(this).addClass('active');
      }
    });

    /*Modal Patients*/
    $('.open_modal_patients').click(function (e) {
      e.preventDefault();

      $('.modal_caregiver, .modal_family, .modal_system').removeClass('show');
      $('.open_modal_caregiver, .open_modal_family, .open_modal_system').removeClass('active');

      if ($('.modal_patients').hasClass('show')) {
        $('.modal_patients').removeClass('show');
        $(this).removeClass('active');
      } else {
        $('.modal_patients').addClass('show');
        $(this).addClass('active');
      }
    });

    /*Modal Family*/
    $('.open_modal_family').click(function (e) {
      e.preventDefault();

      $('.modal_caregiver, .modal_patients, .modal_system').removeClass('show');
      $('.open_modal_caregiver, .open_modal_patients, .open_modal_system').removeClass('active');

      if ($('.modal_family').hasClass('show')) {
        $('.modal_family').removeClass('show');
        $(this).removeClass('active');
      } else {
        $('.modal_family').addClass('show');
        $(this).addClass('active');
      }
    });

    /*Modal System*/
    $('.open_modal_system').click(function (e) {
      e.preventDefault();

      $('.modal_caregiver, .modal_patients, .modal_family').removeClass('show');
      $('.open_modal_caregiver, .open_modal_patients, .open_modal_family').removeClass('active');

      if ($('.modal_system').hasClass('show')) {
        $('.modal_system').removeClass('show');
        $(this).removeClass('active');
      } else {
        $('.modal_system').addClass('show');
        $(this).addClass('active');
      }
    });

    /*Close Modal*/
    $('.btn_close_modal').click(function (e) {
      e.preventDefault();
      $('.modal_caregiver, .modal_patients, .modal_family, .modal_system').removeClass('show');
      $('.btnModal').removeClass('active');

    });

    /*Map Mexico Button*/
    $('.btn_mexico').click(function (e) {
      e.preventDefault();

      $('.costa_rica, .venezuela, .colombia, .ecuador, .chile, .argentina').removeClass('active');
      $('.content_costa_rica, .content_venezuela, .content_colombia, .content_ecuador, .content_chile, .content_argentina').removeClass('active');
      $('.btn_costa_rica, .btn_venezuela, .btn_colombia, .btn_ecuador, .btn_chile, .btn_argentina').removeClass('active');

      if ($('.mexico').hasClass('active')) {
        $('.content_mexico').removeClass('active');
        $('.mexico').removeClass('active');
        $(this).parent().parent().removeClass('active');
      } else {
        $('.mexico').addClass('active');
        $('.content_mexico').addClass('active');
        $(this).parent().parent().addClass('active');
      }
    });

    $('.btn_costa_rica').click(function (e) {
      e.preventDefault();

      $('.mexico, .venezuela, .colombia, .ecuador, .chile, .argentina').removeClass('active');
      $('.content_mexico, .content_venezuela, .content_colombia, .content_ecuador, .content_chile, .content_argentina').removeClass('active');
      $('.btn_mexico, .btn_venezuela, .btn_colombia, .btn_ecuador, .btn_chile, .btn_argentina').removeClass('active');

      if ($('.costa_rica').hasClass('active')) {
        $('.content_costa_rica').removeClass('active');
        $('.costa_rica').removeClass('active');
        $(this).parent().parent().removeClass('active');
      } else {
        $('.costa_rica').addClass('active');
        $('.content_costa_rica').addClass('active');
        $(this).parent().parent().addClass('active');
      }
    });

    $('.btn_venezuela').click(function (e) {
      e.preventDefault();

      $('.mexico, .costa_rica, .colombia, .ecuador, .chile, .argentina').removeClass('active');
      $('.content_mexico, .content_costa_rica, .content_colombia, .content_ecuador, .content_chile, .content_argentina').removeClass('active');
      $('.btn_mexico, .btn_costa_rica, .btn_colombia, .btn_ecuador, .btn_chile, .btn_argentina').removeClass('active');

      if ($('.venezuela').hasClass('active')) {
        $('.content_venezuela').removeClass('active');
        $('.venezuela').removeClass('active');
        $(this).parent().parent().removeClass('active');
      } else {
        $('.venezuela').addClass('active');
        $('.content_venezuela').addClass('active');
        $(this).parent().parent().addClass('active');
      }
    });

    $('.btn_colombia').click(function (e) {
      e.preventDefault();

      $('.mexico, .costa_rica, .venezuela, .ecuador, .chile, .argentina').removeClass('active');
      $('.content_mexico, .content_costa_rica, .content_venezuela, .content_ecuador, .content_chile, .content_argentina').removeClass('active');
      $('.btn_mexico, .btn_costa_rica, .btn_venezuela, .btn_ecuador, .btn_chile, .btn_argentina').removeClass('active');

      if ($('.colombia').hasClass('active')) {
        $('.content_colombia').removeClass('active');
        $('.colombia').removeClass('active');
        $(this).parent().parent().removeClass('active');
      } else {
        $('.colombia').addClass('active');
        $('.content_colombia').addClass('active');
        $(this).parent().parent().addClass('active');
      }
    });

    $('.btn_ecuador').click(function (e) {
      e.preventDefault();

      $('.mexico, .costa_rica, .venezuela, .colombia, .chile, .argentina').removeClass('active');
      $('.content_mexico, .content_costa_rica, .content_venezuela, .content_colombia, .content_chile, .content_argentina').removeClass('active');
      $('.btn_mexico, .btn_costa_rica, .btn_venezuela, .btn_colombia, .btn_chile, .btn_argentina').removeClass('active');

      if ($('.ecuador').hasClass('active')) {
        $('.content_ecuador').removeClass('active');
        $('.ecuador').removeClass('active');
        $(this).parent().parent().removeClass('active');
      } else {
        $('.ecuador').addClass('active');
        $('.content_ecuador').addClass('active');
        $(this).parent().parent().addClass('active');
      }
    });

    $('.btn_chile').click(function (e) {
      e.preventDefault();

      $('.mexico, .costa_rica, .venezuela, .colombia, .ecuador, .argentina').removeClass('active');
      $('.content_mexico, .content_costa_rica, .content_venezuela, .content_colombia, .content_ecuador, .content_argentina').removeClass('active');
      $('.btn_mexico, .btn_costa_rica, .btn_venezuela, .btn_colombia, .btn_ecuador, .btn_argentina').removeClass('active');

      if ($('.chile').hasClass('active')) {
        $('.content_chile').removeClass('active');
        $('.chile').removeClass('active');
        $(this).parent().parent().removeClass('active');
      } else {
        $('.chile').addClass('active');
        $('.content_chile').addClass('active');
        $(this).parent().parent().addClass('active');
      }
    });

    $('.btn_argentina').click(function (e) {
      e.preventDefault();

      $('.mexico, .costa_rica, .venezuela, .colombia, .ecuador, .chile').removeClass('active');
      $('.content_mexico, .content_costa_rica, .content_venezuela, .content_colombia, .content_ecuador, .content_chile').removeClass('active');
      $('.btn_mexico, .btn_costa_rica, .btn_venezuela, .btn_colombia, .btn_ecuador, .btn_chile').removeClass('active');

      if ($('.argentina').hasClass('active')) {
        $('.content_argentina').removeClass('active');
        $('.argentina').removeClass('active');
        $(this).parent().parent().removeClass('active');
      } else {
        $('.argentina').addClass('active');
        $('.content_argentina').addClass('active');
        $(this).parent().parent().addClass('active');
      }
    });

    /*Play Video*/
    $('.button_poster').click(function (e) {
      e.preventDefault();
      $(this).parent().parent().addClass('active');
      $('#sample_video').trigger('play');

    });

    /*Open Close*/
    $('.normal_btn').click(function (e) {
      e.preventDefault();

      if ($('.normal_navigation').hasClass('open')) {
        $('.normal_navigation').removeClass('open');
        $('html').addClass('overflow');
      } else {
        $('.normal_navigation').addClass('open');
        $('html').removeClass('overflow');
      }
    });

    $('.hide_btn').click(function (e) {
      e.preventDefault();

      if ($('.hide_navigation').hasClass('open')) {
        $('.hide_navigation').removeClass('open');
        $('html').addClass('overflow');
      } else {
        $('.hide_navigation').addClass('open');
        $('html').removeClass('overflow');
      }
    });

  }

  // Abrir el modal
  function initGetInvolvedModal() {
    // Abrir el modal
    $('#openModal').on('click', function () {
        $('#getInvolvedModal').fadeIn();
    });

    // Cerrar el modal
    $('.close-modal').on('click', function () {
        $('#getInvolvedModal').fadeOut();
    });

    // Cerrar el modal haciendo clic fuera del contenido
    $(window).on('click', function (event) {
        if ($(event.target).is('#getInvolvedModal')) {
            $('#getInvolvedModal').fadeOut();
        }
    });
}

// Inicializar los eventos del modal
initGetInvolvedModal();

// Aquí usamos el evento de click para redirigir a WhatsApp cuando se hace click en los botones
document.getElementById('cuidador-btn').addEventListener('click', function() {
  window.location.href = 'https://wa.me/525527833288?text=Hola,%20quiero%20ser%20parte%20de%20la%20red%20de%20cuidadores';
});

document.getElementById('proveedor-btn').addEventListener('click', function() {
  window.location.href = 'https://wa.me/525527833288?text=Hola,%20quiero%20ser%20parte%20de%20la%20red%20de%20proveedores';
});

// Hacer scroll hasta el final de la página y cerrar el modal
document.getElementById('alianza-btn').addEventListener('click', function() {
  const contactSection = document.getElementById('contactus'); // Asegúrate de que el ID sea correcto
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  document.getElementById('getInvolvedModal').style.display = 'none'; // Cierra el modal
});

document.getElementById('conocer-btn').addEventListener('click', function() {
  const contactSection = document.getElementById('contactus'); // Asegúrate de que el ID sea correcto
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  document.getElementById('getInvolvedModal').style.display = 'none'; // Cierra el modal
});

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.querySelector(".modal");
  const openModalBtn = document.querySelector("#openModal");
  const closeModalBtn = document.querySelector(".close-modal");

  function openModal() {
      modal.style.display = "block";
      document.body.classList.add("modal-open"); // Bloquea el scroll del fondo
  }

  function closeModal() {
      modal.style.display = "none";
      document.body.classList.remove("modal-open"); // Restaura el scroll
  }

  if (openModalBtn) {
      openModalBtn.addEventListener("click", openModal);
  }

  if (closeModalBtn) {
      closeModalBtn.addEventListener("click", closeModal);
  }

  // Cierra el modal si se hace clic fuera del contenido
  window.addEventListener("click", function (event) {
      if (event.target === modal) {
          closeModal();
      }
  });
});

});