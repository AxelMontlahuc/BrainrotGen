import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { generate } from "@/lib/generateImage";

export default function Generate() {
  const [script, setScript] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const handleGenerateImage = async () => {
    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ script }),
      });
      const data = await res.json();
      if (!data.image) throw new Error("No image returned");

      const byteCharacters = atob(data.image);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/jpeg" });
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
    } catch (error) {
      console.error("Error generating image:", error);
      setImageUrl(null);
    }
  };

  return (
    <>
      <main>
          <div className="flex flex-col items-center m-[20px] mt-[40px]">
            <h1 className="text-6xl m-[10px]">Generate Brainrot</h1>
          </div>
          <div className="flex flex-col items-center w-100vw m-[40px]">
            <div className="w-[1000px] flex flex-row justify-between">
              <div className="w-[360px] h-[640px] dark:bg-input/30 rounded-md border">
                {imageUrl ? (
                  <img 
                    src={imageUrl} 
                    alt="Generated Video" 
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">No video generated yet.</p>
                  </div>
                )}
              </div>
              <div className="h-[640px] w-[600px] flex flex-col justify-between">
                <Textarea 
                  className="w-[600px] h-[560px]"
                  placeholder="Type in your script or your script idea here. "
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                />
                <div className="flex flex-row justify-between h-[50px]">
                  <Button 
                    className="w-[285px] h-[50px]" 
                    variant="secondary"
                  >
                    Generate Script
                  </Button>
                  <Button 
                    className="w-[285px] h-[50px]" 
                    onClick={handleGenerateImage}
                  >
                    Generate Video
                  </Button>
                </div>
              </div>
            </div>
          </div>
      </main>
    </>
  );
}
