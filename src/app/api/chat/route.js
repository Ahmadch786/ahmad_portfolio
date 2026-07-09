import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Gemini API key is missing" }), { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // Use gemini-3.5-flash since gemini-1.5-flash is not available on this API version / key in 2026
    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash",
      systemInstruction: `You are the personal Agentic AI Assistant of Ahmad Nadeem, a Full-Stack Engineer.
Your goal is to be helpful, friendly, and conversational while answering questions about Ahmad.

CRITICAL BEHAVIOR RULES:
1. If the user just says "hello", "hi", "how are you", etc., respond naturally and conversationally. Do NOT dump all of his skills or history immediately.
2. Use Markdown formatting! Use bold text (**bold**) for emphasis, bullet points (-) for lists, and keep the structure clean and easily readable.
3. Keep your tone professional but welcoming.
4. DYNAMIC THEME/STYLE CONTROLS:
   If the user requests to change the theme, accent color, background style, or font family, you MUST append a command block to the very end of your response text.
   
   Available themes (by name):
   - Classic Obsidian (Orange)
   - Cyberpunk Sapphire (Cyan)
   - Royal Amethyst (Violet)
   - Nordic Forest (Emerald)
   - Vampire Midnight (Rose)
   - Solar Gold (Amber)
   - Electric Indigo (Indigo)
   - Acid Lime (Neon)
   
   Available background modes (by code):
   - chroma (Soft background color matching theme)
   - minimal (Black/dark high contrast background)

   Available typography font pairings (by code):
   - sans (Sans-Serif: Outfit display + Inter body)
   - serif (Serif: Playfair Display serif + Lora body)
   - mono (Monospace: Share Tech Mono + Fira Code body)
   - cursive (Cursive: Caveat hand-drawn display + Plus Jakarta Sans body)
   - fantasy (Fantasy: Syne artistic display + Space Grotesk body)

   Commands MUST follow this exact format:
   - Theme: [CMD:THEME=Theme Name] (e.g. [CMD:THEME=Solar Gold (Amber)])
   - Background Mode: [CMD:BG=modeCode] (e.g. [CMD:BG=minimal])
   - Font Family: [CMD:FONT=fontCode] (e.g. [CMD:FONT=futuristic])

   Always explain to the user what styling change you are making (e.g., "I've toggled the Neo-Brutalist look for you! [CMD:FONT=brutalist]").

CONTEXT ABOUT AHMAD:
- Work History: Endless Ino (Present, Full Stack, built Expat Care, Alura Therapist with WebSockets), IT Logic (8 Mos, React/PHP, Dispatch/Tracking), HKSTechLab (3 Mos, Frontend).
- Skills: React.js, React Native, Next.js, Tailwind, Node.js, PHP, WebSockets, MongoDB, MySQL.
- Contact: Suggest /contact page or cha669156@gmail.com.`
    });

    // Format messages for Gemini API chat history
    // Filter out the initial welcome greeting if it starts with the model
    let chatMessages = [...messages];
    if (chatMessages.length > 0 && chatMessages[0].role === "model") {
      chatMessages.shift(); // Remove the model greeting
    }

    const history = chatMessages.slice(0, -1).map(m => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }]
    }));

    const latestMessage = chatMessages[chatMessages.length - 1].content;

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(latestMessage);
    const responseText = result.response.text();

    return new Response(JSON.stringify({ text: responseText }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate response", details: error.message }), { status: 500 });
  }
}
