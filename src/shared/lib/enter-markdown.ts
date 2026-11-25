export const handleMarkdownEnter = (
  event: React.KeyboardEvent<HTMLTextAreaElement>,
  onChange: (value: string) => void,
) => {
  if (event.key !== 'Enter' || event.shiftKey) return;

  const textarea = event.currentTarget;
  const { value, selectionStart, selectionEnd } = textarea;

  const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;
  const lineEnd = value.indexOf('\n', selectionStart);

  const line = value.slice(lineStart, lineEnd === -1 ? value.length : lineEnd);

  const match = line.match(/^(\s*)([-*+]|\d+\.)\s+(.*)$/);

  if (!match) return;

  const [, indent, marker, content] = match;

  // 빈 목록 항목이면 목록 종료
  if (!content.trim()) {
    event.preventDefault();

    const newValue = value.slice(0, lineStart) + value.slice(selectionStart);

    onChange(newValue);

    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(lineStart, lineStart);
    });

    return;
  }

  event.preventDefault();

  const nextMarker = /^\d+\.$/.test(marker)
    ? `${Number.parseInt(marker, 10) + 1}.`
    : marker;

  const insertion = `\n${indent}${nextMarker} `;

  const newValue =
    value.slice(0, selectionStart) + insertion + value.slice(selectionEnd);

  const cursorPosition = selectionStart + insertion.length;

  onChange(newValue);

  requestAnimationFrame(() => {
    textarea.focus({ preventScroll: true });
    textarea.setSelectionRange(cursorPosition, cursorPosition);
  });
};
