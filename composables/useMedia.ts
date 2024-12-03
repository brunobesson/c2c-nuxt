import { ref, watchEffect } from 'vue';

export const useMedia = (query: string) => {
  const matches = ref(true);

  watchEffect((onCleanup) => {
    const media = window.matchMedia(query);

    if (media.matches !== matches.value) {
      matches.value = media.matches;
    }

    const onChange = () => {
      matches.value = media.matches;
    };

    media.addEventListener('change', onChange);

    onCleanup(() => {
      media.removeEventListener('change', onChange);
    });
  });

  return matches;
};
