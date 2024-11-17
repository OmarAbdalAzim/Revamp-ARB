'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form } from '@sitecore-jss/sitecore-jss-react-forms';
import { withRouter } from 'next/router';
import { sitecoreApiKey } from '../../temp/config';
import {
  UPDATE_FIELD,
  UPDATE_FORM,
  ACTION_CONTAINS,
  MATCH_TYPE_CONTAINS,
  OPERATOR_CONSTANTS,
} from './constants';
import FormRenderer from 'components/NextForm/FormRender';
import { condition, elements } from 'components/NextForm/types';

// Redux action (for updating form data)
const updateForm = (data: any) => ({ type: UPDATE_FORM, payload: data });
const getOperatorKey = (value: string): keyof typeof OPERATOR_CONSTANTS | null => {
  const foundKey = (Object.keys(OPERATOR_CONSTANTS) as Array<keyof typeof OPERATOR_CONSTANTS>).find(
    (key) => OPERATOR_CONSTANTS[key] === value
  );

  return foundKey || null;
};
// Validation Logic
const validate = (operator: string, value: any, valueAgainst: any) => {
  console.log('object--------------->', operator);
  console.log('object--------------->', value);
  console.log('object--------------->', valueAgainst);
  const operators: { [key: string]: () => boolean } = {
    [OPERATOR_CONSTANTS.CONTAINS]: () => new RegExp(`(${valueAgainst})`).test(value),
    [OPERATOR_CONSTANTS.DOES_NOT_CONTAIN]: () =>
      new RegExp(`^((?!${valueAgainst}).)*$`).test(value),
    [OPERATOR_CONSTANTS.STARTS_WITH]: () => new RegExp(`^(${valueAgainst})`).test(value),
    [OPERATOR_CONSTANTS.ENDS_WITH]: () => new RegExp(`(${valueAgainst})$`).test(value),
    [OPERATOR_CONSTANTS.IS_EQUAL_TO]: () =>
      value === (valueAgainst === 'true' ? true : valueAgainst),
    [OPERATOR_CONSTANTS.IS_NOT_EQUAL_TO]: () => value !== valueAgainst,
    // Add other operators as needed
  };
  console.log('==dsd=s=d=sd=sd==sd=s=s', operators[operator]);
  console.log('what is the operator', operator);
  const x = operators[operator] ? operators[operator] : false;
  console.log('xxxxxxxxxxxxxxxxxxxxxx,', x);
  return x;
};

const handleActionType = (actionType: string, value: boolean) => {
  console.log('handleAction', actionType);
  console.log('handleAction', value);

  const actions: { [key: string]: () => boolean } = {
    [ACTION_CONTAINS.SHOW]: () => value,
    [ACTION_CONTAINS.HIDE]: () => !value,
  };

  console.log('action key', actionType);

  const omarAction = Object.keys(ACTION_CONTAINS).find(
    (key) => ACTION_CONTAINS[key as keyof typeof ACTION_CONTAINS] === actionType
  );
  console.log('omarAction', omarAction);
  console.log('actions object', actions);

  const actionFunction = actions[actionType];
  console.log('return action function', actionFunction);

  const result = actionFunction();
  console.log('return value', result);

  return result;
};

// Matching Logic
const matchingTypes = (fieldValues: { [key: string]: any }, item: any) => {
  console.log('matching type before making matches', fieldValues);

  // Define the matches object with valid functions
  const matches: { [key: string]: (fieldValues: any, item: any) => boolean } = {
    [MATCH_TYPE_CONTAINS.ANY]: (fieldValues, item) => {
      console.log('-------------  berfore mathces --------------------');
      console.log(fieldValues, item);
      console.log('-------------');
      return item.conditions.some(({ fieldId, operatorId, value }: any) => {
        console.log('-----');
        console.log(fieldId, operatorId, value);
        console.log('-------------');
        return validate(operatorId, fieldValues[fieldId], value);
      });
    },
    [MATCH_TYPE_CONTAINS.ALL]: (fieldValues) => {
      return item.conditions.every(({ fieldId, operatorId, value }: any) => {
        console.log('-----=======');
        console.log(fieldId, operatorId);
        console.log('-----=======');
        validate(operatorId, fieldValues[fieldId], value);
      });
    },
  };
  console.log('item.matchTypeId', item.matchTypeId);
  console.log('matches Values', matches);
  // Check if item.matchTypeId exists in matches and is a function
  const x = '3E5C94DA-C1CD-4783-A91D-8D17A16C7117';
  // item.matchTypeId
  if (x in matches) {
    console.log('omar abdalazeem');
    console.log(x);
    // const result = matches[item.matchTypeId](fieldValues, item);
    const result = matches[x](fieldValues, item);
    console.log('........................', result);
    console.log('function for actions', handleActionType(item.actionTypeId, result));
    return handleActionType(item.actionTypeId, result);
  } else {
    console.error(`Unknown match type: ${item.matchTypeId}`);
    return false; // or any default behavior you'd like
  }
};

// Condition Checker
const checkConditions = (fieldValues: any, conditions: any) => {
  return conditions.some((condition: any) => matchingTypes(fieldValues, condition));
};

// Parsing Fields and Building Conditions
const buildConditions = (
  fields: any[],
  conditionFields: string[],
  conditions: any,
  fieldValues: any
) => {
  fields.forEach((item) => {
    console.log('inside buildConditions -/-//-//--/-/-//-');
    if (item.model.conditionSettings.fieldConditions) {
      item.model.conditionSettings.fieldConditions.forEach((fieldItem: any) => {
        fieldItem.conditions.forEach((conditionItem: any) => {
          if (!conditionFields.includes(conditionItem.fieldId)) {
            conditionFields.push(conditionItem.fieldId);
          }
        });
        fieldItem.actions.forEach((actionItem: any) => {
          if (!conditionFields.includes(actionItem.fieldId)) {
            conditionFields.push(actionItem.fieldId);
          }
          if (!conditions[actionItem.fieldId]) {
            conditions[actionItem.fieldId] = [];
          }
          conditions[actionItem.fieldId].push({
            matchTypeId: fieldItem.matchTypeId,
            conditions: fieldItem.conditions,
            actionTypeId: actionItem.actionTypeId,
          });
        });
      });
    }
    if (
      item.model.conditionSettings.fieldConditions &&
      item.model.conditionSettings.fieldConditions.length > 0
    ) {
      item.model.conditionSettings.fieldConditions.forEach(
        (conditionGroup: { conditions: any }) => {
          const conditions = conditionGroup.conditions;

          if (conditions && conditions.length > 0) {
            conditions.forEach((condition: { fieldId: any; operatorId: any; value: any }) => {
              const fieldId = condition.fieldId;
              const operatorId = condition.operatorId;
              const value = condition.value;
              const conditionValue = getOperatorKey(condition.operatorId);
              console.log('condition key matches the values ======= ', conditionValue);
              console.log(conditionValue, value);
              fieldValues[item.model.conditionSettings.fieldKey] = value;
              console.log('condition Key value -------', operatorId);
              console.log('Key for condition : -------', fieldValues[operatorId]);
              console.log('value for key condition -----------', value);
              console.log(`Condition Field ID: ${fieldId}`);
              console.log(`Operator ID: ${operatorId}`);
              console.log(`Value: ${value}`);

              // You can perform additional logic here if needed
            });
          }
        }
      );
    } else {
      console.log('No field conditions found.');
    }
    // fieldValues[item.model.conditionSettings.fieldKey] = item.model.value;
    // console.log(
    //   'buildCondition',
    //   (fieldValues[item.model.conditionSettings.fieldKey] = item.model.value)
    // );
    // console.log('fieldValues', [item.model.conditionSettings.fieldKey]);
    // console.log('----------------- item', item);
    // console.log('fieldValues for model item', item.model.conditionSettings.fieldConditions);
  });
};

const JssNextForm = ({ fields, router }: any) => {
  const dispatch = useDispatch();
  const [conditionFields, setConditionFields] = useState<string[]>([]);
  const [conditions, setConditions] = useState<any>({});
  const [fieldValues, setFieldValues] = useState<any>({});
  useEffect(() => {
    const newConditionFields: string[] = [];
    const newConditions: any = {};
    const newFieldValues: any = {};

    fields.fields.forEach((section: any) => {
      buildConditions(section.fields, newConditionFields, newConditions, newFieldValues);
    });

    setConditionFields(newConditionFields);
    setConditions(newConditions);
    setFieldValues(newFieldValues);

    dispatch(
      updateForm({
        conditionFields: newConditionFields,
        conditions: newConditions,
        fieldValues: newFieldValues,
      })
    );
  }, [fields, dispatch]);

  // Watcher for fieldValues changes to trigger actions
  // useEffect(() => {
  //   Object.keys(conditions).forEach((fieldId) => {
  //     const fieldConditions = conditions[fieldId];

  //     // Check if any conditions are met and trigger the actions
  //     fieldConditions.forEach((condition: any) => {
  //       console.log('condition retrive befote calling checking', condition);
  //       const result = checkConditions(fieldValues, condition);
  //       if (result) {
  //         // Trigger the action based on the result
  //         handleActionType(condition.actionTypeId, result);
  //       }
  //     });
  //   });
  // }, [fieldValues, conditions]);
  useEffect(() => {
    Object.keys(conditions).forEach((fieldId) => {
      const fieldConditions = conditions[fieldId];

      // Check if any conditions are met and trigger the actions
      const result = checkConditions(fieldValues, fieldConditions); // Pass fieldConditions array
      if (result) {
        // Trigger the action based on the result
        fieldConditions.forEach((condition: any) => {
          handleActionType(condition.actionTypeId, result);
        });
      }
    });
  }, [fieldValues, conditions]);
  console.log('props for field values', fields);
  return (
    // <Form
    //   form={fields}
    //   sitecoreApiHost={''}
    //   sitecoreApiKey={sitecoreApiKey}
    //   onRedirect={(url) => router.push(url)}
    // />
    <div>
      <h1>Dynamic Form Renderer</h1>
      <FormRenderer elements={elements} condition={condition} />
    </div>
  );
};

export default withRouter(JssNextForm);
