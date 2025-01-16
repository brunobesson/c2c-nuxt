import * as v from 'valibot';

export const UI_LANGS = ['fr', 'it', 'de', 'en', 'es', 'ca', 'eu', 'hu', 'zh_CN', 'sl'] as const;
export const API_LANGS = ['fr', 'it', 'de', 'en', 'es', 'ca', 'eu', 'zh', 'sl'] as const;

export const UiLang = v.picklist(UI_LANGS);
export type UiLang = v.InferOutput<typeof UiLang>;
export const ApiLang = v.picklist(API_LANGS);
export type ApiLang = v.InferOutput<typeof ApiLang>;
