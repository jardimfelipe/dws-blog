import type { StoryObj } from "@storybook/react";

import Badge from "./index";

const meta = {
  title: "Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Badge",
  },
};
