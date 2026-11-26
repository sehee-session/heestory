import { style } from '@vanilla-extract/css';
import { vars } from '~/shared/styles';

export const main = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing['2xl'],
  padding: vars.spacing.md,
  alignItems: 'flex-end',
});

export const section = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.size.md,
});
