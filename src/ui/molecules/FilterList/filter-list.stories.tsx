import { StoryObj } from "@storybook/react";
import FilterList from ".";

const meta = {
  title: "Molecules/FilterList",
  component: FilterList,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <FilterList.Container>
      <FilterList.List>
        <FilterList.Item>Filter 1</FilterList.Item>
        <FilterList.Item>Filter 2</FilterList.Item>
      </FilterList.List>
    </FilterList.Container>
  ),
};
