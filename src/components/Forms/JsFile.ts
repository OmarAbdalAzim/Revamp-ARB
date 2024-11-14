export const checkConditions = (fieldValues: any, fieldConditions: any[]) => {
  let shouldHide = false;
  for (let i = 0; i < fieldConditions.length; i++) {
    const condition = fieldConditions[i];
    shouldHide = matchingTypes(fieldValues, condition);
    if (shouldHide) break;
  }
  return shouldHide;
};
export const handleActionType = (actionType: string, value: boolean) => {
  const actions = {
    [ACTION_CONTAINS['SHOW']]: () => !value,
    [ACTION_CONTAINS['HIDE']]: () => value,
  };

  return actions[actionType] ? actions[actionType]() : false;
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
export const validate = (operator: string, value: any, valueAgainst: any) => {
  const operators = {
    [OPERATOR_CONSTANTS['CONTAINS']]: () => new RegExp(`(${valueAgainst})`).test(value),
    [OPERATOR_CONSTANTS['DOES_NOT_CONTAIN']]: () => !new RegExp(`(${valueAgainst})`).test(value),
    [OPERATOR_CONSTANTS['STARTS_WITH']]: () => new RegExp(`^(${valueAgainst})`).test(value),
    [OPERATOR_CONSTANTS['ENDS_WITH']]: () => new RegExp(`(${valueAgainst})$`).test(value),
    [OPERATOR_CONSTANTS['IS_EQUAL_TO']]: () => value === valueAgainst,
    [OPERATOR_CONSTANTS['IS_NOT_EQUAL_TO']]: () => value !== valueAgainst,
    [OPERATOR_CONSTANTS['IS_GREATER_THAN']]: () => value > valueAgainst,
    [OPERATOR_CONSTANTS['IS_LESS_THAN']]: () => value < valueAgainst,
  };

  return operators[operator] ? operators[operator]() : false;
};
export const ACTION_CONTAINS = {
  SHOW: '{AAE07A52-46A4-49FF-9B88-C25958AC2382}',
  HIDE: '{7F58CB0D-D7C8-4FB7-B844-BEC6B651C3D9}',
};

export const MATCH_TYPE_CONTAINS = {
  ANY: '{3E5C94DA-C1CD-4783-A91D-8D17A16C7117}',
  ALL: '{4E5C1722-7EA6-4899-82C3-75F24F80FF72}',
};

export const OPERATOR_CONSTANTS = {
  CONTAINS: '{BF993546-1976-43A0-8AAB-DBC812BA76EA}',
  DOES_NOT_CONTAIN: '{A5A9E8CE-775B-4945-8BB8-7CEA3AB8F643}',
  STARTS_WITH: '{1DF2913E-A2CE-4A67-BB72-A29F8B67795A}',
  ENDS_WITH: '{3D7555E0-E15E-42C8-B4E8-A3A8D32756F8}',
  IS_EQUAL_TO: '{F49F427F-4ECB-4F69-BF39-79DBD09ADB48}',
  IS_NOT_EQUAL_TO: '{92A17EB2-8C55-4F96-9779-750B9BA2D719}',
  IS_GREATER_THAN: '{6F1F8436-8C3D-4986-8E9D-4EB5F5D9477E}',
  IS_LESS_THAN: '{8FE4E135-A022-4DA4-B0E5-5EAFD1A4C960}',
};
