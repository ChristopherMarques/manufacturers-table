import { Container, Flex, Heading } from "@chakra-ui/react";
import ManufacturerTable from "../components/ManufacturerTable";
import { Manufacturer } from "../types/manufacturer";

interface Props {
  manufacturers: Manufacturer[];
}

export default function Manufacturers({ manufacturers }: Props) {
  return (
    <Container
      maxW="container.xl"
      width={"100vw"}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Flex direction={"column"} alignItems={"center"}>
        <Heading as="h1" size="xl" mb="8" fontWeight="bold">
          Manufacturers
        </Heading>
        <ManufacturerTable manufacturers={manufacturers} />
      </Flex>
    </Container>
  );
}

export async function getServerSideProps() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/manufacturers`
  );

  const manufacturers = await response.json();

  return {
    props: {
      manufacturers,
    },
  };
}
