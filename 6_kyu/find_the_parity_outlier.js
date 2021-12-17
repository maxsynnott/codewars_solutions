const findOutlier = (ints) => {
	const target =
		ints.slice(0, 3).reduce((sum, int) => sum + (Math.abs(int) % 2), 0) < 2
			? 1
			: 0;

	return ints.find((int) => Math.abs(int) % 2 === target);
};
