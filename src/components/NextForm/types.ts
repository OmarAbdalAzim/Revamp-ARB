export type FormElement = {
  id: string;
  type: 'input' | 'button' | 'checkbox' | 'textarea' | 'select' | 'div';
  label?: string;
  placeholder?: string;
  inputType?: 'text' | 'email' | 'tel' | 'checkbox' | 'password'; // Specific input types
  options?: string[]; // For select dropdown
  className?: string;
  initialValue?: any; // Initial value for controlled components
};

export const elements: FormElement[] = [
  {
    id: 'username',
    type: 'input',
    label: 'Username',
    placeholder: 'Enter your username',
    inputType: 'text',
  },
  {
    id: 'phone',
    type: 'input',
    inputType: 'tel',
    label: 'Phone',
    placeholder: 'Enter your phone number',
  },
  {
    id: 'toggle-section',
    type: 'checkbox',
    label: 'Hide extra section',
    initialValue: false, // Checkbox starts unchecked
  },
  {
    id: 'extra-section',
    type: 'div',
    className: 'extra-section',
    label: 'This is an extra section containing dummy text.',
  },
  {
    id: 'submit-button',
    type: 'button',
    label: 'Submit',
  },
];

export const condition = (values: Record<string, any>): Record<string, boolean> => {
  return {
    username: true,
    phone: true,
    'toggle-section': true,
    'extra-section': !values['toggle-section'], // Show/Hide extra section
    'submit-button': !values['toggle-section'], // Enable/Disable submit button
  };
};
