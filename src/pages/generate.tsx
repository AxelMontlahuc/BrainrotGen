// Simplify page to only render client-side VideoGenerator and remove server-side ffmpeg instantiation causing errors
import dynamic from 'next/dynamic';

const VideoGenerator = dynamic(
  () => import('@/components/ui/video-generator'),
  { ssr: false, loading: () => <p>Loading video generator...</p> }
);

export default function Generate() {
  return <VideoGenerator />;
}
