import Image from 'next/image';

import { CustomLink } from '../components/CustomLink';
import { Footer } from '../components/Footer';
import { QRCode } from '../components/QRCode';
import { RequestMenu } from '../components/RequestMenu';
import { TopNav } from '../components/TopNav';

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
    title: 'When The Saints Go Marching In',
    description: 'Sing-along favorite',
    genre: 'Traditional',
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
      <header>
        <TopNav authenticated={false} border={false} />
      </header>

      <main>
        <section className="relative w-full aspect-40/16">
          <div className="absolute py-40 px-40 z-10">
            <div>
              <div>
                <p className="text-6xl text-foreground mb-20 w-[min(80dvw,600px)]">Turn your listeners into participants.</p>
                <p className="text-xl text-foreground-muted max-w-380 mb-20">Your music makes them <strong>stop to listen</strong>. We give them another <strong>reason to stay</strong>.</p>
              </div>

              <div className="flex gap-10">
                <CustomLink href="/about" className="bg-transparent text-sm text-foreground-muted border-1 border-foreground-muted p-8 rounded-md">LEARN MORE</CustomLink>
                <CustomLink href="/signup" className="bg-accent text-sm text-background p-8 rounded-md border-1 border-accent">GET STARTED</CustomLink>
              </div>
            </div>
          </div>
          <Image src="/images/busking_ensemble_1600w.webp" alt="Trumpeter and pianist giving an engaging street performance" width="1200" height="600" className="absolute right-0 top-0 w-4/5" />
          <div className="absolute right-0 top-0 bg-gradient-to-r from-background/100 to-accent/50 via-background/90 via-30% h-full pointer-events-none w-4/5"></div>
        </section>

        {/* <section className="relative w-full h-[450px]">
          <div className="absolute w-[300px] h-[450px] right-0 top-0">
            <Image src="/images/busking_800w.webp" alt="Guitarist giving a spirited street performance" width="300" height="450" className="absolute" />
            <div className="absolute inset-0 bg-gradient-to-r from-background to-accent  opacity-60 w-full h-full"></div>
          </div>
        </section> */}

        <section className="py-80 px-40 flex flex-wrap gap-40">
          <div>
            <RequestMenu set={set} songs={songs} mock={true} />
          </div>

          <div>
            <p className="text-2xl">Create a set of songs your audience can choose from.</p>
            <p className="text-xl text-foreground-muted">Set a suggested tip for each request.</p>
          </div>
        </section>

        <section className="pb-80 px-40">
          <div className="flex gap-40 flex-wrap">
            <QRCode className="bg-graygreen rounded-md" uri="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMSAzMSIgc2hhcGUtcmVuZGVyaW5nPSJjcmlzcEVkZ2VzIj48cGF0aCBzdHJva2U9IiMwMDAwMDAiIGQ9Ik0xIDEuNWg3bTYgMGgxbTEgMGgxbTIgMGgzbTEgMGg3TTEgMi41aDFtNSAwaDFtNiAwaDRtMyAwaDFtMSAwaDFtNSAwaDFNMSAzLjVoMW0xIDBoM20xIDBoMW0xIDBoM20yIDBoMW0xIDBoMm0yIDBoMm0xIDBoMW0xIDBoM20xIDBoMU0xIDQuNWgxbTEgMGgzbTEgMGgxbTEgMGgybTEgMGgxbTIgMGg1bTEgMGgxbTEgMGgxbTEgMGgzbTEgMGgxTTEgNS41aDFtMSAwaDNtMSAwaDFtMSAwaDJtNyAwaDNtMiAwaDFtMSAwaDNtMSAwaDFNMSA2LjVoMW01IDBoMW0xIDBoMW0yIDBoMm0yIDBoMW00IDBoMW0xIDBoMW01IDBoMU0xIDcuNWg3bTEgMGgxbTEgMGgxbTEgMGgxbTEgMGgxbTEgMGgxbTEgMGgxbTEgMGgxbTEgMGg3TTkgOC41aDFtMSAwaDFtMSAwaDFtMSAwaDFtMSAwaDFtMiAwaDFNMSA5LjVoMW0xIDBoNW0zIDBoMW0xIDBoMW0yIDBoMW0xIDBoMm0xIDBoMW0xIDBoNU0xIDEwLjVoMW0xIDBoMW0xIDBoMW0yIDBoMm0yIDBoNG0xIDBoMW0yIDBoMW0xIDBoNG0yIDBoMk0xIDExLjVoM20xIDBoMW0xIDBoMm0yIDBoMW0yIDBoM20xIDBoMm02IDBoMk00IDEyLjVoM20yIDBoMW0zIDBoMm0xIDBoMW0yIDBoMW0yIDBoNW0yIDBoMU0yIDEzLjVoMW0zIDBoMm0xIDBoMW0xIDBoMm0yIDBoMW0xIDBoMm0xIDBoM20xIDBoMW0yIDBoMk0yIDE0LjVoMW0zIDBoMW0yIDBoMW0xIDBoMW03IDBoMm0xIDBoMm0xIDBoMm0xIDBoMk0xIDE1LjVoM20yIDBoMm0yIDBoMm00IDBoMW0xIDBoMm0xIDBoMW0xIDBoMU0zIDE2LjVoMW0xIDBoMW0zIDBoMW0xIDBoM20xIDBoMW01IDBoMW0zIDBoMW0yIDBoMU0yIDE3LjVoMm0xIDBoM20xIDBoMW0xIDBoMW00IDBoNW0xIDBoMW0zIDBoMk0xIDE4LjVoMm0xIDBoMW0xIDBoMW0yIDBoMW0zIDBoM200IDBoMW0yIDBoNG0yIDBoMU0xIDE5LjVoMW0xIDBoMW0xIDBoMW0xIDBoM20xIDBoNm0xIDBoMW01IDBoM20xIDBoMU0xIDIwLjVoMW0yIDBoM20xIDBoM20zIDBoMW00IDBoMW0yIDBoMW0yIDBoMm0xIDBoMk0xIDIxLjVoMW0xIDBoMW0zIDBoM20xIDBoMm0yIDBoNG0xIDBoNm0xIDBoMU05IDIyLjVoMW0zIDBoMW01IDBoM20zIDBoMm0yIDBoMU0xIDIzLjVoN20yIDBoMm0xIDBoMW0yIDBoNm0xIDBoMW0xIDBoMm0xIDBoMU0xIDI0LjVoMW01IDBoMW0xIDBoMm0xIDBoMW0yIDBoM20zIDBoMW0zIDBoMW0yIDBoMU0xIDI1LjVoMW0xIDBoM20xIDBoMW0xIDBoM200IDBoNG0xIDBoN00xIDI2LjVoMW0xIDBoM20xIDBoMW0xIDBoMm00IDBoMW00IDBoM20xIDBoMW0xIDBoMW0xIDBoMk0xIDI3LjVoMW0xIDBoM20xIDBoMW0xIDBoMW0xIDBoMW0xIDBoMW0xIDBoMm0xIDBoMW00IDBoMW0xIDBoMW0xIDBoMk0xIDI4LjVoMW01IDBoMW0zIDBoNG0yIDBoMW0zIDBoNW0yIDBoMU0xIDI5LjVoN20xIDBoMW0xIDBoMW00IDBoMW0xIDBoMW0xIDBoMW0xIDBoMW0xIDBoMW0yIDBoMSIvPjwvc3ZnPgo=" />
            <div>
              <p className="text-2xl">Share your set via an auto-generated QR Code.</p>
              <p className="text-lg text-foreground-muted">Display it while busking, gigging, or livestreaming.</p>
            </div>
          </div>
        </section>

        {/* <section className="py-20 px-40">
          <div>
            <p className="text-lg text-foreground-muted">Perfect for busking, gigging, and livestreams.</p>
            <p className="text-lg text-foreground-muted">Made by musicians for musicians.</p>
          </div>
        </section> */}
      </main>

      <footer>
        <Footer />
      </footer>
    </div >
  )
}

export default Root;
