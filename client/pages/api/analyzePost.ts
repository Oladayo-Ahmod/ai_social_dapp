import type { NextApiRequest, NextApiResponse } from 'next'
 import client from '@/app/utils/openai'
 import OpenAI from 'openai';

type ResponseData = {
  analysis?: string;
  error?: string;
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  
  const { content } = req.body;

  if (typeof content !== "string") {
    return res.status(400).json({ error: "Content must be a string." });
  }

  const chatCompletion = await client.chat.completions.create({
    messages: [{ role: 'user', content:`Analyze this content for potential rule violations or inappropriate content: "${content}"`,}],
    model: 'gpt-3.5-turbo',
  });

  const analysis = chatCompletion.choices?.[0]?.message?.content?.trim() || "";

  res.status(200).json({analysis})}