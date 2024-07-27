import { StoryObj } from "@storybook/react";
import Card from "./index";
import Button from "../../atoms/Button";

const meta = {
  title: "Molecules/Card",
  component: Card,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card.Container style={{ width: "300px" }}>
      <Card.Content>
        <Card.Description>This is a description</Card.Description>
        <Card.Title>Card Title</Card.Title>
      </Card.Content>
      <Card.Footer>
        <Button variant="ghost">Action 1</Button>
        <Button>Action 2</Button>
      </Card.Footer>
    </Card.Container>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Card.Container style={{ width: "300px" }}>
      <Card.Image
        src="https://via.placeholder.com/150"
        height="150px"
        alt="Placeholder Image"
      />
      <Card.Content>
        <Card.Description>This is a description</Card.Description>
        <Card.Title>Card Title</Card.Title>
      </Card.Content>
      <Card.Footer>
        <Button variant="ghost">Action 1</Button>
        <Button>Action 2</Button>
      </Card.Footer>
    </Card.Container>
  ),
};
