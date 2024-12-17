export const uiLangs = ['fr', 'it', 'de', 'en', 'es', 'ca', 'eu', 'hu', 'zh_CN', 'sl'];
export const apiLangs = ['fr', 'it', 'de', 'en', 'es', 'ca', 'eu', 'zh', 'sl'];

export function isUiLang(lang: string): lang is 'fr' | 'it' | 'de' | 'en' | 'es' | 'ca' | 'eu' | 'hu' | 'zh_CN' | 'sl' {
  return uiLangs.includes(lang);
}
