import { NextApiRequest, NextApiResponse } from "next";

export default async function manufacturers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page = 1 } = req.query;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/vehicles/getallmanufacturers?format=json&page=${page}`
  );

  const data = await response.json();
  const manufacturers = data.Results;

  res.status(200).json(manufacturers);
}
