import type {Meta, StoryObj} from '@storybook/react'

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

export const CheckboxLeft: Story = {
  args: {
    inputName: 'Checkbox',
    inputType: 'checkbox',
    position: "right"
  },
};

export const CheckboxRight: Story = {
  args: {
    inputName: 'Radio',
    inputType: 'checkbox',
    position: "left"
  }
}
export const RadioLeft: Story = {
  args: {
    inputName: 'Radio',
    inputType: 'radio',
    position: "right"
  },
};

export const RadioRight: Story = {
  args: {
    inputName: 'Radio',
    inputType: 'radio',
    position: "left"
  }
}
