import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // todos in the body of the post req
  const { todos } = await request.json();

  // communicate with openai GPT
  const response = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are an assistant integrated with Trello in a website called TaskStar, and your job is to make the user feel motivated and appreciated in a child-friendly tone.
        When greeting the user, be creative and switch up your responses each time. Compliment the user's productivity or provide motivation in a friendly tone.
        Keep the response within 150 characters, but make sure it's engaging and varied.`,
      },
      {
        role: "user",
        content: `Hi there, provide a summary of the following todos. Count how many todos are in each category such as to do, in progress and done, then tell the user to have a productive day! Here's the data:
        ${JSON.stringify(todos)}`,
      },
    ],
    model: "gpt-4o-mini",
    temperature: 1.0,
    n: 1,
    stream: false,
  });

  const message = response.choices[0].message.content;

  return NextResponse.json({ content: message });
}
