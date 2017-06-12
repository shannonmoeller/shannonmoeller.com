export function testFeature(cssClass, value, properties) {
	const element = document.createElement('div');

	let computedStyles;
	let computedValue;

	function setElementValue(prop) {
		if (element.style[prop] != null) {
			element.style[prop] = value;
		}
	}

	function toComputedValue(val, prop) {
		return val || computedStyles[prop];
	}

	// Attach test element
	document.body.insertBefore(element, null);

	// Set element style properties
	properties.forEach(setElementValue);

	// Compute element style properties
	computedStyles = window.getComputedStyle(element, null);

	// Get computed style value
	computedValue = properties.reduce(toComputedValue, '');

	// Add class on html tag
	if (computedValue === value) {
		document.documentElement.classList.add(cssClass);
	}

	// Remove test element
	document.body.removeChild(element);
}

document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

testFeature('preserve3d', 'preserve-3d', [
	'webkitTransformStyle',
	'MozTransformStyle',
	'msTransformStyle',
	'transformStyle'
]);
