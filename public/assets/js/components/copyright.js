import { define } from '../utils/define.js';

define('app-copyright', (el) => {
	el.textContent = `${el.textContent}–${new Date().getFullYear()}`;
});
