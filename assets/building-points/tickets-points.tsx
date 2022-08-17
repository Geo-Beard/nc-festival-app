export const ticketsPoints = {
  type: "FeatureCollection",
  name: "festival-tickets-points",
  crs: { type: "name", properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" } },
  features: [
    {
      type: "Feature",
      properties: { id: 1 },
      geometry: {
        type: "Point",
        coordinates: [-1.499355312768556, 53.839794698324106],
      },
    },
    {
      type: "Feature",
      properties: { id: 2 },
      geometry: {
        type: "Point",
        coordinates: [-1.497393636736474, 53.835436044620835],
      },
    },
  ],
};
