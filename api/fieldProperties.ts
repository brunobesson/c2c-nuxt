export default {
  access: {
    type: 'markdown',
    parent: 'locales',
  },
  access_comment: {
    type: 'markdown',
    parent: 'locales',
  },
  access_condition: {
    values: 'access_conditions',
  },
  access_period: {
    type: 'markdown',
    parent: 'locales',
  },
  access_time: {
    values: 'access_times',
    sortable: true,
  },
  activities: {
    values: 'activities',
    multiple: true,
    required: true,
    queryMode: 'activities',
    helper: '1063015#activities',
  },
  activity_rate: {
    values: 'activity_rates',
  },
  age: {
    type: 'number',
    min: 0,
    max: 120,
    units: 'years',
  },
  aid_rating: {
    values: 'aid_ratings',
    queryMode: 'valuesRangeSlider',
    i18n: false,
    helper: '133323#aid',
    sortable: true,
  },
  anonymous: {
    type: 'boolean',
    default: false,
  },
  area_type: {
    values: 'area_types',
    required: true,
  },
  areas: {
    type: 'document',
    parent: 'associations',
    documentType: 'area',
    multiple: true,
    url: 'a',
  },
  article_categories: {
    name: 'categories',
    values: 'article_categories',
    multiple: true,
    required: true,
  },
  article_type: {
    values: 'article_types',
    required: true,
  },
  articles: {
    type: 'document',
    parent: 'associations',
    documentType: 'article',
    multiple: true,
    url: 'c',
  },
  author: {
    minLength: 2,
    minLengthChinese: 1,
    i18n: false,
  },
  author_status: {
    values: 'author_statuses',
    helper: '1063015#author-status',
  },
  autonomy: {
    values: 'autonomies',
    helper: '1063015#autonomy',
  },
  avalanche_level: {
    values: 'avalanche_levels',
    helper: '1063015#avalanche-level',
  },
  avalanche_signs: {
    values: 'avalanche_signs',
    multiple: true,
    helper: '1063027#avalanche-signs',
  },
  avalanche_slope: {
    values: 'avalanche_slopes',
    helper: '1063015#avalanche-slope',
  },
  avalanches: {
    type: 'markdown',
    parent: 'locales',
  },
  best_periods: {
    values: 'months',
    multiple: true,
  },
  blanket_unstaffed: {
    type: 'boolean',
    nullable: true,
  },
  book_types: {
    values: 'book_types',
    multiple: true,
    required: true,
  },
  books: {
    type: 'document',
    parent: 'associations',
    documentType: 'book',
    multiple: true,
    url: 'b',
  },
  camera_name: {
    type: 'text',
  },
  capacity: {
    type: 'number',
    min: 0,
    max: 150,
  },
  capacity_staffed: {
    type: 'number',
    min: 0,
    max: 1000,
  },
  categories: {
    values: 'user_categories',
    multiple: true,
  },
  children_proof: {
    values: 'children_proof_types',
  },
  climbing_indoor_types: {
    values: 'climbing_indoor_types',
    multiple: true,
  },
  climbing_outdoor_type: {
    values: 'climbing_outdoor_types',
  },
  climbing_outdoor_types: {
    values: 'climbing_outdoor_types',
    multiple: true,
  },
  climbing_rating_max: {
    values: 'climbing_ratings',
    i18n: false,
    sortable: true,
  },
  climbing_rating_median: {
    values: 'climbing_ratings',
    i18n: false,
    sortable: true,
  },
  climbing_rating_min: {
    values: 'climbing_ratings',
    i18n: false,
    sortable: true,
  },
  climbing_styles: {
    values: 'climbing_styles',
    multiple: true,
  },
  code: {
    type: 'text',
  },
  condition_rating: {
    values: 'condition_ratings',
    queryMode: 'valuesRangeSlider',
    helper: '1063027#condition-rating',
  },
  conditions: {
    type: 'markdown',
    parent: 'locales',
  },
  conditions_levels: {
    type: 'Array',
    parent: 'locales',
    helper: '1063027#conditions_levels',
  },
  configuration: {
    values: 'route_configuration_types',
    multiple: true,
    helper: '1063045#configuration',
  },
  custodianship: {
    values: 'custodianship_types',
  },
  date: {
    type: 'date',
  },
  date_end: {
    type: 'date',
    required: true,
  },
  date_start: {
    type: 'date',
    required: true,
    queryMode: 'date',
  },
  dates: {
    type: 'dates',
    required: true,
    queryMode: 'dates',
  },
  date_time: {
    type: 'date_time',
  },
  description: {
    type: 'markdown',
    parent: 'locales',
  },
  difficulties_height: {
    type: 'number',
    min: 0,
    max: 9000,
    unit: 'm',
    helper: '1063045#difficulties-height',
  },
  disable_comments: {
    type: 'boolean',
    default: false,
  },
  durations: {
    values: 'route_duration_types',
    multiple: true,
    i18n: false,
    queryMode: 'valuesRangeSlider',
    unit: 'day',
  },
  editor: {
    minLength: 2,
    minLengthChinese: 1,
  },
  elevation: {
    type: 'number',
    min: 0,
    max: 9000,
    unit: 'm',
    sortable: true,
  },
  elevation_access: {
    type: 'number',
    min: 0,
    max: 9000,
    unit: 'm',
  },
  elevation_down_snow: {
    type: 'number',
    min: 0,
    max: 9000,
    unit: 'm',
    helper: '1063027#elevation-down_snow',
  },
  elevation_max: {
    type: 'number',
    min: 0,
    max: 9000,
    unit: 'm',
    sortable: true,
  },
  elevation_min: {
    type: 'number',
    min: 0,
    max: 9000,
    unit: 'm',
  },
  elevation_up_snow: {
    type: 'number',
    min: 0,
    max: 9000,
    unit: 'm',
    helper: '1063027#elevation-up_snow',
  },
  engagement_rating: {
    values: 'engagement_ratings',
    queryMode: 'valuesRangeSlider',
    i18n: false,
    helper: '133323#engagement',
    sortable: true,
  },
  equipment_rating: {
    values: 'equipment_ratings',
    queryMode: 'valuesRangeSlider',
    i18n: false,
    helper: '133323#equipment',
    sortable: true,
  },
  equipment_ratings: {
    values: 'equipment_ratings',
    multiple: true,
    i18n: false,
    helper: '133323#equipment',
  },
  event_activity: {
    values: 'event_activities',
    helper: '1063015#activities',
  },
  event_type: {
    values: 'event_types',
    helper: '1063015#event-type',
  },
  exposition_rock_rating: {
    values: 'exposition_rock_ratings',
    queryMode: 'valuesRangeSlider',
    i18n: false,
    helper: '133323#exposition',
    sortable: true,
  },
  exposure_time: {
    type: 'number',
    min: 0,
    max: 0,
    unit: 's',
  },
  external_resources: {
    type: 'markdown',
    parent: 'locales',
  },
  file_size: {
    type: 'number',
    disabled: true,
  },
  filename: {
    type: 'text',
    disabled: true,
  },
  fnumber: {
    type: 'number',
    prefix: 'f/',
  },
  focal_length: {
    type: 'number',
    min: 1,
    unit: 'mm',
  },
  frequentation: {
    values: 'frequentation_types',
    helper: '1063027#frequentation',
  },
  gas_unstaffed: {
    type: 'boolean',
    nullable: true,
  },
  gear: {
    type: 'markdown',
    parent: 'locales',
    helper: '1063045#gear',
  },
  gender: {
    values: 'genders',
  },
  glacier_gear: {
    values: 'glacier_gear_types',
    required: true,
    default: 'no',
  },
  glacier_rating: {
    values: 'glacier_ratings',
    queryMode: 'valuesRangeSlider',
    helper: '1063027#glacier-rating',
  },
  global_rating: {
    values: 'global_ratings',
    queryMode: 'valuesRangeSlider',
    i18n: false,
    helper: '133323#global-rating',
    sortable: true,
  },
  ground_types: {
    values: 'ground_types',
    multiple: true,
  },
  group_management: {
    type: 'markdown',
    parent: 'locales',
  },
  heating_unstaffed: {
    type: 'boolean',
    nullable: true,
  },
  height: {
    type: 'number',
    disabled: true,
  },
  height_diff_access: {
    type: 'number',
    min: 0,
    max: 3000,
    unit: 'm',
    helper: '1063045#height-diff-access',
  },
  height_diff_difficulties: {
    type: 'number',
    min: 0,
    max: 3000,
    unit: 'm',
    helper: '1063027#height-diff_difficulties',
    sortable: true,
  },
  height_diff_down: {
    type: 'number',
    min: 0,
    max: 9000,
    unit: 'm',
    helper: '1063027#height-diff_down',
  },
  height_diff_up: {
    type: 'number',
    min: 0,
    max: 9000,
    unit: 'm',
    helper: '1063027#height-diff_up',
    sortable: true,
  },
  height_max: {
    type: 'number',
    min: 0,
    max: 9000,
    unit: 'm',
  },
  height_median: {
    type: 'number',
    min: 0,
    max: 9000,
    unit: 'm',
  },
  height_min: {
    type: 'number',
    min: 0,
    max: 9000,
    unit: 'm',
  },
  hiking_mtb_exposition: {
    values: 'exposition_ratings',
    queryMode: 'valuesRangeSlider',
    i18n: false,
    helper: '106859#hiking-mtb-exposition',
  },
  hiking_rating: {
    values: 'hiking_ratings',
    queryMode: 'valuesRangeSlider',
    i18n: false,
    helper: '106859#hiking-rating',
    sortable: true,
  },
  hut_comment: {
    type: 'markdown',
    parent: 'locales',
  },
  hut_status: {
    values: 'hut_status',
  },
  lang: {
    parent: 'locales',
    values: 'langs',
  },
  images: {
    type: 'document',
    parent: 'associations',
    documentType: 'image',
    multiple: true,
  },
  ice_rating: {
    values: 'ice_ratings',
    queryMode: 'valuesRangeSlider',
    i18n: false,
    helper: '106871#ice-rating',
    sortable: true,
  },
  image_categories: {
    name: 'categories',
    values: 'image_categories',
    multiple: true,
  },
  image_type: {
    values: 'image_types',
    required: true,
    url: 'ityp',
  },
  increase_impact: {
    type: 'markdown',
    parent: 'locales',
    helper: '1063015#increase-impact',
  },
  isbn: {
    minLength: 9,
    maxLength: 17,
  },
  iso_speed: {
    type: 'number',
    min: 1,
    unit: 'ISO',
  },
  labande_global_rating: {
    values: 'global_ratings',
    queryMode: 'valuesRangeSlider',
    i18n: false,
    helper: '107675#labande-global_rating',
    sortable: true,
  },
  labande_ski_rating: {
    values: 'labande_ski_ratings',
    queryMode: 'valuesRangeSlider',
    i18n: false,
    helper: '107675#labande-ski-rating',
    sortable: true,
  },
  langs: {
    values: 'langs',
    multiple: true,
  },
  length: {
    type: 'number',
    min: 0,
    max: 9000,
    unit: 'm',
  },
  length_total: {
    type: 'number',
    min: 0,
    unit: 'm',
    queryMode: 'input',
  },
  lift_access: {
    type: 'boolean',
    nullable: true,
  },
  lift_status: {
    values: 'lift_status',
  },
  main_waypoint_id: {
    helper: '1063045#main-waypoint',
  },
  maps_info: {
    type: 'text',
  },
  matress_unstaffed: {
    type: 'boolean',
    nullable: true,
  },
  mixed_rating: {
    values: 'mixed_ratings',
    queryMode: 'valuesRangeSlider',
    i18n: false,
    helper: '106871#mixed-rating',
    sortable: true,
  },
  modifications: {
    type: 'markdown',
    parent: 'locales',
    helper: '1063015#modifications',
  },
  motivations: {
    type: 'markdown',
    parent: 'locales',
  },
  mtb_down_rating: {
    values: 'mtb_down_ratings',
    queryMode: 'valuesRangeSlider',
    i18n: false,
    helper: '922056#mtb-down_rating',
    sortable: true,
  },
  mtb_height_diff_portages: {
    type: 'number',
    min: 0,
    max: 5000,
    unit: 'm',
  },
  mtb_length_asphalt: {
    type: 'number',
    min: 0,
    max: 500000,
    unit: 'm',
  },
  mtb_length_trail: {
    type: 'number',
    min: 0,
    max: 500000,
    unit: 'm',
  },
  mtb_up_rating: {
    values: 'mtb_up_ratings',
    queryMode: 'valuesRangeSlider',
    i18n: false,
    helper: '922056#mtb-up_rating',
    sortable: true,
  },
  name: {
    disabled: true,
  },
  nb_impacted: {
    type: 'number',
    min: 0,
    max: 1000,
    helper: '1063015#nb-impacted',
  },
  nb_pages: {
    type: 'number',
    min: 0,
    max: 9000,
  },
  nb_participants: {
    type: 'number',
    min: 0,
    max: 1000,
  },
  orientations: {
    values: 'orientation_types',
    multiple: true,
    queryMode: 'orientations',
    i18n: false,
    helper: '1063045#orientations',
  },
  other_comments: {
    type: 'markdown',
    parent: 'locales',
  },
  outings: {
    type: 'document',
    parent: 'associations',
    documentType: 'outing',
    multiple: true,
    url: 'o',
  },
  paragliding_rating: {
    values: 'paragliding_ratings',
    queryMode: 'valuesRangeSlider',
    i18n: true,
  },
  parking_fee: {
    values: 'parking_fee_types',
  },
  partial_trip: {
    type: 'boolean',
    default: false,
  },
  participant_count: {
    type: 'number',
    min: 1,
    max: 9000,
  },
  participants: {
    parent: 'locales',
    type: 'text',
    helper: '1063027#participants',
  },
  phone: {
    type: 'tel',
  },
  phone_custodian: {
    type: 'tel',
  },
  place: {
    type: 'markdown',
    parent: 'locales',
  },
  previous_injuries: {
    values: 'previous_injuries',
  },
  product_types: {
    values: 'product_types',
    multiple: true,
  },
  prominence: {
    type: 'number',
    min: 0,
    max: 9000,
    unit: 'm',
  },
  protected: {
    type: 'boolean',
    default: false,
  },
  public_transport: {
    type: 'boolean',
    default: false,
  },
  public_transportation_rating: {
    values: 'public_transportation_ratings',
  },
  public_transportation_types: {
    values: 'public_transportation_types',
    multiple: true,
  },
  publication_date: {
    type: 'text',
  },
  qualification: {
    values: 'qualification',
  },
  quality: {
    values: 'quality_types',
    queryMode: 'valuesRangeSlider',
    i18n: true,
    default: 'draft',
  },
  rain_proof: {
    values: 'rain_proof_types',
  },
  reduce_impact: {
    type: 'markdown',
    parent: 'locales',
    helper: '1063015#reduce-impact',
  },
  remarks: {
    type: 'markdown',
    parent: 'locales',
  },
  rescue: {
    type: 'boolean',
    nullable: true,
    helper: '1063015#rescue',
  },
  risk: {
    type: 'markdown',
    parent: 'locales',
  },
  risk_rating: {
    values: 'risk_ratings',
    queryMode: 'valuesRangeSlider',
    i18n: false,
    helper: '133323#objective-danger',
    sortable: true,
  },
  rock_free_rating: {
    values: 'climbing_ratings',
    queryMode: 'valuesRangeSlider',
    i18n: false,
    helper: '133323#rock-free',
    sortable: true,
  },
  rock_required_rating: {
    values: 'climbing_ratings',
    queryMode: 'valuesRangeSlider',
    i18n: false,
    helper: '133323#rock-required',
    sortable: true,
  },
  rock_types: {
    values: 'rock_types',
    multiple: true,
  },
  route_description: {
    type: 'markdown',
    parent: 'locales',
  },
  route_history: {
    type: 'markdown',
    parent: 'locales',
  },
  route_length: {
    type: 'number',
    min: 0,
    max: 500000,
    unit: 'm',
    sortable: true,
  },
  route_study: {
    type: 'markdown',
    parent: 'locales',
  },
  route_types: {
    values: 'route_types',
    multiple: true,
    helper: '1063045#route-types',
  },
  routes: {
    type: 'document',
    parent: 'associations',
    documentType: 'route',
    multiple: true,
    helper: '1063027#routes',
    url: 'r',
  },
  routes_quantity: {
    type: 'number',
    min: 0,
    max: 9000,
  },
  safety: {
    type: 'markdown',
    parent: 'locales',
    helper: '1063015#safety',
  },
  scale: {
    type: 'text',
  },
  severity: {
    values: 'severities',
    helper: '1063015#severity',
  },
  ski_exposition: {
    values: 'exposition_ratings',
    queryMode: 'valuesRangeSlider',
    i18n: false,
    helper: '107675#ski-exposition',
    sortable: true,
  },
  ski_rating: {
    values: 'ski_ratings',
    queryMode: 'valuesRangeSlider',
    i18n: false,
    helper: '107675#ski-rating',
    sortable: true,
  },
  slackline_anchor1: {
    type: 'markdown',
    parent: 'locales',
  },
  slackline_anchor2: {
    type: 'markdown',
    parent: 'locales',
  },
  slackline_height: {
    type: 'number',
    min: 0,
    unit: 'm',
  },
  slackline_length_max: {
    type: 'number',
    min: 0,
    max: 9000,
    unit: 'm',
    sortable: false,
    _comment: 'not sortable: api responds 500',
  },
  slackline_length_min: {
    type: 'number',
    min: 0,
    max: 9000,
    unit: 'm',
    sortable: false,
    _comment: 'not sortable: api responds 500',
  },
  slackline_type: {
    values: 'slackline_types',
  },
  slackline_types: {
    values: 'slackline_types',
    multiple: true,
  },
  slope: {
    type: 'text',
    parent: 'locales',
  },
  waypoint_slope: {
    name: 'slope',
    type: 'number',
    min: 0,
    max: 99,
    unit: '°',
    skipSpaceBeforeUnit: true,
  },
  snow_clearance_rating: {
    values: 'snow_clearance_ratings',
  },
  snow_quality: {
    values: 'snow_quality_ratings',
  },
  snow_quantity: {
    values: 'snow_quantity_ratings',
  },
  snowshoe_rating: {
    values: 'snowshoe_ratings',
    queryMode: 'valuesRangeSlider',
    i18n: false,
    helper: '239491#snowshoe-rating',
    sortable: true,
  },
  summary: {
    type: 'markdown',
    parent: 'locales',
  },
  supervision: {
    values: 'supervision',
  },
  time_management: {
    type: 'markdown',
    parent: 'locales',
  },
  timing: {
    type: 'markdown',
    parent: 'locales',
  },
  title: {
    required: true,
    parent: 'locales',
    minLength: 3,
    minLengthChinese: 1,
    queryMode: 'input',
    url: 'q',
  },
  training: {
    type: 'markdown',
    parent: 'locales',
  },
  url: {
    type: 'url',
    minLength: 6,
  },
  users: {
    type: 'document',
    parent: 'associations',
    documentType: 'profile',
    multiple: true,
    helper: '1063027#users',
    url: 'u',
  },
  via_ferrata_rating: {
    values: 'via_ferrata_ratings',
    queryMode: 'valuesRangeSlider',
    i18n: false,
    helper: '925306#via-ferrata_rating',
    sortable: true,
  },
  waypoint_type: {
    values: 'waypoint_types',
  },
  waypoints: {
    type: 'document',
    parent: 'associations',
    documentType: 'waypoint',
    multiple: true,
    url: 'w',
  },
  weather: {
    type: 'markdown',
    parent: 'locales',
  },
  weather_station_types: {
    values: 'weather_station_types',
    multiple: true,
  },
  width: {
    type: 'number',
    disabled: true,
  },
  xreports: {
    type: 'document',
    parent: 'associations',
    documentType: 'xreport',
    multiple: true,
  },
} as Record<
  string,
  {
    type?: string;
    parent?: string;
    documentType?: string;
    multiple?: boolean;
    disabled?: boolean;
    values?: string;
    helper?: string;
  }
>; // TODO
