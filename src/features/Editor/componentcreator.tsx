import { Add, ArrowDownward, ArrowUpward, DeleteForever } from "@mui/icons-material";
import { Box, Button, ButtonGroup, Snackbar, Stack, StackProps, Typography, useTheme } from "@mui/material";
import React, { AriaAttributes, FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ulid } from "ulid";
import { RootState } from "../../store";
import { deleteComponent, EditorState, openModal } from "./editorSlice";

type ControllerProps = {
  id: string;
  componentName: string;
  ctx?: {
    parentId: string;
  };
};

const Controller: FC<ControllerProps> = (props) => {
  const { id, componentName, children } = props;
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  const theme = useTheme();

  return (
    <Box onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} position="relative">
      {children}
      {isHovered && (
        <Box
          display="flex"
          alignItems="flex-start"
          justifyContent="space-between"
          sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, boxShadow: `${theme.palette.primary.dark} 0px 0px 0px 1px`, pointerEvents: "none", userSelect: "none" }}
        >
          <Typography variant="h5" component="span" color="white" position="relative" sx={{ backgroundColor: theme.palette.primary.dark }} px={1} py={0.5}>
            {componentName}
          </Typography>
          <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{ pointerEvents: "auto" }}>
            <Button size="small">
              <Add onClick={() => dispatch(openModal({ parentId: id }))} />
            </Button>
            <Button size="small">
              <DeleteForever onClick={() => dispatch(deleteComponent(id))} />
            </Button>
            <Button size="small">
              <ArrowDownward />
            </Button>
            <Button size="small">
              <ArrowUpward />
            </Button>
          </ButtonGroup>
        </Box>
      )}
    </Box>
  );
};

const createComponent = <P, T extends FC>(Component: T, controls: any, defaultProps: Omit<P, keyof AriaAttributes>, allowChilds: boolean) => {
  const WithController: FC<ControllerProps> = (props) => {
    const { components } = useSelector((state: RootState) => state.editor.present);

    const children = components.filter((component) => component.ctx?.parentId === props.id);

    return (
      <>
        <Controller {...props}>
          <Component {...(defaultProps as any)}>{children.map((component) => renderComponent(component))}</Component>
        </Controller>
      </>
    );
  };
  WithController.displayName = `withController(${Component.displayName})`;
  return WithController;
};

const componentMap = {
  Stack: createComponent<StackProps, typeof Stack>(
    Stack,
    {
      spacing: {
        type: "SELECT",
        values: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12],
      },
    },
    { minHeight: 128, p: 4 },
    true
  ),
};

export type AllowedComponents = keyof typeof componentMap;
const isAllowedComponent = (str: string): str is AllowedComponents => Object.keys(componentMap).includes(str);

export const renderComponent = (props: ComponentInstance) => {
  const { id, componentName } = props;
  if (!isAllowedComponent(componentName)) {
    throw new Error("Shouldn't happen, check your Typescript types");
  }
  const Controller = componentMap[componentName];

  return <Controller key={id} {...props} />;
};

export const createComponentInstance = (componentName: AllowedComponents, ctx?: EditorState["insertionContext"]): ComponentInstance => {
  const id = ulid();

  return {
    id,
    componentName,
    ctx,
  };
};

export type ComponentInstance = ControllerProps;
