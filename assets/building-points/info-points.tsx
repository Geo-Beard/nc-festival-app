export const infoPoints = {
  type: "FeatureCollection",
  name: "info-points",
  crs: { type: "name", properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" } },
  features: [
    {
      type: "Feature",
      properties: { id: 1 },
      geometry: {
        type: "Point",
        coordinates: [-1.495413217538583, 53.839605343236713],
      },
    },
    {
      type: "Feature",
      properties: { id: 2 },
      geometry: {
        type: "Point",
        coordinates: [-1.49434469410336, 53.836552463297849],
      },
    },
    {
      type: "Feature",
      properties: { id: 3 },
      geometry: {
        type: "Point",
        coordinates: [-1.499783145901176, 53.836465520665243],
      },
    },
    {
      type: "Feature",
      properties: { id: 4 },
      geometry: {
        type: "Point",
        coordinates: [-1.500530264788768, 53.831441391810664],
      },
    },
  ],
};
