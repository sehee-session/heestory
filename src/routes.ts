import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  // story
  index('pages/ui/stories.tsx'),
  route('stories/new', 'pages/ui/create-story.tsx'),
  route('stories/:id', 'pages/ui/story.tsx'),
  route('stories/:id/edit', 'pages/ui/edit-story.tsx'),

  // auth
  route('sign-in', 'pages/ui/sign-in.tsx'),

  // user
  route('users/:id', 'pages/ui/user.tsx'),

  // action
  // theme
  route('color-mode', 'api/action/color-mode.ts'),

  // backend
  // auth
  route('api/auth', 'api/auth/index.ts'),

  //
  route('*', 'pages/ui/not-found.tsx'),
] satisfies RouteConfig;
