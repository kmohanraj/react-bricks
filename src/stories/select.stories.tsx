import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "../components";
// import * as Icons from '../assets/icons/icon';

const meta: any = {
  title: "React-Bricks/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

const optionsData = [
  {
    id: "1",
    label: "Name",
  },
];
const multiSelectData = [
  {
    id: "1",
    label: "Name",
  },
  {
    id: "2",
    label: "Age",
  },
];

export const SingleSelect: Story = {
  args: {
    inputId: "select",
    placeholder: "Name",
    options: optionsData,
  },
};

export const SelectWithRequired: Story = {
  args: {
    inputId: "select",
    placeholder: "Name",
    options: optionsData,
    isRequired: true,
  },
};

export const MultiSelect: Story = {
  args: {
    inputId: "select",
    placeholder: "Name",
    options: multiSelectData,
    isMulti: true,
  },
};
