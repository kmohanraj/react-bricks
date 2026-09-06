import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { SortBy } from "../components";

const meta: Meta<typeof SortBy> = {
  title: "React-Bricks/Sort By",
  component: SortBy,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

const sortData = [
  { id: 1, label: "Overdue" },
  { id: 2, label: "Late" },
  { id: 3, label: "Waiting" },
  { id: 4, label: "On Time" },
];

const SortByWrapper = (args: any) => {
  const [selected, setSelected] = useState(args.selected || "Late");

  return (
    <SortBy
      {...args}
      selected={selected}
      onClick={(id, label) => {
        setSelected(label);
        args.onClick?.(id, label);
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => <SortByWrapper {...args} />,
  args: {
    data: sortData,
    label: "Sort By",
    selected: "Late",
    isClickClose: true,
    placement: "bottom",
    onClick: (id: number, label: string) => console.log(`Sorted by: ${label}`),
  },
};

export const WithDifferentPlacements: Story = {
  render: (args) => <SortByWrapper {...args} />,
  args: {
    data: sortData,
    label: "Sort By",
    selected: "On Time",
    isClickClose: true,
    placement: "auto",
    onClick: (id: number, label: string) => console.log(`Sorted by: ${label}`),
  },
};

export const WithBottomPlacement: Story = {
  render: (args) => <SortByWrapper {...args} />,
  args: {
    data: sortData,
    label: "Sort By",
    selected: "Waiting",
    isClickClose: true,
    placement: "bottom",
    onClick: (id: number, label: string) => console.log(`Sorted by: ${label}`),
  },
};

export const WithTopPlacement: Story = {
  render: (args) => <SortByWrapper {...args} />,
  args: {
    data: sortData,
    label: "Sort By",
    selected: "Overdue",
    isClickClose: true,
    placement: "top",
    onClick: (id: number, label: string) => console.log(`Sorted by: ${label}`),
  },
};

export const WithoutClickClose: Story = {
  render: (args) => <SortByWrapper {...args} />,
  args: {
    data: sortData,
    label: "Sort By",
    selected: "Late",
    isClickClose: false,
    placement: "bottom",
    onClick: (id: number, label: string) => console.log(`Sorted by: ${label}`),
  },
};