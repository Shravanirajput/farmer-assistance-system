// Warli art drawn with SVG.
// Warli is the traditional painting of the Warli community of Palghar, Maharashtra:
// white figures made of circles, triangles and lines on a mud-brown wall, showing
// farming, harvest and the circular tarpa dance. Every shape here follows that grammar.
// Colour comes from CSS (currentColor), so the same art works on any background.

const LINE = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' }

const ARMS = {
  stand: 'M-8 -17 L-12 -5 M8 -17 L12 -5',
  dance: 'M-8 -17 L-19 -12 M8 -17 L19 -12',
  up: 'M-8 -17 L-14 -25 L-12 -32 M8 -17 L14 -25 L12 -32',
  pot: 'M-8 -17 L-13 -6 M8 -17 L12 -27 L5 -34',
  plough: 'M-8 -17 L1 -11 L9 -9 M8 -17 L14 -11 L20 -9',
  sow: 'M-8 -17 L-12 -5 M8 -17 L16 -15 L22 -9',
  tarpa: 'M-8 -17 L2 -22 M8 -17 L6 -24',
}

const LEGS = {
  stand: 'M-4 15 L-6 30 M4 15 L6 30',
  walk: 'M-4 15 L-10 22 L-13 30 M4 15 L8 23 L7 30',
  dance: 'M-4 15 L-10 22 L-8 30 M4 15 L10 22 L8 30',
}

export function WarliPerson({ x = 0, y = 0, scale = 1, arms = 'stand', legs = 'stand', flip = false }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}>
      <circle cx="0" cy="-25" r="5" fill="currentColor" />
      <path d="M-9 -19 L9 -19 L0 0 Z" fill="currentColor" />
      <path d="M0 0 L-8 15 L8 15 Z" fill="currentColor" />
      <path d={ARMS[arms]} {...LINE} />
      <path d={LEGS[legs]} {...LINE} />
      {arms === 'pot' && (
        <>
          <circle cx="1" cy="-37" r="5.5" fill="currentColor" />
          <path d="M-3 -42.5 L5 -42.5" {...LINE} />
        </>
      )}
      {arms === 'tarpa' && (
        <>
          <path d="M3 -23 C 8 -34, 14 -38, 22 -36" {...LINE} />
          <circle cx="25" cy="-36" r="4.5" fill="currentColor" />
        </>
      )}
      {arms === 'sow' && (
        <>
          <circle cx="25" cy="-4" r="1.3" fill="currentColor" />
          <circle cx="28" cy="2" r="1.3" fill="currentColor" />
        </>
      )}
    </g>
  )
}

export function Bullock({ x = 0, y = 0, scale = 1, flip = false }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}>
      <path d="M-20 -10 L16 -10 L11 3 L-15 3 Z" fill="currentColor" />
      <path d="M5 -10 L9 -17 L13 -10 Z" fill="currentColor" />
      <path d="M14 -12 L25 -14 L26 -4 Z" fill="currentColor" />
      <path d="M21 -14 L18 -20 M24 -14 L27 -20" {...LINE} />
      <path d="M-14 3 L-16 17 M-9 3 L-8 17 M6 3 L5 17 M10 3 L12 17" {...LINE} />
      <path d="M-20 -9 L-25 0 L-24 5" {...LINE} />
    </g>
  )
}

export function Tree({ x = 0, y = 0, scale = 1 }) {
  const branches = [
    [-14, -40, -2, -30],
    [14, -46, 2, -36],
    [-16, -58, -2, -50],
    [15, -64, 2, -56],
    [-10, -74, -1, -68],
    [10, -80, 1, -74],
  ]
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M0 0 L0 -86" {...LINE} strokeWidth="3" />
      {branches.map(([bx, by, sx, sy], index) => (
        <g key={index}>
          <path d={`M${sx} ${sy} L${bx} ${by}`} {...LINE} />
          <ellipse cx={bx} cy={by - 3} rx="3" ry="5.5" fill="currentColor" transform={`rotate(${bx < 0 ? -35 : 35} ${bx} ${by - 3})`} />
          <ellipse cx={(bx + sx) / 2} cy={(by + sy) / 2 - 4} rx="2.4" ry="4.2" fill="currentColor" transform={`rotate(${bx < 0 ? -20 : 20} ${(bx + sx) / 2} ${(by + sy) / 2 - 4})`} />
        </g>
      ))}
      <ellipse cx="0" cy="-90" rx="3" ry="6" fill="currentColor" />
    </g>
  )
}

export function Hut({ x = 0, y = 0, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-28 -24 L0 -48 L28 -24 Z" fill="currentColor" />
      <path d="M-22 -24 L-22 0 L22 0 L22 -24" {...LINE} />
      <path d="M-5 0 L-5 -14 L5 -14 L5 0" {...LINE} />
      <path d="M-16 -18 L-16 -6 M16 -18 L16 -6" {...LINE} strokeDasharray="2 4" />
    </g>
  )
}

export function Sun({ x = 0, y = 0, r = 22 }) {
  const rays = Array.from({ length: 16 }, (_, index) => {
    const angle = (index * Math.PI * 2) / 16
    const inner = r + 6
    const outer = r + (index % 2 === 0 ? 16 : 11)
    return `M${(x + Math.cos(angle) * inner).toFixed(1)} ${(y + Math.sin(angle) * inner).toFixed(1)} L${(x + Math.cos(angle) * outer).toFixed(1)} ${(y + Math.sin(angle) * outer).toFixed(1)}`
  })
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="currentColor" />
      <path d={rays.join(' ')} {...LINE} />
    </g>
  )
}

export function Bird({ x = 0, y = 0, scale = 1 }) {
  return <path transform={`translate(${x} ${y}) scale(${scale})`} d="M-9 -3 Q-4 -7 0 0 Q4 -7 9 -3" {...LINE} />
}

// The tarpa dance: villagers hold hands in a circle around the tarpa (horn) player.
export function TarpaCircle({ className = '' }) {
  const count = 16
  const radius = 118
  const dancers = Array.from({ length: count }, (_, index) => (index * 360) / count)
  const innerCount = 9
  const innerRadius = 62
  const innerDancers = Array.from({ length: innerCount }, (_, index) => (index * 360) / innerCount + 20)
  return (
    <svg className={`tarpa-circle ${className}`} viewBox="-190 -190 380 380" aria-hidden="true" focusable="false">
      <g className="tarpa-ring tarpa-ring-outer">
        {dancers.map((angle) => (
          <g key={angle} transform={`rotate(${angle}) translate(0 ${-radius})`}>
            <WarliPerson arms="dance" legs="dance" scale={0.95} />
          </g>
        ))}
      </g>
      <g className="tarpa-ring tarpa-ring-inner">
        {innerDancers.map((angle) => (
          <g key={angle} transform={`rotate(${angle}) translate(0 ${-innerRadius})`}>
            <WarliPerson arms="dance" legs="dance" scale={0.62} />
          </g>
        ))}
      </g>
      <WarliPerson arms="tarpa" legs="stand" scale={0.62} y="8" />
    </svg>
  )
}

// A ground-level frieze of village life: ploughing, sowing, carrying water, home.
export function WarliFrieze({ className = '' }) {
  return (
    <svg className={`warli-frieze ${className}`} viewBox="0 0 1200 130" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
      <path d="M0 124 L1200 124" {...LINE} strokeWidth="2" />
      <Tree x={48} y={124} scale={1.05} />
      <Bullock x={250} y={107} />
      <Bullock x={232} y={111} scale={0.95} />
      <path d="M150 116 L248 96" {...LINE} />
      <path d="M150 116 L146 124" {...LINE} />
      <WarliPerson x={132} y={94} arms="plough" legs="walk" />
      <WarliPerson x={360} y={94} arms="sow" legs="walk" />
      <WarliPerson x={455} y={94} arms="pot" legs="walk" flip />
      <WarliPerson x={492} y={94} arms="pot" legs="walk" flip scale={0.92} />
      <Hut x={590} y={124} />
      <Hut x={660} y={124} scale={0.82} />
      <Tree x={745} y={124} scale={0.9} />
      <WarliPerson x={820} y={94} arms="up" legs="dance" />
      <WarliPerson x={858} y={94} arms="up" legs="dance" flip />
      <Bullock x={960} y={107} flip />
      <WarliPerson x={1010} y={94} arms="stand" legs="walk" flip />
      <Tree x={1100} y={124} scale={1.1} />
      <WarliPerson x={1160} y={94} arms="sow" legs="walk" flip scale={0.9} />
      <Bird x={300} y={22} />
      <Bird x={322} y={34} scale={0.8} />
      <Bird x={905} y={28} scale={0.9} />
    </svg>
  )
}

// A thin repeating band of Warli border triangles, used as a section divider.
export function WarliBorder({ className = '' }) {
  return <div className={`warli-border ${className}`} aria-hidden="true" />
}
