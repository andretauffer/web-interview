import React from "react";
// import { within, userEvent } from "@storybook/testing-library";

import { TodoLists } from "../todos/components/TodoLists";

export default {
	title: "Components/List",
	component: TodoLists,
	parameters: {
		mockData: [
			{
				url: "lists",
				method: "PUT",
				status: 200,
				response: {}
			},
		],
	},
};

const Template = (args) => <TodoLists {...args} />;

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const WithData = Template.bind({});
WithData.parameters = {
	mockData: [
		{
			url: "lists",
			method: "GET",
			status: 200,
			response:
			{
				"0000000001": {
					"id": "0000000001",
					"title": "First List",
					"todos": [
						"First todo of first list!"
					]
				},
				"0000000002": {
					"id": "0000000002",
					"title": "Second List",
					"todos": [
						"First todo of second list!"
					]
				}
			},

		},
	],
};

export const NoData = Template.bind({});
// LoggedIn.play = async ({ canvasElement }) => {
// 	const canvas = within(canvasElement);
// 	const loginButton = await canvas.getByRole("button", { name: /Log in/i });
// 	await userEvent.click(loginButton);
// };
