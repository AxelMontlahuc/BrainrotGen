import dynamic from 'next/dynamic';

const VideoGenerator = dynamic(
  () => import('@/components/subwaysurfer-generator'),
  { ssr: false, loading: () => <p>Loading video generator...</p> }
);

export default function Generate() {
  return <VideoGenerator />;
}