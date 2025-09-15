import type { Meta, StoryObj } from "@storybook/react-vite";
import { Popover } from "../components/Popover/Popover";

const meta: any = {
  title: "React-Bricks/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PopoverModal: Story = {
  args: {
    children: (
      <button>Click</button>
    ),
    content: (
      <div>
        <strong>Popover Title</strong>
        <p>This is some popover content.</p>
      </div>
    ),
  },
};
