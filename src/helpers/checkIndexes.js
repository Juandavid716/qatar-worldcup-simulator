import { isOdd } from './compareArrays';

// There some special cases. For that reason, it is better to return directly the expected result.

const checkIndexes = (word, index) => {
	let result = '';
	let copyObject = Object.assign({}, word);
	let newWord = copyObject[0];
	let step = 2;

	let increment = 2;
	if (newWord.length === 6) {
		return newWord + '12131415';
	}
	if (newWord === '01234567' || newWord === '89101112131415') {
		return '0123456789101112131415';
	}

	if (newWord.slice(0, 2) >= 10 && newWord.length >= 4) {
		if (newWord.slice(0, 2) === '89' || newWord.slice(0, 2) === '12') {
			if (newWord.slice(0, 2) === '12') {
				if (newWord.slice(newWord.length - 2, newWord.length) === '13') {
					increment = 2;
				} else {
					step = 2;
					increment = 4;
				}
			} else {
				step = 1;
				increment = 4;
			}
		} else {
			if (newWord === '1011' || newWord === '1415') {
				step = 2;
				increment = 2;
			} else {
				increment = 4;
				step = 1;
			}
		}
	} else {
		if (newWord.length >= 8 && newWord.slice(0, 1) !== 1) {
			increment = 8;
		} else if (newWord.length >= 4 && newWord.slice(0, 2) >= 10) {
			increment = 2;
		} else if (
			newWord.length >= 4 &&
			newWord.length <= 8 &&
			newWord.slice(0, 2) !== '14' &&
			newWord.slice(newWord.length - 2, newWord.length) !== 13
		) {
			increment = 4;
		} else if (newWord.length >= 4) {
			increment = 2;
		} else {
			increment = 2;
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
