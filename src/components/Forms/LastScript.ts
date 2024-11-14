const handleActionType = (actionType, value) => {
  const actions = {
    [ACTION_CONSTANTS['SHOW']]: () => {
      return !value;
    },
    [ACTION_CONSTANTS['HIDE']]: () => {
      return value;
    },
  };

  return actions[actionType]();
};
export const matchingTypes = (fieldValues: any, conditionGroup: any) => {
  const matches = {
    [MATCH_TYPE_CONTAINS['ANY']]: (fieldValues: any, conditions: any[]) => {
      let shouldHide = false;
      for (const condition of conditions) {
        const { fieldId, operatorId, value } = condition;
        shouldHide = validate(operatorId, fieldValues[fieldId], value);
        if (shouldHide) break;
      }
      return shouldHide;
    },
    [MATCH_TYPE_CONTAINS['ALL']]: (fieldValues: any, conditions: any[]) => {
      let shouldHide = true;
      for (const condition of conditions) {
        const { fieldId, operatorId, value } = condition;
        shouldHide = validate(operatorId, fieldValues[fieldId], value);
        if (!shouldHide) break;
      }
      return shouldHide;
    },
  };

  const result = matches[conditionGroup.matchTypeId](fieldValues, conditionGroup.conditions);
  return handleActionType(conditionGroup.actions[0].actionTypeId, result);
};
const validate = (operator, value, valueAgainst) => {
  const operators = {
    [OPERATOR_CONSTANTS['CONTAINS']]: () => {
      const regex = RegExp(`${valueAgainst}`);
      return regex.test(value);
    },
    [OPERATOR_CONSTANTS['DOES_NOT_CONTAIN']]: () => {
      const regex = RegExp(`^(?!.*${valueAgainst}).*$`);
      return regex.test(value);
    },
    [OPERATOR_CONSTANTS['STARTS_WITH']]: () => {
      const regex = RegExp(`^${valueAgainst}`);
      return regex.test(value);
    },
    [OPERATOR_CONSTANTS['DOES_NOT_START_WITH']]: () => {
      const regex = RegExp(`^(?!${valueAgainst}).*$`);
      return regex.test(value);
    },
    [OPERATOR_CONSTANTS['ENDS_WITH']]: () => {
      const regex = RegExp(`${valueAgainst}$`);
      return regex.test(value);
    },
    [OPERATOR_CONSTANTS['DOES_NOT_END_WITH']]: () => {
      const regex = RegExp(`^(?!.*${valueAgainst}$).*$`);
      if (value === '') {
        // regex fails to test an empty string
        return true;
      }
      return regex.test(value);
    },
    [OPERATOR_CONSTANTS['IS_EQUAL_TO']]: () => {
      const compareAgainst = valueAgainst === 'true' ? true : valueAgainst;
      return value === compareAgainst;
    },
    [OPERATOR_CONSTANTS['IS_NOT_EQUAL_TO']]: () => {
      return value !== valueAgainst;
    },
    [OPERATOR_CONSTANTS['IS_GREATER_THAN']]: () => {
      return value > valueAgainst;
    },
    [OPERATOR_CONSTANTS['IS_GREATER_THAN_OR_EQUAL_TO']]: () => {
      return value >= valueAgainst;
    },
    [OPERATOR_CONSTANTS['IS_LESS_THAN']]: () => {
      return value < valueAgainst;
    },
    [OPERATOR_CONSTANTS['IS_LESS_THAN_OR_EQUAL_TO']]: () => {
      return value <= valueAgainst;
    },
  };

  if (typeof operators[operator] === 'undefined') {
    return false;
  }

  return operators[operator]();
};
export const checkConditions = (fieldValues, conditions) => {
  let shouldHide;

  for (let i = 0; i < conditions.length; i += 1) {
    shouldHide = matchingTypes(fieldValues, conditions[i]);

    if (shouldHide) {
      break;
    }
  }

  return shouldHide;
};
export const UPDATE_FIELD = 'UPDATE_FIELD';
export const UPDATE_FORM = 'UPDATE_FORM';

export const ACTION_CONSTANTS = {
  SHOW: '{A0E7A852-464A-49FF-9BB8-C25958AC2382}',
  HIDE: '{7F58CBDD-D7C8-4FB7-BB44-8EC6B5E1C3D9}',
};

export const MATCH_TYPE_CONSTANTS = {
  ANY: '{365C94DA-C1CD-4783-A91D-8D17A16C7117}',
  ALL: '{4E5C4172-7EA6-4B99-82C3-75F24F80FE72}',
};

export const OPERATOR_CONSTANTS = {
  CONTAINS: '{BF93546-1976-4340-A8AB-DBC128A76EA4}',
  DOES_NOT_CONTAIN: '{5A5A6BE-7F5B-4945-B38B-7CEA3BBF6443}',
  STARTS_WITH: '{F01F291-82E4-44E7-A6B7-2F8721C09372}',
  DOES_NOT_START_WITH: '{69B52979-F2E0-470A-A04D-5A9F3B7EDE5D}',
  ENDS_WITH: '{3D75250B-E156-42AB-9FF1-0FDB5B4D3869}',
  DOES_NOT_END_WITH: '{F3AC31A4-435B-4365-BE85-B681311380B3}',
  IS_EQUAL_TO: '{1D38B217-A2EE-4E7B-B6ED-13E751462FEB}',
  IS_NOT_EQUAL_TO: '{49F4F7E7-E8C5-46F9-8799-78DBD80A8DB4}',
  IS_GREATER_THAN: '{F67F3B43-3709-41D6-96A5-813459D1E6A9}',
  IS_GREATER_THAN_OR_EQUAL_TO: '{62EC6D69-EAE6-44B8-AE54-CDBE21479170}',
  IS_LESS_THAN: '{8FEA1E35-A0D7-4204-80FB-EA0F6BD73F9F}',
  IS_LESS_THAN_OR_EQUAL_TO: '{88AC1C68-84FE-4BA7-B875-E3E40CE5D290}',
};

export const buildConditions = (fieldConditions) => {
  fieldConditions.forEach((fieldItem) => {
    // if item is part of a condition
    console.log('fieldItem inside buildConditions', fieldItem);
    fieldItem.conditions.forEach((conditionItem) => {
      console.log('conditionItem', conditionItem);
      if (conditionFields.indexOf(conditionItem.fieldId) < 0) {
        conditionFields.push(conditionItem.fieldId);
      }
    });

    // if item is part of an action
    fieldItem.actions.forEach((actionItem) => {
      if (conditionFields.indexOf(actionItem.fieldId) < 0) {
        conditionFields.push(actionItem.fieldId);
      }
    });

    // add and arrange all conditions against a certain "action" item
    fieldItem.actions.forEach((actionItem) => {
      if (!conditions[actionItem.fieldId]) {
        conditions[actionItem.fieldId] = [
          {
            matchTypeId: fieldItem.matchTypeId,
            conditions: fieldItem.conditions,
            actionTypeId: actionItem.actionTypeId,
          },
        ];
      } else {
        conditions[actionItem.fieldId].push({
          matchTypeId: fieldItem.matchTypeId,
          conditions: fieldItem.conditions,
          actionTypeId: actionItem.actionTypeId,
        });
      }
    });
  });
};

// fields.map((item) => {
//   // add all items that are part of a condition or the target of an action
//   buildConditions(item.model.conditionSettings.fieldConditions);

//   // add all field values to the form
//   fieldValues[item.model.conditionSettings.fieldKey] = item.model.value;
// });
