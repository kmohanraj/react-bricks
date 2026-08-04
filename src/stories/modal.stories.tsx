import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Modal, Button } from "../components";

const meta: Meta<typeof Modal> = {
  title: "React-Bricks/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

const ModalTemplate = (args: any) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  return (
    <>
      <Button
        label="Open Modal"
        onClick={() => setIsOpen(true)}
        variant="primary"
      />
      <Modal
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export const Default: Story = {
  render: (args) => <ModalTemplate {...args} />,
  args: {
    isOpen: false,
    title: "Modal Title",
    children: "This is the modal content. Click outside or press ESC to close.",
    closeButton: true,
    backdropClickable: true,
    actions: [
      {
        label: "Cancel",
        variant: "secondary",
        onClick: () => console.log("Cancel clicked"),
      },
      {
        label: "Confirm",
        variant: "primary",
        onClick: () => console.log("Confirm clicked"),
      },
    ],
  },
};

export const DeleteConfirmation: Story = {
  render: (args) => <ModalTemplate {...args} />,
  args: {
    isOpen: false,
    title: "Delete Confirmation",
    children: "Are you sure you want to delete this item? This action cannot be undone.",
    closeButton: true,
    backdropClickable: true,
    actions: [
      {
        label: "Cancel",
        variant: "secondary",
        onClick: () => console.log("Cancelled"),
      },
      {
        label: "Delete",
        variant: "primary",
        onClick: () => console.log("Item deleted"),
      },
    ],
  },
};

export const WithLongContent: Story = {
  render: (args) => <ModalTemplate {...args} />,
  args: {
    isOpen: false,
    title: "Terms and Conditions",
    children: (
      <div style={{ maxHeight: "300px", overflowY: "auto" }}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
        <p>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    ),
    actions: [
      {
        label: "Decline",
        variant: "secondary",
        onClick: () => console.log("Declined"),
      },
      {
        label: "Accept",
        variant: "primary",
        onClick: () => console.log("Accepted"),
      },
    ],
  },
};

export const WithoutTitle: Story = {
  render: (args) => <ModalTemplate {...args} />,
  args: {
    isOpen: false,
    title: undefined,
    children: "This is a modal without a title. Perfect for simple notifications or alerts.",
    closeButton: true,
    actions: [
      {
        label: "OK",
        variant: "primary",
        onClick: () => console.log("OK clicked"),
      },
    ],
  },
};

export const WithoutCloseButton: Story = {
  render: (args) => <ModalTemplate {...args} />,
  args: {
    isOpen: false,
    title: "Important Notice",
    children: "This modal has no close button. Use the action buttons to proceed.",
    closeButton: false,
    backdropClickable: false,
    actions: [
      {
        label: "Disagree",
        variant: "secondary",
        onClick: () => console.log("Disagreed"),
      },
      {
        label: "Agree",
        variant: "primary",
        onClick: () => console.log("Agreed"),
      },
    ],
  },
};

export const WithoutActions: Story = {
  render: (args) => <ModalTemplate {...args} />,
  args: {
    isOpen: false,
    title: "Information",
    children: "This modal has no action buttons. Close using the X button or backdrop.",
    closeButton: true,
    backdropClickable: true,
  },
};
