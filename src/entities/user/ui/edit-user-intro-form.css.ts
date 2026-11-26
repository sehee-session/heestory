import { style } from '@vanilla-extract/css';
import { vars } from '~/shared/styles';

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.md,
});
