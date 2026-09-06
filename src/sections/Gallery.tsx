import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import type { SiteContent, Photo } from "../data/types";
import { Lightbox } from "../components/Lightbox";
import { PolaroidStack } from "../components/PolaroidStack";

function TiltPhoto({ photo, index, onClick }: { photo: Photo; index: number; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onMouseLeave = () => { x.set(0); y.set(0); };

  const aspect = photo.orientation === "portrait" ? "aspect-[3/4]" : photo.orientation === "square" ? "aspect-square" : "aspect-[4/3]";
  const glows = ["rgba(244,184,193,0.5)", "rgba(245,196,160,0.5)", "rgba(184,169,212,0.5)", "rgba(168,197,160,0.5)", "rgba(160,196,232,0.5)"];

  return (
    <motion.div
      ref={ref}
      className="cursor-zoom-in relative group"
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: "900px" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: (index % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.03, zIndex: 10 }}
    >
      {/* Colored glow on hover */}
      <motion.div
        className="absolute -inset-2 rounded-xl opacity-0 blur-lg pointer-events-none"
        style={{ background: glows[index % glows.length] }}
        whileHover={{ opacity: 0.7 }}
        transition={{ duration: 0.3 }}
        aria-hidden="true"
      />
      <div className="relative overflow-hidden rounded-lg bg-cream-2">
        {!failed ? (
          <>
            {!loaded && <div className={`${aspect} bg-cream-2 animate-pulse`} />}
            <img
              src={photo.src} alt={photo.alt} loading="lazy"
              onError={() => setFailed(true)} onLoad={() => setLoaded(true)}
              className={`block w-full ${aspect} object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0 absolute inset-0"}`}
            />
          </>
        ) : (
          <div className={`${aspect} flex flex-col items-center justify-center gap-2 px-4 text-center bg-cream-2`}>
            <p className="font-body text-xs text-ink-3">photo placeholder</p>
            <code className="text-[9px] text-ink-3/60 break-all">{photo.src}</code>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function Gallery({ content }: { content: SiteContent["theArchive"] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div
      className="min-h-screen px-8 md:px-16 py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #FBF8F3 0%, #FDF8EC 50%, #FDF6EF 100%)" }}
    >
      {/* Soft gold ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 70% 30%, rgba(212,165,74,0.07) 0%, transparent 60%)" }}
        aria-hidden="true"
      />

      <div className="max-w-wide mx-auto">
        {/* Header row with polaroid stack */}
        <div className="flex items-start justify-between gap-8 mb-14">
          <div className="flex-1">
            <motion.p
              className="font-body text-[10px] tracking-[0.4em] uppercase mb-6"
              style={{ color: "#D4A54A" }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {content.label}
            </motion.p>
            <motion.h2
              className="font-display text-display-md text-ink text-balance leading-tight mb-4"
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              {content.heading}
            </motion.h2>
            {content.intro && (
              <motion.p
                className="font-body text-ink-3 text-sm max-w-measure"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.14 }}
              >
                {content.intro}
              </motion.p>
            )}
          </div>

          {/* Polaroid stack easter egg */}
          <motion.div
            className="flex-shrink-0 hidden md:block"
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <PolaroidStack />
          </motion.div>
        </div>

        {/* Masonry photo grid */}
        <div className="columns-2 md:columns-3 gap-4 [&>*]:mb-4 [&>*]:break-inside-avoid">
          {content.photos.map((photo, i) => (
            <TiltPhoto
              key={i}
              photo={photo}
              index={i}
              onClick={() => setLightboxIndex(i)}
            />
          ))}
        </div>

        <motion.p
          className="mt-10 text-center font-body text-[10px] tracking-[0.2em] uppercase text-ink-3/40"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          hover to tilt · tap to open
        </motion.p>
      </div>

      <Lightbox
        photos={content.photos}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}
