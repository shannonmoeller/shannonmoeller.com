import { define } from '../utils/define.js';

define('sm-copyright', (el) => {
	el.textContent = `${el.textContent}–${new Date().getFullYear()}`;
});
