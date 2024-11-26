import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import "../style.css";
import { useQuery } from "react-query";
import { fetchOrders } from "../../../api";

function Orders() {
  const { isLoading, isError, data, error } = useQuery(
    "admin:orders",
    fetchOrders
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error {error.message}</div>;
  }
  const onShowDetails = () => {
    const details = data.notExistingKey.details;
  }

  return (
    <div>
      <nav>
        <ul className="admin-menu">
          <li>
            <Link to="/admin">Home</Link>
          </li>
          <li>
            <Link to="/admin/orders">Order</Link>
          </li>
          <li>
            <Link to="/admin/products">Products</Link>
          </li>
        </ul>
      </nav>
      <Box mt={10}>
        <Text fontSize="2xl" p={5}>
          Orders
        </Text>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Users</Th>
              <Th>Address</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item._id}>
                {item.user === null ? (
                  <Td>No Name</Td>
                ) : (
                  <Td>{item.user.email}</Td>
                )}
                <Td>{item.adress}</Td>
                <Td>
                  <Button colorScheme={"blue"} onClick={onShowDetails}>Show details</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </div>
  );
}

export default Orders;
