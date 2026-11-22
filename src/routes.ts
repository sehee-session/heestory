import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  // story
  index('pages/ui/stories.tsx'),
  route('stories/new', 'pages/ui/write-story.tsx'),
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
  route('api/auth/sign-in', 'api/auth/sign-in.ts'),
  route('api/auth/callback', 'api/auth/callback.ts'),
  route('api/auth/sign-out', 'api/auth/sign-out.ts'),

  // story
  route('api/story/list', 'api/story/list.tsx'),
  // route('api/story/:id', 'api/story/update.tsx'),
  route('api/story', 'api/story/create.tsx'),
  //
  route('*', 'pages/ui/not-found.tsx'),
] satisfies RouteConfig;
