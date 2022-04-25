export interface Tab {
  value: string;
  href?: string;
  current?: boolean;
  icon?: any;
}

export interface TabsProps {
  tabs: Tab[];
  className?: string;
  primary?: boolean;
  onClick: (tab: Tab, setActiveTab: (tab: Tab) => void) => void;
}
