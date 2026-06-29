import { useState } from "react";
import { Anchor, User, Mail, Phone, Lock, MapPin, FileText, Navigation, Camera, CheckCircle, ChevronRight, ArrowRight, Zap, Shield, TrendingUp, Leaf } from "lucide-react";
import { useNavigationContext } from "../../context/NavigationContext";
import { useAuthContext } from "../../context/AuthContext";
import { BackButton } from "../../components/common/BackButton";
import { RegisterRole } from "../../types";

export function RegisterPage() {
  const { navigate } = useNavigationContext();
  const { setRole } = useAuthContext();
  const [step, setStep] = useState<1 | 2>(1);
  const [role, setLocalRole] = useState<RegisterRole>("fisherman");

  const fishermanFields = [
    { label: "Nama Lengkap", placeholder: "Ahmad Rasyid", type: "text", icon: <User className="w-4 h-4" /> },
    { label: "Email", placeholder: "nama@email.com", type: "email", icon: <Mail className="w-4 h-4" /> },
    { label: "Nomor HP / WhatsApp", placeholder: "+62 812 3456 7890", type: "tel", icon: <Phone className="w-4 h-4" /> },
    { label: "Password", placeholder: "Min. 8 karakter", type: "password", icon: <Lock className="w-4 h-4" /> },
    { label: "Pelabuhan Asal", placeholder: "Pelabuhan Lampulo, Banda Aceh", type: "text", icon: <Anchor className="w-4 h-4" /> },
    { label: "Area Penangkapan", placeholder: "Perairan Aceh Utara / Selat Malaka", type: "text", icon: <MapPin className="w-4 h-4" /> },
    { label: "ID Nelayan (opsional)", placeholder: "Nomor kartu nelayan / KTP", type: "text", icon: <FileText className="w-4 h-4" /> },
  ];

  const buyerFields = [
    { label: "Nama Lengkap", placeholder: "Budi Santoso", type: "text", icon: <User className="w-4 h-4" /> },
    { label: "Email", placeholder: "nama@email.com", type: "email", icon: <Mail className="w-4 h-4" /> },
    { label: "Nomor HP / WhatsApp", placeholder: "+62 812 3456 7890", type: "tel", icon: <Phone className="w-4 h-4" /> },
    { label: "Password", placeholder: "Min. 8 karakter", type: "password", icon: <Lock className="w-4 h-4" /> },
    { label: "Alamat Pengiriman", placeholder: "Jl. Teuku Umar No. 12, Banda Aceh", type: "text", icon: <MapPin className="w-4 h-4" /> },
    { label: "Kota / Kabupaten", placeholder: "Banda Aceh", type: "text", icon: <Navigation className="w-4 h-4" /> },
  ];

  const fields = role === "fisherman" ? fishermanFields : buyerFields;

  return (
    <div className="min-h-screen flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-[40%] relative overflow-hidden flex-col justify-between"
        style={{ background: "linear-gradient(160deg, #071428 0%, #0B1F3A 60%, #023E8A 100%)" }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle, #00B4D8 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="relative px-10 pt-10">
          <div className="flex items-center gap-2.5 mb-12">
            <div className="w-9 h-9 bg-[#00B4D8] rounded-xl flex items-center justify-center">
              <Anchor className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-extrabold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Nela<span className="text-[#00B4D8]">yani</span>
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Bergabung dengan<br />
            <span className="text-[#00B4D8]">Komunitas</span><br />
            Nelayani
          </h2>
          <p className="text-white/60 leading-relaxed">
            Lebih dari 1.200 nelayan dan 10.000 pembeli telah bergabung. Jadilah bagian dari ekosistem seafood terbaik Indonesia.
          </p>
        </div>

        {/* Feature list */}
        <div className="relative px-10 pb-12 space-y-4">
          {[
            { icon: <Zap className="w-4 h-4" />, text: "Gratis daftar & tanpa komisi di awal" },
            { icon: <Shield className="w-4 h-4" />, text: "Transaksi aman & terverifikasi" },
            { icon: <TrendingUp className="w-4 h-4" />, text: "Analitik penjualan real-time" },
            { icon: <Leaf className="w-4 h-4" />, text: "Dukung perikanan berkelanjutan" },
          ].map(f => (
            <div key={f.text} className="flex items-center gap-3">
              <div className="w-7 h-7 bg-[#00B4D8]/20 rounded-lg flex items-center justify-center text-[#00B4D8]">
                {f.icon}
              </div>
              <p className="text-white/70 text-sm">{f.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 bg-background overflow-y-auto px-6 py-10 flex items-start justify-center">
        <div className="w-full max-w-lg">
          <BackButton onClick={() => navigate("login")} label="Pilih Peran" />

          {/* Step indicator */}
          <div className="flex items-center gap-3 mb-8">
            {[1, 2].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step >= s ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                }`}>
                  {step > s ? <CheckCircle className="w-4 h-4" /> : s}
                </div>
                <span className={`text-sm font-medium ${step >= s ? "text-foreground" : "text-muted-foreground"}`}>
                  {s === 1 ? "Pilih Peran" : "Isi Data"}
                </span>
                {s < 2 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
              </div>
            ))}
          </div>

          {step === 1 ? (
            <>
              <h2 className="text-3xl font-extrabold text-foreground mb-2">Daftar Akun Baru</h2>
              <p className="text-muted-foreground mb-8">Pilih peran Anda di Nelayani</p>
              <div className="grid gap-4">
                {([
                  {
                    r: "fisherman" as RegisterRole, emoji: "🎣",
                    title: "Nelayan / Supplier",
                    desc: "Jual tangkapan langsung ke pembeli. Kelola stok, lacak pesanan, dan pantau penghasilan Anda secara real-time.",
                    perks: ["Listing produk gratis", "Dashboard penjualan lengkap", "Pembayaran langsung"]
                  },
                  {
                    r: "buyer" as RegisterRole, emoji: "🛒",
                    title: "Pembeli / Konsumen",
                    desc: "Beli seafood segar langsung dari nelayan. Lacak pengiriman dan nikmati kualitas terbaik setiap hari.",
                    perks: ["Harga langsung dari nelayan", "Lacak kesegaran & asal ikan", "Gratis ongkir perdana"]
                  }
                ] as const).map(item => (
                  <button
                    key={item.r}
                    onClick={() => setLocalRole(item.r)}
                    className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-200 ${
                      role === item.r
                        ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                        : "border-border hover:border-primary/40 hover:bg-muted/30"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{item.emoji}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-bold text-foreground text-base">{item.title}</p>
                          {role === item.r && (
                            <CheckCircle className="w-4 h-4 text-primary" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{item.desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {item.perks.map(p => (
                            <span key={p} className="text-xs bg-secondary text-primary font-medium px-2.5 py-1 rounded-full">
                              ✓ {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(2)}
                className="w-full mt-6 bg-primary text-white font-bold py-4 rounded-2xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                Lanjutkan sebagai {role === "fisherman" ? "Nelayan" : "Pembeli"} <ArrowRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="text-2xl">{role === "fisherman" ? "🎣" : "🛒"}</div>
                <div>
                  <h2 className="text-2xl font-extrabold text-foreground">
                    Daftar sebagai {role === "fisherman" ? "Nelayan" : "Pembeli"}
                  </h2>
                  <p className="text-muted-foreground text-sm">Isi data diri Anda di bawah ini</p>
                </div>
              </div>

              {/* Photo upload for fisherman */}
              {role === "fisherman" && (
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-foreground mb-2">Foto Profil</label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-muted border border-border flex items-center justify-center">
                      <Camera className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <button className="text-sm font-semibold text-primary border border-primary/30 rounded-xl px-4 py-2 hover:bg-primary/5 transition-colors">
                        Unggah Foto
                      </button>
                      <p className="text-xs text-muted-foreground mt-1">JPG, PNG · Maks. 5MB</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4 mb-6">
                {fields.map(f => (
                  <div key={f.label}>
                    <label className="block text-sm font-semibold text-foreground mb-2">{f.label}</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">{f.icon}</span>
                      <input
                        type={f.type} placeholder={f.placeholder}
                        className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <label className="flex items-start gap-2.5 mb-6 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 mt-0.5 rounded border-border text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  Saya menyetujui <span className="text-primary font-semibold">Syarat & Ketentuan</span> dan{" "}
                  <span className="text-primary font-semibold">Kebijakan Privasi</span> Nelayani
                </span>
              </label>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)}
                  className="flex-1 border border-border text-foreground font-bold py-3.5 rounded-2xl hover:bg-muted transition-colors">
                  Kembali
                </button>
                <button onClick={() => {
                  setRole(role);
                  navigate(role === "fisherman" ? "f-dashboard" : "home");
                }}
                  className="flex-1 bg-primary text-white font-bold py-3.5 rounded-2xl hover:bg-primary/90 transition-colors">
                  Buat Akun
                </button>
              </div>
            </>
          )}

          <p className="text-center text-sm text-muted-foreground mt-6">
            Sudah punya akun?{" "}
            <button onClick={() => navigate("login")} className="text-primary font-bold hover:underline">Masuk</button>
          </p>
        </div>
      </div>
    </div>
  );
}
