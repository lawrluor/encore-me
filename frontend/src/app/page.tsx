import Image from 'next/image';

import { Footer } from '../components/Footer';
import { RequestMenu } from '../components/RequestMenu';

const set = {
  id: 'set_demo_01',
  title: 'Street Session',
  description: 'Sunset busking favorites',
  act_id: 'act_demo_01',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const songs = [
  {
    id: 'song_demo_01',
    title: 'Fast Car',
    description: 'Acoustic cover',
    genre: 'Folk',
    tempo: 'Mid',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'song_demo_02',
    title: 'City of Stars',
    description: 'La La Land medley',
    genre: 'Jazz',
    tempo: 'Slow',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const Root = async () => {
  return (
    <div className="w-dvw h-dvh">
      <header className="flex flex-col items-center p-20">
        <h1 className="text-7xl">Encore Me</h1>
        <p className="text-lg text-foreground-muted">Artists perform. You curate the music.</p>

      </header>

      <main>
        <div className="relative w-full h-[450px]">
          {/* Photo by <a href="https://unsplash.com/@atelierbyvineeth?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">atelierbyvineeth ...</a> on <a href="https://unsplash.com/photos/man-playing-guitar-on-the-street-fR9oVrI74Bg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a> */}
          <Image src="/images/busking_800w.webp" alt="Guitarist giving a spirited street performance" width="300" height="450" className="absolute" />
          <div className="absolute inset-0 bg-gradient-to-l to-accent via-background from-background opacity-60 w-dvw h-full"></div>
          <p className="absolute top-0 left-0">Hello</p>
        </div>
      </main>

      <p className="text-lg">Make a passing moment something more.</p>
      <p>Easily share your set with an auto-generated QR Code.</p>
      <p>Create a set of songs that people can choose from</p>
      <p>Create a virtual tip jar</p>
      <p>Made by musicians for musicians.</p>

      <section>
        <div className="w-[min(80dvw,600px)]">
          <RequestMenu set={set} songs={songs} mock={true} />
        </div>
      </section>

      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Root;
