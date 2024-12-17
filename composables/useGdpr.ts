type GdprChoice = {
  statistics: boolean;
  social: boolean;
  date: number;
};

export const useGdpr = () => {
  const gdpr = useStorage<GdprChoice>('gdpr.choice');
  // if choice is over a year, consent must be asked again
  if (Date.now() - (gdpr.value?.date ?? 0) > 1000 * 60 * 60 * 24 * 365) {
    gdpr.value = undefined;
  }

  const get = () => gdpr.value;

  const set = (newValue?: Omit<GdprChoice, 'date'>) => {
    gdpr.value = newValue ? { ...newValue, date: Date.now() } : undefined;
    if (newValue?.statistics) {
      // TODO ga.enable()
    } else {
      // TODO ga.disable()
    }
  };

  const setAll = (accept: boolean) => {
    set(
      accept
        ? { statistics: true, social: true }
        : { statistics: false, social: false }
    );
  };

  return { get, set, setAll };
};
