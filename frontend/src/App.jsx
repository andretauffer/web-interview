import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { TodoLists } from "./todos/components/TodoLists";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const MainAppBar = () => {
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

export const mainWrapperStyle = {
	display: "flex",
	flexDirection: "column",
};
export const centerContentWrapper = { display: "flex", justifyContent: "center" };
export const contentWrapperStyle = {
	display: "flex",
	flexDirection: "column",
	maxWidth: "80rem",
	flexGrow: 1,
};

export const theme = createTheme({
	palette: {
		primary: { main: "rgb(185, 217, 235)" },
		secondary: { main: "rgb(224, 121, 121)" },
		deleteAction: { main: "rgb(224, 121, 121)" },
		ok: { main: "rgb(102 170 77)" }
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
			<TodoLists style={{
				margin: "1rem", background: "url(https://sellpy-public-assets.s3.amazonaws.com/webApp/sellerLanding/about/Abou_us_bck.svg)",
				backgroundSize: "cover"
			}} />
		</MainWrapper>
	);
};

export default App;
