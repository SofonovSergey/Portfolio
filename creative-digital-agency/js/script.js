function isIE() {
	ua = navigator.userAgent;
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
	return is_ie;
}

// удаляет теги картинок и заменяет их фоновыми картинками в IE
function ibg() {
	if (isIE()) {
		let ibg = document.querySelectorAll(".ibg");
		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
				ibg[i].querySelector('img').style.display = "none";
			}
		}
	}
}
ibg();

// полифил функции forEach() для IE 11
if ('NodeList' in window && !NodeList.prototype.forEach) {
	console.info('polyfill for IE11');
	NodeList.prototype.forEach = function (callback, thisArg) {
		thisArg = thisArg || window;
		for (var i = 0; i < this.length; i++) {
			callback.call(thisArg, this[i], i, this);
		}
	};
}
// выравнивание подзаголовка на первой странице =================================================
let headSubtitle = document.querySelector(".head-title__bottom.active"),
	subTitleElem = [];
// оборачиваем символы в span
for (let i = 0; i < headSubtitle.textContent.length; i++) {
	let span = document.createElement("span");
	span.classList.add("head-title__bottom_span");
	span.innerHTML = headSubtitle.textContent[i];

	subTitleElem[i] = span;
}
// добавляем стили для правильного отображения флекс-элементов
headSubtitle.style.letterSpacing = "normal";
headSubtitle.style.justifyContent = "space-between";
// Удаляем содержимое
headSubtitle.innerHTML = "";

// добавляем новое содержимое
for (let i = 0; i < subTitleElem.length; i++) {
	headSubtitle.innerHTML += subTitleElem[i].outerHTML;
}

// выпадающее меня колонок с социальными сетями ======================================================
let toggleListBtn = document.querySelector(".soc-btn__toggle-list"),
	socBtnList = document.querySelector(".soc-btn__list");

toggleListBtn.addEventListener("click", function (e) {
	e.preventDefault();
	toggleListBtn.classList.toggle("active");
	socBtnList.classList.toggle("active");
});

// выпадающее меню в шапке сайта ============================================================
let iconMenu = document.querySelector(".icon-menu");
let iconMenuLink = document.querySelectorAll(".menu__link");
let mainHeader = document.querySelector(".main-header");
let menuBody = document.querySelector(".menu__body");

// открытие меню по бургеру
if (iconMenu != null) {
	let delay = 500;
	let body = document.querySelector("body");
	iconMenu.addEventListener("click", function (e) {
		if (!body.classList.contains("wait")) {
			iconMenu.classList.toggle("active");
			menuBody.classList.toggle("active");
		}
		if (!document.body.classList.contains("lock")) {
			bodyLock();
		} else {
			bodyUnlock();
		}
	});
};

// Подсвечивание активных ссылок меню и закрытие меню на мобильных устройствах
mainHeader.addEventListener('click', function (e) {
	if (e.target.classList.contains("menu__link")) {
		iconMenuLink.forEach(function (el) {
			el.classList.remove("active");
		});
		menuBody.classList.remove("active");
		iconMenu.classList.remove("active");
		e.target.classList.add("active");
	}
});

// Блокировка прокрутки страницы при открытии выпадающего меню ===============================================
// фиксированные элементы на странице
const lockPadding = document.querySelectorAll(".lock-padding");
let unlock = true,
	timeout = 500;

// блокировка полосы прокрутки у гета body и добавление отступа на месте полосы прокрутки
function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";

	if (lockPadding.length > 0) {
		for (let e = 0; e < lockPadding.length; e++) {
			const el = lockPadding[e];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	document.body.style.paddingRight = lockPaddingValue;
	document.body.classList.add("lock");

	unlock = false;
}

// разблокировка полосы прокрутки у гета body и удаление отступа на месте полосы прокрутки
function bodyUnlock() {
	if (lockPadding.length > 0) {
		for (let e = 0; e < lockPadding.length; e++) {
			const el = lockPadding[e];
			el.style.paddingRight = "0px";
		}
	}
	document.body.style.paddingRight = "0px";
	document.body.classList.remove("lock");
}

// затемнение шапки
window.addEventListener("scroll", function () {
	if (window.pageYOffset > 0) {
		mainHeader.classList.add("main-header_dark");
	} else {
		mainHeader.classList.remove("main-header_dark");
	}
});

// инициализация скроллинга на странице =====================================================
var scroll = new SmoothScroll('a[href*="#"][data-scroll]', {
	// Selectors
	header: '.main-header', // селектор для фиксированной шапки

	// Speed & Duration
	speed: 1000, // Integer. Время в миллисекундах, необходимое для прокрутки 1000 пикселей
	speedAsDuration: true, // true - скорость используется как общая продолжительность анимации прокрутки

	// Easing
	easing: 'easeInOutCubic', // Название шаблона анимации

	// History
	popstate: true, // Анимированная прокрутка с помощью кнопок браузера вперед/назад (requires updateURL to be true)
});