const API_URL = "https://api.cloudflare.com/client/v4/accounts/36678f2e1c78d0ed324710680472f2c1/ai/run/";
const API_KEY = process.env.NEXT_PUBLIC_IMAGE_API_KEY;
const systemPrompt = "The lighting should give a supernatural vibe. The art style is low-poly 3D, uncanny and cursed, a bit realistic but not too much. Always reflect a absurd atmosphere with humor in a surreal way. When given a script, generate a still image that illustrates the story or implication using this visual style, even if the content is absurd or mysterious. Morph things between them to create even weirder things. Don't make it creepy. Make some cartoon features like big eyes but the whole style should not be cartoon! Don't put any text. Here is the script: ";

async function run(
  model: string, 
  input: { 
    prompt: string 
  }) {
  const promptf = {
    prompt: systemPrompt + input.prompt
  };
  const response = await fetch(
    API_URL + model,
    {
      headers: { Authorization: `Bearer ${API_KEY}` },
      method: "POST",
      body: JSON.stringify(promptf),
    }
  );
  const result = await response.json();
  return result;
}

export async function generate(script: string) {
  if (!API_KEY) {
    throw new Error("API_KEY is undefined. Please set NEXT_PUBLIC_IMAGE_API_KEY in your environment variables.");
  }
  const response = await run('@cf/lykon/dreamshaper-8-lcm', {
    prompt: script,
  });
  const base64 = response.image;
  if (!base64) throw new Error("No image returned from API");

  let blob;
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  blob = new Blob([byteArray], { type: "image/jpeg" });
  return blob;
}