// types.ts
export type FormField = {
  id: string;
  type: 'text' | 'select';
  label: string;
  options?: string[];
};

export type Condition = {
  fieldId: string;
  showIf: {
    field: string;
    value: string;
  };
};

export type FormApiResponse = {
  fields: FormField[];
  conditions: Condition[];
};
