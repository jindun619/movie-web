import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { path } = req.query;

  const apiKey = process.env.API_KEY;

  const { region, language, ...restParams } = req.query;

  const apiUrl = `https://api.themoviedb.org/3/${path}?api_key=${apiKey}&region=KR&language=ko-KR`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
