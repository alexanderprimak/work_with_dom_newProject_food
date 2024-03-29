window.addEventListener('DOMContentLoaded', () => {
	const tabsParent = document.querySelector('.tabheader'),
		tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent');

	function hideTabs() {
		tabsContent.forEach((item, index) => {
			item.style.display = 'none';
			tabs[index].classList.remove('tabheader__item_active');
		});
	}

	function showTabs(i = 0) {
		tabsContent[i].style.display = 'block';
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabs();
	showTabs();

	tabsParent.addEventListener('click', e => {
		const target = e.target;
		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, index) => {
				if (item === target) {
					hideTabs();
					showTabs(index);
				}
			});
		}
	});

	
	/// Create timer

	function getTimeRemaining(endTime) {
		const t = Date.parse(endTime) - Date.parse(new Date()),
			getDay = Math.floor(t / (1000 * 60 * 60 * 24)),
			getHours = Math.floor((t / (1000 * 60)) % 24),
			getMinutes = Math.floor((t / 1000 / 60) % 60),
			getSeconds = Math.floor((t / 1000) % 60);

		return {
			total: t,
			days: getDay,
			hours: getHours,
			minutes: getMinutes,
			seconds: getSeconds,
		};
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	function setClock(selector, endTime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			hours = timer.querySelector('#hours');

		const timeInterval = setInterval(() => {
			upDateClock();
		}, 1000);

		upDateClock();

		function upDateClock() {
			const t = getTimeRemaining(endTime);

			days.innerHTML = getZero(t.days);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);
			hours.innerHTML = getZero(t.hours);

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}

	setClock('.timer', '2021-11-17');


	//Work with modal

		const modal = document.querySelector('.modal');
		const buttonsUsingModal = document.querySelectorAll('[data_modal]');
		const modalClose = document.querySelector('[data_modal_close]');

		function triggerModal(displayValue, overflowValue = '') {
			modal.style.display = displayValue;
			document.body.style.overflow = overflowValue;
			clearTimeout(modalTimer);
		}

		const modalTimer = setTimeout(() => {
			triggerModal('block', 'hidden');
		}, 6000);

		buttonsUsingModal.forEach(btn => {
			btn.addEventListener('click', () => {
				triggerModal('block', 'hidden');
			});
		});

		modalClose.addEventListener('click', () => {
			triggerModal('none');
		});

		modal.addEventListener('click', e => {
			const target = e.target;
			if (
				target.classList.contains('modal') ||
				target.classList.contains('modal_close')
			) {
				triggerModal('none');
			}
		});

		window.addEventListener('keyup', e => {
			if (e.key === 'Escape' && modal.style.display === 'block') {
				triggerModal('none');
			}
		});

		function showModalByScroll() {
			if (
				window.pageYOffset + document.documentElement.clientHeight >=
				document.documentElement.scrollHeight
			) {
				triggerModal('block', 'hidden');
				window.removeEventListener('scroll', showModalByScroll);
			}
		}

		window.addEventListener('scroll', showModalByScroll);

		// window.onscroll = function () {
		// 	if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
		// 		triggerModal('block', 'hidden');
		// 	}
		// };


	// Work with class

	const data = {
		menuCard: [
			{
				title: "Меню 'Фитнес'",
				price: 229,
				desc: `	Меню "Фитнес" - это новый подход к приготовлению блюд: больше
							свежих овощей и фруктов. Продукт активных и здоровых людей. Это
							абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
				urlImg: 'img/tabs/vegy.jpg',
			},
			{
				title: 'Меню “Премиум”',
				price: 550,
				desc: `	В меню “Премиум” мы используем не только красивый дизайн упаковки,
							но и качественное исполнение блюд. Красная рыба, морепродукты,
							фрукты - ресторанное меню без похода в ресторан!`,
				urlImg: 'img/tabs/elite.jpg',
			},
			{
				title: 'Меню "Постное"',
				price: 430,
				desc: `	Меню “Постное” - это тщательный подбор ингредиентов: полное
							отсутствие продуктов животного происхождения, молоко из миндаля,
							овса, кокоса или гречки, правильное количество белков за счет тофу
							и импортных вегетарианских стейков.`,
				urlImg: 'img/tabs/post.jpg',
			},
		],
	};

	const { menuCard } = data;

	const menuCardParent = document.querySelector('[data_menuCard]');

	class MenuCard {
		constructor(price, urlImg, title, desc, selectorParent) {
			this.price = price;
			this.urlImg = urlImg;
			this.title = title;
			this.desc = desc;
			this.selectorParent = selectorParent;
		}

		render() {
			const itemMenu = document.createElement('div');
			itemMenu.innerHTML += `
			<div class="menu__item">
						<img src=${this.urlImg} alt="elite" />
						<h3 class="menu__item-subtitle">${this.title}</h3>
						<div class="menu__item-descr">${this.desc}</div>
						<div class="menu__item-divider"></div>
						<div class="menu__item-price">
							<div class="menu__item-cost">Цена:</div>
							<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
						</div>
		`;
			this.selectorParent.appendChild(itemMenu);
		}
	}

	menuCard.forEach(item => {
		new MenuCard(
			item.price,
			item.urlImg,
			item.title,
			item.desc,
			menuCardParent
		).render();
	});
});
