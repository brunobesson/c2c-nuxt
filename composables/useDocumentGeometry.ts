import { ImageListing, OutingListing, RouteListing, WaypointListing, XreportListing } from '~/api/c2c.js';

export const useDocumentGeometry = () => {
  const bbox = (
    documents: (ImageListing | OutingListing | RouteListing | WaypointListing | XreportListing)[],
  ): [number, number, number, number] | null => {
    const docs = documents.filter(document => document.geometry?.geom);
    if (!documents.length) {
      return null;
    }
    const acc = [
      docs[0].geometry!.geom!.coordinates[0],
      docs[0].geometry!.geom!.coordinates[0],
      docs[0].geometry!.geom!.coordinates[1],
      docs[0].geometry!.geom!.coordinates[1],
    ];
    return docs
      .slice(1)
      .reduce(
        (acc, doc) => [
          Math.min(acc[0], doc.geometry!.geom!.coordinates[0]),
          Math.max(acc[1], doc.geometry!.geom!.coordinates[0]),
          Math.min(acc[2], doc.geometry!.geom!.coordinates[1]),
          Math.max(acc[3], doc.geometry!.geom!.coordinates[1]),
        ],
        acc,
      ) as [number, number, number, number];
  };

  return { bbox };
};
