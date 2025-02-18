import type { FieldType } from '@/types/components/form';

export const buildInitialFormState = (fields: FieldType[]) => {
  return fields?.reduce((initialSchema, field) => {
    if (field.type === 'input') {
      return {
        ...initialSchema,
        [field.name]: '',
      };
    }
    if (field.type === 'select') {
      return {
        ...initialSchema,
        [field.name]: '',
      };
    }
    if (field.type === 'textArea') {
      return {
        ...initialSchema,
        [field.name]: '',
      };
    }
    if (field.type === 'checkbox') {
      return {
        ...initialSchema,
        [field.name]: '',
      };
    }
  }, {});
};
