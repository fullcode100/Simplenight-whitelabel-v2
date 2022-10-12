export interface Tab {
  value: string;
  type: string;
  href?: string;
  current?: boolean;
  icon?: any;
}

export interface TabsProps {
  tabs: Tab[];
  className?: string;
  primary?: boolean;
  activeTab: Tab;
  onClick: (tab: Tab) => void;
}
