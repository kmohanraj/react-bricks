import type { Meta, StoryObj } from "@storybook/react-vite";
import { Modal } from "../components";
import * as Icon from "../assets/icons/icon";

const meta: any = {
  title: "React-Bricks/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Modal1: Story = {
  args: {
    id: "modal",
    isShowModal: true,
    children: "Title",
    closeIcon: Icon.close,
  },
};
