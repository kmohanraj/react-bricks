import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Select } from "../components";

const meta: Meta<typeof Select> = {
  title: "React-Bricks/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

const optionsData = [
  { id: "1", label: "Option 1" },
  { id: "2", label: "Option 2" },
  { id: "3", label: "Option 3" },
  { id: "4", label: "Option 4" },
];

const multiSelectData = [
  { id: "1", label: "React" },
  { id: "2", label: "Vue" },
  { id: "3", label: "Angular" },
  { id: "4", label: "Svelte" },
  { id: "5", label: "Next.js" },
];

export const SingleSelect: Story = {
  args: {
    inputId: "select",
    placeholder: "Select an option",
    options: optionsData,
    variant: "ghost",
  },
};

export const SingleSelectSearchable: Story = {
  args: {
    inputId: "select-search",
    placeholder: "Search and select",
    options: optionsData,
    isSearchable: true,
    variant: "ghost",
  },
};

export const SingleSelectClearable: Story = {
  args: {
    inputId: "select-clear",
    placeholder: "Select an option",
    options: optionsData,
    isClearable: true,
    variant: "ghost",
  },
};

export const SingleSelectWithRequired: Story = {
  args: {
    inputId: "select-required",
    placeholder: "Select an option",
    options: optionsData,
    isRequired: true,
    variant: "ghost",
  },
};

export const SingleSelectWithError: Story = {
  args: {
    inputId: "select-error",
    placeholder: "Select an option",
    options: optionsData,
    error: "This field is required",
    variant: "ghost",
  },
};

export const SingleSelectDisabled: Story = {
  args: {
    inputId: "select-disabled",
    placeholder: "Select an option",
    options: optionsData,
    isDisabled: true,
    variant: "ghost",
  },
};

export const MultiSelect: Story = {
  args: {
    inputId: "multi-select",
    placeholder: "Select options",
    options: multiSelectData,
    isMulti: true,
    variant: "ghost",
  },
};

export const MultiSelectSearchable: Story = {
  args: {
    inputId: "multi-select-search",
    placeholder: "Search and select multiple",
    options: multiSelectData,
    isMulti: true,
    isSearchable: true,
    variant: "ghost",
  },
};

export const MultiSelectClearable: Story = {
  args: {
    inputId: "multi-select-clear",
    placeholder: "Select options",
    options: multiSelectData,
    isMulti: true,
    isClearable: true,
    variant: "ghost",
  },
};

export const SelectLoading: Story = {
  args: {
    inputId: "select-loading",
    placeholder: "Loading options...",
    options: [],
    isLoading: true,
    variant: "ghost",
  },
};

export const SelectNoRecords: Story = {
  args: {
    inputId: "select-no-records",
    placeholder: "Select an option",
    options: [],
    noRecordMessage: "No options available",
    variant: "ghost",
  },
};
