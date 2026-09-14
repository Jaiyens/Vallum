// Tuning constants for the problem section. One place to retune feel.

export const PANEL_COUNT = 8;
export const STEP_DEG = 45;

// Orbit. There is no three.js in this repo, so the two-axis damped orbit the
// brief asks for is built directly on the CSS 3D scene: a single azimuth value
// on the ring, a single polar tilt on the stage, both eased toward a target
// every frame (the OrbitControls damping equivalent). Auto-rotate advances the
// azimuth target; a pointer drag takes both targets over; after an idle beat
// the auto resumes and the tilt eases home.
export const AUTO_RAD_PER_S = 0.3; // idle auto-rotate, azimuth only
export const RESUME_IDLE_S = 4; // auto resumes this long after the last input
// Per-60fps-frame follow fraction; the ticker normalises it to real dt so the
// feel is identical at 60, 90, or 120hz. Lower is heavier damping.
export const DAMP_PER_FRAME = 0.12;

// Polar clamp, mapped from the spec's 0.15pi to 0.85pi. Level view is 0deg of
// stage rotateX; the range keeps the rings open and never edge-on. Sign: CSS
// rotateX with a y-down axis lifts the far rim for NEGATIVE angles, so the
// camera reads from above; positive reads from below.
export const POLAR_MIN_DEG = -63;
export const POLAR_MAX_DEG = 63;
// The resting pose. At -32deg (2026-09-04, "I need to be able to see the text
// in the vortex") the camera alone kept panels off the typed line, but from
// that high the panels read foreshortened and tilted. Since 2026-09-14 the
// wave (--helix-wave in globals.css) does that job: each panel sinks below
// the line as it passes in front and climbs above it behind, so the camera
// comes down to -16deg and the panels face the viewer. No front-half panel
// overlaps the line at any azimuth at 1280x800 through 1920x1080.
export const REST_TILT_DEG = -16;
// The approach: as the section slides into the frame the camera opens from
// REST + APPROACH (a flatter pose) down to REST, finishing exactly where the
// scroll magnet lands the section flush. Scrubbed by scroll, no timers.
export const APPROACH_TILT_DEG = 14;

// Pointer-to-orbit gains and the click/drag threshold. Below the threshold a
// press is a click (opens a panel); past it, it is a drag (orbits).
export const AZ_GAIN_DEG_PER_PX = 0.35;
export const TILT_GAIN_DEG_PER_PX = 0.22;
export const DRAG_THRESHOLD_PX = 5;

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
export const STAT_TARGET_MS = 1200; // whole line lands in about this long
export const STAT_MIN_CHAR_MS = 8;
export const STAT_MAX_CHAR_MS = 22;
export const SOURCE_CHAR_MS = 30;
export const CARET_HIDE_DELAY_MS = 400;

// Scroll magnet (helix mode only): the lock. Entering from either direction,
// the page glides flush once MAGNET_ENTER_FRAC of the section is on screen.
// Leaving, it is pulled back whenever more than MAGNET_LEAVE_FRAC is still
// on screen (founder, 2026-09-09: "when the helix is spinning and my screen
// isn't fully on the black section, it should auto-adjust"), so the only way
// out is a deliberate scroll past half a screen. Corrections under the delta
// floor are not worth moving the page for.
export const MAGNET_ENTER_FRAC = 0.35;
export const MAGNET_LEAVE_FRAC = 0.5;
export const MAGNET_MIN_DELTA_PX = 2;
export const MAGNET_GLIDE_S = 0.8; // shorter than the wheel glide: an assist, not a ride

// Takeover morph.
export const FLIP_OPEN_S = 0.6;
export const FLIP_CLOSE_S = 0.5;
export const ROTATE_TO_FRONT_S = 0.35; // fronting tween before the Flip
export const CROSSFADE_S = 0.3; // mobile and reduced motion takeover
export const FOCUS_BLUR_S = 0.5; // canvas blur/unblur on focus open and close
