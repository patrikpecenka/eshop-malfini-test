import { Card, Flex, Image, Title } from "@mantine/core";
import img from "@assets/empty-cart.png";

export const EmptyCart = () => {
  return (
    <Card
      className="self-center"
      p={30}
      w="100%"
    >
      <Flex direction="column" align="center">
        <Image
          className="self-center"
          mr={15}
          w={100}
          src={img}
        />
        <Title order={3} c="dimmed">
          Your cart is empty
        </Title>
      </Flex>
    </Card >
  );
};