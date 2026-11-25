import { HEADING_SELECT, MARKDOWN_STRATEGIES } from '../constants/md-helper';
import { Button } from './button';
import { Icon } from './icon';
import * as styles from './md-helper.css';

type MarkdownStrategyValue =
  (typeof MARKDOWN_STRATEGIES)[keyof typeof MARKDOWN_STRATEGIES]['value'];

export const MarkdownHelper = ({
  textareaRef,
  onChangeTextarea,
}: {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  onChangeTextarea: (value: string) => void;
}) => {
  const onApplyStrategy = (key: keyof typeof MARKDOWN_STRATEGIES) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const scrollTop = textarea.scrollTop;
    const scrollLeft = textarea.scrollLeft;

    const result = MARKDOWN_STRATEGIES[key].execute({
      value: textarea.value,
      selectionStart: textarea.selectionStart,
      selectionEnd: textarea.selectionEnd,
    });

    onChangeTextarea(result.text);

    requestAnimationFrame(() => {
      textarea.focus({ preventScroll: true });

      textarea.setSelectionRange(result.selectionStart, result.selectionEnd);

      textarea.scrollTop = scrollTop;
      textarea.scrollLeft = scrollLeft;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.group}>
        <select
          className={styles.headingSelect}
          aria-label="Heading"
          value=" "
          onChange={(event) =>
            onApplyStrategy(event.target.value as MarkdownStrategyValue)
          }
        >
          <option value=" ">Heading</option>
          {HEADING_SELECT.map((action) => (
            <option key={action.value} value={action.value}>
              {action.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.group}>
        <Button
          variant="icon"
          type="button"
          aria-label={MARKDOWN_STRATEGIES.bold.label}
          title={MARKDOWN_STRATEGIES.bold.label}
          onClick={() => onApplyStrategy(MARKDOWN_STRATEGIES.bold.value)}
        >
          <Icon icon="bold" />
        </Button>
        <Button
          variant="icon"
          type="button"
          aria-label={MARKDOWN_STRATEGIES.italic.label}
          title={MARKDOWN_STRATEGIES.italic.label}
          onClick={() => onApplyStrategy(MARKDOWN_STRATEGIES.italic.value)}
        >
          <Icon icon="italic" />
        </Button>
        <Button
          variant="icon"
          type="button"
          aria-label={MARKDOWN_STRATEGIES.strikethrough.label}
          title={MARKDOWN_STRATEGIES.strikethrough.label}
          onClick={() =>
            onApplyStrategy(MARKDOWN_STRATEGIES.strikethrough.value)
          }
        >
          <Icon icon="lineThrough" />
        </Button>
      </div>

      <div className={styles.group}>
        <Button
          variant="icon"
          type="button"
          aria-label={MARKDOWN_STRATEGIES.codeBlock.label}
          title={MARKDOWN_STRATEGIES.codeBlock.label}
          onClick={() => onApplyStrategy(MARKDOWN_STRATEGIES.codeBlock.value)}
        >
          <Icon icon="code" />
        </Button>
        <Button
          variant="icon"
          type="button"
          aria-label={MARKDOWN_STRATEGIES.unorderedList.label}
          title={MARKDOWN_STRATEGIES.unorderedList.label}
          onClick={() =>
            onApplyStrategy(MARKDOWN_STRATEGIES.unorderedList.value)
          }
        >
          <Icon icon="ul" />
        </Button>
        <Button
          variant="icon"
          type="button"
          aria-label={MARKDOWN_STRATEGIES.orderedList.label}
          title={MARKDOWN_STRATEGIES.orderedList.label}
          onClick={() => onApplyStrategy(MARKDOWN_STRATEGIES.orderedList.value)}
        >
          <Icon icon="ol" />
        </Button>
        <Button
          variant="icon"
          type="button"
          aria-label={MARKDOWN_STRATEGIES.link.label}
          title={MARKDOWN_STRATEGIES.link.label}
          onClick={() => onApplyStrategy(MARKDOWN_STRATEGIES.link.value)}
        >
          <Icon icon="link" />
        </Button>
        <Button
          variant="icon"
          type="button"
          aria-label={MARKDOWN_STRATEGIES.table.label}
          title={MARKDOWN_STRATEGIES.table.label}
          onClick={() => onApplyStrategy(MARKDOWN_STRATEGIES.table.value)}
        >
          <Icon icon="table" />
        </Button>
        <Button
          variant="icon"
          type="button"
          aria-label={MARKDOWN_STRATEGIES.footnote.label}
          title={MARKDOWN_STRATEGIES.footnote.label}
          onClick={() => onApplyStrategy(MARKDOWN_STRATEGIES.footnote.value)}
        >
          <span className={styles.footnoteIcon}>¹</span>
        </Button>
      </div>
    </div>
  );
};
