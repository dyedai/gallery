"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ParticleImage } from "../components/particle-image";
import { X } from "lucide-react";
import { AnimatedHeadline } from "../components/AnimatedHeadline";

// 画像データの配列（プレースホルダー画像を使用）
const images = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  src: `/gallery/image${i + 1}.jpg`,
  title: `記憶 ${i + 1}`,
}));

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<null | (typeof images)[0]>(null);

  return (
    <main className="w-full min-h-screen bg-white text-black font-light relative">
      <div className="w-full flex justify-end pr-6 pt-6 text-xl text-gray-400 font-mono">35.6762° N, 139.6503° E</div>
      <div className="w-full flex justify-end pr-6 pt-6 text-xl text-gray-400 font-mono">Tokyo, Japan</div>

      {/* ヘッダー - 左上に配置 */}
      <header className="pt-16 pl-16 pb-24 md:w-2/3">
        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="text-5xl md:text-6xl font-dela mb-12 tracking-tight">
          記憶によって形成される風景
        </motion.h1>
        {/* <AnimatedHeadline text="記憶によって形成される風景" className="text-5xl md:text-6xl font-dela mb-12" /> */}

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="text-lg text-gray-700 leading-relaxed max-w-xl">
          主に音の記憶を可視化する作品を制作しています。 かつてその場に存在した音—人の声、足音、風や波の響き—を、粒子状の光として表現し、 空間に残された気配や痕跡を静かに描き出します。
        </motion.p>
      </header>

      {/* ギャラリーセクション */}
      <section className="max-w-7xl mx-auto px-16 pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {images.map((image) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: image.id * 0.1 }}
              className="relative overflow-hidden group"
              onClick={() => setSelectedImage(image)}
            >
              <div className="aspect-square relative cursor-pointer">
                <Image src={image.src} alt={image.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 画像モーダル */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white bg-opacity-95 z-50 flex items-center justify-center p-8"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-8 right-8 text-black" onClick={() => setSelectedImage(null)}>
              <X size={24} />
            </button>

            <div className="max-w-4xl relative" onClick={(e) => e.stopPropagation()}>
              <ParticleImage src={selectedImage.src} alt={selectedImage.title} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
