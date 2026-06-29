import { useState } from "react";
import { Anchor, ShoppingCart, User, Fish, Menu, X, Sparkles } from "lucide-react";
import { useNavigation } from "../../hooks/useNavigation";
import { useCart } from "../../hooks/useCart";
import { Page } from "../../types";

export function NavBar() {
  const { page, navigate } = useNavigation();
  const { cartCount } = useCart();
  const [open, setOpen] = useState(false);

  const navLinks: { l: string; p: Page; exact?: boolean }[] = [
    { l: "Tangkapan Hari Ini", p: "products" },
    { l: "Nelayan", p: "fishermen-list" },
  ];

  const isActive = (p: Page) =>
    page === p || (p === "fishermen-list" && page === "fisherman-profile");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => navigate("home")} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Anchor className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Nela<span className="text-primary">yani</span>
            </span>
          </button>
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(item => (
              <button key={item.p} onClick={() => navigate(item.p)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors hover:text-primary hover:bg-primary/5 ${isActive(item.p) ? "text-primary" : "text-muted-foreground"}`}>
                {item.l}
              </button>
            ))}
            {/* AI Freshness — highlighted pill */}
            <button
              onClick={() => navigate("ai-freshness")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                page === "ai-freshness"
                  ? "bg-[#00B4D8]/15 text-[#007A99]"
                  : "text-muted-foreground hover:bg-[#00B4D8]/10 hover:text-[#0077B6]"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#00B4D8]" />
              AI Freshness
              <span className="text-[9px] font-bold bg-[#00B4D8] text-white px-1.5 py-0.5 rounded-full leading-none ml-0.5">
                AI
              </span>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("cart")} className="relative p-2 hover:bg-secondary rounded-lg transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-bold">{cartCount}</span>
              )}
            </button>
            <button onClick={() => navigate("login")}
              className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-muted-foreground border border-border rounded-lg px-3 py-2 hover:border-primary/40 hover:text-primary transition-all">
              <User className="w-4 h-4" /> Masuk
            </button>
            <button onClick={() => navigate("f-fisherman-login")}
              className="hidden md:flex items-center gap-1.5 bg-primary text-white text-sm font-semibold rounded-lg px-4 py-2 hover:bg-primary/90 transition-all">
              <Fish className="w-4 h-4" /> Jual Ikan
            </button>
            <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-border py-4 flex flex-col gap-1">
            {navLinks.map(item => (
              <button key={item.p} onClick={() => { navigate(item.p); setOpen(false); }}
                className={`text-left px-3 py-2.5 text-sm font-medium rounded-lg ${isActive(item.p) ? "text-primary bg-primary/5" : "text-foreground hover:text-primary hover:bg-muted"}`}>
                {item.l}
              </button>
            ))}
            <button
              onClick={() => { navigate("ai-freshness"); setOpen(false); }}
              className={`flex items-center gap-2 px-3 py-2.5 text-sm font-semibold rounded-lg ${
                page === "ai-freshness" ? "text-[#007A99] bg-[#00B4D8]/10" : "text-foreground hover:text-[#0077B6] hover:bg-[#00B4D8]/5"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#00B4D8]" />
              AI Freshness
              <span className="text-[9px] font-bold bg-[#00B4D8] text-white px-1.5 py-0.5 rounded-full leading-none">AI</span>
            </button>
            <div className="flex gap-2 pt-3 border-t border-border mt-2">
              <button onClick={() => { navigate("login"); setOpen(false); }}
                className="flex-1 text-sm font-semibold border border-border rounded-xl py-2.5 hover:bg-muted">
                Masuk
              </button>
              <button onClick={() => { navigate("f-fisherman-login"); setOpen(false); }}
                className="flex-1 text-sm font-semibold bg-primary text-white rounded-xl py-2.5 hover:bg-primary/90">
                Jual Ikan
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
