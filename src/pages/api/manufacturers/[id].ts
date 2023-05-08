import { NextApiRequest, NextApiResponse } from "next";

export default async function manufacturerById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/vehicles/getmanufacturerdetails/${id}?format=json`
  );
  const data = await response.json();
  const manufacturer = data.Results[0];

  res.status(200).json(manufacturer);
}
