import type { Meta, StoryObj } from "@storybook/react-vite";
import { Popover, Button } from "../components";

const meta: Meta<typeof Popover> = {
  title: "React-Bricks/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

const PopoverContent = (
  <div style={{ padding: "8px" }}>
    <strong>Popover Title</strong>
    <p style={{ margin: "8px 0 0 0", fontSize: "14px" }}>
      This is some popover content.
    </p>
  </div>
);

export const Default: Story = {
  args: {
    title: (
      <Button
        label="Open Popover"
        variant="primary"
        type="button"
      />
    ),
    children: PopoverContent,
    placement: "auto",
    isClickClose: true,
    offset: 8,
    showArrow: false,
  },
};

export const WithArrow: Story = {
  args: {
    title: (
      <Button
        label="With Arrow"
        variant="primary"
        type="button"
      />
    ),
    children: PopoverContent,
    placement: "auto",
    isClickClose: true,
    offset: 8,
    showArrow: true,
  },
};

export const BottomPlacement: Story = {
  args: {
    title: (
      <Button
        label="Open Below"
        variant="primary"
        type="button"
      />
    ),
    children: PopoverContent,
    placement: "bottom",
    isClickClose: true,
    offset: 8,
    showArrow: true,
  },
};

export const TopPlacement: Story = {
  args: {
    title: (
      <Button
        label="Open Above"
        variant="primary"
        type="button"
      />
    ),
    children: PopoverContent,
    placement: "top",
    isClickClose: true,
    offset: 8,
    showArrow: true,
  },
};

export const LeftPlacement: Story = {
  args: {
    title: (
      <Button
        label="Open Left"
        variant="primary"
        type="button"
      />
    ),
    children: PopoverContent,
    placement: "left",
    isClickClose: true,
    offset: 8,
    showArrow: true,
  },
};

export const RightPlacement: Story = {
  args: {
    title: (
      <Button
        label="Open Right"
        variant="primary"
        type="button"
      />
    ),
    children: PopoverContent,
    placement: "right",
    isClickClose: true,
    offset: 8,
    showArrow: true,
  },
};
