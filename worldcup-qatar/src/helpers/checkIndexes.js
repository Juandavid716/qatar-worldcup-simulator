import { isOdd } from './compareArrays';

const checkIndexes = (word, index) => {
	let result = '';
	let copyObject = Object.assign({}, word);
	let newWord = copyObject[0];
	let step;

	let increment = 2;

	if (newWord.length === 4) {
		step = 2;
	} else {
		if (newWord.length >= 8) {
			increment = 8;
		}
		step = 1;
	}

	for (let i = 0; i < newWord.length; i = i + step) {
		let letter = newWord.slice(i, i + step);

		if (isOdd(index)) {
			result += String(Number(letter) + increment);
		} else {
			result += String(Number(letter) - increment);
		}
	}

	if (isOdd(index)) {
		return newWord + result;
	} else {
		return result + newWord;
	}
};

export default checkIndexes;
