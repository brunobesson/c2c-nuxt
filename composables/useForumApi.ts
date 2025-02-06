import { Announcement, Latest, type Topic } from '~/api/forum.js';
import type { UiLang } from '~/api/lang.js';

const { checkResponse } = useSchemaValidation();

const EXCLUDED_CATEGORIES = [
  // https://forum.camptocamp.org/c/comments
  // document's comments
  29,

  // https://forum.camptocamp.org/c/petites-annonces
  // offers (petites annonces in french)
  40, // ski surf snowshoeing gears
  41, // ice, snow, mixt gears
  42, // climnbing gears
  43, // Misc gears
  44, // other offers
  45, // professionals

  // https://forum.camptocamp.org/c/apres-l-effort/partenaires
  // tinder for camptocamp ? ;)
  47,

  // https://forum.camptocamp.org/c/apres-l-effort/bistrot
  // all but subjects about mountain...
  54,

  // https://forum.camptocamp.org/c/archives/le-site-suggestions-bugs-et-problemes
  // Old V5 site's bugs reporting
  55,

  // https://forum.camptocamp.org/c/site-et-association/moderation-forums-topoguide-articles
  // Forum moderation
  56,

  // https://forum.camptocamp.org/c/site-et-association/traduction
  // traduction issues
  64,

  // https://forum.camptocamp.org/c/partenaires/partenaires-ski-surf-raquette-randonnee-trai
  // ski buddy finder
  94,

  // https://forum.camptocamp.org/c/partenaires/partenaires-escalade-sae
  // climbing buddy finder
  95,

  // https://forum.camptocamp.org/c/partenaires/co-voiturage
  // car-pooling
  96,

  // https://forum.camptocamp.org/c/petites-annonces/perdu-trouve
  // have you find/lost something in the moutain ? it's here!
  97,

  // https://forum.camptocamp.org/c/partenaires/partenaires-alpinisme-cascade-de-glace
  // mountaineering buddy finder
  113,

  // https://forum.camptocamp.org/c/site-et-association/v6-suggestions-bugs-et-problemes
  // Site's bugs reporting
  136,

  // https://forum.camptocamp.org/c/site-et-association/appli-mobile-suggestions-bugs
  // mobile application bugs reporting
  146,
];

export const useForumApi = () => {
  const $fetch = useNuxtApp().$forumFetch.raw;
  const baseUrl = useRuntimeConfig().public.forumBase;

  const getLatest = async (): Promise<Topic[]> => {
    const data = await checkResponse(
      Latest,
      await $fetch('/latest.json', {
        query: { exclude_categoriy_id: EXCLUDED_CATEGORIES },
      }),
    );
    const userAvatars = new Map<string, string>();
    data.users.forEach(user => userAvatars.set(user.username, user.avatar_template));
    return data.topic_list.topics.map(topic => ({
      ...topic,
      last_poster_avatar_template: userAvatars.get(topic.last_poster_username)!,
    }));
  };

  const getBoardAnnouncement = async (): Promise<Announcement> =>
    checkResponse(Announcement, await $fetch('/t/publication-ca.json'));

  const getSiteNotice = async (lang: UiLang): Promise<Announcement> =>
    checkResponse(Announcement, await $fetch(`/t/annonce-${['zh_CN', 'hu', 'sl'].includes(lang) ? 'en' : lang}.json`));

  const forumAvatarUrl = `${baseUrl}user_avatar/${baseUrl.replace('https://', '')}`;

  return {
    getLatest,
    getBoardAnnouncement,
    getSiteNotice,
    baseUrl,
    forumAvatarUrl,
  };
};
