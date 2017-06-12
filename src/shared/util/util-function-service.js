/**
 * # Function Service
 *
 * Methods for manipulating and generating functions.
 */

/**
 * @method debounce
 * @param {Function} fn
 * @return {Function}
 */
export function debounce(fn) {
	return function debounced() {
		if (debounced.id) {
			cancelAnimationFrame(debounced.id);
		}

		debounced.id = requestAnimationFrame(fn);
	};
}
