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
          <Image src="/images/busking_800w.webp" alt="Guitarist giving a spirited street performance" width="300" height="450" className="absolute right-0 top-0" />
          <div className="absolute inset-0 bg-gradient-to-r to-background via-accent from-accent opacity-60 w-dvw h-full"></div>
          <p className="absolute top-0 left-0">Hello</p>
        </div>

        <section className="py-20">
          <p className="text-lg">Make a passing moment something more.</p>
          <p>Create a virtual tip jar</p>
          <p>Made by musicians for musicians.</p>
        </section>

        <section className="py-20">
          <p>Create a set of songs your audience can choose from.</p>
          <p>Easily share your set with an auto-generated QR Code.</p>
          <QRCode uri="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAATcSURBVO3BQY4kRxIEQdNA/f/Lun30CwNIpFdzOGsi+CNVS06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYtOqhadVC06qVp0UrXopGrRSdWik6pFn7wE5Dep+SYgk5oJyKTmBsgTaiYgv0nNGydVi06qFp1ULfpkmZpNQP5NQG6ATGomNTdAnlCzCcimk6pFJ1WLTqoWffJlQJ5Q8wSQJ9Q8oWYC8gaQTUCeUPNNJ1WLTqoWnVQt+uQvp2YCMqmZ1ExAngByo2YC8jc5qVp0UrXopGrRJ/9n1Dyh5gkgN0AmNX+Tk6pFJ1WLTqoWffJlan6TmhsgN2pugExqJjVPAJnUPKHmT3JSteikatFJ1aJPlgH5kwCZ1ExAboBMaiYgk5oJyKTmDSB/spOqRSdVi06qFn3ykpr6Z2omIJOaGzX/JSdVi06qFp1ULfrkJSCTmgnIJjWTmm9SMwGZ1ExAbtRMQCY1E5BNar7ppGrRSdWik6pFn/wyNROQSc0NkBs1k5oJyA2QGzUTkEnNDZBJzQTkDTU3QG7UvHFSteikatFJ1aJPlgHZBORGzQ2QSc0NkBsgk5oJyI2aGzVvALlR800nVYtOqhadVC3CH/lFQJ5QcwNkUvMEkBs1E5BJzQ2QSc0NkE1qboBMat44qVp0UrXopGrRJ8uATGomNTdAJiCTmieA3Ki5ATKpmYDcqJmAPKFmAjKpuQFyo2bTSdWik6pFJ1WLPvnDqdmk5gk1N2pugNyomYBMQCY1E5AbNROQCcik5o2TqkUnVYtOqhbhj7wA5Ak1N0Bu1NwAuVHzBpBJzQTkRs0EZFIzAZnU/MlOqhadVC06qVr0yUtqboDcAJnUPAFkUjMBmYDcqJmATGpu1GxScwNkUnMDZFKz6aRq0UnVopOqRZ8sA/IGkBs1b6h5Qs0EZJOaCcik5kbNBORGzTedVC06qVp0UrXok5eA3KiZgExqJiCTmjfU3AB5Qs0bQG7UTEDeUHMDZFLzxknVopOqRSdViz5ZpmYCMqmZgExqJiBvANkEZFIzAZnUTGqeUDMBeQPIpGbTSdWik6pFJ1WL8EdeADKpuQHyhJoJyBNqngAyqXkDyKTmBsik5gbIjZoJyI2aN06qFp1ULTqpWvTJlwGZ1DwB5Ak1E5AbNZOaCcgbaiYgTwB5Qs0EZFLzTSdVi06qFp1ULcIf+Q8DMql5AsikZhOQJ9Q8AeRGzQ2QSc0bJ1WLTqoWnVQt+uQlIL9JzaRmAnKj5g0gvwnIpOYNIJOaTSdVi06qFp1ULfpkmZpNQG6A3KiZgExqboA8oeYJIDdqnlDzbzqpWnRSteikatEnXwbkCTWbgExqnlAzAbkBcqPmBsgbQG7UfNNJ1aKTqkUnVYs++cupeQPIpOYNIE+omYBMaiYgk5oJyI2aN06qFp1ULTqpWvTJX0bNBGRSMwGZ1NwAmdRMQCY1k5ongExqJiCTmgnIjZpNJ1WLTqoWnVQt+uTL1HyTmieA3ACZ1NwAmdQ8AeQJIE+omYB800nVopOqRSdViz5ZBuQ3AZnU3Kh5A8ikZgIyqZmATGomIJOaCcik5gbIpOabTqoWnVQtOqlahD9SteSkatFJ1aKTqkUnVYtOqhadVC06qVp0UrXopGrRSdWik6pFJ1WLTqoWnVQtOqla9D+zAkQ06EnGLwAAAABJRU5ErkJggg==" />
        </section>

        <section className="py-20">
          <p>Set a price for each song.</p>
          <div className="w-[min(80dvw,600px)]">
            <RequestMenu set={set} songs={songs} mock={true} />
          </div>
        </section>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Root;
