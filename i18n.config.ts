// Cf. https://www.unicode.org/cldr/charts/46/supplemental/language_plural_rules.html
// Default rule, enough for other languages if we do not handle "many":
// https://github.com/intlify/vue-i18n/blob/master/packages/core-base/src/runtime.ts#L302
// The rules below only handle integers
const russianRule = (choice: number, choicesLength: number) => {
  if (choice === 0) {
    return 0; // =0
  }

  const teen = choice > 10 && choice < 20;
  const endsWithOne = choice % 10 === 1;
  if (!teen && endsWithOne) {
    return 1; // one
  }
  if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
    return 2; // few
  }

  return choicesLength < 4 ? 2 : 3; // many
};
const slovenianRule = (choice: number, choicesLength: number) => {
  if (choice === 0) {
    return 0; // =0
  }
  switch (choice % 100) {
    case 1:
      return 1; // one
    case 2:
      return 2; // two
    case 3:
    case 4:
      return 3; // few
    default:
      return 4; // other
  }
};

export default defineI18nConfig(() => ({
  legacy: false,
  fallbackLocale: ['fr'],
  pluralRules: {
    ru: russianRule,
    sl: slovenianRule,
  },
}));
