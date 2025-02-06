import type { FetchResponse } from 'ofetch';
import * as v from 'valibot';

export const useSchemaValidation = () => {
  const checkResponse = async <const TSchema extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>>(
    schema: TSchema,
    response: FetchResponse<v.InferOutput<TSchema>>,
  ) => {
    const result = v.safeParse(schema, response._data);
    if (result.success) {
      return result.output;
    }
    if (import.meta.dev) {
      try {
        await $fetch('/api/report-api-error', {
          method: 'POST',
          body: { url: response.url, issues: result.issues, response: response._data },
        });
      } finally {
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
      }
    }
    return response.body as v.InferOutput<TSchema>;
  };
  return {
    checkResponse,
  };
};
