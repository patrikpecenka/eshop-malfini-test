import { Button, CloseButton, Flex, Input, Menu, SegmentedControl, SimpleGrid } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"
import fetcher from "lib/fetcher"
import { ProductDto } from "lib/dto/types"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { ProductCard } from "components/ProductCard"
import { StringParam, useQueryParams, withDefault } from "use-query-params"


export const AllProducts = () => {
  const [query, setQuery] = useQueryParams({
    activeSorting: withDefault(StringParam, ""),
    search: withDefault(StringParam, undefined),
  });

  const { data, status } = useQuery({
    queryKey: ['products', query.activeSorting],
    queryFn: () => fetcher<ProductDto[]>(`https://fakestoreapi.com/products?sort=${query.activeSorting}`),
  })

  const filteredProducts = useMemo(
    () =>
      (data ?? []).filter((product) => (
        product.title.toLowerCase().includes((query.search ?? "").toLowerCase())
      )),
    [data, query.search]
  )

  if (status === 'pending') return <p>Loading...</p>
  if (status === 'error') return <p>Error</p>

  return (
    <>
      <Flex justify="start" px={20} pt={20} gap={20}>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button
              variant="light"
              gradient={{ from: 'btn-violet', to: 'btn-indigo', deg: 25 }}
            >
              Sorted by: {query.activeSorting}
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>
              Sort by
            </Menu.Label>
            <SegmentedControl
              fullWidth
              orientation="vertical"
              variant="light"
              value={query.activeSorting}
              color="btn-indigo"
              onChange={(value) => setQuery({ activeSorting: value })}
              data={[
                { label: 'asc sort', value: 'asc' },
                { label: 'desc sort', value: 'desc' }
              ]}
            />
          </Menu.Dropdown>
        </Menu>
        <Input
          placeholder="Search..."
          value={query.search}
          onChange={(e) => setQuery({ search: e.currentTarget.value.length > 0 ? e.currentTarget.value : undefined })}
          leftSection={<IconSearch size={20} />}
          rightSectionPointerEvents="all"
          rightSection={
            <CloseButton
              onClick={() => setQuery({ search: undefined })}
              style={{ display: "" ? undefined : "none" }}
            />
          }
        />
      </Flex>
      <SimpleGrid
        w="100%"
        p={20}
        cols={{ base: 1, sm: 3, md: 4, lg: 6 }}
      >
        {
          (query.search ?? "").length > 0
            ? filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
            : data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        }
      </SimpleGrid>
    </>
  )
}