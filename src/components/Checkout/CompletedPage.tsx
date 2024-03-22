import { Button, Flex, Group, Title, Text, Paper } from "@mantine/core";
import { Link } from "react-router-dom";

export const CompletedPage = () => {
  return (
    <>
      <Paper
        shadow="sm"
        h={600}
      >
        <Flex align="center" justify="center" direction="column" h="100%" gap={15}>
          <Title order={1}>
            Thank you for your purchase!
          </Title>
          <Text c="dimmed">
            Now you can close the page or continue shopping
          </Text>
          <Group>
            <Button
              component={Link}
              to={"/profile"}
              variant="light"
            >
              Check orders
            </Button>
            <Button
              component={Link}
              to={"/products"}
              variant="gradient"
            >
              Done
            </Button>
          </Group>
        </Flex>
      </Paper>
    </>
  );
};