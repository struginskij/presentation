import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchProduct } from "../../api";
import ImageGallery from "react-image-gallery";
import {
  Card,
  Stack,
  Heading,
  Text,
  Button,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import { useBasket } from "../../contexts/BasketContext";

function ProductDetail({ data }) {
  const { product_id } = useParams();
  const dataId = data.find((item) => item.id === product_id);
  const { addToBasket, items, removeFromBasket } = useBasket();

  // const { isLoading, isError, data } = useQuery(["product", product_id], () =>
  //   fetchProduct(product_id)
  // );

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   return <div>Error...</div>;
  // }

  const findBasketItem = items.find((item) => item._id === product_id);
  const images = dataId.photos.map((url) => ({ original: url }));
  return (
    <div>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <ImageGallery items={images} showThumbnails={false} />

        <Stack>
          <CardBody>
            <Heading size="md">{dataId.title}</Heading>

            <Text maxWidth={400} py="2">
              {dataId.description}
            </Text>
            <Text color="blue.600" fontSize="2xl">
              {dataId.price}$
            </Text>
          </CardBody>

          <CardFooter>
            <Button
              variant="solid"
              colorScheme={"whatsapp"}
              onClick={removeFromBasket}
            >
              {findBasketItem ? "Remove from basket" : "Add to Basket"}
            </Button>
          </CardFooter>
        </Stack>
      </Card>
    </div>
  );
}

export default ProductDetail;
