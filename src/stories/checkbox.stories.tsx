import type {Meta, StoryObj} from '@storybook/react-vite'
import { useState } from 'react';
import { CheckBox } from '../components'

const meta: Meta<typeof CheckBox> = {
  title: 'React-Bricks/Checkbox',
  component: CheckBox,
  parameters: {
    layout: 'centered'
  },
  tags: ["autodocs"],
}

export default meta;

type Story = StoryObj<typeof meta>;

export const Checkbox: Story = {
  args: {
    label: 'Checkbox',
    name: 'checkbox-example',
    type: 'checkbox',
    position: "right",
    isChecked: false
  },
};

export const Radio: Story = {
  args: {
    label: 'Radio',
    name: 'radio-example',
    type: 'radio',
    position: "right",
    isChecked: false
  },
};

export const Switch: Story = {
  render: (args) => {
    const [isChecked, setIsChecked] = useState(args.isChecked || false);
    return (
      <CheckBox
        {...args}
        isChecked={isChecked}
        onChecked={(e) => setIsChecked(e.currentTarget.checked)}
      />
    );
  },
  args: {
    label: "Switch",
    name: "switch-example",
    type: "switch",
    position: "right",
    isChecked: false
  }
};

export const SwitchLeft: Story = {
  render: (args) => {
    const [isChecked, setIsChecked] = useState(args.isChecked || false);
    return (
      <CheckBox
        {...args}
        isChecked={isChecked}
        onChecked={(e) => setIsChecked(e.currentTarget.checked)}
      />
    );
  },
  args: {
    label: "Switch (Left)",
    name: "switch-left-example",
    type: "switch",
    position: "left",
    isChecked: false
  }
};

export const CheckboxDisabled: Story = {
  args: {
    label: 'Disabled Checkbox',
    name: 'disabled-checkbox',
    type: 'checkbox',
    position: "right",
    isChecked: true,
    isDisabled: true
  },
};

export const SwitchDisabled: Story = {
  args: {
    label: 'Disabled Switch',
    name: 'disabled-switch',
    type: 'switch',
    position: "right",
    isChecked: true,
    isDisabled: true
  },
};
