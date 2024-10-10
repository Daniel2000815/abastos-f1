import React from "react";

export const FogIcon = () => (
  <svg width="56" height="48" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="blur" x="-.20655" y="-.21122" width="1.403" height="1.4997">
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
      <style type="text/css">
        {`
          /*
          ** FOG
          */
          @keyframes am-weather-fog-1 {
            0% { transform: translate(0px, 0px); }
            50% { transform: translate(7px, 0px); }
            100% { transform: translate(0px, 0px); }
          }

          .am-weather-fog-1 {
            animation-name: am-weather-fog-1;
            animation-duration: 8s;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }

          @keyframes am-weather-fog-2 {
            0% { transform: translate(0px, 0px); }
            21.05% { transform: translate(-6px, 0px); }
            78.95% { transform: translate(9px, 0px); }
            100% { transform: translate(0px, 0px); }
          }

          .am-weather-fog-2 {
            animation-name: am-weather-fog-2;
            animation-duration: 20s;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }

          @keyframes am-weather-fog-3 {
            0% { transform: translate(0px, 0px); }
            25% { transform: translate(4px, 0px); }
            75% { transform: translate(-4px, 0px); }
            100% { transform: translate(0px, 0px); }
          }

          .am-weather-fog-3 {
            animation-name: am-weather-fog-3;
            animation-duration: 6s;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }

          @keyframes am-weather-fog-4 {
            0% { transform: translate(0px, 0px); }
            50% { transform: translate(-4px, 0px); }
            100% { transform: translate(0px, 0px); }
          }

          .am-weather-fog-4 {
            animation-name: am-weather-fog-4;
            animation-duration: 6s;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }
        `}
      </style>
    </defs>
    <g transform="translate(16,-2)" filter="url(#blur)">
      <g className="am-weather-fog" transform="translate(-10,20)" fill="none" stroke="#c6deff" strokeLinecap="round" strokeWidth="2">
        <line className="am-weather-fog-1" y1="0" y2="0" x1="1" x2="37" strokeDasharray="3, 5, 17, 5, 7" />
        <line className="am-weather-fog-2" y1="5" y2="5" x1="9" x2="33" strokeDasharray="11, 7, 15" />
        <line className="am-weather-fog-3" y1="10" y2="10" x1="5" x2="40" strokeDasharray="11, 7, 3, 5, 9" />
        <line className="am-weather-fog-4" y1="15" y2="15" x1="7" x2="42" strokeDasharray="13, 5, 9, 5, 3" />
      </g>
    </g>
  </svg>
);

