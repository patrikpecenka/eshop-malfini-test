import { Card } from "@mantine/core";
import { useFavoriteStore } from "store/favorite.store";
import { DndContext, DragOverEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { FavoriteItem } from "components/Cart/FavoriteItem";

export const FavoritePage = () => {
  const { favoriteItems, updateItems } = useFavoriteStore();

  const onDragEnd = (event: DragOverEvent) => {
    const { active, over } = event;

    const oldIndex = favoriteItems.findIndex(item => item.id === active.id);
    const newIndex = favoriteItems.findIndex(item => item.id === over?.id);
    updateItems(oldIndex, newIndex);

  };

  return (
    <>
      <Card
        h="100%"
        mx="10rem"
        mt={10}
        p="xl"
      >
        <Card
          className="border-t-4 border-indigo-500 "
          shadow="xl"
          p={90}
          h="100%"
          mt={20}
        >
          <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext
              items={favoriteItems}
              strategy={verticalListSortingStrategy}
            >
              {favoriteItems.map((item) => (
                <FavoriteItem favoriteItem={item} key={item.title} />
              ))}
            </SortableContext>
          </DndContext>
        </Card>
      </Card>
    </>
  );
};