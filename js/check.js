
function getMessage(a, b) {
	if (typeof a === 'boolean') {
		if (a) {
			return "Я попал в " + b;
		} else {
			return "Я никуда не попал";
		}
	} else if (typeof a === 'number') {
		return "Я прыгнул на " + a * 100 + " сантиметров";
	} else if (a.constructor === Array) {
		var sum = sumArrayItems(a);
		return "Я прошёл " + sum + " шагов";
	}else if (a.constructor === Array && b.constructor === Array) {
		var length = sumMultipliedArrayItems(a, b);
		return "Я прошёл " + length + " метров";
	}
	
}

function sumArrayItems(a) {
	var sum = 0;
	for (var i=0; i<a.length; i++) {
		sum += a[i];
	}

	return sum;
}

function sumMultipliedArrayItems(a, b) {
	var sum = 0;
	for (var i=0; i<a.length && i<b.length; i++) {
		sum += a[i] * b[i];
	}

	return sum;
}