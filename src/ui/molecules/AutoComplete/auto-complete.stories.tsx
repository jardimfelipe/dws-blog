import { Meta, StoryObj } from "@storybook/react";
import AutoComplete from "./index";
import { Suggestion } from "./index";

const meta: Meta<typeof AutoComplete> = {
  title: "Molecules/AutoComplete",
  component: AutoComplete,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AutoComplete>;

const suggestions: Array<Suggestion> = [
  {
    name: "Apple",
    description: "A fruit",
    image: "https://via.placeholder.com/50",
  },
  {
    name: "Banana",
    description: "A yellow fruit",
    image: "https://via.placeholder.com/50",
  },
  {
    name: "Cherry",
    description: "A small red fruit",
    image: "https://via.placeholder.com/50",
  },
];

export const Default: Story = {
  render: (args) => <AutoComplete {...args} />,
  args: {
    id: "autocomplete-story",
    placeholder: "Search for a fruit",
    suggestions,
    onSelect: (suggestion) => {
      console.log(suggestion);
    },
  },
};
