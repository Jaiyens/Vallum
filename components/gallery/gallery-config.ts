// Tuning constants for the problem section. One place to retune feel.

export const PANEL_COUNT = 8;
export const STEP_DEG = 45;

// Spin physics.
export const AUTOROTATE_SECONDS = 90; // one revolution at rest
export const RESUME_DELAY_S = 1.5; // autorotate returns this long after a throw settles
export const DRAG_RESISTANCE = 0.15;
// Pointer-to-ring mapping. The proxy pivot sits far below the stage, so a
// horizontal drag is a shallow arc; the gain scales that arc up to ring
// degrees. Positive so front panels travel with the cursor (verified by
// probe: positive ring rotation projects panel zero to the right).
export const DRAG_GAIN = 4;
export const PROXY_DROP_PX = 600; // proxy pivot distance below the stage box

// Focus.
export const FOCUS_HYSTERESIS_DEG = 2; // challenger must win by this margin
export const FOCUS_TWEEN_S = 0.35;
export const FOCUSED_SCALE = 1.04;
export const DIMMED_BRIGHTNESS = 0.75;
export const MAX_PLAYING_VIDEOS = 2;

// Centerpiece typing rhythm.
export const TYPE_MIN_MS = 45;
export const TYPE_JITTER_MS = 30; // keystrokes land between 45 and 75ms
export const PUNCT_PAUSE_MS = 140; // extra hold after a period or comma
export const BACKSPACE_MS = 28;
export const HOLD_MS = 1800; // full line rests before backspacing

// Takeover typing.
export const STAT_TARGET_MS = 1200; // whole stat lands in about this long
export const STAT_MIN_CHAR_MS = 8;
export const STAT_MAX_CHAR_MS = 22;
export const SOURCE_CHAR_MS = 30;
export const CARET_HIDE_DELAY_MS = 400;

// Takeover morph.
export const FLIP_OPEN_S = 0.6;
export const FLIP_CLOSE_S = 0.5;
export const ROTATE_TO_FRONT_S = 0.35; // fronting tween before the Flip
export const CROSSFADE_S = 0.3; // mobile and reduced motion takeover
