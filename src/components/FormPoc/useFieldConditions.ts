import { useState, useEffect } from 'react';

type Condition = {
  operatorId: string;
  value: any;
};

type Action = {
  actionTypeId: string;
  value: any;
};

type FieldCondition = {
  conditions: Condition[];
  actions: Action[];
};

type Field = {
  fields?: Field[];
  model?: {
    conditionSettings?: {
      fieldConditions?: FieldCondition[];
    };
  };
};

type OperatorConstants = Record<string, string>;
type ActionConstants = Record<string, string>;

export function useFieldConditions(
  fields: Field[],
  OPERATOR_CONSTANTS: OperatorConstants,
  ACTION_CONSTANTS: ActionConstants
) {
  const [conditionsState, setConditionsState] = useState<Record<string, any>>({});
  const [actionsState, setActionsState] = useState<Record<string, any>>({});

  useEffect(() => {
    function processFieldConditions(fields: Field[]) {
      fields.forEach((field) => {
        // Recursively process nested fields
        if (field.fields && Array.isArray(field.fields)) {
          processFieldConditions(field.fields);
        }

        const model = field.model;
        if (
          model &&
          model.conditionSettings &&
          Array.isArray(model.conditionSettings.fieldConditions)
        ) {
          model.conditionSettings.fieldConditions.forEach((conditionSet) => {
            conditionSet.conditions.forEach((cond) => {
              // Find the operator key for the condition and set it in state
              const operatorKey = Object.keys(OPERATOR_CONSTANTS).find(
                (key) =>
                  OPERATOR_CONSTANTS[key as keyof typeof OPERATOR_CONSTANTS] === cond.operatorId
              );

              if (operatorKey) {
                setConditionsState((prev) => ({
                  ...prev,
                  [operatorKey]: cond.value,
                }));
              }
            });

            conditionSet.actions.forEach((action) => {
              // Find the action key for the action and set it in state if a value is present
              const actionKey = Object.keys(ACTION_CONSTANTS).find(
                (key) =>
                  ACTION_CONSTANTS[key as keyof typeof ACTION_CONSTANTS] === action.actionTypeId
              );

              if (actionKey) {
                setActionsState((prev) => ({
                  ...prev,
                  [actionKey]: actionKey,
                }));
              }
            });
          });
        }
      });
    }

    // Initialize conditions and actions states
    processFieldConditions(fields);
  }, [fields, OPERATOR_CONSTANTS, ACTION_CONSTANTS]);

  return { conditionsState, setActionsState, setConditionsState, actionsState };
}
