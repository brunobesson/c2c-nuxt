export default defineEventHandler(async event => {
  const config = useRuntimeConfig();
  const { url, issues, response } = await readBody<{ url: string; issues: unknown[]; response: unknown }>(event);
  try {
    await $fetch(config.public.apiEmailAlertsBase, {
      method: 'POST',
      body: {
        token: config.apiEmailAlertsToken,
        url,
        issues,
        response,
      },
    });
  } catch (error) {
    // do nothing
  }
});
