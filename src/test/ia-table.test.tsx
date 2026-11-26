import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Route } from "@/routes/index";

const Pagina = Route.options.component as () => JSX.Element;

describe("Tabela de IAs", () => {
  it("mostra as 21 IAs em linhas de uma tabela", () => {
    render(<Pagina />);

    const tabela = screen.getByRole("table");
    const linhas = within(tabela).getAllByRole("row");
    // 1 linha de cabeçalho + 21 IAs
    expect(linhas).toHaveLength(22);

    for (const nome of ["ChatGPT", "NotebookLM", "Consensus", "Sora"]) {
      expect(within(tabela).getByText(nome, { exact: true })).toBeTruthy();
    }
  });

  it("filtra a tabela pela busca de texto", () => {
    render(<Pagina />);

    fireEvent.change(screen.getByLabelText("Buscar IA"), { target: { value: "vídeo" } });

    const tabela = screen.getByRole("table");
    const nomes = within(tabela)
      .getAllByRole("row")
      .slice(1)
      .map((linha) => within(linha).getByText(/^(Runway|Sora|CapCut IA)$/).textContent);

    expect(nomes.sort()).toEqual(["CapCut IA", "Runway", "Sora"]);
  });

  it("abre a explicação completa ao clicar em uma linha", () => {
    render(<Pagina />);

    const tabela = screen.getByRole("table");
    fireEvent.click(within(tabela).getByText("Claude", { exact: true }));

    const janela = screen.getByRole("dialog");
    expect(within(janela).getByText("Por que ela é boa nisso?")).toBeTruthy();
    expect(within(janela).getByText(/tom mais humano entre as IAs/)).toBeTruthy();
  });
});
