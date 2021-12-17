const validParentheses = (string) => {
	let count = 0;
	for (let i = 0; i < string.length; i++) {
		string[i] === "(" ? count++ : count--;
		if (count === -1) return false;
	}
	return count === 0;
};
