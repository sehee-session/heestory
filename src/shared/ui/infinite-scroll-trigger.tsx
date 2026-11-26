import React from 'react';
import * as styles from './infinite-scroll-trigger.css';

type InfiniteScrollTriggerProps = {
  onIntersect: () => void;
  enabled?: boolean;
  rootMargin?: string;
};

export const InfiniteScrollTrigger = ({
  onIntersect,
  enabled = true,
  rootMargin = '200px',
}: InfiniteScrollTriggerProps) => {
  const targetRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const target = targetRef.current;

    if (!target || !enabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          onIntersect();
        }
      },
      { root: null, rootMargin, threshold: 0 },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [enabled, onIntersect, rootMargin]);

  return <div ref={targetRef} className={styles.trigger} aria-hidden="true" />;
};
