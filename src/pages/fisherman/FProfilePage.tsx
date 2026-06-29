import { Star, Camera } from "lucide-react";
import { useNavigationContext } from "../../context/NavigationContext";
import { BackButton } from "../../components/common/BackButton";

export function FProfilePage() {
  const { navigate } = useNavigationContext();

  return (
    <div className="p-8 max-w-2xl">
      <BackButton onClick={() => navigate("f-dashboard")} />
      <h1 className="text-2xl font-extrabold mb-8">Profil Nelayan</h1>
      <div className="bg-card rounded-3xl border border-border p-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1541064828014-503911d13103?w=100&h=100&fit=crop" alt="" className="w-24 h-24 rounded-3xl object-cover" />
            <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-xl flex items-center justify-center border-2 border-white"><Camera className="w-3.5 h-3.5 text-white" /></button>
          </div>
          <div>
            <h2 className="text-xl font-extrabold">Ahmad Rasyid</h2>
            <p className="text-muted-foreground">Nelayan Terverifikasi · Banda Aceh</p>
            <div className="flex items-center gap-1 mt-1"><Star className="w-4 h-4 text-amber-500 fill-amber-500" /><span className="font-bold text-sm">4.9</span><span className="text-muted-foreground text-sm">(1.240 ulasan)</span></div>
          </div>
        </div>
        <div className="space-y-4">
          {[
            { label: "Nama Lengkap", val: "Ahmad Rasyid" },
            { label: "Email", val: "ahmad.rasyid@nelayan.id" },
            { label: "Nomor HP", val: "+62 811 9876 5432" },
            { label: "Pelabuhan Asal", val: "Pelabuhan Lampulo, Banda Aceh" },
            { label: "Area Penangkapan", val: "Perairan Aceh Utara & Selat Malaka" },
            { label: "Nama Kapal", val: "Kapal Biru Laut" },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-sm font-semibold mb-2">{f.label}</label>
              <input defaultValue={f.val} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>
          ))}
        </div>
        <button className="mt-6 w-full bg-primary text-white font-bold py-3.5 rounded-2xl hover:bg-primary/90 transition-colors">Simpan Perubahan</button>
      </div>
    </div>
  );
}
