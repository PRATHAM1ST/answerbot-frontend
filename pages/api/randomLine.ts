// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	text: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	res.status(200).json({
		text: await fetch("https://answer-bot.vercel.app/randomLine").then(
			(res: any) => res.json().text
		),
	});
}
