"use client";
import Image from "next/image";

// 画像データの配列
const images = Array.from({ length: 20 }, (_, i) => `/gallery/image${i + 1}.jpg`);

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <header className="py-20 px-4 text-center">
        <h1 className="text-4xl font-light mb-6">記憶によって形成される風景</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
          かつてその場に存在した音—人の声、足音、風や波の響き—を、粒子状の光として表現し、 空間に残された気配や痕跡を静かに描き出します。
        </p>
      </header>

      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((src, index) => (
            <div key={index} className="relative overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image src={src} alt={`記憶 ${index + 1}`} width={1024} height={1024} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
