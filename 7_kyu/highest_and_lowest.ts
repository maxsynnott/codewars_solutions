export class Kata {
	static highAndLow(numbers: string): string {
		const nums = numbers.split(" ").map((s) => Number(s));
		return [Math.max(...nums), Math.min(...nums)].join(" ");
	}
}
