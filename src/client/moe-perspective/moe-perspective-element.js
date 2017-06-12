import { MoeElement } from '../moe-element/moe-element';
import { debounce } from '../../shared/util/util-function-service';
import { map } from '../../shared/util/util-math-service';

const ORIGIN_LEFT = 0.75;
const ORIGIN_TOP = 0.12;

/**
 * Updates an element's perspective origin to adhere to a global origin based
 * on the viewport's width and height. This parallax is legit.
 *
 * @class MoePerspectiveElement
 * @extends MoeElement
 */
export class MoePerspectiveElement extends MoeElement {
	/**
	 * @method connectedCallback
	 * @callback
	 */
	connectedCallback() {
		if (!this.isDebounced) {
			this.isDebounced = true;
			this.updateBounds = debounce(this.updateBounds.bind(this));
			this.updateOrigin = debounce(this.updateOrigin.bind(this));
		}

		document.addEventListener('DOMContentLoaded', this.updateBounds);
		window.addEventListener('load', this.updateBounds);
		window.addEventListener('resize', this.updateBounds);
		window.addEventListener('scroll', this.updateOrigin);
	}

	/**
	 * @method disconnectedCallback
	 * @callback
	 */
	disconnectedCallback() {
		document.removeEventListener('DOMContentLoaded', this.updateBounds);
		window.removeEventListener('load', this.updateBounds);
		window.removeEventListener('resize', this.updateBounds);
		window.removeEventListener('scroll', this.updateOrigin);
	}

	/**
	 * @method updateBounds
	 * @callback
	 */
	updateBounds() {
		this.windowHeight = window.innerHeight || document.documentElement.clientHeight;
		this.windowWidth = window.innerWidth || document.documentElement.clientWidth;

		this.updateOrigin();
	}

	/**
	 * @method updateOrigin
	 * @callback
	 */
	updateOrigin() {
		const { windowHeight, windowWidth } = this;
		const { height, width, bottom, left, right, top } = this.getBoundingClientRect();

		if (
			bottom < 0 ||
			right < 0 ||
			top > windowHeight ||
			left > windowWidth
		) {
			// No need to update.
			// Element outside viewport.
			// GPUs get hot.
			return;
		}

		const relativeLeft = windowWidth * ORIGIN_LEFT - left;
		const relativeTop = windowHeight * ORIGIN_TOP - top;

		const originLeft = relativeLeft / width * 100;
		const originTop = relativeTop / height * 100;

		this.style.perspectiveOrigin = `${originLeft}% ${originTop}%`;
	}
}
