import * as v from 'valibot';

const Bbox = v.pipe(
  v.array(v.number()),
  v.check(input => input.length % 2 === 0, 'bbox, must be a 2*n array'),
);

const Properties = v.union([v.record(v.string(), v.unknown()), v.null()]);

const Position = v.pipe(v.array(v.number()), v.minLength(2));

const LineStringCoor = v.pipe(v.array(Position), v.minLength(2));

const LinearRingCoor = v.pipe(
  v.array(Position),
  v.minLength(4),
  v.check(input => input.at(0)!.toString() === input.at(-1)!.toString()),
);

const PolygonCoor = v.pipe(v.array(LinearRingCoor), v.nonEmpty());

export const Point = v.object({
  type: v.literal('Point'),
  bbox: v.optional(Bbox),
  coordinates: Position,
});

export const MultiPoint = v.object({
  type: v.literal('MultiPoint'),
  bbox: v.optional(Bbox),
  coordinates: v.pipe(v.array(Position), v.nonEmpty()),
});

export const LineString = v.object({
  type: v.literal('LineString'),
  bbox: v.optional(Bbox),
  coordinates: LineStringCoor,
});

export const MultiLineString = v.object({
  type: v.literal('MultiLineString'),
  bbox: v.optional(Bbox),
  coordinates: v.pipe(v.array(LineStringCoor), v.nonEmpty()),
});

export const Polygon = v.object({
  type: v.literal('Polygon'),
  bbox: v.optional(Bbox),
  coordinates: PolygonCoor,
});

export const MultiPolygon = v.object({
  type: v.literal('MultiPolygon'),
  bbox: v.optional(Bbox),
  coordinates: v.pipe(v.array(PolygonCoor), v.nonEmpty()),
});

type GeometryCollection = {
  type: 'GeometryCollection';
  bbox?: v.InferOutput<typeof Bbox> | undefined;
  geometries: (
    | v.InferOutput<typeof Point>
    | v.InferOutput<typeof MultiPoint>
    | v.InferOutput<typeof LineString>
    | v.InferOutput<typeof MultiLineString>
    | v.InferOutput<typeof Polygon>
    | v.InferOutput<typeof MultiPolygon>
    | GeometryCollection
  )[];
};

export const GeometryCollection: v.GenericSchema<GeometryCollection> = v.object({
  type: v.literal('GeometryCollection'),
  bbox: v.optional(Bbox),
  geometries: v.array(
    v.lazy(() => v.union([Point, MultiPoint, LineString, MultiLineString, Polygon, MultiPolygon, GeometryCollection])),
  ),
});

export const Feature = v.object({
  type: v.literal('Feature'),
  bbox: v.optional(Bbox),
  properties: Properties,
  geometry: v.union([Point, MultiPoint, LineString, MultiLineString, Polygon, MultiPolygon, GeometryCollection]),
});

export const FeatureCollection = v.object({
  type: v.literal('FeatureCollection'),
  features: v.array(Feature),
});

export const GeoJson = v.union([
  Feature,
  FeatureCollection,
  Point,
  MultiPoint,
  LineString,
  MultiLineString,
  Polygon,
  MultiPolygon,
  GeometryCollection,
]);
