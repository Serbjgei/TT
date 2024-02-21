
//----------------------------------Яндекс карта-----------------------------------------
ymaps.ready(function () {
  let center = [43.120475152394356, 131.89532078836044]

  let map = new ymaps.Map("map", {
    center: center, // Координаты центра карты
    zoom: 17, // Масштаб карты
    // controls: [] // Виджеты карты
  });

  map.behaviors.disable('scrollZoom');

  let placemark = new ymaps.Placemark(center, {}, {
    iconLayout: "default#image",
    iconImageHref: "../img/map-marker.svg", // Путь к файлу логотипа
    iconImageSize: [60, 60], // Размеры иконки
    iconImageOffset: [-30, -60] // Смещение иконки
  });

  map.geoObjects.add(placemark); // Добавляем метку на карту
});

//------------------------------Анимайия при скроле------------------------------------

document.addEventListener('DOMContentLoaded', function () {
  AOS.init({
    duration: 1000, // Продолжительность анимации в миллисекундах
    easing: 'ease-in-out', // Функция плавности
    once: true, // Анимация будет проигрываться только один раз
  });
});



//-------------------------------ПОПАП----------------------------------------------------------------------
//------------------------------
let keyframesOpen = [
  { opacity: 0 },
  { opacity: 1 }
];

let keyframesClose = [
  { opacity: 1 },
  { opacity: 0 }
];

let animationOptions = {
  duration: 500,
  easing: 'ease-in-out'
};

// ----- попап инфо
document.addEventListener('DOMContentLoaded', function () {
  let popups = document.querySelectorAll('.service-popup');
  let popupTriggers = document.querySelectorAll('[data-popup]');
  let popupCloses = document.querySelectorAll('[data-popup-close]');



  popupTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      let popupId = this.getAttribute('data-popup');
      let popup = document.getElementById(popupId);

      if (popup) {
        popup.style.display = 'flex';
        popup.animate(keyframesOpen, animationOptions);
      }
    });
  });
  // закрытие popup на кнопку
  popupCloses.forEach(function (close) {
    close.addEventListener('click', function () {
      let popupId = this.getAttribute('data-popup-close');
      let popup = document.getElementById(popupId);

      if (popup) {
        setTimeout(function () {
          popup.style.display = 'none';
        }, 500);

        popup.animate(keyframesClose, animationOptions);

      }
    });
  });

  // Закрываем popup при клике на фон
  popups.forEach(function (popup) {
    popup.addEventListener('click', function (event) {
      if (event.target === this) {
        setTimeout(function () {
          popup.style.display = 'none';
        }, 500);

        popup.animate(keyframesClose, animationOptions);

      }
    });
  });

  //--------------------------------------------Попап консультация

  let popup = document.getElementById('popup-form');
  let popupImage = document.getElementById('popup-form-image');
  let popupTitle = document.getElementById('popup-form-title');

  function openPopup(imageSrc, title) {
    popupImage.src = imageSrc;
    popupTitle.textContent = title;
    popup.style.display = 'flex';
    popup.animate(keyframesOpen, animationOptions);
  };

  let popupForm1 = document.getElementById('popup-form-1');
  let popupForm2 = document.getElementById('popup-form-2');
  let popupForm3 = document.getElementById('popup-form-3');
  let popupForm4 = document.getElementById('popup-form-4');
  let popupForm5 = document.getElementById('popup-form-5');
  let popupForm6 = document.getElementById('popup-form-6');

  popupForm1.addEventListener('click', function () {
    openPopup('../img/service-one.jpg', 'Получите бесплатную консультацию');
  });

  popupForm2.addEventListener('click', function () {
    openPopup('/img/service-two.jpg', 'Траспортная логистика');
  });

  popupForm3.addEventListener('click', function () {
    openPopup('/img/service-three.jpg', 'Расчеты с контрагентами');
  });

  popupForm4.addEventListener('click', function () {
    openPopup('/img/service-four.jpg', 'Таможенная очистка');
  });

  popupForm5.addEventListener('click', function () {
    openPopup('/img/service-five.jpg', 'Таможенный представитель');
  });

  popupForm6.addEventListener('click', function () {
    openPopup('/img/service-six.jpg', 'Юридические услуги');
  });

});

// ---------------------------------------------------------------------------------

// ------------------------------плавный скрол якоря-------------------

document.querySelectorAll(' .header-nav ul li a , .footer-nav ul li a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const start = window.pageYOffset;
      const target = targetElement.getBoundingClientRect().top;
      const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

      const easeInOutQuad = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      };

      const animateScroll = function () {
        const currentTime = 'now' in window.performance ? performance.now() : new Date().getTime();
        const time = Math.min(1, ((currentTime - startTime) / 1000) || 0);

        window.scroll(0, easeInOutQuad(time, start, target, 1));

        if (time < 1) requestAnimationFrame(animateScroll);
      };

      animateScroll();
    }
  });
});

//----------------------------------------------- чекбокс на кнопку ----------------------------

const checkboxConsult = document.getElementById('consult-checkbox');
const submitConsult = document.getElementById('consult-button');

checkboxConsult.addEventListener('change' , function() {
  submitConsult.style.backgroundColor = checkboxConsult.checked ? '#FFF' : '#FFF5';
  submitConsult.style.pointerEvents = checkboxConsult.checked ? 'auto' : 'none' ;
 });

 const checkboxContact = document.getElementById('contact-checkbox');
 const submitContact = document.getElementById('contact-send');

 checkboxContact.addEventListener('change' , function () {
  submitContact.style.backgroundColor = checkboxContact.checked ? '#FFF' : '#FFF5';
  submitContact.style.pointerEvents = checkboxContact.checked ? 'auto' : 'none' ;
 })

//----------------------------------- чекбокс на кнопку попап -----------------------

// Получаем элементы
const checkboxConnect = document.getElementById('popup-connect-checkbox');
const submitButtonConnect = document.getElementById('popup-connect-button');

checkboxConnect.addEventListener('change', function() {
  submitButtonConnect.style.backgroundColor = checkboxConnect.checked ? '#289678' : '#ccc';
  submitButtonConnect.style.pointerEvents = checkboxConnect.checked ? 'auto' : 'none';

 
});


const checkboxForm = document.getElementById('popup-form-checkbox');
const submitButtonForm = document.getElementById('popup-form-button');

checkboxForm.addEventListener('change', function() {
  submitButtonForm.style.backgroundColor = checkboxForm.checked ? '#289678' : '#ccc';
  submitButtonForm.style.pointerEvents = checkboxForm.checked ? 'auto' : 'none';

});


//--------------------------------------------Валидация форм -----------------------------

window.addEventListener('load', function () {
  const patterns = {
    notEmpty: /.+/,
    phone: /\d{7,15}/,
    question: /.{4,}/,
  };

  function validateInput(input) {
    const val = input.value.trim();
    const name = input.dataset.valid;
    const pattern = patterns[name];
    const errorMessageContainer = document.querySelector(`[data-error-for="${input.id}"]`);

    if (!pattern.test(val)) {
      input.classList.add("err");
      errorMessageContainer.textContent = getErrorMessage(name);
      errorMessageContainer.style.display = 'block';
      return true;
    } else {
      input.classList.remove("err");
      errorMessageContainer.textContent = '';
      errorMessageContainer.style.display = 'none';
      return false;
    }
  }

  function getErrorMessage(name) {
    switch (name) {
      case 'notEmpty':
        return 'Поле не должно быть пустым';
      case 'phone':
        return 'Введите корректный номер телефона';
      case 'question':
        return 'Введите минимум 4 символа';
      default:
        return 'Ошибка валидации';
    }
  }

  function handleInputValidation(e) {
    if (e.target.classList.contains('check')) {
      e.target.classList.remove('err');
      const errorMessageContainer = document.querySelector(`[data-error-for="${e.target.id}"]`);
      errorMessageContainer.textContent = '';
      errorMessageContainer.style.display = 'none';
    }
  }

  function handleFormSubmission(e) {
    let hasError = false;
    const inputs = e.currentTarget.querySelectorAll('.check');
    inputs.forEach((input) => {
      if (validateInput(input)) {
        hasError = true;
      }
    });

    if (hasError) {
      e.preventDefault();
    }
  }

  const forms = document.querySelectorAll('.form');

  forms.forEach((form) => {
    form.addEventListener('submit', handleFormSubmission);
    form.addEventListener('focusin', handleInputValidation);
  });
});

function toggleMenu() {
  const menu = document.getElementById('menu');
  const burger = document.getElementById('burger');
  
  if (menu.classList.contains('active')) {
      menu.style.opacity = '0';
      setTimeout(() => {
          menu.classList.toggle('active');
      }, 500);
  } else {
      menu.classList.toggle('active');
      setTimeout(() => {
          menu.style.opacity = '1';
      });
  }

  burger.classList.toggle('active');
}



var swiper = new Swiper(".mySwiper", {
  slidesPerView: 2,
  centeredSlides: true,
  spaceBetween: 30,
  grabCursor: true,
  loop: true, 
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  }
});

document.addEventListener('DOMContentLoaded', function () {
  var phoneLink = document.getElementById('phone-link');

  phoneLink.addEventListener('click', function (event) {
    event.preventDefault();

    var phoneNumber = phoneLink.getAttribute('href').replace('tel:', '');

    var tempInput = document.createElement('input');
    tempInput.value = phoneNumber;
    document.body.appendChild(tempInput);

    tempInput.select();
    document.execCommand('copy');

    document.body.removeChild(tempInput);

    var tooltip = document.createElement('div');
    tooltip.textContent = 'Номер скопирован';
    tooltip.className = 'tooltip';
    document.body.appendChild(tooltip);

    setTimeout(function () {
      tooltip.parentNode.removeChild(tooltip);
    }, 2000);
  });
});


