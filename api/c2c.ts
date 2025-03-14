import * as v from 'valibot';
import { ApiLang, UiLang } from '~/api/lang.js';
import { IsoDate, IsoDateTime, PositiveInt, Uint } from '~/types/common.js';
import { LineString, MultiLineString, MultiPolygon, Point, Polygon } from '~/types/geojson.js';

const AccessCondition = v.picklist(['cleared', 'snowy', 'closed_snow', 'closed_cleared']);
export type AccessCondition = v.InferOutput<typeof AccessCondition>;
const AccessTime = v.picklist([
  '1min',
  '5min',
  '10min',
  '15min',
  '20min',
  '30min',
  '45min',
  '1h',
  '1h30',
  '2h',
  '2h30',
  '3h',
  '3h+',
]);
export type AccessTime = v.InferOutput<typeof AccessTime>;
const ActivityRate = v.picklist(['activity_rate_y5', 'activity_rate_m2', 'activity_rate_w1']);
export type ActivityRate = v.InferOutput<typeof ActivityRate>;
const AidRating = v.picklist(['A0', 'A0+', 'A1', 'A1+', 'A2', 'A2+', 'A3', 'A3+', 'A4', 'A4+', 'A5', 'A5+']);
export type AidRating = v.InferOutput<typeof AidRating>;
const AreaType = v.picklist(['range', 'admin_limits', 'country']);
export type AreaType = v.InferOutput<typeof AreaType>;
const ArticleCategory = v.picklist([
  'mountain_environment',
  'gear',
  'technical',
  'topoguide_supplements',
  'soft_mobility',
  'expeditions',
  'stories',
  'c2c_meetings',
  'tags',
  'site_info',
  'association',
]);
export type ArticleCategory = v.InferOutput<typeof ArticleCategory>;
const ArticleType = v.picklist(['collab', 'personal']);
export type ArticleType = v.InferOutput<typeof ArticleType>;
const AuthorStatus = v.picklist(['primary_impacted', 'secondary_impacted', 'internal_witness', 'external_witness']);
export type AuthorStatus = v.InferOutput<typeof AuthorStatus>;
const Autonomy = v.picklist(['non_autonomous', 'autonomous', 'expert']);
export type Autonomy = v.InferOutput<typeof Autonomy>;
const AvalancheLevel = v.picklist(['level_1', 'level_2', 'level_3', 'level_4', 'level_5', 'level_na']);
export type AvalancheLevel = v.InferOutput<typeof AvalancheLevel>;
const AvalancheSigns = v.picklist([
  'no',
  'danger_sign',
  'recent_avalanche',
  'natural_avalanche',
  'accidental_avalanche',
]);
export type AvalancheSigns = v.InferOutput<typeof AvalancheSigns>;
const AvalancheSlope = v.picklist(['slope_lt_30', 'slope_30_35', 'slope_35_40', 'slope_40_45', 'slope_gt_45']);
export type AvalancheSlope = v.InferOutput<typeof AvalancheSlope>;
const BookType = v.picklist([
  'topo',
  'environment',
  'historical',
  'biography',
  'photos-art',
  'novel',
  'technics',
  'tourism',
  'magazine',
]);
export type BookType = v.InferOutput<typeof BookType>;
const ChildrenProofType = v.picklist(['very_safe', 'safe', 'dangerous', 'very_dangerous']);
export type ChildrenProofType = v.InferOutput<typeof ChildrenProofType>;
const ClimbingIndoorType = v.picklist(['pitch', 'bloc']);
export type ClimbingIndoorType = v.InferOutput<typeof ClimbingIndoorType>;
const ClimbingOutdoorType = v.picklist(['single', 'multi', 'bloc', 'psicobloc']);
export type ClimbingOutdoorType = v.InferOutput<typeof ClimbingOutdoorType>;
const ClimbingRating = v.picklist([
  '2',
  '3a',
  '3b',
  '3c',
  '4a',
  '4b',
  '4c',
  '5a',
  '5a+',
  '5b',
  '5b+',
  '5c',
  '5c+',
  '6a',
  '6a+',
  '6b',
  '6b+',
  '6c',
  '6c+',
  '7a',
  '7a+',
  '7b',
  '7b+',
  '7c',
  '7c+',
  '8a',
  '8a+',
  '8b',
  '8b+',
  '8c',
  '8c+',
  '9a',
  '9a+',
  '9b',
  '9b+',
  '9c',
  '9c+',
]);
export type ClimbingRating = v.InferOutput<typeof ClimbingRating>;
const ClimbingStyle = v.picklist(['slab', 'vertical', 'overhang', 'roof', 'small_pillar', 'crack_dihedral']);
export type ClimbingStyle = v.InferOutput<typeof ClimbingStyle>;
const ConditionRating = v.picklist(['excellent', 'good', 'average', 'poor', 'awful']);
export type ConditionRating = v.InferOutput<typeof ConditionRating>;
const CustodianshipType = v.picklist(['accessible_when_wardened', 'always_accessible', 'key_needed', 'no_warden']);
export type CustodianshipType = v.InferOutput<typeof CustodianshipType>;
const EngagementRating = v.picklist(['I', 'II', 'III', 'IV', 'V', 'VI']);
export type EngagementRating = v.InferOutput<typeof EngagementRating>;
const EquipmentRating = v.picklist(['P1', 'P1+', 'P2', 'P2+', 'P3', 'P3+', 'P4', 'P4+']);
export type EquipmentRating = v.InferOutput<typeof EquipmentRating>;
const EventActivity = v.picklist([
  'sport_climbing',
  'multipitch_climbing',
  'alpine_climbing',
  'snow_ice_mixed',
  'ice_climbing',
  'skitouring',
  'other',
]);
export type EventActivity = v.InferOutput<typeof EventActivity>;
const EventType = v.picklist([
  'avalanche',
  'stone_ice_fall',
  'ice_cornice_collapse',
  'person_fall',
  'crevasse_fall',
  'physical_failure',
  'injury_without_fall',
  'blocked_person',
  'weather_event',
  'safety_operation',
  'critical_situation',
  'other',
]);
export type EventType = v.InferOutput<typeof EventType>;
const ExpositionRating = v.picklist(['E1', 'E2', 'E3', 'E4']);
export type ExpositionRating = v.InferOutput<typeof ExpositionRating>;
const ExpositionRockRating = v.picklist(['E1', 'E2', 'E3', 'E4', 'E5', 'E6']);
export type ExpositionRockRating = v.InferOutput<typeof ExpositionRockRating>;
const FrequentationType = v.picklist(['quiet', 'some', 'crowded', 'overcrowded']);
export type FrequentationType = v.InferOutput<typeof FrequentationType>;
const Gender = v.picklist(['male', 'female']);
export type Gender = v.InferOutput<typeof Gender>;
const GlacierGearType = v.picklist([
  'no',
  'glacier_safety_gear',
  'crampons_spring',
  'crampons_req',
  'glacier_crampons',
]);
export type GlacierGearType = v.InferOutput<typeof GlacierGearType>;
const GlacierRating = v.picklist(['easy', 'possible', 'difficult', 'impossible']);
export type GlacierRating = v.InferOutput<typeof GlacierRating>;
const GlobalRating = v.picklist([
  'F',
  'F+',
  'PD-',
  'PD',
  'PD+',
  'AD-',
  'AD',
  'AD+',
  'D-',
  'D',
  'D+',
  'TD-',
  'TD',
  'TD+',
  'ED-',
  'ED',
  'ED+',
  'ED4',
  'ED5',
  'ED6',
  'ED7',
]);
export type GlobalRating = v.InferOutput<typeof GlobalRating>;
const GroundType = v.picklist(['prairie', 'scree', 'snow']);
export type GroundType = v.InferOutput<typeof GlobalRating>;
const HikingRating = v.picklist(['T1', 'T2', 'T3', 'T4', 'T5']);
export type HikingRating = v.InferOutput<typeof GlobalRating>;
const HutStatus = v.picklist(['open_guarded', 'open_non_guarded', 'closed_hut']);
export type HutStatus = v.InferOutput<typeof GlobalRating>;
const IceRating = v.picklist(['1', '2', '3', '3+', '4', '4+', '5', '5+', '6', '6+', '7', '7+']);
export type IceRating = v.InferOutput<typeof GlobalRating>;
const ImageCategory = v.picklist([
  'landscapes',
  'detail',
  'action',
  'track',
  'rise',
  'descent',
  'topo',
  'people',
  'fauna',
  'flora',
  'nivology',
  'geology',
  'hut',
  'equipment',
  'book',
  'help',
  'misc',
]);
export type ImageCategory = v.InferOutput<typeof ImageCategory>;
const ImageType = v.picklist(['collaborative', 'personal', 'copyright']);
export type ImageType = v.InferOutput<typeof ImageType>;
const LabandeSkiRating = v.picklist(['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7']);
export type LabandeSkiRating = v.InferOutput<typeof LabandeSkiRating>;
const LiftStatus = v.picklist(['open', 'closed']);
export type LiftStatus = v.InferOutput<typeof LiftStatus>;
const MixedRating = v.picklist([
  'M1',
  'M2',
  'M3',
  'M3+',
  'M4',
  'M4+',
  'M5',
  'M5+',
  'M6',
  'M6+',
  'M7',
  'M7+',
  'M8',
  'M8+',
  'M9',
  'M9+',
  'M10',
  'M10+',
  'M11',
  'M11+',
  'M12',
  'M12+',
]);
export type MixedRating = v.InferOutput<typeof MixedRating>;
const Month = v.picklist(['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']);
export type Month = v.InferOutput<typeof Month>;
const MtbDownRating = v.picklist(['V1', 'V2', 'V3', 'V4', 'V5']);
export type MtbDownRating = v.InferOutput<typeof MtbDownRating>;
const MtbUpRating = v.picklist(['M1', 'M2', 'M3', 'M4', 'M5']);
export type MtbUpRating = v.InferOutput<typeof MtbUpRating>;
const OrientationType = v.picklist(['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']);
export type OrientationType = v.InferOutput<typeof OrientationType>;
const ParaglidingRating = v.picklist(['1', '2', '3', '4']);
export type ParaglidingRating = v.InferOutput<typeof ParaglidingRating>;
const ParkingFeeType = v.picklist(['yes', 'seasonal', 'no']);
export type ParkingFeeType = v.InferOutput<typeof ParkingFeeType>;
const PreviousInjury = v.picklist(['no', 'previous_injuries_2']);
export type PreviousInjury = v.InferOutput<typeof PreviousInjury>;
const ProductType = v.picklist(['farm_sale', 'restaurant', 'grocery', 'bar', 'sport_shop']);
export type ProductType = v.InferOutput<typeof ProductType>;
const PublicTransportationRating = v.picklist([
  'good service',
  'seasonal service',
  'poor service',
  'nearby service',
  'no service',
]);
const PublicTransportationType = v.picklist(['train', 'bus', 'service_on_demand', 'boat']);
export type PublicTransportationType = v.InferOutput<typeof PublicTransportationType>;
const Qualification = v.picklist(['federal_supervisor', 'federal_trainer', 'professional_diploma']);
export type Qualification = v.InferOutput<typeof Qualification>;
const QualityType = v.picklist(['empty', 'draft', 'medium', 'fine', 'great']);
export type QualityType = v.InferOutput<typeof QualityType>;
const RainProofType = v.picklist(['exposed', 'partly_protected', 'protected', 'inside']);
export type RainProofType = v.InferOutput<typeof RainProofType>;
const RiskRating = v.picklist(['X1', 'X2', 'X3', 'X4', 'X5']);
export type RiskRating = v.InferOutput<typeof RiskRating>;
const RockType = v.picklist([
  'basalte',
  'calcaire',
  'conglomerat',
  'craie',
  'gneiss',
  'gres',
  'granit',
  'migmatite',
  'mollasse_calcaire',
  'pouding',
  'quartzite',
  'rhyolite',
  'schiste',
  'trachyte',
  'artificial',
]);
export type RockType = v.InferOutput<typeof RockType>;
const RouteConfigurationType = v.picklist(['edge', 'pillar', 'face', 'corridor', 'goulotte', 'glacier']);
export type RouteConfigurationType = v.InferOutput<typeof RouteConfigurationType>;
const RouteDurationType = v.picklist(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '10+']);
export type RouteDurationType = v.InferOutput<typeof RouteDurationType>;
const RouteType = v.picklist(['return_same_way', 'loop', 'loop_hut', 'traverse', 'raid', 'expedition']);
export type RouteType = v.InferOutput<typeof RouteType>;
const Severity = v.picklist(['severity_no', '1d_to_3d', '4d_to_1m', '1m_to_3m', 'more_than_3m']);
export type Severity = v.InferOutput<typeof Severity>;
const SkiRating = v.picklist([
  '1.1',
  '1.2',
  '1.3',
  '2.1',
  '2.2',
  '2.3',
  '3.1',
  '3.2',
  '3.3',
  '4.1',
  '4.2',
  '4.3',
  '5.1',
  '5.2',
  '5.3',
  '5.4',
  '5.5',
  '5.6',
]);
export type SkiRating = v.InferOutput<typeof SkiRating>;
const SlacklineType = v.picklist(['slackline', 'highline', 'waterline']);
export type SlacklineType = v.InferOutput<typeof SlacklineType>;
const SnowClearanceRating = v.picklist([
  'often',
  'sometimes',
  'progressive',
  'naturally',
  'closed_in_winter',
  'non_applicable',
]);
export type SnowClearanceRating = v.InferOutput<typeof SnowClearanceRating>;
const SnowQualityRating = v.picklist(['excellent', 'good', 'average', 'poor', 'awful']);
export type SnowQualityRating = v.InferOutput<typeof SnowQualityRating>;
const SnowQuantityRating = v.picklist(['excellent', 'good', 'average', 'poor', 'awful']);
export type SnowQuantityRating = v.InferOutput<typeof SnowQuantityRating>;
const SnowshoeRating = v.picklist(['R1', 'R2', 'R3', 'R4', 'R5']);
export type SnowshoeRating = v.InferOutput<typeof SnowshoeRating>;
const Supervision = v.picklist(['no_supervision', 'federal_supervision', 'professional_supervision']);
export type Supervision = v.InferOutput<typeof Supervision>;
const UserCategory = v.picklist([
  'amateur',
  'mountain_guide',
  'mountain_leader',
  'ski_instructor',
  'climbing_instructor',
  'mountainbike_instructor',
  'paragliding_instructor',
  'hut_warden',
  'ski_patroller',
  'avalanche_forecaster',
  'club',
  'institution',
]);
export type UserCategory = v.InferOutput<typeof UserCategory>;
const ViaFerrataRating = v.picklist(['K1', 'K2', 'K3', 'K4', 'K5', 'K6']);
export type ViaFerrataRating = v.InferOutput<typeof ViaFerrataRating>;
export const WAYPOINT_TYPES = [
  'summit',
  'pass',
  'lake',
  'waterfall',
  'locality',
  'bisse',
  'canyon',
  'access',
  'climbing_outdoor',
  'climbing_indoor',
  'hut',
  'gite',
  'shelter',
  'bivouac',
  'camp_site',
  'base_camp',
  'local_product',
  'paragliding_takeoff',
  'paragliding_landing',
  'cave',
  'waterpoint',
  'weather_station',
  'webcam',
  'virtual',
  'slackline_spot',
  'misc',
] as const;
const WaypointType = v.picklist(WAYPOINT_TYPES);
export type WaypointType = v.InferOutput<typeof WaypointType>;
const WeatherStationType = v.picklist([
  'temperature',
  'wind_speed',
  'wind_direction',
  'humidity',
  'pressure',
  'precipitation',
  'precipitation_heater',
  'snow_height',
  'insolation',
]);
export type WeatherStationType = v.InferOutput<typeof WeatherStationType>;

export const LETTER_TYPES = ['a', 'c', 'i', 'm', 'o', 'r', 'u', 'w', 'b', 'x'] as const;
const LetterType = v.picklist(LETTER_TYPES);
export type LetterType = v.InferOutput<typeof LetterType>;

export const ACTIVITIES = [
  'skitouring',
  'snow_ice_mixed',
  'mountain_climbing',
  'rock_climbing',
  'ice_climbing',
  'hiking',
  'snowshoeing',
  'paragliding',
  'mountain_biking',
  'via_ferrata',
  'slacklining',
] as const;
const Activity = v.picklist(ACTIVITIES);
export type Activity = v.InferOutput<typeof Activity>;

const Geom = v.pipe(
  v.string(),
  v.transform(input => v.parse(Point, JSON.parse(input))),
);
const BaseGeometry = v.strictObject({
  version: PositiveInt,
  geom: Geom,
});
export type BaseGeometry = v.InferOutput<typeof BaseGeometry>;
const Geometry = v.strictObject({
  ...BaseGeometry.entries,
  geom_detail: v.nullable(
    v.pipe(
      v.string(),
      v.transform(input => v.parse(v.union([LineString, MultiLineString]), JSON.parse(input))),
    ),
  ),
});
export type Geometry = v.InferOutput<typeof Geometry>;
const NullableGometry = v.strictObject({ ...Geometry.entries, geom: v.nullable(Geom) });

export const DOCUMENT_TYPES = [
  'area',
  'article',
  'book',
  'image',
  'map',
  'outing',
  'profile',
  'route',
  'waypoint',
  'xreport',
] as const;
export type DocumentType = (typeof DOCUMENT_TYPES)[number];

const BaseLocale = v.strictObject({
  lang: ApiLang,
  version: PositiveInt,
  title: v.string(),
});
export type BaseLocale = v.InferOutput<typeof BaseLocale>;

const FullBaseLocale = v.strictObject({
  ...BaseLocale.entries,
  description: v.nullable(v.string()),
  summary: v.nullable(v.string()),
  topic_id: v.nullable(PositiveInt),
});
export type FullBaseLocale = v.InferOutput<typeof FullBaseLocale>;

const BaseDocument = v.strictObject({
  document_id: PositiveInt,
  type: LetterType,
  version: PositiveInt,
  protected: v.boolean(),
  available_langs: v.array(ApiLang),
  quality: QualityType,
  locales: v.array(BaseLocale),
});

const FullBaseDocument = v.strictObject({
  ...BaseDocument.entries,
  locales: v.array(FullBaseLocale),
  cooked: FullBaseLocale,
  associations: v.strictObject({}),
  geometry: Geometry,
  redirects_to: v.nullish(PositiveInt),
});

const BaseArea = v.strictObject({
  ...BaseDocument.entries,
  type: v.literal('a'),
  area_type: AreaType,
});

export const AreaListing = v.strictObject({
  ...v.omit(BaseArea, ['quality']).entries,
  available_langs: v.null(),
  locales: v.array(BaseLocale),
});
export type AreaListing = v.InferOutput<typeof AreaListing>;

const BaseArticle = v.strictObject({
  ...BaseDocument.entries,
  type: v.literal('c'),
  activities: v.array(Activity),
  categories: v.array(ArticleCategory),
  article_type: ArticleType,
});

export const ArticleListing = v.strictObject({
  ...BaseArticle.entries,
  locales: v.array(v.strictObject({ ...BaseLocale.entries, ...v.pick(FullBaseLocale, ['summary']).entries })),
});
export type ArticleListing = v.InferOutput<typeof ArticleListing>;

const BaseBook = v.strictObject({
  ...BaseDocument.entries,
  type: v.literal('b'),
  author: v.nullable(v.string()),
  activities: v.array(Activity),
  book_types: v.array(BookType),
});

export const BookListing = v.strictObject({
  ...BaseBook.entries,
  locales: v.array(v.strictObject({ ...BaseLocale.entries, ...v.pick(FullBaseLocale, ['summary']).entries })),
});
export type BookListing = v.InferOutput<typeof BookListing>;

const BaseImage = v.strictObject({
  ...BaseDocument.entries,
  type: v.literal('i'),
  areas: v.array(AreaListing),
  author: v.nullable(v.string()),
  filename: v.string(),
});

export const ImageListing = v.strictObject({
  ...v.omit(BaseImage, ['quality']).entries,
  geometry: v.nullable(
    v.strictObject({
      ...BaseGeometry.entries,
      geom: v.nullable(
        v.pipe(
          v.string(),
          v.transform(input => v.parse(Point, JSON.parse(input))),
        ),
      ),
    }),
  ),
});
export type ImageListing = v.InferOutput<typeof ImageListing>;

const BaseMap = v.strictObject({
  ...BaseDocument.entries,
  type: v.literal('m'),
  areas: v.array(AreaListing),
  code: v.nullable(v.string()),
  editor: v.nullable(v.string()),
});

export const MapListing = v.strictObject({
  ...BaseMap.entries,
});
export type MapListing = v.InferOutput<typeof MapListing>;

const BaseOuting = v.strictObject({
  ...BaseDocument.entries,
  type: v.literal('o'),
  areas: v.array(AreaListing),
  activities: v.array(Activity),
  date_end: IsoDate,
  date_start: IsoDate,
  condition_rating: v.nullable(ConditionRating),
  elevation_max: v.nullable(v.number()),
  engagement_rating: v.nullish(EngagementRating), // snow_ice_mixed, mountain_climbing, rock_climbing
  equipment_rating: v.nullish(EquipmentRating), // rock_climbing
  global_rating: v.nullish(GlobalRating), // snow_ice_mixed, mountain_climbing, rock_climbing, ice_climbing
  height_diff_difficulties: v.nullish(v.number()), // snow_ice_mixed, mountain_climbing
  height_diff_up: v.nullable(v.number()),
  hiking_rating: v.nullish(HikingRating), // hiking
  ice_rating: v.nullish(IceRating), // ice_climbing
  labande_global_rating: v.nullish(GlobalRating), // skitouring
  mtb_down_rating: v.nullish(MtbDownRating), // mountain_biking
  mtb_up_rating: v.nullish(MtbUpRating), // mountain_biking
  public_transport: v.nullable(v.boolean()),
  rock_free_rating: v.nullish(ClimbingRating), // rock_climbing
  ski_rating: v.nullish(SkiRating), // skitouring
  snowshoe_rating: v.nullish(SnowshoeRating), // snowshoeing
  via_ferrata_rating: v.nullish(ViaFerrataRating), // via_ferrata
});

export const OutingListing = v.strictObject({
  ...BaseOuting.entries,
  author: v.strictObject({
    name: v.string(),
    user_id: PositiveInt,
  }),
  img_count: Uint,
  locales: v.array(v.strictObject({ ...BaseLocale.entries, ...v.pick(FullBaseLocale, ['summary']).entries })),
  geometry: v.strictObject({ ...v.omit(Geometry, ['geom_detail']).entries, has_geom_detail: v.boolean() }),
});
export type OutingListing = v.InferOutput<typeof OutingListing>;

const BaseProfile = v.strictObject({
  ...BaseDocument.entries,
  type: v.literal('u'),
  areas: v.array(AreaListing),
  activities: v.nullable(v.array(Activity)),
  categories: v.nullable(v.array(UserCategory)),
  name: v.pipe(v.string(), v.nonEmpty()),
  forum_username: v.pipe(v.string(), v.nonEmpty()),
});

const ProfileListing = v.strictObject({
  ...v.omit(BaseProfile, ['quality']).entries,
  locales: v.array(v.omit(BaseLocale, ['title'])),
});
export type ProfileListing = v.InferOutput<typeof ProfileListing>;

const BaseRoute = v.strictObject({
  ...BaseDocument.entries,
  type: v.literal('r'),
  areas: v.array(AreaListing),
  elevation_max: v.nullish(Uint), // NOT for slacklining
  elevation_min: v.nullish(Uint), // NOT for slacklining
  height_diff_access: v.nullish(Uint), // NOT for slacklining
  height_diff_difficulties: v.nullish(Uint), // NOT for slacklining
  height_diff_down: v.nullish(Uint), // NOT for slacklining
  height_diff_up: v.nullish(Uint), // NOT for slacklining
  activities: v.array(Activity),
  orientations: v.array(OrientationType),
  ski_rating: v.nullish(SkiRating), // skitouring
  ski_exposition: v.nullish(ExpositionRating), // skitouring
  labande_global_rating: v.nullish(GlobalRating), // skitouring
  labande_ski_rating: v.nullish(LabandeSkiRating), // skitouring
  global_rating: v.nullish(GlobalRating), // snow_ice_mixed, mountain_climbing, rock_climbing, ice_climbing
  engagement_rating: v.nullish(EngagementRating), // snow_ice_mixed, mountain_climbing, rock_climbing, ice_climbing, via_ferrata
  risk_rating: v.nullish(RiskRating), // snow_ice_mixed, mountain_climbing, rock_climbing, ice_climbing
  equipment_rating: v.nullish(EquipmentRating), // snow_ice_mixed, mountain_climbing, rock_climbing, ice_climbing, via_ferrata
  ice_rating: v.nullish(IceRating), // snow_ice_mixed, ice_climbing
  mixed_rating: v.nullish(MixedRating), // snow_ice_mixed, ice_climbing
  exposition_rock_rating: v.nullish(ExpositionRockRating), // mountain_climbing, rock_climbing
  rock_free_rating: v.nullish(ClimbingRating), // mountain_climbing, rock_climbing
  rock_required_rating: v.nullish(ClimbingRating), // mountain_climbing, rock_climbing
  aid_rating: v.nullish(AidRating), // mountain_climbing, rock_climbing
  climbing_outdoor_type: v.nullish(ClimbingOutdoorType), // rock_climbing
  hiking_mtb_exposition: v.nullish(ExpositionRating), // hiking, mountain_biking
  hiking_rating: v.nullish(HikingRating), // hiking
  snowshoe_rating: v.nullish(SnowshoeRating), // snowshoeing
  mtb_down_rating: v.nullish(MtbDownRating), // mountain_biking
  mtb_up_rating: v.nullish(MtbUpRating), // mountain_biking
  via_ferrata_rating: v.nullish(ViaFerrataRating), // via_ferrata
  route_length: v.nullish(Uint), // slacklining
  slackline_height: v.nullish(Uint), // slacklining
  slackline_type: v.nullish(SlacklineType), // slacklining
});

export const RouteListing = v.strictObject({
  ...BaseRoute.entries,
  locales: v.array(
    v.strictObject({
      ...BaseLocale.entries,
      ...v.pick(FullBaseLocale, ['summary']).entries,
      title_prefix: v.nullable(v.string()),
    }),
  ),
  geometry: v.strictObject({ ...v.omit(Geometry, ['geom_detail']).entries, has_geom_detail: v.boolean() }),
});
export type RouteListing = v.InferOutput<typeof RouteListing>;

const BaseWaypoint = v.strictObject({
  ...BaseDocument.entries,
  type: v.literal('w'),
  areas: v.array(AreaListing),
  elevation: Uint,
  waypoint_type: WaypointType,
});

export const WaypointListing = v.strictObject({
  ...BaseWaypoint.entries,
  public_transportation_rating: v.nullish(PublicTransportationRating), // access
  slackline_length_max: v.nullish(v.pipe(v.number(), v.integer(), v.minValue(1), v.finite())), // slackline_spot
  slackline_length_min: v.nullish(v.pipe(v.number(), v.integer(), v.minValue(1), v.finite())), // slackline_spot
  slackline_types: v.nullish(v.array(SlacklineType)),
  locales: v.array(
    v.strictObject({
      ...BaseLocale.entries,
      ...v.pick(FullBaseLocale, ['summary']).entries,
      access_period: v.nullish(v.string()), // climbing_outdoor
    }),
  ),
  geometry: v.omit(Geometry, ['geom_detail']),
});
export type WaypointListing = v.InferOutput<typeof WaypointListing>;

const BaseXreport = v.strictObject({
  ...BaseDocument.entries,
  type: v.literal('x'),
  areas: v.array(AreaListing),
  elevation: v.nullable(Uint),
  date: IsoDate,
  event_type: v.nullable(EventType),
  event_activity: v.nullable(EventActivity),
  nb_participants: v.nullable(v.pipe(v.number(), v.integer(), v.minValue(1), v.finite())),
  nb_impacted: v.nullable(Uint),
  avalanche_level: v.nullable(AvalancheLevel),
  avalanche_slope: v.nullable(AvalancheSlope),
  severity: v.nullable(Severity),
});

export const XreportListing = v.strictObject({
  ...BaseXreport.entries,
  geometry: BaseGeometry,
});
export type XreportListing = v.InferOutput<typeof XreportListing>;

export const Area = v.strictObject({
  ...BaseArea.entries,
  ...FullBaseDocument.entries,
  type: v.literal('a'),
  associations: v.strictObject({
    images: v.array(ImageListing),
  }),
  geometry: v.strictObject({
    ...BaseGeometry.entries,
    geom_detail: v.nullable(
      v.pipe(
        v.string(),
        v.transform(input => v.parse(v.union([Polygon, MultiPolygon]), JSON.parse(input))),
      ),
    ),
  }),
});
export type Area = v.InferOutput<typeof Area>;

export const Article = v.strictObject({
  ...BaseArticle.entries,
  ...v.omit(FullBaseDocument, ['geometry']).entries,
  type: v.literal('c'),
  associations: v.strictObject({
    articles: v.array(ArticleListing),
    books: v.array(BookListing),
    outings: v.array(OutingListing),
    routes: v.array(RouteListing),
    waypoints: v.array(WaypointListing),
    images: v.array(ImageListing),
    users: v.array(ProfileListing),
    xreports: v.array(XreportListing),
  }),
  author: v.strictObject({
    name: v.string(),
    user_id: PositiveInt,
  }),
});
export type Article = v.InferOutput<typeof Article>;

export const Book = v.strictObject({
  ...BaseBook.entries,
  ...FullBaseDocument.entries,
  type: v.literal('b'),
  associations: v.strictObject({
    articles: v.array(ArticleListing),
    routes: v.array(RouteListing),
    waypoints: v.array(WaypointListing),
    images: v.array(ImageListing),
  }),
  editor: v.nullable(v.string()),
  url: v.nullable(v.string()),
  isbn: v.nullable(v.string()),
  publication_date: v.nullable(v.string()),
  langs: v.array(ApiLang),
  nb_page: v.nullable(Uint),
});
export type Book = v.InferOutput<typeof Book>;

export const Image = v.strictObject({
  ...BaseImage.entries,
  ...FullBaseDocument.entries,
  type: v.literal('i'),
  associations: v.strictObject({
    areas: v.array(AreaListing),
    articles: v.array(ArticleListing),
    books: v.array(BookListing),
    outings: v.array(OutingListing),
    routes: v.array(RouteListing),
    waypoints: v.array(WaypointListing),
    images: v.array(ImageListing),
    users: v.array(ProfileListing),
    xreports: v.array(XreportListing),
  }),
  creator: v.strictObject({
    name: v.string(),
    user_id: PositiveInt,
  }),
  activities: v.array(Activity),
  camera_name: v.nullable(v.string()),
  date_time: IsoDateTime,
  elevation: v.nullable(Uint),
  height: v.pipe(v.number(), v.minValue(1), v.finite()),
  categories: v.array(ImageCategory),
  image_type: ImageType,
  iso_speed: v.nullable(Uint),
  file_size: v.pipe(v.number(), v.minValue(1), v.finite()),
  exposure_time: v.nullable(v.pipe(v.number(), v.minValue(0), v.finite())),
  focal_length: v.nullable(Uint),
  fnumber: v.nullable(v.pipe(v.number(), v.minValue(0), v.finite())),
  width: v.pipe(v.number(), v.minValue(1), v.finite()),
});
export type Image = v.InferOutput<typeof Image>;

export const Map = v.strictObject({
  ...BaseMap.entries,
  ...FullBaseDocument.entries,
  type: v.literal('m'),
  scale: v.nullable(v.string()),
});
export type Map = v.InferOutput<typeof Map>;

const ConditionLevel = v.strictObject({
  level_place: v.string(),
  level_snow_height_soft: v.string(),
  level_snow_height_total: v.string(),
  level_comment: v.string(),
});
export type ConditionLevel = v.InferOutput<typeof ConditionLevel>;
const ConditionLevels = v.nullable(
  v.pipe(
    v.string(),
    v.transform(input => v.parse(v.array(ConditionLevel), JSON.parse(input))),
  ),
);
const OutingLocale = v.strictObject({
  ...FullBaseLocale.entries,
  access_comment: v.nullable(v.string()),
  avalanches: v.nullable(v.string()),
  conditions_levels: ConditionLevels,
  conditions: v.nullable(v.string()),
  description: v.nullable(v.string()),
  hut_comment: v.nullable(v.string()),
  participants: v.nullable(v.string()),
  route_description: v.nullable(v.string()),
  summary: v.nullable(v.string()),
  timing: v.nullable(v.string()),
  weather: v.nullable(v.string()),
});
export const Outing = v.strictObject({
  ...BaseOuting.entries,
  ...FullBaseDocument.entries,
  type: v.literal('o'),
  locales: v.array(OutingLocale),
  cooked: OutingLocale,
  associations: v.strictObject({
    articles: v.array(ArticleListing),
    images: v.array(ImageListing),
    routes: v.array(RouteListing),
    users: v.array(ProfileListing),
    xreports: v.array(XreportListing),
  }),
  access_condition: v.nullable(AccessCondition),
  avalanche_signs: v.nullish(v.array(AvalancheSigns)),
  disable_comments: v.nullable(v.boolean()),
  elevation_access: v.nullable(v.number()),
  elevation_down_snow: v.nullish(v.number()),
  elevation_min: v.nullable(v.number()),
  elevation_up_snow: v.nullish(v.number()),
  frequentation: v.nullable(FrequentationType),
  glacier_rating: v.nullish(GlacierRating),
  height_diff_down: v.nullable(v.number()),
  hut_status: v.nullable(HutStatus),
  length_total: v.nullable(v.number()),
  lift_status: v.nullable(LiftStatus),
  partial_trip: v.nullable(v.boolean()),
  participant_count: v.nullable(v.number()),
  snow_quality: v.nullish(SnowQualityRating),
  snow_quantity: v.nullish(SnowQuantityRating),
});
export type Outing = v.InferOutput<typeof Outing>;

export const Profile = v.strictObject({
  ...BaseProfile.entries,
  ...FullBaseDocument.entries,
  type: v.literal('u'),
  // geom might be null for pofiles
  geometry: NullableGometry,
  associations: v.strictObject({
    images: v.array(ImageListing),
  }),
});
export type Profile = v.InferOutput<typeof Profile>;

const RouteLocale = v.strictObject({
  ...FullBaseLocale.entries,
  title_prefix: v.nullable(v.string()),
  slackline_anchor1: v.nullish(v.string()), // slacklining
  slackline_anchor2: v.nullish(v.string()), // slacklining
  slope: v.nullish(v.string()), // skitouring, snow_ice_mixed, ice_climbing, snowshoeing
  remarks: v.nullable(v.string()),
  gear: v.nullable(v.string()),
  external_resources: v.nullable(v.string()),
  route_history: v.nullable(v.string()),
});
export const Route = v.strictObject({
  ...BaseRoute.entries,
  ...FullBaseDocument.entries,
  type: v.literal('r'),
  locales: v.array(RouteLocale),
  cooked: RouteLocale,
  associations: v.strictObject({
    articles: v.array(ArticleListing),
    books: v.array(BookListing),
    images: v.array(ImageListing),
    routes: v.array(RouteListing),
    waypoints: v.array(WaypointListing),
    xreports: v.array(XreportListing),
    recent_outings: v.strictObject({
      documents: v.array(OutingListing),
      total: Uint,
    }),
  }),
  maps: v.array(MapListing),
  configuration: v.nullable(RouteConfigurationType),
  difficulties_height: v.nullable(Uint),
  durations: v.nullable(v.array(RouteDurationType)),
  glacier_gear: v.nullable(GlacierGearType),
  lift_access: v.nullable(v.boolean()),
  main_waypoint_id: v.nullable(PositiveInt),
  mtb_height_diff_portages: v.nullable(Uint),
  mtb_length_asphalt: v.nullable(Uint),
  mtb_length_trail: v.nullable(Uint),
  rock_types: v.nullable(v.array(RockType)),
  route_types: v.nullable(v.array(RouteType)),
});
export type Route = v.InferOutput<typeof Route>;

const WaypointLocale = v.strictObject({
  ...FullBaseLocale.entries,
  external_resources: v.nullable(v.string()),
  access: v.nullable(v.string()),
  access_period: v.nullable(v.string()),
});
export const Waypoint = v.strictObject({
  ...BaseWaypoint.entries,
  ...FullBaseDocument.entries,
  type: v.literal('w'),
  locales: v.array(WaypointLocale),
  cooked: WaypointLocale,
  associations: v.strictObject({
    articles: v.array(ArticleListing),
    books: v.array(BookListing),
    images: v.array(ImageListing),
    waypoints: v.array(WaypointListing),
    waypoint_children: v.array(WaypointListing),
    xreports: v.array(XreportListing),
    recent_outings: v.strictObject({
      documents: v.array(OutingListing),
      total: Uint,
    }),
    all_routes: v.strictObject({
      documents: v.array(RouteListing),
      total: Uint,
    }),
  }),
  maps: v.array(MapListing),
  access_time: v.nullable(AccessTime),
  best_periods: v.nullable(v.array(Month)),
  blanket_unstaffed: v.nullable(v.boolean()),
  capacity: v.nullable(Uint),
  capacity_staffed: v.nullable(Uint),
  children_proof: v.nullable(ChildrenProofType),
  climbing_indoor_types: v.nullable(v.array(ClimbingIndoorType)),
  climbing_outdoor_types: v.nullable(v.array(ClimbingOutdoorType)),
  climbing_rating_max: v.nullable(ClimbingRating),
  climbing_rating_min: v.nullable(ClimbingRating),
  climbing_styles: v.nullable(v.array(ClimbingStyle)),
  custodianship: v.nullable(v.boolean()),
  elevation_min: v.nullable(Uint),
  equipment_ratings: v.nullable(v.array(EquipmentRating)),
  gas_unstaffed: v.nullable(v.boolean()),
  ground_types: v.nullable(GroundType),
  heating_unstaffed: v.nullable(v.boolean()),
  height_max: v.nullable(Uint),
  height_median: v.nullable(Uint),
  height_min: v.nullable(Uint),
  length: v.nullable(Uint),
  lift_access: v.nullable(v.boolean()),
  maps_info: v.nullable(v.string()),
  matress_unstaffed: v.nullable(v.boolean()),
  orientations: v.nullable(v.array(OrientationType)),
  paragliding_rating: v.nullable(ParaglidingRating),
  parking_fee: v.nullable(v.boolean()),
  phone: v.nullable(v.string()),
  phone_custodian: v.nullable(v.string()),
  product_types: v.nullable(v.array(ProductType)),
  prominence: v.nullable(Uint),
  public_transportation_rating: v.nullable(PublicTransportationRating),
  public_transportation_types: v.nullable(v.array(PublicTransportationType)),
  rain_proof: v.nullable(v.boolean()),
  rock_types: v.nullable(v.array(RockType)),
  routes_quantity: v.nullable(Uint),
  slackline_length_max: v.nullable(Uint),
  slackline_length_min: v.nullable(Uint),
  slackline_types: v.nullable(v.array(SlacklineType)),
  waypoint_slope: v.nullable(v.string()),
  snow_clearance_rating: v.nullable(SnowClearanceRating),
  url: v.nullable(v.string()),
  weather_station_types: v.nullable(v.array(WeatherStationType)),
});
export type Waypoint = v.InferOutput<typeof Waypoint>;

const XreportLocale = v.strictObject({
  ...FullBaseLocale.entries,
  place: v.nullable(v.string()),
  access: v.nullable(v.string()),
  route_study: v.nullable(v.string()),
  conditions: v.nullable(v.string()),
  training: v.nullable(v.string()),
  motivations: v.nullable(v.string()),
  group_management: v.nullable(v.string()),
  risk: v.nullable(v.string()),
  time_management: v.nullable(v.string()),
  safety: v.nullable(v.string()),
  reduce_impact: v.nullable(v.string()),
  increase_impact: v.nullable(v.string()),
  modifications: v.nullable(v.string()),
  other_comments: v.nullable(v.string()),
});
export const Xreport = v.strictObject({
  ...BaseXreport.entries,
  ...FullBaseDocument.entries,
  type: v.literal('x'),
  locales: v.array(XreportLocale),
  cooked: XreportLocale,
  associations: v.strictObject({
    articles: v.array(ArticleListing),
    images: v.array(ImageListing),
    outings: v.array(OutingListing),
    routes: v.array(RouteListing),
    users: v.array(ProfileListing),
    waypoints: v.array(WaypointListing),
  }),
  author: v.strictObject({
    name: v.string(),
    user_id: PositiveInt,
  }),
  rescue: v.nullable(v.boolean()),
  qualification: v.nullable(Qualification),
  supervision: v.nullable(Supervision),
  anonymous: v.boolean(),
  // fields below are not visible to 'common' user
  author_status: v.nullish(AuthorStatus),
  activity_rate: v.nullish(ActivityRate),
  age: v.nullish(v.pipe(v.number(), v.integer(), v.minValue(1), v.finite())),
  gender: v.nullish(Gender),
  previous_injuries: v.nullish(PreviousInjury),
  autonomy: v.nullish(Autonomy),
});
export type Xreport = v.InferOutput<typeof Xreport>;

export type DocumentListing =
  | AreaListing
  | ArticleListing
  | BookListing
  | ImageListing
  | MapListing
  | OutingListing
  | ProfileListing
  | RouteListing
  | WaypointListing
  | XreportListing;

export type Document = Area | Article | Book | Image | Map | Outing | Profile | Route | Waypoint | Xreport;

export const AreaList = v.strictObject({
  documents: v.array(AreaListing),
  total: Uint,
});
export type AreaList = v.InferOutput<typeof AreaList>;

export const ArticleList = v.strictObject({
  documents: v.array(ArticleListing),
  total: Uint,
});
export type ArticleList = v.InferOutput<typeof ArticleList>;

export const BookList = v.strictObject({
  documents: v.array(BookListing),
  total: Uint,
});
export type BookList = v.InferOutput<typeof BookList>;

export const ImageList = v.strictObject({
  documents: v.array(ImageListing),
  total: Uint,
});
export type ImageList = v.InferOutput<typeof ImageList>;

export const MapList = v.strictObject({
  documents: v.array(MapListing),
  total: Uint,
});
export type MapList = v.InferOutput<typeof MapList>;

export const OutingList = v.strictObject({
  documents: v.array(OutingListing),
  total: Uint,
});
export type OutingList = v.InferOutput<typeof OutingList>;

export const RouteList = v.strictObject({
  documents: v.array(RouteListing),
  total: Uint,
});
export type RouteList = v.InferOutput<typeof RouteList>;

export const WaypointList = v.strictObject({
  documents: v.array(WaypointListing),
  total: Uint,
});
export type WaypointList = v.InferOutput<typeof WaypointList>;

export const XreportList = v.strictObject({
  documents: v.array(XreportListing),
  total: Uint,
});
export type XreportList = v.InferOutput<typeof XreportList>;

const VersionInfo = v.strictObject({
  version_id: PositiveInt,
  user_id: PositiveInt,
  name: v.pipe(v.string(), v.nonEmpty()),
  comment: v.string(),
  written_at: IsoDateTime,
  masked: v.boolean(),
});
export type VersionInfo = v.InferOutput<typeof VersionInfo>;

export const DocumentHistory = v.strictObject({
  title: v.string(),
  versions: v.pipe(v.array(VersionInfo), v.nonEmpty()),
});
export type DocumentHistory = v.InferOutput<typeof DocumentHistory>;

const BaseDocumentVersion = v.strictObject({
  version: VersionInfo,
  previous_version_id: v.nullable(PositiveInt),
  next_version_id: v.nullable(PositiveInt),
});

const AssociationHistoryDocument = v.strictObject({
  document_id: PositiveInt,
  type: LetterType,
  locales: v.pipe(
    v.array(
      v.strictObject({
        lang: ApiLang,
        title: v.string(),
      }),
    ),
    v.nonEmpty(),
  ),
});
export type AssociationHistoryDocument = v.InferOutput<typeof AssociationHistoryDocument>;
const AssociationHistoryUser = v.strictObject({
  user_id: PositiveInt,
  name: v.pipe(v.string(), v.nonEmpty()),
  forum_username: v.pipe(v.string(), v.nonEmpty()),
  robot: v.boolean(),
  blocked: v.boolean(),
  moderator: v.boolean(),
});
export type AssociationHistoryUser = v.InferOutput<typeof AssociationHistoryUser>;
const AssociationHistory = v.strictObject({
  parent_document: AssociationHistoryDocument,
  child_document: AssociationHistoryDocument,
  is_creation: v.boolean(),
  user: AssociationHistoryUser,
  written_at: IsoDateTime,
});
export const AssociationsHistory = v.strictObject({
  associations: v.array(AssociationHistory),
  count: Uint,
});
export type AssociationsHistory = v.InferOutput<typeof AssociationsHistory>;

const AreaVersionDocument = v.strictObject({
  ...v.omit(Area, ['available_langs', 'associations']).entries,
  locales: v.array(v.omit(FullBaseLocale, ['topic_id'])),
  cooked: v.omit(FullBaseLocale, ['topic_id']),
});
export type AreaVersionDocument = v.InferOutput<typeof AreaVersionDocument>;
export const AreaVersion = v.strictObject({
  ...BaseDocumentVersion.entries,
  document:
    // document version can be masked
    v.nullable(AreaVersionDocument),
});
export type AreaVersion = v.InferOutput<typeof AreaVersion>;

const ArticleVersionDocument = v.strictObject({
  ...v.omit(Article, ['available_langs', 'associations', 'author']).entries,
  locales: v.array(v.omit(FullBaseLocale, ['topic_id'])),
  cooked: v.omit(FullBaseLocale, ['topic_id']),
});
export type ArticleVersionDocument = v.InferOutput<typeof ArticleVersionDocument>;
export const ArticleVersion = v.strictObject({
  ...BaseDocumentVersion.entries,
  document:
    // document version can be masked
    v.nullable(ArticleVersionDocument),
});
export type ArticleVersion = v.InferOutput<typeof ArticleVersion>;

const BookVersionDocument = v.strictObject({
  ...v.omit(Book, ['available_langs', 'associations', 'author']).entries,
  locales: v.array(v.omit(FullBaseLocale, ['topic_id'])),
  cooked: v.omit(FullBaseLocale, ['topic_id']),
});
export type BookVersionDocument = v.InferOutput<typeof BookVersionDocument>;
export const BookVersion = v.strictObject({
  ...BaseDocumentVersion.entries,
  document:
    // document version can be masked
    v.nullable(BookVersionDocument),
});
export type BookVersion = v.InferOutput<typeof BookVersion>;

const ImageVersionDocument = v.strictObject({
  ...v.omit(Image, ['available_langs', 'associations', 'areas', 'creator']).entries,
  locales: v.array(v.omit(FullBaseLocale, ['topic_id'])),
  cooked: v.omit(FullBaseLocale, ['topic_id']),
});
export type ImageVersionDocument = v.InferOutput<typeof ImageVersionDocument>;
export const ImageVersion = v.strictObject({
  ...BaseDocumentVersion.entries,
  document:
    // document version can be masked
    v.nullable(ImageVersionDocument),
});
export type ImageVersion = v.InferOutput<typeof ImageVersion>;

// no map version is available

const OutingVersionDocument = v.strictObject({
  ...v.omit(Outing, ['available_langs', 'associations', 'areas']).entries,
  locales: v.array(v.omit(OutingLocale, ['topic_id'])),
  cooked: v.omit(OutingLocale, ['topic_id']),
});
export type OutingVersionDocument = v.InferOutput<typeof OutingVersionDocument>;
export const OutingVersion = v.strictObject({
  ...BaseDocumentVersion.entries,
  document:
    // document version can be masked
    v.nullable(OutingVersionDocument),
});
export type OutingVersion = v.InferOutput<typeof OutingVersion>;

// no profile version is available

const RouteVersionDocument = v.strictObject({
  ...v.omit(Route, ['available_langs', 'associations', 'maps', 'areas']).entries,
  locales: v.array(v.omit(RouteLocale, ['topic_id', 'title_prefix'])),
  cooked: v.omit(RouteLocale, ['topic_id', 'title_prefix']),
});
export type RouteVersionDocument = v.InferOutput<typeof RouteVersionDocument>;
export const RouteVersion = v.strictObject({
  ...BaseDocumentVersion.entries,
  document:
    // document version can be masked
    v.nullable(RouteVersionDocument),
});
export type RouteVersion = v.InferOutput<typeof RouteVersion>;

const WaypointVersionDocument = v.strictObject({
  ...v.omit(Waypoint, ['available_langs', 'associations', 'maps', 'areas']).entries,
  locales: v.array(v.omit(WaypointLocale, ['topic_id'])),
  cooked: v.omit(WaypointLocale, ['topic_id']),
});
export type WaypointVersionDocument = v.InferOutput<typeof WaypointVersionDocument>;
export const WaypointVersion = v.strictObject({
  ...BaseDocumentVersion.entries,
  document:
    // document version can be masked
    v.nullable(WaypointVersionDocument),
});
export type WaypointVersion = v.InferOutput<typeof WaypointVersion>;

const XreportVersionDocument = v.strictObject({
  ...v.omit(Xreport, ['available_langs', 'associations', 'areas', 'author']).entries,
  locales: v.array(v.omit(XreportLocale, ['topic_id'])),
  cooked: v.omit(XreportLocale, ['topic_id']),
});
export type XreportVersionDocument = v.InferOutput<typeof XreportVersionDocument>;
export const XreportVersion = v.strictObject({
  ...BaseDocumentVersion.entries,
  document:
    // document version can be masked
    v.nullable(XreportVersionDocument),
});
export type XreportVersion = v.InferOutput<typeof XreportVersion>;

const FeedItem = v.strictObject({
  id: PositiveInt,
  time: IsoDateTime,
  user: ProfileListing,
  change_type: v.picklist(['updated', 'created', 'added_photos']),
  document: v.variant('type', [
    AreaListing,
    ArticleListing,
    BookListing,
    ImageListing,
    MapListing,
    OutingListing,
    RouteListing,
    WaypointListing,
    XreportListing,
  ]),
  participants: v.array(ProfileListing),
  image1: v.nullable(ImageListing),
  image2: v.nullable(ImageListing),
  image3: v.nullable(ImageListing),
  more_images: v.boolean(),
});
export type FeedItem = v.InferOutput<typeof FeedItem>;
export const Feed = v.strictObject({
  feed: v.array(FeedItem),
  pagination_token: v.pipe(v.string(), v.nonEmpty()),
});
export type Feed = v.InferOutput<typeof Feed>;

const whatsnewLetters: Extract<LetterType, 'o' | 'u'>[] = ['o', 'u'];
const WhatsnewDocument = v.strictObject({
  version: PositiveInt,
  document_id: PositiveInt,
  title: v.string(),
  type: v.picklist(whatsnewLetters),
  quality: QualityType,
});
export type WhatsnewDocument = v.InferOutput<typeof WhatsnewDocument>;
const WhatsnewUser = v.strictObject({
  name: v.pipe(v.string(), v.nonEmpty()),
  username: v.pipe(v.string(), v.nonEmpty()),
  user_id: PositiveInt,
  lang: ApiLang,
});
export type WhatsnewUser = v.InferOutput<typeof WhatsnewUser>;
const WhatsnewItem = v.strictObject({
  document: WhatsnewDocument,
  comment: v.string(),
  lang: ApiLang,
  user: WhatsnewUser,
  version_id: PositiveInt,
  written_at: IsoDateTime,
});
export const Whatsnew = v.strictObject({
  feed: v.array(WhatsnewItem),
  pagination_token: v.pipe(v.string(), v.nonEmpty()),
});
export type Whatsnew = v.InferOutput<typeof Whatsnew>;

export const UserPreferences = v.variant('followed_only', [
  v.strictObject({
    followed_only: v.literal(false),
    activities: v.array(Activity),
    areas: v.array(AreaListing),
    langs: v.array(ApiLang),
  }),
  v.strictObject({
    followed_only: v.literal(true),
    activities: v.pipe(v.array(Activity), v.empty()),
    areas: v.array(AreaListing),
    langs: v.array(ApiLang),
  }),
]);
export type UserPreferences = v.InferOutput<typeof UserPreferences>;

export const Following = v.strictObject({ following: v.array(ProfileListing) });

export const IsFollowing = v.strictObject({ is_following: v.boolean() });

export const IsBlocked = v.strictObject({ blocked: v.boolean() });

export const IsTagged = v.strictObject({ todo: v.boolean() });

export const Account = v.strictObject({
  email: v.pipe(v.string(), v.email()),
  forum_username: v.pipe(v.string(), v.nonEmpty()),
  is_profile_public: v.boolean(),
  name: v.pipe(v.string(), v.nonEmpty()),
});

export const LoginResponse = v.strictObject({
  id: PositiveInt,
  name: v.pipe(v.string(), v.nonEmpty()),
  username: v.pipe(v.string(), v.nonEmpty()),
  forum_username: v.pipe(v.string(), v.nonEmpty()),
  lang: UiLang,
  token: v.pipe(v.string(), v.nonEmpty()),
  expire: v.pipe(v.number(), v.integer(), v.minValue(1), v.finite()),
  roles: v.pipe(v.array(v.picklist(['moderator'])), v.maxLength(1)),
  redirect_internal: v.nullable(v.pipe(v.string(), v.url())),
});
export type LoginResponse = v.InferOutput<typeof LoginResponse>;

export const LogoutResponse = v.strictObject({
  user: PositiveInt,
  logged_out_discourse_user: PositiveInt,
});
export type LogoutResponse = v.InferOutput<typeof LogoutResponse>;

export const RegisterResponse = v.strictObject({
  id: PositiveInt,
  username: v.pipe(v.string(), v.nonEmpty()),
  forum_username: v.pipe(v.string(), v.nonEmpty()),
  name: v.pipe(v.string(), v.nonEmpty()),
  email: v.pipe(v.string(), v.email()),
  email_validated: v.boolean(),
  moderator: v.boolean(),
});

export type CreateImagesInput = {
  images: Image[];
};

export const CreateImagesOutput = v.strictObject({
  images: v.pipe(v.array(v.strictObject({ document_id: PositiveInt })), v.nonEmpty()),
});

export const CookerResponse = v.record(v.string(), v.string());

export type License = 'by-sa' | 'by-nc-nd' | 'copyright';

export const CreateTopicOutput = v.object({
  topic_id: PositiveInt,
});

export type CreateTopicOutput = v.InferOutput<typeof CreateTopicOutput>;
