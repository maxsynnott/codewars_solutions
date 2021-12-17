class Solver {
	constructor(clues) {
		this.clues = clues;
		this.n = this.clues.length / 4;
		this.range = Array.from({ length: this.n }, (_, i) => i + 1);
		this.permutations = permutate(this.range);
		this.cluePermutations = this.permutations.reduce(
			(acc, curr) => {
				const key = countVisible(curr);
				return { ...acc, ...{ [key]: [...(acc[key] || []), curr] } };
			},
			{ 0: this.permutations }
		);
		this.possibleValues = Array.from({ length: this.n }, () =>
			Array.from({ length: this.n }, () => this.range.slice())
		);
		this.skyline = Array.from({ length: this.n }, () =>
			Array.from({ length: this.n }, () => null)
		);
	}

	solve = () => {
		for (let y = 0; y < this.n; y++) {
			for (let x = 0; x < this.n; x++) {
				if (this.getSkylineAt(x, y)) continue;

				this.recalculatePossibleValues(x, y);
				const possibleValues = this.getPossibleValuesAt(x, y);

				if (possibleValues.length === 1) {
					this.setSkylineAt(x, y, possibleValues[0]);
					x = -1;
					y = 0;
				}
			}
		}
	};

	getSkylineAt = (x, y) => this.skyline[y][x];
	setSkylineAt = (x, y, value) => {
		this.skyline[y][x] = value;
	};

	getPossibleValuesAt = (x, y) => this.possibleValues[y][x].slice();
	intersetPossibleValuesAt = (x, y, possibleValues) => {
		this.possibleValues[y][x] = intersect(
			this.getPossibleValuesAt(x, y),
			possibleValues
		);
	};

	recalculatePossibleValues = (x, y) => {
		const possibleRows = this.getPossibleRows(y);
		this.intersetPossibleValuesAt(
			x,
			y,
			possibleRows.map((row) => row[x])
		);

		const possibleColumns = this.getPossibleColumns(x);
		this.intersetPossibleValuesAt(
			x,
			y,
			possibleColumns.map((col) => col[y])
		);
	};

	getPossibleRows = (y) => {
		const leftClue = this.clues[this.n * 4 - 1 - y];
		const rightClue = this.clues[this.n + y];
		const lcPossibles = this.getCluePermutations(leftClue);
		const rcPossibles = this.getCluePermutations(rightClue).map((p) =>
			p.reverse()
		);
		const possibleRows = permutationsIntersect(lcPossibles, rcPossibles);
		const columns = this.getColumnsExcluding(y);

		return possibleRows.filter((row) =>
			row.every((value, index) => {
				const column = columns[index];
				return !column.includes(value);
			})
		);
	};

	getPossibleColumns = (x) => {
		const topClue = this.clues[0 + x];
		const bottomClue = this.clues[this.n * 3 - 1 - x];
		const tcPossibles = this.getCluePermutations(topClue);
		const bcPossibles = this.getCluePermutations(bottomClue).map((p) =>
			p.reverse()
		);
		const possibleColumns = permutationsIntersect(tcPossibles, bcPossibles);
		const rows = this.getRowsExcluding(x);
		return possibleColumns.filter((column) =>
			column.every((value, index) => {
				const row = rows[index];
				return !row.includes(value);
			})
		);
	};

	getCluePermutations = (clue) =>
		this.cluePermutations[clue].map((permutation) => permutation.slice());

	getColumnsExcluding = (y) =>
		this.range.map((n) => {
			const column = this.getColumn(n - 1);
			delete column[y];
			return column;
		});

	getRowsExcluding = (x) =>
		this.range.map((n) => {
			const row = this.getRow(n - 1);
			delete row[x];
			return row;
		});

	getColumn = (x) => this.skyline.map((row) => row[x]);
	getRow = (y) => this.skyline[y].slice();
}

const permutate = (arr) => {
	if (arr.length <= 2) return arr.length === 2 ? [arr, [arr[1], arr[0]]] : arr;
	return arr.reduce(
		(acc, curr, i) =>
			acc.concat(
				permutate([...arr.slice(0, i), ...arr.slice(i + 1)]).map((val) => [
					curr,
					...val,
				])
			),
		[]
	);
};

const countVisible = (arr) => {
	let maxHeight = 0;
	return arr.reduce((acc, curr) => {
		if (curr < maxHeight) return acc;
		maxHeight = curr;
		return acc + 1;
	}, 0);
};

const solvePuzzle = (clues) => {
	const solver = new Solver(clues);
	solver.solve();
	return solver.skyline;
};

const permutationsIntersect = (arr1, arr2) =>
	arr1.filter((e) => arr2.map((e) => e.join("")).includes(e.join("")));
const intersect = (arr1, arr2) => arr1.filter((e) => arr2.includes(e));
