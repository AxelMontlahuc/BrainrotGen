import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Generate() {
  return (
    <>
      <main>
          <div className="flex flex-col items-center m-[20px] mt-[40px]">
            <h1 className="text-6xl m-[10px]">Generate Brainrot</h1>
          </div>
          <div className="flex flex-col items-center w-100vw m-[40px]">
            <div className="w-[1000px] flex flex-row justify-between">
              <div className="w-[360px] h-[640px] dark:bg-input/30 rounded-md border"></div>
              <div className="h-[640px] w-[600px] flex flex-col justify-between">
                <Textarea className="w-[600px] h-[560px]" placeholder="Type in your script or your script idea here. " />
                <div className="flex flex-row justify-between h-[50px]">
                  <Button className="w-[285px] h-[50px]" variant="secondary">Generate Scipt</Button>
                  <Button className="w-[285px] h-[50px]">Generate Video</Button>
                </div>
              </div>
            </div>
          </div>
      </main>
    </>
  );
}
