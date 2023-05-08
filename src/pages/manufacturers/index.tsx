import { useState } from "react";
import Head from "next/head";
import { Manufacturer } from "../types/manufacturer";
import ManufacturerTable from "../components/ManufacturerTable";
import { Center, Container, Flex, Heading } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";

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

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/manufacturers`
  );
  console.log(ctx.resolvedUrl);

  const manufacturers = await response.json();

  return {
    props: {
      manufacturers,
    },
  };
}
