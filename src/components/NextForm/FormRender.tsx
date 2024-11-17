import React, { useState } from 'react';

type FormElement = {
  id: string;
  type: 'input' | 'button' | 'checkbox' | 'textarea' | 'select' | 'div';
  label?: string;
  placeholder?: string;
  inputType?: 'text' | 'email' | 'tel' | 'checkbox' | 'password'; // Specific input types
  options?: string[]; // For select dropdown
  className?: string;
  initialValue?: any; // Initial value for controlled components
};

type FormRendererProps = {
  elements: FormElement[];
  condition: (values: Record<string, any>) => Record<string, boolean>; // Controls visibility
};

const FormRenderer: React.FC<FormRendererProps> = ({ elements, condition }) => {
  const [values, setValues] = useState<Record<string, any>>(() =>
    elements.reduce((acc, el) => {
      acc[el.id] = el.initialValue || '';
      return acc;
    }, {} as Record<string, any>)
  );

  const [visibility, setVisibility] = useState<Record<string, boolean>>(() =>
    elements.reduce((acc, el) => {
      acc[el.id] = true; // Default all elements are visible
      return acc;
    }, {} as Record<string, boolean>)
  );

  const handleChange = (id: string, value: any) => {
    const updatedValues = { ...values, [id]: value };
    setValues(updatedValues);
    setVisibility(condition(updatedValues));
  };

  return (
    <form className="dynamic-form">
      {elements.map((element) => {
        if (!visibility[element.id]) return null;

        switch (element.type) {
          case 'input':
            return (
              <div key={element.id} className={element.className}>
                {element.label && <label htmlFor={element.id}>{element.label}</label>}
                <input
                  id={element.id}
                  type={element.inputType || 'text'}
                  placeholder={element.placeholder}
                  value={values[element.id]}
                  onChange={(e) => handleChange(element.id, e.target.value)}
                />
              </div>
            );

          case 'checkbox':
            return (
              <div key={element.id} className={element.className}>
                {element.label && <label htmlFor={element.id}>{element.label}</label>}
                <input
                  id={element.id}
                  type="checkbox"
                  checked={values[element.id]}
                  onChange={(e) => handleChange(element.id, e.target.checked)}
                />
              </div>
            );

          case 'button':
            return (
              <button
                key={element.id}
                type="button"
                className={element.className}
                disabled={!visibility[element.id]} // Disable button based on visibility state
                onClick={() => alert('Button clicked!')}
              >
                {element.label || 'Submit'}
              </button>
            );

          case 'div':
            return (
              <div key={element.id} className={element.className}>
                {element.label}
              </div>
            );

          default:
            return null;
        }
      })}
    </form>
  );
};

export default FormRenderer;
