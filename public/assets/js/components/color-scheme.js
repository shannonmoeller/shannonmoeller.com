import { define } from '../utils/define.js';

let COLOR_SCHEME_KEY = 'COLOR_SCHEME';

let ColorScheme = /** @type {const} */ ({
	LIGHT: 'LIGHT',
	DARK: 'DARK',
	SYSTEM: 'SYSTEM',
});

let lightColorSchemeMedia = matchMedia('(prefers-color-scheme: light)');

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
	let input = el.querySelector('input');

	if (!input) return;

	switch (getColorScheme()) {
		case ColorScheme.LIGHT: {
			input.checked = true;
			break;
		}
		case ColorScheme.DARK: {
			input.checked = false;
			break;
		}
		default: {
			input.checked = lightColorSchemeMedia.matches;
			break;
		}
	}

	el.addEventListener('click', (event) => {
		if (!(event instanceof MouseEvent)) return;

		if (event.altKey || event.metaKey || event.shiftKey) {
			input.checked = lightColorSchemeMedia.matches;
			setColorScheme(ColorScheme.SYSTEM);
		} else {
			setColorScheme(input.checked ? ColorScheme.LIGHT : ColorScheme.DARK);
		}

		updateColorScheme();
	});

	lightColorSchemeMedia.addEventListener('change', () => {
		if (getColorScheme() === ColorScheme.SYSTEM) {
			input.checked = lightColorSchemeMedia.matches;
		}
	});
});
