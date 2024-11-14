import React, { useEffect, useState } from 'react';
import { useFieldConditions } from './useFieldConditions';
import { ACTION_CONSTANTS, data, OPERATOR_CONSTANTS } from './Model';

const ContactForm: React.FC = () => {
  const { conditionsState, actionsState, setActionsState } = useFieldConditions(
    data.fields,
    OPERATOR_CONSTANTS,
    ACTION_CONSTANTS
  );
  const [flag, setFlag] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    termsAccepted: flag,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    console.log('-----', checked);
    if (checked === true && conditionsState['IS_EQUAL_TO'] === 'true') {
      setFlag(true);
    } else {
      setFlag(false);
    }
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  console.log('*----', conditionsState);
  useEffect(() => {
    console.log('Conditions State:', conditionsState);
    console.log('Actions State:', actionsState);
  }, [conditionsState, actionsState]);

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '400px',
        margin: 'auto',
        padding: '1rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
      }}
    >
      <div style={{ marginBottom: '1rem' }}>
        <label
          htmlFor="name"
          style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}
        >
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          style={{
            width: '100%',
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
          required
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label
          htmlFor="phone"
          style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}
        >
          Phone:
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          style={{
            width: '100%',
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
          required
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleCheckboxChange}
            style={{ marginRight: '0.5rem' }}
          />
          Accept Terms & Conditions
        </label>
      </div>

      {!flag ? (
        <>
          <div
            style={{
              marginBottom: '1rem',
              padding: '0.75rem',
              backgroundColor: '#f9f9f9',
              borderRadius: '4px',
              border: '1px solid #ddd',
            }}
          >
            <p style={{ margin: 0 }}>Please ensure all information is correct before submitting.</p>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#0070f3',
              color: '#fff',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#005bb5')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#0070f3')}
          >
            Submit
          </button>
        </>
      ) : null}
    </form>
  );
};

export default ContactForm;
