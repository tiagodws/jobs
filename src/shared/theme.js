import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#93e7cf",
        },
        secondary: {
            main: "#3b5060",
        },
        text: {
            primary: "#3b5060",
            secondary: "#5f7ca6",
        },
    },
    typography: {
        useNextVariants: true,
    },
});

export default theme;
