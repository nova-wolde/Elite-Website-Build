import { motion } from "framer-motion";
import beansImg from "@/assets/beans.png";
import steamImg from "@/assets/steam.png";
import macchiatoImg from "@/assets/macchiato.png";
import heroImg from "@/assets/hero.png";
import gatheredImg from "@/assets/gathered.png";

const steps = [
  {
    num: "01",
    title: "Harvest",
    desc: "Coffee cherries, handpicked at peak ripeness in the highlands of Ethiopia.",
    img: beansImg,
  },
  {
    num: "02",
    title: "The Roasting",
    desc: "Fresh green beans are pan-roasted over open flame. The ceremony begins.",
    img: steamImg,
  },
  {
    num: "03",
    title: "The Grinding",
    desc: "Roasted beans are ground by hand, releasing fragrant oils into the air.",
    img: macchiatoImg,
  },
  {
    num: "04",
    title: "The Ceremony",
    desc: "Boiled in a clay jebena, coffee fills the room with warmth and ancient ritual.",
    img: heroImg,
  },
  {
    num: "05",
    title: "The Gathering",
    desc: "Shared in three rounds — Abol, Tona, Baraka — each deeper than the last.",
    img: gatheredImg,
  },
];

export default function CoffeeRitual() {
  return (
    <section className="bg-[#0A0A0A] text-white py-32 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="font-sans text-xs tracking-widest uppercase text-muted-foreground mb-4">The Ceremony</p>
          <h2 className="text-6xl md:text-8xl font-serif">The Ritual</h2>
          <div className="w-24 h-px bg-secondary mx-auto mt-12" />
        </motion.div>

        <div className="flex flex-col gap-24 md:gap-32 mt-24">
          {steps.map((step, i) => {
            const isEven = i % 2 !== 0;
            return (
              <div
                key={i}
                className={`flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24`}
              >
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full md:w-[45%] aspect-[4/3] relative overflow-hidden group"
                >
                  <motion.img
                    src={step.img}
                    alt={step.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:bg-transparent" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="flex-1"
                >
                  <p className="font-sans text-xs tracking-widest text-primary mb-4">{step.num}</p>
                  <h3 className="font-serif text-3xl md:text-5xl mb-6">{step.title}</h3>
                  <p className="font-sans font-light text-white/70 text-lg leading-relaxed max-w-md">
                    {step.desc}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}