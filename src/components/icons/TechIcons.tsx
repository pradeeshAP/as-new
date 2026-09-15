import type { SVGProps } from "react";

interface IconProps {
  size?: number;
}

const base: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  "aria-hidden": true,
  fill: "none",
};

/** All marks are single-tone (currentColor) — the host circle sets the ink color. */

export function AwsIcon({ size = 22 }: IconProps) {
  return (
    <svg {...base} width={size} height={size}>
      <text x="12" y="12.5" textAnchor="middle" fontSize="9" fontWeight="800" fontFamily="Arial, sans-serif" fill="currentColor" letterSpacing="-0.3">
        aws
      </text>
      <path
        d="M4.2 15.6c3.2 2.3 7.9 3.5 11.9 3.5 2.9 0 6.1-.6 8.5-2 .4-.2.7.2.4.5-2.2 2-6.1 4.2-9.9 4.2-4.7 0-8.9-1.7-12.1-4.6-.25-.23-.02-.55.3-.35Z"
        fill="currentColor"
      />
      <path
        d="M23.4 14.7c-.3-.4-2-.2-2.8-.1-.24.03-.27-.18-.06-.33 1.35-.95 3.57-.68 3.83-.36.26.32-.07 2.54-1.34 3.6-.2.16-.38.08-.3-.14.29-.72.93-2.3.65-2.66Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function AzureIcon({ size = 22 }: IconProps) {
  return (
    <svg {...base} width={size} height={size}>
      <path
        d="M9.2 2.2h5.7L9 20.7H2.6L9.2 2.2Z"
        fill="currentColor"
      />
      <path
        d="M15.6 2.2h5.6l-9.1 7.7 7.2 9.1-5.9.3L6 11.7l9.6-9.5Z"
        fill="currentColor"
        opacity="0.6"
      />
    </svg>
  );
}

export function GoogleCloudIcon({ size = 22 }: IconProps) {
  return (
    <svg {...base} width={size} height={size}>
      <path
        d="M14.4 8.2c-.6-2.3-2.7-4-5.2-4-1.9 0-3.6 1-4.5 2.5-2.3.25-4.1 2.2-4.1 4.55 0 2.5 2.05 4.55 4.55 4.55h9c2.1 0 3.8-1.7 3.8-3.8 0-2-1.55-3.65-3.55-3.8Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function KubernetesIcon({ size = 22 }: IconProps) {
  return (
    <svg {...base} width={size} height={size}>
      <path
        d="M12 1.2 2.2 6.4l1.6 10.9L12 22.8l8.2-5.5 1.6-10.9L12 1.2Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M12 5.6v3.1M12 15.3v3.1M6.4 9l2.7 1.5M14.9 13.5l2.7 1.5M6.4 15l2.7-1.5M14.9 10.5l2.7-1.5"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DockerIcon({ size = 22 }: IconProps) {
  return (
    <svg {...base} width={size} height={size}>
      <path
        d="M22.6 9.9c-.5-.4-1.6-.5-2.4-.35a3.4 3.4 0 0 0-.9-1.65l-.4-.35-.35.4c-.45.5-.6 1.35-.55 2-.03.15-.5.35-.6.4H1.7c-.3 1.15-.3 4.75 2.05 6.5 1.75 1.3 4.15 1.65 6.15 1.65 5.05 0 8.9-2.3 10.6-6.5.65.02 2-.02 2.7-1.35.02-.03.15-.3.15-.3l-.75-.45Z"
        fill="currentColor"
      />
      <rect x="4" y="6.2" width="2.4" height="2.2" fill="currentColor" />
      <rect x="7.1" y="6.2" width="2.4" height="2.2" fill="currentColor" />
      <rect x="10.2" y="6.2" width="2.4" height="2.2" fill="currentColor" />
      <rect x="7.1" y="3.3" width="2.4" height="2.2" fill="currentColor" />
      <rect x="10.2" y="3.3" width="2.4" height="2.2" fill="currentColor" />
      <rect x="13.3" y="6.2" width="2.4" height="2.2" fill="currentColor" />
    </svg>
  );
}

export function KafkaIcon({ size = 22 }: IconProps) {
  return (
    <svg {...base} width={size} height={size}>
      <line x1="6" y1="5" x2="6" y2="19" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="6" cy="5" r="1.9" fill="currentColor" />
      <circle cx="6" cy="12" r="1.9" fill="currentColor" />
      <circle cx="6" cy="19" r="1.9" fill="currentColor" />
      <circle cx="15" cy="8" r="1.7" fill="currentColor" />
      <circle cx="15" cy="16" r="1.7" fill="currentColor" />
      <line x1="6" y1="5" x2="15" y2="8" stroke="currentColor" strokeWidth="1.2" />
      <line x1="6" y1="12" x2="15" y2="8" stroke="currentColor" strokeWidth="1.2" />
      <line x1="6" y1="12" x2="15" y2="16" stroke="currentColor" strokeWidth="1.2" />
      <line x1="6" y1="19" x2="15" y2="16" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function RabbitMqIcon({ size = 22 }: IconProps) {
  return (
    <svg {...base} width={size} height={size}>
      <rect x="10.5" y="2" width="2.6" height="6.2" rx="0.6" fill="currentColor" />
      <rect x="6.3" y="3.4" width="2.6" height="5" rx="0.6" fill="currentColor" transform="rotate(-18 7.6 5.9)" />
      <rect x="15" y="3.4" width="2.6" height="5" rx="0.6" fill="currentColor" transform="rotate(18 16.3 5.9)" />
      <path d="M5.5 20.5V13a6.5 6.5 0 0 1 13 0v7.5a1 1 0 0 1-1 1H6.5a1 1 0 0 1-1-1Z" fill="currentColor" />
    </svg>
  );
}

export function PythonIcon({ size = 22 }: IconProps) {
  return (
    <svg {...base} width={size} height={size}>
      <path
        d="M11.9 1.6c-4.2 0-3.9 1.8-3.9 1.8v1.9h4v.6H6.2S3.6 5.6 3.6 9.9s2.3 4.1 2.3 4.1h1.4v-2s-.08-2.3 2.3-2.3h3.9s2.2.04 2.2-2.1V3.7s.34-2.1-3.8-2.1Zm-2.2 1.3a.72.72 0 1 1 0 1.44.72.72 0 0 1 0-1.44Z"
        fill="currentColor"
      />
      <path
        d="M12.1 22.4c4.2 0 3.9-1.8 3.9-1.8v-1.9h-4v-.6h5.8s2.6.3 2.6-4 -2.3-4.1-2.3-4.1h-1.4v2s.08 2.3-2.3 2.3H10.5s-2.2-.04-2.2 2.1v3.9s-.34 2.1 3.8 2.1Zm2.2-1.3a.72.72 0 1 1 0-1.44.72.72 0 0 1 0 1.44Z"
        fill="currentColor"
        opacity="0.55"
      />
    </svg>
  );
}

export function JavaIcon({ size = 22 }: IconProps) {
  return (
    <svg {...base} width={size} height={size}>
      <path
        d="M6.5 16.8c0-1.2 2.6-2 6-2s6 .8 6 2-2.6 2-6 2-6-.8-6-2Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M9 3.5c1.2 1.4-1.2 2.8.6 4.8 1.9 2 .3 3.7.3 3.7s3.1-1.6 1.6-3.9C9.9 5.7 9 3.5 9 3.5Z"
        fill="currentColor"
      />
      <path
        d="M8.3 13.5c-1 .5-1 1.3.9 1.6 2.3.35 5.5.2 7.3-.4 0 0 .5.4-.3.7-2.7 1-8.7 1.1-9.3-.3-.35-.85.4-1.3 1.4-1.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function DotNetIcon({ size = 22 }: IconProps) {
  return (
    <svg {...base} width={size} height={size}>
      <text x="12" y="15.2" textAnchor="middle" fontSize="8.5" fontWeight="800" fontFamily="Arial, sans-serif" fill="currentColor">
        .NET
      </text>
    </svg>
  );
}

export function NodeJsIcon({ size = 22 }: IconProps) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M12 1.3 2 7.1v9.8l10 5.8 10-5.8V7.1L12 1.3Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <text x="12" y="14.8" textAnchor="middle" fontSize="6.5" fontWeight="700" fontFamily="Arial, sans-serif" fill="currentColor">
        node
      </text>
    </svg>
  );
}

export function ReactIcon({ size = 22 }: IconProps) {
  return (
    <svg {...base} width={size} height={size}>
      <circle cx="12" cy="12" r="2.2" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.3">
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </g>
    </svg>
  );
}

export function AngularIcon({ size = 22 }: IconProps) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M12 1.5 21.6 5l-1.46 12.3L12 22.5l-8.14-5.2L2.4 5 12 1.5Z" fill="currentColor" />
      <path
        d="M12 5.1 6.6 17.3h2l1.1-2.7h4.6l1.1 2.7h2L12 5.1Zm1.65 7.8H10.3L12 8.8l1.65 4.1Z"
        fill="var(--bg-secondary, #eee9e0)"
      />
    </svg>
  );
}

export function PostgresIcon({ size = 22 }: IconProps) {
  return (
    <svg {...base} width={size} height={size}>
      <path
        d="M16.9 2.2c-1.9-.2-3.7.35-5 1.28C10.6 3 9 2.9 7.4 3.5 4.9 4.5 3.3 7.2 3.4 10.4c.05 1.9.4 3.55 1.05 4.95a10 10 0 0 0 2.9 3.75c.2 1.5.85 2.8 2.4 3.35.6.2 1.25.15 1.7-.2.35-.28.5-.7.55-1.2.7.1 1.45.1 2.2-.02.06.5.25.9.6 1.15.5.35 1.15.35 1.75.1 1.4-.55 2-1.85 2.2-3.3 1.55-1.2 2.6-3.1 2.9-5.4.35-2.55-.35-5.15-2-6.9a7.2 7.2 0 0 0-3.75-2.5Z"
        fill="currentColor"
      />
      <path
        d="M9.2 10.1c-.2-.02-.4.13-.42.35-.03.35.02.85.4 1.15.3.25.8.3 1.25.1.2-.1.28-.35.18-.55a.42.42 0 0 0-.55-.18c-.2.08-.38.06-.48-.02-.12-.1-.15-.3-.13-.5.02-.2-.07-.33-.25-.35Zm5.9-.15c-.18.02-.3.18-.28.38.02.2-.04.4-.15.5-.1.08-.28.1-.48.02a.42.42 0 0 0-.55.18c-.1.2-.02.45.18.55.45.2.95.15 1.25-.1.38-.3.42-.8.4-1.15a.34.34 0 0 0-.37-.38Z"
        fill="var(--bg-secondary, #eee9e0)"
      />
    </svg>
  );
}

export function MongoDbIcon({ size = 22 }: IconProps) {
  return (
    <svg {...base} width={size} height={size}>
      <path
        d="M12 1.5s4.4 3 4.4 9.4c0 5-2.6 7.3-3.7 8.5-.2.25-.3.55-.35.9l-.15 2.3-.2-2.3c-.05-.35-.15-.65-.35-.9-1.1-1.2-3.7-3.5-3.7-8.5 0-6.4 4.02-9.4 4.02-9.4Z"
        fill="currentColor"
      />
      <path d="M12 3.4v18.2" stroke="var(--bg-secondary, #eee9e0)" strokeWidth="0.6" />
    </svg>
  );
}

export function RedisIcon({ size = 22 }: IconProps) {
  return (
    <svg {...base} width={size} height={size}>
      <rect x="4" y="3.5" width="12" height="6.5" rx="1.4" fill="currentColor" />
      <rect x="7" y="8.7" width="12" height="6.5" rx="1.4" fill="currentColor" opacity="0.72" />
      <rect x="4" y="13.9" width="12" height="6.5" rx="1.4" fill="currentColor" opacity="0.5" />
    </svg>
  );
}
