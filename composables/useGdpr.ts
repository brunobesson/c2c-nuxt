type GdprChoice = {
  statistics: boolean;
  social: boolean;
  date: number;
};

const noChoice: GdprChoice = { statistics: false, social: false, date: 0 };

export const useGdpr = () => {
  const gdpr = useLocalStorage('gdpr.choice', noChoice);
  // if choice is over a year, consent must be asked again
  if (Date.now() - (gdpr.value?.date ?? 0) > 1000 * 60 * 60 * 24 * 365) {
    gdpr.value = noChoice;
  }

  const get = () => gdpr.value;

  const set = (newValue: Omit<GdprChoice, 'date'>) => {
    gdpr.value = newValue ? { ...newValue, date: Date.now() } : noChoice;
    if (newValue?.statistics) {
      // TODO ga.enable()
    } else {
      // TODO ga.disable()
    }
  };

  const setAll = (accept: boolean) => {
    set(accept ? { statistics: true, social: true } : { statistics: false, social: false });
  };

  return { get, set, setAll };
};
