import { StoryObj } from "@storybook/react";
import Skeleton from ".";

const meta = {
  title: "Atoms/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomSize: Story = {
  args: {
    width: "100px",
    height: "100px",
    borderRadius: "10px",
  },
};
