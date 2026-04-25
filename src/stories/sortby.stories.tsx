import type { Meta, StoryObj } from "@storybook/react-vite";
import { SortBy } from "../components";

const meta: any = {
  title: "React-Bricks/Sort By",
  component: SortBy,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} satisfies Meta<typeof SortBy>;

export default meta;

type Story = StoryObj<typeof meta>;

const data = [
  {
    id: 1,
    label: "Overdue"
  },
  {
    id: 2,
    label: "Late"
  },
  {
    id: 3,
    label: "Waiting"
  },
  {
    id: 4,
    label: "On Time"
  }
]

export const SortByPrimary: Story = {
  args: {
    data: data,
    customClass: "sort-by",
    placement: "bottom",
    label: "Sort By",
    selected: "Late",
    image: "^",
    isClickClose: true,
    isHideArrow: true,
    isBorderRadius: true
  }
}