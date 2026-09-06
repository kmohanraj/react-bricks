import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../components'

const meta: any = {
  title: 'React-Bricks/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: 'primary',
    label: 'Button',
    type: 'button',
    variant: 'primary',
  },
};
export const Secondary: Story = {
  args: {
    id: 'secondary',
    label: 'Button',
    type: 'button',
    variant: 'secondary'
  },
};
export const Disabled: Story = {
  args: {
    id: 'disabled',
    label: 'Button',
    type: 'button',
    variant: 'secondary',
    isDisabled: true,
  },
};

export const Link: Story = {
  args: {
    id: 'link',
    label: 'Link',
    type: 'link',
    link: '/secondary',
  },
};

export const Loading: Story = {
  args: {
    id: 'loading',
    label: 'Loading',
    type: 'button',
    variant: 'primary',
    isLoading: true,
    loaderColor: 'primary',
  },
};

export const Ghost: Story = {
  args: {
    id: 'ghost',
    label: 'Ghost Button',
    type: 'button',
    variant: 'ghost',
  },
};

export const Small: Story = {
  args: {
    id: 'small',
    label: 'Small',
    type: 'button',
    variant: 'primary',
    isSmall: true,
  },
};
