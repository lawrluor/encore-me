import Image from 'next/image';

import { Footer } from '../components/Footer';
import { QRCode } from '../components/QRCode';
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
  {
    id: 'song_demo_03',
    title: 'Take Me Home, Country Roads',
    description: 'Sing-along favorite',
    genre: 'Country',
    tempo: 'Mid',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'song_demo_04',
    title: 'Hey Ya!',
    description: 'Upbeat acoustic cover',
    genre: 'Pop',
    tempo: 'Fast',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'song_demo_05',
    title: 'Hallelujah',
    description: 'Crowd-requested ballad',
    genre: 'Folk',
    tempo: 'Slow',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const Root = async () => {
  return (
    <div className="w-dvw h-dvh">
      <header className="flex flex-col items-center p-20">
      </header>

      <main>
        <section className="relative w-full h-[450px]">
          <div className="py-40 px-40">
            <p className="text-6xl text-foreground mb-20">Turn your listeners into participants</p>
            <p className="text-xl text-foreground-muted max-w-380">Your music makes them <strong>stop to listen</strong>. We give them another <strong>reason to stay</strong>.
            </p>
          </div>
          <Image src="/images/busking_800w.webp" alt="Guitarist giving a spirited street performance" width="300" height="450" className="absolute right-0 top-0" />
          <div className="absolute inset-0 bg-gradient-to-r from-background to-accent via-background opacity-40 w-dvw h-full"></div>
        </section>

        {/* <section className="relative w-full h-[450px]">
          <div className="absolute w-[300px] h-[450px] right-0 top-0">
            <Image src="/images/busking_800w.webp" alt="Guitarist giving a spirited street performance" width="300" height="450" className="absolute" />
            <div className="absolute inset-0 bg-gradient-to-r from-background to-accent  opacity-60 w-full h-full"></div>
          </div>
        </section> */}

        <section className="py-40 px-40 flex flex-wrap gap-10">
          <div className="flex flex-1 rounded-md gap-20">
            {/* <div className="py-20 bg-graygreen rounded-t-md"></div> */}
            <div className="mb-40">
              <QRCode className="bg-graygreen" uri="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMSAzMSIgc2hhcGUtcmVuZGVyaW5nPSJjcmlzcEVkZ2VzIj48cGF0aCBzdHJva2U9IiMwMDAwMDAiIGQ9Ik0xIDEuNWg3bTYgMGgxbTEgMGgxbTIgMGgzbTEgMGg3TTEgMi41aDFtNSAwaDFtNiAwaDRtMyAwaDFtMSAwaDFtNSAwaDFNMSAzLjVoMW0xIDBoM20xIDBoMW0xIDBoM20yIDBoMW0xIDBoMm0yIDBoMm0xIDBoMW0xIDBoM20xIDBoMU0xIDQuNWgxbTEgMGgzbTEgMGgxbTEgMGgybTEgMGgxbTIgMGg1bTEgMGgxbTEgMGgxbTEgMGgzbTEgMGgxTTEgNS41aDFtMSAwaDNtMSAwaDFtMSAwaDJtNyAwaDNtMiAwaDFtMSAwaDNtMSAwaDFNMSA2LjVoMW01IDBoMW0xIDBoMW0yIDBoMm0yIDBoMW00IDBoMW0xIDBoMW01IDBoMU0xIDcuNWg3bTEgMGgxbTEgMGgxbTEgMGgxbTEgMGgxbTEgMGgxbTEgMGgxbTEgMGgxbTEgMGg3TTkgOC41aDFtMSAwaDFtMSAwaDFtMSAwaDFtMSAwaDFtMiAwaDFNMSA5LjVoMW0xIDBoNW0zIDBoMW0xIDBoMW0yIDBoMW0xIDBoMm0xIDBoMW0xIDBoNU0xIDEwLjVoMW0xIDBoMW0xIDBoMW0yIDBoMm0yIDBoNG0xIDBoMW0yIDBoMW0xIDBoNG0yIDBoMk0xIDExLjVoM20xIDBoMW0xIDBoMm0yIDBoMW0yIDBoM20xIDBoMm02IDBoMk00IDEyLjVoM20yIDBoMW0zIDBoMm0xIDBoMW0yIDBoMW0yIDBoNW0yIDBoMU0yIDEzLjVoMW0zIDBoMm0xIDBoMW0xIDBoMm0yIDBoMW0xIDBoMm0xIDBoM20xIDBoMW0yIDBoMk0yIDE0LjVoMW0zIDBoMW0yIDBoMW0xIDBoMW03IDBoMm0xIDBoMm0xIDBoMm0xIDBoMk0xIDE1LjVoM20yIDBoMm0yIDBoMm00IDBoMW0xIDBoMm0xIDBoMW0xIDBoMU0zIDE2LjVoMW0xIDBoMW0zIDBoMW0xIDBoM20xIDBoMW01IDBoMW0zIDBoMW0yIDBoMU0yIDE3LjVoMm0xIDBoM20xIDBoMW0xIDBoMW00IDBoNW0xIDBoMW0zIDBoMk0xIDE4LjVoMm0xIDBoMW0xIDBoMW0yIDBoMW0zIDBoM200IDBoMW0yIDBoNG0yIDBoMU0xIDE5LjVoMW0xIDBoMW0xIDBoMW0xIDBoM20xIDBoNm0xIDBoMW01IDBoM20xIDBoMU0xIDIwLjVoMW0yIDBoM20xIDBoM20zIDBoMW00IDBoMW0yIDBoMW0yIDBoMm0xIDBoMk0xIDIxLjVoMW0xIDBoMW0zIDBoM20xIDBoMm0yIDBoNG0xIDBoNm0xIDBoMU05IDIyLjVoMW0zIDBoMW01IDBoM20zIDBoMm0yIDBoMU0xIDIzLjVoN20yIDBoMm0xIDBoMW0yIDBoNm0xIDBoMW0xIDBoMm0xIDBoMU0xIDI0LjVoMW01IDBoMW0xIDBoMm0xIDBoMW0yIDBoM20zIDBoMW0zIDBoMW0yIDBoMU0xIDI1LjVoMW0xIDBoM20xIDBoMW0xIDBoM200IDBoNG0xIDBoN00xIDI2LjVoMW0xIDBoM20xIDBoMW0xIDBoMm00IDBoMW00IDBoM20xIDBoMW0xIDBoMW0xIDBoMk0xIDI3LjVoMW0xIDBoM20xIDBoMW0xIDBoMW0xIDBoMW0xIDBoMW0xIDBoMm0xIDBoMW00IDBoMW0xIDBoMW0xIDBoMk0xIDI4LjVoMW01IDBoMW0zIDBoNG0yIDBoMW0zIDBoNW0yIDBoMU0xIDI5LjVoN20xIDBoMW0xIDBoMW00IDBoMW0xIDBoMW0xIDBoMW0xIDBoMW0xIDBoMW0yIDBoMSIvPjwvc3ZnPgo=" />
            </div>

            <div>
              <p className="text-xl">Create a set of songs your audience can choose from.</p>
              <p className="text-xl">Share it instantly via an auto-generated QR Code.</p>
            </div>
          </div>

          <div>
            <div className="flex-1">
              <RequestMenu set={set} songs={songs} mock={true} />
            </div>
            <p>Set a suggested tip for each song.</p>
          </div>
        </section>

        <section className="py-20 px-40">
          <p className="text-lg text-foreground-muted">Perfect for busking, gigging, and livestreams</p>
          <p className="text-lg text-foreground-muted">Made by musicians for musicians.</p>
        </section>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Root;
