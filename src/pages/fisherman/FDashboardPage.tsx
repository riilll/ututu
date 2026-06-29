import { TrendingUp, Fish, Package, Star, Plus } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { useNavigationContext } from "../../context/NavigationContext";
import { REVENUE_DATA, ORDERS_DATA } from "../../data";
import { statusStyle } from "../../utils";

export function FDashboardPage() {
  const { navigate } = useNavigationContext();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-foreground">Dashboard Nelayan</h1>
        <p className="text-muted-foreground">Selamat pagi, Ahmad Rasyid! 🌊</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Pendapatan Bulan Ini", val: "Rp 91 Jt", trend: "+34%", up: true, icon: <TrendingUp className="w-5 h-5 text-emerald-600" /> },
          { label: "Listing Aktif", val: "3", trend: "live", up: true, icon: <Fish className="w-5 h-5 text-primary" /> },
          { label: "Pesanan Bulan Ini", val: "47", trend: "+12%", up: true, icon: <Package className="w-5 h-5 text-accent" /> },
          { label: "Rating Rata-rata", val: "4.9", trend: "1.240 ulasan", up: true, icon: <Star className="w-5 h-5 text-amber-400" /> },
        ].map(s => (
          <div key={s.label} className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">{s.icon}</div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${s.up ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>{s.trend}</span>
            </div>
            <p className="text-2xl font-extrabold text-foreground">{s.val}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-card rounded-3xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">Pendapatan Bulanan</h2>
            <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">Jan–Jun 2026</span>
          </div>
          <ResponsiveContainer key="dashboard-line-chart" width="100%" height={200}>
            <LineChart data={REVENUE_DATA} margin={{ top: 5, right: 10, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#5B7FA6" }} />
              <YAxis tick={{ fontSize: 12, fill: "#5B7FA6" }} />
              <Tooltip formatter={(v: number) => [`Rp ${v}M`, "Pendapatan"]} />
              <Line type="monotone" dataKey="revenue" stroke="#0077B6" strokeWidth={2.5} dot={{ fill: "#0077B6", r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-card rounded-3xl border border-border p-6">
          <h2 className="text-lg font-bold mb-5">Pesanan Terbaru</h2>
          <div className="space-y-4">
            {ORDERS_DATA.map(o => (
              <div key={o.id} className="flex items-center gap-3 pb-4 border-b border-border last:border-0">
                <div className="w-9 h-9 bg-muted rounded-xl flex items-center justify-center flex-shrink-0"><Package className="w-4 h-4 text-primary" /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{o.product}</p>
                  <p className="text-xs text-muted-foreground">{o.id}</p>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full flex-shrink-0 ${statusStyle(o.status)}`}>{o.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-[#0077B6] to-[#00B4D8] rounded-3xl p-6 flex items-center justify-between">
        <div>
          <h3 className="text-white font-bold text-lg mb-1">Tambahkan Tangkapan Baru</h3>
          <p className="text-white/70 text-sm">Baru pulang melaut? Upload tangkapan Anda sekarang!</p>
        </div>
        <button onClick={() => navigate("f-new-catch")}
          className="flex items-center gap-2 bg-white text-primary font-bold px-6 py-3 rounded-2xl hover:bg-white/90 transition-colors flex-shrink-0">
          <Plus className="w-4 h-4" /> Tambah Tangkapan
        </button>
      </div>
    </div>
  );
}
