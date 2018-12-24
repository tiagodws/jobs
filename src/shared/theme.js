import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#3b5060",
        },
        secondary: {
            main: "#93e7cf",
        },
        text: {
            primary: "#3b5060",
            secondary: "#999999",
        },
    },
    typography: {
        useNextVariants: true,
        overline: {
            fontSize: "1rem",
            lineHeight: 2,
            color: "#999999",
        },
    },
});

export default theme;
