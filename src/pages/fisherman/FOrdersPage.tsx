import { useNavigationContext } from "../../context/NavigationContext";
import { BackButton } from "../../components/common/BackButton";
import { ORDERS_DATA } from "../../data";
import { rp, statusStyle } from "../../utils";

export function FOrdersPage() {
  const { navigate } = useNavigationContext();

  return (
    <div className="p-8">
      <BackButton onClick={() => navigate("f-dashboard")} />
      <h1 className="text-2xl font-extrabold mb-8">Pesanan Masuk</h1>
      <div className="bg-card rounded-3xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border bg-muted/50">
              {["ID Pesanan", "Produk", "Pembeli", "Tanggal", "Status", "Total"].map(h => <th key={h} className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase">{h}</th>)}
            </tr></thead>
            <tbody className="divide-y divide-border">
              {ORDERS_DATA.map(o => (
                <tr key={o.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono font-bold text-primary">{o.id}</td>
                  <td className="px-6 py-4 text-sm font-medium">{o.product}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Ahmad Fauzi</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{o.date}</td>
                  <td className="px-6 py-4"><span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusStyle(o.status)}`}>{o.status}</span></td>
                  <td className="px-6 py-4 text-sm font-bold">{rp(o.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
