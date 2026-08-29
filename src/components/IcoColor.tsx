interface IcoColorProps {
  size?: number;
  className?: string;
}

function IcoColor({ size = 20, className }: IcoColorProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
    >
      <defs>
        <linearGradient
          id="linearGradient4358"
          gradientTransform="matrix(1.25 0 0 1.2 -484.714 468.561)"
          gradientUnits="userSpaceOnUse"
          x1="401.57144"
          y1="535.79797"
          x2="401.57144"
          y2="520.79797"
          xlinkHref="#linearGradient4424"
        />
        <linearGradient id="linearGradient4424">
          <stop offset="0" stopColor="#60a5e7" stopOpacity="0" />
          <stop offset="1" stopColor="#a6f3fb" stopOpacity="0.25773194" />
        </linearGradient>
      </defs>
      <g transform="translate(0 -1090.52)">
        <image
          width="30"
          height="30"
          preserveAspectRatio="none"
          x="1"
          y="1091.5197"
          xlinkHref="data:image/png;base64,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"
        />
        <path
          transform="translate(0 1090.52)"
          d="M16 0A16 16 0 0 0 0 16a16 16 0 0 0 16 16 16 16 0 0 0 16-16A16 16 0 0 0 16 0zm0 2a14 14 0 0 1 14 14 14 14 0 0 1-14 14A14 14 0 0 1 2 16 14 14 0 0 1 16 2z"
          opacity={1}
          vectorEffect="none"
          fill="#373737"
          fillOpacity={1}
          stroke="none"
          strokeWidth={2}
          strokeLinecap="butt"
          strokeLinejoin="bevel"
          strokeMiterlimit={4}
          strokeDasharray="none"
          strokeDashoffset={3.20000005}
          strokeOpacity={1}
        />
        <path
          transform="translate(0 1090.52)"
          d="M16 5C9.925 5 5 9.925 5 16s4.925 11 11 11 11-4.925 11-11S22.075 5 16 5zm0 2 8 13H8z"
          opacity={1}
          vectorEffect="none"
          fill="#373737"
          fillOpacity={1}
          stroke="none"
          strokeWidth={2}
          strokeLinecap="butt"
          strokeLinejoin="bevel"
          strokeMiterlimit={4}
          strokeDasharray="none"
          strokeDashoffset={3.20000005}
          strokeOpacity={1}
        />
      </g>
    </svg>
  );
}

export default IcoColor;
