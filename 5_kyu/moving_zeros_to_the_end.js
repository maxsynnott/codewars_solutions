const moveZeros = (arr) => {
	const filteredArray = arr.filter((item) => item !== 0);
	const zeroCount = arr.length - filteredArray.length;
	return [...filteredArray, ...Array(zeroCount).fill(0)];
};
