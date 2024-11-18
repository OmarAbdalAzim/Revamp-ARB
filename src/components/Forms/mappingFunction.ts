interface ConditionSettings {
  fieldConditions: Array<any>;
}

interface CssClassSettings {
  manualCssClasses: string;
  cssClassOptions: Array<any>;
  cssClass: string;
}

interface FieldModel {
  conditionSettings: ConditionSettings;
  cssClassSettings: CssClassSettings;
  [key: string]: any;
}

interface Field {
  model: FieldModel;
  valueField?: {
    id: string;
  };
}

interface OuterField {
  fields?: Field[];
}

interface JsonObject {
  fields?: OuterField[];
}

interface Condition {
  [fieldId: string]: Array<any>;
}

export function mapConditions(jsonObject: JsonObject): Condition[] {
  const conditions: Condition[] = [];

  if (!jsonObject.fields || !Array.isArray(jsonObject.fields)) {
    return conditions; // Return empty array if no fields exist
  }

  jsonObject.fields.forEach((outerField) => {
    if (outerField.fields && Array.isArray(outerField.fields)) {
      outerField.fields.forEach((innerField) => {
        const { model, valueField } = innerField;

        if (
          model &&
          model.conditionSettings &&
          Array.isArray(model.conditionSettings.fieldConditions) &&
          model.conditionSettings.fieldConditions.length > 0
        ) {
          // Extract fieldIdField value and fieldConditions
          const fieldId = valueField?.id;
          const fieldConditions = model.conditionSettings.fieldConditions;

          if (fieldId) {
            conditions.push({
              [fieldId]: fieldConditions,
            });
          }
        }
      });
    }
  });

  return conditions;
}
export const ACTION_CONTAINS = {
  SHOW: '{AAE07A52-46A4-49EF-98B0-C2595BAC2382}',
  HIDE: '{7F58C8DD-D7C0-4FB7-BB44-8EC6B5E1C3D9}',
  ENABLE: '{5744A87E-E32C-42CC-862F-96842A0202BB}',
  DISABLE: '{C698C993-549E-486A-A09C-BB8D830DA958}',
};

export const OPERATOR_CONSTANTS = {
  IS_EQUAL_TO: '{1D38B217-A2EE-4E7B-B6ED-13E751462FEB}',
  IS_NOT_EQUAL_TO: '{49F47E77-E8C5-46F9-BF39-78D6B0D40B48}',
  CONTAINS: '{BF8935A6-1976-43A0-ABA5-D0BC128A76EA}',
  DOES_NOT_CONTAIN: '{45AAB0FB-775B-40F5-B3B8-7CAE3ABBF643}',
  STARTS_WITH: '{FD10F291-3C2E-4AE7-8A67-2F8271CB3DF2}',
  DOES_NOT_STARTS_WITH: '{6B92597D-F2E0-47D3-A40D-59AFB37EEDE5}',
  ENDS_WITH: '{D375ED5B-E156-4A2B-9F91-DFD5B03F0D78}',
  DOES_NOT_END_WITH: '{F3AC7A1A-3458-4385-BB65-860315313DB3}',
  IS_GREATER_THAN: '{61FF63A0-375C-47BD-9986-1F81BD12BBBB}',
  IS_GREATER_THAN_OR_EQUAL_TO: '{062C6ED9-EA6E-4A88-AE54-C88E2147971D}',
  IS_LESS_THAN: '{8FE41E53-AD87-4D24-B50F-EA0F6BDF739F}',
  IS_LESS_THAN_OR_EQUAL_TO: '{88AC1C6B-BAFE-40A7-BB75-E304CEC29DD}',
};

// Utility function
export function mapConditionsAndActions(data: any[]) {
  const mapValueToKey = (value: string, mapping: Record<string, string>) => {
    return Object.keys(mapping).find((key) => mapping[key] === value) || null;
  };

  return data.flatMap((item) => {
    const key = Object.keys(item)[0];
    const value = item[key];

    return value.map((entry: any) => ({
      key,
      matchTypeId: entry.matchTypeId,
      conditions: entry.conditions.map((condition: any) => ({
        ...condition,
        operator: mapValueToKey(condition.operatorId, OPERATOR_CONSTANTS),
      })),
      actions: entry.actions.map((action: any) => ({
        ...action,
        actionType: mapValueToKey(action.actionTypeId, ACTION_CONTAINS),
      })),
    }));
  });
}
export function logObjects(array: any) {
  array.forEach((obj: any, index: any) => {
    console.log(`Object ${index + 1}:`, obj);
  });
}
