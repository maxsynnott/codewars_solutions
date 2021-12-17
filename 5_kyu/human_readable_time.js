const humanReadable = (seconds) => {
	const h = Math.floor(seconds / 3600);
	const m = Math.floor(seconds / 60) % 60;
	const s = seconds % 60;

	return [h, m, s].map(format).join(":");
};

const format = (n) => n.toString().padStart(2, "0");
