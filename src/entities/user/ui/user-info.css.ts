import { style } from '@vanilla-extract/css';
import { vars } from '~/shared/styles';

export const root = style({
  display: 'flex',
  alignItems: 'start',
  gap: vars.spacing.lg,
  padding: vars.spacing.md,
});

export const avatar = style({
  width: vars.size['3xl'],
  height: vars.size['3xl'],
  objectFit: 'cover',
  borderRadius: vars.radius.full,
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.xs,
  flex: 1,
});

export const link = style({
  fontSize: vars.fontSize.md,
  color: vars.color.accent,
  textDecoration: 'none',
  ':hover': { textDecoration: 'underline' },
});

export const intro = style({
  fontSize: vars.fontSize.sm,
  color: vars.color.textDim,
  lineHeight: 1.5,
});

export const actions = style({
  display: 'flex',
  gap: vars.spacing.sm,
  flexDirection: 'row',
});
