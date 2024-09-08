import React from "react";

export const Emergencies = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 256 256"
      fill="none"
      id="my-svg"
    >
      <defs>
        <linearGradient id="gradient1">
          <stop class="stop1" offset="0%" stop-color="#8f66ff" />
          <stop class="stop2" offset="100%" stop-color="#3d12ff" />
        </linearGradient>
      </defs>

      <g id="group" transform="translate(0,0) scale(1)">
        <path
          d="M32 80S32 53.333 42.667 42.667s21.333 -10.667 21.333 -10.667m160 48S224 53.333 213.333 42.667s-21.333 -10.667 -21.333 -10.667M85.333 192c4.885 18.4 22.133 32 42.667 32 20.533 0 37.771 -13.6 42.667 -32"
          stroke="#f32b0d"
          stroke-width="14"
          stroke-linecap="round"
          stroke-linejoin="round"
          id="secondary"
        />
        <path
          d="M53.333 106.667a74.667 74.667 0 0 1 74.667 -74.667v0a74.667 74.667 0 0 1 74.667 74.667v37.632a21.333 21.333 0 0 0 2.251 9.536l11.36 22.72A10.667 10.667 0 0 1 206.741 192H49.259a10.667 10.667 0 0 1 -9.536 -15.435l11.36 -22.72A21.333 21.333 0 0 0 53.333 144.288V106.667Z"
          stroke="#fcfcfc"
          stroke-width="14"
          stroke-linecap="round"
          stroke-linejoin="round"
          id="primary"
        />
      </g>
    </svg>
  );
};
