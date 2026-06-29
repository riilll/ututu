import { useState } from "react";
import { ArrowLeft, Camera, Fish, Anchor, DollarSign, Edit3, Save, Eye, Zap, Star, Search, ChevronDown, MapPin, Clock, Calendar, Truck, Package, Navigation, CheckCircle, Plus } from "lucide-react";
import { useNavigationContext } from "../../context/NavigationContext";
import { ImageUploadArea } from "../../components/product/ImageUploadArea";
import { PRODUCTS, FISH_OPTIONS } from "../../data";
import { rp } from "../../utils";

export function NewCatchPage() {
  const { navigate } = useNavigationContext();
  const [images, setImages] = useState<string[]>([]);
  const [fishName, setFishName] = useState("");
  const [showFishDrop, setShowFishDrop] = useState(false);
  const [category, setCategory] = useState("Ikan");
  const [freshness, setFreshness] = useState("Ultra Fresh");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [location, setLocation] = useState("");
  const [port, setPort] = useState("");
  const [description, setDescription] = useState("");
  const [saved, setSaved] = useState(false);

  const filteredFish = FISH_OPTIONS.filter(f => f.toLowerCase().includes(fishName.toLowerCase()) && fishName.length > 0);

  const CATEGORIES = [
    { id: "Ikan", label: "Ikan", emoji: "🐟" },
    { id: "Udang", label: "Udang", emoji: "🦐" },
    { id: "Kerang", label: "Kerang", emoji: "🦪" },
    { id: "Cumi-cumi", label: "Cumi-cumi", emoji: "🦑" },
    { id: "Lainnya", label: "Lainnya", emoji: "🌊" },
  ];

  const FRESHNESS_OPTS = [
    { id: "Ultra Fresh", label: "Ultra Segar", desc: "< 2 jam dari laut", color: "border-emerald-400 bg-emerald-50", badge: "bg-emerald-500" },
    { id: "Very Fresh", label: "Sangat Segar", desc: "2–6 jam dari laut", color: "border-teal-400 bg-teal-50", badge: "bg-teal-500" },
    { id: "Fresh", label: "Segar", desc: "6–12 jam dari laut", color: "border-blue-400 bg-blue-50", badge: "bg-blue-500" },
    { id: "Frozen", label: "Beku", desc: "Diproses & dibekukan", color: "border-slate-400 bg-slate-50", badge: "bg-slate-500" },
  ];

  const handlePublish = () => { setSaved(true); setTimeout(() => { navigate("f-listings"); }, 1500); };

  if (saved) return (
    <div className="flex items-center justify-center min-h-screen bg-[#F0F8FF]">
      <div className="text-center">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-10 h-10 text-emerald-600" /></div>
        <h2 className="text-2xl font-extrabold text-foreground mb-2">Tangkapan Dipublikasikan!</h2>
        <p className="text-muted-foreground">Listing Anda kini aktif dan dapat ditemukan pembeli.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F0F8FF]">
      {/* Page header */}
      <div className="bg-white border-b border-border px-8 py-5 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("f-dashboard")}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm font-semibold transition-colors group">
            <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            Kembali
          </button>
          <div className="h-5 w-px bg-border" />
          <div>
            <h1 className="text-xl font-extrabold text-foreground">Tambah Tangkapan Baru</h1>
            <p className="text-xs text-muted-foreground">Isi detail tangkapan Anda untuk dipasarkan</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 text-sm font-semibold text-muted-foreground border border-border rounded-xl px-4 py-2.5 hover:border-primary/40 hover:text-primary transition-all">
            <Save className="w-4 h-4" /> Simpan Draft
          </button>
          <button className="flex items-center gap-2 text-sm font-semibold text-foreground border border-border rounded-xl px-4 py-2.5 hover:bg-muted transition-all">
            <Eye className="w-4 h-4" /> Preview
          </button>
          <button onClick={handlePublish}
            className="flex items-center gap-2 text-sm font-bold text-white bg-primary rounded-xl px-5 py-2.5 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            <Zap className="w-4 h-4" /> Publikasikan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_300px] gap-0 max-w-none">
        {/* Main form */}
        <div className="p-8 space-y-6 overflow-y-auto">

          {/* Section: Images */}
          <div className="bg-white rounded-3xl border border-border shadow-sm p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center"><Camera className="w-4 h-4 text-primary" /></div>
              <div><h2 className="font-bold text-foreground">Foto Produk</h2><p className="text-xs text-muted-foreground">Tambahkan hingga 5 foto · Foto pertama jadi thumbnail utama</p></div>
            </div>
            <ImageUploadArea images={images} onAdd={src => setImages(p => [...p, src])} onRemove={i => setImages(p => p.filter((_, idx) => idx !== i))} />
            {images.length === 0 && (
              <div className="mt-4 flex gap-3">
                <p className="text-xs text-muted-foreground">Foto contoh:</p>
                {PRODUCTS.slice(0, 4).map(p => (
                  <button key={p.id} onClick={() => setImages(prev => [...prev, p.image])}
                    className="w-12 h-10 rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-colors flex-shrink-0">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </button>
                ))}
                <span className="text-xs text-muted-foreground self-center">← klik untuk demo</span>
              </div>
            )}
          </div>

          {/* Section: Fish Info */}
          <div className="bg-white rounded-3xl border border-border shadow-sm p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-accent/10 rounded-xl flex items-center justify-center"><Fish className="w-4 h-4 text-accent" /></div>
              <h2 className="font-bold text-foreground">Informasi Ikan</h2>
            </div>

            {/* Fish name with dropdown */}
            <div className="mb-5 relative">
              <label className="block text-sm font-semibold text-foreground mb-2">Nama Ikan <span className="text-red-500">*</span></label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={fishName}
                  onChange={e => { setFishName(e.target.value); setShowFishDrop(true); }}
                  onFocus={() => setShowFishDrop(true)}
                  placeholder="Cari atau ketik nama ikan…"
                  className="w-full pl-10 pr-10 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button onClick={() => setShowFishDrop(!showFishDrop)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFishDrop ? "rotate-180" : ""}`} />
                </button>
              </div>
              {showFishDrop && (filteredFish.length > 0 || fishName.length === 0) && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-2xl shadow-xl z-20 overflow-hidden max-h-52 overflow-y-auto">
                  {(fishName.length === 0 ? FISH_OPTIONS : filteredFish).map(f => (
                    <button key={f} onClick={() => { setFishName(f); setShowFishDrop(false); }}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-muted/50 transition-colors flex items-center gap-2 border-b border-border last:border-0">
                      <Fish className="w-3.5 h-3.5 text-muted-foreground" /> {f}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Category */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-foreground mb-3">Kategori <span className="text-red-500">*</span></label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(c => (
                  <button key={c.id} onClick={() => setCategory(c.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                      category === c.id ? "border-primary bg-primary/5 text-primary shadow-sm" : "border-border text-muted-foreground hover:border-primary/30"
                    }`}>
                    <span>{c.emoji}</span> {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Freshness */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Kondisi Kesegaran <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {FRESHNESS_OPTS.map(f => (
                  <button key={f.id} onClick={() => setFreshness(f.id)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      freshness === f.id ? f.color + " shadow-sm" : "border-border hover:border-muted-foreground/30"
                    }`}>
                    <div className={`w-3 h-3 rounded-full ${f.badge} mb-2`} />
                    <p className="font-bold text-foreground text-sm">{f.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{f.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section: Catch Details */}
          <div className="bg-white rounded-3xl border border-border shadow-sm p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center"><Anchor className="w-4 h-4 text-emerald-600" /></div>
              <h2 className="font-bold text-foreground">Detail Tangkapan</h2>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Tanggal Tangkap <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="date" defaultValue="2026-06-29"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Waktu Tangkap <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="time" defaultValue="06:30"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                </div>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-foreground mb-2">Lokasi Tangkap (GPS) <span className="text-red-500">*</span></label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="Perairan Aceh Utara / masukkan koordinat GPS"
                    className="w-full pl-10 pr-32 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <button onClick={() => setLocation("5°33'48\"N 95°19'12\"E — Perairan Aceh Utara")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold px-3 py-1.5 rounded-lg transition-colors">
                    <Navigation className="w-3.5 h-3.5" /> Deteksi GPS
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Estimasi Tiba di Pelabuhan</label>
                <div className="relative">
                  <Truck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="time" defaultValue="14:00"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Pelabuhan Tujuan</label>
                <div className="relative">
                  <Anchor className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    value={port}
                    onChange={e => setPort(e.target.value)}
                    placeholder="Pelabuhan Lampulo, Banda Aceh"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Price & Stock */}
          <div className="bg-white rounded-3xl border border-border shadow-sm p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center"><DollarSign className="w-4 h-4 text-amber-600" /></div>
              <h2 className="font-bold text-foreground">Harga & Stok</h2>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Harga per Kg (IDR) <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">Rp</span>
                  <input
                    value={price}
                    onChange={e => setPrice(e.target.value.replace(/\D/g, ""))}
                    placeholder="450.000"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                {price && <p className="text-xs text-muted-foreground mt-1.5">= {rp(parseInt(price) || 0)}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Stok Tersedia (Kg) <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Package className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    value={stock}
                    onChange={e => setStock(e.target.value)}
                    placeholder="45"
                    type="number" min="0"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                {stock && price && <p className="text-xs text-emerald-600 font-semibold mt-1.5">Total nilai: {rp((parseInt(stock) || 0) * (parseInt(price) || 0))}</p>}
              </div>
            </div>
          </div>

          {/* Section: Description */}
          <div className="bg-white rounded-3xl border border-border shadow-sm p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-purple-100 rounded-xl flex items-center justify-center"><Edit3 className="w-4 h-4 text-purple-600" /></div>
              <h2 className="font-bold text-foreground">Deskripsi Produk</h2>
            </div>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Ceritakan tentang tangkapan Anda…"
              rows={5}
              className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none"
            />
            <div className="flex justify-between mt-2">
              <p className="text-xs text-muted-foreground">Minimal 30 karakter untuk meningkatkan kepercayaan pembeli</p>
              <p className="text-xs text-muted-foreground">{description.length} karakter</p>
            </div>
          </div>

          {/* Bottom actions */}
          <div className="flex gap-3 pb-4">
            <button className="flex items-center gap-2 text-sm font-semibold text-muted-foreground border border-border rounded-2xl px-5 py-3.5 hover:border-primary/40 hover:text-primary transition-all bg-white">
              <Save className="w-4 h-4" /> Simpan Draft
            </button>
            <button className="flex items-center gap-2 text-sm font-semibold text-foreground border border-border rounded-2xl px-5 py-3.5 hover:bg-muted transition-all bg-white">
              <Eye className="w-4 h-4" /> Preview Listing
            </button>
            <button onClick={handlePublish}
              className="flex-1 flex items-center justify-center gap-2 text-sm font-bold text-white bg-primary rounded-2xl py-3.5 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
              <Zap className="w-4 h-4" /> Publikasikan Tangkapan
            </button>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="border-l border-border bg-white p-6 space-y-5 overflow-y-auto sticky top-[73px] h-[calc(100vh-73px)]">

          {/* Progress */}
          <div className="bg-gradient-to-br from-primary to-[#023E8A] rounded-2xl p-5 text-white">
            <p className="text-xs font-bold uppercase tracking-wider mb-3 text-white/70">Kelengkapan Form</p>
            <div className="flex items-end justify-between mb-2">
              <span className="text-3xl font-extrabold">
                {Math.round(([fishName, category, freshness, price, stock, location].filter(Boolean).length / 6) * 100)}%
              </span>
              <span className="text-white/70 text-sm">lengkap</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-white rounded-full h-2 transition-all duration-500"
                style={{ width: `${Math.round(([fishName, category, freshness, price, stock, location].filter(Boolean).length / 6) * 100)}%` }}
              />
            </div>
          </div>

          {/* Tips */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-amber-400 rounded-lg flex items-center justify-center">
                <Camera className="w-3.5 h-3.5 text-white" />
              </div>
              <h3 className="font-bold text-amber-800 text-sm">Tips Foto Menarik</h3>
            </div>
            <ul className="space-y-2">
              {[
                "Gunakan cahaya alami pagi hari",
                "Foto dari berbagai sudut",
                "Tampilkan kesegaran ikan (mata jernih, insang merah)",
                "Sertakan timbangan untuk menunjukkan berat",
                "Latar belakang bersih & kontras",
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-amber-700">
                  <span className="w-4 h-4 bg-amber-200 text-amber-700 rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Catch status today */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-bold text-foreground text-sm mb-4">Status Hari Ini</h3>
            <div className="space-y-3">
              {[
                { label: "Listing aktif", val: "3", color: "text-emerald-600" },
                { label: "Pesanan masuk", val: "7", color: "text-primary" },
                { label: "Pending konfirmasi", val: "2", color: "text-amber-600" },
                { label: "Pendapatan hari ini", val: "Rp 4,2 Jt", color: "text-emerald-600" },
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className={`text-sm font-bold ${s.color}`}>{s.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Profile completion */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <img src="https://images.unsplash.com/photo-1541064828014-503911d13103?w=40&h=40&fit=crop" alt="" className="w-10 h-10 rounded-xl object-cover" />
              <div>
                <p className="font-bold text-sm text-foreground">Ahmad Rasyid</p>
                <div className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-500 fill-amber-500" /><span className="text-xs font-semibold">4.9</span></div>
              </div>
            </div>
            <p className="text-xs font-bold text-muted-foreground mb-2">Profil 85% lengkap</p>
            <div className="w-full bg-muted rounded-full h-1.5 mb-3">
              <div className="bg-primary rounded-full h-1.5 w-[85%]" />
            </div>
            <p className="text-xs text-muted-foreground">Lengkapi profil untuk meningkatkan kepercayaan pembeli dan peringkat pencarian.</p>
            <button onClick={() => navigate("f-profile")} className="mt-3 w-full text-xs font-semibold text-primary border border-primary/30 rounded-xl py-2 hover:bg-primary/5 transition-colors">
              Lengkapi Profil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
