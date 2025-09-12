import type {Meta, StoryObj} from '@storybook/react-vite'

import { Input } from '../components'

const meta: any = {
  title: 'React-Bricks/Input',
  component: Input,
  parameters: {
    layout: 'centered'
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>

export default meta;

type Story = StoryObj<typeof meta>;

export const Outlined: Story = {
  args: {
    type: 'text',
    placeholder: 'Name',
    inputId: 'name',
    borderType: 'outlined',
    isNumber: true
  },
};

export const Underlined: Story = {
  args: {
    type: 'text',
    placeholder: 'Name',
    inputId: 'name',
    borderType: 'underlined'
  }
}
