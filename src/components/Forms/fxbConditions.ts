// // fxbConditions.ts
// import { findActionKeyByValue } from 'components/FormPoc/Model';
// import $ from 'jquery';

// interface Condition {
//   fieldId: string;
//   operatorId: string;
//   value: string;
// }

// interface Action {
//   fieldId: string;
//   actionTypeId: string;
//   value?: any;
//   conditionsResult?: boolean;
// }

// interface FieldCondition {
//   matchTypeId: any;
//   conditions: Condition[];
//   actions: Action[];
// }

// interface FxbOptions {
//   fieldConditions: FieldCondition[];
//   animate: boolean;
// }

// class FxbConditions {
//   el: HTMLElement;
//   $el: JQuery<HTMLElement>;
//   options: FxbOptions;
//   executedActions: Action[] = [];
//   loaded = false;

//   constructor(el: HTMLElement, options: FxbOptions) {
//     this.el = el;
//     this.$el = $(el);
//     this.options = { ...FxbConditions.defaultOptions, ...options };
//   }

//   static defaultOptions: FxbOptions = {
//     fieldConditions: [],
//     animate: true,
//   };

//   static helpers = {
//     normalize(value: any, preserveCase = false) {
//       return value == null ? '' : preserveCase ? String(value) : String(value).toLowerCase();
//     },
//     toNumber(value: any) {
//       value = Number(value);
//       return isNaN(value) ? undefined : value;
//     },
//     indexOf(str: string, value: string, startIndex = 0, preserveCase = false) {
//       str = FxbConditions.helpers.normalize(str, preserveCase);
//       value = FxbConditions.helpers.normalize(value, preserveCase);
//       return str.indexOf(value, startIndex);
//     },
//     endsWith(str: string, value: string, preserveCase = false) {
//       str = FxbConditions.helpers.normalize(str, preserveCase);
//       value = FxbConditions.helpers.normalize(value, preserveCase);
//       return str.endsWith(value);
//     },
//   };

//   applyConditions() {
//     if (!this.options.fieldConditions) return;
//     console.log('working with field conditions');
//     console.log(this.options.fieldConditions);
//     this.executedActions = [];
//     this.options.fieldConditions.forEach((fieldCondition) => {
//       const conditionsResult = this.evaluateConditions(fieldCondition);
//       console.log('condition Result', conditionsResult);
//       fieldCondition.actions.forEach((action) => {
//         console.log(action.actionTypeId);
//         console.log(this.executeAction);
//         this.executeAction(action, conditionsResult);
//       });
//     });
//   }

//   evaluateConditions(fieldCondition: FieldCondition) {
//     const matchType = (fieldCondition.matchTypeId || '').toLowerCase();
//     console.log(matchType);
//     return matchType === 'all'
//       ? fieldCondition.conditions.every((condition) => this.isConditionSatisfied(condition))
//       : fieldCondition.conditions.some((condition) => this.isConditionSatisfied(condition));
//   }

//   executeAction(action: Action, conditionsResult: boolean) {
//     if (!action || !action.fieldId || !action.actionTypeId) return;
//     console.log('action', action.actionTypeId);
//     console.log('conditionsResult', conditionsResult);
//     // const operatorKey = findOperatorKeyByValue('{1D38B217-A2EE-4E7B-B6ED-13E751462FEB}');
//     // console.log(operatorKey); // Output: 'IS_EQUAL_TO' (if found)
//     console.log(action.actionTypeId.toString());
//     const actionKey = findActionKeyByValue(action.actionTypeId);
//     console.log(actionKey); // Output: 'SHOW' (if found)

//     const $target = this.$el.find(`[data-sc-field-key="${action.fieldId}"]`);
//     console.log($target);
//     if ($target) {
//       // Explicitly type actionFn as a function or undefined
//       console.log(action.actionTypeId);
//       const actionFn = FxbConditions.actions.getAction(
//         '{7F58C8DD-D7C0-4FB7-BB44-8EC6B5E1C3D9}',
//         conditionsResult
//       ) as
//         | ((target: JQuery<HTMLElement>, action: Action, conditionsResult: boolean) => void)
//         | undefined;
//       console.log(' for actionFn: ' + actionFn);
//       // Check if actionFn is a function before calling it
//       if (typeof actionFn === 'function') {
//         const y = actionFn.call(this, $target, action, conditionsResult);
//         console.log(y);
//         console.log('action call', actionFn.call(this, $target, action, conditionsResult));
//         console.log(this.executedActions.push({ ...action, conditionsResult }));
//         console.log({ ...action });
//         this.executedActions.push({ ...action, conditionsResult });
//       }
//     }
//   }

//   isConditionSatisfied(condition: Condition) {
//     const operatorFn = FxbConditions.operators.getOperator(condition.operatorId);
//     if (typeof operatorFn !== 'function') return false; // Type guard ensures operatorFn is callable

//     const valueList = this.getValueList(condition.fieldId);
//     return valueList.some((value) => operatorFn(String(condition.value), String(value)));
//   }

//   getValueList(fieldId: string) {
//     const $fieldEl = this.$el.find(`[data-sc-field-key="${fieldId}"]`);
//     return $fieldEl.map((_, element) => $(element).val()).get();
//   }

//   static actions = {
//     getAction(
//       actionName: string,
//       conditionsResult: boolean
//     ):
//       | ((target: JQuery<HTMLElement>, action: Action, conditionsResult: boolean) => void)
//       | undefined {
//       // Define specific actions based on actionName
//       console.log(actionName);
//       const x = findActionKeyByValue(actionName);
//       console.log(x);
//       console.log(conditionsResult);
//       if (x === 'SHOW' && conditionsResult === true) {
//         console.log(conditionsResult);
//         return this.SHOW;
//       }
//       if (x === 'HIDE' && conditionsResult === false) {
//         console.log(conditionsResult);
//         return this.HIDE;
//       }
//       return undefined;
//     },

//     SHOW($target: JQuery<HTMLElement>) {
//       console.log($target.hide());
//       $target.show();
//     },

//     HIDE($target: JQuery<HTMLElement>) {
//       $target.hide();
//       console.log($target.hide());
//     },
//   };

//   static operators = {
//     getOperator(
//       operatorName: string
//     ): ((conditionValue: string, fieldValue: string) => boolean) | undefined {
//       switch (operatorName) {
//         case 'contains':
//           return (conditionValue, fieldValue) => fieldValue.includes(conditionValue);
//         // Define other operators here...
//         default:
//           return undefined;
//       }
//     },
//   };
// }

// export default FxbConditions;
