import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "../components";

const meta: Meta<typeof Badge> = {
  title: "React-Bricks/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["primary", "info", "active", "success", "warning", "error", "ghost", "overdue", "late"],
    },
    isRound: {
      control: {
        type: "boolean",
      },
    },
    onClick: {
      action: "clicked",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "Primary",
    variant: "primary",
  },
};

export const Info: Story = {
  args: {
    title: "Info",
    variant: "info",
  },
};

export const Active: Story = {
  args: {
    title: "Active",
    variant: "active",
  },
};

export const Success: Story = {
  args: {
    title: "Success",
    variant: "success",
  },
};

export const Warning: Story = {
  args: {
    title: "Warning",
    variant: "warning",
  },
};

export const Error: Story = {
  args: {
    title: "Error",
    variant: "error",
  },
};

export const Ghost: Story = {
  args: {
    title: "Ghost",
    variant: "ghost",
  },
};

export const Overdue: Story = {
  args: {
    title: "Overdue",
    variant: "overdue",
  },
};

export const Late: Story = {
  args: {
    title: "Late",
    variant: "late",
  },
};

export const Rounded: Story = {
  args: {
    title: "Rounded",
    variant: "primary",
    isRound: true,
  },
};

export const Clickable: Story = {
  args: {
    title: "Clickable Badge",
    variant: "primary",
    onClick: (title) => alert(`Clicked: ${title}`),
  },
};

export const ClickableRounded: Story = {
  args: {
    title: "Click Me",
    variant: "info",
    isRound: true,
    onClick: (title) => alert(`Clicked: ${title}`),
  },
};

export const WithCustomClass: Story = {
  args: {
    title: "Custom Style",
    variant: "success",
    customClass: "custom-badge",
  },
};
