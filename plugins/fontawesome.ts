import {
  config,
  library,
  type IconDefinition,
} from '@fortawesome/fontawesome-svg-core';
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
import activityHiking from '~/assets/font-awesome-custom/js/activity/hiking';
import activityIce_climbing from '~/assets/font-awesome-custom/js/activity/ice_climbing';
import activityMountain_biking from '~/assets/font-awesome-custom/js/activity/mountain_biking';
import activityMountain_climbing from '~/assets/font-awesome-custom/js/activity/mountain_climbing';
import activityOther from '~/assets/font-awesome-custom/js/activity/other';
import activityParagliding from '~/assets/font-awesome-custom/js/activity/paragliding';
import activityRock_climbing from '~/assets/font-awesome-custom/js/activity/rock_climbing';
import activitySkitouring from '~/assets/font-awesome-custom/js/activity/skitouring';
import activitySlacklining from '~/assets/font-awesome-custom/js/activity/slacklining';
import activitySnow_ice_mixed from '~/assets/font-awesome-custom/js/activity/snow_ice_mixed';
import activitySnowshoeing from '~/assets/font-awesome-custom/js/activity/snowshoeing';
import activityVia_ferrata from '~/assets/font-awesome-custom/js/activity/via_ferrata';
import documentTypeOuting from '~/assets/font-awesome-custom/js/document-type/outing';
import drill from '~/assets/font-awesome-custom/js/miscs/drill';
import paragliding from '~/assets/font-awesome-custom/js/miscs/paragliding';
import sort from '~/assets/font-awesome-custom/js/miscs/sort';
import qualityDraft from '~/assets/font-awesome-custom/js/quality/draft';
import qualityEmpty from '~/assets/font-awesome-custom/js/quality/empty';
import qualityFine from '~/assets/font-awesome-custom/js/quality/fine';
import qualityGreat from '~/assets/font-awesome-custom/js/quality/great';
import qualityMedium from '~/assets/font-awesome-custom/js/quality/medium';
import waypointaccess from '~/assets/font-awesome-custom/js/waypoint/access';
import waypointbase_camp from '~/assets/font-awesome-custom/js/waypoint/base_camp';
import waypointbergschrund from '~/assets/font-awesome-custom/js/waypoint/bergschrund';
import waypointbisse from '~/assets/font-awesome-custom/js/waypoint/bisse';
import waypointbivouac from '~/assets/font-awesome-custom/js/waypoint/bivouac';
import waypointcamp_site from '~/assets/font-awesome-custom/js/waypoint/camp_site';
import waypointcanyon from '~/assets/font-awesome-custom/js/waypoint/canyon';
import waypointcave from '~/assets/font-awesome-custom/js/waypoint/cave';
import waypointcliff from '~/assets/font-awesome-custom/js/waypoint/cliff';
import waypointclimbing_indoor from '~/assets/font-awesome-custom/js/waypoint/climbing_indoor';
import waypointclimbing_outdoor from '~/assets/font-awesome-custom/js/waypoint/climbing_outdoor';
import waypointconfluence from '~/assets/font-awesome-custom/js/waypoint/confluence';
import waypointgite from '~/assets/font-awesome-custom/js/waypoint/gite';
import waypointglacier from '~/assets/font-awesome-custom/js/waypoint/glacier';
import waypointhut from '~/assets/font-awesome-custom/js/waypoint/hut';
import waypointlake from '~/assets/font-awesome-custom/js/waypoint/lake';
import waypointlocal_product from '~/assets/font-awesome-custom/js/waypoint/local_product';
import waypointlocality from '~/assets/font-awesome-custom/js/waypoint/locality';
import waypointmisc from '~/assets/font-awesome-custom/js/waypoint/misc';
import waypointparagliding_landing from '~/assets/font-awesome-custom/js/waypoint/paragliding_landing';
import waypointparagliding_takeoff from '~/assets/font-awesome-custom/js/waypoint/paragliding_takeoff';
import waypointpass from '~/assets/font-awesome-custom/js/waypoint/pass';
import waypointpit from '~/assets/font-awesome-custom/js/waypoint/pit';
import waypointshelter from '~/assets/font-awesome-custom/js/waypoint/shelter';
import waypointslackline_spot from '~/assets/font-awesome-custom/js/waypoint/slackline_spot';
import waypointsummit from '~/assets/font-awesome-custom/js/waypoint/summit';
import waypointvirtual from '~/assets/font-awesome-custom/js/waypoint/virtual';
import waypointwaterfall from '~/assets/font-awesome-custom/js/waypoint/waterfall';
import waypointwaterpoint from '~/assets/font-awesome-custom/js/waypoint/waterpoint';
import waypointwaypoints from '~/assets/font-awesome-custom/js/waypoint/waypoints';
import waypointweather_station from '~/assets/font-awesome-custom/js/waypoint/weather_station';
import waypointwebcam from '~/assets/font-awesome-custom/js/waypoint/webcam';

config.autoAddCss = false; // let Nuxt worry about the CSS

library.add(
  drill as IconDefinition,
  paragliding as IconDefinition,
  sort as IconDefinition,

  documentTypeOuting as IconDefinition,

  waypointaccess as IconDefinition,
  waypointbase_camp as IconDefinition,
  waypointbergschrund as IconDefinition,
  waypointbisse as IconDefinition,
  waypointbivouac as IconDefinition,
  waypointcamp_site as IconDefinition,
  waypointcanyon as IconDefinition,
  waypointcave as IconDefinition,
  waypointcliff as IconDefinition,
  waypointclimbing_indoor as IconDefinition,
  waypointclimbing_outdoor as IconDefinition,
  waypointconfluence as IconDefinition,
  waypointgite as IconDefinition,
  waypointglacier as IconDefinition,
  waypointhut as IconDefinition,
  waypointlake as IconDefinition,
  waypointlocality as IconDefinition,
  waypointlocal_product as IconDefinition,
  waypointmisc as IconDefinition,
  waypointparagliding_landing as IconDefinition,
  waypointparagliding_takeoff as IconDefinition,
  waypointpass as IconDefinition,
  waypointpit as IconDefinition,
  waypointshelter as IconDefinition,
  waypointslackline_spot as IconDefinition,
  waypointsummit as IconDefinition,
  waypointvirtual as IconDefinition,
  waypointwaterfall as IconDefinition,
  waypointwaterpoint as IconDefinition,
  waypointwaypoints as IconDefinition,
  waypointweather_station as IconDefinition,
  waypointwebcam as IconDefinition,

  activityHiking as IconDefinition,
  activityIce_climbing as IconDefinition,
  activityOther as IconDefinition,
  activityMountain_biking as IconDefinition,
  activityMountain_climbing as IconDefinition,
  activityParagliding as IconDefinition,
  activityRock_climbing as IconDefinition,
  activitySkitouring as IconDefinition,
  activitySlacklining as IconDefinition,
  activitySnowshoeing as IconDefinition,
  activitySnow_ice_mixed as IconDefinition,
  activityVia_ferrata as IconDefinition,

  qualityEmpty as IconDefinition,
  qualityDraft as IconDefinition,
  qualityMedium as IconDefinition,
  qualityFine as IconDefinition,
  qualityGreat as IconDefinition,

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
