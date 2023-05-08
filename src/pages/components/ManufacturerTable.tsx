import { Button } from "@chakra-ui/button";
import { Table, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/table";
import Link from "next/link";
import { useState } from "react";
import { Manufacturer } from "../types/manufacturer";

interface Props {
  manufacturers: Manufacturer[];
}

export default function ManufacturerTable({ manufacturers }: Props) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const startIndex = (page - 1) * perPage;
  const endIndex = page * perPage;

  const paginatedData = manufacturers.slice(startIndex, endIndex);

  function handleLoadMore() {
    setPage(page + 1);
  }
  function handleLoadLess() {
    setPage(page - 1);
  }

  return (
    <Table variant="simple">
      <Thead>
        <Tr bg="gray.100" borderBottom="1px" borderColor="gray.300">
          <Th px={4} py={2}>
            ID
          </Th>
          <Th px={4} py={2}>
            Common Name
          </Th>
          <Th px={4} py={2}>
            Country
          </Th>
          <Th px={4} py={2}>
            Detail
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {paginatedData?.map((manufacturer) => (
          <Tr
            key={manufacturer.Mfr_ID}
            borderBottom="1px"
            borderColor="gray.300"
          >
            <Td px={4} py={2}>
              {manufacturer.Mfr_ID}
            </Td>
            <Td px={4} py={2}>
              {manufacturer.Mfr_CommonName ?? manufacturer.Mfr_Name}
            </Td>
            <Td px={4} py={2}>
              {manufacturer.Country}
            </Td>
            <Td px={4} py={2}>
              <Link href={`/manufacturers/${manufacturer.Mfr_ID}`} passHref>
                <Button as="a" colorScheme="blue" variant="link">
                  Detail
                </Button>
              </Link>
            </Td>
          </Tr>
        ))}
      </Tbody>
      <Tfoot>
        <Tr>
          <Td colSpan={12} textAlign="center" alignItems={"center"}>
            <Button
              onClick={handleLoadLess}
              bg="blue.500"
              color="white"
              _hover={{ bg: "blue.600" }}
              _focus={{ outline: "none" }}
              mr={2}
              isDisabled={page <= 1}
            >
              Previous Page
            </Button>
            <Button
              onClick={handleLoadMore}
              bg="blue.500"
              color="white"
              _hover={{ bg: "blue.600" }}
              _focus={{ outline: "none" }}
              isDisabled={manufacturers.length == 0}
            >
              Next Page
            </Button>
          </Td>
        </Tr>
      </Tfoot>
    </Table>
  );
}
