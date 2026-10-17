export default function MallowCharacter({ size = 280 }) {
  return (
    <div className="mallow" style={{ width: size }}>
      <svg viewBox="0 0 240 220" role="img" aria-label="Mallow, a shy baby cloud with blushing cheeks and a little golden star">
        {/* soft shadow */}
        <ellipse className="mallow-shadow" cx="120" cy="204" rx="62" ry="8" />

        {/* body */}
        <g className="mallow-body">
          <circle cx="62" cy="116" r="38" />
          <circle cx="100" cy="82" r="42" />
          <circle cx="150" cy="80" r="40" />
          <circle cx="186" cy="116" r="36" />
          <circle cx="120" cy="66" r="36" />
          <ellipse cx="124" cy="132" rx="82" ry="58" />
        </g>
        {/* inner highlight */}
        <ellipse cx="96" cy="76" rx="20" ry="9" fill="#ffffff" opacity="0.7" transform="rotate(-18 96 76)" />

        {/* eyes */}
        <g className="blink">
          <ellipse cx="98" cy="124" rx="9.5" ry="13" fill="#4b4570" />
          <ellipse cx="146" cy="124" rx="9.5" ry="13" fill="#4b4570" />
          <circle cx="101" cy="119" r="3.6" fill="#fff" />
          <circle cx="149" cy="119" r="3.6" fill="#fff" />
          <circle cx="95" cy="129" r="1.6" fill="#fff" opacity="0.8" />
          <circle cx="143" cy="129" r="1.6" fill="#fff" opacity="0.8" />
        </g>

        {/* blush */}
        <ellipse className="blush" cx="76" cy="144" rx="13" ry="8" />
        <ellipse className="blush" cx="168" cy="144" rx="13" ry="8" />

        {/* tiny mouth */}
        <path d="M114 144 Q122 152 130 144" fill="none" stroke="#4b4570" strokeWidth="2.6" strokeLinecap="round" />

        {/* tiny hands (they drift up to cover the cheeks when shy) */}
        <g className="hand hand-l">
          <circle cx="58" cy="166" r="12" />
        </g>
        <g className="hand hand-r">
          <circle cx="186" cy="166" r="12" />
        </g>

        {/* star accessory */}
        <g className="star-accessory" transform="translate(170 46) rotate(14)">
          <polygon points="0,-17 4.4,-6 16.2,-5.2 7,2.2 10,13.8 0,7.4 -10,13.8 -7,2.2 -16.2,-5.2 -4.4,-6" />
        </g>
      </svg>
    </div>
  )
}
