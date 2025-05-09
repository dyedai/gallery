import Head from "next/head";

const images = Array.from({ length: 20 }, (_, i) => `/gallery/image${i + 1}.jpg`);

export default function Home() {
  return (
    <>
      <Head>
        <title>記憶によって形成される風景</title>
        <meta name="description" content="音の記憶を可視化したギャラリー" />
      </Head>

      <main className="min-h-screen px-4 md:px-12 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-light mb-4">記憶によって形成される風景</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">かつてその場に存在した音—人の声、足音、風や波の響き—を、粒子状の光として表現し、空間に残された気配や痕跡を静かに描き出します。</p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((src, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <img src={src} alt={`Memory ${index + 1}`} className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
