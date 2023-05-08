import { NextApiRequest, NextApiResponse } from "next";

export default async function modelsByManufacturerId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { manufacturerId } = req.query;
  const response = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/${manufacturerId}?format=json`
  );
  const data = await response.json();
  const models = data.Results;

  res.status(200).json(models);
}
