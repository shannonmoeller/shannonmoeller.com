/**
 * # Math Service
 *
 * Methods for manipulating and generating numbers.
 */

/**
 * @method lerp
 * @param {Number} value
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 */
export function lerp(value, min, max) {
    return min + (max - min) * value;
}

/**
 * @method norm
 * @param {Number} value
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 */
export function norm(value, min, max) {
    return (value - min) / (max - min);
}

/**
 * @method map
 * @param {Number} value
 * @param {Number} minA
 * @param {Number} maxA
 * @param {Number} minB
 * @param {Number} maxB
 * @return {Number}
 */
export function map(value, minA, maxA, minB, maxB) {
    return lerp(norm(value, minA, maxA), minB, maxB);
}
