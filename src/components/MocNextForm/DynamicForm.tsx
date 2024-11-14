// components/DynamicForm.tsx
import { useState, useEffect, ChangeEvent } from 'react';
import { FormField, Condition, FormApiResponse } from '../../types/types';

const DynamicForm: React.FC = () => {
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [formConditions, setFormConditions] = useState<Condition[]>([]);
  const [formData, setFormData] = useState<Record<string, string>>({});

  // Fetch form structure and conditions
  useEffect(() => {
    async function fetchFormData() {
      const response = await fetch('/api/form-conditions');
      const data: FormApiResponse = await response.json();
      setFormFields(data.fields);
      setFormConditions(data.conditions);
    }
    fetchFormData();
  }, []);

  // Update formData when an input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Determine if a field should be visible based on conditions
  const isFieldVisible = (fieldId: string): boolean => {
    const condition = formConditions.find((cond) => cond.fieldId === fieldId);
    if (!condition) return true; // No condition means the field is always visible

    const { field, value } = condition.showIf;
    return formData[field] === value;
  };

  return (
    <form>
      {formFields.map((field) => {
        if (!isFieldVisible(field.id)) return null; // Hide the field if conditions are not met

        return (
          <div key={field.id} className="form-group">
            <label htmlFor={field.id}>{field.label}</label>
            {field.type === 'select' ? (
              <select
                id={field.id}
                name={field.id}
                onChange={handleChange}
                value={formData[field.id] || ''}
              >
                <option value="">Select...</option>
                {field.options?.map((option: any) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                id={field.id}
                name={field.id}
                onChange={handleChange}
                value={formData[field.id] || ''}
              />
            )}
          </div>
        );
      })}
    </form>
  );
};

export default DynamicForm;
