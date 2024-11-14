export interface Condition {
  fieldId: string;
  operatorId: string;
  value: string;
}

export interface Action {
  fieldId: string;
  actionTypeId: string;
  value: string | null;
}

export interface FieldCondition {
  matchTypeId: string;
  conditions: Condition[];
  actions: Action[];
}

export interface ConditionSettings {
  fieldKey: string;
  fieldConditions: FieldCondition[];
}

export interface FieldModel {
  name: string;
  title: string;
  conditionSettings: ConditionSettings;
  value?: string | boolean;
}

export interface SitecoreField {
  model: FieldModel;
}

export interface SitecoreData {
  fields: SitecoreField[];
}

export interface FormData {
  name: string;
  phone: string;
  checkbox: boolean;
}
export const OPERATOR_CONSTANTS = {
  IS_EQUAL_TO: '{1D38B217-A2EE-4E7B-B6ED-13E751462FEB}',
  IS_NOT_EQUAL_TO: '{49F47E77-E8C5-46F9-BF39-78D6B0D40B48}',
  CONTAINS: '{BF8935A6-1976-43A0-ABA5-D0BC128A76EA} ',
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
export const ACTION_CONSTANTS = {
  SHOW: '{AAE07A52-46A4-49EF-98B0-C2595BAC2382}',
  HIDE: '{7F58C8DD-D7C0-4FB7-BB44-8EC6B5E1C3D9}',
  ENABLE: '{7F58C8DD-D7C0-4FB7-BB44-8EC6B5E1C3D9}',
  DISABLE: '{7F58C8DD-D7C0-4FB7-BB44-8EC6B5E1C3D9}',
  GO_TO_PAGE: '{4E448D57-BA06-42DC-9519-6BCD102CB332}',
};
export interface Action {
  fieldId: string;
  actionTypeId: string;
  value: any;
}

export interface Condition {
  fieldId: string;
  operatorId: string;
  value: any;
}

export interface FieldCondition {
  matchTypeId: string;
  conditions: Condition[];
  actions: Action[];
}

export interface ConditionSettings {
  fieldKey: string;
  fieldConditions: FieldCondition[];
}

export interface Model {
  conditionSettings?: ConditionSettings;
  [key: string]: any;
}

export interface Field {
  fields?: Field[];
  model?: Model;
  [key: string]: any;
}
export const data = {
  htmlPrefix: 'fxb.742265fe-6164-45bb-8b21-20483f7b7676',
  formSessionId: {
    name: 'fxb.742265fe-6164-45bb-8b21-20483f7b7676.FormSessionId',
    id: 'fxb_742265fe-6164-45bb-8b21-20483f7b7676_FormSessionId',
    value: '11f82eae-14b1-4880-88e2-b7103484702b',
  },
  formItemId: {
    name: 'fxb.742265fe-6164-45bb-8b21-20483f7b7676.FormItemId',
    id: 'fxb_742265fe-6164-45bb-8b21-20483f7b7676_FormItemId',
    value: '{82F8C68A-865A-488A-B33A-C39BE0F7F7AA}',
  },
  pageItemId: {
    name: 'fxb.742265fe-6164-45bb-8b21-20483f7b7676.PageItemId',
    id: 'fxb_742265fe-6164-45bb-8b21-20483f7b7676_PageItemId',
    value: 'd8e36a04-5f45-4f31-97a0-7eae2b5d5ba0',
  },
  antiForgeryToken: {
    name: '__RequestVerificationToken',
    id: null,
    value:
      'VtKNb1QikL0w-kLsefwmVhe473vo4UkBnFioYDt0WI__j4ZVbP-ABIY5Oq31xiKz3fYfQjKvkfOFC8pfgx1Y8rRUWU8H8FbDNj35zIoGaNU1',
  },
  metadata: {
    isAjax: true,
    isTrackingEnabled: true,
    isRobotDetectionAvailable: true,
    isRobotDetectionEnabled: false,
    isTemplate: false,
    title: '',
    cssClass: '',
    cssClassSettings: {
      manualCssClasses: '',
      cssClassOptions: [],
      cssClass: '',
    },
    thumbnail: '{6590E671-6D5E-449C-A85D-9D4BA36DC56B}',
    scripts: [
      'jquery-3.4.1.min.js',
      'jquery.validate.min.js',
      'jquery.validate.unobtrusive.min.js',
      'jquery.unobtrusive-ajax.min.js',
      'form.init.js',
      'form.validate.js',
      'form.tracking.js',
      'form.conditions.js',
    ],
    styles: [],
    itemId: '82f8c68a-865a-488a-b33a-c39be0f7f7aa',
    templateId: '{6ABEE1F2-4AB4-47F0-AD8B-BDB36F37F64C}',
    fieldTypeItemId: '{3A4DF9C0-7C82-4415-90C3-25440257756D}',
    name: 'arbsubmit',
  },
  fields: [
    {
      fields: [
        {
          model: {
            text: 'ARB Form',
            htmlTag: 'p',
            conditionSettings: {
              fieldKey: 'D542D6E194284370B0FC2DE5A551E02A',
              fieldConditions: [],
            },
            cssClassSettings: {
              manualCssClasses: '',
              cssClassOptions: [],
              cssClass: '',
            },
            cssClass: '',
            itemId: 'c65a8757-cf30-4bbc-94dd-9af74f618068',
            name: 'Texttest',
            templateId: '{FC18F915-EAC6-460A-8777-6E1376A9EA09}',
            fieldTypeItemId: '{983BFA5F-C6B6-4AEE-A3BB-46B95D52E7DF}',
          },
        },
        {
          indexField: {
            name: 'fxb.742265fe-6164-45bb-8b21-20483f7b7676.Fields.Index',
            id: 'fxb_742265fe-6164-45bb-8b21-20483f7b7676_Fields_Index_d573d092-d22f-4ba3-bb76-e3c682dfb935',
            value: 'd573d092-d22f-4ba3-bb76-e3c682dfb935',
          },
          fieldIdField: {
            name: 'fxb.742265fe-6164-45bb-8b21-20483f7b7676.Fields[d573d092-d22f-4ba3-bb76-e3c682dfb935].ItemId',
            id: 'fxb_742265fe-6164-45bb-8b21-20483f7b7676_Fields_d573d092-d22f-4ba3-bb76-e3c682dfb935__ItemId',
            value: 'd573d092-d22f-4ba3-bb76-e3c682dfb935',
          },
          valueField: {
            name: 'fxb.742265fe-6164-45bb-8b21-20483f7b7676.Fields[d573d092-d22f-4ba3-bb76-e3c682dfb935].Value',
            id: 'fxb_742265fe-6164-45bb-8b21-20483f7b7676_Fields_d573d092-d22f-4ba3-bb76-e3c682dfb935__Value',
            value: null,
          },
          model: {
            minLength: 0,
            maxLength: 255,
            placeholderText: '',
            value: '',
            validationDataModels: [],
            valueProviderSettings: {
              valueProviderItemId: '',
              parameters: '',
            },
            isTrackingEnabled: true,
            required: false,
            allowSave: true,
            title: 'name',
            labelCssClass: '',
            labelCssClassSettings: {
              manualCssClasses: '',
              cssClassOptions: [],
              cssClass: '',
            },
            conditionSettings: {
              fieldKey: '6508EA1EC10E4012B33EEB58245EA6B2',
              fieldConditions: [],
            },
            cssClassSettings: {
              manualCssClasses: '',
              cssClassOptions: [],
              cssClass: '',
            },
            cssClass: '',
            itemId: 'd573d092-d22f-4ba3-bb76-e3c682dfb935',
            name: 'name',
            templateId: '{0908030B-4564-42EA-A6FA-C7A5A2D921A8}',
            fieldTypeItemId: '{4EE89EA7-CEFE-4C8E-8532-467EF64591FC}',
          },
        },
        {
          indexField: {
            name: 'fxb.742265fe-6164-45bb-8b21-20483f7b7676.Fields.Index',
            id: 'fxb_742265fe-6164-45bb-8b21-20483f7b7676_Fields_Index_a5886c13-091f-4d7f-ae5a-7fb81ab33a23',
            value: 'a5886c13-091f-4d7f-ae5a-7fb81ab33a23',
          },
          fieldIdField: {
            name: 'fxb.742265fe-6164-45bb-8b21-20483f7b7676.Fields[a5886c13-091f-4d7f-ae5a-7fb81ab33a23].ItemId',
            id: 'fxb_742265fe-6164-45bb-8b21-20483f7b7676_Fields_a5886c13-091f-4d7f-ae5a-7fb81ab33a23__ItemId',
            value: 'a5886c13-091f-4d7f-ae5a-7fb81ab33a23',
          },
          valueField: {
            name: 'fxb.742265fe-6164-45bb-8b21-20483f7b7676.Fields[a5886c13-091f-4d7f-ae5a-7fb81ab33a23].Value',
            id: 'fxb_742265fe-6164-45bb-8b21-20483f7b7676_Fields_a5886c13-091f-4d7f-ae5a-7fb81ab33a23__Value',
            value: null,
          },
          model: {
            minLength: 0,
            maxLength: 255,
            placeholderText: '',
            value: '',
            validationDataModels: [],
            valueProviderSettings: {
              valueProviderItemId: '',
              parameters: '',
            },
            isTrackingEnabled: true,
            required: false,
            allowSave: true,
            title: 'phone',
            labelCssClass: '',
            labelCssClassSettings: {
              manualCssClasses: '',
              cssClassOptions: [],
              cssClass: '',
            },
            conditionSettings: {
              fieldKey: '427AD4AF9E43472A9903873CC8F9B25B',
              fieldConditions: [],
            },
            cssClassSettings: {
              manualCssClasses: '',
              cssClassOptions: [],
              cssClass: '',
            },
            cssClass: '',
            itemId: 'a5886c13-091f-4d7f-ae5a-7fb81ab33a23',
            name: 'phone',
            templateId: '{0908030B-4564-42EA-A6FA-C7A5A2D921A8}',
            fieldTypeItemId: '{4EE89EA7-CEFE-4C8E-8532-467EF64591FC}',
          },
        },
        {
          indexField: {
            name: 'fxb.742265fe-6164-45bb-8b21-20483f7b7676.Fields.Index',
            id: 'fxb_742265fe-6164-45bb-8b21-20483f7b7676_Fields_Index_25a8a757-c12c-4e09-8d61-585e52923e24',
            value: '25a8a757-c12c-4e09-8d61-585e52923e24',
          },
          fieldIdField: {
            name: 'fxb.742265fe-6164-45bb-8b21-20483f7b7676.Fields[25a8a757-c12c-4e09-8d61-585e52923e24].ItemId',
            id: 'fxb_742265fe-6164-45bb-8b21-20483f7b7676_Fields_25a8a757-c12c-4e09-8d61-585e52923e24__ItemId',
            value: '25a8a757-c12c-4e09-8d61-585e52923e24',
          },
          valueField: {
            name: 'fxb.742265fe-6164-45bb-8b21-20483f7b7676.Fields[25a8a757-c12c-4e09-8d61-585e52923e24].Value',
            id: 'fxb_742265fe-6164-45bb-8b21-20483f7b7676_Fields_25a8a757-c12c-4e09-8d61-585e52923e24__Value',
            value: null,
          },
          model: {
            value: false,
            validationDataModels: [],
            valueProviderSettings: {
              valueProviderItemId: '',
              parameters: '',
            },
            isTrackingEnabled: true,
            required: false,
            allowSave: true,
            title: 'Label',
            labelCssClass: '',
            labelCssClassSettings: {
              manualCssClasses: '',
              cssClassOptions: [],
              cssClass: '',
            },
            conditionSettings: {
              fieldKey: '800EEB89528E4E44B20DCA68E00F3F94',
              fieldConditions: [
                {
                  matchTypeId: '{365C94DA-C1CD-4783-A91D-0D17A16C7117}',
                  conditions: [
                    {
                      fieldId: '800EEB89528E4E44B20DCA68E00F3F94',
                      operatorId: '{1D38B217-A2EE-4E7B-B6ED-13E751462FEB}',
                      value: 'true',
                    },
                  ],
                  actions: [
                    {
                      fieldId: '427AD4AF9E43472A9903873CC8F9B25B',
                      actionTypeId: '{C698C993-549E-486A-A09C-BB8D830DA958}',
                      value: null,
                    },
                  ],
                },
              ],
            },
            cssClassSettings: {
              manualCssClasses: '',
              cssClassOptions: [],
              cssClass: '',
            },
            cssClass: '',
            itemId: '25a8a757-c12c-4e09-8d61-585e52923e24',
            name: 'Checkbox',
            templateId: '{2F07293C-077F-456C-B715-FDB791ACB367}',
            fieldTypeItemId: '{4DA85E8A-3B48-4BC6-9565-8C1F5F36DD1B}',
          },
        },
        {
          indexField: {
            name: 'fxb.742265fe-6164-45bb-8b21-20483f7b7676.Fields.Index',
            id: 'fxb_742265fe-6164-45bb-8b21-20483f7b7676_Fields_Index_cb8f8712-6535-42e0-a937-ae4ab99c61e7',
            value: 'cb8f8712-6535-42e0-a937-ae4ab99c61e7',
          },
          fieldIdField: {
            name: 'fxb.742265fe-6164-45bb-8b21-20483f7b7676.Fields[cb8f8712-6535-42e0-a937-ae4ab99c61e7].ItemId',
            id: 'fxb_742265fe-6164-45bb-8b21-20483f7b7676_Fields_cb8f8712-6535-42e0-a937-ae4ab99c61e7__ItemId',
            value: 'cb8f8712-6535-42e0-a937-ae4ab99c61e7',
          },
          valueField: {
            name: 'fxb.742265fe-6164-45bb-8b21-20483f7b7676.Fields[cb8f8712-6535-42e0-a937-ae4ab99c61e7].Value',
            id: 'fxb_742265fe-6164-45bb-8b21-20483f7b7676_Fields_cb8f8712-6535-42e0-a937-ae4ab99c61e7__Value',
            value: null,
          },
          model: {
            minLength: 0,
            maxLength: 255,
            placeholderText: '',
            value: '',
            validationDataModels: [],
            valueProviderSettings: {
              valueProviderItemId: '',
              parameters: '',
            },
            isTrackingEnabled: true,
            required: false,
            allowSave: true,
            title: 'Label',
            labelCssClass: '',
            labelCssClassSettings: {
              manualCssClasses: '',
              cssClassOptions: [],
              cssClass: '',
            },
            conditionSettings: {
              fieldKey: '0B7A2DE38DE241CCBB0914EE9DA24C1D',
              fieldConditions: [
                {
                  matchTypeId: '{365C94DA-C1CD-4783-A91D-0D17A16C7117}',
                  conditions: [
                    {
                      fieldId: '800EEB89528E4E44B20DCA68E00F3F94',
                      operatorId: '{1D38B217-A2EE-4E7B-B6ED-13E751462FEB}',
                      value: 'true',
                    },
                  ],
                  actions: [
                    {
                      fieldId: '0B7A2DE38DE241CCBB0914EE9DA24C1D',
                      actionTypeId: '{C698C993-549E-486A-A09C-BB8D830DA958}',
                      value: null,
                    },
                  ],
                },
              ],
            },
            cssClassSettings: {
              manualCssClasses: '',
              cssClassOptions: [],
              cssClass: '',
            },
            cssClass: '',
            itemId: 'cb8f8712-6535-42e0-a937-ae4ab99c61e7',
            name: 'Single-Line Text',
            templateId: '{0908030B-4564-42EA-A6FA-C7A5A2D921A8}',
            fieldTypeItemId: '{4EE89EA7-CEFE-4C8E-8532-467EF64591FC}',
          },
        },
      ],
      model: {
        conditionSettings: {
          fieldKey: '5AB76900AD3B40C89DCD9B5BE02413E0',
          fieldConditions: [],
        },
        cssClassSettings: {
          manualCssClasses: '',
          cssClassOptions: [],
          cssClass: '',
        },
        cssClass: '',
        itemId: '439bb12e-df3c-4843-b202-0fdab3c6f467',
        name: 'Sectiontest',
        templateId: '{8CDDB194-F456-4A75-89B7-346F8F39F95C}',
        fieldTypeItemId: '{447AA745-6D29-4B65-A5A3-8173AA8AF548}',
      },
    },
    {
      fields: [
        {
          model: {
            text: 'submit section ',
            htmlTag: 'p',
            conditionSettings: {
              fieldKey: '388F74E3DC684BA68E2B6AF600BCFC43',
              fieldConditions: [],
            },
            cssClassSettings: {
              manualCssClasses: '',
              cssClassOptions: [],
              cssClass: '',
            },
            cssClass: '',
            itemId: '8baa3a3f-ce68-41c6-9953-5105c6dfded5',
            name: 'Text',
            templateId: '{FC18F915-EAC6-460A-8777-6E1376A9EA09}',
            fieldTypeItemId: '{983BFA5F-C6B6-4AEE-A3BB-46B95D52E7DF}',
          },
        },
        {
          navigationButtonsField: {
            name: 'fxb.742265fe-6164-45bb-8b21-20483f7b7676.NavigationButtons',
            id: null,
            value: 'b932d610-1c58-4f32-812f-887a20cec004',
          },
          navigationStepField: {
            name: 'fxb.742265fe-6164-45bb-8b21-20483f7b7676.b932d610-1c58-4f32-812f-887a20cec004',
            id: null,
            value: '0',
          },
          buttonField: {
            name: 'fxb.742265fe-6164-45bb-8b21-20483f7b7676.b932d610-1c58-4f32-812f-887a20cec004',
            id: 'fxb_742265fe-6164-45bb-8b21-20483f7b7676_b932d610-1c58-4f32-812f-887a20cec004',
            value: 'Submit Button',
          },
          model: {
            navigationStep: 0,
            submitActions: [
              {
                itemId: '{10E89028-58CD-4562-9EEB-BA292DC5F4C5}',
                name: 'Save Data',
                submitActionId: '{0C61EAB3-A61E-47B8-AE0B-B6EBA0D6EB1B}',
                parameters: '',
                description: '',
              },
              {
                itemId: '{15BAF5F2-1280-47F4-9576-BA82C3AEC41B}',
                name: 'Redirect to Page',
                submitActionId: '{3F3E2093-9DEA-4199-86CA-44FC69EF624D}',
                parameters: '{"referenceId":"{37351393-0E8C-4E85-8016-6EDDB0CC546A}"}',
                description: 'Home',
              },
            ],
            title: 'Text',
            labelCssClass: '',
            labelCssClassSettings: {
              manualCssClasses: '',
              cssClassOptions: [],
              cssClass: '',
            },
            conditionSettings: {
              fieldKey: 'E990D92D447447EAA855DE80E66586B0',
              fieldConditions: [],
            },
            cssClassSettings: {
              manualCssClasses: '',
              cssClassOptions: [],
              cssClass: '',
            },
            cssClass: '',
            itemId: 'b932d610-1c58-4f32-812f-887a20cec004',
            name: 'Submit Button',
            templateId: '{94A46D66-B1B8-405D-AAE4-7B5A9CD61C5E}',
            fieldTypeItemId: '{7CE25CAB-EF3A-4F73-AB13-D33BDC1E4EE2}',
          },
        },
      ],
      model: {
        conditionSettings: {
          fieldKey: '42C7288EB84E4CBAAB6CE8201A184EC5',
          fieldConditions: [
            {
              matchTypeId: '{365C94DA-C1CD-4783-A91D-0D17A16C7117}',
              conditions: [
                {
                  fieldId: '800EEB89528E4E44B20DCA68E00F3F94',
                  operatorId: '{1D38B217-A2EE-4E7B-B6ED-13E751462FEB}',
                  value: 'true',
                },
              ],
              actions: [
                {
                  fieldId: '42C7288EB84E4CBAAB6CE8201A184EC5',
                  actionTypeId: '{7F58C8DD-D7C0-4FB7-BB44-8EC6B5E1C3D9}',
                  value: null,
                },
              ],
            },
          ],
        },
        cssClassSettings: {
          manualCssClasses: '',
          cssClassOptions: [],
          cssClass: '',
        },
        cssClass: '',
        itemId: 'bbc18b9a-6665-473c-9e7c-738ecaf05b63',
        name: 'Section',
        templateId: '{8CDDB194-F456-4A75-89B7-346F8F39F95C}',
        fieldTypeItemId: '{447AA745-6D29-4B65-A5A3-8173AA8AF548}',
      },
    },
  ],
  contextItemId: 'bbaa4c63-231b-4cd3-92a9-71ef6ab66ff4',
};

export function findFieldConditions(fields: Field[]): void {
  fields.forEach((field, fieldIndex) => {
    // Recursively call for nested fields
    if (field.fields && Array.isArray(field.fields)) {
      findFieldConditions(field.fields);
    }

    const model = field.model;
    if (
      model &&
      model.conditionSettings &&
      Array.isArray(model.conditionSettings.fieldConditions)
    ) {
      console.log(`Field Condition Set (Outer Iteration ${fieldIndex + 1}):`);

      model.conditionSettings.fieldConditions.forEach((condition, conditionIndex) => {
        if (condition.conditions && condition.actions) {
          console.log(
            `Conditions (Condition Set ${conditionIndex + 1})---------:`,
            condition.conditions
          );

          condition.conditions.forEach((cond, condIndex) => {
            console.log(`Condition ${condIndex + 1} - Operator ID:`, cond.operatorId);
            console.log(`Condition ${condIndex + 1} - Value:`, cond.value);

            // Find and log the matching operator constant key if exists
            const operatorKey = Object.keys(OPERATOR_CONSTANTS).find(
              (key) =>
                OPERATOR_CONSTANTS[key as keyof typeof OPERATOR_CONSTANTS] === cond.operatorId
            );
            if (operatorKey) {
              console.log(`Condition ${condIndex + 1} - Operator Key:`, operatorKey);
            }
          });

          console.log(`Actions (Condition Set ${conditionIndex + 1})---------:`, condition.actions);
          condition.actions.forEach((action, actionIndex) => {
            console.log(`Action ${actionIndex + 1} - Action Type ID:`, action.actionTypeId);
            console.log(`Action ${actionIndex + 1} - Value:`, action.value);

            // Find and log the matching action constant key if exists
            const actionKey = Object.keys(ACTION_CONSTANTS).find(
              (key) =>
                ACTION_CONSTANTS[key as keyof typeof ACTION_CONSTANTS] === action.actionTypeId
            );
            if (actionKey) {
              console.log(`Action ${actionIndex + 1} - Action Key:`, actionKey);
            }
          });
        }
      });
    }
  });
}

// Call the function with the top-level fields array
findFieldConditions(data.fields);

export function findOperatorKeyByValue(value: string): string | undefined {
  return Object.keys(OPERATOR_CONSTANTS).find(
    (key) => OPERATOR_CONSTANTS[key as keyof typeof OPERATOR_CONSTANTS] === value
  );
}

// Function to search within ACTION_CONSTANTS
export function findActionKeyByValue(value: string): string | undefined {
  return Object.keys(ACTION_CONSTANTS).find(
    (key) => ACTION_CONSTANTS[key as keyof typeof ACTION_CONSTANTS] === value
  );
}
