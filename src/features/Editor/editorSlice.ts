import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";
import { AllowedComponents, ComponentInstance, createComponentInstance } from "./componentcreator";
import undoable, { StateWithHistory } from "redux-undo";
import { RootState } from "../../store";

export type EditorState = {
  componentModalOpen: boolean;
  components: ComponentInstance[];
  insertionContext?: ComponentInstance["ctx"];
};

const initialState: EditorState = {
  componentModalOpen: false,
  insertionContext: undefined,
  components: [{ id: "123", componentName: "Stack" }] as ComponentInstance[],
};

const _closeModal = (state: WritableDraft<EditorState>) => {
  state.componentModalOpen = false;
  state.insertionContext = undefined;
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    closeModal: _closeModal,
    openModal: (state, action: PayloadAction<EditorState["insertionContext"]>) => {
      state.componentModalOpen = true;
      state.insertionContext = action.payload;
    },
    addComponent: (state, action: PayloadAction<AllowedComponents>) => {
      state.components.push(createComponentInstance(action.payload, state.insertionContext));
      _closeModal(state);
    },
    deleteComponent: (state, action: PayloadAction<string>) => {
      state.components = state.components.filter((component) => component.id !== action.payload);
    },
  },
});

export const selectEditor = (state: RootState) => state.editor;

// Action creators are generated for each case reducer function
export const { closeModal, openModal, addComponent, deleteComponent } = editorSlice.actions;

export const editorReducer = editorSlice.reducer;
