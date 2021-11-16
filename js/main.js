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
});

async function fetchAsync(url) {
	let response = await fetch(url);
	let data = await response.json();
	return data;
}

// Work with modal

const modal = document.querySelector('.modal');
const buttonsUsingModal = document.querySelectorAll('[data_modal]');
const modalClose = document.querySelector('[data_modal_close]');

function triggerModal(displayValue, overflowValue = '') {
	modal.style.display = displayValue;
	document.body.style.overflow = overflowValue;
}

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
