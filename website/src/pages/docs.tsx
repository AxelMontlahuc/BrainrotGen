export default function Docs () {
    return (
        <>
            <main>
                <div className="flex flex-col items-center m-[20px] mt-[60px]">
                    <h1 className="text-6xl m-[10px]">Learn More</h1>
                </div>
                <div className="flex flex-col items-center w-100vw m-[40px]">
                    <div className="w-[1000px]">
                        <p>This website is actually a project for <a href="https://shipwrecked.hackclub.com" className="text-blue-500 hover:underline">Shipwrecked</a>, a hackathon organized by <a href="https://hackclub.com/" className="text-blue-500 hover:underline">Hack Club</a>. </p>

                        <h2 className="text-4xl mt-8 mb-4">About BrainrotGen</h2>
                        <p className="mb-4">BrainrotGen is designed to allow people to generate AI brainrot videos (especially italian brainrot) therefore making this type of content creation accessible to persons with no coding skills. <br/> The website is fully free and I'm not considering paid features (at least for now). </p>

                        <h2 className="text-4xl mt-8 mb-4">How it Works</h2>
                        <p className="mb-4">The website is currently in development so no features are available for now. What's planned though is to let the user choose between inputing its own script or letting the AI do it and then based on the script generate a video with AI and add a voiceover with TTS. <br/> For the script part I am using Gemini. <br/> For the video part I'm using Google's service. <br/> For the TTS part I'm using Eleven Labs. </p>

                        <h2 className="text-4xl mt-8 mb-4">Project Goals</h2>
                        <ul className="list-disc list-inside mb-4">
                            <li>Create an intuitive user interface for video generation.</li>
                            <li>Explore the use of AI in creative content generation.</li>
                            <li>Participate and contribute a cool project to the Shipwrecked hackathon.</li>
                            <li>Learn Next.js.</li>
                        </ul>

                        <h2 className="text-4xl mt-8 mb-4">Future Ideas</h2>
                        <p>There are many exciting possibilities for BrainrotGen! Some ideas include:</p>
                        <ul className="list-disc list-inside mb-4">
                            <li>User accounts and saved projects.</li>
                            <li>More customization options for video styles.</li>
                            <li>Integration with social media platforms for easy sharing.</li>
                            <li>Community features for sharing and discovering creations.</li>
                        </ul>
                        <p className="mt-8">Stay tuned for more updates as the project develops during Shipwrecked!</p>
                    </div>
                </div>
            </main>
        </>
    );
}