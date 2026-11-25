import { style } from '@vanilla-extract/css';
import { vars } from '~/shared/styles';

export const author = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
  color: vars.color.text,
  textDecoration: 'none',
});

export const avatar = style({
  width: vars.size.lg,
  height: vars.size.lg,
  borderRadius: vars.radius.full,
  objectFit: 'cover',
});

export const avatarFallback = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: vars.size.lg,
  height: vars.size.lg,
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.surface,
  color: vars.color.text,
  fontWeight: vars.fontWeight.semibold,
});
