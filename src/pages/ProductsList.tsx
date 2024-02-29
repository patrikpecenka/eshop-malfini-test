import { SimpleGrid } from "@mantine/core"
import { Products } from "components/Products"

export const AllProducts = () => {
  return (
    <SimpleGrid
      p={20}
      cols={{ base: 1, sm: 3, md: 4, lg: 6 }}
    >
      <Products />
    </SimpleGrid>
  )
}