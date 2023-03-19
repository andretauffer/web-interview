import React from "react";
import { within, userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { TodoLists } from "../todos/components/TodoLists";

let mockData = {
	"0000000001": {
		"id": "0000000001",
		"title": "First List",
		"todos": [
			{
				task: "First todo of first list!",
				done: false,
				deadline: null
			}
		]
	},
	"0000000002": {
		"id": "0000000002",
		"title": "Second List",
		"todos": [
			{
				task: "First todo of second list!",
				done: true,
				deadline: new Date().getTime() - 1000 * 60 * 60 * 24
			}
		]
	}
};

export default {
	title: "Components/List",
	component: TodoLists,
	args: {
		style: { margin: "1rem" }
	},
	parameters: {
		style: { margin: "1rem" },
		smthElse: "2",
		mockData: [
			{
				url: "lists",
				method: "PUT",
				status: 200,
				response: (args) => {
					const body = JSON.parse(args.body);
					mockData[body.id].todos = body.todos;
					requestCount = requestCount + 1;
					return {};
				}
			}
		],
	},
};

const Template = (args) => <TodoLists {...args} />;

let requestCount = 0;

export const WithData = Template.bind({});
WithData.parameters = {
	mockData: [
		{
			url: "lists",
			method: "GET",
			status: 200,
			response: () => {
				return mockData;
			},

		},
		{
			url: "lists",
			method: "PUT",
			status: 200,
			response: (args) => {
				const body = JSON.parse(args.body);
				mockData[body.id].todos = body.todos;
				requestCount = requestCount + 1;
				return {};
			}
		}
	]
};

const sleep = (time) => new Promise(resolve => setTimeout(resolve, time));

WithData.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);

	const firstList = await canvas.findByTitle("Todo list 0000000001");
	await userEvent.click(firstList);
	const firstTodo = await canvas.findByTitle("todo-0");
	await expect(firstTodo).toBeInTheDocument();
	const checkbox = await canvas.findByTitle("checkbox-not-done-0");
	await userEvent.click(checkbox);
	await sleep(1200);
	const checkMark = await canvas.findByTitle("checkmark-0000000001");
	await expect(checkMark).toBeInTheDocument();
};

WithData.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);

	const firstList = await canvas.findByTitle("Todo list 0000000001");
	await userEvent.click(firstList);

	const addTodoButton = await canvas.findByRole("button", { name: /add todo/i });
	await userEvent.click(addTodoButton);

	const secondTodo = await canvas.findByTitle("todo-1");
	await expect(secondTodo).toBeInTheDocument();

	const today = new Date().getTime();

	const yesterday = new Date((today) - (1000 * 60 * 60 * 24));
	const day = yesterday.getDate() < 10 ? `0${yesterday.getDate()}` : `${yesterday.getDate()}`;
	const month = yesterday.getMonth() + 1 < 10 ? `0${yesterday.getMonth() + 1}` : `${yesterday.getMonth() + 1}`;
	const date = `${month}${day}${yesterday.getFullYear()}`;
	const todoCanvas = within(secondTodo);
	const datePicker = await todoCanvas.findByLabelText("Deadline");
	await userEvent.type(datePicker, date);
	expect(await todoCanvas.findByTitle("time-till-deadline")).toBeInTheDocument();
};

export const NoData = Template.bind({});
