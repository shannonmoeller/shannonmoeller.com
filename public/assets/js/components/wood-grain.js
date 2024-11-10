import { define } from '../utils/define.js';

function parseHex(rgb) {
	return {
		r: parseInt(rgb.slice(1, 3), 16),
		g: parseInt(rgb.slice(3, 5), 16),
		b: parseInt(rgb.slice(5, 7), 16),
	};
}

function normalizeRgb({ r, g, b }) {
	return {
		r: r / 255,
		g: g / 255,
		b: b / 255,
	};
}

function generateMatrix(a, b) {
	let aNorm = normalizeRgb(parseHex(a));
	let bNorm = normalizeRgb(parseHex(b));

	return `
		0 0 0 ${bNorm.r - aNorm.r} ${aNorm.r}
		0 0 0 ${bNorm.g - aNorm.g} ${aNorm.g}
		0 0 0 ${bNorm.b - aNorm.b} ${aNorm.b}
		0 0 0 0 1
	`;
}

define('sm-wood-grain', (el) => {
	function update() {
		let rand = `filter-${String(Math.random()).slice(-8)}`;
		console.log(rand);
		el.innerHTML = `
			<svg viewBox="0 0 512 512" style="width: 512px;">
				<filter id="wood-grain-filter">
					<feTurbulence type="fractalNoise" baseFrequency=".01 .1"></feTurbulence>
					<feColorMatrix values="${generateMatrix(a.value, b.value)}"></feColorMatrix>
				</filter>
				<rect x="0" y="0" width="512" height="512" filter="url(#wood-grain-filter)" />
			</svg>
		`;
	}

	update();
	a.addEventListener('input', update);
	b.addEventListener('input', update);
});
