import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Home from "../page"; // ajuste o path se necessário
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const BASE_URL = process.env.RENDER_URL || "http://localhost:5000";

const mockItems = [
  {
    id: "1",
    name: "Maçã",
    unit: "kg",
    category: "fruta",
    quantity: 2,
    completed: false,
  },
];

function renderWithClient(ui: React.ReactElement) {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

describe("Home", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza título corretamente", async () => {
    mockedAxios.get.mockResolvedValue({ data: [] });
    renderWithClient(<Home />);

    expect(screen.getByText("🛒 Lista de Compras")).toBeInTheDocument();
  });

  it("exibe skeletons quando está carregando", async () => {
    mockedAxios.get.mockImplementation(
      () =>
        new Promise((resolve) => setTimeout(() => resolve({ data: [] }), 2000))
    );

    renderWithClient(<Home />);
    expect(await screen.findAllByRole("progressbar")).toHaveLength(5);
  });

  it("exibe itens da lista quando carregados", async () => {
    mockedAxios.get.mockResolvedValue({ data: mockItems });
    renderWithClient(<Home />);

    expect(await screen.findByText("Maçã")).toBeInTheDocument();
    expect(screen.getByText("2 kg")).toBeInTheDocument();
    expect(screen.getByText("fruta")).toBeInTheDocument();
  });

  it("abre modal ao clicar em ➕ Adicionar item", async () => {
    mockedAxios.get.mockResolvedValue({ data: [] });
    renderWithClient(<Home />);

    const button = screen.getByText("➕ Adicionar item");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Adicionar item")).toBeInTheDocument();
    });
  });

  it("permite marcar item como concluído", async () => {
    mockedAxios.get.mockResolvedValue({ data: mockItems });
    mockedAxios.put.mockResolvedValue({}); // simula sucesso

    renderWithClient(<Home />);
    const checkbox = await screen.findByRole("checkbox");
    fireEvent.click(checkbox);

    await waitFor(() =>
      expect(mockedAxios.put).toHaveBeenCalledWith(
        `http://${BASE_URL}/api/shopping-list/1`,
        expect.objectContaining({ completed: true })
      )
    );
  });
});
