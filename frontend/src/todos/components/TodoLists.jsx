import React, { Fragment, useState, useEffect } from "react";
import {
	Card,
	CardContent,
	List,
	ListItemButton,
	ListItemText,
	ListItemIcon,
	Typography,
} from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CircularProgress from "@mui/material/CircularProgress";
import { TodoListForm } from "./TodoListForm";

const fetchTodoLists = () => {
	return fetch("/lists").then(data => {
		console.log("the data", data);
		return data.json();
	});
};

export const TodoLists = ({ style }) => {
	const [refreshData, setRefreshData] = useState(0);
	const [loading, setLoading] = useState(false);
	const [todoLists, setTodoLists] = useState({});
	const [activeList, setActiveList] = useState();
	console.log("them todo lists", todoLists);
	useEffect(async () => {
		setLoading(true);
		try {

			await fetchTodoLists()
				.then(setTodoLists);

		} catch (error) {
			console.error("failed to get latest todo lists", error);
		}
		setLoading(false);
	}, [refreshData, setLoading]);

	const saveTodoList = async (id, { todos }) => {
		setLoading(true);
		try {
			const listToUpdate = todoLists[id];

			await fetch("/lists", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					...listToUpdate, todos, id
				})
			});
			setRefreshData(refreshData + 1);
		} catch (error) {
			console.error("failed to update list", error);
		}
		setLoading(false);
	};

	return (
		<Fragment>
			<Card style={style}>
				<CardContent>
					<Typography component='h2'>My Todo Lists</Typography>
					<List>
						{!Object.keys(todoLists).length && loading ? <Fragment><CircularProgress /></Fragment> :
							Object.keys(todoLists).map((key) => (
								<ListItemButton key={key} onClick={() => setActiveList(key)}>
									<ListItemIcon>
										<ReceiptIcon />
									</ListItemIcon>
									<ListItemText primary={todoLists[key].title} />
								</ListItemButton>
							))}
					</List>
				</CardContent>
			</Card>
			{todoLists[activeList] && (
				<TodoListForm
					key={activeList} // use key to make React recreate component to reset internal state
					todoList={todoLists[activeList]}
					saveTodoList={saveTodoList}
				/>
			)}
		</Fragment>
	);
};
