import { style } from '@vanilla-extract/css';
import { vars } from '../styles';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.spacing.md,
  padding: vars.spacing['2xl'],
  textAlign: 'center',
});

export const thumbnail = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: vars.size['2xl'],
  height: vars.size['2xl'],
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.bg,
  color: vars.color.text,
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.spacing.xs,
});

export const title = style({
  fontSize: vars.fontSize.md,
  fontWeight: vars.fontWeight.semibold,
  color: vars.color.text,
});

export const description = style({
  fontSize: vars.fontSize.sm,
  color: vars.color.textDim,
});

export const action = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: vars.spacing.xs,
});
