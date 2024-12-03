import { config, library } from '@fortawesome/fontawesome-svg-core';
import {
  faCreativeCommons,
  faFacebook,
  faGoogle,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import {
  faCircle,
  faClock,
  faHourglass,
  faTrashAlt,
  faWindowMaximize,
} from '@fortawesome/free-regular-svg-icons';
import {
  faAngleDown,
  faArrowLeft,
  faArrowRight,
  faArrowsAltV,
  faArrowUp,
  faAt,
  faAtlas,
  faBan,
  faBars,
  faBold,
  faBolt,
  faBomb,
  faBroom,
  faBug,
  faBullseye,
  faBus,
  faCalendar,
  faCamera,
  faChartBar,
  faCheck,
  faCheckCircle,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faCircleNotch,
  faCloud,
  faCode,
  faColumns,
  faComment,
  faComments,
  faCompass,
  faCompress,
  faDatabase,
  faDirections,
  faDownload,
  faEdit,
  faEllipsisVertical,
  faExclamation,
  faExclamationCircle,
  faExpand,
  faExternalLinkAlt,
  faEye,
  faEyeSlash,
  faFileDownload,
  faFilter,
  faFlag,
  faFlagCheckered,
  faGear,
  faGears,
  faGlobe,
  faGlobeAmericas,
  faGrin,
  faHashtag,
  faHeading,
  faHeart,
  faHistory,
  faHome,
  faImage,
  faInfo,
  faInfoCircle,
  faItalic,
  faKey,
  faLayerGroup,
  faLink,
  faList,
  faListOl,
  faListUl,
  faLocationCrosshairs,
  faLock,
  faMap,
  faMapMarkedAlt,
  faMapMarkerAlt,
  faMinus,
  faNewspaper,
  faObjectGroup,
  faPen,
  faPlug,
  faPlus,
  faPlusCircle,
  faPrint,
  faQuestionCircle,
  faRedoAlt,
  faRobot,
  faRotate,
  faRoute,
  faRuler,
  faSearch,
  faShareAlt,
  faSignInAlt,
  faSignOutAlt,
  faSortAmountDown,
  faSortAmountDownAlt,
  faSortAmountUp,
  faSquare,
  faStar,
  faSun,
  faTachometerAlt,
  faTag,
  faTh,
  faThLarge,
  faThList,
  faTrash,
  faUndoAlt,
  faUnlock,
  faUpload,
  faUser,
  faUserCheck,
  faUserLock,
  faUserPlus,
  faUsers,
  faUserShield,
  faWrench,
} from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeIcon,
  FontAwesomeLayers,
} from '@fortawesome/vue-fontawesome';
import activity_hiking from '~/assets/font-awesome-custom/activity/hiking.svg?icon';
import activity_ice_climbing from '~/assets/font-awesome-custom/activity/ice_climbing.svg?icon';
import activity_mountain_biking from '~/assets/font-awesome-custom/activity/mountain_biking.svg?icon';
import activity_mountain_climbing from '~/assets/font-awesome-custom/activity/mountain_climbing.svg?icon';
import activity_other from '~/assets/font-awesome-custom/activity/other.svg?icon';
import activity_paragliding from '~/assets/font-awesome-custom/activity/paragliding.svg?icon';
import activity_rock_climbing from '~/assets/font-awesome-custom/activity/rock_climbing.svg?icon';
import activity_skitouring from '~/assets/font-awesome-custom/activity/skitouring.svg?icon';
import activity_slacklining from '~/assets/font-awesome-custom/activity/slacklining.svg?icon';
import activity_snow_ice_mixed from '~/assets/font-awesome-custom/activity/snow_ice_mixed.svg?icon';
import activity_snowshoeing from '~/assets/font-awesome-custom/activity/snowshoeing.svg?icon';
import activity_via_ferrata from '~/assets/font-awesome-custom/activity/via_ferrata.svg?icon';
import document_type_outing from '~/assets/font-awesome-custom/document-type/outing.svg?icon';
import drill from '~/assets/font-awesome-custom/miscs/drill.svg?icon';
import paragliding from '~/assets/font-awesome-custom/miscs/paragliding.svg?icon';
import sort from '~/assets/font-awesome-custom/miscs/sort.svg?icon';
import quality_draft from '~/assets/font-awesome-custom/quality/draft.svg?icon';
import quality_empty from '~/assets/font-awesome-custom/quality/empty.svg?icon';
import quality_fine from '~/assets/font-awesome-custom/quality/fine.svg?icon';
import quality_great from '~/assets/font-awesome-custom/quality/great.svg?icon';
import quality_medium from '~/assets/font-awesome-custom/quality/medium.svg?icon';
import waypoint_access from '~/assets/font-awesome-custom/waypoint/access.svg?icon';
import waypoint_base_camp from '~/assets/font-awesome-custom/waypoint/base_camp.svg?icon';
import waypoint_bergschrund from '~/assets/font-awesome-custom/waypoint/bergschrund.svg?icon';
import waypoint_bisse from '~/assets/font-awesome-custom/waypoint/bisse.svg?icon';
import waypoint_bivouac from '~/assets/font-awesome-custom/waypoint/bivouac.svg?icon';
import waypoint_camp_site from '~/assets/font-awesome-custom/waypoint/camp_site.svg?icon';
import waypoint_canyon from '~/assets/font-awesome-custom/waypoint/canyon.svg?icon';
import waypoint_cave from '~/assets/font-awesome-custom/waypoint/cave.svg?icon';
import waypoint_cliff from '~/assets/font-awesome-custom/waypoint/cliff.svg?icon';
import waypoint_climbing_indoor from '~/assets/font-awesome-custom/waypoint/climbing_indoor.svg?icon';
import waypoint_climbing_outdoor from '~/assets/font-awesome-custom/waypoint/climbing_outdoor.svg?icon';
import waypoint_confluence from '~/assets/font-awesome-custom/waypoint/confluence.svg?icon';
import waypoint_gite from '~/assets/font-awesome-custom/waypoint/gite.svg?icon';
import waypoint_glacier from '~/assets/font-awesome-custom/waypoint/glacier.svg?icon';
import waypoint_hut from '~/assets/font-awesome-custom/waypoint/hut.svg?icon';
import waypoint_lake from '~/assets/font-awesome-custom/waypoint/lake.svg?icon';
import waypoint_local_product from '~/assets/font-awesome-custom/waypoint/local_product.svg?icon';
import waypoint_locality from '~/assets/font-awesome-custom/waypoint/locality.svg?icon';
import waypoint_misc from '~/assets/font-awesome-custom/waypoint/misc.svg?icon';
import waypoint_paragliding_landing from '~/assets/font-awesome-custom/waypoint/paragliding_landing.svg?icon';
import waypoint_paragliding_takeoff from '~/assets/font-awesome-custom/waypoint/paragliding_takeoff.svg?icon';
import waypoint_pass from '~/assets/font-awesome-custom/waypoint/pass.svg?icon';
import waypoint_pit from '~/assets/font-awesome-custom/waypoint/pit.svg?icon';
import waypoint_shelter from '~/assets/font-awesome-custom/waypoint/shelter.svg?icon';
import waypoint_slackline_spot from '~/assets/font-awesome-custom/waypoint/slackline_spot.svg?icon';
import waypoint_summit from '~/assets/font-awesome-custom/waypoint/summit.svg?icon';
import waypoint_virtual from '~/assets/font-awesome-custom/waypoint/virtual.svg?icon';
import waypoint_waterfall from '~/assets/font-awesome-custom/waypoint/waterfall.svg?icon';
import waypoint_waterpoint from '~/assets/font-awesome-custom/waypoint/waterpoint.svg?icon';
import waypoint_waypoints from '~/assets/font-awesome-custom/waypoint/waypoints.svg?icon';
import waypoint_weather_station from '~/assets/font-awesome-custom/waypoint/weather_station.svg?icon';
import waypoint_webcam from '~/assets/font-awesome-custom/waypoint/webcam.svg?icon';

config.autoAddCss = false; // let Nuxt worry about the CSS

library.add(
  drill,
  paragliding,
  sort,

  document_type_outing,

  waypoint_access,
  waypoint_base_camp,
  waypoint_bergschrund,
  waypoint_bisse,
  waypoint_bivouac,
  waypoint_camp_site,
  waypoint_canyon,
  waypoint_cave,
  waypoint_cliff,
  waypoint_climbing_indoor,
  waypoint_climbing_outdoor,
  waypoint_confluence,
  waypoint_gite,
  waypoint_glacier,
  waypoint_hut,
  waypoint_lake,
  waypoint_locality,
  waypoint_local_product,
  waypoint_misc,
  waypoint_paragliding_landing,
  waypoint_paragliding_takeoff,
  waypoint_pass,
  waypoint_pit,
  waypoint_shelter,
  waypoint_slackline_spot,
  waypoint_summit,
  waypoint_virtual,
  waypoint_waterfall,
  waypoint_waterpoint,
  waypoint_waypoints,
  waypoint_weather_station,
  waypoint_webcam,

  activity_hiking,
  activity_ice_climbing,
  activity_other,
  activity_mountain_biking,
  activity_mountain_climbing,
  activity_paragliding,
  activity_rock_climbing,
  activity_skitouring,
  activity_slacklining,
  activity_snowshoeing,
  activity_snow_ice_mixed,
  activity_via_ferrata,

  quality_empty,
  quality_draft,
  quality_medium,
  quality_fine,
  quality_great,

  // solid icons
  faAngleDown,
  faArrowsAltV,
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faAt,
  faAtlas,
  faBan,
  faBars,
  faBold,
  faBolt,
  faBomb,
  faBroom,
  faBug,
  faBus,
  faBullseye,
  faCalendar,
  faCamera,
  faChartBar,
  faCheck,
  faCheckCircle,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faChevronDown,
  faCircle,
  faCircleNotch,
  faCloud,
  faCode,
  faColumns,
  faComment,
  faComments,
  faCompass,
  faCompress,
  faDatabase,
  faDirections,
  faDownload,
  faEdit,
  faEllipsisVertical,
  faExclamation,
  faExclamationCircle,
  faExpand,
  faExternalLinkAlt,
  faEye,
  faEyeSlash,
  faFileDownload,
  faFilter,
  faFlag,
  faFlagCheckered,
  faGear,
  faGears,
  faGlobe,
  faGlobeAmericas,
  faGrin,
  faHashtag,
  faHeading,
  faHeart,
  faHistory,
  faHome,
  faImage,
  faInfo,
  faInfoCircle,
  faItalic,
  faKey,
  faLayerGroup,
  faLink,
  faList,
  faListOl,
  faListUl,
  faLock,
  faLocationCrosshairs,
  faMap,
  faMapMarkedAlt,
  faMapMarkerAlt,
  faMinus,
  faNewspaper,
  faObjectGroup,
  faPen,
  faPlug,
  faPlus,
  faPlusCircle,
  faPrint,
  faQuestionCircle,
  faRedoAlt,
  faRobot,
  faRotate,
  faRoute,
  faRuler,
  faSearch,
  faShareAlt,
  faSignInAlt,
  faSignOutAlt,
  faSortAmountDown,
  faSortAmountDownAlt,
  faSortAmountUp,
  faSquare,
  faStar,
  faSun,
  faTachometerAlt,
  faTag,
  faTh,
  faThLarge,
  faThList,
  faTrash,
  faUndoAlt,
  faUnlock,
  faUpload,
  faUser,
  faUserCheck,
  faUserLock,
  faUserPlus,
  faUsers,
  faUserShield,
  faWrench,

  // regular icons
  faCircle,
  faClock,
  faHourglass,
  faTrashAlt,
  faWindowMaximize,

  // brands icons
  faCreativeCommons,
  faFacebook,
  faGoogle,
  faInstagram,
  faYoutube
);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('fa-icon', FontAwesomeIcon);
  nuxtApp.vueApp.component('fa-layers', FontAwesomeLayers);
});
