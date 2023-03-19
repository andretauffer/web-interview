import { isListDone } from "./TodoLists";

describe("The isListDone function", () => {

	it("returns true for list with all tasks done", () => {
		const list = {
			todos: [
				{ done: true },
				{ done: true },
				{ done: true }
			]
		};

		expect(isListDone(list)).toEqual(true);
	});

	it("returns false for list with one or more tasks not done", () => {
		const list = {
			todos: [
				{ done: true },
				{ done: false },
				{ done: true }
			]
		};

		expect(isListDone(list)).toEqual(false);
	});

	it("returns false for list with all tasks not done", () => {
		const list = {
			todos: [
				{ done: false },
				{ done: false },
				{ done: false }
			]
		};

		expect(isListDone(list)).toEqual(false);
	});
});