import { style } from '@vanilla-extract/css';
import { vars } from '~/shared/styles';

export const thumbnail = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  aspectRatio: '16 / 9',
  overflow: 'hidden',
  color: vars.color.textDim,
  fontFamily: 'monospace',
  padding: `0 ${vars.spacing.md}`,
});

export const thumbnailImage = style({
  display: 'block',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});
