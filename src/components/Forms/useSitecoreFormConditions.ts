import { useEffect, useState, useRef } from 'react';

// Hook to handle Sitecore form field conditions and actions
const useSitecoreFormConditions = (fields: any, functionConditions: any[]) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isInitialProcessingDone, setIsInitialProcessingDone] = useState(false);

  // Add `data-src-field-key` attributes to fields
  const processAllFields = (fieldsArray: any[], parentElement: HTMLElement) => {
    fieldsArray.forEach((field) => {
      if (field?.buttonField?.id) {
        console.log('condition for btn', field);
        const fieldKey = field.model?.conditionSettings?.fieldKey;
        const elementId = field.buttonField.id;

        if (elementId && parentElement) {
          const element = parentElement.querySelector<HTMLElement>(`#${elementId}`);
          if (element) {
            console.log(
              `Setting data-src-field-key="${fieldKey}" for element with id="${elementId}"`
            );
            element.setAttribute('data-src-field-key', fieldKey || '');
          }
        }
      }
      if (field.valueField?.id) {
        const fieldKey = field.model?.conditionSettings?.fieldKey;
        const elementId = field.valueField.id;
        if (elementId) {
          const element = parentElement.querySelector<HTMLElement>(`#${elementId}`);
          if (element) {
            element.setAttribute('data-src-field-key', fieldKey);
          }
        }
      }
      if (field.fields && Array.isArray(field.fields)) {
        console.log('Shayaaan look', fields.fields);
        processAllFields(field.fields, parentElement);
      }
    });
  };

  // Apply conditions and actions
  const applyConditions = (formElement: HTMLElement) => {
    functionConditions.forEach((condition) => {
      console.log('condition-------------', condition);
      const ConditionItem = formElement.querySelector<HTMLInputElement>(`#${condition.key}`);
      const val = condition.actions[0]?.fieldId;
      console.log(val);
      const changingCondition = formElement.querySelector<HTMLButtonElement>(
        `[data-src-field-key="${val}"]`
      );
      console.log(ConditionItem, changingCondition);
      if (ConditionItem && changingCondition) {
        console.log('Arraaaaaaaaaaaaaaaaaay', condition.conditions[0].value);
        const handleCondition = () => {
          const x = condition.conditions[0].value;
          console.log('xxxxxxxxxxxxxxxxxx', x);
          if (
            condition.conditions[0].value !== true &&
            condition.conditions[0].value !== false &&
            condition.conditions[0].value !== 'true' &&
            condition.conditions[0].value !== 'false'
          ) {
            console.log('change will be in a text field', condition);
            const variable =
              condition.conditions[0].operator === 'IS_EQUAL_TO'
                ? ConditionItem.checked === true
                : ConditionItem.checked !== isConditionTrue;
            console.log('flagvalue', variable);
            const matcherValues = condition.conditions[0].value;
            console.log('textMatch', matcherValues);
            console.log('textMatch', ConditionItem);
            console.log('textMatch', changingCondition);
            console.log('hany', ConditionItem.value);
            // if (ConditionItem.value == matcherValues) {
            //   console.log('hany2');
            // }
            // Example usage
            if (ConditionItem.value == matcherValues) {
              // Perform your logic when the variable is true
              console.log('Condition met, perform the action:', condition.actions[0].actionType);
              console.log(condition.actions[0]);
              const actionType = condition.actions[0]?.actionType;
              // const actionType = "DISABLE";
              console.log('-----/////////', actionType);
              switch (actionType) {
                case 'HIDE':
                  changingCondition.style.display = 'none';
                  break;
                case 'SHOW':
                  changingCondition.style.display = '';
                  break;
                case 'DISABLE':
                  changingCondition.setAttribute('disabled', 'true');
                  break;
                case 'ENABLE':
                  changingCondition.removeAttribute('disabled');
                  break;
                default:
                  console.warn(`Unknown actionType: ${actionType}`);
              }
            } else {
              changingCondition.style.display = '';
              changingCondition.removeAttribute('disabled');
            }
          } else {
            const isConditionTrue = Boolean(condition.conditions[0].value);
            console.log('first checker for checkbox initial code render', isConditionTrue);
            console.log(condition);
            const variable =
              condition.conditions[0].operator === 'IS_EQUAL_TO'
                ? ConditionItem.checked === true
                : ConditionItem.checked !== isConditionTrue;
            console.log('flagvalue', variable);
            // Example usage
            if (variable && condition.actions[0]?.actionType) {
              // Perform your logic when the variable is true
              console.log('Condition met, perform the action:', condition.actions[0].actionType);
              console.log(condition.actions[0]);
              const actionType = condition.actions[0]?.actionType;
              // const actionType = "DISABLE";
              console.log('-----/////////', actionType);
              switch (actionType) {
                case 'HIDE':
                  changingCondition.style.display = 'none';
                  break;
                case 'SHOW':
                  changingCondition.style.display = '';
                  break;
                case 'DISABLE':
                  changingCondition.setAttribute('disabled', 'true');
                  break;
                case 'ENABLE':
                  changingCondition.removeAttribute('disabled');
                  break;
                default:
                  console.warn(`Unknown actionType: ${actionType}`);
              }
            } else {
              changingCondition.style.display = '';
              changingCondition.removeAttribute('disabled');
            }
          }
        };

        if (ConditionItem.type === 'text') {
          ConditionItem.addEventListener('input', handleCondition);
        } else {
          ConditionItem.addEventListener('change', handleCondition);
        }
      }
    });
  };

  useEffect(() => {
    if (wrapperRef.current) {
      const formElement = wrapperRef.current.querySelector('form');
      if (formElement) {
        processAllFields(fields.fields, formElement);
      }
    }
    setIsInitialProcessingDone(true);
  }, []);

  useEffect(() => {
    if (isInitialProcessingDone && wrapperRef.current) {
      const formElement = wrapperRef.current.querySelector('form');
      if (formElement) {
        applyConditions(formElement);
      }
    }
  }, [isInitialProcessingDone]);

  return { wrapperRef };
};

export default useSitecoreFormConditions;
