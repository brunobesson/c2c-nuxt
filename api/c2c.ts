import type { SetRequired, StringKeyOf } from 'type-fest';
import type { ApiLang } from '~/api/lang.js';
import type { ISODate, ISODateTime } from '../types/index.js';

export type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T;

export type AccessCondition = 'cleared' | 'snowy' | 'closed_snow' | 'closed_cleared';
export type AccessTime =
  | '1min'
  | '5min'
  | '10min'
  | '15min'
  | '20min'
  | '30min'
  | '45min'
  | '1h'
  | '1h30'
  | '2h'
  | '2h30'
  | '3h'
  | '3h+';
export type ActivityRate = 'activity_rate_y5' | 'activity_rate_m2' | 'activity_rate_w1';
export type AidRating = 'A0' | 'A0+' | 'A1' | 'A1+' | 'A2' | 'A2+' | 'A3' | 'A3+' | 'A4' | 'A4+' | 'A5' | 'A5+';
export type AreaType = 'range' | 'admin_limits' | 'country';
export type ArticleCategory =
  | 'mountain_environment'
  | 'gear'
  | 'technical'
  | 'topoguide_supplements'
  | 'soft_mobility'
  | 'expeditions'
  | 'stories'
  | 'c2c_meetings'
  | 'tags'
  | 'site_info'
  | 'association';
export type ArticleType = 'collab' | 'personal';
export type AuthorStatus = 'primary_impacted' | 'secondary_impacted' | 'internal_witness' | 'external_witness';
export type Autonomy = 'non_autonomous' | 'autonomous' | 'expert';
export type AvalancheLevel = 'level_1' | 'level_2' | 'level_3' | 'level_4' | 'level_5' | 'level_na';
export type AvalancheSigns = 'no' | 'danger_sign' | 'recent_avalanche' | 'natural_avalanche' | 'accidental_avalanche';
export type AvalancheSlope = 'slope_lt_30' | 'slope_30_35' | 'slope_35_40' | 'slope_40_45' | 'slope_gt_45';
export type BookType =
  | 'topo'
  | 'environment'
  | 'historical'
  | 'biography'
  | 'photos-art'
  | 'novel'
  | 'technics'
  | 'tourism'
  | 'magazine';

export type ChildrenProofType = 'very_safe' | 'safe' | 'dangerous' | 'very_dangerous';
export type ClimbingIndoorType = 'pitch' | 'bloc';
export type ClimbingOutdoorType = 'single' | 'multi' | 'bloc' | 'psicobloc';
export type ClimbingRating =
  | '2'
  | '3a'
  | '3b'
  | '3c'
  | '4a'
  | '4b'
  | '4c'
  | '5a'
  | '5a+'
  | '5b'
  | '5b+'
  | '5c'
  | '5c+'
  | '6a'
  | '6a+'
  | '6b'
  | '6b+'
  | '6c'
  | '6c+'
  | '7a'
  | '7a+'
  | '7b'
  | '7b+'
  | '7c'
  | '7c+'
  | '8a'
  | '8a+'
  | '8b'
  | '8b+'
  | '8c'
  | '8c+'
  | '9a'
  | '9a+'
  | '9b'
  | '9b+'
  | '9c'
  | '9c+';
export type ClimbingStyle = 'slab' | 'vertical' | 'overhang' | 'roof' | 'small_pillar' | 'crack_dihedral';
export type ConditionRating = 'excellent' | 'good' | 'average' | 'poor' | 'awful';
export type CustodianshipType = 'accessible_when_wardened' | 'always_accessible' | 'key_needed' | 'no_warden';
export type EngagementRating = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI';
export type EquipmentRating = 'P1' | 'P1+' | 'P2' | 'P2+' | 'P3' | 'P3+' | 'P4' | 'P4+';
export type EventActivity =
  | 'sport_climbing'
  | 'multipitch_climbing'
  | 'alpine_climbing'
  | 'snow_ice_mixed'
  | 'ice_climbing'
  | 'skitouring'
  | 'other';
export type EventType =
  | 'avalanche'
  | 'stone_ice_fall'
  | 'ice_cornice_collapse'
  | 'person_fall'
  | 'crevasse_fall'
  | 'physical_failure'
  | 'injury_without_fall'
  | 'blocked_person'
  | 'weather_event'
  | 'safety_operation'
  | 'critical_situation'
  | 'other';
export type ExpositionRating = 'E1' | 'E2' | 'E3' | 'E4';
export type ExpositionRockRating = 'E1' | 'E2' | 'E3' | 'E4' | 'E5' | 'E6';
export type FrequentationType = 'quiet' | 'some' | 'crowded' | 'overcrowded';
export type Gender = 'male' | 'female';
export type GlacierGearType = 'no' | 'glacier_safety_gear' | 'crampons_spring' | 'crampons_req' | 'glacier_crampons';
export type GlacierRating = 'easy' | 'possible' | 'difficult' | 'impossible';
export type GlobalRating =
  | 'F'
  | 'F+'
  | 'PD-'
  | 'PD'
  | 'PD+'
  | 'AD-'
  | 'AD'
  | 'AD+'
  | 'D-'
  | 'D'
  | 'D+'
  | 'TD-'
  | 'TD'
  | 'TD+'
  | 'ED-'
  | 'ED'
  | 'ED+'
  | 'ED4'
  | 'ED5'
  | 'ED6'
  | 'ED7';
export type GroundType = 'prairie' | 'scree' | 'snow';
export type HikingRating = 'T1' | 'T2' | 'T3' | 'T4' | 'T5';
export type HutStatus = 'open_guarded' | 'open_non_guarded' | 'closed_hut';
export type IceRating = '1' | '2' | '3' | '3+' | '4' | '4+' | '5' | '5+' | '6' | '6+' | '7' | '7+';
export type ImageCategory =
  | 'landscapes'
  | 'detail'
  | 'action'
  | 'track'
  | 'rise'
  | 'descent'
  | 'topo'
  | 'people'
  | 'fauna'
  | 'flora'
  | 'nivology'
  | 'geology'
  | 'hut'
  | 'equipment'
  | 'book'
  | 'help'
  | 'misc';
export type ImageType = 'collaborative' | 'personal' | 'copyright';
export type LabandeSkiRating = 'S1' | 'S2' | 'S3' | 'S4' | 'S5' | 'S6' | 'S7';
export type LiftStatus = 'open' | 'closed';
export type MixedRating =
  | 'M1'
  | 'M2'
  | 'M3'
  | 'M3+'
  | 'M4'
  | 'M4+'
  | 'M5'
  | 'M5+'
  | 'M6'
  | 'M6+'
  | 'M7'
  | 'M7+'
  | 'M8'
  | 'M8+'
  | 'M9'
  | 'M9+'
  | 'M10'
  | 'M10+'
  | 'M11'
  | 'M11+'
  | 'M12'
  | 'M12+';
export type Month = 'jan' | 'feb' | 'mar' | 'apr' | 'may' | 'jun' | 'jul' | 'aug' | 'sep' | 'oct' | 'nov' | 'dec';
export type MtbDownRating = 'V1' | 'V2' | 'V3' | 'V4' | 'V5';
export type MtbUpRating = 'M1' | 'M2' | 'M3' | 'M4' | 'M5';
export type OrientationType = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';
export type ParaglidingRating = '1' | '2' | '3' | '4';
export type ParkingFeeType = 'yes' | 'seasonal' | 'no';
export type PreviousInjury = 'no' | 'previous_injuries_2';
export type ProductType = 'farm_sale' | 'restaurant' | 'grocery' | 'bar' | 'sport_shop';
export type PublicTransportationRating =
  | 'good service'
  | 'seasonal service'
  | 'poor service'
  | 'nearby service'
  | 'no service';
export type PublicTransportationType = 'train' | 'bus' | 'service_on_demand' | 'boat';
export type Qualification = 'federal_supervisor' | 'federal_trainer' | 'professional_diploma';
export type QualityType = 'empty' | 'draft' | 'medium' | 'fine' | 'great';
export type RainProofType = 'exposed' | 'partly_protected' | 'protected' | 'inside';
export type RiskRating = 'X1' | 'X2' | 'X3' | 'X4' | 'X5';
export type RockType =
  | 'basalte'
  | 'calcaire'
  | 'conglomerat'
  | 'craie'
  | 'gneiss'
  | 'gres'
  | 'granit'
  | 'migmatite'
  | 'mollasse_calcaire'
  | 'pouding'
  | 'quartzite'
  | 'rhyolite'
  | 'schiste'
  | 'trachyte'
  | 'artificial';
export type RouteConfigurationType = 'edge' | 'pillar' | 'face' | 'corridor' | 'goulotte' | 'glacier';
export type RouteDurationType = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '10+';
export type RouteType = 'return_same_way' | 'loop' | 'loop_hut' | 'traverse' | 'raid' | 'expedition';
export type Severity = 'severity_no' | '1d_to_3d' | '4d_to_1m' | '1m_to_3m' | 'more_than_3m';
export type SkiRating =
  | '1.1'
  | '1.2'
  | '1.3'
  | '2.1'
  | '2.2'
  | '2.3'
  | '3.1'
  | '3.2'
  | '3.3'
  | '4.1'
  | '4.2'
  | '4.3'
  | '5.1'
  | '5.2'
  | '5.3'
  | '5.4'
  | '5.5'
  | '5.6';
export type SlacklineType = 'slackline' | 'highline' | 'waterline';
export type SnowClearanceRating =
  | 'often'
  | 'sometimes'
  | 'progressive'
  | 'naturally'
  | 'closed_in_winter'
  | 'non_applicable';
export type SnowQualityRating = 'excellent' | 'good' | 'average' | 'poor' | 'awful';
export type SnowQuantityRating = 'excellent' | 'good' | 'average' | 'poor' | 'awful';
export type SnowshoeRating = 'R1' | 'R2' | 'R3' | 'R4' | 'R5';
export type Supervision = 'no_supervision' | 'federal_supervision' | 'professional_supervision';
export type UserCategory =
  | 'amateur'
  | 'mountain_guide'
  | 'mountain_leader'
  | 'ski_instructor'
  | 'climbing_instructor'
  | 'mountainbike_instructor'
  | 'paragliding_instructor'
  | 'hut_warden'
  | 'ski_patroller'
  | 'avalanche_forecaster'
  | 'club'
  | 'institution';
export type ViaFerrataRating = 'K1' | 'K2' | 'K3' | 'K4' | 'K5' | 'K6';
export type WaypointType =
  | 'summit'
  | 'pass'
  | 'lake'
  | 'waterfall'
  | 'locality'
  | 'bisse'
  | 'canyon'
  | 'access'
  | 'climbing_outdoor'
  | 'climbing_indoor'
  | 'hut'
  | 'gite'
  | 'shelter'
  | 'bivouac'
  | 'camp_site'
  | 'base_camp'
  | 'local_product'
  | 'paragliding_takeoff'
  | 'paragliding_landing'
  | 'cave'
  | 'waterpoint'
  | 'weather_station'
  | 'webcam'
  | 'virtual'
  | 'slackline_spot'
  | 'misc';
export type WeatherStationType =
  | 'temperature'
  | 'wind_speed'
  | 'wind_direction'
  | 'humidity'
  | 'pressure'
  | 'precipitation'
  | 'precipitation_heater'
  | 'snow_height'
  | 'insolation';

export type LetterType = 'a' | 'c' | 'i' | 'm' | 'o' | 'r' | 'u' | 'w' | 'b' | 'x';

export type Activity =
  | 'skitouring'
  | 'snow_ice_mixed'
  | 'mountain_climbing'
  | 'rock_climbing'
  | 'ice_climbing'
  | 'hiking'
  | 'snowshoeing'
  | 'paragliding'
  | 'mountain_biking'
  | 'via_ferrata'
  | 'slacklining';

type Geometry = {
  version: number;
  geom: string;
  geom_detail?: string;
};

// TODO archive

export type BaseLocale = {
  lang: ApiLang;
  version: number;
  title: string;
  description?: string;
  summary?: string;
  topic_id?: number;
};

export type BaseDocument = {
  document_id: number;
  type: LetterType;
  version: number;
  protected: boolean;
  redirects_to?: number;
  quality: QualityType;
  geometry: Geometry;
  available_langs: ApiLang[];
  locales: BaseLocale[];
  cooked?: BaseLocale;
  associations: {};
};
export type Area = BaseDocument & {
  type: 'a';
  area_type: AreaType;
  associations: {
    images: ImageListing[];
  };
  geometry: SetRequired<Geometry, 'geom_detail'>;
};
export type AreaListingLocale = Pick<BaseLocale, 'title'>;
export type AreaListing = Pick<Area, StringKeyOf<BaseDocument> | 'area_type'> & { locales: AreaListingLocale[] };

export type Article = BaseDocument & {
  type: 'c';
  associations: {
    articles: ArticleListing[];
    books: BookListing[];
    outings: OutingListing[];
    routes: RouteListing[];
    waypoints: WaypointListing[];
    images: ImageListing[];
    users: ProfileListing[];
    xreports: XreportListing[];
  };
  activities: Activity[];
  categories: ArticleCategory[];
  article_type: ArticleType;
};
export type ArticleListingLocale = Pick<BaseLocale, 'title' | 'summary'>;
export type ArticleListing = Pick<
  Article,
  StringKeyOf<BaseDocument> | 'categories' | 'activities' | 'quality' | 'article_type'
> & { locales: ArticleListingLocale[] };

export type Book = BaseDocument & {
  type: 'b';
  associations: {
    articles: ArticleListing[];
    routes: RouteListing[];
    waypoints: WaypointListing[];
    images: ImageListing[];
  };
  author?: string;
  editor?: string;
  activities?: Activity[];
  url?: string;
  isbn?: string;
  book_types: BookType[];
  publication_date?: string;
  langs: ApiLang[];
  nb_page?: number;
};
export type BookListingLocale = Pick<BaseLocale, 'title' | 'summary'>;
export type BookListing = Pick<Book, StringKeyOf<BaseDocument> | 'activities' | 'author' | 'quality' | 'book_types'> & {
  locales: BookListingLocale[];
};

export type Image = BaseDocument & {
  type: 'i';
  associations: {
    areas: AreaListing[];
    articles: ArticleListing[];
    books: BookListing[];
    outings: OutingListing[];
    routes: RouteListing[];
    waypoints: WaypointListing[];
    images: ImageListing[];
    users: ProfileListing[];
    xreports: XreportListing[];
  };
  areas: AreaListing[];
  activities: Activity[];
  author?: string;
  camera_name?: string;
  date_time: ISODateTime;
  elevation?: number;
  height: number;
  categories?: ImageCategory[];
  image_type: ImageType;
  iso_speed?: number;
  file_size: number;
  filename: string;
  exposure_time?: number;
  focal_length?: number;
  fnumber?: number;
  width: number;
};
export type ImageListingLocale = Pick<BaseLocale, 'title'>;
export type ImageListing = Pick<Image, StringKeyOf<BaseDocument> | 'filename' | 'author' | 'areas'> & {
  locales: ImageListingLocale[];
  geometry: Pick<Geometry, 'geom'>;
};

export type Map = BaseDocument & { type: 'm'; areas: AreaListing[]; code?: string; scale?: string; editor?: string };
export type MapListingLocale = Pick<BaseLocale, 'title'>;
export type MapListing = Pick<Map, StringKeyOf<BaseDocument> | 'code' | 'editor' | 'areas'> & {
  locales: MapListingLocale;
};

export type OutingLocale = BaseLocale & {
  access_comment?: string;
  avalanches?: string;
  conditions_levels?: string;
  conditions?: string;
  description?: string;
  hut_comment?: string;
  participants?: string;
  route_description?: string;
  summary?: string;
  timing?: string;
  weather?: string;
};
export type Outing = BaseDocument & {
  type: 'o';
  locales: OutingLocale[];
  cooked?: OutingLocale;
  associations: {
    articles: ArticleListing[];
    images: ImageListing[];
    routes: RouteListing[];
    users: ProfileListing[];
    xreports: XreportListing[];
  };
  areas: AreaListing[];
  access_condition?: AccessCondition;
  activities: Activity[];
  avalanche_signs?: AvalancheSigns[];
  condition_rating?: ConditionRating;
  date_end: ISODate;
  date_start: ISODate;
  disable_comments: boolean;
  elevation_access?: number;
  elevation_down_snow?: number;
  elevation_max?: number;
  elevation_min?: number;
  elevation_up_snow?: number;
  engagement_rating?: EngagementRating;
  equipment_rating?: EquipmentRating;
  frequentation?: FrequentationType;
  glacier_rating?: GlacierRating;
  global_rating?: GlobalRating;
  height_diff_difficulties?: number;
  height_diff_down?: number;
  height_diff_up?: number;
  hiking_rating?: HikingRating;
  hut_status?: HutStatus;
  ice_rating?: IceRating;
  labande_global_rating?: GlobalRating;
  length_total?: number;
  lift_status?: LiftStatus;
  mtb_down_rating?: MtbDownRating;
  mtb_up_rating?: MtbUpRating;
  partial_trip: boolean;
  participant_count?: number;
  public_transport: boolean;
  rock_free_rating?: ClimbingRating;
  ski_rating?: SkiRating;
  snow_quality: SnowQualityRating;
  snow_quantity?: SnowQuantityRating;
  snowshoe_rating?: SnowshoeRating;
  via_ferrata_rating?: ViaFerrataRating;
};
export type OutingListingLocale = Pick<OutingLocale, 'title' | 'summary'>;
export type OutingListing = Pick<
  Outing,
  | StringKeyOf<BaseDocument>
  | 'areas'
  | 'activities'
  | 'date_start'
  | 'date_end'
  | 'elevation_max'
  | 'height_diff_up'
  | 'public_transport'
  | 'condition_rating'
  | 'quality'
  // skitouring
  | 'ski_rating'
  | 'labande_global_rating'
  // snow_ice_mixed
  | 'height_diff_difficulties'
  | 'global_rating'
  | 'engagement_rating'
  // mountain_climbing
  | 'global_rating'
  | 'engagement_rating'
  | 'height_diff_difficulties'
  // rock climbing
  | 'global_rating'
  | 'equipment_rating'
  | 'rock_free_rating'
  // ice_climbing
  | 'global_rating'
  | 'ice_rating'
  // hiking
  | 'hiking_rating'
  // snowshoeing
  | 'snowshoe_rating'
  // mountain_biking
  | 'mtb_up_rating'
  | 'mtb_down_rating'
  // via_ferrata
  | 'via_ferrata_rating'
> & {
  img_count: number;
  locales: OutingListingLocale;
  geometry: Pick<Geometry, 'geom'> & { has_geom_detail: boolean };
};

export type Profile = BaseDocument & {
  type: 'u';
  associations: {
    images: ImageListing[];
  };
  areas: AreaListing[];
  activities: Activity[];
  categories: UserCategory[];
  name: string;
  forum_username: string;
};
export type ProfileListing = Pick<
  Profile,
  StringKeyOf<BaseDocument> | 'name' | 'forum_username' | 'categories' | 'activities' | 'areas'
>;
export const isProfile = (doc: BaseDocument): doc is Profile => doc.type === 'u';

export type RouteLocale = BaseLocale & {
  title_prefix?: string;
  slackline_anchor1?: string;
  slackline_anchor2?: string;
  slope?: string;
  remarks?: string;
  gear?: string;
  external_resources?: string;
};
export type Route = BaseDocument & {
  type: 'r';
  locales: RouteLocale[];
  cooked?: RouteLocale;
  associations: {
    articles: ArticleListing[];
    books: BookListing[];
    images: ImageListing[];
    routes: RouteListing[];
    waypoints: WaypointListing[];
    xreports: XreportListing[];
    recent_outings: {
      documents: OutingListing[];
      total: number;
    };
  };

  areas: AreaListing[];
  maps: MapListing[];
  activities: Activity[];
  aid_rating?: AidRating;
  climbing_outdoor_type?: ClimbingOutdoorType;
  configuration?: RouteConfigurationType;
  difficulties_height?: number;
  durations?: RouteDurationType[];
  elevation_max?: number;
  elevation_min?: number;
  engagement_rating?: EngagementRating;
  equipment_rating?: EquipmentRating;
  exposition_rock_rating?: ExpositionRockRating;
  glacier_gear?: GlacierGearType;
  global_rating?: GlobalRating;
  height_diff_access?: number;
  height_diff_difficulties?: number;
  height_diff_down?: number;
  height_diff_up?: number;
  hiking_mtb_exposition?: ExpositionRating;
  hiking_rating?: HikingRating;
  ice_rating?: IceRating;
  labande_global_rating?: GlobalRating;
  labande_ski_rating?: LabandeSkiRating;
  lift_access?: boolean;
  main_waypoint_id?: number;
  mixed_rating?: MixedRating;
  mtb_down_rating?: MtbDownRating;
  mtb_height_diff_portages?: number;
  mtb_length_asphalt?: number;
  mtb_length_trail?: number;
  mtb_up_rating?: number;
  orientations?: OrientationType[];
  risk_rating?: RiskRating;
  rock_free_rating?: ClimbingRating;
  rock_required_rating?: ClimbingRating;
  rock_types?: RockType[];
  route_length?: number;
  route_types?: RouteType[];
  ski_exposition?: ExpositionRating;
  ski_rating?: SkiRating;
  slackline_height?: number;
  slackline_type?: SlacklineType;
  snowshoe_rating?: SnowshoeRating;
  via_ferrata_rating?: ViaFerrataRating;
};
export type RouteListingLocale = Pick<RouteLocale, 'title' | 'title_prefix' | 'summary'>;
export type RouteListing = Pick<
  Route,
  | StringKeyOf<BaseDocument>
  | 'areas'
  | 'elevation_max'
  | 'elevation_min'
  | 'height_diff_up'
  | 'height_diff_down'
  | 'height_diff_difficulties'
  | 'activities'
  | 'quality'
  | 'orientations'
  // skitouring
  | 'ski_rating'
  | 'ski_exposition'
  | 'labande_ski_rating'
  | 'labande_global_rating'
  // snow_ice_mixed
  | 'global_rating'
  | 'engagement_rating'
  | 'risk_rating'
  | 'equipment_rating'
  | 'ice_rating'
  | 'mixed_rating'
  // mountain_climbing
  | 'global_rating'
  | 'engagement_rating'
  | 'risk_rating'
  | 'equipment_rating'
  | 'exposition_rock_rating'
  | 'rock_free_rating'
  | 'rock_required_rating'
  | 'aid_rating'
  // rock_climbing
  | 'global_rating'
  | 'engagement_rating'
  | 'risk_rating'
  | 'equipment_rating'
  | 'exposition_rock_rating'
  | 'rock_free_rating'
  | 'rock_required_rating'
  | 'aid_rating'
  | 'climbing_outdoor_type'
  // ice_climbing
  | 'ice_rating'
  | 'global_rating'
  | 'engagement_rating'
  | 'risk_rating'
  | 'equipment_rating'
  | 'mixed_rating'
  // hiking
  | 'hiking_rating'
  | 'hiking_mtb_exposition'
  // snowshoeing
  | 'snowshoe_rating'
  // mountain_biking
  | 'mtb_down_rating'
  | 'mtb_up_rating'
  | 'hiking_mtb_exposition'
  // via_ferrata
  | 'via_ferrata_rating'
  | 'engagement_rating'
  | 'equipment_rating'
  // slacklining
  | 'route_length'
  | 'slackline_height'
  | 'activities'
  | 'quality'
  | 'orientations'
  | 'slackline_type'
> & {
  locales: RouteListingLocale[];
  geometry: Pick<Geometry, 'geom'> & { has_geom_details: boolean };
};
export const isRoute = (doc: BaseDocument): doc is Route | RouteListing => doc.type === 'r';

export type WaypointLocale = BaseLocale & { external_resources?: string; access?: string; access_period?: string };
export type Waypoint = BaseDocument & {
  type: 'w';
  locales: WaypointLocale[];
  cooked?: WaypointLocale;
  associations: {
    articles: ArticleListing[];
    books: BookListing[];
    images: ImageListing[];
    waypoints: WaypointListing[];
    waypoint_children: WaypointListing[];
    xreports: XreportListing[];
    recent_outings: {
      document: OutingListing[];
      total: number;
    };
    all_routes: {
      documents: RouteListing[];
      total: number;
    };
  };
  maps: MapListing[];
  access_time?: AccessTime;
  best_periods?: Month[];
  blanket_unstaffed?: boolean;
  capacity?: number;
  capacity_staffed?: number;
  children_proof?: ChildrenProofType;
  climbing_indoor_types?: ClimbingIndoorType[];
  climbing_outdoor_types?: ClimbingOutdoorType[];
  climbing_rating_max?: ClimbingRating;
  climbing_rating_min?: ClimbingRating;
  climbing_styles?: ClimbingStyle[];
  custodianship?: boolean;
  elevation: number;
  elevation_min?: number;
  equipment_ratings?: EquipmentRating;
  gas_unstaffed?: boolean;
  ground_types?: GroundType;
  heating_unstaffed?: boolean;
  height_max?: number;
  height_median?: number;
  height_min?: number;
  length?: number;
  lift_access?: boolean;
  maps_info?: string;
  matress_unstaffed?: boolean;
  orientations?: OrientationType[];
  paragliding_rating?: ParaglidingRating;
  parking_fee?: boolean;
  phone?: string;
  phone_custodian?: number;
  product_types?: ProductType[];
  prominence?: number;
  public_transportation_rating?: PublicTransportationRating;
  public_transportation_types?: PublicTransportationType[];
  rain_proof?: boolean;
  rock_types?: RockType[];
  routes_quantity?: number;
  slackline_length_max?: number;
  slackline_length_min?: number;
  slackline_types?: SlacklineType[];
  waypoint_slope?: string;
  snow_clearance_rating?: SnowClearanceRating;
  url?: string;
  waypoint_type: WaypointType;
  weather_station_types?: WeatherStationType[];
};
export type WaypointListingLocale = Pick<
  WaypointLocale,
  | 'title'
  | 'summary'
  // climbing_outdoor
  | 'access_period'
>;
export type WaypointListing = Pick<
  Waypoint,
  | StringKeyOf<BaseDocument>
  | 'elevation'
  | 'quality'
  | 'waypoint_type'
  // access
  | 'public_transportation_rating'
  // slackline_spot
  | 'slackline_types'
  | 'slackline_length_min'
  | 'slackline_length_max'
> & {
  locales: WaypointListingLocale;
  geometry: Pick<Geometry, 'geom'>;
};

export type XreportLocale = BaseLocale & {
  place?: string;
  access?: string;
  route_study?: string;
  conditions?: string;
  training?: string;
  motivations?: string;
  group_management?: string;
  risk?: string;
  time_management?: string;
  safety?: string;
  reduce_impact?: string;
  increase_impact?: string;
  modifications?: string;
  other_comments?: string;
};
export type Xreport = BaseDocument & {
  type: 'x';
  locales: XreportLocale[];
  cooked?: XreportLocale;
  associations: {
    articles: ArticleListing[];
    images: ImageListing[];
    outings: OutingListing[];
    routes: RouteListing[];
    users: ProfileListing[];
    waypoints: WaypointListing[];
  };
  elevation?: number;
  date: ISODate;
  event_type?: EventType;
  event_activity?: EventActivity;
  nb_participants?: number;
  nb_impacted?: number;
  rescue?: boolean;
  avalanche_level?: AvalancheLevel;
  avalanche_slope?: AvalancheSlope;
  severity?: Severity;
  author_status?: AuthorStatus;
  activity_rate?: ActivityRate;
  age?: number;
  gender?: Gender;
  previous_injuries?: PreviousInjury;
  autonomy?: Autonomy;
  qualification?: Qualification;
  supervision?: Supervision;
  anonymous: boolean;
};
export type XreportListingLocale = Pick<XreportLocale, 'title'>;
export type XreportListing = Pick<
  Xreport,
  | StringKeyOf<BaseDocument>
  | 'elevation'
  | 'date'
  | 'event_type'
  | 'event_activity'
  | 'nb_participants'
  | 'nb_impacted'
  | 'avalanche_level'
  | 'avalanche_slope'
  | 'severity'
  | 'quality'
> & { locales: XreportListingLocale[]; geometry: Pick<Geometry, 'geom'> };
export type Document = Area | Article | Image | Map | Outing | Route | Profile | Waypoint | Book | Xreport;
export type Documents<T extends Document> = { documents: T[]; total: number };

export type UserPreferences =
  | {
      followed_only: false;
      activities: Activity[];
      areas: AreaListing[];
      langs: ApiLang[];
    }
  | {
      followed_only: true;
      activities: never[];
      areas: never[];
      langs: never[];
    };

export type Query = Record<string, any>; // TODO
