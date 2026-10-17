export default function CloudSvg({ className = '', style }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 200 110"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="currentColor">
        <ellipse cx="100" cy="82" rx="90" ry="24" />
        <circle cx="58" cy="68" r="30" />
        <circle cx="100" cy="48" r="40" />
        <circle cx="145" cy="66" r="32" />
      </g>
    </svg>
  )
}
