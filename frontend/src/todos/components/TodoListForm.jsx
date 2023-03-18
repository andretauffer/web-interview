import React, { Fragment, useEffect, useState } from "react";
import { TextField, Card, CardContent, CardActions, Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import BackspaceIcon from "@mui/icons-material/Backspace";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";


import { diff as diffVerify } from "deep-object-diff";
import { useMemo } from "react";
import { useRef } from "react";

const todoSchema = {
	type: "object",
	required: ["task"],
	properties: {
		task: {
			type: "string",
			description: "A descriptive text indicating what is the task to be fulfilled."
		},
		done: {
			type: "boolean",
			description: "Indicates if the task was already done."
		},
		deadline: {
			type: "integer",
			description: "Time stamp indicating the deadline for the task to be fulfilled."
		}
	}
};

const ActionsContainer = ({ children, styles }) => {
	return <Box sx={{
		display: "flex",
		flexDirection: "column",
		flexWrap: "nowrap",
		justifyContent: "space-between",
		...styles
	}}>
		{children}
	</Box >;
};

export const TodoListForm = ({ todoList, saveTodoList }) => {
	const [todos, setTodos] = useState(todoList.todos);
	const theme = useTheme();
	console.log("the theme", theme);

	const hasDiff = useMemo(() => {
		const diff = diffVerify(todoList.todos, todos);
		return Object.keys(diff).length !== 0;
	}, [todos, todoList]);

	const inputTimer = useRef(null);

	const onChange = ({ index, todo }) => {
		setTodos([
			...todos.slice(0, index),
			todo,
			...todos.slice(index + 1),
		]);

	};

	useEffect(() => {
		clearTimeout(inputTimer.current);
		inputTimer.current = setTimeout(() => {
			if (hasDiff) {
				saveTodoList(todoList.id, { todos });
			}
		}, 1000);
	}, [todos, saveTodoList, hasDiff]);

	return (
		<Card sx={{ margin: "0 1rem" }}>
			<CardContent>
				<Typography component='h2'>{todoList.title}</Typography>
				<form
					// onSubmit={handleSubmit}
					style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
				>
					{todos.map(({ task, done, deadline }, index) => (
						<Fragment key={index}>
							{index !== 0 && <Box sx={{ height: "20px" }} />}
							<div title={`todo-${index}`} style={{
								display: "flex",
								alignItems: "center",
								padding: "20px",
								boxShadow: "0px 2px 6px -1px rgb(1 1 1 / 20%)"
							}}>
								<Typography sx={{ margin: "8px" }} variant='h6'>
									{index + 1}
								</Typography>
								<ActionsContainer styles={{ flexGrow: "1" }}>

									<TextField
										sx={{ flexGrow: 1, marginTop: "1rem" }}
										label='What to do?'
										value={task}
										title={`todo-${index}-textField`}
										onChange={(event) => onChange({ index, todo: { ...todos[index], task: event.target.value } })}
									/>
									<Box sx={{ height: "20px" }} />
									<Box sx={{
										maxWidth: "200px",
										display: "flex",
										alignItems: "center"
									}}>
										<DatePicker
											label="Deadline"
											onChange={(date) => {
												console.log("the date", date);
												if (date) {
													onChange({ index, todo: { ...todos[index], deadline: date.unix() * 1000 } });
												}
											}}
											renderInput={(params) => <TextField {...params} />}
											defaultValue={null}
											value={deadline}
										/>
										<Box sx={{ width: "20px" }} />
										<Box
											title="Remove deadline"
											sx={{ cursor: "pointer" }}
											onClick={() => {
												onChange({ index, todo: { ...todos[index], deadline: null } });
											}}
										>
											<BackspaceIcon
												sx={{
													fill: theme.palette.deleteAction
												}}
												color="deleteAction"
											/>
										</Box>
									</Box>
								</ActionsContainer>
								<ActionsContainer>
									{done ?
										<CheckBoxIcon
											sx={{ margin: "0px auto" }}
											title={todoSchema.properties.done.description}
											onClick={() => onChange({ index, todo: { ...todos[index], done: false } })}
										/>
										:
										<CheckBoxOutlineBlankIcon
											sx={{ margin: "0px auto" }}
											title={todoSchema.properties.done.description}
											onClick={() => onChange({ index, todo: { ...todos[index], done: true } })}
										/>}

									<Box sx={{ height: "20px" }} />

									<Button
										sx={{ margin: "0px auto" }}
										size='small'
										color='deleteAction'
										title={`Remove todo ${index}`}
										onClick={() => {
											setTodos([
												// immutable delete
												...todos.slice(0, index),
												...todos.slice(index + 1),
											]);
										}}
									>
										<DeleteIcon />
									</Button>
								</ActionsContainer>
							</div>
						</Fragment>
					))}
					<CardActions>
						<Button
							type='button'
							color='primary'
							name="add todo"
							onClick={() => {
								setTodos([...todos, { task: "", done: false, deadline: null }]);
							}}
						>
							Add Todo <AddIcon />
						</Button>
					</CardActions>
				</form>
			</CardContent>
		</Card>
	);
};
