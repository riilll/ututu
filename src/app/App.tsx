import { useState } from "react";
import {
  Fish, Anchor, MapPin, Clock, Star, Shield, Leaf, ArrowRight,
  ShoppingCart, User, Menu, X, Package, Truck, CheckCircle,
  BarChart2, TrendingUp, Bell, Settings, LogOut, Search, Plus,
  Minus, CreditCard, Phone, Mail, Instagram, Twitter, Facebook,
  Award, Waves, Navigation, Zap, ChevronRight, Heart, Filter,
  RefreshCw, AlertCircle
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area
} from "recharts";

type Page =
  | "home" | "products" | "product-detail" | "fisherman-profile"
  | "cart" | "checkout" | "user-dashboard" | "fisherman-dashboard";

interface Product {
  id: number; name: string; weight: number; price: number;
  arrival: string; location: string;
  freshness: "Ultra Fresh" | "Very Fresh" | "Fresh";
  fisherman: string; fishermanId: number; category: string;
  image: string; description: string; depth: string;
  method: string; caught: string;
}
interface Fisherman {
  id: number; name: string; rating: number; location: string;
  experience: number; avatar: string; catches: number;
  verified: boolean; bio: string; boat: string; specialties: string[];
}
interface CartItem { product: Product; kg: number; }

const PRODUCTS: Product[] = [
  {
    id: 1, name: "Atlantic Salmon", weight: 45, price: 450000, arrival: "2h",
    location: "North Aceh Waters", freshness: "Very Fresh",
    fisherman: "Ahmad Rasyid", fishermanId: 1, category: "Fish",
    image: "https://images.unsplash.com/photo-1499125562588-29fb8a56b5d5?w=400&h=280&fit=crop&auto=format",
    description: "Premium wild-caught Atlantic Salmon from pristine North Aceh waters. Rich in omega-3 fatty acids, sustainably line-harvested at dawn.",
    depth: "15–25m", method: "Line fishing", caught: "06:30 WIB"
  },
  {
    id: 2, name: "Red Snapper", weight: 30, price: 350000, arrival: "4h",
    location: "Sabang Island", freshness: "Ultra Fresh",
    fisherman: "Baharuddin", fishermanId: 2, category: "Fish",
    image: "https://images.unsplash.com/photo-1713804708016-e1f61ea2c0ca?w=400&h=280&fit=crop&auto=format",
    description: "Vibrant red snapper from clear coral reefs around Sabang Island. Firm white flesh with delicate flavor — ideal for grilling.",
    depth: "10–20m", method: "Net fishing", caught: "05:15 WIB"
  },
  {
    id: 3, name: "Tiger Prawns", weight: 15, price: 720000, arrival: "1h",
    location: "Banda Aceh Port", freshness: "Ultra Fresh",
    fisherman: "Musliadi", fishermanId: 3, category: "Crustaceans",
    image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=400&h=280&fit=crop&auto=format",
    description: "Large, succulent tiger prawns harvested from Banda Aceh coastal waters this morning. Sweet, firm texture with no preservatives.",
    depth: "5–15m", method: "Trap", caught: "07:45 WIB"
  },
  {
    id: 4, name: "Yellowfin Tuna", weight: 80, price: 560000, arrival: "6h",
    location: "Malacca Strait", freshness: "Fresh",
    fisherman: "Ahmad Rasyid", fishermanId: 1, category: "Fish",
    image: "https://images.unsplash.com/photo-1577105106699-5c230ed0bd70?w=400&h=280&fit=crop&auto=format",
    description: "Sashimi-grade yellowfin tuna from deep Malacca Strait waters. Cleaned and flash-chilled on board within minutes of landing.",
    depth: "50–200m", method: "Longline", caught: "04:00 WIB"
  },
  {
    id: 5, name: "Sea Bass", weight: 25, price: 480000, arrival: "3h",
    location: "Pidie Bay", freshness: "Very Fresh",
    fisherman: "Baharuddin", fishermanId: 2, category: "Fish",
    image: "https://images.unsplash.com/photo-1668335539106-c47ce29f6b8f?w=400&h=280&fit=crop&auto=format",
    description: "Wild sea bass from Pidie Bay's nutrient-rich waters. Delicate flavor and flaky white flesh, perfect for steaming or en-papillote.",
    depth: "8–18m", method: "Net fishing", caught: "06:00 WIB"
  },
  {
    id: 6, name: "Spiny Lobster", weight: 8, price: 1050000, arrival: "5h",
    location: "Simeulue Island", freshness: "Fresh",
    fisherman: "Musliadi", fishermanId: 3, category: "Crustaceans",
    image: "https://images.unsplash.com/photo-1674962296996-b17a771d44b3?w=400&h=280&fit=crop&auto=format",
    description: "Prized spiny lobsters from Simeulue Island pristine reefs. Exceptionally sweet and tender meat caught by hand-dive.",
    depth: "3–10m", method: "Dive / Trap", caught: "05:30 WIB"
  },
  {
    id: 7, name: "Grouper", weight: 20, price: 420000, arrival: "3.5h",
    location: "Aceh Besar Coast", freshness: "Very Fresh",
    fisherman: "Ahmad Rasyid", fishermanId: 1, category: "Fish",
    image: "https://images.unsplash.com/photo-1668335508689-fdbea12a6d69?w=400&h=280&fit=crop&auto=format",
    description: "Meaty grouper from rocky reefs along Aceh Besar. A staple of traditional Acehnese cuisine — firm texture that holds up to any cooking method.",
    depth: "20–40m", method: "Line fishing", caught: "06:15 WIB"
  },
  {
    id: 8, name: "Cumi-Cumi (Squid)", weight: 12, price: 285000, arrival: "2h",
    location: "North Aceh Waters", freshness: "Ultra Fresh",
    fisherman: "Baharuddin", fishermanId: 2, category: "Mollusks",
    image: "https://images.unsplash.com/photo-1547108509-6cac880a4d82?w=400&h=280&fit=crop&auto=format",
    description: "Whole fresh squid from North Aceh night fishing. Tender and naturally flavorful — cleaned and iced within the hour of catch.",
    depth: "0–30m", method: "Jigging", caught: "02:00 WIB"
  }
];

const FISHERMEN: Fisherman[] = [
  {
    id: 1, name: "Ahmad Rasyid", rating: 4.9, location: "Banda Aceh",
    experience: 15, catches: 1240, verified: true,
    avatar: "https://images.unsplash.com/photo-1541064828014-503911d13103?w=200&h=200&fit=crop&auto=format",
    bio: "Third-generation fisherman from Banda Aceh. Expert in deep-sea tuna and salmon with a crew of six. Committed to sustainable harvesting and ocean conservation for future generations.",
    boat: "Kapal Biru Laut", specialties: ["Tuna", "Salmon", "Grouper"]
  },
  {
    id: 2, name: "Baharuddin", rating: 4.8, location: "Sabang Island",
    experience: 22, catches: 2105, verified: true,
    avatar: "https://images.unsplash.com/photo-1516011362164-3095a82b0af9?w=200&h=200&fit=crop&auto=format",
    bio: "Veteran fisherman based on Sabang Island (Weh Island). Specializes in reef fish and squid. Consistently earns the highest freshness scores on MarineFresh.",
    boat: "Nelayan Sabang", specialties: ["Red Snapper", "Sea Bass", "Squid"]
  },
  {
    id: 3, name: "Musliadi", rating: 4.7, location: "Simeulue Island",
    experience: 8, catches: 680, verified: true,
    avatar: "https://images.unsplash.com/photo-1662962913155-9e6548038a43?w=200&h=200&fit=crop&auto=format",
    bio: "Skilled young fisherman from Simeulue Island. Diver and trap specialist for lobster and prawn, using traditional methods combined with modern GPS tracking.",
    boat: "Ombak Simeulue", specialties: ["Lobster", "Tiger Prawns", "Crab"]
  }
];

const TESTIMONIALS = [
  {
    id: 1, name: "Chef Marco Santoso", role: "Head Chef — La Mer Restaurant",
    text: "MarineFresh has completely transformed our kitchen. Knowing exactly when and where each fish was caught gives us total confidence in the quality we serve. Our guests can taste the difference.",
    rating: 5, initials: "MS", city: "Banda Aceh"
  },
  {
    id: 2, name: "Ibu Rahmawati", role: "Owner — Warung Seafood Aceh",
    text: "Dulu saya harus ke pasar pagi-pagi untuk mendapat ikan segar. Sekarang dengan MarineFresh, saya pesan malam dan tiba subuh. Kualitasnya luar biasa dan harganya sangat bersaing.",
    rating: 5, initials: "IR", city: "Banda Aceh"
  },
  {
    id: 3, name: "David Chen", role: "F&B Director — Grand Banda Hotel",
    text: "As a five-star hotel, traceability and freshness are non-negotiable. MarineFresh delivers on both. We can show guests exactly where their seafood originated. Truly outstanding service.",
    rating: 5, initials: "DC", city: "Banda Aceh"
  }
];

const REVENUE_DATA = [
  { month: "Jan", revenue: 42 }, { month: "Feb", revenue: 58 },
  { month: "Mar", revenue: 49 }, { month: "Apr", revenue: 72 },
  { month: "May", revenue: 68 }, { month: "Jun", revenue: 91 }
];

const ORDERS_DATA = [
  { id: "MF-2401", product: "Atlantic Salmon 2kg", status: "Delivered", date: "Jun 22, 2026", total: 900000 },
  { id: "MF-2389", product: "Tiger Prawns 1kg", status: "In Transit", date: "Jun 23, 2026", total: 720000 },
  { id: "MF-2378", product: "Red Snapper 1.5kg", status: "Delivered", date: "Jun 20, 2026", total: 525000 },
  { id: "MF-2365", product: "Spiny Lobster 0.8kg", status: "Delivered", date: "Jun 18, 2026", total: 840000 },
];

const rp = (n: number) => "Rp " + n.toLocaleString("id-ID");

function freshnessStyle(f: string) {
  if (f === "Ultra Fresh") return "bg-emerald-100 text-emerald-700 border border-emerald-200";
  if (f === "Very Fresh") return "bg-teal-100 text-teal-700 border border-teal-200";
  return "bg-blue-100 text-blue-700 border border-blue-200";
}

function statusStyle(s: string) {
  if (s === "Delivered") return "bg-emerald-100 text-emerald-700";
  if (s === "In Transit") return "bg-amber-100 text-amber-700";
  return "bg-blue-100 text-blue-700";
}

// ─── NAVBAR ────────────────────────────────────────────────────────────────────
function NavBar({ page, setPage, cartCount }: {
  page: Page; setPage: (p: Page) => void; cartCount: number;
}) {
  const [open, setOpen] = useState(false);
  const navLinks: { label: string; page: Page }[] = [
    { label: "Today's Catch", page: "products" },
    { label: "Fishermen", page: "fisherman-profile" },
    { label: "Dashboard", page: "user-dashboard" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => setPage("home")} className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Anchor className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Marine<span className="text-primary">Fresh</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(l => (
              <button
                key={l.page}
                onClick={() => setPage(l.page)}
                className={`text-sm font-medium transition-colors hover:text-primary ${page === l.page ? "text-primary" : "text-muted-foreground"}`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setPage("cart")}
              className="relative p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-foreground" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setPage("fisherman-dashboard")}
              className="hidden md:flex items-center gap-2 text-sm font-semibold text-primary border border-primary/30 hover:bg-primary hover:text-white rounded-lg px-4 py-2 transition-all"
            >
              <Fish className="w-4 h-4" /> Sell Fish
            </button>
            <button
              onClick={() => setPage("user-dashboard")}
              className="hidden md:flex items-center gap-2 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg px-4 py-2 transition-all"
            >
              <User className="w-4 h-4" /> My Account
            </button>
            <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden border-t border-border py-4 flex flex-col gap-3">
            {navLinks.map(l => (
              <button
                key={l.page}
                onClick={() => { setPage(l.page); setOpen(false); }}
                className="text-left px-2 py-2 text-sm font-medium text-foreground hover:text-primary"
              >
                {l.label}
              </button>
            ))}
            <div className="flex gap-2 pt-2">
              <button onClick={() => { setPage("user-dashboard"); setOpen(false); }}
                className="flex-1 text-sm font-semibold text-white bg-primary rounded-lg py-2">
                My Account
              </button>
              <button onClick={() => { setPage("fisherman-dashboard"); setOpen(false); }}
                className="flex-1 text-sm font-semibold text-primary border border-primary/30 rounded-lg py-2">
                Sell Fish
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// ─── CATCH CARD ─────────────────────────────────────────────────────────────
function CatchCard({ p, onDetail, onAdd }: {
  p: Product; onDetail: () => void; onAdd: () => void;
}) {
  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
      <div className="relative overflow-hidden h-44 bg-secondary">
        <img
          src={p.image} alt={p.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${freshnessStyle(p.freshness)}`}>
            {p.freshness}
          </span>
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs font-bold text-foreground">
          {p.category}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-foreground text-base">{p.name}</h3>
          <div className="text-right">
            <p className="text-base font-bold text-primary">{rp(p.price)}</p>
            <p className="text-xs text-muted-foreground">per kg</p>
          </div>
        </div>
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 text-accent flex-shrink-0" />
            <span>{p.location}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Package className="w-3.5 h-3.5 text-accent" />
              <span>{p.weight} kg available</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-accent" />
              <span>Arrives in {p.arrival}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onDetail}
            className="flex-1 text-sm font-semibold text-primary border border-primary/30 rounded-xl py-2.5 hover:bg-primary/5 transition-colors"
          >
            View Details
          </button>
          <button
            onClick={onAdd}
            className="flex-1 text-sm font-semibold text-white bg-primary rounded-xl py-2.5 hover:bg-primary/90 transition-colors"
          >
            Pre-Order
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── FISHERMAN CARD ──────────────────────────────────────────────────────────
function FishermanCard({ f, onClick }: { f: Fisherman; onClick: () => void }) {
  return (
    <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="h-32 bg-gradient-to-br from-[#0077B6] to-[#023E8A] relative">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1566622246721-600a52b49b33?w=400&h=128&fit=crop&auto=format)", backgroundSize: "cover" }} />
      </div>
      <div className="px-5 pb-5">
        <div className="-mt-10 mb-3 flex items-end justify-between">
          <div className="relative">
            <img src={f.avatar} alt={f.name}
              className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-md" />
            {f.verified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="text-sm font-bold text-amber-700">{f.rating}</span>
          </div>
        </div>
        <h3 className="font-bold text-foreground text-lg">{f.name}</h3>
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
          <MapPin className="w-3.5 h-3.5" /> {f.location}
        </div>
        <div className="flex gap-3 mb-4 text-center">
          <div className="flex-1 bg-muted rounded-xl p-2">
            <p className="text-base font-bold text-foreground">{f.experience}y</p>
            <p className="text-xs text-muted-foreground">Experience</p>
          </div>
          <div className="flex-1 bg-muted rounded-xl p-2">
            <p className="text-base font-bold text-foreground">{f.catches.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Catches</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {f.specialties.map(s => (
            <span key={s} className="text-xs bg-secondary text-primary font-medium px-2.5 py-1 rounded-full">
              {s}
            </span>
          ))}
        </div>
        <button onClick={onClick}
          className="w-full text-sm font-semibold text-white bg-primary rounded-xl py-2.5 hover:bg-primary/90 transition-colors">
          View Profile
        </button>
      </div>
    </div>
  );
}

// ─── HOME PAGE ───────────────────────────────────────────────────────────────
function HomePage({ setPage, setSelectedProduct, setSelectedFisherman, addToCart }: {
  setPage: (p: Page) => void;
  setSelectedProduct: (p: Product) => void;
  setSelectedFisherman: (f: Fisherman) => void;
  addToCart: (p: Product) => void;
}) {
  return (
    <div className="pt-16">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#071428]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1566622246721-600a52b49b33?w=1920&h=1080&fit=crop&auto=format)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071428]/95 via-[#071428]/80 to-[#071428]/40" />

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20 fill-background">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-sm text-white/90 font-medium">Live Catch Updates — Aceh Waters</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                From Ocean<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4D8] to-[#90E0EF]">
                  to Table
                </span>
              </h1>
              <p className="text-lg text-white/75 leading-relaxed mb-8 max-w-lg">
                Buy fresh seafood directly from fishermen with real-time catch information and full traceability — from the moment it leaves the water to your door.
              </p>
              <div className="flex flex-wrap gap-4 mb-12">
                <button
                  onClick={() => setPage("products")}
                  className="flex items-center gap-2 bg-[#00B4D8] hover:bg-[#0077B6] text-white font-bold px-7 py-3.5 rounded-2xl transition-all hover:scale-105 shadow-lg shadow-[#00B4D8]/30"
                >
                  <Fish className="w-5 h-5" /> Explore Today's Catch
                </button>
                <button
                  onClick={() => setPage("fisherman-dashboard")}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3.5 rounded-2xl border border-white/30 backdrop-blur-sm transition-all"
                >
                  <Anchor className="w-5 h-5" /> Become a Partner
                </button>
              </div>
              <div className="flex flex-wrap gap-6">
                {[
                  { n: "1,200+", l: "Partner Fishermen" },
                  { n: "50+", l: "Daily Catches" },
                  { n: "< 6h", l: "Ocean to Door" }
                ].map(s => (
                  <div key={s.l}>
                    <p className="text-2xl font-extrabold text-white">{s.n}</p>
                    <p className="text-sm text-white/60">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — floating image card */}
            <div className="hidden lg:block relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20">
                <img
                  src="https://images.unsplash.com/photo-1628000048296-d8e66f62a81a?w=620&h=480&fit=crop&auto=format"
                  alt="Fisherman at sea in Aceh"
                  className="w-full h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071428]/60 to-transparent" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-5 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Latest Catch</p>
                  <p className="text-sm font-bold text-foreground">Tiger Prawns — 15kg</p>
                </div>
                <div className="text-right ml-2">
                  <p className="text-xs text-muted-foreground">Arrived</p>
                  <p className="text-sm font-bold text-emerald-600">07:45 WIB</p>
                </div>
              </div>
              <div className="absolute -top-5 -right-5 bg-white rounded-2xl shadow-xl p-3.5 flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="font-bold text-foreground text-sm">4.9 avg rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TODAY'S CATCH */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-2">Live Updates</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Today's Catch</h2>
              <p className="text-muted-foreground mt-2">Fresh from the ocean — restocked every few hours</p>
            </div>
            <button onClick={() => setPage("products")}
              className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              View all catches <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.slice(0, 6).map(p => (
              <CatchCard
                key={p.id} p={p}
                onDetail={() => { setSelectedProduct(p); setPage("product-detail"); }}
                onAdd={() => addToCart(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* WHY MARINEFRESH */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-2">Why Choose Us</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">The MarineFresh Difference</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              We built the infrastructure to connect you directly with the source — and guarantee every step in between.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-7 h-7 text-[#00B4D8]" />,
                bg: "bg-[#E0F9FF]",
                title: "Real-Time Catch Updates",
                desc: "Every catch is logged the moment the net hits the deck. Track weight, species, and GPS coordinates — live."
              },
              {
                icon: <Shield className="w-7 h-7 text-[#0077B6]" />,
                bg: "bg-[#EBF5FF]",
                title: "Full Seafood Traceability",
                desc: "Scan any QR code to trace your seafood back to the exact fisherman, vessel, time of catch, and location."
              },
              {
                icon: <Leaf className="w-7 h-7 text-emerald-600" />,
                bg: "bg-emerald-50",
                title: "Sustainably Direct",
                desc: "We eliminate middlemen and support sustainable fishing practices. Better prices for fishermen, better quality for you."
              }
            ].map(f => (
              <div key={f.title} className="group p-8 rounded-3xl border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className={`w-14 h-14 ${f.bg} rounded-2xl flex items-center justify-center mb-6`}>
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRACEABILITY TIMELINE */}
      <section className="py-20 bg-[#071428] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle, #00B4D8 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-[#00B4D8] uppercase tracking-widest mb-2">Full Transparency</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">From Hook to Doorstep</h2>
            <p className="text-white/60 mt-3 max-w-xl mx-auto">
              Every order comes with a scannable QR code that reveals the complete journey of your seafood.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="hidden md:block absolute top-14 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00B4D8]/40 to-transparent mx-32" />
            <div className="grid md:grid-cols-5 gap-8">
              {[
                { icon: <MapPin className="w-6 h-6" />, step: "01", label: "Catch Location", sub: "GPS-tagged ocean coordinates" },
                { icon: <User className="w-6 h-6" />, step: "02", label: "Fisherman ID", sub: "Verified partner profile" },
                { icon: <Clock className="w-6 h-6" />, step: "03", label: "Catch Time", sub: "Timestamped on deck" },
                { icon: <Anchor className="w-6 h-6" />, step: "04", label: "Port Arrival", sub: "Quality inspection passed" },
                { icon: <Truck className="w-6 h-6" />, step: "05", label: "Your Door", sub: "Temperature-controlled delivery" },
              ].map((s, i) => (
                <div key={s.label} className="flex flex-col items-center text-center group">
                  <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 ${i === 4 ? "bg-[#00B4D8] text-white" : "bg-white/10 text-[#00B4D8] border border-[#00B4D8]/30"}`}>
                    {s.icon}
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#00B4D8]/20 border border-[#00B4D8]/40 rounded-full text-xs font-bold text-[#00B4D8] flex items-center justify-center">
                      {s.step}
                    </span>
                  </div>
                  <p className="font-bold text-white text-sm mb-1">{s.label}</p>
                  <p className="text-white/50 text-xs">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* QR example */}
          <div className="mt-14 max-w-lg mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 flex items-center gap-8">
            <div className="w-24 h-24 flex-shrink-0 bg-white rounded-2xl p-2 grid grid-cols-7 gap-0.5">
              {Array.from({ length: 49 }).map((_, i) => (
                <div key={i} className={`rounded-sm ${Math.random() > 0.5 ? "bg-foreground" : "bg-white"}`} />
              ))}
            </div>
            <div>
              <p className="text-white font-bold mb-1">Scan for Full Traceability</p>
              <p className="text-white/60 text-sm">Every package ships with a unique QR code. Scan to see the exact catch details, fisherman profile, and quality certificates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED FISHERMEN */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-2">Our Partners</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Featured Fishermen</h2>
            <p className="text-muted-foreground mt-3">Verified, experienced, and committed to sustainable fishing</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {FISHERMEN.map(f => (
              <FishermanCard
                key={f.id} f={f}
                onClick={() => { setSelectedFisherman(f); setPage("fisherman-profile"); }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* MARITIME MAP */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-2">Live Tracking</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Aceh Fishing Waters</h2>
            <p className="text-muted-foreground mt-3">Real-time positions of active MarineFresh fishing vessels</p>
          </div>

          <div className="rounded-3xl overflow-hidden border border-border shadow-xl bg-[#0B1F3A] relative">
            <svg viewBox="0 0 900 480" className="w-full" style={{ minHeight: 320 }}>
              {/* Ocean background */}
              <defs>
                <radialGradient id="oceanGrad" cx="50%" cy="50%" r="70%">
                  <stop offset="0%" stopColor="#0E3460" />
                  <stop offset="100%" stopColor="#071428" />
                </radialGradient>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00B4D8" strokeWidth="0.3" strokeOpacity="0.15" />
                </pattern>
              </defs>
              <rect width="900" height="480" fill="url(#oceanGrad)" />
              <rect width="900" height="480" fill="url(#grid)" />

              {/* Simplified Sumatra/Aceh coastline */}
              <path
                d="M 120,180 C 160,160 200,155 240,165 C 280,175 310,185 340,170 C 380,150 420,145 460,155 C 500,165 520,175 550,168 C 580,160 600,155 630,160 C 660,165 680,175 700,185 C 720,195 730,210 720,225 C 710,240 700,250 680,255 C 660,260 640,255 620,260 C 600,265 580,275 560,280 C 540,285 520,288 500,285 C 480,282 460,275 440,278 C 420,281 400,288 380,285 C 360,282 340,275 320,280 C 300,285 280,295 260,300 C 240,305 220,305 200,295 C 180,285 170,270 165,255 C 160,240 155,220 160,205 C 165,190 140,195 120,180 Z"
                fill="#1A4070" stroke="#00B4D8" strokeWidth="1" strokeOpacity="0.5"
              />
              <text x="400" y="225" fill="#90CAF9" fontSize="11" fontWeight="bold" textAnchor="middle" opacity="0.8">ACEH PROVINCE — SUMATRA</text>

              {/* Sabang Island */}
              <ellipse cx="170" cy="140" rx="28" ry="16" fill="#1A4070" stroke="#00B4D8" strokeWidth="1" strokeOpacity="0.5" />
              <text x="170" y="144" fill="#90CAF9" fontSize="8" textAnchor="middle" opacity="0.8">Sabang</text>

              {/* Simeulue Island */}
              <ellipse cx="110" cy="330" rx="35" ry="20" fill="#1A4070" stroke="#00B4D8" strokeWidth="1" strokeOpacity="0.5" />
              <text x="110" y="334" fill="#90CAF9" fontSize="8" textAnchor="middle" opacity="0.8">Simeulue</text>

              {/* Fishing location markers */}
              {[
                { cx: 230, cy: 110, label: "Ahmad Rasyid", sub: "Salmon — 45kg", active: true },
                { cx: 140, cy: 105, label: "Baharuddin", sub: "Snapper — 30kg", active: true },
                { cx: 350, cy: 120, label: "Active Zone", sub: "Tuna belt", active: false },
                { cx: 480, cy: 105, label: "Active Zone", sub: "Deep waters", active: false },
                { cx: 90, cy: 280, label: "Musliadi", sub: "Lobster — 8kg", active: true },
              ].map((m, i) => (
                <g key={i}>
                  {m.active && (
                    <>
                      <circle cx={m.cx} cy={m.cy} r="18" fill="#00B4D8" fillOpacity="0.1">
                        <animate attributeName="r" from="12" to="22" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="fillOpacity" from="0.2" to="0" dur="2s" repeatCount="indefinite" />
                      </circle>
                    </>
                  )}
                  <circle cx={m.cx} cy={m.cy} r="8" fill={m.active ? "#00B4D8" : "#0077B6"} stroke="white" strokeWidth="1.5" />
                  <circle cx={m.cx} cy={m.cy} r="3" fill="white" />
                  <rect x={m.cx - 45} y={m.cy + 13} width="90" height="28" rx="5" fill="#071428" fillOpacity="0.85" />
                  <text x={m.cx} y={m.cy + 24} fill={m.active ? "#00B4D8" : "#90CAF9"} fontSize="8" fontWeight="bold" textAnchor="middle">{m.label}</text>
                  <text x={m.cx} y={m.cy + 35} fill="#90CAF9" fontSize="7" textAnchor="middle" opacity="0.7">{m.sub}</text>
                </g>
              ))}

              {/* Legend */}
              <g transform="translate(660, 30)">
                <rect width="210" height="75" rx="10" fill="#071428" fillOpacity="0.8" stroke="#00B4D8" strokeWidth="0.5" strokeOpacity="0.3" />
                <circle cx="20" cy="20" r="6" fill="#00B4D8" />
                <text x="34" y="24" fill="white" fontSize="10">Active Fisherman</text>
                <circle cx="20" cy="42" r="6" fill="#0077B6" />
                <text x="34" y="46" fill="white" fontSize="10">Fishing Zone</text>
                <circle cx="14" cy="62" r="5" fill="#00B4D8" fillOpacity="0.2">
                  <animate attributeName="r" from="5" to="10" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="fillOpacity" from="0.3" to="0" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="14" cy="62" r="4" fill="#00B4D8" stroke="white" strokeWidth="1" />
                <text x="28" y="66" fill="white" fontSize="10">Live Tracking</text>
              </g>

              {/* Compass */}
              <g transform="translate(820,400)">
                <circle cx="0" cy="0" r="22" fill="#071428" stroke="#00B4D8" strokeWidth="0.8" strokeOpacity="0.5" />
                <path d="M0,-16 L4,0 L0,4 L-4,0 Z" fill="#00B4D8" />
                <path d="M0,16 L4,0 L0,-4 L-4,0 Z" fill="#1A4070" />
                <text x="0" y="-18" fill="#90CAF9" fontSize="8" textAnchor="middle">N</text>
              </g>
            </svg>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-2">Reviews</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Trusted by Restaurants & Buyers</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map(t => (
              <div key={t.id} className="bg-card rounded-3xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-foreground/80 leading-relaxed mb-6 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3 pt-5 border-t border-border">
                  <div className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center">
                    <span className="text-sm font-bold text-white">{t.initials}</span>
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 bg-gradient-to-br from-[#0077B6] to-[#023E8A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1660278988532-d55143363abb?w=1920&h=400&fit=crop&auto=format)", backgroundSize: "cover" }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Ready for the Freshest<br />Seafood of Your Life?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Join 10,000+ customers and 1,200 fishermen on Indonesia's most trusted seafood marketplace.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setPage("products")}
              className="flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-2xl hover:bg-white/90 transition-all hover:scale-105 shadow-xl">
              <Fish className="w-5 h-5" /> Order Now
            </button>
            <button onClick={() => setPage("fisherman-dashboard")}
              className="flex items-center gap-2 bg-white/10 border border-white/30 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/20 transition-all">
              <Anchor className="w-5 h-5" /> Sell Your Catch
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#071428] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#00B4D8] rounded-lg flex items-center justify-center">
                  <Anchor className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Marine<span className="text-[#00B4D8]">Fresh</span></span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-5">
                Connecting fishermen and seafood lovers across the Aceh archipelago — one catch at a time.
              </p>
              <div className="flex gap-3">
                {[Instagram, Twitter, Facebook].map((Icon, i) => (
                  <div key={i} className="w-9 h-9 bg-white/10 hover:bg-[#00B4D8] rounded-xl flex items-center justify-center cursor-pointer transition-colors">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                ))}
              </div>
            </div>

            {[
              {
                title: "Marketplace",
                links: ["Today's Catch", "All Products", "Fisherman Profiles", "Sustainability"]
              },
              {
                title: "Company",
                links: ["About Us", "How It Works", "Press", "Careers"]
              },
              {
                title: "Contact",
                links: ["support@marinefresh.id", "+62 651 123 4567", "Banda Aceh, Indonesia", "Mon–Sat 06:00–20:00"]
              }
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-white font-bold mb-5">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map(l => (
                    <li key={l}>
                      <span className="text-white/50 hover:text-white text-sm cursor-pointer transition-colors">{l}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">© 2026 MarineFresh. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-emerald-500" />
              <p className="text-white/40 text-sm">Committed to sustainable fishing practices</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── PRODUCTS PAGE ───────────────────────────────────────────────────────────
function ProductsPage({ setPage, setSelectedProduct, addToCart }: {
  setPage: (p: Page) => void;
  setSelectedProduct: (p: Product) => void;
  addToCart: (p: Product) => void;
}) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const cats = ["All", "Fish", "Crustaceans", "Mollusks"];
  const filtered = PRODUCTS.filter(p =>
    (cat === "All" || p.category === cat) &&
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="pt-16 min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B1F3A] to-[#0077B6] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-3">
            <button onClick={() => setPage("home")} className="hover:text-white">Home</button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Today's Catch</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-2">Today's Fresh Catch</h1>
          <p className="text-white/70">Direct from fishermen — updated every few hours</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search + filter bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground w-4 h-4" />
            <input
              value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search fish, prawns, lobster…"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {cats.map(c => (
              <button
                key={c} onClick={() => setCat(c)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${cat === c ? "bg-primary text-white shadow-sm" : "bg-card border border-border text-muted-foreground hover:border-primary/40"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground text-sm">{filtered.length} products available</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Live inventory
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map(p => (
            <CatchCard
              key={p.id} p={p}
              onDetail={() => { setSelectedProduct(p); setPage("product-detail"); }}
              onAdd={() => addToCart(p)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-24 text-center">
            <Fish className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground">No catches match your search. Try a different keyword.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── PRODUCT DETAIL PAGE ────────────────────────────────────────────────────
function ProductDetailPage({ product, setPage, setSelectedFisherman, addToCart }: {
  product: Product;
  setPage: (p: Page) => void;
  setSelectedFisherman: (f: Fisherman) => void;
  addToCart: (p: Product) => void;
}) {
  const [qty, setQty] = useState(1);
  const fisherman = FISHERMEN.find(f => f.id === product.fishermanId)!;

  return (
    <div className="pt-16 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-8">
          <button onClick={() => setPage("home")} className="hover:text-primary">Home</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button onClick={() => setPage("products")} className="hover:text-primary">Catch</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-medium">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <div>
            <div className="rounded-3xl overflow-hidden bg-secondary h-96 shadow-lg">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-card rounded-2xl p-4 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Fishing Depth</p>
                <p className="font-bold text-foreground">{product.depth}</p>
              </div>
              <div className="bg-card rounded-2xl p-4 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Catch Method</p>
                <p className="font-bold text-foreground">{product.method}</p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className={`text-sm font-semibold px-3 py-1.5 rounded-full ${freshnessStyle(product.freshness)}`}>
                {product.freshness}
              </span>
              <span className="text-sm bg-secondary text-primary font-medium px-3 py-1.5 rounded-full">
                {product.category}
              </span>
            </div>
            <h1 className="text-4xl font-extrabold text-foreground mb-2">{product.name}</h1>
            <div className="flex items-baseline gap-2 mb-5">
              <span className="text-3xl font-extrabold text-primary">{rp(product.price)}</span>
              <span className="text-muted-foreground">per kg</span>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { icon: <Package className="w-4 h-4 text-accent" />, label: "Available", val: `${product.weight} kg` },
                { icon: <Clock className="w-4 h-4 text-accent" />, label: "Arrival", val: `In ${product.arrival}` },
                { icon: <MapPin className="w-4 h-4 text-accent" />, label: "Location", val: product.location },
                { icon: <Anchor className="w-4 h-4 text-accent" />, label: "Caught at", val: product.caught },
              ].map(i => (
                <div key={i.label} className="bg-muted rounded-2xl p-4 flex items-center gap-3">
                  {i.icon}
                  <div>
                    <p className="text-xs text-muted-foreground">{i.label}</p>
                    <p className="text-sm font-bold text-foreground">{i.val}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-3 bg-muted rounded-2xl p-1">
                <button onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-9 h-9 rounded-xl bg-card flex items-center justify-center hover:bg-primary hover:text-white transition-colors shadow-sm">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-bold">{qty}</span>
                <button onClick={() => setQty(qty + 1)}
                  className="w-9 h-9 rounded-xl bg-card flex items-center justify-center hover:bg-primary hover:text-white transition-colors shadow-sm">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-muted-foreground text-sm">kg</span>
              <span className="text-base font-bold text-foreground ml-2">= {rp(product.price * qty)}</span>
            </div>
            <button
              onClick={() => { addToCart(product); setPage("cart"); }}
              className="w-full bg-primary text-white font-bold py-4 rounded-2xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/25 mb-3"
            >
              <ShoppingCart className="w-5 h-5" /> Tambah ke Keranjang — {rp(product.price * qty)}
            </button>

            {/* Fisherman card */}
            {fisherman && (
              <div className="mt-8 bg-card rounded-3xl border border-border p-5 flex items-center gap-4">
                <img src={fisherman.avatar} alt={fisherman.name}
                  className="w-16 h-16 rounded-2xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-bold text-foreground">{fisherman.name}</p>
                    {fisherman.verified && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{fisherman.location} · {fisherman.experience}y experience</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-semibold">{fisherman.rating}</span>
                  </div>
                </div>
                <button
                  onClick={() => { setSelectedFisherman(fisherman); setPage("fisherman-profile"); }}
                  className="flex-shrink-0 text-sm font-semibold text-primary border border-primary/30 rounded-xl px-4 py-2 hover:bg-primary/5"
                >
                  Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── FISHERMAN PROFILE PAGE ─────────────────────────────────────────────────
function FishermanProfilePage({ fisherman, setPage, setSelectedProduct, addToCart }: {
  fisherman: Fisherman;
  setPage: (p: Page) => void;
  setSelectedProduct: (p: Product) => void;
  addToCart: (p: Product) => void;
}) {
  const listings = PRODUCTS.filter(p => p.fishermanId === fisherman.id);
  return (
    <div className="pt-16 min-h-screen bg-background">
      {/* Cover */}
      <div className="relative h-56 bg-gradient-to-r from-[#0B1F3A] to-[#0077B6] overflow-hidden">
        <div className="absolute inset-0 opacity-30"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1660278988532-d55143363abb?w=1920&h=256&fit=crop&auto=format)", backgroundSize: "cover" }} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 pb-16">
        <div className="bg-card rounded-3xl border border-border shadow-xl p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 mb-6">
            <div className="relative">
              <img src={fisherman.avatar} alt={fisherman.name}
                className="w-28 h-28 rounded-3xl object-cover border-4 border-white shadow-lg" />
              {fisherman.verified && (
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center border-2 border-white">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h1 className="text-3xl font-extrabold text-foreground">{fisherman.name}</h1>
                <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full">
                  Verified Partner
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
                <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {fisherman.location}</div>
                <div className="flex items-center gap-1"><Anchor className="w-4 h-4" /> {fisherman.boat}</div>
                <div className="flex items-center gap-1"><Award className="w-4 h-4" /> {fisherman.experience} years experience</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span className="text-xl font-extrabold text-amber-700">{fisherman.rating}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { val: fisherman.catches.toLocaleString(), label: "Total Catches" },
              { val: fisherman.experience + "y", label: "Experience" },
              { val: listings.length.toString(), label: "Active Listings" },
            ].map(s => (
              <div key={s.label} className="text-center bg-muted rounded-2xl p-4">
                <p className="text-2xl font-extrabold text-foreground">{s.val}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed mb-5">{fisherman.bio}</p>

          <div className="flex flex-wrap gap-2">
            {fisherman.specialties.map(s => (
              <span key={s} className="bg-secondary text-primary text-sm font-semibold px-4 py-1.5 rounded-full">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Listings */}
        <h2 className="text-2xl font-extrabold text-foreground mb-6">Active Listings ({listings.length})</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {listings.map(p => (
            <CatchCard
              key={p.id} p={p}
              onDetail={() => { setSelectedProduct(p); setPage("product-detail"); }}
              onAdd={() => addToCart(p)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CART PAGE ───────────────────────────────────────────────────────────────
function CartPage({ cart, setCart, setPage }: {
  cart: CartItem[];
  setCart: (c: CartItem[]) => void;
  setPage: (p: Page) => void;
}) {
  const total = cart.reduce((s, i) => s + i.product.price * i.kg, 0);

  const updateKg = (id: number, delta: number) => {
    setCart(cart.map(i => i.product.id === id
      ? { ...i, kg: Math.max(1, i.kg + delta) } : i
    ));
  };
  const remove = (id: number) => setCart(cart.filter(i => i.product.id !== id));

  return (
    <div className="pt-16 min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-extrabold text-foreground mb-8 flex items-center gap-3">
          <ShoppingCart className="w-8 h-8 text-primary" /> Your Cart
          <span className="text-lg font-normal text-muted-foreground">({cart.length} items)</span>
        </h1>

        {cart.length === 0 ? (
          <div className="py-24 text-center bg-card rounded-3xl border border-border">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-30" />
            <p className="text-xl font-bold text-foreground mb-2">Your cart is empty</p>
            <p className="text-muted-foreground mb-6">Explore today's catch and add some fresh seafood!</p>
            <button onClick={() => setPage("products")}
              className="bg-primary text-white font-bold px-8 py-3 rounded-2xl hover:bg-primary/90 transition-colors">
              Browse Catch
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => (
                <div key={item.product.id} className="bg-card rounded-2xl border border-border p-5 flex gap-4">
                  <div className="w-24 h-20 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.product.location}</p>
                    <p className="text-sm text-muted-foreground">{item.product.fisherman}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 bg-muted rounded-xl p-0.5">
                        <button onClick={() => updateKg(item.product.id, -1)}
                          className="w-7 h-7 rounded-lg bg-card flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold">{item.kg}kg</span>
                        <button onClick={() => updateKg(item.product.id, 1)}
                          className="w-7 h-7 rounded-lg bg-card flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-foreground">{rp(item.product.price * item.kg)}</span>
                        <button onClick={() => remove(item.product.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors text-muted-foreground">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-card rounded-3xl border border-border p-6 h-fit">
              <h3 className="font-bold text-foreground text-lg mb-5">Order Summary</h3>
              <div className="space-y-3 mb-5">
                {cart.map(i => (
                  <div key={i.product.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{i.product.name} ({i.kg}kg)</span>
                    <span className="font-semibold">{rp(i.product.price * i.kg)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4 mb-5">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Ongkos Kirim</span>
                  <span className="text-emerald-600 font-semibold">Gratis</span>
                </div>
                <div className="flex justify-between font-extrabold text-xl">
                  <span>Total</span>
                  <span className="text-primary">{rp(total)}</span>
                </div>
              </div>
              <button onClick={() => setPage("checkout")}
                className="w-full bg-primary text-white font-bold py-4 rounded-2xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                <CreditCard className="w-5 h-5" /> Checkout
              </button>
              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                <Shield className="w-3.5 h-3.5" /> Secure, encrypted checkout
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── CHECKOUT PAGE ───────────────────────────────────────────────────────────
function CheckoutPage({ cart, setPage, setCart }: {
  cart: CartItem[];
  setPage: (p: Page) => void;
  setCart: (c: CartItem[]) => void;
}) {
  const [step, setStep] = useState<"delivery" | "payment" | "success">("delivery");
  const total = cart.reduce((s, i) => s + i.product.price * i.kg, 0);

  if (step === "success") return (
    <div className="pt-16 min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-emerald-600" />
        </div>
        <h1 className="text-3xl font-extrabold text-foreground mb-3">Order Confirmed!</h1>
        <p className="text-muted-foreground mb-2">Order <span className="font-bold text-foreground">#MF-2402</span></p>
        <p className="text-muted-foreground mb-8">Your seafood will arrive fresh. Track your delivery in your account dashboard.</p>
        <div className="bg-card rounded-2xl border border-border p-5 mb-8 text-left">
          {cart.map(i => (
            <div key={i.product.id} className="flex justify-between py-2 text-sm border-b border-border last:border-0">
              <span>{i.product.name} ({i.kg}kg)</span>
              <span className="font-bold">{rp(i.product.price * i.kg)}</span>
            </div>
          ))}
          <div className="flex justify-between pt-3 font-extrabold">
            <span>Total</span>
            <span className="text-primary">{rp(total)}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => { setCart([]); setPage("user-dashboard"); }}
            className="flex-1 bg-primary text-white font-bold py-3 rounded-2xl hover:bg-primary/90">
            Track Order
          </button>
          <button onClick={() => { setCart([]); setPage("home"); }}
            className="flex-1 border border-border text-foreground font-bold py-3 rounded-2xl hover:bg-muted">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pt-16 min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-extrabold text-foreground mb-8">Checkout</h1>

        {/* Steps */}
        <div className="flex items-center gap-3 mb-10">
          {["Delivery", "Payment"].map((s, i) => {
            const active = (i === 0 && step === "delivery") || (i === 1 && step === "payment");
            const done = (i === 0 && step === "payment");
            return (
              <div key={s} className="flex items-center gap-3">
                <div className={`flex items-center gap-2 text-sm font-bold ${active ? "text-primary" : done ? "text-emerald-600" : "text-muted-foreground"}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${active ? "bg-primary text-white" : done ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground"}`}>
                    {done ? <CheckCircle className="w-4 h-4" /> : i + 1}
                  </div>
                  {s}
                </div>
                {i < 1 && <div className="w-12 h-0.5 bg-border" />}
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3 space-y-5">
            {step === "delivery" ? (
              <>
                <h2 className="text-xl font-bold text-foreground">Delivery Details</h2>
                {[
                  { label: "Full Name", placeholder: "Ahmad Fauzi" },
                  { label: "Phone Number", placeholder: "+62 812 3456 7890" },
                  { label: "Delivery Address", placeholder: "Jl. Teuku Umar No. 12, Banda Aceh" },
                  { label: "City / District", placeholder: "Banda Aceh" },
                ].map(f => (
                  <div key={f.label}>
                    <label className="block text-sm font-semibold text-foreground mb-2">{f.label}</label>
                    <input placeholder={f.placeholder}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-accent text-sm" />
                  </div>
                ))}
                <button onClick={() => setStep("payment")}
                  className="w-full bg-primary text-white font-bold py-4 rounded-2xl hover:bg-primary/90 transition-colors mt-4">
                  Continue to Payment
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold text-foreground">Payment</h2>
                {[
                  { label: "Card Number", placeholder: "4242 4242 4242 4242" },
                  { label: "Cardholder Name", placeholder: "AHMAD FAUZI" },
                ].map(f => (
                  <div key={f.label}>
                    <label className="block text-sm font-semibold text-foreground mb-2">{f.label}</label>
                    <input placeholder={f.placeholder}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-accent text-sm" />
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Expiry</label>
                    <input placeholder="MM / YY"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-accent text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">CVV</label>
                    <input placeholder="123"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-accent text-sm" />
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button onClick={() => setStep("delivery")}
                    className="flex-1 border border-border text-foreground font-bold py-4 rounded-2xl hover:bg-muted">
                    Back
                  </button>
                  <button onClick={() => setStep("success")}
                    className="flex-1 bg-primary text-white font-bold py-4 rounded-2xl hover:bg-primary/90">
                    Bayar — {rp(total)}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mini summary */}
          <div className="md:col-span-2 bg-card rounded-3xl border border-border p-5 h-fit">
            <h3 className="font-bold text-foreground mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              {cart.map(i => (
                <div key={i.product.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground truncate mr-2">{i.product.name} {i.kg}kg</span>
                  <span className="font-semibold flex-shrink-0">{rp(i.product.price * i.kg)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 flex justify-between font-extrabold">
              <span>Total</span>
              <span className="text-primary">{rp(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── USER DASHBOARD ──────────────────────────────────────────────────────────
function UserDashboard({ setPage }: { setPage: (p: Page) => void }) {
  const [tab, setTab] = useState<"orders" | "profile">("orders");

  return (
    <div className="pt-16 min-h-screen bg-background">
      <div className="bg-gradient-to-r from-[#0B1F3A] to-[#0077B6] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white">Ahmad Fauzi</h1>
              <p className="text-white/70">ahmad.fauzi@email.com · Member since Jan 2025</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Orders", val: "24", icon: <Package className="w-5 h-5 text-primary" /> },
            { label: "Total Spent", val: "Rp 19,8 Jt", icon: <CreditCard className="w-5 h-5 text-accent" /> },
            { label: "Fishermen Followed", val: "8", icon: <Heart className="w-5 h-5 text-red-400" /> },
            { label: "Avg Rating Given", val: "4.9", icon: <Star className="w-5 h-5 text-amber-400" /> },
          ].map(s => (
            <div key={s.label} className="bg-card rounded-2xl border border-border p-5 flex items-center gap-4">
              <div className="w-11 h-11 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                {s.icon}
              </div>
              <div>
                <p className="text-2xl font-extrabold text-foreground">{s.val}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-muted rounded-xl p-1 w-fit mb-8">
          {(["orders", "profile"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all capitalize ${tab === t ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {t === "orders" ? "Order History" : "My Profile"}
            </button>
          ))}
        </div>

        {tab === "orders" && (
          <div className="bg-card rounded-3xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Product</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Total</th>
                    <th className="px-6 py-4" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {ORDERS_DATA.map(o => (
                    <tr key={o.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 text-sm font-mono font-bold text-primary">{o.id}</td>
                      <td className="px-6 py-4 text-sm font-medium text-foreground">{o.product}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{o.date}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusStyle(o.status)}`}>{o.status}</span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-foreground">{rp(o.total)}</td>
                      <td className="px-6 py-4">
                        <button className="text-xs text-primary font-semibold hover:underline">Track</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "profile" && (
          <div className="max-w-lg bg-card rounded-3xl border border-border p-8 space-y-5">
            {[
              { label: "Full Name", val: "Ahmad Fauzi" },
              { label: "Email", val: "ahmad.fauzi@email.com" },
              { label: "Phone", val: "+62 812 3456 7890" },
              { label: "City", val: "Banda Aceh" },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-sm font-semibold text-foreground mb-2">{f.label}</label>
                <input defaultValue={f.val}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent text-sm" />
              </div>
            ))}
            <button className="w-full bg-primary text-white font-bold py-3 rounded-2xl hover:bg-primary/90 transition-colors">
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── FISHERMAN DASHBOARD ─────────────────────────────────────────────────────
function FishermanDashboard({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="pt-16 min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#071428] to-[#0B1F3A] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <img src={FISHERMEN[0].avatar} alt="" className="w-16 h-16 rounded-2xl object-cover" />
            <div>
              <h1 className="text-2xl font-extrabold text-white">Ahmad Rasyid</h1>
              <p className="text-white/70">Kapal Biru Laut · Banda Aceh</p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-[#00B4D8] hover:bg-[#0077B6] text-white font-bold px-5 py-3 rounded-2xl transition-colors">
            <Plus className="w-4 h-4" /> List New Catch
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "This Month Revenue", val: "Rp 91M", trend: "+34%", up: true, icon: <TrendingUp className="w-5 h-5 text-emerald-600" /> },
            { label: "Active Listings", val: "3", trend: "live now", up: true, icon: <Fish className="w-5 h-5 text-primary" /> },
            { label: "Orders This Month", val: "47", trend: "+12%", up: true, icon: <Package className="w-5 h-5 text-accent" /> },
            { label: "Avg Rating", val: "4.9", trend: "1,240 reviews", up: true, icon: <Star className="w-5 h-5 text-amber-400" /> },
          ].map(s => (
            <div key={s.label} className="bg-card rounded-2xl border border-border p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">{s.icon}</div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${s.up ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                  {s.trend}
                </span>
              </div>
              <p className="text-2xl font-extrabold text-foreground">{s.val}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Revenue chart */}
          <div className="lg:col-span-2 bg-card rounded-3xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-foreground">Monthly Revenue</h2>
              <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">Jan–Jun 2026</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={REVENUE_DATA} margin={{ top: 5, right: 10, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0077B6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#0077B6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#5B7FA6" }} />
                <YAxis tick={{ fontSize: 12, fill: "#5B7FA6" }} />
                <Tooltip formatter={(v: number) => [`Rp ${v}M`, "Revenue"]} />
                <Area type="monotone" dataKey="revenue" stroke="#0077B6" strokeWidth={2.5} fill="url(#revGrad)" dot={{ fill: "#0077B6", r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Recent orders */}
          <div className="bg-card rounded-3xl border border-border p-6">
            <h2 className="text-lg font-bold text-foreground mb-5">Recent Orders</h2>
            <div className="space-y-4">
              {ORDERS_DATA.slice(0, 4).map(o => (
                <div key={o.id} className="flex items-center gap-3 pb-4 border-b border-border last:border-0">
                  <div className="w-9 h-9 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                    <Package className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{o.product}</p>
                    <p className="text-xs text-muted-foreground">{o.id} · {o.date}</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full flex-shrink-0 ${statusStyle(o.status)}`}>
                    {o.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active listings */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-foreground mb-5">My Active Listings</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRODUCTS.filter(p => p.fishermanId === 1).map(p => (
              <div key={p.id} className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="h-36 bg-secondary overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-foreground">{p.name}</h3>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${freshnessStyle(p.freshness)}`}>{p.freshness}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{rp(p.price)}/kg · {p.weight}kg tersisa</span>
                    <span className="text-emerald-600 font-semibold">Live</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 text-xs font-bold text-primary border border-primary/30 rounded-xl py-2 hover:bg-primary/5">Edit</button>
                    <button className="flex-1 text-xs font-bold text-red-500 border border-red-200 rounded-xl py-2 hover:bg-red-50">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedFisherman, setSelectedFisherman] = useState<Fisherman | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (p: Product) => {
    setCart(prev => {
      const exists = prev.find(i => i.product.id === p.id);
      if (exists) return prev.map(i => i.product.id === p.id ? { ...i, kg: i.kg + 1 } : i);
      return [...prev, { product: p, kg: 1 }];
    });
  };

  const nav = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar page={page} setPage={nav} cartCount={cart.reduce((s, i) => s + i.kg, 0)} />

      {page === "home" && (
        <HomePage
          setPage={nav}
          setSelectedProduct={setSelectedProduct}
          setSelectedFisherman={setSelectedFisherman}
          addToCart={addToCart}
        />
      )}
      {page === "products" && (
        <ProductsPage
          setPage={nav}
          setSelectedProduct={setSelectedProduct}
          addToCart={addToCart}
        />
      )}
      {page === "product-detail" && selectedProduct && (
        <ProductDetailPage
          product={selectedProduct}
          setPage={nav}
          setSelectedFisherman={setSelectedFisherman}
          addToCart={addToCart}
        />
      )}
      {page === "product-detail" && !selectedProduct && (
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <button onClick={() => nav("products")} className="text-primary font-semibold">← Back to products</button>
        </div>
      )}
      {page === "fisherman-profile" && selectedFisherman && (
        <FishermanProfilePage
          fisherman={selectedFisherman}
          setPage={nav}
          setSelectedProduct={setSelectedProduct}
          addToCart={addToCart}
        />
      )}
      {page === "fisherman-profile" && !selectedFisherman && (
        <div className="pt-16 flex flex-col items-center justify-center min-h-screen gap-6">
          <p className="text-muted-foreground">Browse our featured fishermen:</p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl px-4">
            {FISHERMEN.map(f => (
              <FishermanCard key={f.id} f={f} onClick={() => { setSelectedFisherman(f); }} />
            ))}
          </div>
        </div>
      )}
      {page === "cart" && (
        <CartPage cart={cart} setCart={setCart} setPage={nav} />
      )}
      {page === "checkout" && (
        <CheckoutPage cart={cart} setPage={nav} setCart={setCart} />
      )}
      {page === "user-dashboard" && (
        <UserDashboard setPage={nav} />
      )}
      {page === "fisherman-dashboard" && (
        <FishermanDashboard setPage={nav} />
      )}
    </div>
  );
}
