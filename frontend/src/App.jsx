import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { TodoLists } from "./todos/components/TodoLists";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const MainAppBar = () => {
	return (
		<AppBar position='static' color='primary'>
			<Toolbar>
				<Typography variant='h6' color='inherit'>
					Things to do
				</Typography>
			</Toolbar>
		</AppBar>
	);
};

const mainWrapperStyle = { display: "flex", flexDirection: "column" };
const centerContentWrapper = { display: "flex", justifyContent: "center" };
const contentWrapperStyle = {
	display: "flex",
	flexDirection: "column",
	maxWidth: "80rem",
	flexGrow: 1,
};

const theme = createTheme({
	palette: {
		primary: { main: "rgb(28, 192, 224)" },
		secondary: { main: "rgb(224, 121, 121)" },
		deleteAction: { main: "rgb(224, 121, 121)" }
	}
});

const MainWrapper = ({ children }) => {
	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<ThemeProvider theme={theme}>
				<div style={mainWrapperStyle}>
					<MainAppBar />
					<div style={centerContentWrapper}>
						<div style={contentWrapperStyle}>{children}</div>
					</div>
				</div>
			</ThemeProvider>
		</LocalizationProvider>
	);
};

const App = () => {
	return (
		<MainWrapper>
			<TodoLists style={{ margin: "1rem" }} />
		</MainWrapper>
	);
};

export default App;
