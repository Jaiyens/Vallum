import { CALLOUTS, SECTION_COPY, VIEWBOX } from "./callouts";

const PAPER = "var(--color-paper)";
const FOG = "var(--color-fog)";
const SIGNAL = "var(--color-signal)";
const SURFACE = "var(--color-surface)";

// Exploded engineering drawing per the geometry contract. One horizontal
// explosion axis at y=340. Major parts sit centered on it. Subcomponents
// explode vertically from their parents with dashed centerlines back to
// their seats. The document is authored in the exploded state.
export function RigSchematic({ compact = false }: { compact?: boolean }) {
  return (
    <svg
      viewBox={compact ? "50 60 1130 600" : `0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
      role="img"
      aria-label={SECTION_COPY.svgLabel}
      className="h-full w-full"
      fill="none"
    >
      {/* explosion axis */}
      <line
        x1={60}
        y1={340}
        x2={1180}
        y2={340}
        stroke={FOG}
        strokeOpacity={0.3}
        strokeWidth={1}
        strokeDasharray="4 2"
      />

      {/* centerlines from each exploded part to its seat */}
      <g stroke={FOG} strokeOpacity={0.5} strokeWidth={1} strokeDasharray="4 2">
        <line x1={480} y1={193} x2={480} y2={255} />
        <line x1={590} y1={190} x2={590} y2={255} />
        <line x1={1010} y1={190} x2={1010} y2={265} />
        <line x1={1000} y1={492} x2={1000} y2={415} />
        <line x1={1120} y1={495} x2={1120} y2={415} />
        <line x1={230} y1={500} x2={230} y2={405} />
      </g>

      {/* front sensor bar */}
      <g id="g-front-bar">
        <rect
          x={130}
          y={275}
          width={200}
          height={130}
          rx={16}
          stroke={PAPER}
          strokeOpacity={0.85}
          strokeWidth={2}
          fill={SURFACE}
          fillOpacity={0.4}
        />
        <g id="g-rgb-cam" stroke={PAPER} strokeOpacity={0.85}>
          <circle cx={195} cy={330} r={34} strokeWidth={2} />
          <circle cx={195} cy={330} r={22} strokeWidth={1.5} />
          <circle cx={195} cy={330} r={10} strokeWidth={1.5} />
        </g>
        <g stroke={FOG} strokeOpacity={0.35} strokeWidth={1} strokeDasharray="4 2">
          <line x1={130} y1={315} x2={60} y2={285} />
          <line x1={130} y1={345} x2={60} y2={375} />
        </g>
        <g id="g-stereo" stroke={PAPER} strokeOpacity={0.85} strokeWidth={1.5}>
          <circle cx={300} cy={305} r={12} />
          <circle cx={300} cy={355} r={12} />
          <g strokeWidth={1} strokeOpacity={0.6}>
            <line x1={295} y1={305} x2={305} y2={305} />
            <line x1={300} y1={300} x2={300} y2={310} />
            <line x1={295} y1={355} x2={305} y2={355} />
            <line x1={300} y1={350} x2={300} y2={360} />
          </g>
        </g>
        <g id="g-mics" fill={PAPER} fillOpacity={0.85} stroke="none">
          <circle cx={200} cy={392} r={3} />
          <circle cx={230} cy={392} r={3} />
          <circle cx={260} cy={392} r={3} />
        </g>
      </g>

      {/* central housing, the static assembly anchor */}
      <g id="g-housing">
        <rect
          x={400}
          y={255}
          width={260}
          height={170}
          rx={18}
          stroke={PAPER}
          strokeOpacity={0.85}
          strokeWidth={2}
          fill={SURFACE}
          fillOpacity={0.4}
        />
        <line x1={408} y1={340} x2={652} y2={340} stroke={PAPER} strokeOpacity={0.4} strokeWidth={1} />
        <g stroke={PAPER} strokeOpacity={0.6} strokeWidth={1}>
          {[
            [416, 271],
            [644, 271],
            [416, 409],
            [644, 409],
          ].map(([cx, cy]) => (
            <g key={`${cx}-${cy}`}>
              <circle cx={cx} cy={cy} r={4} />
              <line x1={cx - 2.5} y1={cy - 2.5} x2={cx + 2.5} y2={cy + 2.5} />
              <line x1={cx - 2.5} y1={cy + 2.5} x2={cx + 2.5} y2={cy - 2.5} />
            </g>
          ))}
        </g>
        <g stroke={PAPER} strokeOpacity={0.5} strokeWidth={2}>
          {[600, 608, 616, 624, 632].map((x) => (
            <line key={x} x1={x} y1={270} x2={x} y2={290} />
          ))}
        </g>
      </g>

      {/* side arm */}
      <g id="g-arm" stroke={PAPER} strokeOpacity={0.85}>
        <rect x={730} y={310} width={150} height={60} rx={14} strokeWidth={2} fill={SURFACE} fillOpacity={0.4} />
        <g strokeWidth={1.5} strokeOpacity={0.6}>
          <line x1={718} y1={332} x2={730} y2={332} />
          <line x1={718} y1={348} x2={730} y2={348} />
          <line x1={880} y1={332} x2={892} y2={332} />
          <line x1={880} y1={348} x2={892} y2={348} />
        </g>
      </g>

      {/* rear pod */}
      <g id="g-rear-pod" stroke={PAPER} strokeOpacity={0.85}>
        <rect x={950} y={265} width={220} height={150} rx={18} strokeWidth={2} fill={SURFACE} fillOpacity={0.4} />
        <line x1={958} y1={340} x2={1162} y2={340} strokeWidth={1} strokeOpacity={0.4} />
        <rect x={1158} y={322} width={12} height={36} strokeWidth={1.5} strokeOpacity={0.6} />
      </g>

      {/* imu chip */}
      <g id="g-imu" stroke={PAPER} strokeOpacity={0.85}>
        <rect x={457} y={147} width={46} height={46} rx={3} strokeWidth={1.5} fill={SURFACE} fillOpacity={0.4} />
        <g strokeWidth={1} strokeOpacity={0.6}>
          {[467, 480, 493].map((x) => (
            <g key={x}>
              <line x1={x} y1={141} x2={x} y2={147} />
              <line x1={x} y1={193} x2={x} y2={199} />
            </g>
          ))}
          {[157, 170, 183].map((y) => (
            <g key={y}>
              <line x1={451} y1={y} x2={457} y2={y} />
              <line x1={503} y1={y} x2={509} y2={y} />
            </g>
          ))}
        </g>
      </g>

      {/* gnss patch antenna */}
      <g id="g-gnss" stroke={PAPER} strokeOpacity={0.85}>
        <rect x={555} y={140} width={70} height={50} rx={3} strokeWidth={1.5} fill={SURFACE} fillOpacity={0.4} />
        <rect x={582} y={157} width={16} height={16} strokeWidth={1} />
      </g>

      {/* compute board with blur and signing chips riding it */}
      <g id="g-compute" stroke={PAPER} strokeOpacity={0.85}>
        <rect x={950} y={110} width={120} height={80} rx={4} strokeWidth={1.5} fill={SURFACE} fillOpacity={0.4} />
        <g strokeWidth={1} strokeOpacity={0.6}>
          {[958, 966, 974, 982, 990, 998, 1006, 1014, 1022, 1030, 1038, 1046, 1054, 1062].map(
            (x) => (
              <line key={x} x1={x} y1={190} x2={x} y2={197} />
            ),
          )}
        </g>
        <g id="g-blur">
          <rect x={965} y={125} width={26} height={26} rx={2} strokeWidth={1.5} />
        </g>
        <g id="g-signing">
          <rect x={1010} y={125} width={26} height={26} rx={2} strokeWidth={1.5} />
          <circle cx={1023} cy={135} r={3.5} strokeWidth={1} />
          <line x1={1023} y1={138} x2={1023} y2={145} strokeWidth={1} />
        </g>
      </g>

      {/* storage cartridge */}
      <g id="g-storage" stroke={PAPER} strokeOpacity={0.85}>
        <rect x={945} y={492} width={110} height={55} rx={4} strokeWidth={1.5} fill={SURFACE} fillOpacity={0.4} />
        <g strokeWidth={1} strokeOpacity={0.5}>
          <line x1={953} y1={506} x2={1020} y2={506} />
          <line x1={953} y1={533} x2={1020} y2={533} />
        </g>
        <g strokeWidth={1} strokeOpacity={0.7}>
          <rect x={1030} y={516} width={10} height={9} />
          <path d="M 1032 516 v -3 a 3 3 0 0 1 6 0 v 3" />
        </g>
      </g>

      {/* battery cells */}
      <g id="g-battery" stroke={PAPER} strokeOpacity={0.85}>
        <rect x={1085} y={495} width={70} height={28} rx={5} strokeWidth={1.5} fill={SURFACE} fillOpacity={0.4} />
        <rect x={1085} y={530} width={70} height={28} rx={5} strokeWidth={1.5} fill={SURFACE} fillOpacity={0.4} />
        <g strokeWidth={1} strokeOpacity={0.7}>
          <line x1={1096} y1={509} x2={1104} y2={509} />
          <line x1={1100} y1={505} x2={1100} y2={513} />
          <line x1={1136} y1={509} x2={1144} y2={509} />
          <line x1={1096} y1={544} x2={1104} y2={544} />
          <line x1={1100} y1={540} x2={1100} y2={548} />
          <line x1={1136} y1={544} x2={1144} y2={544} />
        </g>
      </g>

      {/* head strap, open C below the front bar */}
      <g id="g-strap" stroke={PAPER} strokeOpacity={0.85}>
        <path d="M 140 500 A 90 115 0 0 0 320 500" strokeWidth={2} />
        <path d="M 154 500 A 76 101 0 0 0 306 500" strokeWidth={1.5} />
        <circle cx={230} cy={608} r={16} strokeWidth={1.5} fill={SURFACE} fillOpacity={0.4} />
        <g strokeWidth={1} strokeOpacity={0.7}>
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i * Math.PI) / 4;
            const x1 = 230 + Math.cos(a) * 10;
            const y1 = 608 + Math.sin(a) * 10;
            const x2 = 230 + Math.cos(a) * 16;
            const y2 = 608 + Math.sin(a) * 16;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>
      </g>

      {/* leader lines and anchor dots, desktop only */}
      <g className="max-lg:hidden">
        {CALLOUTS.map((c) => (
          <g key={c.id}>
            <path
              className="leader-line"
              data-cluster={c.cluster}
              d={c.route}
              stroke={FOG}
              strokeOpacity={0.6}
              strokeWidth={1}
            />
            <circle
              className="leader-dot"
              data-cluster={c.cluster}
              cx={c.anchor.x}
              cy={c.anchor.y}
              r={3.5}
              fill={SIGNAL}
              stroke="none"
            />
          </g>
        ))}
      </g>
    </svg>
  );
}
