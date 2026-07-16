// Low-level teletype: reveals text character by character with a caller
// supplied per-character delay. One setTimeout pending at any moment, so
// cancel is a single clearTimeout and nothing leaks. No typing libraries.

export type Teletype = { cancel(): void };

type Segment = { el: HTMLElement; text: string };

// Types across an ordered list of spans (segments) so styled runs, like
// green stat numerals, fill in reading order as one continuous line of
// keystrokes. delayFor receives the character just typed and its global
// index across all segments.
export function teletypeSegments(
  segments: Segment[],
  delayFor: (justTyped: string, index: number) => number,
  onDone?: () => void,
): Teletype {
  let timer: number | null = null;
  let seg = 0;
  let chars = 0; // typed so far within the current segment
  let index = 0; // typed so far across all segments
  let cancelled = false;

  const step = () => {
    if (cancelled) return;
    while (seg < segments.length && chars >= segments[seg].text.length) {
      seg += 1;
      chars = 0;
    }
    if (seg >= segments.length) {
      onDone?.();
      return;
    }
    const current = segments[seg];
    chars += 1;
    index += 1;
    current.el.textContent = current.text.slice(0, chars);
    const justTyped = current.text[chars - 1];
    timer = window.setTimeout(step, delayFor(justTyped, index));
  };

  timer = window.setTimeout(step, delayFor("", 0));
  return {
    cancel() {
      cancelled = true;
      if (timer !== null) clearTimeout(timer);
      timer = null;
    },
  };
}

export function teletype(
  el: HTMLElement,
  text: string,
  delayFor: (justTyped: string, index: number) => number,
  onDone?: () => void,
): Teletype {
  return teletypeSegments([{ el, text }], delayFor, onDone);
}

// Splits copy into plain and numeral runs. Numeral runs, digits with any
// embedded separators like 108,000 or 2.4, are the only place green is
// allowed inside a takeover.
export function splitNumerals(text: string): { text: string; numeral: boolean }[] {
  const parts: { text: string; numeral: boolean }[] = [];
  const re = /\d[\d,.]*\d|\d/g;
  let last = 0;
  for (let m = re.exec(text); m !== null; m = re.exec(text)) {
    if (m.index > last) parts.push({ text: text.slice(last, m.index), numeral: false });
    parts.push({ text: m[0], numeral: true });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last), numeral: false });
  return parts;
}
