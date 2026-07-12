import {
  CALLOUTS,
  SECTION_COPY,
  VIEWBOX,
  homePoint,
  leaderPath,
  type Callout,
} from "./callouts";

const PAPER = "var(--color-paper)";
const FOG = "var(--color-fog)";
const SIGNAL = "var(--color-signal)";
const SURFACE = "var(--color-surface)";

const byId = Object.fromEntries(CALLOUTS.map((c) => [c.id, c])) as Record<string, Callout>;

// Outer group bakes the exploded placement so the authored document is the
// finished diagram. The inner group is the animation target and starts at a
// net zero transform. Shapes inside are drawn at assembled coordinates.
function Part({ id, children }: { id: string; children: React.ReactNode }) {
  const c = byId[id];
  return (
    <g transform={`translate(${c.explode.dx} ${c.explode.dy})`}>
      <g id={id} className="rig-part" data-cluster={c.cluster}>
        {children}
      </g>
    </g>
  );
}

// compact crops the empty label gutters away for the stacked layouts, where
// leader lines and label columns are hidden.
export function RigSchematic({ compact = false }: { compact?: boolean }) {
  return (
    <svg
      viewBox={compact ? "220 60 740 600" : `0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
      role="img"
      aria-label={SECTION_COPY.svgLabel}
      className="h-full w-full"
      fill="none"
    >
      {/* construction frame */}
      <g stroke={FOG} strokeOpacity={0.2} strokeWidth={1} strokeDasharray="2 6">
        <line x1={600} y1={40} x2={600} y2={640} />
        <line x1={280} y1={365} x2={920} y2={365} />
      </g>

      {/* return connectors, from each exploded module back to its home point */}
      <g className="max-lg:hidden" stroke={FOG} strokeOpacity={0.35} strokeWidth={1} strokeDasharray="3 5">
        {CALLOUTS.filter((c) => c.explode.dx !== 0 || c.explode.dy !== 0).map((c) => {
          const home = homePoint(c);
          return (
            <line
              key={c.id}
              className="return-line"
              data-cluster={c.cluster}
              x1={c.anchor.x}
              y1={c.anchor.y}
              x2={home.x}
              y2={home.y}
            />
          );
        })}
      </g>

      {/* housing, the static assembly anchor */}
      <g id="rig-housing" stroke={PAPER} strokeOpacity={0.85} strokeWidth={2}>
        <rect x={490} y={305} width={220} height={120} rx={8} fill={SURFACE} fillOpacity={0.5} />
        <line x1={510} y1={425} x2={670} y2={425} strokeWidth={1.5} />
        <line x1={510} y1={430} x2={670} y2={430} strokeWidth={1} strokeOpacity={0.4} />
        <g stroke={FOG} strokeOpacity={0.35} strokeWidth={1} strokeDasharray="4 4">
          <line x1={470} y1={365} x2={730} y2={365} />
          <line x1={600} y1={285} x2={600} y2={445} />
        </g>
        <g fill={FOG} fillOpacity={0.6} stroke="none">
          <circle cx={502} cy={317} r={2.5} />
          <circle cx={698} cy={317} r={2.5} />
          <circle cx={502} cy={413} r={2.5} />
          <circle cx={698} cy={413} r={2.5} />
        </g>
      </g>

      {/* sensing */}
      <Part id="rig-camera">
        <g stroke={PAPER} strokeOpacity={0.85} strokeWidth={2}>
          <rect x={440} y={317} width={50} height={76} rx={4} fill={SURFACE} fillOpacity={0.5} />
          <circle cx={452} cy={352} r={20} />
          <circle cx={452} cy={352} r={12} strokeWidth={1.5} />
          <circle cx={452} cy={352} r={3} strokeWidth={1} />
        </g>
        <g stroke={FOG} strokeOpacity={0.35} strokeWidth={1} strokeDasharray="4 4">
          <line x1={445} y1={340} x2={400} y2={318} />
          <line x1={445} y1={364} x2={400} y2={386} />
        </g>
      </Part>

      <Part id="rig-stereo">
        <g stroke={PAPER} strokeOpacity={0.85} strokeWidth={1.5}>
          <rect x={425} y={300} width={14} height={110} rx={3} fill={SURFACE} fillOpacity={0.5} />
          <circle cx={432} cy={318} r={7} />
          <circle cx={432} cy={392} r={7} />
        </g>
        <g stroke={FOG} strokeOpacity={0.35} strokeWidth={1} strokeDasharray="4 4">
          <line x1={428} y1={318} x2={386} y2={344} />
          <line x1={428} y1={392} x2={386} y2={366} />
        </g>
      </Part>

      <Part id="rig-imu">
        <g stroke={PAPER} strokeOpacity={0.85} strokeWidth={1.5}>
          <rect x={548} y={323} width={24} height={24} rx={2} fill={SURFACE} fillOpacity={0.5} />
        </g>
        <g stroke={FOG} strokeOpacity={0.6} strokeWidth={1}>
          <line x1={552} y1={319} x2={552} y2={315} />
          <line x1={560} y1={319} x2={560} y2={315} />
          <line x1={568} y1={319} x2={568} y2={315} />
          <line x1={552} y1={351} x2={552} y2={355} />
          <line x1={560} y1={351} x2={560} y2={355} />
          <line x1={568} y1={351} x2={568} y2={355} />
        </g>
        <circle cx={553} cy={328} r={1.5} fill={FOG} stroke="none" />
      </Part>

      <Part id="rig-gnss">
        <g stroke={PAPER} strokeOpacity={0.85} strokeWidth={1.5}>
          <rect x={623} y={291} width={34} height={18} rx={2} fill={SURFACE} fillOpacity={0.5} />
          <rect x={631} y={295} width={10} height={10} strokeWidth={1} />
        </g>
      </Part>

      <Part id="rig-mics">
        <g stroke={PAPER} strokeOpacity={0.85} strokeWidth={1.5}>
          <circle cx={518} cy={427} r={6} />
          <circle cx={534} cy={433} r={6} />
        </g>
        <g stroke={FOG} strokeOpacity={0.6} strokeWidth={1}>
          <line x1={515} y1={425} x2={521} y2={425} />
          <line x1={515} y1={428} x2={521} y2={428} />
          <line x1={531} y1={431} x2={537} y2={431} />
          <line x1={531} y1={434} x2={537} y2={434} />
        </g>
      </Part>

      {/* trust */}
      <Part id="rig-compute">
        <g stroke={PAPER} strokeOpacity={0.85} strokeWidth={1.5}>
          <rect x={720} y={315} width={60} height={40} rx={3} fill={SURFACE} fillOpacity={0.5} />
        </g>
        <g stroke={FOG} strokeOpacity={0.6} strokeWidth={1}>
          <line x1={728} y1={355} x2={728} y2={360} />
          <line x1={737} y1={355} x2={737} y2={360} />
          <line x1={746} y1={355} x2={746} y2={360} />
          <line x1={755} y1={355} x2={755} y2={360} />
          <line x1={764} y1={355} x2={764} y2={360} />
          <line x1={773} y1={355} x2={773} y2={360} />
        </g>
      </Part>

      <Part id="rig-blur">
        <g stroke={PAPER} strokeOpacity={0.85} strokeWidth={1.5}>
          <rect x={735} y={323} width={20} height={20} rx={2} fill={SURFACE} fillOpacity={0.5} />
          <circle cx={745} cy={331} r={4} strokeWidth={1} />
        </g>
        <g stroke={FOG} strokeOpacity={0.7} strokeWidth={1}>
          <line x1={739} y1={338} x2={751} y2={338} />
          <line x1={740} y1={341} x2={750} y2={341} />
          <line x1={737} y1={325} x2={753} y2={341} />
        </g>
      </Part>

      <Part id="rig-sign">
        <g stroke={PAPER} strokeOpacity={0.85} strokeWidth={1.5}>
          <rect x={759} y={335} width={18} height={18} rx={2} fill={SURFACE} fillOpacity={0.5} />
        </g>
        <path
          d="M762 347 q3 -7 6 0 t6 0"
          stroke={FOG}
          strokeOpacity={0.8}
          strokeWidth={1}
        />
      </Part>

      {/* endurance */}
      <Part id="rig-storage">
        <g stroke={PAPER} strokeOpacity={0.85} strokeWidth={1.5}>
          <rect x={728} y={375} width={54} height={30} rx={3} fill={SURFACE} fillOpacity={0.5} />
        </g>
        <g stroke={FOG} strokeOpacity={0.6} strokeWidth={1}>
          <line x1={740} y1={379} x2={740} y2={401} />
          <line x1={750} y1={379} x2={750} y2={401} />
          <line x1={760} y1={379} x2={760} y2={401} />
          <rect x={767} y={387} width={8} height={7} />
          <path d="M768.5 387 v-2 a2.5 2.5 0 0 1 5 0 v2" />
        </g>
      </Part>

      <Part id="rig-battery">
        <g stroke={PAPER} strokeOpacity={0.85} strokeWidth={1.5}>
          <rect x={790} y={378} width={40} height={22} rx={4} fill={SURFACE} fillOpacity={0.5} />
          <rect x={790} y={405} width={40} height={22} rx={4} fill={SURFACE} fillOpacity={0.5} />
        </g>
        <g stroke={FOG} strokeOpacity={0.7} strokeWidth={1}>
          <line x1={797} y1={389} x2={803} y2={389} />
          <line x1={800} y1={386} x2={800} y2={392} />
          <line x1={817} y1={389} x2={823} y2={389} />
          <line x1={797} y1={416} x2={803} y2={416} />
          <line x1={800} y1={413} x2={800} y2={419} />
          <line x1={817} y1={416} x2={823} y2={416} />
        </g>
      </Part>

      <Part id="rig-strap">
        <g stroke={PAPER} strokeOpacity={0.85} strokeWidth={2}>
          <path d="M690 315 C 810 300 862 380 800 445 C 778 468 726 464 700 430" />
          <rect x={774} y={438} width={20} height={14} rx={3} fill={SURFACE} fillOpacity={0.5} strokeWidth={1.5} />
        </g>
      </Part>

      {/* leader lines and anchor dots, desktop only */}
      <g className="max-lg:hidden">
        {CALLOUTS.map((c) => (
          <g key={c.id}>
            <path
              className="leader-line"
              data-cluster={c.cluster}
              d={leaderPath(c)}
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
