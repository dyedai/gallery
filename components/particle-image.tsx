"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ParticleImageProps {
  src: string;
  alt: string;
}

export function ParticleImage({ src, alt }: ParticleImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showRealImage, setShowRealImage] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const particlesRef = useRef<Array<Particle>>([]);
  const requestRef = useRef<number>(0);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const animationCompleteTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const centerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // パーティクルクラス
  class Particle {
    x: number;
    y: number;
    originX: number;
    originY: number;
    color: string;
    size: number;
    speed: number;
    angle: number;
    progress: number;
    settled: boolean;

    constructor(originX: number, originY: number, color: string, size: number, centerX: number, centerY: number) {
      // 中心座標を保存
      this.originX = originX;
      this.originY = originY;

      // 初期位置を中心に設定
      this.x = centerX;
      this.y = centerY;

      this.color = color;
      this.size = size;

      // 中心から目的地への角度を計算
      this.angle = Math.atan2(originY - centerY, originX - centerX);

      // ランダムな速度
      this.speed = 0.01 + Math.random() * 0.02;

      // アニメーションの進行度（0〜1）
      this.progress = 0;

      this.settled = false;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }

    update(ctx: CanvasRenderingContext2D) {
      if (this.settled) return true;

      // 進行度を更新
      this.progress += this.speed;

      if (this.progress >= 1) {
        // 目的地に到達
        this.x = this.originX;
        this.y = this.originY;
        this.settled = true;
      } else {
        // イージング関数（ease-out）を適用して滑らかに減速
        const easeOutProgress = 1 - Math.pow(1 - this.progress, 3);

        // 中心から目的地への距離を計算
        const distX = this.originX - centerRef.current.x;
        const distY = this.originY - centerRef.current.y;

        // 現在位置を更新（中心から目的地へ）
        this.x = centerRef.current.x + distX * easeOutProgress;
        this.y = centerRef.current.y + distY * easeOutProgress;
      }

      this.draw(ctx);
      return this.settled;
    }
  }

  useEffect(() => {
    // 画像の読み込み
    const image = document.createElement("img");
    image.crossOrigin = "anonymous";
    image.src = src;
    imageRef.current = image;

    image.onload = () => {
      if (!canvasRef.current) return;

      // キャンバスのサイズを設定
      const maxWidth = Math.min(window.innerWidth * 0.8, 800);
      const scale = maxWidth / image.width;
      const width = image.width * scale;
      const height = image.height * scale;

      setDimensions({ width, height });
      canvasRef.current.width = width;
      canvasRef.current.height = height;

      // 中心座標を設定
      const centerX = width / 2;
      const centerY = height / 2;
      centerRef.current = { x: centerX, y: centerY };

      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;

      // 一時的なキャンバスを作成して画像データを取得
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = width;
      tempCanvas.height = height;
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return;

      tempCtx.drawImage(image, 0, 0, width, height);
      const imageData = tempCtx.getImageData(0, 0, width, height);
      const pixels = imageData.data;

      // パーティクルの作成（ピクセルをスキップして処理を軽くする）
      particlesRef.current = [];
      const gap = 8; // ピクセル間隔

      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const index = (y * width + x) * 4;
          const r = pixels[index];
          const g = pixels[index + 1];
          const b = pixels[index + 2];
          const a = pixels[index + 3];

          // 透明でないピクセルのみパーティクルを作成
          if (a > 128) {
            const color = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
            const size = Math.random() * 1.5 + 0.5;
            particlesRef.current.push(new Particle(x, y, color, size, centerX, centerY));
          }
        }
      }

      setIsLoaded(true);

      // 一定時間後に実際の画像を表示するタイマーを設定
      animationCompleteTimeoutRef.current = setTimeout(() => {
        setShowRealImage(true);
      }, 4000); // 4秒後に画像を表示
    };

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      if (animationCompleteTimeoutRef.current) {
        clearTimeout(animationCompleteTimeoutRef.current);
      }
    };
  }, [src]);

  useEffect(() => {
    if (!isLoaded || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    // アニメーションループ
    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // パーティクルの更新と定着状態の確認
      let settledCount = 0;
      particlesRef.current.forEach((particle) => {
        const isSettled = particle.update(ctx);
        if (isSettled) settledCount++;
      });

      // 大部分のパーティクルが定着したら実際の画像を表示
      const settledPercentage = settledCount / particlesRef.current.length;
      if (settledPercentage > 0.95 && !showRealImage) {
        setShowRealImage(true);
        if (animationCompleteTimeoutRef.current) {
          clearTimeout(animationCompleteTimeoutRef.current);
          animationCompleteTimeoutRef.current = null;
        }
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isLoaded, dimensions, showRealImage]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="relative w-full flex justify-center items-center">
      {/* パーティクルアニメーション用キャンバス */}
      <AnimatePresence>
        {!showRealImage && (
          <motion.canvas
            ref={canvasRef}
            width={dimensions.width}
            height={dimensions.height}
            className="mx-auto"
            style={{ position: "absolute", zIndex: 10 }}
            aria-label={alt}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>

      {/* 実際の画像 */}
      <AnimatePresence>
        {showRealImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="mx-auto"
            style={{
              width: dimensions.width,
              height: dimensions.height,
              position: "relative",
            }}
          >
            <Image src={src || "/placeholder.svg"} alt={alt} width={dimensions.width} height={dimensions.height} className="mx-auto" style={{ objectFit: "contain" }} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
