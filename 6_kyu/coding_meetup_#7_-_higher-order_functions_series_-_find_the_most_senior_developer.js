const findSenior = (developers) => {
	let oldestDevs = [developers[0]];
	for (let i = 1; i < developers.length; i++) {
		const dev = developers[i];
		const oldestAge = oldestDevs[0].age;
		if (dev.age === oldestAge) oldestDevs.push(dev);
		if (dev.age > oldestAge) oldestDevs = [dev];
	}
	return oldestDevs;
};
