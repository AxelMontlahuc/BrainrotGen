export default function Docs () {
    return (
        <>
            <main>
                <div className="flex flex-col items-center m-[20px] mt-[60px]">
                    <h1 className="text-6xl m-[10px]">Learn More</h1>
                </div>
                <div className="flex flex-col items-center w-100vw m-[40px]">
                    <div className="w-[1000px]">
                        <p>This website is actually a project for <a href="https://shipwrecked.hackclub.com" className="text-blue-500 hover:underline">Shipwrecked</a>, a hackathon organized by <a href="https://hackclub.com/" className="text-blue-500 hover:underline">Hack Club</a>. <br/> You can find the code on my <a href="https://github.com/AxelMontlahuc" className="text-blue-500">GitHub</a>. </p>

                        <h2 className="text-4xl mt-8 mb-4">About BrainrotGen</h2>
                        <p className="mb-4">BrainrotGen is designed to allow people to generate AI brainrot videos (especially italian brainrot) therefore making this type of mass short content creation for platforms like Instagram, TikTok or YouTube accessible to persons with no coding skills. <br/> The website is fully free and will never be paid. There may be rate limits with APIs though so if you cannot generate content it may be the reason. </p>

                        <h2 className="text-4xl mt-8 mb-4">How it Works</h2>
                        <p className="mb-4"> The website is still in its early stages so the way it works is not optimal yet. <br/> The content creation can be divided into 4 parts: </p>
                        <ul className="list-disc list-inside mb-4">
                            <li>First we get what the user means by feeding its input to llama-4, asking it to generate a script in italian. </li>
                            <li>Then we generate a matching image through FLUX-schnell thanks to Cloudflare AI Workers</li>
                            <li>After that we generate the audio using MeloTTS still thanks to Cloudflare AI Workers</li>
                            <li>Finally we create a canvas where we put all of this together plus a background music and we record it.</li>
                        </ul> 

                        <h2 className="text-4xl mt-8 mb-4">Tech</h2>
                        <ul className="list-disc list-inside mb-4">
                            <li>Framework: Next.js</li>
                            <li>Language: Typescript</li>
                            <li>Tailwind CSS</li>
                            <li>Shadcn</li>
                            <li>Hackclub's AI endpoint</li>
                            <li>Cloudlare AI workers</li>
                        </ul>

                        <h2 className="text-4xl mt-8 mb-4">Project Goals</h2>
                        <ul className="list-disc list-inside mb-4">
                            <li>Create an nice user interface for video generation.</li>
                            <li>Explore how shitty AI really is when it comes to content creation.</li>
                            <li>Make a cool (maybe not) project for the Shipwrecked hackathon.</li>
                            <li>Learn Next.js.</li>
                        </ul>

                        <h2 className="text-4xl mt-8 mb-4">Future Ideas</h2>
                        <p>There are still many improvements that can be made:</p>
                        <ul className="list-disc list-inside mb-4">
                            <li>Enhance the AIs through better prompts and by investing in AIs that are actually good (ChatGPT, Imagen-3, ElevenLabs)</li>
                            <li>User accounts and saved projects.</li>
                            <li>More customization options for video styles.</li>
                            <li>More video styles (currently there is only italian brainrot)</li>
                            <li>Integration with social media platforms for easy posting.</li>
                            <li>Community features for sharing and discovering creations.</li>
                        </ul>
                        <p className="mt-8">Stay tuned for more updates as the project develops during Shipwrecked!</p>
                    </div>
                </div>
            </main>
        </>
    );
}