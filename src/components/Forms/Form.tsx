// // 'use client';

// // import React, { useEffect, useState } from 'react';
// // import { useDispatch } from 'react-redux';
// // import { Form } from '@sitecore-jss/sitecore-jss-react-forms';
// // import { withRouter } from 'next/router';
// // import { sitecoreApiKey } from '../../temp/config';
// // import {
// //   UPDATE_FIELD,
// //   UPDATE_FORM,
// //   ACTION_CONTAINS,
// //   MATCH_TYPE_CONTAINS,
// //   OPERATOR_CONSTANTS,
// // } from './constants';
// // import FormRenderer from 'components/NextForm/FormRender';
// // import { condition, elements } from 'components/NextForm/types';

// // // Redux action (for updating form data)
// // const updateForm = (data: any) => ({ type: UPDATE_FORM, payload: data });
// // const getOperatorKey = (value: string): keyof typeof OPERATOR_CONSTANTS | null => {
// //   const foundKey = (Object.keys(OPERATOR_CONSTANTS) as Array<keyof typeof OPERATOR_CONSTANTS>).find(
// //     (key) => OPERATOR_CONSTANTS[key] === value
// //   );

// //   return foundKey || null;
// // };
// // // Validation Logic
// // const validate = (operator: string, value: any, valueAgainst: any) => {
// //   console.log('object--------------->', operator);
// //   console.log('object--------------->', value);
// //   console.log('object--------------->', valueAgainst);
// //   const operators: { [key: string]: () => boolean } = {
// //     [OPERATOR_CONSTANTS.CONTAINS]: () => new RegExp(`(${valueAgainst})`).test(value),
// //     [OPERATOR_CONSTANTS.DOES_NOT_CONTAIN]: () =>
// //       new RegExp(`^((?!${valueAgainst}).)*$`).test(value),
// //     [OPERATOR_CONSTANTS.STARTS_WITH]: () => new RegExp(`^(${valueAgainst})`).test(value),
// //     [OPERATOR_CONSTANTS.ENDS_WITH]: () => new RegExp(`(${valueAgainst})$`).test(value),
// //     [OPERATOR_CONSTANTS.IS_EQUAL_TO]: () =>
// //       value === (valueAgainst === 'true' ? true : valueAgainst),
// //     [OPERATOR_CONSTANTS.IS_NOT_EQUAL_TO]: () => value !== valueAgainst,
// //     // Add other operators as needed
// //   };
// //   console.log('==dsd=s=d=sd=sd==sd=s=s', operators[operator]);
// //   console.log('what is the operator', operator);
// //   const x = operators[operator] ? operators[operator] : false;
// //   console.log('xxxxxxxxxxxxxxxxxxxxxx,', x);
// //   return x;
// // };

// // const handleActionType = (actionType: string, value: boolean) => {
// //   console.log('handleAction', actionType);
// //   console.log('handleAction', value);

// //   const actions: { [key: string]: () => boolean } = {
// //     [ACTION_CONTAINS.SHOW]: () => value,
// //     [ACTION_CONTAINS.HIDE]: () => !value,
// //   };

// //   console.log('action key', actionType);

// //   const omarAction = Object.keys(ACTION_CONTAINS).find(
// //     (key) => ACTION_CONTAINS[key as keyof typeof ACTION_CONTAINS] === actionType
// //   );
// //   console.log('omarAction', omarAction);
// //   console.log('actions object', actions);

// //   const actionFunction = actions[actionType];
// //   console.log('return action function', actionFunction);

// //   const result = actionFunction();
// //   console.log('return value', result);

// //   return result;
// // };

// // // Matching Logic
// // const matchingTypes = (fieldValues: { [key: string]: any }, item: any) => {
// //   console.log('matching type before making matches', fieldValues);

// //   // Define the matches object with valid functions
// //   const matches: { [key: string]: (fieldValues: any, item: any) => boolean } = {
// //     [MATCH_TYPE_CONTAINS.ANY]: (fieldValues, item) => {
// //       console.log('-------------  berfore mathces --------------------');
// //       console.log(fieldValues, item);
// //       console.log('-------------');
// //       return item.conditions.some(({ fieldId, operatorId, value }: any) => {
// //         console.log('-----');
// //         console.log(fieldId, operatorId, value);
// //         console.log('-------------');
// //         return validate(operatorId, fieldValues[fieldId], value);
// //       });
// //     },
// //     [MATCH_TYPE_CONTAINS.ALL]: (fieldValues) => {
// //       return item.conditions.every(({ fieldId, operatorId, value }: any) => {
// //         console.log('-----=======');
// //         console.log(fieldId, operatorId);
// //         console.log('-----=======');
// //         validate(operatorId, fieldValues[fieldId], value);
// //       });
// //     },
// //   };
// //   console.log('item.matchTypeId', item.matchTypeId);
// //   console.log('matches Values', matches);
// //   // Check if item.matchTypeId exists in matches and is a function
// //   const x = '3E5C94DA-C1CD-4783-A91D-8D17A16C7117';
// //   // item.matchTypeId
// //   if (x in matches) {
// //     console.log('omar abdalazeem');
// //     console.log(x);
// //     // const result = matches[item.matchTypeId](fieldValues, item);
// //     const result = matches[x](fieldValues, item);
// //     console.log('........................', result);
// //     console.log('function for actions', handleActionType(item.actionTypeId, result));
// //     return handleActionType(item.actionTypeId, result);
// //   } else {
// //     console.error(`Unknown match type: ${item.matchTypeId}`);
// //     return false; // or any default behavior you'd like
// //   }
// // };

// // // Condition Checker
// // const checkConditions = (fieldValues: any, conditions: any) => {
// //   return conditions.some((condition: any) => matchingTypes(fieldValues, condition));
// // };

// // // Parsing Fields and Building Conditions
// // const buildConditions = (
// //   fields: any[],
// //   conditionFields: string[],
// //   conditions: any,
// //   fieldValues: any
// // ) => {
// //   fields.forEach((item) => {
// //     console.log('inside buildConditions -/-//-//--/-/-//-');
// //     if (item.model.conditionSettings.fieldConditions) {
// //       item.model.conditionSettings.fieldConditions.forEach((fieldItem: any) => {
// //         fieldItem.conditions.forEach((conditionItem: any) => {
// //           if (!conditionFields.includes(conditionItem.fieldId)) {
// //             conditionFields.push(conditionItem.fieldId);
// //           }
// //         });
// //         fieldItem.actions.forEach((actionItem: any) => {
// //           if (!conditionFields.includes(actionItem.fieldId)) {
// //             conditionFields.push(actionItem.fieldId);
// //           }
// //           if (!conditions[actionItem.fieldId]) {
// //             conditions[actionItem.fieldId] = [];
// //           }
// //           conditions[actionItem.fieldId].push({
// //             matchTypeId: fieldItem.matchTypeId,
// //             conditions: fieldItem.conditions,
// //             actionTypeId: actionItem.actionTypeId,
// //           });
// //         });
// //       });
// //     }
// //     if (
// //       item.model.conditionSettings.fieldConditions &&
// //       item.model.conditionSettings.fieldConditions.length > 0
// //     ) {
// //       item.model.conditionSettings.fieldConditions.forEach(
// //         (conditionGroup: { conditions: any }) => {
// //           const conditions = conditionGroup.conditions;

// //           if (conditions && conditions.length > 0) {
// //             conditions.forEach((condition: { fieldId: any; operatorId: any; value: any }) => {
// //               const fieldId = condition.fieldId;
// //               const operatorId = condition.operatorId;
// //               const value = condition.value;
// //               const conditionValue = getOperatorKey(condition.operatorId);
// //               console.log('condition key matches the values ======= ', conditionValue);
// //               console.log(conditionValue, value);
// //               fieldValues[item.model.conditionSettings.fieldKey] = value;
// //               console.log('condition Key value -------', operatorId);
// //               console.log('Key for condition : -------', fieldValues[operatorId]);
// //               console.log('value for key condition -----------', value);
// //               console.log(`Condition Field ID: ${fieldId}`);
// //               console.log(`Operator ID: ${operatorId}`);
// //               console.log(`Value: ${value}`);

// //               // You can perform additional logic here if needed
// //             });
// //           }
// //         }
// //       );
// //     } else {
// //       console.log('No field conditions found.');
// //     }
// //     // fieldValues[item.model.conditionSettings.fieldKey] = item.model.value;
// //     // console.log(
// //     //   'buildCondition',
// //     //   (fieldValues[item.model.conditionSettings.fieldKey] = item.model.value)
// //     // );
// //     // console.log('fieldValues', [item.model.conditionSettings.fieldKey]);
// //     // console.log('----------------- item', item);
// //     // console.log('fieldValues for model item', item.model.conditionSettings.fieldConditions);
// //   });
// // };

// // const JssNextForm = ({ fields, router }: any) => {
// //   const dispatch = useDispatch();
// //   const [conditionFields, setConditionFields] = useState<string[]>([]);
// //   const [conditions, setConditions] = useState<any>({});
// //   const [fieldValues, setFieldValues] = useState<any>({});
// //   useEffect(() => {
// //     const newConditionFields: string[] = [];
// //     const newConditions: any = {};
// //     const newFieldValues: any = {};

// //     fields.fields.forEach((section: any) => {
// //       buildConditions(section.fields, newConditionFields, newConditions, newFieldValues);
// //     });

// //     setConditionFields(newConditionFields);
// //     setConditions(newConditions);
// //     setFieldValues(newFieldValues);

// //     dispatch(
// //       updateForm({
// //         conditionFields: newConditionFields,
// //         conditions: newConditions,
// //         fieldValues: newFieldValues,
// //       })
// //     );
// //   }, [fields, dispatch]);

// //   // Watcher for fieldValues changes to trigger actions
// //   // useEffect(() => {
// //   //   Object.keys(conditions).forEach((fieldId) => {
// //   //     const fieldConditions = conditions[fieldId];

// //   //     // Check if any conditions are met and trigger the actions
// //   //     fieldConditions.forEach((condition: any) => {
// //   //       console.log('condition retrive befote calling checking', condition);
// //   //       const result = checkConditions(fieldValues, condition);
// //   //       if (result) {
// //   //         // Trigger the action based on the result
// //   //         handleActionType(condition.actionTypeId, result);
// //   //       }
// //   //     });
// //   //   });
// //   // }, [fieldValues, conditions]);
// //   useEffect(() => {
// //     Object.keys(conditions).forEach((fieldId) => {
// //       const fieldConditions = conditions[fieldId];

// //       // Check if any conditions are met and trigger the actions
// //       const result = checkConditions(fieldValues, fieldConditions); // Pass fieldConditions array
// //       if (result) {
// //         // Trigger the action based on the result
// //         fieldConditions.forEach((condition: any) => {
// //           handleActionType(condition.actionTypeId, result);
// //         });
// //       }
// //     });
// //   }, [fieldValues, conditions]);
// //   console.log('props for field values', fields);
// //   return (
// //     // <Form
// //     //   form={fields}
// //     //   sitecoreApiHost={''}
// //     //   sitecoreApiKey={sitecoreApiKey}
// //     //   onRedirect={(url) => router.push(url)}
// //     // />
// //     <div>
// //       <h1>Dynamic Form Renderer</h1>
// //       <FormRenderer elements={elements} condition={condition} />
// //     </div>
// //   );
// // };

// // export default withRouter(JssNextForm);
// /* eslint-disable @typescript-eslint/no-explicit-any */
// // import React, { useEffect, useRef } from 'react';
// // import { Form } from '@sitecore-jss/sitecore-jss-react-forms';
// // import { useRouter } from 'next/router';
// // import { sitecoreApiKey } from '../../temp/config';
// // import { logObjects, mapConditions, mapConditionsAndActions } from './mappingFunction';

// // const JssNextForm = ({ fields }: { fields: any }) => {
// // console.log(fields);
// // const response = mapConditions(fields);
// // console.log('fist mapping', response);
// // const function_conditions = mapConditionsAndActions(response);
// // console.log('Actions: ' + function_conditions);
// // const x = logObjects(function_conditions);
// // console.log(x);
// // const router = useRouter();
// // const wrapperRef = useRef<HTMLDivElement | null>(null);

// // useEffect(() => {
// //   if (wrapperRef.current) {
// //     // Query the actual form inside the wrapper
// //     const formElement = wrapperRef.current.querySelector('form');
// //     if (formElement) {
// //       // Get the checkbox element by its ID
// //       console.log('first item key0', function_conditions[0].key);
// //       const checkbox = formElement.querySelector<HTMLInputElement>(
// //         '#' + function_conditions[0].key
// //       );
// //       // Get the second fieldset
// //       // const secondFieldset = formElement.querySelectorAll('fieldset')[1];
// //       console.log('first item key1', function_conditions[0].key);
// //       const secondFieldset = formElement.querySelector<HTMLInputElement>(
// //         '#' +
// //           'fxb_742265fe-6164-45bb-8b21-20483f7b7676_Fields_a5886c13-091f-4d7f-ae5a-7fb81ab33a23__Value'
// //       );

// //       if (checkbox && secondFieldset) {
// //         // Add an event listener to the checkbox to toggle the fieldset visibility
// //         checkbox.addEventListener('change', () => {
// //           if (checkbox.checked) {
// //             (secondFieldset as HTMLElement).style.display = 'none';
// //           } else {
// //             (secondFieldset as HTMLElement).style.display = '';
// //           }
// //         });

// //         // Initial check for the checkbox value
// //         if (checkbox.checked) {
// //           (secondFieldset as HTMLElement).style.display = 'none';
// //         }
// //       }
// //     }
// //   }
// // }, []);
// //   console.log('props Values ' + fields);
// //   return (
// //     <div ref={wrapperRef}>
// //       <Form
// //         form={fields}
// //         sitecoreApiHost={''}
// //         sitecoreApiKey={sitecoreApiKey}
// //         onRedirect={(url) => router.push(url)}
// //       />
// //     </div>
// //   );
// // };

// // export default JssNextForm;
// import React, { useEffect, useRef } from 'react';
// import { Form } from '@sitecore-jss/sitecore-jss-react-forms';
// import { useRouter } from 'next/router';
// import { sitecoreApiKey } from '../../temp/config';
// import { logObjects, mapConditions, mapConditionsAndActions } from './mappingFunction';

// interface Field {
//   indexField?: {
//     name: string;
//     id: string;
//     value: string | null;
//   };
//   fieldIdField?: {
//     name: string;
//     id: string;
//     value: string | null;
//   };
//   valueField?: {
//     name: string;
//     id: string;
//     value: string | null;
//   };
//   model: {
//     minLength?: number;
//     maxLength?: number;
//     placeholderText?: string;
//     value?: string | boolean | null;
//     validationDataModels?: any[];
//     valueProviderSettings?: {
//       valueProviderItemId: string;
//       parameters: string;
//     };
//     isTrackingEnabled?: boolean;
//     required?: boolean;
//     allowSave?: boolean;
//     title?: string;
//     labelCssClass?: string;
//     labelCssClassSettings?: {
//       manualCssClasses: string;
//       cssClassOptions: any[];
//       cssClass: string;
//     };
//     conditionSettings?: {
//       fieldKey?: string;
//       fieldConditions?: any[];
//     };
//     cssClassSettings?: {
//       manualCssClasses: string;
//       cssClassOptions: any[];
//       cssClass: string;
//     };
//     cssClass?: string;
//     itemId: string;
//     name?: string;
//     templateId?: string;
//     fieldTypeItemId?: string;
//     htmlAttributes?: Record<string, string>;
//   };
//   fields?: Field[];
// }

// interface FormProps {
//   fields: {
//     fields: Field[];
//     [key: string]: any;
//   };
// }

// const JssNextForm = ({ fields }: any) => {
//   console.log(fields);
//   const response = mapConditions(fields);
//   console.log('fist mapping', response);
//   const function_conditions = mapConditionsAndActions(response);
//   console.log('Actions: ' + function_conditions);
//   const x = logObjects(function_conditions);
//   console.log(x);

//   const router = useRouter();
//   const wrapperRef = useRef<HTMLDivElement | null>(null);
//   console.log(fields);
//   // Recursive function to add `data-src-field-key` attributes
// const addFieldKeyAttributes = (fieldsArray: any[], parentElement?: HTMLElement) => {
//   // Loop through the fields array
//   fieldsArray.forEach((field) => {
//     // Process the current field if it has a `valueField` with an `id`
//     console.log('each field ----------adadsad-field --------', field);
//     if (field?.buttonField?.id) {
//       console.log('condition for btn', field);
//       const fieldKey = field.model?.conditionSettings?.fieldKey;
//       const elementId = field.buttonField.id;

//       if (elementId && parentElement) {
//         const element = parentElement.querySelector<HTMLElement>(`#${elementId}`);
//         if (element) {
//           console.log(
//             `Setting data-src-field-key="${fieldKey}" for element with id="${elementId}"`
//           );
//           element.setAttribute('data-src-field-key', fieldKey || '');
//         }
//       }
//     }
//     if (field.valueField?.id) {
//       const fieldKey = field.model?.conditionSettings?.fieldKey;
//       const elementId = field.valueField.id;

//       if (elementId && parentElement) {
//         const element = parentElement.querySelector<HTMLElement>(`#${elementId}`);
//         if (element) {
//           console.log(
//             `Setting data-src-field-key="${fieldKey}" for element with id="${elementId}"`
//           );
//           element.setAttribute('data-src-field-key', fieldKey || '');
//         }
//       }
//     }

//     // Check if this field contains a `fields` property and process its items recursively
//     if (field.fields && Array.isArray(field.fields)) {
//       addFieldKeyAttributes(field.fields, parentElement);
//     }
//   });
// };

//   // Main processing function to handle the top-level fields array
//   const processAllFields = (response: any, parentElement?: HTMLElement) => {
//     if (response.fields && Array.isArray(response.fields)) {
//       response.fields.forEach((fieldGroup: any) => {
//         if (fieldGroup.fields && Array.isArray(fieldGroup.fields)) {
//           console.log('field group ', fieldGroup);
//           addFieldKeyAttributes(fieldGroup.fields, parentElement);
//         }
//       });
//     }
//   };

//   // useEffect(() => {
//   //   if (wrapperRef.current) {
//   //     // Query the actual form inside the wrapper
//   //     const formElement = wrapperRef.current.querySelector('form');
//   //     if (formElement) {
//   //       // Get the checkbox element by its ID
//   //       console.log('first item key0', function_conditions[0].key);
//   //       const ConditionItem = formElement.querySelector<HTMLInputElement>(
//   //         '#' + function_conditions[0].key
//   //       );
//   //       // Get the second fieldset
//   //       // const secondFieldset = formElement.querySelectorAll('fieldset')[1];
//   //       console.log('first item key1', function_conditions[0].key);
//   // const changingCondition = formElement.querySelector<HTMLInputElement>(
//   //   '#' +
//   //     'fxb_742265fe-6164-45bb-8b21-20483f7b7676_Fields_a5886c13-091f-4d7f-ae5a-7fb81ab33a23__Value'
//   // );

//   //       if (ConditionItem && changingCondition) {
//   //         // Add an event listener to the checkbox to toggle the fieldset visibility
//   //         ConditionItem.addEventListener('change', () => {
//   //           console.log('array-------------->', function_conditions);
//   //           if (ConditionItem.checked) {
//   //             (changingCondition as HTMLElement).style.display = 'none';
//   //           } else {
//   //             (changingCondition as HTMLElement).style.display = '';
//   //           }
//   //         });

//   //         // Initial check for the checkbox value
//   //         if (ConditionItem.checked) {
//   //           (changingCondition as HTMLElement).style.display = 'none';
//   //         }
//   //       }
//   //     }
//   //   }
//   // }, []);
// //   useEffect(() => {
// //     if (wrapperRef.current) {
// //       // Query the actual form inside the wrapper
// //       const formElement = wrapperRef.current.querySelector('form');
// //       if (formElement) {
// //         // Loop through each condition in function_conditions
// //         function_conditions.forEach((condition) => {
// //           // Get the checkbox element by its ID
// //           const ConditionItem = formElement.querySelector<HTMLInputElement>(`#${condition.key}`);
// //           console.log('condition Item111111111111111', ConditionItem);
// //           console.log('condition Item111111111111111', condition);
// //           // Get the field to be toggled based on action fieldId
// //           // const changingCondition = formElement.querySelector<HTMLInputElement>(
// //           //   '#' +
// //           //     'fxb_742265fe-6164-45bb-8b21-20483f7b7676_Fields_a5886c13-091f-4d7f-ae5a-7fb81ab33a23__Value'
// //           // );
// //           const val = condition.actions[0].fieldId; // Replace this with your dynamic value source
// //           const changingCondition = formElement.querySelector<HTMLButtonElement>(
// //             `[data-src-field-key="${val}"]`
// //           );
// //           // const changingCondition = formElement.querySelector<HTMLButtonElement>(
// //           //   `"data-src-field-key="6508EA1EC10E4012B33EEB58245EA6B2"`
// //           // );
// //           console.log('changing condition-------------', changingCondition);
// //           console.log('object');
// //           console.log(ConditionItem);
// //           console.log('object');
// //           if (ConditionItem && changingCondition) {
// //             // Define a function to handle actions based on the condition
// //             const handleCondition = () => {
// //               console.log('Processing condition------->>:', condition);

// //               // Check if the checkbox is checked and an actionType exists
// //               if (ConditionItem.checked && condition.actions[0]?.actionType) {
// //                 // const actionType = condition.actions[0].actionType;
// //                 const actionType = 'HIDE';
// //                 console.log('omar', actionType);
// //                 // const actionType = 'DISABLE';
// //                 console.log('actionType', actionType);
// //                 // Handle action types dynamically
// //                 switch (actionType) {
// //                   case 'HIDE':
// //                     (changingCondition as HTMLElement).style.display = 'none';
// //                     break;
// //                   case 'SHOW':
// //                     (changingCondition as HTMLElement).style.display = ''; // Default to showing the element
// //                     break;
// //                   case 'DISABLE':
// //                     (changingCondition as HTMLElement).setAttribute('disabled', 'true');
// //                     break;
// //                   case 'ENABLE':
// //                     (changingCondition as HTMLElement).removeAttribute('disabled');
// //                     break;
// //                   default:
// //                     console.warn(`Unknown actionType: ${actionType}`);
// //                 }
// //               } else {
// //                 // Reset the element's state if no specific action applies
// //                 (changingCondition as HTMLElement).style.display = '';
// //                 (changingCondition as HTMLElement).removeAttribute('disabled');
// //               }
// //             };

// //             // Add an event listener to handle changes
// //             ConditionItem.addEventListener('change', handleCondition);

// //             // Perform the initial check for the checkbox value
// //             handleCondition();
// //           }
// //         });
// //       }
// //     }
// //   }, []);

// //   useEffect(() => {
// //     if (wrapperRef.current) {
// //       const formElement = wrapperRef.current.querySelector('form');
// //       if (formElement) {
// //         // Apply `data-src-field-key` attributes to all fields
// //         processAllFields(fields, formElement);
// //       }
// //     }
// //   }, [fields]);

// //   return (
// //     <div ref={wrapperRef}>
// //       <Form
// //         form={fields}
// //         sitecoreApiHost={''}
// //         sitecoreApiKey={sitecoreApiKey}
// //         onRedirect={(url) => router.push(url)}
// //       />
// //     </div>
// //   );
// // };

// // export default JssNextForm;
// import React, { useEffect, useRef, useState } from 'react';
// import { Form } from '@sitecore-jss/sitecore-jss-react-forms';
// import { useRouter } from 'next/router';
// import { sitecoreApiKey } from '../../temp/config';
// import { mapConditions, mapConditionsAndActions } from './mappingFunction';

// const JssNextForm = ({ fields }: any) => {
//   const [isInitialProcessingDone, setIsInitialProcessingDone] = useState(false);
//   const router = useRouter();
//   const wrapperRef = useRef<HTMLDivElement | null>(null);

//   // Map conditions and actions
//   const response = mapConditions(fields);
//   const function_conditions = mapConditionsAndActions(response);

//   useEffect(() => {
//     if (wrapperRef.current) {
//       const formElement = wrapperRef.current.querySelector('form');
//       if (formElement) {
//         const processAllFields = (fieldsArray: any[], parentElement: HTMLElement) => {
//           fieldsArray.forEach((field) => {
//             if (field.valueField?.id) {
//               const fieldKey = field.model?.conditionSettings?.fieldKey;
//               const elementId = field.valueField.id;
//               if (elementId) {
//                 const element = parentElement.querySelector<HTMLElement>(`#${elementId}`);
//                 if (element) {
//                   element.setAttribute('data-src-field-key', fieldKey || '');
//                 }
//               }
//             }
//             if (field.fields && Array.isArray(field.fields)) {
//               processAllFields(field.fields, parentElement);
//             }
//           });
//         };

//         processAllFields(fields.fields, formElement);
//       }
//     }
//     setIsInitialProcessingDone(true);
//   }, [fields]);

//   useEffect(() => {
//     if (isInitialProcessingDone && wrapperRef.current) {
//       const formElement = wrapperRef.current.querySelector('form');
//       if (formElement) {
//         function_conditions.forEach((condition) => {
//           const ConditionItem = formElement.querySelector<HTMLInputElement>(`#${condition.key}`);
//           const val = condition.actions[0].fieldId;
//           const changingCondition = formElement.querySelector<HTMLButtonElement>(
//             `[data-src-field-key="${val}"]`
//           );
//           console.log(changingCondition);
//           if (ConditionItem && changingCondition) {
//             const handleCondition = () => {
//               console.log('condition name and value', condition.conditions[0].operator);
//               console.log(condition.conditions[0].value);
//               // const conditionValues = condition.conditions[0].value;
//               // Handle action types dynamically
//               const isConditionTrue = Boolean(condition.conditions[0].value);
//               if (ConditionItem.checked == isConditionTrue && condition.actions[0]?.actionType) {
//                 // const actionType = condition.actions[0].actionType;
//                 const actionType = 'HIDE';

//                 switch (actionType) {
//                   case 'HIDE':
//                     changingCondition.style.display = 'none';
//                     break;
//                   case 'SHOW':
//                     changingCondition.style.display = '';
//                     break;
//                   case 'DISABLE':
//                     changingCondition.setAttribute('disabled', 'true');
//                     break;
//                   case 'ENABLE':
//                     changingCondition.removeAttribute('disabled');
//                     break;
//                   default:
//                     console.warn(`Unknown actionType: ${actionType}`);
//                 }
//               } else {
//                 changingCondition.style.display = '';
//                 changingCondition.removeAttribute('disabled');
//               }
//             };

//             ConditionItem.addEventListener('change', handleCondition);
//             handleCondition();
//           }
//         });
//       }
//     }
//   }, [isInitialProcessingDone]);

//   return (
//     <div ref={wrapperRef}>
//       <Form
//         form={fields}
//         sitecoreApiHost={''}
//         sitecoreApiKey={sitecoreApiKey}
//         onRedirect={(url) => router.push(url)}
//       />
//     </div>
//   );
// };

// export default JssNextForm;
import React from 'react';
import { Form } from '@sitecore-jss/sitecore-jss-react-forms';
import { useRouter } from 'next/router';
import { sitecoreApiKey } from '../../temp/config';
import useSitecoreFormConditions from './useSitecoreFormConditions';
import { mapConditions, mapConditionsAndActions } from './mappingFunction';

const JssNextForm = ({ fields }: any) => {
  const router = useRouter();
  console.log(fields);
  // Map conditions and actions
  const response = mapConditions(fields);
  const functionConditions = mapConditionsAndActions(response);

  // Use the custom hook for condition handling
  const { wrapperRef } = useSitecoreFormConditions(fields, functionConditions);

  return (
    <div ref={wrapperRef}>
      <Form
        form={fields}
        sitecoreApiHost={''}
        sitecoreApiKey={sitecoreApiKey}
        onRedirect={(url) => router.push(url)}
      />
    </div>
  );
};

export default JssNextForm;
