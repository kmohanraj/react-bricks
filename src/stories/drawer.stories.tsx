import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Drawer, Button } from "../components";

const meta: Meta<typeof Drawer> = {
  title: "React-Bricks/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

const DrawerWithState = (args: any) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  return (
    <>
      <Button
        label="Open Drawer"
        onClick={() => setIsOpen(true)}
        variant="primary"
      />
      <Drawer
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export const Default: Story = {
  render: (args) => <DrawerWithState {...args} />,
  args: {
    isOpen: false,
    title: "Drawer Title",
    children: <p>This is the drawer content. Click outside or press ESC to close.</p>,
    width: 500,
    position: "right",
    closeButton: true,
    backdropClickable: true,
  },
};

export const WithFooter: Story = {
  render: (args) => <DrawerWithState {...args} />,
  args: {
    isOpen: false,
    title: "Drawer with Footer",
    children: (
      <div>
        <p>This is the drawer content with action buttons in the footer.</p>
        <p>
          Use the footer to place action buttons like Submit, Save, Cancel, etc.
        </p>
      </div>
    ),
    footer: (
      <div style={{ display: "flex", gap: "12px", width: "100%" }}>
        <div style={{ flex: 1 }}>
          <Button label="Cancel" variant="secondary" />
        </div>
        <div style={{ flex: 1 }}>
          <Button label="Submit" variant="primary" />
        </div>
      </div>
    ),
    width: 500,
    position: "right",
  },
};

export const LeftDrawer: Story = {
  render: (args) => <DrawerWithState {...args} />,
  args: {
    isOpen: false,
    title: "Left Drawer",
    children: <p>This drawer opens from the left side</p>,
    width: 400,
    position: "left",
    closeButton: true,
  },
};

export const RightDrawer: Story = {
  render: (args) => <DrawerWithState {...args} />,
  args: {
    isOpen: false,
    title: "Right Drawer",
    children: <p>This drawer opens from the right side</p>,
    width: 500,
    position: "right",
    closeButton: true,
  },
};

export const NarrowDrawer: Story = {
  render: (args) => <DrawerWithState {...args} />,
  args: {
    isOpen: false,
    title: "Narrow Drawer",
    children: <p>This is a narrow drawer with 300px width</p>,
    width: 300,
    position: "right",
  },
};

export const WideDrawer: Story = {
  render: (args) => <DrawerWithState {...args} />,
  args: {
    isOpen: false,
    title: "Wide Drawer",
    children: <p>This is a wide drawer with 700px width</p>,
    width: 700,
    position: "right",
  },
};

export const WithoutCloseButton: Story = {
  render: (args) => <DrawerWithState {...args} />,
  args: {
    isOpen: false,
    title: "No Close Button",
    children: <p>This drawer has no close button. Use backdrop or ESC to close.</p>,
    width: 500,
    closeButton: false,
  },
};

export const WithoutBackdropClick: Story = {
  render: (args) => <DrawerWithState {...args} />,
  args: {
    isOpen: false,
    title: "Backdrop Not Clickable",
    children: <p>Clicking the backdrop won't close this drawer. Use the close button or ESC.</p>,
    width: 500,
    closeButton: true,
    backdropClickable: false,
  },
};

export const NestedDrawers: Story = {
  render: () => {
    const [firstDrawerOpen, setFirstDrawerOpen] = useState(false);
    const [secondDrawerOpen, setSecondDrawerOpen] = useState(false);

    return (
      <>
        <Button
          label="Open First Drawer"
          onClick={() => setFirstDrawerOpen(true)}
          variant="primary"
        />

        <Drawer
          isOpen={firstDrawerOpen}
          onClose={() => setFirstDrawerOpen(false)}
          title="First Drawer"
          position="right"
          width={500}
          level={0}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <p>This is the first drawer. Click the button below to open a nested drawer.</p>
            <Button
              label="Open Nested Drawer"
              variant="primary"
              onClick={() => setSecondDrawerOpen(true)}
            />
            <p style={{ fontSize: "12px", color: "#666" }}>
              Notice how the nested drawer appears above this one with proper z-index stacking. 
              Pressing ESC will only close the topmost drawer.
            </p>
          </div>
        </Drawer>

        <Drawer
          isOpen={secondDrawerOpen}
          onClose={() => setSecondDrawerOpen(false)}
          title="Nested Drawer"
          position="right"
          width={450}
          level={1}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <p>This is a nested drawer that opened on top of the first drawer.</p>
            <p>Close this drawer to go back to the first one.</p>
            <Button
              label="Close Nested Drawer"
              onClick={() => setSecondDrawerOpen(false)}
            />
          </div>
        </Drawer>
      </>
    );
  },
};

export const TripleNestedDrawers: Story = {
  render: () => {
    const [firstOpen, setFirstOpen] = useState(false);
    const [secondOpen, setSecondOpen] = useState(false);
    const [thirdOpen, setThirdOpen] = useState(false);

    return (
      <>
        <Button
          label="Open Level 1"
          onClick={() => setFirstOpen(true)}
          variant="primary"
        />

        <Drawer
          isOpen={firstOpen}
          onClose={() => setFirstOpen(false)}
          title="Level 1 Drawer"
          position="right"
          width={500}
          level={0}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <p>First level drawer</p>
            <Button
              label="Open Level 2"
              variant="primary"
              onClick={() => setSecondOpen(true)}
            />
          </div>
        </Drawer>

        <Drawer
          isOpen={secondOpen}
          onClose={() => setSecondOpen(false)}
          title="Level 2 Drawer"
          position="right"
          width={450}
          level={1}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <p>Second level drawer</p>
            <Button
              label="Open Level 3"
              variant="primary"
              onClick={() => setThirdOpen(true)}
            />
          </div>
        </Drawer>

        <Drawer
          isOpen={thirdOpen}
          onClose={() => setThirdOpen(false)}
          title="Level 3 Drawer"
          position="right"
          width={400}
          level={2}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <p>Third level drawer - triple nested!</p>
            <Button
              label="Close This Drawer"
              onClick={() => setThirdOpen(false)}
            />
          </div>
        </Drawer>
      </>
    );
  },
};

export const LeftAndRightNested: Story = {
  render: () => {
    const [leftOpen, setLeftOpen] = useState(false);
    const [rightOpen, setRightOpen] = useState(false);

    return (
      <>
        <Button
          label="Open Left Drawer"
          onClick={() => setLeftOpen(true)}
          variant="primary"
        />

        <Drawer
          isOpen={leftOpen}
          onClose={() => setLeftOpen(false)}
          title="Left Drawer"
          position="left"
          width={500}
          level={0}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <p>Left-side drawer</p>
            <Button
              label="Open Right Drawer"
              variant="primary"
              onClick={() => setRightOpen(true)}
            />
          </div>
        </Drawer>

        <Drawer
          isOpen={rightOpen}
          onClose={() => setRightOpen(false)}
          title="Right Drawer (Nested)"
          position="right"
          width={450}
          level={1}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <p>Right-side nested drawer on top of left drawer</p>
            <Button
              label="Close"
              onClick={() => setRightOpen(false)}
            />
          </div>
        </Drawer>
      </>
    );
  },
};
