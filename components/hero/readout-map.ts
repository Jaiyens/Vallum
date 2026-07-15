// Block time ranges for the lens readout, copied from cutlist.json in the
// film workspace (~/Desktop/shift/cutlist.json). in and out are seconds on
// the shipped 26.5s hero timeline at 24fps. The final half second is the
// generated black tail and carries no label.

export type ReadoutBlock = { in: number; out: number; label: string };

export const CUTLIST_BLOCKS: ReadoutBlock[] = [
  { in: 0, out: 4, label: "GRID-REF" },
  { in: 4, out: 7, label: "UNIT-07 / SPLICE" },
  { in: 7, out: 10, label: "GRID-REF" },
  { in: 10, out: 13, label: "LOAD-BEARING / 04:00" },
  { in: 13, out: 16, label: "GRID-REF" },
  { in: 16, out: 19, label: "FIELD-SCAN" },
  { in: 19, out: 22, label: "HIGH-SIDE" },
  { in: 22, out: 26, label: "LAST-SHIFT" },
  { in: 26, out: 26.5, label: "" },
];

export function readoutFor(t: number): string {
  for (const b of CUTLIST_BLOCKS) {
    if (t >= b.in && t < b.out) return b.label;
  }
  return "";
}
