import type { ComponentPropsOptions } from 'vue';

export const requiredDocumentTypeProps = {
  documentType: {
    type: String,
    required: true,
    validator: (value) => {
      return typeof value === 'string' && value.length > 1;
    },
  },
} satisfies ComponentPropsOptions;
