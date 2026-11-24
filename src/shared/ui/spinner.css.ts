import { keyframes, style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../styles';

const spin = keyframes({
  to: { transform: 'rotate(360deg)' },
});

const base = style({
  alignSelf: 'center',
  border: `1px solid ${vars.color.border}`,
  borderTopColor: vars.color.accent,
  borderRadius: vars.radius.full,
  animation: `${spin} 0.7s linear infinite`,
});

export const spinner = styleVariants({
  sm: [base, { width: vars.size.sm, height: vars.size.sm }],
  md: [base, { width: vars.size.md, height: vars.size.md }],
  lg: [base, { width: vars.size.lg, height: vars.size.lg }],
  xl: [base, { width: vars.size.xl, height: vars.size.xl }],
});
