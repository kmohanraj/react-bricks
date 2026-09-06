import type { Meta, StoryObj } from "@storybook/react-vite";
import { Scrollbar } from "../components/Scrollbar/Scrollbar";

/**
 * Scrollbar Component
 * Custom scrollbar with drag support, keyboard navigation, and smooth scrolling.
 * Supports vertical, horizontal, and both directions.
 */
const meta: Meta<typeof Scrollbar> = {
  title: "React-Bricks/Scrollbar",
  component: Scrollbar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: false,
      description: "Content to be scrolled",
    },
    direction: {
      control: "select",
      options: ["vertical", "horizontal", "both"],
      description: "Scroll direction",
      defaultValue: "vertical",
    },
    height: {
      control: "number",
      description: "Maximum height of the scrollbar container",
      defaultValue: 300,
    },
    thumbWidth: {
      control: "number",
      description: "Width/thickness of the scrollbar thumb",
      defaultValue: 8,
    },
    isHideTracks: {
      control: "boolean",
      description: "Hide scrollbar tracks (only show on hover)",
      defaultValue: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Sample content for demonstrations
const LongContent = () => (
  <div style={{ padding: "20px" }}>
    <h2>Vertical Scrollbar Demo</h2>
    <p>
      This is a custom scrollbar component with advanced features including drag support,
      keyboard navigation, and smooth scrolling animations.
    </p>
    {Array.from({ length: 30 }).map((_, i) => (
      <p key={i} style={{ marginBottom: "16px", lineHeight: "1.6" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Paragraph {i + 1}.
      </p>
    ))}
  </div>
);

const WideContent = () => (
  <div style={{ padding: "20px", width: "1500px" }}>
    <h2>Horizontal Scrollbar Demo</h2>
    <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          style={{
            minWidth: "200px",
            padding: "20px",
            background: "#f0f0f0",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <h3>Card {i + 1}</h3>
          <p>Wide content item</p>
        </div>
      ))}
    </div>
  </div>
);

const GridContent = () => (
  <div style={{ padding: "20px", width: "1200px" }}>
    <h2>Both Directions Scrollbar Demo</h2>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 200px)", gap: "20px", marginTop: "20px" }}>
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          style={{
            padding: "30px",
            background: `hsl(${(i * 20) % 360}, 70%, 85%)`,
            borderRadius: "8px",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          Item {i + 1}
        </div>
      ))}
    </div>
  </div>
);

const TableContent = () => (
  <div style={{ padding: "20px", width: "1400px" }}>
    <h2>Data Table with Scrollbar</h2>
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
      <thead>
        <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e5e7eb" }}>
          <th style={{ padding: "12px", textAlign: "left" }}>ID</th>
          <th style={{ padding: "12px", textAlign: "left" }}>Name</th>
          <th style={{ padding: "12px", textAlign: "left" }}>Email</th>
          <th style={{ padding: "12px", textAlign: "left" }}>Department</th>
          <th style={{ padding: "12px", textAlign: "left" }}>Status</th>
          <th style={{ padding: "12px", textAlign: "left" }}>Joined Date</th>
          <th style={{ padding: "12px", textAlign: "left" }}>Salary</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 50 }).map((_, i) => (
          <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
            <td style={{ padding: "12px" }}>{i + 1}</td>
            <td style={{ padding: "12px" }}>Employee {i + 1}</td>
            <td style={{ padding: "12px" }}>employee{i + 1}@company.com</td>
            <td style={{ padding: "12px" }}>
              {["Engineering", "Marketing", "Sales", "HR", "Finance"][i % 5]}
            </td>
            <td style={{ padding: "12px" }}>
              <span
                style={{
                  padding: "4px 12px",
                  borderRadius: "12px",
                  background: i % 3 === 0 ? "#d1fae5" : "#fef3c7",
                  color: i % 3 === 0 ? "#065f46" : "#92400e",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                {i % 3 === 0 ? "Active" : "Pending"}
              </span>
            </td>
            <td style={{ padding: "12px" }}>2024-0{(i % 9) + 1}-{(i % 28) + 1}</td>
            <td style={{ padding: "12px" }}>${((i + 5) * 10000).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const VerticalDefault: Story = {
  args: {
    direction: "vertical",
    height: 400,
    thumbWidth: 8,
    isHideTracks: false,
    isThumbAlwaysVisible: true,
    children: <LongContent />,
  },
};

export const VerticalThinThumb: Story = {
  args: {
    direction: "vertical",
    height: 400,
    thumbWidth: 4,
    isHideTracks: false,
    children: <LongContent />,
  },
};

export const VerticalThickThumb: Story = {
  args: {
    direction: "vertical",
    height: 400,
    thumbWidth: 12,
    isHideTracks: false,
    children: <LongContent />,
  },
};

export const VerticalHiddenTracks: Story = {
  args: {
    direction: "vertical",
    height: 400,
    thumbWidth: 8,
    isHideTracks: true,
    children: <LongContent />,
  },
};

export const HorizontalDefault: Story = {
  args: {
    direction: "horizontal",
    height: 300,
    thumbWidth: 8,
    isHideTracks: false,
    children: <WideContent />,
  },
};

export const HorizontalHiddenTracks: Story = {
  args: {
    direction: "horizontal",
    height: 300,
    thumbWidth: 8,
    isHideTracks: true,
    children: <WideContent />,
  },
};

export const BothDirections: Story = {
  args: {
    direction: "both",
    height: 400,
    thumbWidth: 8,
    isHideTracks: false,
    children: <GridContent />,
  },
};

export const BothDirectionsHidden: Story = {
  args: {
    direction: "both",
    height: 400,
    thumbWidth: 8,
    isHideTracks: true,
    children: <GridContent />,
  },
};

export const DataTableScroll: Story = {
  args: {
    direction: "both",
    height: 500,
    thumbWidth: 10,
    isHideTracks: false,
    children: <TableContent />,
  },
};

export const CompactHeight: Story = {
  args: {
    direction: "vertical",
    height: 200,
    thumbWidth: 6,
    isHideTracks: false,
    children: <LongContent />,
  },
};

export const TallHeight: Story = {
  args: {
    direction: "vertical",
    height: 600,
    thumbWidth: 8,
    isHideTracks: false,
    children: <LongContent />,
  },
};

export const ShortContent: Story = {
  args: {
    direction: "vertical",
    height: 400,
    thumbWidth: 8,
    isHideTracks: false,
    children: (
      <div style={{ padding: "20px" }}>
        <h2>Short Content</h2>
        <p>This content doesn't require scrolling.</p>
        <p>The scrollbar will automatically hide when content fits within the container.</p>
      </div>
    ),
  },
};

export const CardGallery: Story = {
  args: {
    direction: "both",
    height: 400,
    thumbWidth: 8,
    isHideTracks: false,
    children: (
      <div style={{ padding: "20px", display: "grid", gridTemplateColumns: "repeat(6, 250px)", gap: "20px" }}>
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            style={{
              padding: "20px",
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "150px",
                background: `linear-gradient(135deg, hsl(${(i * 15) % 360}, 70%, 60%), hsl(${(i * 15 + 30) % 360}, 70%, 70%))`,
                borderRadius: "4px",
                marginBottom: "12px",
              }}
            />
            <h3 style={{ margin: "0 0 8px", fontSize: "16px" }}>Card {i + 1}</h3>
            <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>
              Sample card content with description.
            </p>
          </div>
        ))}
      </div>
    ),
  },
};
