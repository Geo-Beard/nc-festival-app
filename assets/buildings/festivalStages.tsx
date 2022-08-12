export const festivalStages = {
  type: "FeatureCollection",
  name: "festivalStages",
  crs: { type: "name", properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" } },
  features: [
    {
      type: "Feature",
      properties: { id: 1, stageName: "mainStage" },
      geometry: {
        type: "MultiPolygon",
        coordinates: [
          [
            [
              [-1.503545640324905, 53.833174222072913],
              [-1.501814749708362, 53.833113626652853],
              [-1.501893959956915, 53.832871244095905],
              [-1.503542706611996, 53.832928377253545],
              [-1.503545640324905, 53.833174222072913],
            ],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { id: 2, stageName: "tentStage1" },
      geometry: {
        type: "MultiPolygon",
        coordinates: [
          [
            [
              [-1.503968094983857, 53.836290439348197],
              [-1.502859151504106, 53.836567424591863],
              [-1.502378022586966, 53.835951129928048],
              [-1.503498700918354, 53.835681065363502],
              [-1.503968094983857, 53.836290439348197],
            ],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { id: 3, stageName: "localBandStage" },
      geometry: {
        type: "MultiPolygon",
        coordinates: [
          [
            [
              [-1.501720870895261, 53.836742272092074],
              [-1.501069586629376, 53.837040028656467],
              [-1.50085542558699, 53.836899806352093],
              [-1.50153017955615, 53.836589930705593],
              [-1.501720870895261, 53.836742272092074],
            ],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { id: 4, stageName: "nightStage" },
      geometry: {
        type: "MultiPolygon",
        coordinates: [
          [
            [
              [-1.499663717566589, 53.837219050662547],
              [-1.49931451006582, 53.837322394113372],
              [-1.499130884237148, 53.837112575325243],
              [-1.499476907474992, 53.837006726045125],
              [-1.499663717566589, 53.837219050662547],
            ],
          ],
        ],
      },
    },
  ],
};
