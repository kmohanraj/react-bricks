import { ReactNode, useState } from "react";
import { Button } from "../Button/Button";
import "./tabs.scss";

type Tab = {
  key: string;
  label: string;
};

type TabsProps = {
  tabs: Tab[];
  defaultTab?: string;
  isNormalTab?: boolean;
  customClass?: string;
  children: (activeTab: string) => ReactNode;
  onClick?: (key: string) => void;
};

export const Tabs = ({
  tabs,
  defaultTab,
  isNormalTab,
  customClass,
  children,
  onClick,
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0].key);
  onClick?.(activeTab);
  return (
    <div className={customClass}>
      <div className={`tabs-container ${isNormalTab ? "normal" : ""}`}>
        {tabs.map((tab) => (
          <Button
            key={tab.key}
            label={tab.label}
            customClass={`tab-btn ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          />
        ))}
      </div>
      <div className="tabs-content">{children(activeTab)}</div>
    </div>
  );
};
