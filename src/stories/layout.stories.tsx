import type { Meta, StoryObj } from "@storybook/react-vite";
import { Layout } from "../components";

const adminMeta: Meta<typeof Layout> = {
  title: "React-Bricks/Layout",
  component: Layout,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    sidebar: {
      control: false,
      description: "Sidebar navigation content",
    },
    header: {
      control: false,
      description: "Legacy header content (use headerLeft/headerRight instead)",
    },
    children: {
      control: false,
      description: "Main page content area",
    },
    footer: {
      control: false,
      description: "Footer content",
    },
    showSidebar: {
      control: "boolean",
      description: "Show/hide sidebar",
      defaultValue: true,
    },
    sidebarCollapsible: {
      control: "boolean",
      description: "Enable sidebar collapse functionality",
      defaultValue: false,
    },
    sidebarWidth: {
      control: "number",
      description: "Sidebar width in pixels",
      defaultValue: 260,
    },
    isSidebarCollapsed: {
      control: "boolean",
      description: "Sidebar collapsed state",
      defaultValue: false,
    },
    isFooterSticky: {
      control: "boolean",
      description: "Make footer stick to the bottom",
      defaultValue: false,
    },
    headerLeft: {
      control: false,
      description: "Left section of header (typically dashboard title)",
    },
    headerRight: {
      control: false,
      description: "Right section of header (typically menus/actions/user profile)",
    },
    sidebarHeader: {
      control: false,
      description: "Sidebar header content (logo/brand)",
    },
  },
};

export default adminMeta;

type AdminStory = StoryObj<typeof adminMeta>;

// Sample sidebar navigation matching the Ananya Finance design
const SampleSidebar = ({ activePage = "Dashboard" }: { activePage?: string }) => (
  <>
    {[
      { label: "Dashboard", href: "#dashboard" },
      { label: "Organizations", href: "#organizations" },
      { label: "Subscriptions", href: "#subscriptions" },
      { label: "Branches", href: "#branches" },
      { label: "Finance", href: "#finance" },
      { label: "Expense", href: "#expense" },
      { label: "Customer Map", href: "#customer-map" },
      { label: "Users", href: "#users" },
      { label: "Reports", href: "#reports" },
      { label: "Profile", href: "#profile" },
      { label: "Logout", href: "#logout" },
    ].map((item) => (
      <a
        key={item.href}
        href={item.href}
        className={`dashboard-layout__sidebar-link ${activePage === item.label ? "active" : ""}`}
      >
        <span>{item.label}</span>
      </a>
    ))}
  </>
);

const HeaderRight = ({ activePage = "Dashboard" }: { activePage?: string }) => (
  <>
    {[
      { label: "Organizations", href: "#organizations" },
      { label: "Subscriptions", href: "#subscriptions" },
      { label: "Branches", href: "#branches" },
      { label: "Finance", href: "#finance" },
      { label: "Expense", href: "#expense" },
      { label: "Customer Map", href: "#customer-map" },
      { label: "Users", href: "#users" },
      { label: "Reports", href: "#reports" },
      { label: "Profile", href: "#profile" },
      { label: "Logout", href: "#logout" },
    ].map((item) => (
      <a
        key={item.href}
        href={item.href}
        className={`dashboard-layout__sidebar-link ${activePage === item.label ? "active" : ""}`}
      >
        <span>{item.label}</span>
      </a>
    ))}
  </>
);

// Sample main content matching the Branches page design
const SampleContent = () => (
  <div>
    <div style={{ marginBottom: "24px" }}>
      <button
        style={{
          padding: "10px 16px",
          marginRight: "12px",
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        Open Drawer
      </button>
      <button
        style={{
          padding: "10px 16px",
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        Open Modal
      </button>
    </div>

    <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h2 style={{ margin: 0, fontSize: "28px", fontWeight: "600", color: "#1e293b" }}>Branches</h2>
      <button
        style={{
          padding: "10px 18px",
          background: "#0891b2",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "600",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span>+</span>
        <span>Add Branch</span>
      </button>
    </div>

    <div
      style={{
        background: "#fff",
        borderRadius: "8px",
        border: "1px solid #e5e7eb",
        overflow: "hidden",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e5e7eb" }}>
            <th style={{ padding: "14px 16px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#64748b" }}>
              ID ↑
            </th>
            <th style={{ padding: "14px 16px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#64748b" }}>
              Branch Name ↑
            </th>
            <th style={{ padding: "14px 16px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#64748b" }}>
              Created at ↑
            </th>
            <th style={{ padding: "14px 16px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#64748b" }}>
              Created by ↑
            </th>
            <th style={{ padding: "14px 16px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#64748b" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
            <td style={{ padding: "16px", fontSize: "14px", color: "#1e293b" }}>1</td>
            <td style={{ padding: "16px", fontSize: "14px", color: "#1e293b" }}>Tharagampatti</td>
            <td style={{ padding: "16px", fontSize: "14px", color: "#1e293b" }}>28-05-2026</td>
            <td style={{ padding: "16px", fontSize: "14px", color: "#1e293b" }}>sakthivel@ananyafinance.com</td>
            <td style={{ padding: "16px", fontSize: "14px" }}>
              <button
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  marginRight: "12px",
                  color: "#0891b2",
                }}
              >
                ✏️
              </button>
              <button
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#ef4444",
                }}
              >
                🗑️
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);


export const Default: AdminStory = {
  args: {
    showSidebar: false,
    sidebarCollapsible: true,
    sidebarWidth: 220,
    isSidebarCollapsed: false,
    isFooterSticky: false,
    headerSticky: true,
    footerFixed: false,
    activePath: "/home",
    // sidebarHeader: <div style={{ fontWeight: "700", fontSize: "20px" }}>Ananya Finance</div>,
    sidebar: <SampleSidebar activePage="Branches" />,
    headerLeft: <span style={{ fontSize: "24px", fontWeight: "600" }}>Ananya Finance</span>,
    headerRight: <HeaderRight activePage="Branches" />,
    children: <SampleContent />,
    footer: (
      <div>
        Copyright © 2026 lintworks.in - All Rights Reserved.
      </div>
    ),
  },
};

export const WithSidebar: AdminStory = {
  args: {
    ...Default.args,
    sidebarHeader: <div style={{ fontWeight: "700", fontSize: "20px" }}>Ananya Finance</div>,
    showSidebar: true,
    headerLeft: null,
    headerRight: (
      <div style={{ display: "flex", gap: "18px", alignItems: "center" }}>
        <button className="quick-add-btn">
          ⚡ Quick Add
        </button>
        <a href="#home" className="dashboard-layout__navbar-link">Home</a>
        <a href="#logout" className="dashboard-layout__navbar-link">Logout</a>
      </div>
    )
  },
};

// export const CollapsibleSidebar: AdminStory = {
//   args: {
//     ...Default.args,
//     showSidebar: true,
//     sidebarCollapsible: true,
//   },
// };

// export const StickyFooter: AdminStory = {
//   args: {
//     ...Default.args,
//     showSidebar: true,
//     isFooterSticky: true,
//   },
// };

/**
 * NormalLayout Component
 * Simple layout with sticky header and optional fixed footer.
 * Can include sidebar for mobile navigation.
 */
// const normalMeta: Meta<typeof NormalLayout> = {
//   title: "React-Bricks/NormalLayout",
//   component: NormalLayout,
//   parameters: {
//     layout: "fullscreen",
//   },
//   tags: ["autodocs"],
//   argTypes: {
//     sidebar: {
//       control: false,
//       description: "Sidebar content (typically for mobile navigation)",
//     },
//     header: {
//       control: false,
//       description: "Legacy header content (use headerLeft/headerRight instead)",
//     },
//     children: {
//       control: false,
//       description: "Main page content area",
//     },
//     footer: {
//       control: false,
//       description: "Footer content",
//     },
//     showSidebar: {
//       control: "boolean",
//       description: "Show sidebar (useful for mobile navigation)",
//       defaultValue: false,
//     },
//     headerSticky: {
//       control: "boolean",
//       description: "Make header sticky at top",
//       defaultValue: true,
//     },
//     footerFixed: {
//       control: "boolean",
//       description: "Fix footer at bottom of viewport",
//       defaultValue: false,
//     },
//     headerLeft: {
//       control: false,
//       description: "Left section of header (typically logo/title)",
//     },
//     headerRight: {
//       control: false,
//       description: "Right section of header (typically navigation/actions)",
//     },
//   },
// };

// export { normalMeta };

// type NormalStory = StoryObj<typeof normalMeta>;

// const NormalSidebar = () => (
//   <nav style={{ padding: "20px" }}>
//     <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
//       {["Home", "About", "Services", "Portfolio", "Contact"].map((item) => (
//         <li key={item} style={{ marginBottom: "10px" }}>
//           <a
//             href={`#${item.toLowerCase()}`}
//             style={{
//               display: "block",
//               padding: "10px",
//               textDecoration: "none",
//               color: "inherit",
//               borderRadius: "4px",
//             }}
//             onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f0f0")}
//             onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
//           >
//             {item}
//           </a>
//         </li>
//       ))}
//     </ul>
//   </nav>
// );

// export const NormalDefault: NormalStory = {
//   args: {
//     showSidebar: false,
//     headerSticky: true,
//     footerFixed: false,
//     headerLeft: (
//       <div style={{ fontWeight: "bold", fontSize: "20px" }}>
//         MyWebsite
//       </div>
//     ),
//     headerRight: (
//       <nav style={{ display: "flex", gap: "24px" }}>
//         {["Home", "About", "Services", "Contact"].map((item) => (
//           <a
//             key={item}
//             href={`#${item.toLowerCase()}`}
//             style={{ textDecoration: "none", color: "inherit", fontWeight: "500" }}
//           >
//             {item}
//           </a>
//         ))}
//       </nav>
//     ),
//     children: (
//       <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 20px" }}>
//         <h1>Welcome to Our Website</h1>
//         <p style={{ fontSize: "18px", lineHeight: "1.6", color: "#4b5563" }}>
//           This is a normal layout perfect for marketing pages, blogs, or content-focused websites.
//           The header stays sticky as you scroll, and the footer can be fixed or inline.
//         </p>
        
//         <div style={{ marginTop: "40px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
//           {[1, 2, 3].map((i) => (
//             <div
//               key={i}
//               style={{
//                 padding: "30px",
//                 background: "#f9fafb",
//                 borderRadius: "8px",
//                 border: "1px solid #e5e7eb",
//               }}
//             >
//               <h3>Feature {i}</h3>
//               <p style={{ color: "#6b7280" }}>
//                 Description of the feature goes here. This layout is flexible and responsive.
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     ),
//     footer: (
//       <div style={{
//         padding: "40px 20px",
//         background: "#f9fafb",
//         borderTop: "1px solid #e5e7eb",
//         textAlign: "center",
//       }}>
//         <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
//           <p style={{ margin: 0, color: "#6b7280" }}>
//             © 2026 Your Company. All rights reserved.
//           </p>
//           <div style={{ marginTop: "16px", display: "flex", gap: "20px", justifyContent: "center" }}>
//             <a href="#privacy" style={{ color: "#6b7280", textDecoration: "none" }}>Privacy</a>
//             <a href="#terms" style={{ color: "#6b7280", textDecoration: "none" }}>Terms</a>
//             <a href="#cookies" style={{ color: "#6b7280", textDecoration: "none" }}>Cookies</a>
//           </div>
//         </div>
//       </div>
//     ),
//   },
// };

// export const NormalWithSidebar: NormalStory = {
//   args: {
//     showSidebar: true,
//     headerSticky: true,
//     footerFixed: false,
//     sidebar: <NormalSidebar />,
//     headerLeft: <div style={{ fontWeight: "bold", fontSize: "20px" }}>Logo</div>,
//     headerRight: (
//       <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
//         <button style={{ padding: "8px 16px", background: "#3b82f6", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
//           Sign In
//         </button>
//       </div>
//     ),
//     children: (
//       <div style={{ padding: "60px 20px", maxWidth: "1200px", margin: "0 auto" }}>
//         <h1>Layout with Mobile Sidebar</h1>
//         <p style={{ fontSize: "18px", color: "#4b5563" }}>
//           This layout includes a sidebar that's accessible on mobile devices via the hamburger menu.
//           The sidebar automatically closes when you click on menu items.
//         </p>
//       </div>
//     ),
//     footer: (
//       <div style={{ padding: "30px 20px", background: "#1f2937", color: "white", textAlign: "center" }}>
//         <p style={{ margin: 0 }}>© 2026 Your Company</p>
//       </div>
//     ),
//   },
// };

// export const NormalFixedFooter: NormalStory = {
//   args: {
//     ...NormalDefault.args,
//     footerFixed: true,
//     footer: (
//       <div style={{
//         padding: "16px 20px",
//         background: "#1f2937",
//         color: "white",
//         textAlign: "center",
//       }}>
//         <p style={{ margin: 0, fontSize: "14px" }}>
//           Fixed footer stays at bottom of viewport
//         </p>
//       </div>
//     ),
//   },
// };

// export const NormalLongContent: NormalStory = {
//   args: {
//     ...NormalDefault.args,
//     children: (
//       <div style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 20px" }}>
//         <h1>Long Content Page</h1>
//         <p>Scroll to see how the sticky header behaves with long content.</p>
        
//         {Array.from({ length: 15 }).map((_, i) => (
//           <div key={i} style={{ marginTop: "40px" }}>
//             <h2>Section {i + 1}</h2>
//             <p style={{ lineHeight: "1.8", color: "#4b5563" }}>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
//               incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
//               exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
//               dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
//             </p>
//           </div>
//         ))}
//       </div>
//     ),
//   },
// };
