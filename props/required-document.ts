import type { ComponentPropsOptions, PropType } from 'vue';
import type { BaseDocument } from '~/api/c2c.js';

export const requiredDocumentProps = {
  document: {
    type: Object as PropType<BaseDocument>,
    required: true,
  },
} satisfies ComponentPropsOptions;
