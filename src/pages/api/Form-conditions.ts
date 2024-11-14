// pages/api/form-conditions.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { FormApiResponse } from '../../types/types';
export default function handler(req: NextApiRequest, res: NextApiResponse<FormApiResponse>) {
  res.status(200).json({
    fields: [
      { id: 'category', type: 'select', label: 'Category', options: ['A', 'B', 'C'] },
      { id: 'fieldA', type: 'text', label: 'Field A' },
      { id: 'fieldB', type: 'text', label: 'Field B' },
      { id: 'fieldC', type: 'text', label: 'Field C' },
    ],
    conditions: [
      { fieldId: 'fieldA', showIf: { field: 'category', value: 'A' } },
      { fieldId: 'fieldB', showIf: { field: 'category', value: 'B' } },
      { fieldId: 'fieldC', showIf: { field: 'category', value: 'C' } },
    ],
  });
}
