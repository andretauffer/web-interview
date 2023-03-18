import React from "react";
import { within, userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { TodoListForm } from "../todos/components/TodoListForm";

export default {
	title: "Components/ListForm",
	component: TodoListForm,
};

const Template = (args) => <TodoListForm {...args} />;

const saveTodoList = () => { };

export const Populated = Template.bind({});
Populated.args = {
	todoList: {
		todos: [
			{
				task: "First do this",
				done: false,
				deadline: new Date().getTime() + 10000
			},
			{
				task: "Then do that",
				done: true,
				deadline: null
			}
		]
	},
	saveTodoList
};

Populated.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	const addTodoButton = await canvas.getByRole("button", { name: /add todo/i });
	await userEvent.click(addTodoButton);
	const newTodo = await canvas.findByTitle("todo-2");
	await expect(newTodo).toBeInTheDocument();
	const removeTodo = await canvas.findByTitle("Remove todo 2");
	await userEvent.click(removeTodo);
};


export const Empty = Template.bind({});
Empty.args = {
	todoList: {
		todos: []
	},
	saveTodoList
};

Empty.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	const addTodoButton = await canvas.findByRole("button", { name: /add todo/i });
	await userEvent.click(addTodoButton);
	const newTodo = await canvas.findByTitle("todo-0");
	await expect(newTodo).toBeInTheDocument();
	const newTodoTextField = await canvas.findByTitle("todo-0-textField");
	const input = newTodoTextField.querySelector("input");
	const textInput = "something new to be done";
	userEvent.type(input, textInput);
	expect(input.value).toEqual(textInput);
	const removeTodo = await canvas.findByTitle("Remove todo 0");
	await userEvent.click(removeTodo);

};