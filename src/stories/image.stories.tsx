import type { Meta, StoryObj } from "@storybook/react-vite";
import { Image } from "../components";

const meta: Meta<typeof Image> = {
  title: "React-Bricks/Image",
  component: Image,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isLazy: {
      control: { type: "boolean" },
    },
    isDisabled: {
      control: { type: "boolean" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const SAMPLE_IMAGE = "https://via.placeholder.com/300x200?text=Sample+Image";
const FALLBACK_IMAGE = "https://via.placeholder.com/300x200?text=Fallback+Image";
const BROKEN_IMAGE = "https://invalid-url-that-does-not-exist.com/image.jpg";

export const Default: Story = {
  args: {
    src: SAMPLE_IMAGE,
    alt: "Sample image",
    width: "300",
    height: "200",
  },
};

export const WithCustomSize: Story = {
  args: {
    src: SAMPLE_IMAGE,
    alt: "Custom sized image",
    width: "400",
    height: "300",
  },
};

export const Clickable: Story = {
  args: {
    src: SAMPLE_IMAGE,
    alt: "Clickable image",
    width: "300",
    height: "200",
    onClick: () => alert("Image clicked!"),
  },
};

export const Lazy: Story = {
  args: {
    src: SAMPLE_IMAGE,
    alt: "Lazy loaded image",
    width: "300",
    height: "200",
    isLazy: true,
  },
};

export const EagerLoading: Story = {
  args: {
    src: SAMPLE_IMAGE,
    alt: "Eager loaded image",
    width: "300",
    height: "200",
    isLazy: false,
  },
};

export const WithFallback: Story = {
  args: {
    src: BROKEN_IMAGE,
    alt: "Image with fallback",
    width: "300",
    height: "200",
    fallbackSrc: FALLBACK_IMAGE,
  },
};

export const Disabled: Story = {
  args: {
    src: SAMPLE_IMAGE,
    alt: "Disabled image",
    width: "300",
    height: "200",
    isDisabled: true,
  },
};

export const WithCustomClass: Story = {
  args: {
    src: SAMPLE_IMAGE,
    alt: "Custom class image",
    width: "300",
    height: "200",
    className: "custom-image",
  },
};

export const Responsive: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      <Image
        src={SAMPLE_IMAGE}
        alt="Responsive 1"
        width="200"
        height="150"
      />
      <Image
        src={SAMPLE_IMAGE}
        alt="Responsive 2"
        width="250"
        height="200"
      />
      <Image
        src={SAMPLE_IMAGE}
        alt="Responsive 3"
        width="300"
        height="200"
      />
    </div>
  ),
};

export const WithErrorHandler: Story = {
  args: {
    src: BROKEN_IMAGE,
    alt: "Image with error handler",
    width: "300",
    height: "200",
    onError: (event, src) => {
      console.error(`Failed to load image: ${src}`);
    },
  },
};

export const Circle: Story = {
  args: {
    src: SAMPLE_IMAGE,
    alt: "Circle image",
    width: "200",
    height: "200",
    className: "circle-image",
  },
};

export const WithRole: Story = {
  args: {
    src: SAMPLE_IMAGE,
    alt: "Presentation image",
    width: "300",
    height: "200",
    role: "presentation",
  },
};
