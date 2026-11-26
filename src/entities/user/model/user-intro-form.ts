import type {
  FormAsyncValidateOrFn,
  FormValidateOrFn,
  ReactFormExtendedApi,
} from '@tanstack/react-form';

type UserIntroFormValues = { intro: string };

type UserValidator = FormValidateOrFn<UserIntroFormValues> | undefined;
type UserAsyncValidator =
  FormAsyncValidateOrFn<UserIntroFormValues> | undefined;

export type UserIntroFormApi = ReactFormExtendedApi<
  UserIntroFormValues,
  UserValidator,
  UserValidator,
  UserAsyncValidator,
  UserValidator,
  UserAsyncValidator,
  UserValidator,
  UserAsyncValidator,
  UserValidator,
  UserAsyncValidator,
  UserAsyncValidator,
  unknown
>;
