import React, { useEffect, useState } from "react";
import { TextField, Card, CardContent, CardActions, Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";


import { diff as diffVerify } from "deep-object-diff";
import { useMemo } from "react";
import { useRef } from "react";



export const TodoListForm = ({ todoList, saveTodoList }) => {
	const [todos, setTodos] = useState(todoList.todos);

	const hasDiff = useMemo(() => {
		const diff = diffVerify(todoList.todos, todos);
		return Object.keys(diff).length !== 0;
	}, [todos, todoList]);

	const inputTimer = useRef(null);

	useEffect(() => {
		clearTimeout(inputTimer.current);
		inputTimer.current = setTimeout(() => {
			if (hasDiff) {
				saveTodoList(todoList.id, { todos });
			}
		}, 5000);
	}, [todos, saveTodoList, hasDiff]);

	return (
		<Card sx={{ margin: "0 1rem" }}>
			<CardContent>
				<Typography component='h2'>{todoList.title}</Typography>
				<form
					// onSubmit={handleSubmit}
					style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
				>
					{todos.map((name, index) => (
						<div title={`todo-${index}`} key={index} style={{ display: "flex", alignItems: "center" }}>
							<Typography sx={{ margin: "8px" }} variant='h6'>
								{index + 1}
							</Typography>
							<TextField
								sx={{ flexGrow: 1, marginTop: "1rem" }}
								label='What to do?'
								value={name}
								title={`todo-${index}-textField`}
								onChange={(event) => {
									setTodos([
										...todos.slice(0, index),
										event.target.value,
										...todos.slice(index + 1),
									]);
								}}
							/>
							<Button
								sx={{ margin: "8px" }}
								size='small'
								color='secondary'
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
						</div>
					))}
					<CardActions>
						<Button
							type='button'
							color='primary'
							name="add todo"
							onClick={() => {
								setTodos([...todos, ""]);
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
