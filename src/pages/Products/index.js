import React from "react";
import Cards from "../../components/Card";
import { Grid, Box, Flex } from "@chakra-ui/react";

function Products({ data }) {
  return (
    <div>
      <div className="products">
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          {data.map((item) => {
            return (
              <Box w="100%" key={item.id}>
                <Cards item={item} />
              </Box>
            );
          })}
        </Grid>
      </div>
      <Flex mt="10" justifyContent="center"></Flex>
    </div>
  );
}

export default Products;
