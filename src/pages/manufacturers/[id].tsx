import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Manufacturer } from "../types/manufacturer";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";

interface Props {
  manufacturer: Manufacturer;
}

export default function ManufacturerDetail({ manufacturer }: Props) {
  const [models, setModels] = useState([]);

  useEffect(() => {
    fetch(
      `http://localhost:3000/api/models?manufacturerId=${manufacturer.Mfr_ID}`
    )
      .then((response) => response.json())
      .then((data) => setModels(data))
      .catch((error) => console.error(error));
  }, [manufacturer.Mfr_ID]);

  return (
    <Box maxW="container.md" mx="auto" my="4">
      <Head>
        <title> {manufacturer.Mfr_CommonName ?? manufacturer.Mfr_Name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading as="h1" size="3xl" fontWeight="bold" mb="4">
        {manufacturer.Mfr_CommonName ?? manufacturer.Mfr_Name}
      </Heading>

      <Box mb="4">
        <Text as="div" fontWeight="bold" display="inline-block" w="1/3">
          ID:
        </Text>
        <Text as="div" display="inline-block" w="2/3">
          {manufacturer.Mfr_ID}
        </Text>
      </Box>

      <Box mb="4">
        <Text as="div" fontWeight="bold" display="inline-block" w="1/3">
          Common Name:
        </Text>
        <Text as="div" display="inline-block" w="2/3">
          {manufacturer.Mfr_CommonName ?? manufacturer.Mfr_Name}
        </Text>
      </Box>

      <Box mb="4">
        <Text as="div" fontWeight="bold" display="inline-block" w="1/3">
          Country:
        </Text>
        <Text as="div" display="inline-block" w="2/3">
          {manufacturer.Country}
        </Text>
      </Box>

      <Heading as="h2" size="2xl" fontWeight="bold" mb="4">
        Models
      </Heading>

      <Table variant="simple" mb="4">
        <Thead>
          <Tr>
            <Th>Model Name</Th>
          </Tr>
        </Thead>
        <Tbody>
          {models.map((model: any) => (
            <Tr key={model.Model_ID}>
              <Td>{model.Model_Name}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response = await fetch(
    `http://localhost:3000/api/manufacturers/${params?.id}`
  );
  const manufacturer = await response.json();

  return {
    props: {
      manufacturer,
    },
  };
};
