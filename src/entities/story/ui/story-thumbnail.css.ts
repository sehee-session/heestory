import { style } from '@vanilla-extract/css';

export const thumbnail = style({
  display: 'block',
  width: '100%',
  aspectRatio: '16 / 9',
  objectFit: 'fill',
  overflow: 'hidden',
});
