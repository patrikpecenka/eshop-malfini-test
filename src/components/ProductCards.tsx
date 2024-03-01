import { Anchor, Badge, Card, Group, Image, NumberFormatter, Rating, Text, Title, Tooltip } from "@mantine/core"
import { ProductDto } from "../lib/dto/types"
import { AddCartButton } from "./Buttons/AddCartButton"
import { useCart } from "../store/shopStore"
export const ProductCards = ({ id, title, image, price, description, rating }: ProductDto) => {
  const addCartItems = useCart((state) => state.addItem);

  const handleClick = () => {
    addCartItems({
      id, title, image, price, amount: 1,
      totalPrice: price
    })
  }

  return (
    <Card
      withBorder
      radius="md"
      shadow="sm"
      padding="md"
    >

      <Card.Section className="self-center select-none">
        <Anchor
          href={`/products/${id}`}
          underline="never"
        >
          <Image
            className="hover:scale-110 duration-200"
            m={20}
            src={image}
            w={150}
            h={150}
            fit="contain"
          />
        </Anchor>
      </Card.Section>

      <Group
        h={100}
        gap={1}
      >
        <Anchor
          href={`/products/${id}`}
          underline="never"
          c="black">
          <Title
            order={4}
            lineClamp={1}
            className="hover:text-violet-600"
          >
            {title}
          </Title>
          <Text lineClamp={3} size="xs" mt={10}>{description}</Text>
        </Anchor>
      </Group>

      <Group
        justify="space-between"
        mt={10}
        w="100%"
        h={50}
      >
        <Tooltip label={`Rating ${rating.rate} out of 5`}>
          <Rating value={rating.rate} fractions={3} readOnly size="xs" />
        </Tooltip>
        <Badge variant="light" color="teal" size="lg">
          <Title order={4}>
            <NumberFormatter prefix="$" value={price} />
          </Title>
        </Badge>
      </Group>
      <AddCartButton
        onClick={handleClick}
      />
    </Card>
  )
}