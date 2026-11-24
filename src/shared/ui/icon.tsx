import {
  BoldIcon,
  CheckCircle2Icon,
  CircleAlertIcon,
  ClipboardCheckIcon,
  ClipboardIcon,
  CodeIcon,
  EyeIcon,
  FileTextIcon,
  InfoIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  LoaderCircleIcon,
  LogOutIcon,
  MoonIcon,
  PencilLineIcon,
  RssIcon,
  SaveIcon,
  StrikethroughIcon,
  SunIcon,
  TableIcon,
  TriangleAlertIcon,
  XIcon,
} from 'lucide-react';

const ICON_LIST = {
  // General icons
  signOut: LogOutIcon,
  preview: EyeIcon,
  write: PencilLineIcon,
  save: SaveIcon,
  latest: RssIcon,
  lightmode: SunIcon,
  darkmode: MoonIcon,
  close: XIcon,

  // api status icon
  error: CircleAlertIcon,
  empty: FileTextIcon,

  // Markdown icons
  copy: ClipboardIcon,
  copy_success: ClipboardCheckIcon,
  bold: BoldIcon,
  code: CodeIcon,
  italic: ItalicIcon,
  link: LinkIcon,
  ul: ListIcon,
  ol: ListOrderedIcon,
  lineThrough: StrikethroughIcon,
  table: TableIcon,

  // toast icons
  toast_success: CheckCircle2Icon,
  toast_error: CircleAlertIcon,
  toast_info: InfoIcon,
  toast_warning: TriangleAlertIcon,
  toast_loader: LoaderCircleIcon,
};

export const Icon = ({
  icon,
  size,
  ...props
}: {
  icon: keyof typeof ICON_LIST;
  size?: number;
} & React.ComponentProps<'svg'>) => {
  const IconComponent = ICON_LIST[icon];

  return IconComponent ? <IconComponent size={size} {...props} /> : null;
};
