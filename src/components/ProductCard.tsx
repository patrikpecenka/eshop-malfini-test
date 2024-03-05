import { Badge, Card, CardProps, Group, Image, NumberFormatter, Rating, Text, Title, Tooltip } from "@mantine/core"
import { ProductDto } from "../lib/dto/types"
import { AddCartButton } from "./Buttons/AddCartButton"
import { useCart } from "../store/shopStore"
import { Link } from "react-router-dom"


interface ProductCardProps extends CardProps {
  product: ProductDto;
}

export const ProductCard = ({ product, ...rest }: ProductCardProps) => {
  const addCartItems = useCart((state) => state.addItem);

  const handleClick = () => {
    addCartItems({
      ...product, totalPrice: product.price, amount: 1
    })
  }

  return (
    <Card
      withBorder
      radius="md"
      shadow="sm"
      padding="md"
      {...rest}
    >

      <Link
        to={`/products/${product.id}`}
      >
        <Card.Section className="self-center select-none" p="lg">
          <Image
            className="hover:scale-110 duration-200"
            src={product.image}
            w="100%"
            h={150}
            fit="contain"
          />
        </Card.Section>
        <Group
          h={100}
          gap={1}
        >
          <Title
            order={4}
            lineClamp={1}
            className="hover:text-violet-600"
          >
            {product.title}
          </Title>
          <Text lineClamp={3} size="xs" mt={10}>{product.description}</Text>
        </Group>
      </Link>

      <Group
        justify="space-between"
        mt={10}
        w="100%"
        h={50}
      >
        <Tooltip label={`Rating ${product.rating.rate} out of 5`}>
          <Rating value={product.rating.rate} fractions={3} readOnly size="xs" />
        </Tooltip>
        <Badge variant="light" color="teal" size="lg">
          <Title order={4}>
            <NumberFormatter prefix="$" value={product.price} />
          </Title>
        </Badge>
      </Group>
      <AddCartButton
        onClick={handleClick}
      />
    </Card>
  )
}