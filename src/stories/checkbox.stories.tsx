import type {Meta, StoryObj} from '@storybook/react-vite'

import { CheckBox } from '../components'

const meta: any = {
  title: 'React-Bricks/Checkbox',
  component: CheckBox,
  parameters: {
    layout: 'centered'
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CheckBox>

export default meta;

type Story = StoryObj<typeof meta>;

export const Checkbox: Story = {
  args: {
    label: 'Checkbox',
    name: 'Male',
    type: 'checkbox',
    position: "right",
    isChecked: true
  },
};

export const Radio: Story = {
  args: {
    label: 'Radio',
    name: 'Male',
    type: 'radio',
    position: "right"
  },
};

