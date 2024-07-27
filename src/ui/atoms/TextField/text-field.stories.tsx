import type { StoryObj } from "@storybook/react";

import TextField from "./index";
import SearchIcon from "../Icons/SearchIcon";

const meta = {
  title: "Atoms/TextField",
  component: TextField,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Placeholder",
  },
};

export const WithStartAdornment: Story = {
  args: {
    placeholder: "Placeholder",
    startAdornment: <SearchIcon />,
  },
};

export const WithEndAdornment: Story = {
  args: {
    placeholder: "Placeholder",
    endAdornment: <SearchIcon />,
  },
};
