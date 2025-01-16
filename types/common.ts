import * as v from 'valibot';
import isISO8601 from 'validator/es/lib/isISO8601.js';

// Some utilities

export const Uint = v.pipe(v.number(), v.integer(), v.minValue(0), v.finite());

export const PositiveInt = v.pipe(v.number(), v.integer(), v.minValue(1), v.finite());

export const IsoDate = v.pipe(v.string(), v.isoDate());

export const IsoDateTime = v.custom(
  input => typeof input === 'string' && isISO8601(input, { strict: true, strictSeparator: true }),
);
