import { style } from '@vanilla-extract/css';

export const thumbnail = style({
  display: 'block',
  width: '100%',
  aspectRatio: '16 / 10',
  objectFit: 'fill',
  overflow: 'hidden',
});
