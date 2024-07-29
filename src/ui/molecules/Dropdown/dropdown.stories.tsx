import { StoryObj } from "@storybook/react";
import Dropdown from ".";

const meta = {
  title: "Molecules/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Dropdown",
  },
  render: () => (
    <Dropdown label="Dropdown">
      <Dropdown.DropdownItem>Item 1</Dropdown.DropdownItem>
      <Dropdown.DropdownItem>Item 2</Dropdown.DropdownItem>
      <Dropdown.DropdownItem>Item 3</Dropdown.DropdownItem>
    </Dropdown>
  ),
};
