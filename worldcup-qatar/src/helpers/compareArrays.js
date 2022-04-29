const compareArrays = (array, itemToCompare, index, item) => {
	const copyArray = [...array];
	const arr = Object.entries(array);
	let items = [];

	for (let [key] of arr) {
		let element = arr[key];

		if (
			JSON.stringify(element[1].accepts) ===
			JSON.stringify(itemToCompare.accepts)
		) {
			items.push([copyArray[key], key]);
		}
	}

	if (isOdd(index)) {
		if (isOdd(items[0][1])) {
			items[0][0].lastDroppedItem = item;
		} else {
			items[1][0].lastDroppedItem = item;
		}
	} else {
		if (isOdd(items[1][1])) {
			items[0][0].lastDroppedItem = item;
		} else {
			items[1][0].lastDroppedItem = item;
		}
	}
	return copyArray;
};

const isOdd = num => {
	return num % 2 === 0 ? true : false;
};

export { compareArrays, isOdd };
