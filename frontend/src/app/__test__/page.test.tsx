import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../page"; // ajuste o caminho conforme sua estrutura
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import "@testing-library/jest-dom"; // garante os matchers do jest-dom

// Mock do axios
import { beforeEach, describe, expect, it, jest } from "@jest/globals";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Dados mockados para a API
const mockItems = [
  {
    id: "1",
    name: "Banana",
    unit: "kg",
    category: "fruta",
    quantity: 2,
    completed: false,
  },
  {
    id: "2",
    name: "Pão",
    unit: "unidade",
    category: "padaria",
    quantity: 5,
    completed: true,
  },
];

// Se desejar, você pode mockar componentes filhos (como AddItemForm e ItemOptions)
jest.mock("@/components/forms/AddItemForm", () => ({
  AddItemForm: ({ onItemAdded }: { onItemAdded: () => void }) => (
    <button onClick={onItemAdded}>Mock AddItemForm</button>
  ),
}));
jest.mock("@/components/ItemOptions", () => ({
  ItemOptions: () => <div>ItemOptions</div>,
}));

// Função helper para renderizar com React Query
const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("Home Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Para a maioria dos testes, simula que a API retorna os itens mockados
    mockedAxios.get.mockResolvedValue({ data: mockItems });
    mockedAxios.put.mockResolvedValue({});
  });

  it("renderiza o título corretamente", async () => {
    renderWithClient(<Home />);
    expect(screen.getByText("🛒 Lista de Compras")).toBeInTheDocument();
  });

  it("exibe os itens da lista quando carregados", async () => {
    renderWithClient(<Home />);
    await waitFor(() => {
      expect(screen.getByText("Banana")).toBeInTheDocument();
      expect(screen.getByText("Pão")).toBeInTheDocument();
    });
  });

  it("exibe skeletons enquanto está carregando", async () => {
    // Simula uma promise que nunca resolve para manter isLoading true
    mockedAxios.get.mockImplementationOnce(() => new Promise(() => {}));
    renderWithClient(<Home />);
    // Aqui, para que o teste funcione, seu componente <Skeleton /> precisa ter role="progressbar"
    const skeletons = await screen.findAllByRole("progressbar");
    expect(skeletons).toHaveLength(5);
  });

  it("abre o modal de adicionar item ao clicar em ➕ Adicionar item", async () => {
    // Nesse teste, o AddItemForm está mockado e renderiza um botão "Mock AddItemForm"
    renderWithClient(<Home />);
    const addButton = screen.getByRole("button", { name: /adicionar item/i });
    userEvent.click(addButton);
    await waitFor(() => {
      expect(screen.getByText("Mock AddItemForm")).toBeInTheDocument();
    });
  });

  it("permite marcar um item como concluído", async () => {
    renderWithClient(<Home />);
    // Espera que os itens sejam carregados e pega o primeiro checkbox
    const checkboxes = await screen.findAllByRole("checkbox");
    userEvent.click(checkboxes[0]);

    await waitFor(() => {
      expect(mockedAxios.put).toHaveBeenCalledWith(
        "http://localhost:5000/api/shopping-list/1",
        expect.objectContaining({ completed: true })
      );
    });
  });

  it("exibe mensagem de lista vazia quando nenhum item é retornado", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });
    renderWithClient(<Home />);
    await waitFor(() => {
      expect(screen.getByText("Nenhum item encontrado.")).toBeInTheDocument();
    });
  });
});
