// interface FxbConditionsOptions {
//   fieldConditions?: Array<any>;
//   animate?: boolean;
// }
// type ActionFunction = ($target: JQuery, action?: Action, conditionsResult?: boolean) => void;
// type OperatorFunction = (conditionValue: any, fieldValue: any) => boolean;
// interface Action {
//   fieldId: string;
//   actionType: string;
//   value?: any;
//   conditionsResult?: boolean;
// }

// interface Condition {
//   fieldId: string;
//   operator: string;
//   value?: any;
// }

// interface FieldCondition {
//   conditions: Condition[];
//   actions: Action[];
//   matchType?: string;
// }

// interface JQuery {
//   init_fxbConditions(options?: FxbConditionsOptions): JQuery;
//   init_formConditions(): void;
// }

// class FxbConditions {
//   el: HTMLElement;
//   $el: JQuery;
//   options: FxbConditionsOptions;
//   loaded = false;
//   executedActions: Action[] = [];

//   static defaultOptions: FxbConditionsOptions = {
//     fieldConditions: [],
//     animate: true,
//   };

//   static helpers = {
//     normalize(value: any, preserveCase = false): string {
//       return value == null ? '' : preserveCase ? String(value) : String(value).toLowerCase();
//     },

//     toNumber(value: any): number | undefined {
//       const num = Number(value);
//       return isNaN(num) ? undefined : num;
//     },

//     indexOf(str: string, value: string, startIndex = 0, preserveCase = false): number {
//       str = this.normalize(str, preserveCase);
//       value = this.normalize(value, preserveCase);
//       return str.indexOf(value, startIndex);
//     },

//     endsWith(str: string, value: string, preserveCase = false): boolean {
//       str = this.normalize(str, preserveCase);
//       value = this.normalize(value, preserveCase);
//       const lengthDiff = str.length - value.length;
//       return lengthDiff >= 0 && str.substring(lengthDiff) === value;
//     },
//   };

//   constructor(el: HTMLElement, options: FxbConditionsOptions = {}) {
//     this.el = el;
//     this.$el = $(el);
//     this.options = { ...FxbConditions.defaultOptions, ...options };
//   }

//   initConditions(options?: FxbConditionsOptions) {
//     this.options = { ...this.options, ...options };
//     if (!this.options.fieldConditions) return;

//     const sourceFields: string[] = [];
//     this.options.fieldConditions.forEach((fieldCondition) => {
//       fieldCondition.conditions.forEach((condition: Condition) => {
//         if (condition.fieldId && !sourceFields.includes(condition.fieldId)) {
//           sourceFields.push(condition.fieldId);
//           const $source = this.$el
//             .find(`[data-sc-field-key="${condition.fieldId}"]`)
//             .filter((_, el) =>
//               FxbConditions.helpers.endsWith((el as HTMLInputElement).name, 'value')
//             );
//           $source.on('change', this.applyConditions.bind(this));
//         }
//       });
//     });

//     this.applyConditions();
//     this.loaded = true;
//   }

//   applyConditions() {
//     if (!this.options.fieldConditions) return;
//     this.executedActions = [];

//     this.options.fieldConditions.forEach((fieldCondition) => {
//       const conditionsResult = this.evaluateConditions(fieldCondition);
//       fieldCondition.actions.forEach((action: Action) => {
//         this.executeAction(action, conditionsResult);
//       });
//     });
//   }

//   setRequired($targets: JQuery) {
//     $targets.each((_, target) => {
//       const $target = $(target);
//       const name = (target as HTMLInputElement).name;
//       const $requiredEl = this.$el.find(`[name="${name}"][data-sc-conditions-required]`);
//       if ($requiredEl.length) {
//         $requiredEl.prop('disabled', $target.is(':hidden'));
//       }
//     });
//   }

//   executeAction(action: Action, conditionsResult: boolean) {
//     const $target = this.$el.find(`[data-sc-field-key="${action.fieldId}"]`);
//     if ($target.length) {
//       const actionFn = FxbConditions.actions.getAction(action.actionType, conditionsResult);
//       if (actionFn) {
//         actionFn.call(this, $target, action, conditionsResult);
//         this.executedActions.push({ ...action, conditionsResult });
//       }
//     }
//   }

//   evaluateConditions(fieldCondition: FieldCondition): boolean {
//     if (!fieldCondition.conditions) return true;
//     const matchType = (fieldCondition.matchType || '').toLowerCase();
//     switch (matchType) {
//       case 'all':
//         return fieldCondition.conditions.every(this.isConditionSatisfied.bind(this));
//       case 'any':
//       default:
//         return fieldCondition.conditions.some(this.isConditionSatisfied.bind(this));
//     }
//   }

//   getValueList(fieldId: string): any[] {
//     const $fieldEl = this.$el
//       .find(`[data-sc-field-key="${fieldId}"]`)
//       .filter((_, el) => FxbConditions.helpers.endsWith((el as HTMLInputElement).name, 'value'));

//     if ($fieldEl.length) {
//       return $fieldEl.map((_, el) => $(el).val()).get();
//     }

//     return [];
//   }

//   isConditionSatisfied(condition: Condition): boolean {
//     const operatorFn = FxbConditions.operators.getOperator(condition.operator);
//     if (operatorFn) {
//       const valueList = this.getValueList(condition.fieldId);
//       return valueList.some((value) => operatorFn(condition.value, value));
//     }
//     return false;
//   }

//   static actions = {
//     show($target: JQuery, conditionsResult?: boolean) {
//       if (conditionsResult !== undefined && conditionsResult) {
//         $target.show();
//       }
//     },
//     hide($target: JQuery, conditionsResult?: boolean) {
//       if (conditionsResult !== undefined && !conditionsResult) {
//         $target.hide();
//       }
//     },
//     enable($target: JQuery, conditionsResult?: boolean) {
//       if (conditionsResult !== undefined && conditionsResult) {
//         $target.prop('disabled', false);
//       }
//     },
//     disable($target: JQuery, conditionsResult?: boolean) {
//       if (conditionsResult !== undefined && !conditionsResult) {
//         $target.prop('disabled', true);
//       }
//     },
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     getAction(actionName: string, _conditionsResult?: boolean): ActionFunction | undefined {
//       // Retrieve the action function based on actionName and cast it to ActionFunction
//       return this[actionName as keyof typeof FxbConditions.actions] as ActionFunction;
//     },
//   };

//   static operators = {
//     contains(conditionValue: string, fieldValue: string): boolean {
//       return fieldValue.includes(conditionValue);
//     },
//     isEqualTo(conditionValue: string, fieldValue: string): boolean {
//       return conditionValue === fieldValue;
//     },
//     getOperator(operatorName: string): OperatorFunction | undefined {
//       return this[
//         operatorName.toLowerCase() as keyof typeof FxbConditions.operators
//       ] as OperatorFunction;
//     },
//   };
// }

// $.fn.init_fxbConditions = function (options?: FxbConditionsOptions) {
//   return this.each(function () {
//     const conditions = $(this).data('fxbForms.conditions') as FxbConditions | undefined;
//     if (conditions) {
//       conditions.initConditions(options);
//     } else {
//       const newConditions = new FxbConditions(this, options);
//       $(this).data('fxbForms.conditions', newConditions);
//       newConditions.initConditions();
//     }
//   });
// };

// $.fn.init_formConditions = function () {
//   const input = this.find('input[data-sc-fxb-condition]');
//   if (input) {
//     const conditions = JSON.parse(input.val() as string);
//     this.init_fxbConditions(conditions);
//   }
// };

// $(document).ready(() => {
//   $('form[data-sc-fxb]').each(function () {
//     $(this).init_formConditions();
//   });
// });
