/**
 * @class MoeElement
 * @extends HTMLElement
 */
export class MoeElement extends HTMLElement {
	/**
	 * This element's most-specific lowercase tag name.
	 *
	 * @property {String} is
	 */
	get is() {
		return (this.getAttribute('is') || this.tagName).toLowerCase();
	}

	/**
	 * Declarative event handling. Allows child elements to delegate event
	 * handling via custom attributes.
	 *
	 *     class MoeFooElement extends MoeElement {
	 *         constructor() {
	 *             super();
	 *
	 *             // Listen for clicks.
	 *             this.addEventListener('click', this);
	 *         }
	 *
	 *         onFooClicked(event, el) {
	 *             // Handles `moe-foo-click="onFooClicked"`.
	 *         }
	 *     }
	 *
	 *     <moe-foo>
	 *         <!-- Execute `onFooClicked` when this button is clicked. -->
	 *         <button moe-foo-click="onFooClicked">
	 *             Click me.
	 *         </button>
	 *     </moe-foo>
	 *
	 * @method handleEvent
	 * @param {Event} event
	 * @callback
	 */
	handleEvent(event) {
		const { target, type } = event;
		const attribute = `${this.is}-${type}`;
		const fromEl = target.closest(`[${attribute}]`);
		const method = fromEl && fromEl.getAttribute(attribute);

		if (method && typeof this[method] === 'function') {
			this[method](event, fromEl);
		}
	}
}
