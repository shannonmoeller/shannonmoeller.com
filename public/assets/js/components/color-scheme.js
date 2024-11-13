import { define } from '../utils/define.js';

let COLOR_SCHEME_KEY = 'COLOR_SCHEME';

let ColorScheme = /** @type {const} */ ({
	LIGHT: 'LIGHT',
	DARK: 'DARK',
	SYSTEM: 'SYSTEM',
});

function getColorScheme() {
	let value = localStorage.getItem(COLOR_SCHEME_KEY);

	return Object.values(ColorScheme).find((x) => x === value) ?? ColorScheme.SYSTEM;
}

/**
 * @param {string} value
 */
function setColorScheme(value) {
	let scheme = Object.values(ColorScheme).find((x) => x === value) ?? ColorScheme.SYSTEM;

	return localStorage.setItem(COLOR_SCHEME_KEY, scheme);
}

function updateColorScheme() {
	let { classList } = document.documentElement;
	let colorScheme = getColorScheme();

	classList.toggle('app--colorSchemeLight', colorScheme === ColorScheme.LIGHT);
	classList.toggle('app--colorSchemeDark', colorScheme === ColorScheme.DARK);
}

updateColorScheme();

define('app-color-scheme', (el) => {
	el.addEventListener('click', (event) => {
		let target = event.target instanceof Element ? event.target : null;
		let value = target && target.closest('button')?.value;

		if (value) {
			setColorScheme(value);
			updateColorScheme();
		}
	});

	el.innerHTML = /* html */ `
		<button value="${ColorScheme.LIGHT}">light</button>
		<button value="${ColorScheme.DARK}">dark</button>
		<button value="${ColorScheme.SYSTEM}">system</button>
	`;
});
