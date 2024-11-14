import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  conditionFields: string[];
  conditions: Record<string, any>;
  fieldValues: Record<string, any>; // Define fieldValues as a Record with string keys and any values
}

const initialState: FormState = {
  conditionFields: [],
  conditions: {},
  fieldValues: {},
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateForm: (state, action: PayloadAction<{ fieldId: string; value: any }>) => {
      const { fieldId, value } = action.payload;
      state.fieldValues[fieldId] = value;
    },
  },
});

export const { updateForm } = formSlice.actions;
export default formSlice.reducer;
