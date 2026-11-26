import React from 'react';
import * as styles from './textarea.css';

export const Textarea = (props: React.ComponentProps<'textarea'>) => (
  <textarea {...props} className={styles.container} />
);
