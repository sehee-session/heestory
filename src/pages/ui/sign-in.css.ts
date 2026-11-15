import { style } from '@vanilla-extract/css';
import { vars } from '~/shared/styles';

export const root = style({
  display: 'flex',
  width: '100%',
  minHeight: '100vh',
  backgroundColor: vars.color.bg,
  flexDirection: 'column',
});

export const content = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.md,
  flex: 1,
  padding: vars.spacing.md,
});

export const message = style({
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.md,
});

export const code = style({
  display: 'inline-block',
  padding: `${vars.spacing.xs} ${vars.spacing.md}`,
  color: vars.color.error,
  borderRadius: vars.radius.full,
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.bold,
  letterSpacing: '0.08em',
});

export const heading = style({
  color: vars.color.text,
  fontSize: 'clamp(2rem, 6vw, 2.75rem)',
  fontWeight: vars.fontWeight.bold,
  lineHeight: 1.2,
  letterSpacing: '-0.05em',
});

export const description = style({
  color: vars.color.textDim,
  fontSize: vars.fontSize.md,
  lineHeight: 1.7,
});

export const actions = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: vars.spacing.md,
});

export const footer = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: vars.spacing.sm,
  padding: vars.spacing.md,
  borderTop: `1px solid ${vars.color.border}`,
  color: vars.color.textDim,
  fontSize: vars.fontSize.xs,
  fontFamily: 'monospace',
});
