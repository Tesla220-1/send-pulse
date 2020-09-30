$(document).ready(function(){
    $('.carousel__inner').slick({
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left-arrow.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right-arrow.svg"></button>'
    });
    
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

    //validate

    function validateForm(form) {
        $(form).validate({
            rules: {
                email: {
                    email: true
                }
            },
            
            messages: {
                name: "Пожалуйста, введите ваше имя",
                phone: 'Пожалуйста, введите ваш телефон',
                email: {
                  required: "Пожалуйста, введите вашу почту",
                  email: "Ваша почта должна быть в формате name@domain.com"
                }
            },
        });

    //Smooth scroll and pageup

     $(window).scroll(function() {
        if ($(this).scrollTop()  > 1000) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
     }); 
     
     $("a[href^='#']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });
}

    validateForm('#consultation form');
    validateForm('.form');
    validateForm('#consultation-form');
    validateForm('#order form');

    //Mask for tel
    $("[name=phone]").mask("+7(999)-999-99-99");

    //form-mail
    $('form').submit( function(e) {
        e.preventDefault();

        $.ajax({
            type: 'POST', //Написал что я отправляю данные на сервер
            url: 'mailer/smart.php', //Указал путь к серверу
            data: $(this).serialize() //Обработал данные перед отправкой на сервер
        }).done(function() {
            $(this).find('input').val(''); //Очистил input-ы формы

            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset'); // Перезапустил формы
        });
        return false;
    } );
});

const tabContent = document.querySelectorAll('[data-content]'),
      tabContentLink = document.querySelectorAll('[data-content-link]'),
      tabList = document.querySelectorAll('[data-list]'),
      tabListLink = document.querySelectorAll('[data-list-link]');

console.log(tabContent); 
console.log(tabContentLink); 
console.log(tabList); 
console.log(tabListLink); 

console.log(tabContent.length); 
console.log(tabContentLink.length); 
console.log(tabList.length); 
console.log(tabListLink.length); 

for (let i = 0; i < tabContentLink.length; i++) {
    tabContentLink[i].addEventListener('click', function(event){
        event.preventDefault();
        if ( tabContent[i].classList.contains('catalog-item__content_active') ) {
            tabContent[i].classList.remove('catalog-item__content_active');
            tabList[i].classList.add('catalog-item__list_active');
        }
    });    
}

for (let i = 0; i < tabListLink.length; i++) {
    tabListLink[i].addEventListener('click', function(event) {
        event.preventDefault();
        if ( tabList[i].classList.contains('catalog-item__list_active') ) {
            tabList[i].classList.remove('catalog-item__list_active');
            tabContent[i].classList.add('catalog-item__content_active');
        }
    });
}

//Modal
const overlay = document.querySelector('.overlay'),
      modalClose = document.querySelectorAll('.modal__close'),
      formOnPage = document.querySelectorAll('.consultation .form input'),
      modalMini = document.querySelector('#thanks');
      console.log(modalMini);

      for (let i = 0; i < modalClose.length; i++) {
        modalClose[i].addEventListener('click', function(event) {
            overlay.style.display = 'none';
            consultationModal.style.display = 'none';
            orderModal.style.display = 'none';
            modalMini.style.display = 'none';
            
            for (let j = 0; j < formOnPage.length; j++) {
                formOnPage[j].setAttribute('required');
            }
        });
    }  

//Modal Consultation
const consultationButton = document.querySelectorAll('[data-modal=consultation]'),
      consultationModal = document.querySelector('#consultation');

for (let i = 0; i < consultationButton.length; i++) {
    consultationButton[i].addEventListener('click', function(event) {
        overlay.style.display = 'block';
        consultationModal.style.display = 'block';

        for (let j = 0; j < formOnPage.length; j++) {
            formOnPage[j].removeAttribute('required');
        }
    });
}

//ModalOrder
const orderButton = document.querySelectorAll('[data-modal=order]'),
      orderModal = document.querySelector('#order'),
      orderTitle = document.querySelectorAll('.catalog-item__subtitle'),
      orderModalSubtitle = document.querySelector('[data-modal=order-subtitle]');

for (let i = 0; i < orderButton.length; i++) {
    orderButton[i].addEventListener('click', function(event) {
        overlay.style.display = 'block';
        orderModal.style.display = 'block';

        orderModalSubtitle.textContent = orderTitle[i].textContent;

        for (let j = 0; j < formOnPage.length; j++) {
            formOnPage[j].removeAttribute('required');
        }
    });
}

new WOW().init();
