import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { ThemeProvider } from "@mui/material/styles";
import { theme, contentWrapperStyle, mainWrapperStyle, centerContentWrapper, MainAppBar } from "../src/App"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  parameters: {
    mockData: [
      {
        url: "lists",
        method: "PUT",
        status: 200,
        response: {}
      }
    ],
  }
}

export const decorators = [
  (Story) => (

    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ThemeProvider theme={theme}>
        <div style={mainWrapperStyle}>
          <MainAppBar />
          <div style={centerContentWrapper}>
            <div style={contentWrapperStyle}>
              <Story />
            </div>
          </div>
        </div>
      </ThemeProvider>
    </LocalizationProvider>
  ),
];
