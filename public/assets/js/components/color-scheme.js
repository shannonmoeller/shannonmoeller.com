import { define } from '../utils/define.js';

let COLOR_SCHEME_KEY = '@shannonmoeller/shannonmoeller.com:COLOR_SCHEME';

let ColorScheme = {
	LIGHT: 'LIGHT',
	DARK: 'DARK',
	SYSTEM: 'SYSTEM',
};

let ColorSchemeClass = {
	LIGHT: 'sm--colorSchemeLight',
	DARK: 'sm--colorSchemeDark',
};

let mediaPrefersDark = matchMedia('(prefers-color-scheme: dark)');

function getColorScheme() {
	let prevColorScheme = localStorage.getItem(COLOR_SCHEME_KEY);

	return ColorScheme[prevColorScheme] ?? ColorScheme.SYSTEM;
}

function setColorScheme(colorScheme) {
	let nextColorScheme = ColorScheme[colorScheme] ?? ColorScheme.SYSTEM;

	return localStorage.setItem(COLOR_SCHEME_KEY, nextColorScheme);
}

function updateColorScheme() {
	let { classList } = document.documentElement;
	let colorScheme = getColorScheme();

	switch (colorScheme) {
		case ColorScheme.DARK: {
			setColorScheme(ColorScheme.DARK);

			classList.remove(ColorSchemeClass.LIGHT);
			classList.add(ColorSchemeClass.DARK);

			break;
		}

		case ColorScheme.LIGHT: {
			setColorScheme(ColorScheme.LIGHT);

			classList.remove(ColorSchemeClass.DARK);
			classList.add(ColorSchemeClass.LIGHT);

			break;
		}

		default: {
			setColorScheme(ColorScheme.SYSTEM);

			if (mediaPrefersDark.matches) {
				classList.remove(ColorSchemeClass.LIGHT);
				classList.add(ColorSchemeClass.DARK);
			} else {
				classList.remove(ColorSchemeClass.DARK);
				classList.add(ColorSchemeClass.LIGHT);
			}

			break;
		}
	}
}

updateColorScheme();

mediaPrefersDark.addEventListener('change', () => {
	updateColorScheme();
});

define('sm-color-scheme', (el) => {
	el.addEventListener('click', (event) => {
		setColorScheme(event.target.closest('button').value);
		updateColorScheme();
	});

	el.innerHTML = /* html */ `
		<button value="${ColorScheme.LIGHT}">light</button>
		<button value="${ColorScheme.DARK}">dark</button>
		<button value="${ColorScheme.SYSTEM}">system</button>
	`;
});
