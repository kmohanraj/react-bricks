import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, Button } from "../components";

const meta: Meta<typeof Card> = {
  title: "React-Bricks/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    header: <h3>Card Title</h3>,
    children: (
      <p>
        This is a simple card component. It can contain any type of content like text, images, or other components.
      </p>
    ),
    footer: (
      <>
        <Button label="Cancel" variant="secondary" type="button" />
        <Button label="Submit" variant="primary" type="button" />
      </>
    ),
  },
};

export const WithoutHeader: Story = {
  args: {
    children: (
      <div>
        <h3>Product Card</h3>
        <p>This card has no header section, just content and footer.</p>
      </div>
    ),
    footer: (
      <Button label="Learn More" variant="primary" type="button" />
    ),
  },
};

export const WithoutFooter: Story = {
  args: {
    header: <h3>Information Card</h3>,
    children: (
      <p>
        This card displays information without any footer actions. Perfect for read-only content.
      </p>
    ),
  },
};

export const Minimal: Story = {
  args: {
    children: <p>A minimal card with just content area.</p>,
  },
};

export const Elevated: Story = {
  args: {
    variant: "elevated",
    header: <h3>Elevated Card</h3>,
    children: (
      <p>
        This card uses the elevated variant with a prominent shadow effect.
      </p>
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    header: <h3>Outlined Card</h3>,
    children: (
      <p>
        This card uses the outlined variant with a visible border.
      </p>
    ),
  },
};

export const Hoverable: Story = {
  args: {
    isHoverable: true,
    header: <h3>Clickable Card</h3>,
    children: (
      <p>
        Hover over this card to see the lift effect. Click to trigger an action.
      </p>
    ),
  },
};

export const WithImage: Story = {
  args: {
    header: <h3>Image Card</h3>,
    children: (
      <div>
        <img
          src="https://via.placeholder.com/400x200"
          alt="Card Image"
          style={{ width: "100%", height: "auto", marginBottom: "1rem" }}
        />
        <p>This is a card with an image in the content area.</p>
      </div>
    ),
    footer: (
      <>
        <Button label="View" variant="secondary" type="button" isSmall />
        <Button label="Share" variant="primary" type="button" isSmall />
      </>
    ),
  },
};

export const Gallery: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "1.5rem",
        padding: "2rem",
        width: "100%",
      }}
    >
      <Card
        header={<h4>Card 1</h4>}
        footer={<Button label="Action" variant="primary" type="button" isSmall />}
      >
        <p>First card with header and footer.</p>
      </Card>
      <Card
        header={<h4>Card 2</h4>}
        footer={<Button label="Action" variant="primary" type="button" isSmall />}
      >
        <p>Second card with the same layout.</p>
      </Card>
      <Card
        header={<h4>Card 3</h4>}
        footer={<Button label="Action" variant="primary" type="button" isSmall />}
      >
        <p>Third card in the gallery layout.</p>
      </Card>
    </div>
  ),
};
