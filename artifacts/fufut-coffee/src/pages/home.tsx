import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Instagram, ChevronRight, Menu, X, Sun, Moon, Users, Calendar, Clock, MessageSquare } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { SiWhatsapp } from "react-icons/si";

import heroImg from "@/assets/hero.png";
import macchiatoImg from "@/assets/macchiato.png";
import foodImg from "@/assets/food.png";
import interiorImg from "@/assets/interior.png";
import steamImg from "@/assets/steam.png";
import gatheredImg from "@/assets/gathered.png";
import beansImg from "@/assets/beans.png";
import menuRefImg from "@assets/image_1779953907653.png";

import menuBreakfastImg from "@/assets/menu-breakfast.png";
import menuTibsImg from "@/assets/menu-tibs.png";
import menuSnacksImg from "@/assets/menu-snacks.png";
import menuDrinksImg from "@/assets/menu-drinks.png";
import menuBeveragesImg from "@/assets/menu-beverages.png";
import menuGebetaImg from "@/assets/menu-gebeta.png";
import menuChiqinaImg from "@/assets/menu-chiqina.png";
import menuMacchiatoImg from "@/assets/menu-macchiato.png";

const WHATSAPP_NUMBER = "251931190440";

const FADE_UP = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const STAGGER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const menuData = {
  "Breakfast & Lunch": [
    { name: "Chechebsa", price: "160" },
    { name: "Special Chechebsa", price: "190" },
    { name: "Scrambled Egg", price: "150" },
    { name: "Dulet", price: "210" },
    { name: "Tibs Firfir", price: "220" },
    { name: "Kuanta Firfir", price: "220" },
    { name: "Fasting Firfir", price: "140" },
    { name: "Derkoshi Firfir", price: "190" },
    { name: "Derkoshi Firfir With Kuanta", price: "240" },
    { name: "Beyeaynet", price: "170" },
    { name: "Banato", price: "230" },
    { name: "Lentils With Beef Wot", price: "230" },
    { name: "Lentils Wot", price: "180" },
    { name: "Shiro With Gomen & Tomato", price: "200" },
    { name: "Shiro", price: "140" },
    { name: "Bozena Shiro", price: "180" },
    { name: "Chiqina Tibs", price: "370" },
    { name: "Yebeg Tibs", price: "370" },
    { name: "Gomen With Beef", price: "220" },
    { name: "Tuna Firfir", price: "250" },
    { name: "Menechet Wot", price: "240" },
    { name: "Key Wot", price: "240" },
    { name: "Kikil", price: "260" },
    { name: "Fut Special Gebeta", price: "590" }
  ],
  "Snack & Sandwich": [
    { name: "Beef Samubusa /4pc/ With Fries", price: "180" },
    { name: "Lentils Samubusa /4pc/ With Fries", price: "150" },
    { name: "French Fries", price: "120" },
    { name: "Pancake", price: "160" },
    { name: "Special Burger", price: "360" },
    { name: "Tuna Sandwich", price: "260" },
    { name: "Club Sandwich", price: "260" },
    { name: "Egg Sandwich With Fries", price: "170" },
    { name: "Vegetable Sandwich With Fries", price: "160" },
    { name: "Omelet", price: "180" },
    { name: "Cheese Omelet", price: "190" },
    { name: "Salad", price: "180" },
    { name: "Tuna Salad", price: "260" }
  ],
  "Mains": [
    { name: "Rice/Pasta/Macaroni With Tomato Sauce", price: "170" },
    { name: "Rice/Pasta/Macaroni With Veggie Sauce", price: "190" },
    { name: "Rice/Pasta/Macaroni With Beef Sauce", price: "230" }
  ],
  "Hot Drinks": [
    { name: "Traditional Coffee", price: "18" },
    { name: "Moka Pot Coffee", price: "30" },
    { name: "Espresso/Coffee", price: "45" },
    { name: "Macchiato", price: "55" },
    { name: "Double Macchiato", price: "90" },
    { name: "Fasting Macchiato", price: "70" },
    { name: "Cafe Latte", price: "65" },
    { name: "Tea or Ginger Latte", price: "60" },
    { name: "Cappuccino", price: "80" },
    { name: "Special Tea", price: "90" },
    { name: "Lemon or Ginger Tea", price: "45" },
    { name: "Lemon Tea", price: "40" },
    { name: "Tea", price: "30" },
    { name: "Flavor Tea", price: "40" },
    { name: "Hot Chocolate", price: "70" }
  ],
  "Beverages": [
    { name: "Water 1/2L", price: "25" },
    { name: "Water 1L", price: "30" },
    { name: "Water 2L", price: "40" },
    { name: "Soda Drinks", price: "40" },
    { name: "Plastic Soda", price: "60" },
    { name: "Plastic Merinda", price: "70" },
    { name: "Ambo Sparkling Water", price: "35" },
    { name: "Novida", price: "45" },
    { name: "Sinke Malt", price: "55" }
  ]
};

function ReservationModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", phone: "", date: "", time: "", guests: "2", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hello Fufut Coffee!\n\nI would like to make a reservation:\n\nName: ${form.name}\nPhone: ${form.phone}\nDate: ${form.date}\nTime: ${form.time}\nGuests: ${form.guests}${form.notes ? `\nNotes: ${form.notes}` : ""}\n\nThank you.`
    );
    setSubmitted(true);
    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    }, 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="bg-background text-foreground w-full max-w-lg relative overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="h-1 bg-primary w-full" />

        <div className="p-8 md:p-10">
          <button
            data-testid="button-close-reservation"
            onClick={onClose}
            className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={20} />
          </button>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-8 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <SiWhatsapp className="text-primary" size={28} />
                </div>
                <h3 className="font-serif text-2xl text-primary mb-3">Redirecting to WhatsApp</h3>
                <p className="font-sans text-muted-foreground text-sm">Your reservation details are ready to send. We will confirm within a few hours.</p>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <p className="font-sans tracking-[0.2em] uppercase text-xs text-muted-foreground mb-2">Fufut Coffee</p>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-8">Reserve a Table</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 md:col-span-1">
                      <label className="font-sans text-xs tracking-widest uppercase text-muted-foreground block mb-2">Full Name</label>
                      <input
                        data-testid="input-reservation-name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="w-full bg-transparent border-b border-border text-foreground placeholder:text-muted-foreground px-0 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <label className="font-sans text-xs tracking-widest uppercase text-muted-foreground block mb-2">Phone</label>
                      <input
                        data-testid="input-reservation-phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        placeholder="+251 ..."
                        className="w-full bg-transparent border-b border-border text-foreground placeholder:text-muted-foreground px-0 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="font-sans text-xs tracking-widest uppercase text-muted-foreground flex items-center gap-1.5 mb-2">
                        <Calendar size={11} /> Date
                      </label>
                      <input
                        data-testid="input-reservation-date"
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b border-border text-foreground px-0 py-3 text-sm focus:outline-none focus:border-primary transition-colors [color-scheme:light] dark:[color-scheme:dark]"
                      />
                    </div>
                    <div>
                      <label className="font-sans text-xs tracking-widest uppercase text-muted-foreground flex items-center gap-1.5 mb-2">
                        <Clock size={11} /> Time
                      </label>
                      <input
                        data-testid="input-reservation-time"
                        type="time"
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b border-border text-foreground px-0 py-3 text-sm focus:outline-none focus:border-primary transition-colors [color-scheme:light] dark:[color-scheme:dark]"
                      />
                    </div>
                    <div>
                      <label className="font-sans text-xs tracking-widest uppercase text-muted-foreground flex items-center gap-1.5 mb-2">
                        <Users size={11} /> Guests
                      </label>
                      <select
                        data-testid="select-reservation-guests"
                        name="guests"
                        value={form.guests}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-border text-foreground px-0 py-3 text-sm focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                      >
                        {[1,2,3,4,5,6,7,8,10,12].map(n => (
                          <option key={n} value={n} className="bg-background">{n} {n === 1 ? "guest" : "guests"}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-sans text-xs tracking-widest uppercase text-muted-foreground flex items-center gap-1.5 mb-2">
                      <MessageSquare size={11} /> Special Requests
                    </label>
                    <textarea
                      data-testid="input-reservation-notes"
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Dietary requirements, occasion, seating preference..."
                      className="w-full bg-transparent border-b border-border text-foreground placeholder:text-muted-foreground px-0 py-3 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  <button
                    data-testid="button-submit-reservation"
                    type="submit"
                    className="w-full mt-2 flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white py-4 text-sm font-sans tracking-widest uppercase transition-colors duration-300"
                  >
                    <SiWhatsapp size={16} />
                    Confirm via WhatsApp
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

const categoryImages: Record<string, string> = {
  "Breakfast & Lunch": menuBreakfastImg,
  "Snack & Sandwich": menuSnacksImg,
  "Mains": menuTibsImg,
  "Hot Drinks": menuDrinksImg,
  "Beverages": menuBeveragesImg,
};

const signatureDishes = [
  { name: "Fut Special Gebeta", price: "590", category: "Breakfast & Lunch", img: menuGebetaImg, desc: "A grand communal feast of layered wots and firfir" },
  { name: "Chiqina Tibs", price: "370", category: "Breakfast & Lunch", img: menuChiqinaImg, desc: "Sautéed spiced beef with jalapeños and rosemary" },
  { name: "Double Macchiato", price: "90", category: "Hot Drinks", img: menuMacchiatoImg, desc: "Rich Ethiopian espresso with a velvet crema" },
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("fufut-theme") === "dark" ||
        (!localStorage.getItem("fufut-theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("fufut-theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("fufut-theme", "light");
    }
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (reservationOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [reservationOpen]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden selection:bg-primary selection:text-white">

      {/* Reservation Modal */}
      <AnimatePresence>
        {reservationOpen && <ReservationModal onClose={() => setReservationOpen(false)} />}
      </AnimatePresence>

      {/* Floating WhatsApp Button */}
      <motion.a
        data-testid="link-whatsapp-float"
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Fufut Coffee! I'd like to know more.")}`}
        target="_blank"
        rel="noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.4 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-xl text-white hover:bg-[#1ebe5d] transition-colors"
        aria-label="Chat on WhatsApp"
      >
        <SiWhatsapp size={24} />
      </motion.a>

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
          isScrolled
            ? "bg-background/90 backdrop-blur-md border-border/50 py-4"
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div
            className="font-serif text-2xl md:text-3xl tracking-wide font-semibold text-primary cursor-pointer"
            onClick={() => scrollTo("hero")}
          >
            FUFUT
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8 font-sans text-sm tracking-widest uppercase">
            <button onClick={() => scrollTo("heritage")} className="hover:text-primary transition-colors">Heritage</button>
            <button onClick={() => scrollTo("menu")} className="hover:text-primary transition-colors">Menu</button>
            <button onClick={() => scrollTo("atmosphere")} className="hover:text-primary transition-colors">Experience</button>
            <button onClick={() => scrollTo("gallery")} className="hover:text-primary transition-colors">Gallery</button>

            <button
              data-testid="button-toggle-theme"
              onClick={() => setIsDark(d => !d)}
              className="w-9 h-9 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <Button
              data-testid="button-reserve-nav"
              variant="outline"
              className="rounded-none border-primary text-primary hover:bg-primary hover:text-white transition-colors"
              onClick={() => setReservationOpen(true)}
            >
              Reserve a Table
            </Button>
          </div>

          {/* Mobile Nav Toggle */}
          <div className="md:hidden flex items-center gap-3">
            <button
              data-testid="button-toggle-theme-mobile"
              onClick={() => setIsDark(d => !d)}
              className="w-9 h-9 flex items-center justify-center border border-border/60 hover:border-primary hover:text-primary transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <button
              data-testid="button-mobile-menu-open"
              className="text-foreground"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed inset-0 bg-background z-50 flex flex-col pt-24 px-8"
          >
            <button
              data-testid="button-mobile-menu-close"
              className="absolute top-6 right-6 text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={24} />
            </button>
            <div className="flex flex-col space-y-8 font-serif text-3xl">
              <button onClick={() => scrollTo("heritage")} className="text-left hover:text-primary transition-colors">Heritage</button>
              <button onClick={() => scrollTo("menu")} className="text-left hover:text-primary transition-colors">Menu</button>
              <button onClick={() => scrollTo("atmosphere")} className="text-left hover:text-primary transition-colors">Experience</button>
              <button onClick={() => scrollTo("gallery")} className="text-left hover:text-primary transition-colors">Gallery</button>
              <button onClick={() => scrollTo("contact")} className="text-left hover:text-primary transition-colors">Contact</button>
              <button
                data-testid="button-reserve-mobile"
                className="text-left text-primary"
                onClick={() => { setMobileMenuOpen(false); setReservationOpen(true); }}
              >
                Reserve a Table
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Hero Section */}
      <section id="hero" className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-10" />
          <img
            src={heroImg}
            alt="Ethiopian Coffee Ceremony"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        <div className="container relative z-20 px-6 md:px-12 flex flex-col items-center text-center mt-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/80 font-sans tracking-[0.3em] uppercase text-sm md:text-base mb-6"
          >
            Addis Ababa
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-9xl font-serif text-white mb-8 leading-[0.9]"
          >
            Fufut Coffee
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-white/90 font-sans max-w-xl mx-auto text-lg md:text-xl font-light mb-12"
          >
            A first-class journey into Ethiopian coffee heritage, filtered through a lens of modern African luxury.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              data-testid="button-explore-menu"
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white rounded-none px-8 py-6 text-sm tracking-widest uppercase"
              onClick={() => scrollTo("menu")}
            >
              Explore the Menu
            </Button>
            <Button
              data-testid="button-reserve-hero"
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary rounded-none px-8 py-6 text-sm tracking-widest uppercase bg-transparent"
              onClick={() => setReservationOpen(true)}
            >
              Reserve a Table
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 2. Heritage / Brand Story */}
      <section id="heritage" className="py-24 md:py-32 bg-background relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={STAGGER}
            >
              <motion.h2 variants={FADE_UP} className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary mb-8 leading-tight">
                More than a drink.<br/>A profound ritual.
              </motion.h2>
              <motion.div variants={FADE_UP} className="w-16 h-px bg-secondary mb-8" />
              <motion.p variants={FADE_UP} className="text-lg text-muted-foreground leading-relaxed font-sans font-light mb-6">
                In Ethiopia, coffee is the fabric of society. It is an unhurried communion, a moment to pause, reflect, and connect. At Fufut, we elevate this ancient tradition into a modern luxury experience.
              </motion.p>
              <motion.p variants={FADE_UP} className="text-lg text-muted-foreground leading-relaxed font-sans font-light">
                From the careful roasting of the beans to the ceremonial pouring of the jebena, every detail is orchestrated to honor our heritage while embracing contemporary refinement.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative h-[600px]"
            >
              <img src={beansImg} alt="Fresh Coffee Beans" className="w-full h-full object-cover" />
              <div className="absolute inset-0 border border-primary/20 m-4 pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Signature Menu */}
      <section id="menu" className="py-24 md:py-36 bg-card border-y border-border overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">

          {/* Editorial Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={FADE_UP}
            className="text-center mb-20"
          >
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-muted-foreground mb-6">Fufut Coffee</p>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px flex-1 max-w-[80px] bg-secondary/50" />
              <span className="text-secondary text-lg">✦</span>
              <div className="h-px flex-1 max-w-[80px] bg-secondary/50" />
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-foreground mb-5 leading-none">The Collection</h2>
            <p className="font-sans text-muted-foreground uppercase tracking-[0.3em] text-xs">
              Curated Offerings — Prices in ETB
            </p>
          </motion.div>

          <Tabs defaultValue="Breakfast & Lunch" className="w-full">
            {/* Underline-style tabs */}
            <TabsList className="w-full flex flex-wrap justify-center bg-transparent h-auto p-0 mb-16 border-b border-border gap-0">
              {Object.keys(menuData).map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="relative rounded-none px-5 py-4 font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground bg-transparent border-0 shadow-none
                    data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none
                    hover:text-foreground transition-colors duration-300
                    after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-primary after:scale-x-0 after:transition-transform after:duration-300
                    data-[state=active]:after:scale-x-100"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-7">
                {Object.entries(menuData).map(([category, items]) => (
                  <TabsContent key={category} value={category} className="mt-0 outline-none">
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45 }}
                      className="space-y-0"
                    >
                      {items.map((item, idx) => {
                        const isSignature = ["Fut Special Gebeta", "Chiqina Tibs", "Traditional Coffee", "Special Chechebsa", "Special Burger", "Double Macchiato"].includes(item.name);
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: idx * 0.03 }}
                            className="group flex items-baseline gap-2 py-4 border-b border-border/40 hover:border-primary/30 transition-colors duration-300"
                          >
                            <div className="flex items-center gap-2 shrink-0">
                              {isSignature && (
                                <span className="text-[8px] text-secondary font-sans uppercase tracking-widest border border-secondary/50 px-1.5 py-0.5 leading-none">
                                  Chef
                                </span>
                              )}
                              <span className={`font-serif text-lg transition-colors duration-300 ${isSignature ? "text-foreground group-hover:text-primary" : "text-foreground/80 group-hover:text-primary"}`}>
                                {item.name}
                              </span>
                            </div>
                            <span className="flex-1 border-b border-dotted border-border/60 mb-1 mx-2" />
                            <span className="font-sans text-sm font-light text-secondary whitespace-nowrap tabular-nums shrink-0">
                              {item.price} <span className="text-[10px] text-muted-foreground tracking-wider">ETB</span>
                            </span>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </TabsContent>
                ))}
              </div>

              {/* Sticky image column */}
              <div className="lg:col-span-5 hidden lg:block relative">
                <div className="sticky top-32 space-y-6">
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img src={menuRefImg} alt="Fufut Menu" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                  </div>
                  <div className="border border-border p-6 text-center">
                    <p className="font-serif text-xl text-foreground mb-2">Order via WhatsApp</p>
                    <p className="font-sans text-xs text-muted-foreground mb-4 tracking-wider">Place your order or ask about availability</p>
                    <a
                      data-testid="link-whatsapp-menu"
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Fufut Coffee! I'd like to place an order.")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-6 py-3 text-xs font-sans tracking-widest uppercase transition-colors duration-300 w-full justify-center"
                    >
                      <SiWhatsapp size={14} />
                      Order Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </section>

      {/* 4. Atmosphere */}
      <section id="atmosphere" className="py-24 md:py-32 bg-[#085B5A] text-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="order-2 lg:order-1 relative aspect-square"
            >
              <img src={interiorImg} alt="Cafe Interior" className="w-full h-full object-cover" />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={STAGGER}
              className="order-1 lg:order-2 lg:pl-12"
            >
              <motion.p variants={FADE_UP} className="font-sans tracking-[0.3em] uppercase text-sm text-secondary mb-6">
                The Atmosphere
              </motion.p>
              <motion.h2 variants={FADE_UP} className="text-4xl md:text-5xl lg:text-6xl font-serif mb-8 leading-tight">
                Sanctuary in<br/>the City.
              </motion.h2>
              <motion.p variants={FADE_UP} className="text-lg text-white/80 leading-relaxed font-sans font-light mb-8">
                Designed with Milanese precision and African warmth, our spaces invite you to linger. Deep emeralds, tactile woods, and soft ivory create a cocoon of comfort. It is a place for conversation, for creation, for simply being.
              </motion.p>
              <motion.div variants={FADE_UP} className="flex gap-4">
                <Button
                  variant="outline"
                  className="rounded-none border-white text-primary-foreground hover:bg-white hover:text-primary transition-colors px-8"
                  onClick={() => scrollTo("gallery")}
                >
                  View Gallery
                </Button>
                <Button
                  data-testid="button-reserve-atmosphere"
                  className="rounded-none bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8"
                  onClick={() => setReservationOpen(true)}
                >
                  Reserve Now
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Visual Gallery */}
      <section id="gallery" className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 aspect-[16/9] relative group overflow-hidden"
            >
              <img src={foodImg} alt="Traditional Food" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="aspect-[3/4] md:aspect-auto relative group overflow-hidden"
            >
              <img src={macchiatoImg} alt="Macchiato" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="aspect-square relative group overflow-hidden"
            >
              <img src={steamImg} alt="Coffee Steam" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-2 aspect-[16/9] relative group overflow-hidden"
            >
              <img src={gatheredImg} alt="Gathered at Cafe" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="py-24 md:py-32 bg-card border-y border-border overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif text-primary mb-16"
          >
            What Our Guests Say
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                text: "An extraordinary sensory experience. The best traditional coffee I've had in years, served in an impeccably designed space.",
                author: "Sarah M."
              },
              {
                text: "Fufut redefines luxury in Addis. The attention to detail — from the macchiato art to the interior lighting — is unmatched.",
                author: "David L."
              },
              {
                text: "More than just a café, it's a cultural destination. The Special Chechebsa is a revelation.",
                author: "Helen K."
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center"
              >
                <div className="text-secondary text-4xl font-serif mb-6">"</div>
                <p className="font-serif text-xl md:text-2xl text-foreground leading-relaxed mb-6 italic">
                  {testimonial.text}
                </p>
                <span className="font-sans text-sm tracking-widest uppercase text-muted-foreground">
                  — {testimonial.author}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Contact & Footer */}
      <section id="contact" className="bg-[#1B1B1B] text-white pt-24 pb-12">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={STAGGER}
            >
              <motion.h2 variants={FADE_UP} className="text-4xl md:text-6xl font-serif mb-8">
                Visit Fufut
              </motion.h2>
              <motion.p variants={FADE_UP} className="text-white/70 font-sans font-light text-lg mb-12 max-w-md">
                Experience the finest Ethiopian coffee and culinary heritage. We await your arrival.
              </motion.p>

              <div className="space-y-8 font-sans font-light">
                <motion.div variants={FADE_UP} className="flex items-start gap-4">
                  <MapPin className="text-secondary mt-1 shrink-0" />
                  <div>
                    <h4 className="font-serif text-xl mb-2">Location</h4>
                    <p className="text-white/70">Addis Ababa, Ethiopia<br/>(See social media for exact directions)</p>
                  </div>
                </motion.div>

                <motion.div variants={FADE_UP} className="flex items-start gap-4">
                  <Phone className="text-secondary mt-1 shrink-0" />
                  <div>
                    <h4 className="font-serif text-xl mb-2">Reservations & Inquiries</h4>
                    <div className="flex flex-col space-y-1 text-white/70">
                      <a href="tel:0931190440" data-testid="link-phone-1" className="hover:text-white transition-colors">0931-19 04 40</a>
                      <a href="tel:0953000200" data-testid="link-phone-2" className="hover:text-white transition-colors">0953-00 02 00</a>
                      <a href="tel:0953022100" data-testid="link-phone-3" className="hover:text-white transition-colors">0953-02 21 00</a>
                      <a href="tel:0994636382" data-testid="link-phone-4" className="hover:text-white transition-colors">0994-63 63 82</a>
                      <a href="tel:0912934982" data-testid="link-phone-5" className="hover:text-white transition-colors">0912-93 49 82</a>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={FADE_UP} className="flex items-start gap-4">
                  <SiWhatsapp className="text-secondary mt-1 shrink-0" size={20} />
                  <div>
                    <h4 className="font-serif text-xl mb-2">WhatsApp</h4>
                    <a
                      data-testid="link-whatsapp-contact"
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      Chat with us on WhatsApp
                    </a>
                  </div>
                </motion.div>

                <motion.div variants={FADE_UP} className="flex items-start gap-4">
                  <Instagram className="text-secondary mt-1 shrink-0" />
                  <div>
                    <h4 className="font-serif text-xl mb-2">Social</h4>
                    <a href="https://instagram.com/FUFUTCOFFEE" target="_blank" rel="noreferrer" className="text-white/70 hover:text-white transition-colors">
                      @FUFUTCOFFEE
                    </a>
                  </div>
                </motion.div>

                <motion.div variants={FADE_UP}>
                  <button
                    data-testid="button-reserve-contact"
                    onClick={() => setReservationOpen(true)}
                    className="mt-4 flex items-center gap-3 border border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 py-4 font-sans text-sm tracking-widest uppercase transition-colors duration-300"
                  >
                    Reserve a Table
                    <ChevronRight size={16} />
                  </button>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="bg-[#0B7A78] p-12 flex flex-col justify-center items-center text-center h-full"
            >
              <h3 className="font-serif text-3xl mb-6">Join the Culture</h3>
              <p className="font-sans font-light text-white/80 mb-8 max-w-sm">
                Subscribe for private event invitations and seasonal menu previews.
              </p>
              <div className="w-full max-w-sm flex">
                <input
                  data-testid="input-newsletter-email"
                  type="email"
                  placeholder="Email Address"
                  className="bg-transparent border-b border-white/30 text-white placeholder:text-white/50 px-4 py-3 w-full focus:outline-none focus:border-white transition-colors"
                />
                <button
                  data-testid="button-newsletter-submit"
                  className="border-b border-white/30 px-4 hover:border-white transition-colors"
                >
                  <ChevronRight />
                </button>
              </div>
            </motion.div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm font-sans text-white/50">
            <p>&copy; {new Date().getFullYear()} Fufut Coffee. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
