import { FC, ReactNode, useState } from "react";
import cx from "classnames";
import "./layout.scss";

export interface LayoutProps {
  children: ReactNode;

  /** Header */
  header?: ReactNode;
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
  activePath?: string;

  /** Sidebar */
  showSidebar?: boolean;
  sidebar?: ReactNode;
  sidebarHeader?: ReactNode;
  sidebarCollapsible?: boolean;
  isSidebarCollapsed?: boolean;
  onSidebarCollapsedChange?: (collapsed: boolean) => void;

  /** Footer */
  footer?: ReactNode;

  /** Layout behavior */
  headerSticky?: boolean;
  footerFixed?: boolean;
  isFooterSticky?: boolean;

  /** Sidebar width (optional for CSS variables) */
  sidebarWidth?: number;
}

export const Layout: FC<LayoutProps> = ({
  children,

  header,
  headerLeft,
  headerRight,
  activePath,
  sidebar,
  showSidebar = false,
  sidebarHeader,
  sidebarCollapsible = false,
  isSidebarCollapsed = false,
  onSidebarCollapsedChange,

  footer,

  headerSticky = true,
  footerFixed = false,
  isFooterSticky = false,

  sidebarWidth = 260,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const { pathname: activePath } = useLocation();

  const toggleSidebar = () => setSidebarOpen((p) => !p);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div
      className={cx("layout-shell", {
        open: sidebarOpen,
        "layout-shell--sidebar": showSidebar,
      })}
      style={
        {
          "--sidebar-width": `${sidebarWidth}px`,
        } as React.CSSProperties
      }
    >
      {/* Mobile Backdrop */}
      {showSidebar && (
        <div className="sidebar-backdrop" onClick={closeSidebar} />
      )}

      {/* Sidebar */}
      {showSidebar && (
        <aside className="sidebar">
          {sidebarHeader && (
            <div className="sidebar-header">{sidebarHeader}</div>
          )}

          <div className="menu" onClick={closeSidebar}>
            {sidebar}
          </div>

          {sidebarCollapsible && (
            <div
              className="sidebar-collapse-toggle"
              onClick={() =>
                onSidebarCollapsedChange?.(!isSidebarCollapsed)
              }
            >
              <span className="sidebar-collapse-arrow">
                {isSidebarCollapsed ? "›" : "‹"}
              </span>
            </div>
          )}
        </aside>
      )}

      {/* Main */}
      <div className="layout-main">
        <header
          className={cx("layout-header", {
            "layout-header--sticky": headerSticky,
          })}
        >
          {showSidebar && (
            <button
              className="sidebar-toggle"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              ☰
            </button>
          )}

          <div className="layout-header__left">
            {headerLeft ??
              (typeof header === "string" ? (
                <span>{header}</span>
              ) : (
                header
              ))}
          </div>

          <div className="layout-header__right">
            {headerRight}
            {/* {headerRight?.map((item: TNavbarItem) => (
              <a
                key={item.path}
                href={item.path}
                className={cx("cursor dashboard-layout__navbar-link", {
                  active: item.path === activePath,
                })}
                onClick={(e) => {
                  if (item.onClick) {
                    e.preventDefault();
                    item.onClick();
                  }
                }}
              >
                {item.label}
              </a>
            ))} */}
          </div>
        </header>

        <main
          className={cx("layout-content", {
            "layout-content--sidebar": showSidebar,
          })}
          style={{
            paddingBottom: footerFixed ? 60 : 0,
          }}
        >
          {children}
        </main>

        {footer && (
          <footer
            className={cx("layout-footer", {
              "layout-footer--fixed": footerFixed,
              "layout-footer--sticky": isFooterSticky,
            })}
          >
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
};

// // Backward compatibility exports
// export const AdminLayout = Layout;
// export const NormalLayout = Layout;
