import { getTimeTillDeadline } from "./TodoListForm";

describe("the getTimeTillDeadline function", () => {

	const currentDate = new Date();
	it("should return the days in the future till deadline", () => {
		const numberOfDays = 6;
		const futureDate = new Date(currentDate.getTime() + (1000 * 60 * 60 * 24 * numberOfDays));

		const regex = new RegExp(`${numberOfDays} days`, "i");
		expect(getTimeTillDeadline(futureDate.getTime())).toMatch(regex);
	});

	it("should return how many days the deadline is past", () => {
		const numberOfDays = -6;
		const pastDate = new Date(currentDate.getTime() + (1000 * 60 * 60 * 24 * numberOfDays));

		const regex = new RegExp(`${Math.abs(numberOfDays)} days`, "i");
		expect(getTimeTillDeadline(pastDate.getTime())).toMatch(regex);
	});

	it("should return how many days the deadline is past", () => {

		const regex = new RegExp("today", "i");
		expect(getTimeTillDeadline(currentDate.getTime())).toMatch(regex);
	});
});