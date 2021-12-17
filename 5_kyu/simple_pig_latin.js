const pigIt = (str) =>
	str.replace(/\w+/g, (match) => match.slice(1) + match.slice(0, 1) + "ay");
