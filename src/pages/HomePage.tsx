import { Button, Flex, Title } from "@mantine/core"
import { useNavigate } from "react-router-dom"


export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Flex align="center" justify="center" direction="column">
      <Button

        h={60}
        mt={50}
        radius={50}
        w="50%"
        variant="gradient"
        gradient={{ from: 'violet', to: 'indigo', deg: 25 }}
        onClick={() => navigate("/products")}
      >
        <Title order={3}>
          Take me to products page
        </Title>
      </Button>
    </Flex>

  )
}