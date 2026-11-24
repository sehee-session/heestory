import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import * as styles from './tabs.css';

const Root = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseTabs.Root>) => (
  <BaseTabs.Root className={className ?? styles.root} {...props} />
);

const List = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseTabs.List>) => (
  <BaseTabs.List className={className ?? styles.list} {...props} />
);

const Tab = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseTabs.Tab>) => (
  <BaseTabs.Tab className={className ?? styles.tab} {...props} />
);

const Panel = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseTabs.Panel>) => (
  <BaseTabs.Panel className={className ?? styles.panel} {...props} />
);

const Indicator = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseTabs.Indicator>) => (
  <BaseTabs.Indicator className={className ?? styles.indicator} {...props} />
);

export const Tabs = {
  Root,
  List,
  Tab,
  Panel,
  Indicator,
};
