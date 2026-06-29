import { useState } from "react";
import { Anchor, ShoppingCart, User, Fish, Menu, X } from "lucide-react";
import { useNavigation } from "../../hooks/useNavigation";
import { useCart } from "../../hooks/useCart";
import { Page } from "../../types";

export function NavBar() {
  const { page, navigate } = useNavigation();
  const { cartCount } = useCart();
  const [open, setOpen] = useState(false);

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
          <div className="hidden md:flex items-center gap-6">
            {[{ l: "Tangkapan Hari Ini", p: "products" as Page }, { l: "Nelayan", p: "fishermen-list" as Page }].map(item => (
              <button key={item.p} onClick={() => navigate(item.p)}
                className={`text-sm font-medium transition-colors hover:text-primary ${(page === item.p || (item.p === "fishermen-list" && page === "fisherman-profile")) ? "text-primary" : "text-muted-foreground"}`}>
                {item.l}
              </button>
            ))}
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
      </div>
    </nav>
  );
}
