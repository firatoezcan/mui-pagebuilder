import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeItem, TreeView } from "@mui/lab";
import { Box, createTheme, CssBaseline, Drawer, List, ListItem, ListItemText, ThemeProvider } from "@mui/material";
import { FC } from "react";
import { useSelector } from "react-redux";
import { ComponentInstance } from "./features/Editor/componentcreator";
import { Editor } from "./features/Editor/Editor";
import { RootState } from "./store";

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
  const { components } = useSelector((state: RootState) => state.editor.present);

  const renderTreeItem = (props: ComponentInstance) => {
    const children = components.filter((component) => component.ctx?.parentId === props.id);

    return (
      <TreeItem key={props.id} nodeId={props.id} label={props.componentName}>
        {children.map(renderTreeItem)}
      </TreeItem>
    );
  };

  return (
    <Box display="flex">
      <Sidebar>
        <List>
          <ListItem>
            <ListItemText primary={"Seitenstruktur"} />
          </ListItem>
          <ListItem>
            <TreeView aria-label="file system navigator" defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />} sx={{ flexGrow: 1, overflowY: "auto" }}>
              {components.map((component) => (component.ctx?.parentId ? null : renderTreeItem(component)))}
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
