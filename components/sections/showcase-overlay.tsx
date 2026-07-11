const GREEN = "#3BF07A";
const RED = "#FF5D5D";
const PAPER = "#F4F2EC";
const FOG = "#8A928F";
const INK = "#0A0C0B";

// Ego4D-style annotation overlay. Authored fully visible so no-JS and
// reduced-motion users see the complete labeled frame; the scrub timeline in
// showcase.tsx animates everything in with .from() tweens. Polylines start
// hidden via strokeDashoffset and get reset for reduced motion.
export function ShowcaseOverlay() {
  return (
    <svg
      viewBox="0 0 1280 720"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full font-mono"
    >
      {/* corner registration markers */}
      <g data-anno="corners" fill="none" stroke={GREEN} strokeWidth={3}>
        <path d="M28 68 V28 H68" />
        <path d="M1212 28 H1252 V68" />
        <path d="M1252 652 V692 H1212" />
        <path d="M68 692 H28 V652" />
      </g>

      {/* narration */}
      <g data-anno="narration">
        <text x={64} y={100} fontSize={30} fill={PAPER}>
          #C C picks up the pruning shears
        </text>
        <text x={64} y={140} fontSize={24} fill={PAPER} opacity={0.55}>
          #C C cuts the branch
        </text>
        <text x={64} y={176} fontSize={22} fill={GREEN}>
          verb: cut&#160;&#160;noun: branch
        </text>
      </g>

      {/* metadata column, hidden on small screens where it would be unreadable */}
      <g data-anno="meta" className="max-md:hidden" textAnchor="end" fill={FOG}>
        <text x={1216} y={100} fontSize={20}>
          annotation_uid: 7c31_0492af
        </text>
        <text x={1216} y={130} fontSize={20}>
          pnr_frame: 01824
        </text>
        <text x={1216} y={160} fontSize={20}>
          time_to_contact: 0.41s
        </text>
      </g>

      {/* bounding boxes */}
      <g data-anno="box-tool" fill="none">
        <text x={524} y={318} fontSize={22} fill={GREEN}>
          object_type: tool
        </text>
        <rect x={520} y={330} width={250} height={150} stroke={GREEN} strokeWidth={2.5} />
      </g>
      <g data-anno="box-lh" fill="none">
        <text x={204} y={418} fontSize={22} fill={GREEN}>
          left_hand
        </text>
        <rect x={200} y={430} width={210} height={180} stroke={GREEN} strokeWidth={2.5} />
      </g>
      <g data-anno="box-rh" fill="none">
        <text x={814} y={448} fontSize={22} fill={GREEN}>
          right_hand
        </text>
        <rect x={810} y={460} width={220} height={170} stroke={GREEN} strokeWidth={2.5} />
      </g>

      {/* hand trajectories */}
      <polyline
        data-traj="left"
        points="305,520 380,490 460,450 560,420 645,405"
        fill="none"
        stroke={GREEN}
        strokeWidth={2.5}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
      />
      <polyline
        data-traj="right"
        points="920,545 860,500 790,460 720,430 665,415"
        fill="none"
        stroke={RED}
        strokeWidth={2.5}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
      />
      <g data-anno="traj-ends">
        <circle cx={305} cy={520} r={5} fill={GREEN} />
        <circle cx={645} cy={405} r={5} fill={GREEN} />
        <circle cx={920} cy={545} r={5} fill={RED} />
        <circle cx={665} cy={415} r={5} fill={RED} />
      </g>

      {/* state transition */}
      <text data-anno="transition" x={524} y={510} fontSize={20} fill={GREEN}>
        state_transition: remove
      </text>

      {/* PRE / CONTACT / PNR / POST markers */}
      <g data-anno="chips">
        <g data-chip>
          <rect x={395} y={620} width={100} height={40} rx={2} fill="none" stroke={GREEN} strokeWidth={2} />
          <text x={445} y={646} fontSize={20} fill={GREEN} textAnchor="middle">
            PRE
          </text>
        </g>
        <g data-chip>
          <rect x={511} y={620} width={130} height={40} rx={2} fill="none" stroke={GREEN} strokeWidth={2} />
          <text x={576} y={646} fontSize={20} fill={GREEN} textAnchor="middle">
            CONTACT
          </text>
        </g>
        <g data-chip>
          <rect x={657} y={620} width={100} height={40} rx={2} fill={GREEN} />
          <text x={707} y={646} fontSize={20} fill={INK} textAnchor="middle">
            PNR
          </text>
        </g>
        <g data-chip>
          <rect x={773} y={620} width={100} height={40} rx={2} fill="none" stroke={GREEN} strokeWidth={2} />
          <text x={823} y={646} fontSize={20} fill={GREEN} textAnchor="middle">
            POST
          </text>
        </g>
      </g>
    </svg>
  );
}
