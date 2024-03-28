import { Paper, Tabs, Title } from "@mantine/core";
import { useFavoriteStore } from "store/favorite.store";
import { FavoriteItem } from "components/Favorites/FavoriteItem";
import { useEffect, useState } from "react";
import { IconDiamond, IconDeviceLaptop, IconShirt } from "@tabler/icons-react";

export const FavoritePage = () => {
  const { favoriteItems, clearHistory } = useFavoriteStore();

  useEffect(() => {
    clearHistory();
  }, []);

  // const onDragEnd = (event: DragOverEvent) => {
  //   const { active, over } = event;

  //   const oldIndex = favoriteItems.findIndex(item => item.id === active.id);
  //   const newIndex = favoriteItems.findIndex(item => item.id === over?.id);
  //   updateFavoriteItems(oldIndex, newIndex);

  //   console.log(oldIndex, newIndex);
  // };

  const [activeTab, setActiveTab] = useState<string | null>('all');

  const filteredFavorite = favoriteItems.filter((item) => {
    if (activeTab === 'all') {
      return true;
    } else {
      return item.category === activeTab;
    }
  });

  return (
    <>
      <Paper
        h="100%"
        mx="10rem"
        mt={10}
        p="xl"
      >
        <Paper
          className="border-t-4 border-indigo-500 "
          shadow="xl"
          p={30}
          h="100%"
          mt={20}
        >
          <Tabs
            variant="outline"
            radius="sm"
            defaultValue="all"
            value={activeTab}
            onChange={setActiveTab}
          >
            <Tabs.List>
              <Tabs.Tab value="all">All</Tabs.Tab>
              <Tabs.Tab value="jewelery" leftSection={<IconDiamond size={18} />}>
                Jewelery
              </Tabs.Tab>
              <Tabs.Tab value="electronics" leftSection={<IconDeviceLaptop size={18} />}>
                Electronics
              </Tabs.Tab>
              <Tabs.Tab value="men's clothing" leftSection={<IconShirt size={18} />}>
                Men's clothing
              </Tabs.Tab>
              <Tabs.Tab value="women's clothing" leftSection={<IconShirt size={18} />}>
                Women's clothing
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
          <Title
            m={10}
            order={3}
            style={{ textTransform: 'capitalize' }}
          >
            {activeTab}
          </Title>
          {/* <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext
              items={favoriteItems}
              strategy={verticalListSortingStrategy}
            > */}
          {filteredFavorite.map((item) => (
            <FavoriteItem
              id={item.id}
              favoriteItem={item}
              key={item.title}
            />
          ))}
          {/* </SortableContext>
          </DndContext> */}
        </Paper>
      </Paper>
    </>
  );
};