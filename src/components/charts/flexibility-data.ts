/**
 * Illustrative scenario for DGM-05: an office building on a warm weekday.
 * Not measured data. Values in kW at 30-minute resolution, 06:00–22:00.
 */
export type FlexPoint = { t: string; expected: number; lower: number; upper: number; band: [number, number]; confidence: number };

const times = Array.from({ length: 33 }, (_, i) => {
  const m = 6 * 60 + i * 30;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
});

// Expected load shape (kW)
const expected = [
  420, 460, 540, 700, 860, 980, 1060, 1110, 1150, 1180, 1200, 1215, 1225, 1230, 1238, 1245, 1250, 1255, 1260, 1262, 1250, 1210, 1120, 980,
  820, 700, 610, 560, 520, 490, 470, 455, 440,
];
// How far load could move down / up at each interval, bounded by comfort and schedules (kW)
const down = [
  20, 30, 40, 60, 80, 100, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 225, 235, 240, 238, 220, 190, 150, 110, 80, 60, 45, 35, 30, 25,
  20, 20, 20,
];
const up = [
  150, 170, 190, 160, 120, 90, 70, 60, 55, 50, 45, 40, 40, 40, 35, 35, 30, 30, 30, 30, 35, 45, 60, 80, 100, 120, 130, 140, 145, 150, 150,
  150, 150,
];
const conf = [
  95, 95, 94, 94, 93, 93, 92, 92, 91, 91, 90, 90, 89, 89, 88, 88, 87, 87, 86, 86, 86, 85, 85, 84, 84, 84, 83, 83, 83, 82, 82, 82, 82,
];

export const flexData: FlexPoint[] = times.map((t, i) => ({
  t,
  expected: expected[i],
  lower: expected[i] - down[i],
  upper: expected[i] + up[i],
  band: [expected[i] - down[i], expected[i] + up[i]],
  confidence: conf[i],
}));

/** Candidate window used in the scenario. */
export const candidateWindow = { from: "16:00", to: "18:00" };
