import type { ComponentPropsOptions, PropType } from 'vue';
import type { Document } from '~/api/c2c.js';

export const requiredDocumentProps = {
  document: {
    type: Object as PropType<Document>,
    required: true,
  },
} satisfies ComponentPropsOptions;
