import React, { Fragment, useState, useEffect } from "react";
import {
	Card,
	CardContent,
	List,
	ListItemButton,
	ListItemText,
	ListItemIcon,
	Typography,
	useTheme,
} from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CircularProgress from "@mui/material/CircularProgress";
import { TodoListForm } from "./TodoListForm";
import CheckIcon from "@mui/icons-material/Check";

const fetchTodoLists = () => {
	return fetch("/lists").then(data => {
		return data.json();
	});
};

export const isListDone = (list) => {
	if (list && list.todos.length) {
		return list.todos.reduce((prev, curr) => {
			if (!prev) return prev;
			else return curr.done;
		}, true);
	}
	return false;
};

export const TodoLists = ({ style }) => {
	const [refreshData, setRefreshData] = useState(0);
	const [loading, setLoading] = useState(false);
	const [todoLists, setTodoLists] = useState({});
	const [activeList, setActiveList] = useState();

	const theme = useTheme();

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
								<ListItemButton key={key} title={`Todo list ${key}`} onClick={() => setActiveList(key)}>
									<ListItemIcon>
										<ReceiptIcon />
									</ListItemIcon>
									<ListItemText primary={todoLists[key].title} />
									{<CheckIcon
										sx={{
											transition: "all 0.5s linear",
											stroke: theme.palette.ok.main,
											strokeWidth: "2px",
											strokeDasharray: 200,
											strokeDashoffset: isListDone(todoLists[key]) ? 0 : 200,
											fill: "transparent"
										}}
										color="transparent" title={`checkmark-${key}`} />}
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
