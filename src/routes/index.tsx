import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mural das IAs — Guia urbano de ferramentas de IA" },
      { name: "description", content: "Cards com função, uso prático, pontos fortes e se cada IA é gratuita ou paga." },
      { property: "og:title", content: "Mural das IAs" },
      { property: "og:description", content: "Guia urbano das principais ferramentas de IA, no estilo grafite." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Plano = "Gratuito" | "Pago" | "Freemium";
type IA = { nome: string; categoria: string; funcao: string; uso: string; fortes: string[]; nota: number; plano: Plano };

const IAS: IA[] = [
  { nome: "ChatGPT", categoria: "Texto", funcao: "Assistente conversacional que responde perguntas, escreve e analisa textos.", uso: "Redigir e-mails, resumir documentos, estudar e gerar ideias.", fortes: ["Versátil", "Ótimo raciocínio", "Analisa arquivos"], nota: 9, plano: "Freemium" },
  { nome: "Gemini", categoria: "Texto", funcao: "Assistente do Google integrado à busca e ao Workspace.", uso: "Pesquisas atualizadas, trabalhar no Gmail e Docs.", fortes: ["Integração Google", "Contexto longo", "Multimodal"], nota: 8.5, plano: "Freemium" },
  { nome: "Claude", categoria: "Texto", funcao: "Assistente focado em textos longos, escrita e código.", uso: "Revisar contratos, escrever relatórios, programar.", fortes: ["Escrita natural", "Documentos longos", "Código"], nota: 9, plano: "Freemium" },
  { nome: "Midjourney", categoria: "Imagem", funcao: "Gera imagens artísticas a partir de descrições.", uso: "Arte conceitual, capas, referências visuais.", fortes: ["Estética marcante", "Alta qualidade", "Estilos variados"], nota: 9, plano: "Pago" },
  { nome: "Stable Diffusion", categoria: "Imagem", funcao: "Modelo aberto de geração de imagens que roda no próprio PC.", uso: "Criação de imagens sem limites e com controle total.", fortes: ["Código aberto", "Personalizável", "Roda offline"], nota: 8, plano: "Gratuito" },
  { nome: "GitHub Copilot", categoria: "Código", funcao: "Sugere código enquanto você programa no editor.", uso: "Acelerar tarefas repetitivas e aprender APIs.", fortes: ["Autocompletar", "Integra IDEs", "Chat no código"], nota: 8.5, plano: "Pago" },
  { nome: "ElevenLabs", categoria: "Áudio", funcao: "Transforma texto em voz realista e clona vozes.", uso: "Narração de vídeos, podcasts e audiolivros.", fortes: ["Vozes naturais", "Vários idiomas", "Clonagem"], nota: 8.5, plano: "Freemium" },
  { nome: "Runway", categoria: "Vídeo", funcao: "Cria e edita vídeos com IA a partir de texto ou imagem.", uso: "Clipes curtos, efeitos e edição rápida.", fortes: ["Geração de vídeo", "Ferramentas de edição", "Fácil de usar"], nota: 8, plano: "Freemium" },
  { nome: "Perplexity", categoria: "Pesquisa", funcao: "Buscador com IA que responde citando as fontes.", uso: "Pesquisa escolar e checagem de informação.", fortes: ["Cita fontes", "Atualizado", "Rápido"], nota: 8.5, plano: "Freemium" },
];

const CATS = ["Todas", ...Array.from(new Set(IAS.map((i) => i.categoria)))];
const planoCor: Record<Plano, string> = {
  Gratuito: "bg-primary text-primary-foreground",
  Pago: "bg-secondary text-secondary-foreground",
  Freemium: "bg-accent text-accent-foreground",
};

function Index() {
  const [cat, setCat] = useState("Todas");
  const lista = useMemo(() => (cat === "Todas" ? IAS : IAS.filter((i) => i.categoria === cat)), [cat]);

  return (
    <main className="min-h-screen overflow-x-hidden">
      <header className="mx-auto max-w-6xl px-5 pt-14 pb-16 md:pt-24">
        <p className="inline-block -rotate-2 bg-spray px-3 py-1 font-block text-xl tracking-widest text-spray-foreground">Guia de rua • 2026</p>
        <h1 className="tag-text mt-6 text-6xl leading-none text-primary md:text-8xl">Mural<br />das IAs</h1>
        <p className="mt-8 max-w-xl text-lg text-muted-foreground">
          As ferramentas de inteligência artificial que valem a pena — sem enrolação: o que fazem, onde usar, no que mandam bem e quanto custam.
        </p>
        <a href="#ias" className="sticker-pink mt-8 inline-block border-2 border-foreground bg-primary px-6 py-3 font-block text-2xl tracking-wider text-primary-foreground transition-transform hover:-translate-y-1">Ver o mural ↓</a>
      </header>

      <section className="border-y-4 border-foreground bg-secondary py-3">
        <div className="flex gap-10 whitespace-nowrap font-block text-2xl tracking-widest text-secondary-foreground">
          {Array.from({ length: 3 }).flatMap((_, k) => IAS.map((i) => <span key={k + i.nome}>★ {i.nome}</span>))}
        </div>
      </section>

      <section id="ias" className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-block text-5xl tracking-wide md:text-6xl">As ferramentas</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`border-2 border-foreground px-4 py-1.5 font-block text-lg tracking-wider transition-colors ${cat === c ? "bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-muted"}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {lista.map((ia, idx) => (
            <article key={ia.nome} className={`sticker flex flex-col border-2 border-foreground bg-card p-6 transition-transform hover:rotate-0 hover:-translate-y-1 ${idx % 2 ? "rotate-1" : "-rotate-1"}`}>
              <div className="flex items-start justify-between gap-3">
                <span className="font-block text-sm tracking-widest text-accent">{ia.categoria}</span>
                <span className={`px-2 py-0.5 font-block text-base tracking-wider ${planoCor[ia.plano]}`}>{ia.plano}</span>
              </div>
              <h3 className="mt-2 font-display text-3xl text-primary">{ia.nome}</h3>
              <p className="mt-3 text-card-foreground">{ia.funcao}</p>
              <p className="mt-3 text-sm text-muted-foreground"><strong className="text-foreground">Na prática:</strong> {ia.uso}</p>
              <div className="mt-4">
                <p className="font-block text-lg tracking-wider">Pontos fortes</p>
                <ul className="mt-1 flex flex-wrap gap-2">
                  {ia.fortes.map((f) => <li key={f} className="border border-border bg-muted px-2 py-0.5 text-sm">{f}</li>)}
                </ul>
              </div>
              <div className="mt-auto pt-5">
                <div className="flex items-center justify-between font-block text-lg tracking-wider"><span>Avaliação</span><span className="text-primary">{ia.nota}/10</span></div>
                <div className="mt-1 h-3 border border-foreground bg-muted"><div className="h-full bg-spray" style={{ width: `${ia.nota * 10}%` }} /></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <h2 className="font-block text-5xl tracking-wide">Legenda</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {([["Gratuito", "Uso completo sem pagar."], ["Freemium", "Tem plano grátis com limites e versão paga."], ["Pago", "Exige assinatura para usar."]] as [Plano, string][]).map(([p, d]) => (
            <div key={p} className="border-2 border-foreground bg-card p-5">
              <span className={`px-2 py-0.5 font-block text-lg tracking-wider ${planoCor[p]}`}>{p}</span>
              <p className="mt-3 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t-4 border-primary py-8 text-center font-display text-xl text-muted-foreground">Mural das IAs — feito na rua digital</footer>
    </main>
  );
}
