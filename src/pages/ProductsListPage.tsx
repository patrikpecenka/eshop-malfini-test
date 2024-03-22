import { Affix, Button, CloseButton, Flex, Input, Menu, SegmentedControl, SimpleGrid, Transition } from "@mantine/core";
import { IconArrowUp, IconSearch } from "@tabler/icons-react";
import fetcher from "lib/fetcher";
import { ProductDto } from "lib/dto/types";
import { useQuery } from "@tanstack/react-query";
import { Suspense, lazy, useMemo } from "react";
import { useDebouncedValue, useWindowScroll } from '@mantine/hooks';
import { StringParam, useQueryParams, withDefault } from "use-query-params";
import { ProductCardSkeleton } from "components/Skeletons/ProductCardSkeleton";

const ProductCard = lazy(() => import("../components/ProductCard"));


export const ProductsListPage = () => {
  const [query, setQuery] = useQueryParams({
    activeSorting: withDefault(StringParam, ""),
    search: withDefault(StringParam, undefined),
  });

  const [scroll, scrollTo] = useWindowScroll();
  const [debounced] = useDebouncedValue(query, 300, { leading: true });

  const { data, status } = useQuery({
    queryKey: ['products', query.activeSorting],
    queryFn: () => fetcher<ProductDto[]>(`https://fakestoreapi.com/products?sort=${query.activeSorting}`),
  });

  const filteredProducts = useMemo(
    () =>
      (data ?? []).filter((product) => (
        product.title.toLowerCase().includes((debounced.search ?? "").toLowerCase())
      )),
    [data, debounced.search]
  );

  if (status === 'error') return <p>Error</p>;
  return (
    <>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(style) => (
            <Button
              leftSection={<IconArrowUp size={15} />}
              style={style}
              variant="gradient"
              radius="xl"
              onClick={() => scrollTo({ y: 0 })}
            >
              Back to top
            </Button>
          )}
        </Transition>
      </Affix>
      <Flex justify="start" px={20} pt={20} gap={20}>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button
              variant="light"
              gradient={{ from: 'violet', to: 'indigo', deg: 25 }}
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
              color="indigo.3"
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
          onChange={(e) => setQuery({ search: e.currentTarget.value || undefined })}
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

        {filteredProducts.map((product) => (
          <Suspense fallback={<ProductCardSkeleton />}>
            <ProductCard
              key={product.id}
              product={product}

            />
          </Suspense>
        ))}

      </SimpleGrid>


    </>
  );
};;