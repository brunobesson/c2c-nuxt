import type { Document, DocumentListing } from '~/api/c2c.js';
import { isArea, isRoute, isWaypoint } from '~/types/common.js';

const mapping: Map<number, string> = new Map([
  // France
  // 14274: , 'https://www.helloasso.com/associations/rockclimber/formulaires/1/widget'

  // Buoux
  [102357, 'https://www.aptitudes-escalade.com/i-love-buoux/'],

  // Roche de Narse
  [926211, 'https://www.escalade-montagne.fr/falaise/bugey/roche-de-narse/'],

  // Greenspit
  // Mollans
  [947587, 'https://greenspits.com/topo/mollans-sur-ouveze/'],
  // Ramirole
  [1150854, 'https://greenspits.com/topo/la-ramirole-2/'],
  // Maupas
  [820728, 'https://greenspits.com/topo/la-carriere-du-maupas/'],

  // VTNO : Site et secteurs de Presles
  // Presles
  [107049, 'https://www.vtno.fr/adh%C3%A9sion/'],
  // Presles - Dalarhum
  [318456, 'https://www.vtno.fr/adh%C3%A9sion/'],
  // Presles - École d'artif
  [276273, 'https://www.vtno.fr/adh%C3%A9sion/'],
  // Presles - Triangle de Choranche
  [177942, 'https://www.vtno.fr/adh%C3%A9sion/'],
  // Presles - Daladom
  [176860, 'https://www.vtno.fr/adh%C3%A9sion/'],
  // Presles - Rocher de Nugues, Tina dalle
  [103555, 'https://www.vtno.fr/adh%C3%A9sion/'],
  // Presles - Balme étrange
  [103083, 'https://www.vtno.fr/adh%C3%A9sion/'],
  // Presles - Pierrot beach
  [103082, 'https://www.vtno.fr/adh%C3%A9sion/'],
  // Presles - Rocher des Nugues
  [43267, 'https://www.vtno.fr/adh%C3%A9sion/'],
  // Presles - Dalles de Télébus
  [42469, 'https://www.vtno.fr/adh%C3%A9sion/'],
  // Presles - Pas du Ranc
  [42426, 'https://www.vtno.fr/adh%C3%A9sion/'],
  // Presles - Grottes de Choranche
  [42425, 'https://www.vtno.fr/adh%C3%A9sion/'],
  // Presles - Paroi Rouge
  [42253, 'https://www.vtno.fr/adh%C3%A9sion/'],
  // Presles - Fond du cirque
  [41298, 'https://www.vtno.fr/adh%C3%A9sion/'],
  // Presles - Chrysanthèmes
  [40768, 'https://www.vtno.fr/adh%C3%A9sion/'],
  // Presles - Fhara Kiri
  [40767, 'https://www.vtno.fr/adh%C3%A9sion/'],
  // Presles - Eliane
  [40766, 'https://www.vtno.fr/adh%C3%A9sion/'],
  // Presles - Buis
  [40756, 'https://www.vtno.fr/adh%C3%A9sion/'],
  // Presles - Festival
  [549732, 'https://www.vtno.fr/adh%C3%A9sion/'],

  // America
  // Access Fund USA
  [14080, 'https://www.accessfund.org/join-or-give'],
  // British Columbia
  [252272, 'https://access-society.ca/Donate'],

  // Australia
  // Tasmania
  [1274261, 'http://www.thesarvo.com/confluence/display/cctpublic/Home'],
  // New South Wales (SydneyRockies)
  [1378407, 'https://sydneyrockies.org.au/rebolting/'],
  // Western Australia
  [1379810, 'https://www.climberswa.asn.au/cawa/bolting-fund/'],

  // UK Boltfund
  // Peak District
  [1203403, 'http://thepeakboltfund.blogspot.com/'],
  // Lake District
  [1203390, 'https://www.cumbriaboltfund.co.uk/bolting'],
  // Cheshire
  [1264698, 'https://www.paypal.com/donate/?cmd=_s-xclick&hosted_button_id=XQ4S2XU3WH5F6'],

  // Scotland
  [14474, 'https://www.7amax.co.uk/'],

  // South Africa
  //Western Cape
  [1381796, 'https://www.climbing.co.za/anchor-replacement-fund/'],

  // Others
  // Malta
  [14151, 'https://maltaclimbingclub.org/bolt-fund/'],

  // Philippines
  [14125, 'http://www.climbphilippines.com/boltfund.html'],

  // Malaisia
  [14154, 'https://www.malaysianboltingfund.com/'],

  // New-Zealand
  [14137, 'https://alpineclub.org.nz/product/bolting-fund/'],
]);

export const useFundraiser = (document: Document) => {
  if (!isRoute(document) && !isWaypoint(document) && !isArea(document)) {
    return undefined;
  }
  if (isRoute(document)) {
    // only mountain_climbing and rock_climbing activity
    if (!intersect(document.activities, ['mountain_climbing', 'rock_climbing'])) {
      return undefined;
    }
    // only P1 and P1+ routes
    if (!document.equipment_rating || !['P1', 'P1+'].includes(document.equipment_rating)) {
      return undefined;
    }
  } else if (isWaypoint(document)) {
    // only climbing outdoor sites
    if (document.waypoint_type !== 'climbing_outdoor') {
      return undefined;
    }
    // only waypoints with P1 and P1+ routes
    if (!document.equipment_ratings || !intersect(document.equipment_ratings, ['P1', 'P1+'])) {
      return undefined;
    }
  }

  // this array will contains list of document to look for associated fundraiser
  // the logic is to look for the more precise entities before
  // 1. route itself for routes
  // 2. waypoint itself for waypoints
  // 2. or main waypoint for routes
  // to do : check for parents of main waypoint
  // 3. then areas of type range
  // 4. then areas of type admin_limits
  // 5. then areas of type country
  const documents: (Document | DocumentListing)[] = [];

  documents.push(document);

  if (document.type === 'r') {
    const mainWaypoint = document.associations.waypoints.find(w => w.document_id === document.main_waypoint_id);

    if (mainWaypoint) {
      documents.push(mainWaypoint);
    }
  }

  if (document.type !== 'a') {
    documents.push(...document.areas.filter(area => area.area_type === 'range'));
    documents.push(...document.areas.filter(area => area.area_type === 'admin_limits'));
    documents.push(...document.areas.filter(area => area.area_type === 'country'));
  }

  for (const document of documents) {
    if (mapping.has(document.document_id)) {
      return mapping.get(document.document_id);
    }
  }

  return undefined;
};
