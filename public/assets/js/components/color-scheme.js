import { define } from '../utils/define.js';

let schemes = ['LIGHT', 'DARK', 'SYSTEM'];
let prefersLight = matchMedia('(prefers-color-scheme: light)');

function getScheme() {
  let value = localStorage.getItem('COLOR_SCHEME');

  return schemes.find((x) => x === value) ?? 'SYSTEM';
}

/**
 * @param {string} value
 */
function setScheme(value) {
  let scheme = schemes.find((x) => x === value) ?? 'SYSTEM';

  return localStorage.setItem('COLOR_SCHEME', scheme);
}

function updateScheme() {
  let { classList } = document.documentElement;
  let scheme = getScheme();

  classList.toggle('app--schemeLight', scheme === 'LIGHT');
  classList.toggle('app--schemeDark', scheme === 'DARK');
}

updateScheme();

define('app-scheme', (el) => {
  let input = el.querySelector('input');

  if (!input) return;

  switch (getScheme()) {
    case 'LIGHT': {
      input.checked = true;
      break;
    }
    case 'DARK': {
      input.checked = false;
      break;
    }
    default: {
      input.checked = prefersLight.matches;
      break;
    }
  }

  el.addEventListener('click', (event) => {
    if (!(event instanceof MouseEvent)) return;

    if (event.altKey || event.metaKey || event.shiftKey) {
      input.checked = prefersLight.matches;
      setScheme('SYSTEM');
    } else {
      setScheme(input.checked ? 'LIGHT' : 'DARK');
    }

    updateScheme();
  });

  prefersLight.addEventListener('change', () => {
    if (getScheme() === 'SYSTEM') {
      input.checked = prefersLight.matches;
    }
  });
});
