import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeItem, TreeView } from "@mui/lab";
import { Box, createTheme, CssBaseline, Drawer, List, ListItem, ListItemText, ThemeProvider } from "@mui/material";
import { FC } from "react";
import { Editor } from "./features/Editor/Editor";

const Sidebar: FC = (props) => {
  const { children } = props;
  return (
    <Drawer
      sx={{
        width: 320,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 320,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open
    >
      {children}
    </Drawer>
  );
};

const App: FC = () => {
  return (
    <Box display="flex">
      <Sidebar>
        <List>
          <ListItem>
            <ListItemText primary={"Seitenstruktur"} />
          </ListItem>
          <ListItem>
            <TreeView aria-label="file system navigator" defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />} sx={{ flexGrow: 1, overflowY: "auto" }}>
              <TreeItem nodeId="1" label="Applications">
                <TreeItem nodeId="2" label="Calendar" />
              </TreeItem>
              <TreeItem nodeId="5" label="Documents">
                <TreeItem nodeId="10" label="OSS" />
                <TreeItem nodeId="6" label="MUI">
                  <TreeItem nodeId="8" label="index.js" />
                </TreeItem>
              </TreeItem>
            </TreeView>
          </ListItem>
        </List>
      </Sidebar>
      <Box component="main" flexGrow={1} p={3} sx={(theme) => ({ background: theme.palette.background.default })}>
        <Editor />
      </Box>
    </Box>
  );
};

const withTheme = (AppOrComponent: FC) => {
  const theme = createTheme({
    typography: { fontFamily: "system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,Helvetica,Arial,Apple Color Emoji,Segoe UI Emoji" },
    palette: {
      mode: "dark",
    },
    shape: {
      borderRadius: 0,
    },
  });

  if (AppOrComponent.displayName) {
    AppOrComponent.displayName = `withTheme(${AppOrComponent.displayName})`;
  }
  const withThemeFunction = () => (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppOrComponent />
    </ThemeProvider>
  );

  return withThemeFunction;
};

export default withTheme(App);
