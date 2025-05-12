"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ParticleImage } from "../components/particle-image";
import { X } from "lucide-react";
import { TypingText } from "../components/TypingText";

// 画像データの配列（プレースホルダー画像を使用）
const images = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  src: `/gallery/image${i + 1}.jpg`,
  title: `記憶 ${i + 1}`,
}));

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<null | (typeof images)[0]>(null);

  return (
    <main className="w-full min-h-screen bg-[#eeeeee] text-black font-light relative overflow-x-hidden">
      <div className="w-full flex justify-end pr-6 pt-6 text-xl text-gray-700">35.6762° N, 139.6503° E</div>
      <div className="w-full flex justify-end pr-6 pt-6 text-xl text-gray-700">Tokyo, Japan</div>

      {/* ヘッダー - 左上に配置 */}
      <header className="pt-16 pl-2 md:pl-16 pb-24 md:w-2/3">
        <div className="font-hina md:text-9xl mb-12 text-4xl">記憶、音、光</div>

        <div className="font-hina text-2xl mb-8">
          I mainly create works that visualize the memory of sound. The sounds that once existed in a place - human voices, footsteps, echoes of wind and waves - are expressed as particle light,
          quietly depicting the signs and traces left behind in a space. The theme of my work is &quot;landscape formed by memory&quot;.
        </div>

        <TypingText
          textArray={[
            "主に音の記憶を可視化する作品を制作しています。",
            "—かつてその場に存在した音— 人の声、足音、風や波の響きを、粒子状の光として表現し、",
            "空間に残された気配や痕跡を静かに描き出します。",
            "「記憶によって形成される風景」をテーマに活動を展開しています。",
          ]}
          className="text-xl leading-relaxed font-hina"
        />
      </header>

      {/* ギャラリーセクション */}
      <section className="w-full pb-32 space-y-16">
        {images.map((image, index) => {
          // 位置パターン（左・右・中央寄せ）
          const positionStyle =
            index % 4 === 0
              ? "ml-0 mr-auto" // 左寄せ
              : index % 4 === 1
              ? "ml-auto mr-0" // 右寄せ
              : index % 4 === 2
              ? "mx-auto" // 中央寄せ上寄り
              : "mx-auto mt-8"; // 中央寄せ下寄り（変化を出す）

          // サイズバリエーション（画面に対して大きく）
          const sizeStyle = index % 3 === 0 ? "max-w-[90vw] w-[50vw] h-[36vw]" : index % 3 === 1 ? "max-w-[90vw] w-[44vw] h-[30vw]" : "max-w-[90vw] w-[60vw] h-[40vw]";

          return (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative ${positionStyle} ${sizeStyle} cursor-pointer`}
              onClick={() => setSelectedImage(image)}
            >
              <Image src={image.src} alt={image.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" width={800} height={600} />
            </motion.div>
          );
        })}
      </section>

      {/* 画像モーダル */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#eeeeee] bg-opacity-95 z-50 flex items-center justify-center p-8"
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
