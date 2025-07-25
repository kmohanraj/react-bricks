import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "../components/DataTable/DataTable";

const meta: any = {
  title: "React-Bricks/DataTable",
  component: DataTable,
  parameters: {
    layout: ["centered"],
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DataTable>;

export default meta;

type Story = StoryObj<typeof meta>;

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "age", label: "Age" },  
];

const data = [
  { id: 1, name: "Alice", age: 28 },
  { id: 2, name: "Bob", age: 34 },
  { id: 3, name: "Charlie", age: 22 },
  { id: 4, name: "David", age: 45 },
  { id: 5, name: "Eve", age: 30 },
  { id: 6, name: "Frank", age: 26 },
  { id: 7, name: "Grace", age: 38 },
];

export const Table: Story = {
  args: {
    data: data,
    columns: columns,
    isSorting: true,
    isPagination: true,
    isAction: true
  },
};

export const PaginationLeft: Story = {
  args: {
    data: data,
    columns: columns,
    isPagination: true
  },
};

export const PaginationRight: Story = {
  args: {
    data: data,
    columns: columns,
    isPagination: true,
    isPaginationRight: true
  },
};


export const Sorting: Story = {
  args: {
    data: data,
    columns: columns,
    isSorting: true,
  },
};
