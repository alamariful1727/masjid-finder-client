import React from 'react';

interface IconProps {
  style?: Object;
  fill?: string;
  width?: string | number;
  height?: string | number;
  className?: string | undefined;
}

export const CancelIcon = (props: IconProps) => (
  <svg
    width={props.width ? props.width : '100%'}
    style={props.style}
    xmlns="http://www.w3.org/2000/svg"
    className={`svg-icon w-auto ${props.className || ''}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 100 100"
  >
    <path d="M14.65 85.49a6.55 6.55 0 01-2.2-9.12 207.39 207.39 0 0129.18-36.1 286.04 286.04 0 0134.91-29.28 6.06 6.06 0 018.56 1.49 6.58 6.58 0 01-1.06 8.73c-11.1 9.46-21.59 19.56-30.95 30.52a190.9 190.9 0 00-23.84 34.76 6.07 6.07 0 01-8.43 2.55l-6.17-3.55z" />
    <path d="M78.74 82.44a6.57 6.57 0 01-8.92-2.15c-6.36-10.27-14.54-19.72-23.7-28.4-9.3-8.83-19.58-16.9-30.28-24.6a6.6 6.6 0 01-1.69-8.94l1.23-1.9a6.6 6.6 0 019.03-2.01c11.57 7.19 22.97 14.94 33.74 23.86 10.67 8.86 20.78 18.96 29.16 30.73a6.62 6.62 0 01-2.01 9.55l-6.56 3.86z" />
  </svg>
);
