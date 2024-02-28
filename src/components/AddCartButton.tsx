import { Button } from "@mantine/core"

interface AddCartButtonProps {
  onClick: () => void
}
export const AddCartButton = ({ onClick }: AddCartButtonProps) => {

  return (
    <Button
      className="hover:opacity-70 duration-200"
      w="100%"
      mt={15}
      variant="gradient"
      gradient={{ from: 'violet', to: 'indigo', deg: 25 }}
      size="md"
      radius="xl"
      onClick={onClick}
    >
      Add To Cart
    </Button >
  )
}