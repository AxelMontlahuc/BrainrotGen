import { Button } from "@/components/ui/button";
import { FocusCards } from "@/components/ui/focus-cards";

export default function Home() {
  const brainrot = [
    {
      title: "Tralalero Tralala",
      src: "/brainrotcarousel/tralalero_tralala.webp",
    },
    {
      title: "Bombardiro Crocodilo",
      src: "/brainrotcarousel/bombardiro_crocodilo.webp",
    },
    {
      title: "Tung Tung Tung Sahur",
      src: "/brainrotcarousel/tung_tung_tung_sahur.webp",
    },
    {
      title: "Lirili Larila",
      src: "/brainrotcarousel/lirili_larila.webp",
    },
    {
      title: "Boneca Ambalabu",
      src: "/brainrotcarousel/boneca_ambalabu.webp",
    },
    {
      title: "Brr Brr Patapim",
      src: "/brainrotcarousel/brr_brr_patapim.webp",
    },
  ];

  return (
    <>
      <main>
        <div className="flex flex-col items-center m-[80px]">
          <h1 className="text-6xl m-[10px]">BrainrotGen</h1>
          <p className="text-2xl font-thin">Generate italian brainrot videos in clicks with AI!</p>
          <div>
            <Button className="m-4" variant="outline">
              <a href="/docs">Learn More</a>
            </Button>
            <Button className="m-4">
              <a href="/generate">Generate</a>
            </Button>
          </div>
        </div>
        <div className="m-[40px]">
          <FocusCards cards={brainrot} />
        </div>
      </main>
    </>
  );
}
