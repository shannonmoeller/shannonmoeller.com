(function() {
	function testFeature(cssClass, value, properties) {
		var computedStyles,
			computedValue,
			element = document.createElement('div'),
			body = document.getElementsByTagName('BODY')[0],
			html = document.getElementsByTagName('HTML')[0];

		function setElementValue(prop) {
			if (element.style[prop] != null) {
				element.style[prop] = value;
			}
		}

		function toComputedValue(val, prop) {
			return val || computedStyles[prop];
		}

		// Attach test element
		body.insertBefore(element, null);

		// Set element style properties
		properties.forEach(setElementValue);

		// Compute element style properties
		computedStyles = window.getComputedStyle(element, null);

		// Get computed style value
		computedValue = properties.reduce(toComputedValue, '');

		// Add class on html tag
		if (computedValue === value) {
			html.classList.add(cssClass);
		}

		// Remove test element
		document.body.removeChild(element);
	}

	testFeature('preserve3d', 'preserve-3d', [
		'webkitTransformStyle',
		'MozTransformStyle',
		'msTransformStyle',
		'transformStyle'
	]);
}());
