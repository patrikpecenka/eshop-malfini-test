import { Button, Flex, Group, Title, Text, Paper } from "@mantine/core";
import { Link } from "react-router-dom";
import { useQueryParam } from "use-query-params";

export const CompletedPage = () => {
  const [order] = useQueryParam("order");

  const checkRedirect = () => {
    if (order === undefined) {
      return `/profile`;
    }
    return `/profile/${order}`;
  };

  return (
    <>
      <Paper
        shadow="sm"
        h={600}
      >
        <Flex align="center" justify="center" direction="column" h="100%">
          <Title order={1}>
            Thank you for your purchase!
          </Title>
          <Text c="dimmed">
            Now you can close the page or continue shopping
          </Text>
          <Group>
            <Button
              component={Link}
              to={`${checkRedirect()}`}
              variant="light"
            >
              Check order
            </Button>
            <Button
              component={Link}
              to="/products"
            >
              Done
            </Button>
          </Group>
        </Flex>
      </Paper>
    </>
  );
};