import { User, Package, CreditCard, Heart, Star } from "lucide-react";
import { useNavigationContext } from "../../context/NavigationContext";
import { BackButton } from "../../components/common/BackButton";
import { ORDERS_DATA } from "../../data";
import { rp, statusStyle } from "../../utils";

export function UserDashboard() {
  const { navigate } = useNavigationContext();

  return (
    <div className="pt-16 min-h-screen bg-background">
      <div className="bg-gradient-to-r from-[#0B1F3A] to-[#0077B6] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BackButton onClick={() => navigate("home")} label="Beranda" />
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center"><User className="w-8 h-8 text-white" /></div>
            <div><h1 className="text-2xl font-extrabold text-white">Ahmad Fauzi</h1><p className="text-white/70">ahmad.fauzi@email.com · Member sejak Jan 2025</p></div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Pesanan", val: "24", icon: <Package className="w-5 h-5 text-primary" /> },
            { label: "Total Pengeluaran", val: "Rp 19,8 Jt", icon: <CreditCard className="w-5 h-5 text-accent" /> },
            { label: "Nelayan Diikuti", val: "8", icon: <Heart className="w-5 h-5 text-red-400" /> },
            { label: "Rating Rata-rata", val: "4.9", icon: <Star className="w-5 h-5 text-amber-400" /> },
          ].map(s => (
            <div key={s.label} className="bg-card rounded-2xl border border-border p-5 flex items-center gap-4">
              <div className="w-11 h-11 bg-muted rounded-xl flex items-center justify-center">{s.icon}</div>
              <div><p className="text-2xl font-extrabold">{s.val}</p><p className="text-xs text-muted-foreground">{s.label}</p></div>
            </div>
          ))}
        </div>
        <div className="bg-card rounded-3xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-border bg-muted/50">
                {["ID Pesanan", "Produk", "Tanggal", "Status", "Total", ""].map(h => <th key={h} className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">{h}</th>)}
              </tr></thead>
              <tbody className="divide-y divide-border">
                {ORDERS_DATA.map(o => (
                  <tr key={o.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono font-bold text-primary">{o.id}</td>
                    <td className="px-6 py-4 text-sm font-medium">{o.product}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{o.date}</td>
                    <td className="px-6 py-4"><span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusStyle(o.status)}`}>{o.status}</span></td>
                    <td className="px-6 py-4 text-sm font-bold">{rp(o.total)}</td>
                    <td className="px-6 py-4"><button className="text-xs text-primary font-semibold hover:underline">Lacak</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
