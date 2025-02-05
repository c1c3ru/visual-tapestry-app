import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import PlayerForm from '../PlayerForm';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { useToast } from '@/hooks/use-toast';

jest.mock('@/stores/usePlayerStore');
jest.mock('@/hooks/use-toast');

const createMockStore = () => ({
  newPlayer: {
    name: "",
    nickname: "",
    birthDate: "",
    isGuest: false,
    sport: "futebol",
    selectedPositions: [],
    rating: 0,
    includeInDraw: false,
    present: false,
    paid: false,
    registered: true,
    selected: false,
  },
  errors: {
    name: false,
    isGuest: false,
    selectedPositions: false,
    rating: false,
  },
  setNewPlayer: jest.fn(),
  setErrors: jest.fn(),
  addPlayer: jest.fn(),
  resetForm: jest.fn(),
});

describe('PlayerForm', () => {
  let mockStore;
  const mockToast = jest.fn();

  beforeEach(() => {
    mockStore = createMockStore();
    (usePlayerStore as jest.Mock).mockReturnValue(mockStore);
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders form fields correctly', () => {
    render(<PlayerForm />);
    
    expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Apelido/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Data de Nascimento/i)).toBeInTheDocument();
    expect(screen.getByText(/É convidado?/i)).toBeInTheDocument();
  });

  test('submits form with valid data', async () => {
    render(<PlayerForm />);
    
    await act(async () => {
      await userEvent.type(screen.getByLabelText(/Nome/i), 'João Silva');
      await userEvent.type(screen.getByLabelText(/Apelido/i), 'João');
      fireEvent.change(screen.getByLabelText(/Data de Nascimento/i), {
        target: { value: '1990-01-01' },
      });
      fireEvent.click(screen.getByText(/Salvar/i));
    });

    expect(mockStore.addPlayer).toHaveBeenCalled();
    expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Jogador Adicionado',
    }));
  });

  test('shows validation errors for empty required fields', async () => {
    render(<PlayerForm />);
    
    await act(async () => {
      fireEvent.click(screen.getByText(/Salvar/i));
    });

    expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Erro',
      variant: 'destructive',
    }));
  });
});