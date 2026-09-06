import type {Meta, StoryObj} from '@storybook/react-vite'
import { useState } from 'react';
import { Input } from '../components'

const meta: Meta<typeof Input> = {
  title: 'React-Bricks/Input',
  component: Input,
  parameters: {
    layout: 'centered'
  },
  tags: ["autodocs"],
}

export default meta;

type Story = StoryObj<typeof meta>;

export const Outlined: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Input
        {...args}
        value={value}
        onChange={(nextValue) => setValue(String(nextValue ?? ''))}
      />
    );
  },
  args: {
    placeholder: 'Enter name',
    inputId: 'name',
    borderType: 'outlined',
    variant: 'ghost',
  },
};

export const Underlined: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Input
        {...args}
        value={value}
        onChange={(nextValue) => setValue(String(nextValue ?? ''))}
      />
    );
  },
  args: {
    placeholder: 'Enter name',
    inputId: 'name',
    borderType: 'underlined',
    variant: 'ghost',
  }
};

export const DatePicker: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Input
        {...args}
        value={value}
        onChange={(nextValue) => setValue(String(nextValue ?? ''))}
      />
    );
  },
  args: {
    placeholder: "Start Date",
    inputId: 'start_date',
    isDatePicker: true,
    borderType: 'outlined',
    variant: 'ghost',
  }
};

export const WithPrefix: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Input
        {...args}
        value={value}
        onChange={(nextValue) => setValue(String(nextValue ?? ''))}
      />
    );
  },
  args: {
    placeholder: 'Email',
    inputId: 'email',
    inputType: 'email',
    borderType: 'outlined',
    variant: 'ghost',
    preFixIcon: 'https://via.placeholder.com/20?text=@',
    altName: 'email icon',
  },
};

export const WithSuffix: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Input
        {...args}
        value={value}
        onChange={(nextValue) => setValue(String(nextValue ?? ''))}
      />
    );
  },
  args: {
    placeholder: 'Search',
    inputId: 'search',
    borderType: 'outlined',
    variant: 'ghost',
    sufFixIcon: 'https://via.placeholder.com/20?text=🔍',
    altName: 'search icon',
  },
};

export const Number: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Input
        {...args}
        value={value}
        onChange={(nextValue) => setValue(String(nextValue ?? ''))}
      />
    );
  },
  args: {
    placeholder: 'Enter amount',
    inputId: 'amount',
    isNumber: true,
    isCommaSeparate: true,
    borderType: 'outlined',
    variant: 'ghost',
  },
};

export const Decimal: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Input
        {...args}
        value={value}
        onChange={(nextValue) => setValue(String(nextValue ?? ''))}
      />
    );
  },
  args: {
    placeholder: 'Enter price',
    inputId: 'price',
    isDecimal: true,
    borderType: 'outlined',
    variant: 'ghost',
  },
};

export const Required: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Input
        {...args}
        value={value}
        onChange={(nextValue) => setValue(String(nextValue ?? ''))}
      />
    );
  },
  args: {
    placeholder: 'Full name',
    inputId: 'fullname',
    isRequired: true,
    borderType: 'outlined',
    variant: 'ghost',
  },
};

export const WithError: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Input
        {...args}
        value={value}
        onChange={(nextValue) => setValue(String(nextValue ?? ''))}
      />
    );
  },
  args: {
    placeholder: 'Email',
    inputId: 'email_error',
    error: 'Please enter a valid email',
    borderType: 'outlined',
    variant: 'ghost',
  },
};

export const WithMessage: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Input
        {...args}
        value={value}
        onChange={(nextValue) => setValue(String(nextValue ?? ''))}
      />
    );
  },
  args: {
    placeholder: 'Password',
    inputId: 'password',
    inputType: 'password',
    message: 'Password must be at least 8 characters',
    borderType: 'outlined',
    variant: 'ghost',
  },
};

export const Disabled: Story = {
  render: (args) => {
    return (
      <Input
        {...args}
        value="Disabled input"
        onChange={() => {}}
      />
    );
  },
  args: {
    placeholder: 'Disabled',
    inputId: 'disabled',
    isDisabled: true,
    borderType: 'outlined',
    variant: 'ghost',
  },
};

export const TextArea: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Input
        {...args}
        value={value}
        onChange={(nextValue) => setValue(String(nextValue ?? ''))}
      />
    );
  },
  args: {
    placeholder: 'Enter your message',
    inputId: 'message',
    isTextArea: true,
    rows: 5,
    borderType: 'outlined',
    variant: 'ghost',
  },
};
