// Block time ranges for the lens readout, copied from cutlist.json in the
// film workspace (~/Desktop/shift/cutlist.json). in and out are seconds on
// the shipped 26.5s hero timeline at 24fps. The final half second is the
// generated black tail and carries no label.
//
// kind drives the lens: real and twin blocks are worker footage and engage
// the slow motion reveal; est blocks are drone establishers with identical
// halves, so the lens goes dormant over them.

export type BlockKind = "est" | "real" | "twin" | "black";
export type ReadoutBlock = {
  in: number;
  out: number;
  label: string;
  kind: BlockKind;
};

export const CUTLIST_BLOCKS: ReadoutBlock[] = [
  { in: 0, out: 4, label: "GRID-REF", kind: "est" },
  { in: 4, out: 7, label: "UNIT-07 / SPLICE", kind: "real" },
  { in: 7, out: 10, label: "GRID-REF", kind: "est" },
  { in: 10, out: 13, label: "LOAD-BEARING / 04:00", kind: "real" },
  { in: 13, out: 16, label: "GRID-REF", kind: "est" },
  { in: 16, out: 19, label: "FIELD-SCAN", kind: "real" },
  { in: 19, out: 22, label: "HIGH-SIDE", kind: "real" },
  { in: 22, out: 26, label: "LAST-SHIFT", kind: "real" },
  { in: 26, out: 26.5, label: "", kind: "black" },
];

const FALLBACK: { label: string; kind: BlockKind } = {
  label: "",
  kind: "black",
};

export function blockFor(t: number): { label: string; kind: BlockKind } {
  for (const b of CUTLIST_BLOCKS) {
    if (t >= b.in && t < b.out) return b;
  }
  return FALLBACK;
}

export function readoutFor(t: number): string {
  return blockFor(t).label;
}
