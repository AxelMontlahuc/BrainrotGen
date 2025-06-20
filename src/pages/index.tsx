import { Button } from "@/components/ui/button";
import { FocusCards } from "@/components/ui/focus-cards";
import Link from "next/link";

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
        <div className="flex flex-col items-center m-[80px] mt-[60px]">
          <h1 className="text-6xl m-[10px]">BrainrotGen</h1>
          <p className="text-2xl font-thin">Generate italian brainrot videos in clicks with AI!</p>
          <div>
            <Button className="m-4" variant="outline">
              <Link href="/docs">Learn More</Link>
            </Button>
            <Button className="m-4">
              <Link href="/generate">Generate</Link>
            </Button>
          </div>
        </div>
        <div className="m-[40px] mb-[80px]">
          <FocusCards cards={brainrot} />
        </div>
      </main>
    </>
  );
}
