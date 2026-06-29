import { Plus, Edit3, Trash2 } from "lucide-react";
import { useNavigationContext } from "../../context/NavigationContext";
import { BackButton } from "../../components/common/BackButton";
import { PRODUCTS } from "../../data";
import { freshnessStyle, rp } from "../../utils";

export function FListingsPage() {
  const { navigate } = useNavigationContext();

  return (
    <div className="p-8">
      <BackButton onClick={() => navigate("f-dashboard")} />
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-2xl font-extrabold text-foreground">Daftar Produk Saya</h1><p className="text-muted-foreground">Kelola listing tangkapan Anda</p></div>
        <button onClick={() => navigate("f-new-catch")} className="flex items-center gap-2 bg-primary text-white font-bold px-5 py-3 rounded-2xl hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" /> Tambah Tangkapan
        </button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {PRODUCTS.filter(p => p.fishermanId === 1).map(p => (
          <div key={p.id} className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="h-40 bg-secondary overflow-hidden"><img src={p.image} alt={p.name} className="w-full h-full object-cover" /></div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-foreground">{p.name}</h3>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${freshnessStyle(p.freshness)}`}>{p.freshness}</span>
              </div>
              <div className="flex items-center justify-between text-sm mb-3">
                <span className="text-muted-foreground">{rp(p.price)}/kg · {p.weight}kg tersisa</span>
                <span className="text-emerald-600 font-bold">● Live</span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 text-xs font-bold text-primary border border-primary/30 rounded-xl py-2 hover:bg-primary/5 flex items-center justify-center gap-1"><Edit3 className="w-3 h-3" /> Edit</button>
                <button className="flex-1 text-xs font-bold text-red-500 border border-red-200 rounded-xl py-2 hover:bg-red-50 flex items-center justify-center gap-1"><Trash2 className="w-3 h-3" /> Hapus</button>
              </div>
            </div>
          </div>
        ))}
        <button onClick={() => navigate("f-new-catch")} className="rounded-2xl border-2 border-dashed border-border hover:border-primary/50 min-h-[280px] flex flex-col items-center justify-center gap-3 hover:bg-primary/5 transition-all cursor-pointer">
          <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center"><Plus className="w-6 h-6 text-muted-foreground" /></div>
          <p className="font-semibold text-muted-foreground text-sm">Tambah Tangkapan Baru</p>
        </button>
      </div>
    </div>
  );
}
