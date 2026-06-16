import "dotenv/config";

const pollinationsApiKey = process.env.POLLINATIONS_API_KEY;

export async function generateImage(prompt) {
  try {
    if (!pollinationsApiKey) {
      throw new Error(
        "Pollinations API key is not set in the environment variables.",
      );
    }

    const response = await fetch(
      `https://image.pollinations.ai/p/${encodeURIComponent(prompt)}?model=flux`,
      {
        headers: {
          Authorization: `Bearer ${pollinationsApiKey}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to generate image: ${response.status} ${response.statusText}`,
      );
    }

    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return buffer;
  } catch (error) {
    console.error("Error generating image:", error.message);
  }
}
