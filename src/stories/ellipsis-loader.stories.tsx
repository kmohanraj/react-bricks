import type { Meta, StoryObj } from "@storybook/react-vite";
import { EllipsisLoader } from "../components";

const meta: Meta<typeof EllipsisLoader> = {
  title: "React-Bricks/EllipsisLoader",
  component: EllipsisLoader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: {
        type: "select",
      },
      options: ["primary", "dark", "grey", "white", "success", "warning"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    color: "primary",
    size: "sm",
  },
};

export const Dark: Story = {
  args: {
    color: "dark",
    size: "sm",
  },
};

export const Grey: Story = {
  args: {
    color: "grey",
    size: "sm",
  },
};

export const White: Story = {
  render: (args) => (
    <div style={{ backgroundColor: "#333", padding: "20px", borderRadius: "4px" }}>
      <EllipsisLoader {...args} />
    </div>
  ),
  args: {
    color: "white",
    size: "sm",
  },
};

export const Success: Story = {
  args: {
    color: "success",
    size: "sm",
  },
};

export const Warning: Story = {
  args: {
    color: "warning",
    size: "sm",
  },
};

export const SmallSize: Story = {
  args: {
    color: "primary",
    size: "sm",
  },
};

export const MediumSize: Story = {
  args: {
    color: "primary",
    size: "md",
  },
};

export const LargeSize: Story = {
  args: {
    color: "primary",
    size: "lg",
  },
};

export const AllSizesComparison: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <p>Small</p>
        <EllipsisLoader color="primary" size="sm" />
      </div>
      <div style={{ textAlign: "center" }}>
        <p>Medium</p>
        <EllipsisLoader color="primary" size="md" />
      </div>
      <div style={{ textAlign: "center" }}>
        <p>Large</p>
        <EllipsisLoader color="primary" size="lg" />
      </div>
    </div>
  ),
};

export const AllColorsComparison: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "30px", flexWrap: "wrap", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <p>Primary</p>
        <EllipsisLoader color="primary" size="md" />
      </div>
      <div style={{ textAlign: "center" }}>
        <p>Dark</p>
        <EllipsisLoader color="dark" size="md" />
      </div>
      <div style={{ textAlign: "center" }}>
        <p>Grey</p>
        <EllipsisLoader color="grey" size="md" />
      </div>
      <div style={{ textAlign: "center", backgroundColor: "#333", padding: "10px", borderRadius: "4px" }}>
        <p style={{ color: "white" }}>White</p>
        <EllipsisLoader color="white" size="md" />
      </div>
      <div style={{ textAlign: "center" }}>
        <p>Success</p>
        <EllipsisLoader color="success" size="md" />
      </div>
      <div style={{ textAlign: "center" }}>
        <p>Warning</p>
        <EllipsisLoader color="warning" size="md" />
      </div>
    </div>
  ),
};
