import React from 'react';
import { handleMarkdownEnter } from '~/shared/libs';
import { Input, MarkdownHelper, Textarea } from '~/shared/ui';
import type { StoryFormApi } from '../model/story-form';
import * as styles from './story-form.css';

export const StoryForm = ({
  form,
  ...props
}: {
  form: StoryFormApi;
} & React.FormHTMLAttributes<HTMLFormElement>) => {
  const ref = React.useRef<HTMLTextAreaElement>(null);

  return (
    <form className={styles.form} {...props}>
      <form.Field
        name="title"
        children={(field) => (
          <label htmlFor={field.name}>
            <Input
              placeholder="Title"
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
            />
          </label>
        )}
      />
      <form.Field
        name="content"
        children={(field) => (
          <label htmlFor={field.name}>
            <MarkdownHelper
              textareaRef={ref}
              onChangeTextarea={field.handleChange}
            />
            <Textarea
              ref={ref}
              rows={15}
              placeholder="Tell your story..."
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              onKeyDown={(event) =>
                handleMarkdownEnter(event, field.handleChange)
              }
            />
          </label>
        )}
      />
    </form>
  );
};
