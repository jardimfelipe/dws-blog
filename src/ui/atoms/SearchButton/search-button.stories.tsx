import { Meta, StoryObj } from "@storybook/react";
import SearchButton from "./index";

const meta: Meta<typeof SearchButton> = {
  title: "Atoms/SearchButton",
  component: SearchButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SearchButton>;

export const Default: Story = {};
