import type React from 'react';
import { Input } from '~/shared/ui/input';
import type { UserIntroFormApi } from '../model/user-intro-form';
import * as styles from './edit-user-intro-form.css';

export const EditUserIntroForm = ({
  form,
  ...props
}: {
  form: UserIntroFormApi;
} & React.FormHTMLAttributes<HTMLFormElement>) => {
  return (
    <form {...props} className={styles.form}>
      <form.Field
        name="intro"
        children={(field) => (
          <label htmlFor={field.name}>
            <Input
              placeholder="Introduce yourself"
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
            />
          </label>
        )}
      />
    </form>
  );
};
