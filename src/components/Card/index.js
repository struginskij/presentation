import React from "react";
import {
  Card,
  Text,
  Image,
  Stack,
  Heading,
  CardBody,
  CardFooter,
  Divider,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useBasket } from "../../contexts/BasketContext";

function Cards({ item }) {
  const { addToBasket, items } = useBasket();
  const photoUrl =
    item.photos[0] || "https://placehold.co/300x300?text=No+Image";

  const findBasketItem = items.find(
    (basket_item) => basket_item.id === item.id
  );

  const removeFromBasket = () => {
    items.undefined.filter((item) => item.id !== item.id);
  }

  return (
    <Card maxW="sm">
      <Link to={`/product/${item.id}`}>
        <CardBody>
          <Image
            src={photoUrl}
            alt="Product"
            borderRadius="lg"
            loading="lazy"
            boxSize={300}
            objectFit="cover"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{item.title}</Heading>
            <Text>{moment(item.createdAt).format("DD/MM/YYYY")}</Text>
            <Text color="blue.600" fontSize="2xl">
              {item.price}$
            </Text>
          </Stack>
        </CardBody>
        <Divider />
      </Link>
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button
            variant="solid"
            colorScheme={findBasketItem ? "red" : "blue"}
            onClick={() => {
              return findBasketItem ? removeFromBasket() : addToBasket(item);
            }}
          >
            {findBasketItem ? "Remove from Basket" : "Add to Basket"}
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

export default Cards;
