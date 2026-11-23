import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
type IA = {
  nome: string;
  categoria: string;
  funcao: string;
  uso: string;
  fortes: string[];
  porque: string;
  nota: number;
  plano: Plano;
};

const IAS: IA[] = [
  {
    nome: "ChatGPT", categoria: "Texto",
    funcao: "Assistente conversacional que responde perguntas, escreve e analisa textos.",
    uso: "Redigir e-mails, resumir documentos, estudar e gerar ideias.",
    fortes: ["Versátil", "Ótimo raciocínio", "Analisa arquivos"],
    porque: "É a IA mais equilibrada do mercado: entende contexto, escreve bem em português, lê PDFs e planilhas e ainda gera imagens. Para quem quer uma única ferramenta para quase tudo, é a escolha mais segura.",
    nota: 9, plano: "Freemium",
  },
  {
    nome: "Gemini", categoria: "Texto",
    funcao: "Assistente do Google integrado à busca e ao Workspace.",
    uso: "Pesquisas atualizadas, trabalhar no Gmail e Docs.",
    fortes: ["Integração Google", "Contexto longo", "Multimodal"],
    porque: "Por ser do Google, acessa informações recentes da busca e trabalha direto dentro do Gmail, Docs e Drive. O contexto gigante permite analisar livros e vídeos inteiros de uma vez.",
    nota: 8.5, plano: "Freemium",
  },
  {
    nome: "Claude", categoria: "Texto",
    funcao: "Assistente focado em textos longos, escrita e código.",
    uso: "Revisar contratos, escrever relatórios, programar.",
    fortes: ["Escrita natural", "Documentos longos", "Código"],
    porque: "Escreve com o tom mais humano entre as IAs e mantém coerência em documentos muito longos. É o favorito de quem trabalha com redação profissional e análise de contratos.",
    nota: 9, plano: "Freemium",
  },
  {
    nome: "Grok", categoria: "Texto",
    funcao: "Assistente da xAI integrado ao X (antigo Twitter).",
    uso: "Acompanhar notícias e tendências em tempo real.",
    fortes: ["Tempo real", "Tom irreverente", "Integrado ao X"],
    porque: "Lê o que está acontecendo no X em tempo real, então é imbatível para notícias de última hora e tendências. O tom mais solto e direto agrada quem quer respostas sem cerimônia.",
    nota: 8, plano: "Freemium",
  },
  {
    nome: "DeepSeek", categoria: "Texto",
    funcao: "Modelo aberto chinês com raciocínio forte e custo baixo.",
    uso: "Raciocínio lógico, matemática e programação sem pagar nada.",
    fortes: ["Grátis de verdade", "Raciocínio visível", "Código aberto"],
    porque: "Entrega raciocínio de ponta mostrando o passo a passo do pensamento, tudo de graça. Por ser aberto, qualquer pessoa pode rodar localmente e adaptar.",
    nota: 8.5, plano: "Gratuito",
  },
  {
    nome: "Midjourney", categoria: "Imagem",
    funcao: "Gera imagens artísticas a partir de descrições.",
    uso: "Arte conceitual, capas, referências visuais.",
    fortes: ["Estética marcante", "Alta qualidade", "Estilos variados"],
    porque: "Tem o acabamento visual mais bonito e cinematográfico entre os geradores de imagem. Mesmo com descrições simples, entrega resultados com cara de trabalho profissional.",
    nota: 9, plano: "Pago",
  },
  {
    nome: "Stable Diffusion", categoria: "Imagem",
    funcao: "Modelo aberto de geração de imagens que roda no próprio PC.",
    uso: "Criação de imagens sem limites e com controle total.",
    fortes: ["Código aberto", "Personalizável", "Roda offline"],
    porque: "Por ser aberto, não tem censura rígida nem limite de gerações, e roda no seu computador sem depender de nuvem. A comunidade cria milhares de modelos treinados para estilos específicos.",
    nota: 8, plano: "Gratuito",
  },
  {
    nome: "DALL·E", categoria: "Imagem",
    funcao: "Gerador de imagens da OpenAI, integrado ao ChatGPT.",
    uso: "Criar ilustrações rápidas conversando em linguagem natural.",
    fortes: ["Fácil de usar", "Entende texto", "Edita imagens"],
    porque: "Entende descrições longas e detalhadas melhor que a maioria, e você pede ajustes conversando, sem aprender comandos. Ideal para quem já usa o ChatGPT no dia a dia.",
    nota: 8, plano: "Freemium",
  },
  {
    nome: "Leonardo AI", categoria: "Imagem",
    funcao: "Plataforma de geração de imagens com modelos próprios e finetuning.",
    uso: "Assets para jogos, personagens e artes com estilo consistente.",
    fortes: ["Estilo consistente", "Treina modelos", "Créditos diários grátis"],
    porque: "Permite treinar o modelo com suas próprias imagens, mantendo o mesmo estilo em toda uma série de artes — algo raro fora de ferramentas profissionais. E ainda dá créditos grátis todo dia.",
    nota: 8, plano: "Freemium",
  },
  {
    nome: "GitHub Copilot", categoria: "Código",
    funcao: "Sugere código enquanto você programa no editor.",
    uso: "Acelerar tarefas repetitivas e aprender APIs.",
    fortes: ["Autocompletar", "Integra IDEs", "Chat no código"],
    porque: "Foi o primeiro assistente de código maduro e segue o mais integrado: funciona dentro do VS Code, JetBrains e até no terminal. Aprende o estilo do seu projeto e completa trechos inteiros.",
    nota: 8.5, plano: "Pago",
  },
  {
    nome: "Cursor", categoria: "Código",
    funcao: "Editor de código com IA embutida em tudo.",
    uso: "Construir projetos inteiros descrevendo o que você quer.",
    fortes: ["Entende o projeto todo", "Edição por chat", "Agente autônomo"],
    porque: "Diferente de um plugin, o editor inteiro foi feito em volta da IA: ela enxerga todos os arquivos do projeto e faz mudanças em vários deles de uma vez. Multiplica a velocidade de quem programa.",
    nota: 9, plano: "Freemium",
  },
  {
    nome: "Lovable", categoria: "Código",
    funcao: "Cria sites e aplicativos completos a partir de descrições.",
    uso: "Tirar uma ideia do papel sem saber programar.",
    fortes: ["App completo", "Sem código", "Publica na hora"],
    porque: "Você descreve o site ou app em português e ele entrega o projeto funcionando, com banco de dados e publicação inclusos. É o caminho mais curto entre uma ideia e um produto no ar.",
    nota: 9, plano: "Freemium",
  },
  {
    nome: "ElevenLabs", categoria: "Áudio",
    funcao: "Transforma texto em voz realista e clona vozes.",
    uso: "Narração de vídeos, podcasts e audiolivros.",
    fortes: ["Vozes naturais", "Vários idiomas", "Clonagem"],
    porque: "As vozes são praticamente indistinguíveis de humanos, com emoção e entonação naturais, inclusive em português. A clonagem de voz com poucos minutos de áudio é a melhor do mercado.",
    nota: 8.5, plano: "Freemium",
  },
  {
    nome: "Suno", categoria: "Áudio",
    funcao: "Cria músicas completas com letra e vocais a partir de um pedido.",
    uso: "Trilhas para vídeos, jingles e músicas autorais.",
    fortes: ["Música completa", "Vocais cantados", "Rápido"],
    porque: "Gera a música inteira — melodia, arranjo e voz cantada — em menos de um minuto, em qualquer estilo. Nenhuma outra ferramenta entrega uma faixa tão pronta com tão pouco esforço.",
    nota: 8.5, plano: "Freemium",
  },
  {
    nome: "Whisper", categoria: "Áudio",
    funcao: "Transcreve áudio em texto com alta precisão.",
    uso: "Legendas, atas de reunião e transcrição de entrevistas.",
    fortes: ["Muito preciso", "Grátis e aberto", "99 idiomas"],
    porque: "É o modelo de transcrição mais preciso disponível gratuitamente, entende sotaques e ruído de fundo e roda offline. Virou padrão da indústria para legendas automáticas.",
    nota: 9, plano: "Gratuito",
  },
  {
    nome: "Runway", categoria: "Vídeo",
    funcao: "Cria e edita vídeos com IA a partir de texto ou imagem.",
    uso: "Clipes curtos, efeitos e edição rápida.",
    fortes: ["Geração de vídeo", "Ferramentas de edição", "Fácil de usar"],
    porque: "Além de gerar vídeo do zero, tem um estúdio completo de edição com IA: remover fundo, apagar objetos e criar câmera lenta. É a caixa de ferramentas mais completa para vídeo com IA.",
    nota: 8, plano: "Freemium",
  },
  {
    nome: "Sora", categoria: "Vídeo",
    funcao: "Gerador de vídeo da OpenAI com realismo impressionante.",
    uso: "Cenas cinematográficas e clipes realistas a partir de texto.",
    fortes: ["Realismo", "Física convincente", "Cenas longas"],
    porque: "Produz os vídeos mais realistas já gerados por IA, com física de movimento e iluminação convincentes. Para cenas que parecem filmadas de verdade, é a referência atual.",
    nota: 8.5, plano: "Pago",
  },
  {
    nome: "CapCut IA", categoria: "Vídeo",
    funcao: "Editor de vídeo com recursos de IA para redes sociais.",
    uso: "Cortes automáticos, legendas e efeitos para TikTok e Reels.",
    fortes: ["Legendas automáticas", "Cortes por IA", "Grátis no celular"],
    porque: "Automatiza o que mais demora na edição para redes sociais: legendas sincronizadas, cortes no silêncio e fundo removido com um toque. E a maior parte dos recursos é grátis no celular.",
    nota: 8, plano: "Freemium",
  },
  {
    nome: "Perplexity", categoria: "Pesquisa",
    funcao: "Buscador com IA que responde citando as fontes.",
    uso: "Pesquisa escolar e checagem de informação.",
    fortes: ["Cita fontes", "Atualizado", "Rápido"],
    porque: "Cada resposta vem com links para as fontes, então você confere de onde veio a informação — algo que os chatbots comuns não fazem. Perfeito para trabalhos escolares e checagem de fatos.",
    nota: 8.5, plano: "Freemium",
  },
  {
    nome: "NotebookLM", categoria: "Pesquisa",
    funcao: "Assistente do Google que estuda os seus próprios documentos.",
    uso: "Resumir PDFs, criar guias de estudo e podcasts a partir dos seus arquivos.",
    fortes: ["Só usa suas fontes", "Gera podcast", "Grátis"],
    porque: "Responde apenas com base nos documentos que você enviou, sem inventar informação de fora. Ainda transforma o material em um podcast com dois apresentadores — ótimo para estudar ouvindo.",
    nota: 9, plano: "Gratuito",
  },
  {
    nome: "Consensus", categoria: "Pesquisa",
    funcao: "Buscador de artigos científicos com respostas resumidas por IA.",
    uso: "TCCs, artigos e evidências científicas confiáveis.",
    fortes: ["Só artigos científicos", "Resume estudos", "Mostra consenso"],
    porque: "Pesquisa direto em milhões de artigos científicos revisados e mostra o quanto a ciência concorda sobre cada tema. Para trabalho acadêmico, elimina o risco de fontes duvidosas.",
    nota: 8, plano: "Freemium",
  },
];

const CATS = ["Todas", ...Array.from(new Set(IAS.map((i) => i.categoria)))];
const planoCor: Record<Plano, string> = {
  Gratuito: "bg-primary text-primary-foreground",
  Pago: "bg-secondary text-secondary-foreground",
  Freemium: "bg-accent text-accent-foreground",
};

function Index() {
  const [cat, setCat] = useState("Todas");
  const [selecionada, setSelecionada] = useState<IA | null>(null);
  const lista = useMemo(() => (cat === "Todas" ? IAS : IAS.filter((i) => i.categoria === cat)), [cat]);

  return (
    <main className="min-h-screen overflow-x-hidden">
      <header className="relative mx-auto max-w-6xl px-5 pt-14 pb-16 md:pt-24">
        <div aria-hidden className="pointer-events-none absolute -top-10 right-0 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute top-40 -left-16 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
        <p className="inline-block rounded-full bg-spray px-5 py-1.5 font-block text-lg font-semibold tracking-wide text-spray-foreground">Guia de rua • 2026</p>
        <h1 className="tag-text mt-6 text-6xl leading-none text-primary md:text-8xl">Mural<br />das IAs</h1>
        <p className="mt-8 max-w-xl text-lg text-muted-foreground">
          As ferramentas de inteligência artificial que valem a pena — sem enrolação: o que fazem, onde usar, no que mandam bem e quanto custam.
        </p>
        <a href="#ias" className="sticker-pink mt-8 inline-block rounded-full bg-primary px-8 py-3 font-block text-xl font-semibold tracking-wide text-primary-foreground transition-transform hover:-translate-y-1">Ver o mural ↓</a>
      </header>

      <section className="px-5">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-8 gap-y-1 rounded-full bg-secondary/90 px-8 py-3 font-block text-lg font-semibold tracking-wide text-secondary-foreground">
          {IAS.map((i) => <span key={i.nome}>★ {i.nome}</span>)}
        </div>
      </section>

      <section id="ias" className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-display text-5xl font-bold tracking-wide md:text-6xl">As ferramentas</h2>
        <p className="mt-3 text-muted-foreground">Toque em um card para ver a explicação completa de por que a IA é boa na função dela.</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`rounded-full border border-border px-5 py-1.5 font-block text-base font-semibold tracking-wide transition-all ${cat === c ? "border-transparent bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-muted"}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {lista.map((ia) => (
            <article key={ia.nome} onClick={() => setSelecionada(ia)}
              className="sticker card-soft group flex cursor-pointer flex-col rounded-[2rem] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:rounded-[2.5rem]">
              <div className="flex items-start justify-between gap-3">
                <span className="rounded-full bg-accent/15 px-3 py-0.5 font-block text-sm font-semibold tracking-wide text-accent">{ia.categoria}</span>
                <span className={`rounded-full px-3 py-0.5 font-block text-sm font-semibold tracking-wide ${planoCor[ia.plano]}`}>{ia.plano}</span>
              </div>
              <h3 className="mt-3 font-display text-3xl font-semibold text-primary">{ia.nome}</h3>
              <p className="mt-3 text-card-foreground">{ia.funcao}</p>
              <p className="mt-3 text-sm text-muted-foreground"><strong className="text-foreground">Na prática:</strong> {ia.uso}</p>
              <div className="mt-4">
                <p className="font-block text-base font-semibold tracking-wide">Pontos fortes</p>
                <ul className="mt-1.5 flex flex-wrap gap-2">
                  {ia.fortes.map((f) => <li key={f} className="rounded-full bg-muted px-3 py-1 text-sm">{f}</li>)}
                </ul>
              </div>
              <div className="mt-auto pt-5">
                <div className="flex items-center justify-between font-block text-base font-semibold tracking-wide"><span>Avaliação</span><span className="text-primary">{ia.nota}/10</span></div>
                <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-gradient-to-r from-secondary to-spray" style={{ width: `${ia.nota * 10}%` }} /></div>
                <p className="mt-3 text-center font-block text-sm font-semibold tracking-wide text-accent">Toque para saber por que ela é boa →</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Dialog open={selecionada !== null} onOpenChange={(aberto) => !aberto && setSelecionada(null)}>
        <DialogContent className="card-soft max-h-[85vh] overflow-y-auto rounded-[2rem] border-border sm:max-w-lg">
          {selecionada && (
            <>
              <DialogHeader>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-accent/15 px-3 py-0.5 font-block text-sm font-semibold tracking-wide text-accent">{selecionada.categoria}</span>
                  <span className={`rounded-full px-3 py-0.5 font-block text-sm font-semibold tracking-wide ${planoCor[selecionada.plano]}`}>{selecionada.plano}</span>
                </div>
                <DialogTitle className="font-display text-4xl font-semibold text-primary">{selecionada.nome}</DialogTitle>
                <DialogDescription className="text-base text-muted-foreground">{selecionada.funcao}</DialogDescription>
              </DialogHeader>

              <div className="space-y-5 pt-2">
                <div className="rounded-3xl bg-muted/60 p-5">
                  <p className="font-block text-lg font-semibold tracking-wide text-spray">Por que ela é boa nisso?</p>
                  <p className="mt-2 leading-relaxed text-card-foreground">{selecionada.porque}</p>
                </div>

                <div>
                  <p className="font-block text-lg font-semibold tracking-wide">Na prática</p>
                  <p className="mt-1 text-muted-foreground">{selecionada.uso}</p>
                </div>

                <div>
                  <p className="font-block text-lg font-semibold tracking-wide">Pontos fortes</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {selecionada.fortes.map((f) => <li key={f} className="rounded-full bg-muted px-3 py-1 text-sm">{f}</li>)}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center justify-between font-block text-base font-semibold tracking-wide"><span>Avaliação</span><span className="text-primary">{selecionada.nota}/10</span></div>
                  <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-gradient-to-r from-secondary to-spray" style={{ width: `${selecionada.nota * 10}%` }} /></div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <h2 className="font-display text-5xl font-bold tracking-wide">Legenda</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {([["Gratuito", "Uso completo sem pagar."], ["Freemium", "Tem plano grátis com limites e versão paga."], ["Pago", "Exige assinatura para usar."]] as [Plano, string][]).map(([p, d]) => (
            <div key={p} className="sticker card-soft rounded-[2rem] p-5">
              <span className={`rounded-full px-3 py-0.5 font-block text-base font-semibold tracking-wide ${planoCor[p]}`}>{p}</span>
              <p className="mt-3 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-8 text-center font-display text-xl text-muted-foreground">Mural das IAs — feito na rua digital</footer>
    </main>
  );
}
