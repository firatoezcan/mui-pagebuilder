import { Add, TableRows } from "@mui/icons-material";
import { Box, Button, Card, CardContent, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Modal, Typography } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { renderComponent } from "./componentcreator";
import { addComponent, closeModal, openModal } from "./editorSlice";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const Editor: FC = () => {
  const { componentModalOpen, components } = useSelector((state: RootState) => state.editor);

  const dispatch = useDispatch();

  return (
    <Box mx="auto" maxWidth={1080}>
      {components.map((component) => (component.ctx?.parentId ? null : renderComponent(component)))}
      <Box
        component={Button}
        border="2px solid"
        borderColor="primary.dark"
        boxShadow={(theme) => `${theme.palette.primary.dark} 0px 0px 0px 2px`}
        mt={0.5}
        height={(theme) => theme.spacing(16)}
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        onClick={() => dispatch(openModal())}
      >
        <Add sx={(theme) => ({ width: theme.spacing(6), height: theme.spacing(6) })} />
      </Box>
      <Modal open={componentModalOpen} onClose={() => dispatch(closeModal())} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Card sx={{ maxHeight: "60vh", width: 640 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Components
            </Typography>
            <List>
              <ListItem>
                <ListItemButton onClick={() => dispatch(addComponent("Stack"))}>
                  <ListItemIcon>
                    <TableRows />
                  </ListItemIcon>
                  <ListItemText
                    primary="Stack"
                    primaryTypographyProps={{ variant: "h5" }}
                    secondary="The Stack component manages layout of immediate children along the vertical or horizontal axis with optional spacing and/or dividers between each child."
                  ></ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Modal>
    </Box>
  );
};
