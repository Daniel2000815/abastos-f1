import React from 'react';
import './rainy-3.css'; // Opcional: Puedes mover los estilos a un archivo CSS

export const RainIcon = () => {
  return (
    <svg width="50" height="40" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="blur" x="-.24684" y="-.22892" width="1.4937" height="1.5576">
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

      <g transform="translate(16,-2)" filter="url(#blur)">
        <g className="am-weather-cloud-3">
          <path
            transform="translate(-20,-11)"
            d="m47.7 35.4c0-4.6-3.7-8.2-8.2-8.2-1 0-1.9 0.2-2.8 0.5-0.3-3.4-3.1-6.2-6.6-6.2-3.7 0-6.7 3-6.7 6.7 0 0.8 0.2 1.6 0.4 2.3-0.3-0.1-0.7-0.1-1-0.1-3.7 0-6.7 3-6.7 6.7 0 3.6 2.9 6.6 6.5 6.7h17.2c4.4-0.5 7.9-4 7.9-8.4z"
            fill="#57a0ee"
            stroke="#fff"
            strokeLinejoin="round"
            strokeWidth="1.2"
          />
        </g>

        <g transform="translate(-20,-10) rotate(10,-247.39,200.17)" fill="none" stroke="#91c0f8" strokeDasharray="4, 4" strokeLinecap="round" strokeWidth="2">
          <line className="am-weather-rain-1" transform="translate(-4,1)" y2="8" />
          <line className="am-weather-rain-2" transform="translate(0,-1)" y2="8" />
          <line className="am-weather-rain-1" transform="translate(4)" y2="8" />
        </g>
      </g>
    </svg>
  );
};

