import type {Meta, StoryObj} from '@storybook/react-vite'

import { EllipsisLoader } from '../components'

const meta: any = {
  title: 'React-Bricks/Ellipsis Loader',
  component: EllipsisLoader,
  parameters: {
    layout: 'centered'
  },
  tags: ["autodocs"],
} satisfies Meta<typeof EllipsisLoader>

export default meta;

type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: 'sm',
    color: 'primary'
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    color: 'primary'
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    color: 'primary'
  },
};

