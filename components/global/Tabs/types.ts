export interface Tab {
  name: string;
  type: string;
  slug?: string;
  href?: string;
  current?: boolean;
  icon?: any;
}

export interface TabsProps {
  tabs: Tab[];
  className?: string;
  itemTabClassName?: string;
  aditionalItemTabClassName?: string;
  activeTabClassName?: string;
  inactiveTabClassName?: string;
  primary?: boolean;
  activeTab: Tab;
  onClick: (tab: Tab) => void;
  hideMore?: boolean;
  boderBottomColor?: string;
}
