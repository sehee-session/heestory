import { style } from '@vanilla-extract/css';
import { vars } from '../styles';

export const backdrop = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
});

export const viewport = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const popup = style({
  backgroundColor: vars.color.bg,
  borderRadius: vars.radius.md,
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  padding: vars.spacing.lg,
  gap: vars.spacing.lg,
  display: 'flex',
  flexDirection: 'column',
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.sm,
});

export const actions = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: vars.spacing.sm,
});

export const title = style({
  fontSize: vars.fontSize.lg,
  fontWeight: vars.fontWeight.bold,
});

export const description = style({
  fontSize: vars.fontSize.md,
  color: vars.color.text,
});
