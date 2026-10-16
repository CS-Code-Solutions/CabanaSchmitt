import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  Star, Wifi, Car, Bath, PawPrint, Tv, Snowflake, Flame, Telescope, Music,
  ChefHat, Trees, MapPin, MessageCircle, CalendarHeart, Users, BedDouble,
} from "lucide-react";
import cabana from "@/assets/cabana.jpg.asset.json";
import interior from "@/assets/interior.jpg";
import banheira from "@/assets/banheira.jpg";
import estrelas from "@/assets/estrelas.jpg";

// TODO: substituir pelo número real do anfitrião (formato 55DDDNUMERO)
const WHATSAPP = "5551999999999";
const AIRBNB = "https://www.airbnb.com.br/rooms/1511092742388459827";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cabana Schmitt – Vista das Estrelas | Maratá/RS" },
      { name: "description", content: "Cabana romântica com hidromassagem, telescópio e vista para as estrelas no interior de Maratá/RS. Reserve pelo WhatsApp ou Airbnb." },
      { property: "og:title", content: "Cabana Schmitt – Vista das Estrelas" },
      { property: "og:description", content: "Refúgio romântico sob o céu estrelado de Maratá/RS." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const wa = (msg: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

const amenities = [
  { icon: Bath, label: "Hidromassagem com luzes" },
  { icon: Telescope, label: "Telescópio para os hóspedes" },
  { icon: Flame, label: "Área gourmet com churrasqueira" },
  { icon: ChefHat, label: "Cozinha completa + kit chimarrão" },
  { icon: Snowflake, label: "Ar-condicionado quente e frio" },
  { icon: Wifi, label: "Wi-Fi rural estável" },
  { icon: Tv, label: "TV com +200 canais" },
  { icon: Music, label: "Som ambiente Bluetooth" },
  { icon: Car, label: "Estacionamento gratuito" },
  { icon: PawPrint, label: "Pet friendly (pequeno porte)" },
  { icon: Trees, label: "15 hectares de natureza" },
  { icon: BedDouble, label: "Cama queen + cama de casal" },
];

const reviews = [
  { name: "Roberto Carlos", text: "Foram dois dias incríveis em meio à natureza! A cabana é um verdadeiro refúgio para quem busca tranquilidade, descanso e momentos especiais longe da correria do dia a dia. Recomendo muito e, com certeza, voltaria mais vezes!" },
  { name: "Célia", text: "Lugar romântico, lindo, ótimo para relaxar e desestressar. Maico é gentil e prestativo." },
];

const distances = [
  ["Salvador do Sul", "10 km"], ["Montenegro", "25 km"], ["Carlos Barbosa", "50 km"],
  ["Lajeado", "50 km"], ["Novo Hamburgo", "60 km"], ["Porto Alegre", "90 km"],
];

function Btn({ href, children, variant = "gold" }: { href: string; children: React.ReactNode; variant?: "gold" | "wa" | "ghost" }) {
  const styles = {
    gold: "bg-gold text-primary-foreground shadow-glow",
    wa: "bg-whatsapp text-whatsapp-foreground",
    ghost: "border border-foreground/30 text-foreground hover:bg-foreground/10",
  }[variant];
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition hover:-translate-y-0.5 ${styles}`}>
      {children}
    </a>
  );
}

function BookingForm() {
  const [f, setF] = useState({ nome: "", entrada: "", saida: "", hospedes: "2", pet: false });
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const msg = `Olá Maico! Gostaria de reservar a Cabana Schmitt.\n\nNome: ${f.nome}\nCheck-in: ${f.entrada}\nCheck-out: ${f.saida}\nHóspedes: ${f.hospedes}${f.pet ? "\nLevarei um pet de pequeno porte 🐾" : ""}\n\nHá disponibilidade?`;
    window.open(wa(msg), "_blank");
  };
  const today = new Date().toISOString().slice(0, 10);
  const input = "w-full rounded-lg border border-input bg-background/60 px-4 py-3 text-foreground outline-none focus:border-ring";
  return (
    <form onSubmit={submit} className="grid gap-4 rounded-2xl border border-border bg-card/80 p-6 backdrop-blur md:p-8">
      <label className="grid gap-1 text-sm text-muted-foreground">Seu nome
        <input required className={input} value={f.nome} onChange={(e) => setF({ ...f, nome: e.target.value })} />
      </label>
      <div className="grid grid-cols-2 gap-4">
        <label className="grid gap-1 text-sm text-muted-foreground">Check-in
          <input required type="date" min={today} className={input} value={f.entrada} onChange={(e) => setF({ ...f, entrada: e.target.value })} />
        </label>
        <label className="grid gap-1 text-sm text-muted-foreground">Check-out
          <input required type="date" min={f.entrada || today} className={input} value={f.saida} onChange={(e) => setF({ ...f, saida: e.target.value })} />
        </label>
      </div>
      <label className="grid gap-1 text-sm text-muted-foreground">Hóspedes
        <select className={input} value={f.hospedes} onChange={(e) => setF({ ...f, hospedes: e.target.value })}>
          {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </label>
      <label className="flex items-center gap-2 text-sm text-muted-foreground">
        <input type="checkbox" checked={f.pet} onChange={(e) => setF({ ...f, pet: e.target.checked })} /> Vou levar pet de pequeno porte
      </label>
      <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-medium text-whatsapp-foreground transition hover:-translate-y-0.5">
        <MessageCircle className="h-4 w-4" /> Consultar disponibilidade no WhatsApp
      </button>
      <p className="text-xs text-muted-foreground">Reserva confirmada após verificação de disponibilidade e pagamento, combinado diretamente pelo WhatsApp.</p>
    </form>
  );
}

function Index() {
  return (
    <main className="overflow-x-hidden">
      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/70 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#inicio" className="font-display text-xl">Cabana <span className="text-gold">Schmitt</span></a>
          <div className="hidden gap-8 text-sm text-muted-foreground md:flex">
            {[["Galeria", "galeria"], ["Comodidades", "comodidades"], ["Avaliações", "avaliacoes"], ["Localização", "localizacao"]].map(([l, id]) => (
              <a key={id} href={`#${id}`} className="hover:text-foreground">{l}</a>
            ))}
          </div>
          <a href="#reservar" className="rounded-full bg-gold px-5 py-2 text-sm font-medium text-primary-foreground">Reservar</a>
        </nav>
      </header>

      {/* Hero */}
      <section id="inicio" className="relative flex min-h-screen items-end">
        <img src={cabana.url} alt="Cabana Schmitt iluminada ao entardecer" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-night-fade" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-20">
          <p className="mb-4 flex items-center gap-2 text-sm tracking-[0.3em] text-primary uppercase">
            <Star className="h-4 w-4 fill-current" /> 5,0 · 32 avaliações · Preferido dos hóspedes
          </p>
          <h1 className="max-w-3xl text-5xl leading-tight md:text-7xl">
            Um céu todinho <em className="text-gold">só pra vocês</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-foreground/80">
            Refúgio romântico em Esperança, interior de Maratá/RS. Hidromassagem, telescópio e uma varanda com vista para as estrelas.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Btn href={wa("Olá Maico! Gostaria de saber a disponibilidade da Cabana Schmitt.")} variant="wa"><MessageCircle className="h-4 w-4" /> Reservar pelo WhatsApp</Btn>
            <Btn href={AIRBNB} variant="ghost">Ver no Airbnb</Btn>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm tracking-[0.3em] text-primary uppercase">O refúgio</p>
          <h2 className="mt-3 text-4xl md:text-5xl">Conforto moderno, charme do campo</h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Com cerca de 42m², a cabana tem suíte aconchegante, cozinha equipada, sala integrada e uma ampla varanda com vista panorâmica — o lugar preferido dos hóspedes para o pôr do sol e as noites estreladas.
          </p>
          <div className="mt-8 flex flex-wrap gap-6 text-sm">
            <span className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" /> 4 hóspedes</span>
            <span className="flex items-center gap-2"><BedDouble className="h-4 w-4 text-primary" /> 1 quarto · 2 camas</span>
            <span className="flex items-center gap-2"><Bath className="h-4 w-4 text-primary" /> 1 banheiro</span>
          </div>
        </div>
        <img src={interior} alt="Interior aconchegante da cabana" loading="lazy" width={1200} height={912} className="rounded-2xl object-cover shadow-glow" />
      </section>

      {/* Gallery */}
      <section id="galeria" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-10 text-center text-4xl md:text-5xl">Galeria</h2>
        <div className="grid gap-4 md:grid-cols-3 md:grid-rows-2">
          <img src={cabana.url} alt="Fachada da cabana" loading="lazy" className="h-full w-full rounded-2xl object-cover md:col-span-2 md:row-span-2" />
          <img src={banheira} alt="Banheira de hidromassagem com luzes" loading="lazy" width={1200} height={912} className="h-full w-full rounded-2xl object-cover" />
          <img src={interior} alt="Quarto da cabana" loading="lazy" width={1200} height={912} className="h-full w-full rounded-2xl object-cover" />
        </div>
      </section>

      {/* Stars */}
      <section className="relative my-16 flex min-h-[70vh] items-center">
        <img src={estrelas} alt="Telescópio sob a Via Láctea" loading="lazy" width={1600} height={912} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/40" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="max-w-lg rounded-2xl border border-border bg-background/60 p-8 backdrop-blur">
            <Telescope className="h-8 w-8 text-primary" />
            <h2 className="mt-4 text-4xl">As estrelas não estão só no nome</h2>
            <p className="mt-4 text-muted-foreground">Telescópio à disposição dos hóspedes. Deite na varanda, apague as luzes e descubra o céu limpo do interior — inesquecível para adultos e crianças.</p>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section id="comodidades" className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-center text-4xl md:text-5xl">Comodidades</h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">Cada detalhe pensado para encantar.</p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {amenities.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
              <Icon className="h-6 w-6 shrink-0 text-primary" />
              <span className="text-sm">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section id="avaliacoes" className="starfield py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="font-display text-7xl text-gold">5,0</p>
            <div className="mt-2 flex justify-center gap-1 text-primary">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}</div>
            <p className="mt-2 text-muted-foreground">32 avaliações · Top 5% do Airbnb · Anfitrião Superhost</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {reviews.map((r) => (
              <blockquote key={r.name} className="rounded-2xl border border-border bg-card/80 p-8">
                <p className="font-display text-xl italic leading-relaxed">“{r.text}”</p>
                <footer className="mt-4 text-sm text-primary">— {r.name}</footer>
              </blockquote>
            ))}
          </div>
          <div className="mt-8 text-center"><Btn href={`${AIRBNB}#reviews`} variant="ghost">Ver todas no Airbnb</Btn></div>
        </div>
      </section>

      {/* Location */}
      <section id="localizacao" className="mx-auto grid max-w-6xl gap-10 px-6 py-24 md:grid-cols-2">
        <div>
          <p className="text-sm tracking-[0.3em] text-primary uppercase">Localização</p>
          <h2 className="mt-3 text-4xl md:text-5xl">Esperança, Maratá/RS</h2>
          <p className="mt-4 text-muted-foreground">15 hectares de lavoura, mata nativa e pastagens, com galinhas, ovelhas e vacas. Sossego a poucos minutos do centro e da rota turística.</p>
          <ul className="mt-8 grid grid-cols-2 gap-3">
            {distances.map(([c, d]) => (
              <li key={c} className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4 text-primary" /> {c} <span className="text-muted-foreground">· {d}</span></li>
            ))}
          </ul>
        </div>
        <iframe title="Mapa Maratá/RS" className="h-80 w-full rounded-2xl border border-border md:h-full" loading="lazy"
          src="https://www.google.com/maps?q=Marat%C3%A1,+RS,+Brasil&z=12&output=embed" />
      </section>

      {/* Booking */}
      <section id="reservar" className="border-t border-border py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center">
          <div>
            <CalendarHeart className="h-10 w-10 text-primary" />
            <h2 className="mt-4 text-4xl md:text-5xl">Reserve sua noite <em className="text-gold">sob as estrelas</em></h2>
            <p className="mt-4 text-muted-foreground">Escolha suas datas e fale direto com o Maico pelo WhatsApp — resposta em até 1 hora. Prefere o Airbnb? Os calendários são sincronizados.</p>
            <div className="mt-6"><Btn href={AIRBNB} variant="gold">Reservar pelo Airbnb</Btn></div>
          </div>
          <BookingForm />
        </div>
      </section>

      <footer className="border-t border-border py-10 text-center text-sm text-muted-foreground">
        <p className="font-display text-lg text-foreground">Cabana Schmitt – Vista das Estrelas</p>
        <p className="mt-1">Esperança · Maratá/RS · Anfitrião: Maico</p>
      </footer>

      <a href={wa("Olá Maico! Gostaria de informações sobre a Cabana Schmitt.")} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-glow">
        <MessageCircle className="h-6 w-6" />
      </a>
    </main>
  );
}
