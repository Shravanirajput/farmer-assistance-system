// Hand-drawn line icons on a 24px grid. They inherit colour from the surrounding text.

const paths = {
  sprout: (
    <>
      <path d="M12 21v-8" />
      <path d="M12 13c0-4 3-6.5 7.5-6.5 0 4.3-3 6.5-7.5 6.5Z" />
      <path d="M12 11.5C12 8.2 9.6 6 5.5 6c0 3.3 2.4 5.5 6.5 5.5Z" />
      <path d="M5 21h14" />
    </>
  ),
  leafSpots: (
    <>
      <path d="M4.5 19.5C4.5 11 9.5 4.5 19.5 4.5c0 10-6.5 15-15 15Z" />
      <path d="M4.5 19.5 13 11" />
      <circle cx="14.6" cy="8.6" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="9.6" cy="14.6" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15.2" cy="13.2" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  tractor: (
    <>
      <circle cx="7" cy="16" r="4" />
      <circle cx="7" cy="16" r="1.1" />
      <circle cx="18" cy="17.5" r="2.5" />
      <path d="M4 12.5V5h5.5l2 7.5" />
      <path d="M11.5 12.5H20v4" />
      <path d="M11 16h4.5" />
      <path d="M16.5 12.5V8.5" />
    </>
  ),
  scale: (
    <>
      <path d="M12 5v15" />
      <path d="M8 20h8" />
      <path d="M4 7h16" />
      <circle cx="12" cy="4.5" r="1.2" />
      <path d="M4 7 1.8 13M4 7l2.2 6M20 7l-2.2 6M20 7l2.2 6" />
      <path d="M1.5 13h5a2.5 2.2 0 0 1-5 0ZM17.5 13h5a2.5 2.2 0 0 1-5 0Z" />
    </>
  ),
  scroll: (
    <>
      <path d="M6 3h9l4 4v14H6Z" />
      <path d="M15 3v4h4" />
      <path d="M9 10h6.5M9 13h6.5M9 16h3" />
      <circle cx="15.5" cy="16.8" r="1.8" />
    </>
  ),
  clipboard: (
    <>
      <rect x="5" y="4.5" width="14" height="16.5" rx="2" />
      <path d="M9 4.5V3h6v1.5" />
      <path d="M8.5 10h7M8.5 13.5h7M8.5 17h4" />
    </>
  ),
  plough: (
    <>
      <path d="M2.5 8.5h17l2 -2.5" />
      <path d="M7 8.5c0 3.5-.6 6-2 8M12 8.5c0 3.5-.6 6-2 8M17 8.5c0 3.5-.6 6-2 8" />
      <path d="M3 19.5h18" />
    </>
  ),
  seeddrill: (
    <>
      <path d="M4 4h16l-2 6H6Z" />
      <path d="M8 10v6M12 10v6M16 10v6" />
      <circle cx="8" cy="18.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="12" cy="18.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="16" cy="18.5" r="0.9" fill="currentColor" stroke="none" />
      <path d="M3 21h18" />
    </>
  ),
  sprayer: (
    <>
      <rect x="3.5" y="6" width="7" height="12" rx="2.2" />
      <path d="M5.5 6V4.5h3V6" />
      <path d="M10.5 15c3 0 3.5-2 5-3.5l2.5-2.5" />
      <path d="M19.5 6.5l1.2-.8M20 9l1.4.2M18.6 5.2l.3-1.4" />
    </>
  ),
  harvester: (
    <>
      <path d="M3 15V8h9l2 3h5v4" />
      <circle cx="7" cy="17" r="2.8" />
      <circle cx="17" cy="17.5" r="2" />
      <circle cx="20" cy="7" r="2.6" />
      <path d="M20 4.4v5.2M17.4 7h5.2" />
      <path d="M5 8V5h4v3" />
    </>
  ),
  thresher: (
    <>
      <path d="M8 3h8l-2 4h-4Z" />
      <rect x="4" y="7" width="16" height="9" rx="1.5" />
      <path d="M20 10h2.5l-1 4" />
      <circle cx="8" cy="18.5" r="2" />
      <circle cx="16" cy="18.5" r="2" />
      <path d="M8 11.5h8" />
    </>
  ),
  pump: (
    <>
      <rect x="3" y="9" width="9" height="7" rx="3.5" />
      <path d="M12 12.5h4V6h4" />
      <path d="M19.5 13.5c0 1.5 1.5 3 1.5 4.2a1.5 1.5 0 0 1-3 0c0-1.2 1.5-2.7 1.5-4.2Z" />
      <path d="M5 16v3h5v-3" />
    </>
  ),
  trailer: (
    <>
      <path d="M5 6h13v9H5Z" />
      <path d="M5 15H2.5M18 13.5h3.5" />
      <circle cx="11.5" cy="17.5" r="2.3" />
      <path d="M8 9.5h7" />
    </>
  ),
  weeder: (
    <>
      <path d="M3 4l3 1.5L14 15" />
      <path d="M5.2 3l1.6 3" />
      <circle cx="16.5" cy="17" r="3.5" />
      <path d="M16.5 12v-1.2M16.5 23v-2.5M11.5 17H13M21.5 17H20M13 13.5l1 1M20 20.5l-1-1M20 13.5l-1 1M13 20.5l1-1" />
    </>
  ),
  arrowLeft: <path d="M19 12H5m6-6-6 6 6 6" />,
  arrowRight: <path d="M5 12h14m-6-6 6 6-6 6" />,
  external: (
    <>
      <path d="M14 4h6v6" />
      <path d="M20 4 11 13" />
      <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </>
  ),
  phone: (
    <path d="M5 4h3.5l1.8 4.5-2.3 1.6a11 11 0 0 0 5.9 5.9l1.6-2.3L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5C10.4 20 4 13.6 3.5 5.6A1.5 1.5 0 0 1 5 4Z" />
  ),
  drop: <path d="M12 3.5c0 4-6 8-6 11.5a6 6 0 0 0 12 0C18 11.5 12 7.5 12 3.5Z" />,
  pin: (
    <>
      <path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  cross: <path d="M6 6l12 12M18 6 6 18" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3 7 7M17 17l1.7 1.7M5.3 18.7 7 17M17 7l1.7-1.7" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.8" />
      <path d="M4.5 20.5c.8-4 3.8-6 7.5-6s6.7 2 7.5 6" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5M12 7.6v.4" />
    </>
  ),
  shield: <path d="M12 3 5 6v5.5c0 4.5 3 8 7 9.5 4-1.5 7-5 7-9.5V6Z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  refresh: (
    <>
      <path d="M20 11a8 8 0 0 0-14.5-4.5L4 8" />
      <path d="M4 4v4h4" />
      <path d="M4 13a8 8 0 0 0 14.5 4.5L20 16" />
      <path d="M20 20v-4h-4" />
    </>
  ),
  rupee: <path d="M7 5h10M7 9h10M10.5 5c5.5 0 5.5 8 0 8H7l7.5 7" />,
}

export default function Icon({ name, size = 24, className = '', strokeWidth = 1.8, title }) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : 'true'}
      aria-label={title}
      focusable="false"
    >
      {paths[name] ?? null}
    </svg>
  )
}
