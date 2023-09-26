import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Todos in the bosy of the POST red
  const { todos } = await request.json();
  console.log(todos);
  // communicate with OPEN AI GPT
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream:false,
    n:1,
    messages: [
      {"role": "system", 
      "content": "Hello! I am bot from Tausf Hossain ."
      },
      {"role": "user", 
      "content": `Hi there, provide the summury of the following todos. ${JSON.stringify(todos)}`
      },
      
    ],
  });
  console.log(response.choices[0].message);
  return NextResponse.json(response.choices[0].message)
}

