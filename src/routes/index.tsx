import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mural das IAs — Tabela de ferramentas de IA" },
      { name: "description", content: "Tabela com todas as IAs disponíveis: função, uso prático, pontos fortes, nota e se é gratuita ou paga." },
      { property: "og:title", content: "Mural das IAs" },
      { property: "og:description", content: "Todas as ferramentas de IA em uma tabela: função, uso, nota e plano." },
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
    nome: "Microsoft Copilot", categoria: "Texto",
    funcao: "Assistente integrado ao Windows, Microsoft 365 e à web.",
    uso: "Pesquisa, resumos, escrita e apoio ao Office.",
    fortes: ["Integração Microsoft","Pesquisa web","Produtividade"],
    porque: "Útil para quem usa Windows e ferramentas Microsoft, reunindo conversa, pesquisa e recursos de produtividade.",
    nota: 8.5, plano: "Freemium",
  },
  {
    nome: "Mistral Le Chat", categoria: "Texto",
    funcao: "Assistente da Mistral para conversa, pesquisa e tarefas multimodais.",
    uso: "Perguntas, escrita, análise e ideias.",
    fortes: ["Modelos Mistral","Multimodal","Assistente geral"],
    porque: "Alternativa com modelos próprios para tarefas gerais, análise e produtividade.",
    nota: 8, plano: "Freemium",
  },
  {
    nome: "Qwen", categoria: "Texto",
    funcao: "Família de modelos de IA desenvolvida pela Alibaba.",
    uso: "Conversas, programação, análise e raciocínio.",
    fortes: ["Vários modelos","Multimodal","Opções abertas"],
    porque: "Família de modelos que cobre texto, visão e código, incluindo opções abertas.",
    nota: 8.5, plano: "Freemium",
  },
  {
    nome: "Poe", categoria: "Texto",
    funcao: "Plataforma que reúne chatbots e modelos de diferentes empresas.",
    uso: "Testar modelos e bots personalizados.",
    fortes: ["Vários modelos","Bots personalizados","Tudo em um lugar"],
    porque: "Facilita experimentar modelos e bots diferentes em uma única plataforma.",
    nota: 8, plano: "Freemium",
  },
  {
    nome: "Notion AI", categoria: "Produtividade",
    funcao: "Recursos de IA dentro do espaço de trabalho Notion.",
    uso: "Organizar notas, resumir páginas e escrever.",
    fortes: ["Integrado ao Notion","Resumo","Organização"],
    porque: "Ajuda a transformar notas e páginas em resumos e textos dentro do workspace.",
    nota: 8, plano: "Pago",
  },
  {
    nome: "Canva Magic Studio", categoria: "Imagem",
    funcao: "Conjunto de recursos de IA para design dentro do Canva.",
    uso: "Criar layouts, imagens, textos e materiais visuais.",
    fortes: ["Design fácil","Templates","Ferramentas integradas"],
    porque: "Combina recursos generativos com modelos prontos para posts, apresentações e artes.",
    nota: 8.5, plano: "Freemium",
  },
  {
    nome: "Adobe Firefly", categoria: "Imagem",
    funcao: "Ferramentas generativas de imagem e edição da Adobe.",
    uso: "Criar imagens, expandir cenas e editar elementos.",
    fortes: ["Integração Adobe","Edição generativa","Vários formatos"],
    porque: "Integra geração e edição no ecossistema Adobe para fluxos criativos.",
    nota: 8.5, plano: "Freemium",
  },
  {
    nome: "Ideogram", categoria: "Imagem",
    funcao: "Gerador de imagens conhecido por renderizar texto em artes.",
    uso: "Cartazes, capas e imagens com lettering.",
    fortes: ["Texto em imagens","Design gráfico","Estilos variados"],
    porque: "Útil quando a imagem precisa incluir palavras e títulos legíveis.",
    nota: 8.5, plano: "Freemium",
  },
  {
    nome: "Krea AI", categoria: "Imagem",
    funcao: "Plataforma criativa para gerar e aprimorar imagens.",
    uso: "Explorar conceitos visuais e melhorar imagens.",
    fortes: ["Fluxo criativo","Upscale","Geração visual"],
    porque: "Reúne ferramentas para explorar ideias e aprimorar imagens em um fluxo criativo.",
    nota: 8, plano: "Freemium",
  },
  {
    nome: "Gamma", categoria: "Produtividade",
    funcao: "Cria apresentações, documentos e páginas com assistência de IA.",
    uso: "Montar apresentações a partir de temas ou roteiros.",
    fortes: ["Criação rápida","Layouts","Apresentações"],
    porque: "Transforma temas e roteiros em apresentações estruturadas e visuais.",
    nota: 8.5, plano: "Freemium",
  },
  {
    nome: "HeyGen", categoria: "Vídeo",
    funcao: "Criação de vídeos com avatares e recursos de tradução por IA.",
    uso: "Vídeos explicativos, apresentações e conteúdo multilíngue.",
    fortes: ["Avatares","Tradução","Vozes"],
    porque: "Permite produzir vídeos com apresentadores virtuais e adaptar conteúdo para outros idiomas.",
    nota: 8, plano: "Freemium",
  },
  {
    nome: "Pika", categoria: "Vídeo",
    funcao: "Ferramenta generativa para criar e transformar clipes.",
    uso: "Vídeos curtos, animações e efeitos.",
    fortes: ["Clipes rápidos","Efeitos","Texto/imagem para vídeo"],
    porque: "Voltada à criação de vídeos curtos e efeitos visuais a partir de prompts.",
    nota: 8, plano: "Freemium",
  },
  {
    nome: "Luma Dream Machine", categoria: "Vídeo",
    funcao: "Geração de vídeo a partir de texto e imagens.",
    uso: "Criar cenas e clipes conceituais.",
    fortes: ["Texto para vídeo","Imagem para vídeo","Movimento"],
    porque: "Transforma descrições e imagens de referência em clipes com movimento.",
    nota: 8, plano: "Freemium",
  },
  {
    nome: "Zapier AI", categoria: "Produtividade",
    funcao: "Automação de tarefas entre aplicativos com recursos de IA.",
    uso: "Conectar apps e automatizar rotinas.",
    fortes: ["Automação","Conecta apps","Fluxos personalizados"],
    porque: "Cria automações conectando serviços e etapas de IA para reduzir tarefas repetitivas.",
    nota: 8, plano: "Freemium",
  },
  {
    nome: "AIVA", categoria: "Áudio",
    funcao: "Composição musical assistida por IA.",
    uso: "Criar trilhas instrumentais e ideias musicais.",
    fortes: ["Trilhas","Estilos","Composição"],
    porque: "Ajuda a gerar ideias e trilhas instrumentais para projetos audiovisuais.",
    nota: 8, plano: "Freemium",
  },
  {
    nome: "Udio", categoria: "Áudio",
    funcao: "Ferramenta generativa de música baseada em prompts.",
    uso: "Experimentar estilos e criar ideias de faixas.",
    fortes: ["Geração musical","Estilos","Ideias rápidas"],
    porque: "Permite explorar ideias musicais a partir de descrições e combinações de estilos.",
    nota: 8, plano: "Freemium",
  },
  {
    nome: "Replit AI", categoria: "Código",
    funcao: "Assistente de desenvolvimento integrado ao ambiente Replit.",
    uso: "Prototipar, criar e depurar projetos.",
    fortes: ["Ambiente online","Assistência de código","Prototipagem"],
    porque: "Combina ambiente online com recursos de IA para desenvolver e testar projetos.",
    nota: 8, plano: "Freemium",
  },
  {
    nome: "Windsurf", categoria: "Código",
    funcao: "Editor de programação com recursos de agente e IA.",
    uso: "Navegar, editar e desenvolver projetos.",
    fortes: ["Assistente integrado","Contexto do projeto","Fluxo de código"],
    porque: "Editor focado em assistência de IA para navegar e modificar projetos de software.",
    nota: 8.5, plano: "Freemium",
  },
  {
    nome: "Phind", categoria: "Pesquisa",
    funcao: "Buscador e assistente orientado a perguntas técnicas.",
    uso: "Pesquisar programação e tecnologia.",
    fortes: ["Busca técnica","Explicações","Foco em desenvolvimento"],
    porque: "Ajuda com dúvidas técnicas combinando pesquisa e explicações.",
    nota: 7.5, plano: "Freemium",
  },
  {
    nome: "Descript", categoria: "Vídeo",
    funcao: "Editor de vídeo e áudio que permite editar gravações usando a transcrição.",
    uso: "Editar vídeos falados, podcasts, remover pausas e melhorar áudio.",
    fortes: ["Edição por texto", "Remove pausas", "Melhora áudio"],
    porque: "É muito prático para vídeos de fala: você edita a transcrição como um documento, corta trechos e usa ferramentas de IA para limpar o áudio e acelerar a edição.",
    nota: 8.5, plano: "Freemium",
  },
  {
    nome: "VEED.io", categoria: "Vídeo",
    funcao: "Editor online com IA para vídeos, legendas e áudio.",
    uso: "Legendar, cortar, traduzir e preparar vídeos para redes sociais.",
    fortes: ["Legendas automáticas", "Tradução", "Editor online"],
    porque: "Reúne edição no navegador com recursos automáticos como legendas, tradução e ferramentas para adaptar vídeos às redes sociais.",
    nota: 8, plano: "Freemium",
  },
  {
    nome: "OpusClip", categoria: "Vídeo",
    funcao: "Transforma vídeos longos em clipes curtos com IA.",
    uso: "Criar Shorts, Reels e TikToks a partir de podcasts ou vídeos longos.",
    fortes: ["Recortes automáticos", "Legendas", "Formato vertical"],
    porque: "Analisa vídeos longos e sugere trechos curtos para redes sociais, com legendas e enquadramento adaptado, reduzindo bastante o trabalho manual.",
    nota: 8.5, plano: "Freemium",
  },
  {
    nome: "Filmora AI", categoria: "Vídeo",
    funcao: "Editor de vídeo com ferramentas de IA integradas para edição criativa.",
    uso: "Editar vídeos, gerar legendas, remover objetos e acelerar tarefas.",
    fortes: ["Fácil para iniciantes", "Recursos de IA", "Efeitos e templates"],
    porque: "É uma opção acessível para quem quer um editor tradicional com funções inteligentes, templates e ferramentas que simplificam tarefas comuns de edição.",
    nota: 8.5, plano: "Freemium",
  },
  {
    nome: "Adobe Premiere Pro (IA)", categoria: "Vídeo",
    funcao: "Editor profissional com recursos de IA para fluxo de edição.",
    uso: "Montagem, edição avançada, áudio, legendas e ajustes de vídeo.",
    fortes: ["Edição profissional", "Ferramentas generativas", "Integração Adobe"],
    porque: "Combina uma timeline profissional com funções inteligentes para acelerar tarefas de edição, áudio, legendas e ajustes, indicado para projetos mais complexos.",
    nota: 9, plano: "Pago",
  },
  {
    nome: "DaVinci Resolve (Neural Engine)", categoria: "Vídeo",
    funcao: "Editor profissional com recursos de IA integrados ao processamento de imagem e áudio.",
    uso: "Colorização, edição, tratamento de áudio e recursos de assistência inteligente.",
    fortes: ["Colorização profissional", "Ferramentas inteligentes", "Versão gratuita robusta"],
    porque: "É uma solução muito completa para edição e colorização profissional, com ferramentas inteligentes integradas e uma versão gratuita bastante capaz.",
    nota: 9, plano: "Freemium",
  },
  {
    nome: "Wisecut", categoria: "Vídeo",
    funcao: "Editor automatizado que simplifica vídeos falados.",
    uso: "Cortar silêncios, ajustar ritmo e adicionar legendas e música.",
    fortes: ["Cortes automáticos", "Legendas", "Edição simplificada"],
    porque: "Automatiza tarefas repetitivas de vídeos falados, ajudando a deixar gravações mais dinâmicas com menos edição manual.",
    nota: 7.5, plano: "Freemium",
  },
  {
    nome: "Vizard", categoria: "Vídeo",
    funcao: "Ferramenta de IA para transformar vídeos longos em conteúdo curto.",
    uso: "Criar cortes para redes sociais, legendar e redimensionar vídeos.",
    fortes: ["Clipes automáticos", "Legendas", "Redimensionamento"],
    porque: "Ajuda a reaproveitar entrevistas, aulas e podcasts em vários clipes curtos, com recursos de legendas e formatos para redes sociais.",
    nota: 8, plano: "Freemium",
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

const IA_DOMAINS: Record<string, string> = {
  "ChatGPT": "chatgpt.com",
  "Gemini": "gemini.google.com",
  "Claude": "claude.ai",
  "Grok": "grok.com",
  "DeepSeek": "deepseek.com",
  "Midjourney": "midjourney.com",
  "Stable Diffusion": "stability.ai",
  "DALL·E": "openai.com",
  "Leonardo AI": "leonardo.ai",
  "GitHub Copilot": "github.com",
  "Cursor": "cursor.com",
  "Lovable": "lovable.dev",
  "ElevenLabs": "elevenlabs.io",
  "Suno": "suno.com",
  "Whisper": "openai.com",
  "Runway": "runwayml.com",
  "Sora": "openai.com",
  "CapCut IA": "capcut.com",
  "Perplexity": "perplexity.ai",
  "NotebookLM": "notebooklm.google.com",
  "Microsoft Copilot": "copilot.microsoft.com",
  "Mistral Le Chat": "mistral.ai",
  "Qwen": "qwen.ai",
  "Poe": "poe.com",
  "Notion AI": "notion.so",
  "Canva Magic Studio": "canva.com",
  "Adobe Firefly": "adobe.com",
  "Ideogram": "ideogram.ai",
  "Krea AI": "krea.ai",
  "Gamma": "gamma.app",
  "HeyGen": "heygen.com",
  "Pika": "pika.art",
  "Luma Dream Machine": "lumalabs.ai",
  "Zapier AI": "zapier.com",
  "AIVA": "aiva.ai",
  "Udio": "udio.com",
  "Replit AI": "replit.com",
  "Windsurf": "windsurf.com",
  "Phind": "phind.com",
  "Descript": "descript.com",
  "VEED.io": "veed.io",
  "OpusClip": "opus.pro",
  "Filmora AI": "filmora.wondershare.com",
  "Adobe Premiere Pro (IA)": "adobe.com",
  "DaVinci Resolve (Neural Engine)": "blackmagicdesign.com",
  "Wisecut": "wisecut.video",
  "Vizard": "vizard.ai",
  "Consensus": "consensus.app"
};

const CATS = ["Todas", ...Array.from(new Set(IAS.map((i) => i.categoria)))];
const planoCor: Record<Plano, string> = {
  Gratuito: "bg-primary text-primary-foreground",
  Pago: "bg-secondary text-secondary-foreground",
  Freemium: "bg-accent text-accent-foreground",
};

function Index() {
  const [cat, setCat] = useState("Todas");
  const [busca, setBusca] = useState("");
  const [selecionada, setSelecionada] = useState<IA | null>(null);
  const [popularesAberto, setPopularesAberto] = useState(false);
  const populares = ["ChatGPT", "Gemini", "Claude", "Microsoft Copilot", "DeepSeek", "Perplexity", "Grok", "GitHub Copilot"]
    .map((nome) => IAS.find((ia) => ia.nome === nome))
    .filter((ia): ia is IA => ia !== undefined);

  const lista = useMemo(() => {
    const q = busca.trim().toLowerCase();
    return IAS.filter((i) => {
      const naCat = cat === "Todas" || i.categoria === cat;
      const naBusca =
        q === "" ||
        i.nome.toLowerCase().includes(q) ||
        i.funcao.toLowerCase().includes(q) ||
        i.categoria.toLowerCase().includes(q);
      return naCat && naBusca;
    });
  }, [cat, busca]);

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
        <a href="#tabela" className="sticker-pink mt-8 inline-block rounded-full bg-primary px-8 py-3 font-block text-xl font-semibold tracking-wide text-primary-foreground transition-transform hover:-translate-y-1">Ver a tabela ↓</a>
      </header>

      <section id="tabela" className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-display text-5xl font-bold tracking-wide md:text-6xl">Tabela das IAs</h2>
        <p className="mt-3 text-muted-foreground">
          Todas as {IAS.length} IAs disponíveis em uma tabela. Toque em qualquer linha para ver a explicação completa de por que ela é boa na função dela.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <input
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar IA, função ou categoria…"
            aria-label="Buscar IA"
            className="w-full max-w-xs rounded-full border border-border bg-card px-5 py-2 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent md:w-auto"
          />
          <div className="flex flex-wrap gap-2">
            {CATS.map((c) => (
              <button key={c} onClick={() => setCat(c)}
                className={`rounded-full border border-border px-5 py-1.5 font-block text-base font-semibold tracking-wide transition-all ${cat === c ? "border-transparent bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-muted"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-[2rem] border border-border bg-card/70">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-muted/70 font-block text-base font-semibold tracking-wide text-foreground">
                  <th scope="col" className="hidden px-3 py-4 md:table-cell md:px-5">#</th>
                  <th scope="col" className="px-3 py-4 md:px-5">IA</th>
                  <th scope="col" className="hidden px-3 py-4 md:table-cell md:px-5">Categoria</th>
                  <th scope="col" className="hidden px-3 py-4 lg:table-cell lg:px-5">Função</th>
                  <th scope="col" className="px-3 py-4 md:px-5">Plano</th>
                  <th scope="col" className="px-3 py-4 md:px-5">Nota</th>
                </tr>
              </thead>
              <tbody>
                {lista.map((ia, idx) => (
                  <tr
                    key={ia.nome}
                    onClick={() => setSelecionada(ia)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelecionada(ia);
                      }
                    }}
                    tabIndex={0}
                    aria-label={`Ver detalhes de ${ia.nome}`}
                    className="group cursor-pointer border-t border-border/70 transition-colors hover:bg-accent/10 focus-visible:bg-accent/15 focus-visible:outline-none"
                  >
                    <td className="hidden px-3 py-4 font-block text-sm text-muted-foreground md:table-cell md:px-5">{idx + 1}</td>
                    <td className="px-3 py-4 md:px-5">
                      <span className="inline-flex items-center gap-2 font-display text-lg font-semibold text-primary transition-colors group-hover:text-secondary md:text-xl"><img src={`https://www.google.com/s2/favicons?domain=${IA_DOMAINS[ia.nome] ?? "google.com"}&sz=64`} alt="" className="h-6 w-6 rounded-md object-contain" loading="lazy" />{ia.nome}</span>
                      <span className="mt-1 block w-fit rounded-full bg-accent/15 px-2.5 py-0.5 font-block text-xs font-semibold tracking-wide text-accent md:hidden">{ia.categoria}</span>
                    </td>
                    <td className="hidden px-3 py-4 md:table-cell md:px-5">
                      <span className="whitespace-nowrap rounded-full bg-accent/15 px-3 py-0.5 font-block text-sm font-semibold tracking-wide text-accent">{ia.categoria}</span>
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-muted-foreground lg:table-cell lg:px-5">{ia.funcao}</td>
                    <td className="px-3 py-4 md:px-5">
                      <span className={`whitespace-nowrap rounded-full px-2.5 py-0.5 font-block text-xs font-semibold tracking-wide md:px-3 md:py-0.5 md:text-sm ${planoCor[ia.plano]}`}>{ia.plano}</span>
                    </td>
                    <td className="px-3 py-4 md:px-5">
                      <div className="flex items-center gap-2">
                        <span className="font-block text-sm font-semibold text-primary md:text-base">{ia.nota}/10</span>
                        <span className="inline-block h-2 w-10 overflow-hidden rounded-full bg-muted sm:w-16">
                          <span className="block h-full rounded-full bg-gradient-to-r from-secondary to-spray" style={{ width: `${ia.nota * 10}%` }} />
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
                {lista.length === 0 && (
                  <tr className="border-t border-border/70">
                    <td colSpan={6} className="px-5 py-10 text-center text-muted-foreground">
                      Nenhuma IA encontrada com esse filtro ou busca.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Mostrando {lista.length} de {IAS.length} IAs.
        </p>
      </section>

      <button
        type="button"
        onClick={() => setPopularesAberto(true)}
        className="fixed bottom-5 right-5 z-40 rounded-full bg-primary px-5 py-3 font-block text-base font-semibold tracking-wide text-primary-foreground shadow-xl transition-transform hover:-translate-y-1 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:bottom-7 sm:right-7 sm:px-6 sm:py-4 sm:text-lg"
        aria-label="Abrir lista de IAs populares"
      >
        🔥 <span className="hidden sm:inline">IAs populares</span><span className="sm:hidden">Populares</span>
      </button>

      <Dialog open={popularesAberto} onOpenChange={setPopularesAberto}>
        <DialogContent className="card-soft max-h-[85vh] overflow-y-auto rounded-[2rem] border-border sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-4xl font-semibold text-primary">🔥 IAs populares</DialogTitle>
            <DialogDescription className="text-base text-muted-foreground">Uma seleção de ferramentas de IA bastante usadas e conhecidas.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 pt-2">
            {populares.map((ia, index) => (
              <button
                type="button"
                key={ia.nome}
                onClick={() => { setPopularesAberto(false); setSelecionada(ia); }}
                className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 text-left transition-colors hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span className="font-block text-lg text-primary">{index + 1}.</span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2 font-display text-xl font-semibold text-primary"><img src={`https://www.google.com/s2/favicons?domain=${IA_DOMAINS[ia.nome] ?? "google.com"}&sz=64`} alt="" className="h-6 w-6 rounded-md object-contain" loading="lazy" />{ia.nome}</span>
                  <span className="mt-0.5 block text-sm text-muted-foreground">{ia.categoria} · {ia.funcao}</span>
                </span>
                <span className="text-muted-foreground">↗</span>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={selecionada !== null} onOpenChange={(aberto) => !aberto && setSelecionada(null)}>
        <DialogContent className="card-soft max-h-[85vh] overflow-y-auto rounded-[2rem] border-border sm:max-w-lg">
          {selecionada && (
            <>
              <DialogHeader>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-accent/15 px-3 py-0.5 font-block text-sm font-semibold tracking-wide text-accent">{selecionada.categoria}</span>
                  <span className={`rounded-full px-3 py-0.5 font-block text-sm font-semibold tracking-wide ${planoCor[selecionada.plano]}`}>{selecionada.plano}</span>
                </div>
                <DialogTitle className="flex items-center gap-3 font-display text-4xl font-semibold text-primary"><img src={`https://www.google.com/s2/favicons?domain=${IA_DOMAINS[selecionada.nome] ?? "google.com"}&sz=64`} alt="" className="h-9 w-9 rounded-lg object-contain" />{selecionada.nome}</DialogTitle>
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

                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`como usar ${selecionada.nome} tutorial para iniciantes português`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-block text-base font-semibold tracking-wide text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  🎥 Aprenda a usá-la.
                </a>
                <p className="text-center text-xs text-muted-foreground">Abrimos uma busca por tutoriais em português para essa ferramenta, para você escolher um vídeo atualizado.</p>
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
