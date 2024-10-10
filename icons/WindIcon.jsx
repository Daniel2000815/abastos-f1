import React from "react";

export const WindIcon = () => (
  <svg width="56" height="48" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="blur" x="-.24684" y="-.27097" width="1.4937" height="1.6939">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
        <feOffset dx="0" dy="4" result="offsetblur" />
        <feComponentTransfer>
          <feFuncA slope="0.05" type="linear" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g transform="translate(16 -2)" filter="url(#blur)">
      <g className="am-weather-wind" transform="translate(-16,10)" fill="none" stroke="#57A0EE" strokeLinecap="round" strokeWidth="2">
        <path strokeDasharray="150 10" d="M25.5 5A4 4 0 1 1 29 11H10">
          <animate attributeName="stroke-dashoffset" dur="3s" repeatCount="indefinite" values="0; 160" begin="0s" />
        </path>
        <path strokeDasharray="144 16" d="M39.5 11A4 4 0 1 1 43 17H6">
          <animate attributeName="stroke-dashoffset" dur="3s" repeatCount="indefinite" values="0; 160" begin="0.5s" />
        </path>
        <path strokeDasharray="150 10" d="M28.5 29A4 4 0 1 0 32 23H15">
          <animate attributeName="stroke-dashoffset" dur="3s" repeatCount="indefinite" values="0; 160" begin="0.25s" />
        </path>
      </g>
    </g>
  </svg>
);

