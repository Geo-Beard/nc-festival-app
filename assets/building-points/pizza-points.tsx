export const pizzaPoints = {
  type: "FeatureCollection",
  name: "festival-food-pizza",
  crs: { type: "name", properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" } },
  features: [
    {
      type: "Feature",
      properties: { id: 1 },
      geometry: {
        type: "Point",
        coordinates: [-1.503337339090909, 53.835116155561941],
      },
    },
    {
      type: "Feature",
      properties: { id: 2 },
      geometry: {
        type: "Point",
        coordinates: [-1.500318874475242, 53.834671422997019],
      },
    },
    {
      type: "Feature",
      properties: { id: 3 },
      geometry: {
        type: "Point",
        coordinates: [-1.495215517885299, 53.835507793304522],
      },
    },
    {
      type: "Feature",
      properties: { id: 4 },
      geometry: {
        type: "Point",
        coordinates: [-1.494690057306417, 53.835794017393297],
      },
    },
    {
      type: "Feature",
      properties: { id: 5 },
      geometry: {
        type: "Point",
        coordinates: [-1.494104618596942, 53.835517795792221],
      },
    },
  ],
};
