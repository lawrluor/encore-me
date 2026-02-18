import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Set from './page';

import { getActById } from '@/lib/db/acts';
import { getSetById } from '@/lib/db/sets';
import { getSongsBySetId, getSongsByActId } from '@/lib/db/songs';

// Mock dependencies
jest.mock('@/lib/db/acts', () => ({
  getActById: jest.fn(),
}));

jest.mock('@/lib/db/sets', () => ({
  getSetById: jest.fn(),
}));

jest.mock('@/lib/db/songs', () => ({
  getSongsBySetId: jest.fn(),
  getSongsByActId: jest.fn(),
}));

// Mock child components
jest.mock('@/components/CreateSongForm', () => ({
  CreateSongForm: ({ actId, setId }: { actId?: string, setId: string }) => (
    <div data-testid="create-song-form">
      CreateSongForm (Act: {actId}, Set: {setId})
    </div>
  ),
}));

jest.mock('@/components/SongList', () => ({
  SongList: ({ initialSongs }: { initialSongs: { id: string; title: string }[] }) => (
    <div data-testid="song-list">
      SongList ({initialSongs.length} items)
    </div>
  ),
}));


describe('Set Page', () => {
  const mockSetSongs = [
    { id: 'song-1', title: 'Set Song 1' },
    { id: 'song-2', title: 'Set Song 2' },
  ];

  const mockActSongs = [
    { id: 'song-3', title: 'Act Song 1' },
    { id: 'song-4', title: 'Act Song 2' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders page with set songs and act songs when both IDs are present', async () => {
    // Arrange
    (getSetById as jest.Mock).mockResolvedValue({ id: 'set-123', title: 'Test Set', act_id: 'act-456' });
    (getActById as jest.Mock).mockResolvedValue({ id: 'act-456', name: 'Test Act' });
    (getSongsBySetId as jest.Mock).mockResolvedValue(mockSetSongs);
    (getSongsByActId as jest.Mock).mockResolvedValue(mockActSongs);

    const params = Promise.resolve({ setId: 'set-123' });
    const searchParams = Promise.resolve({ actId: 'act-456' });

    // Act
    const jsx = await Set({ params, searchParams });
    render(jsx);

    // Assert
    // Check CreateSongForm props via text content we mocked
    expect(screen.getByTestId('create-song-form')).toHaveTextContent('Act: act-456');
    expect(screen.getByTestId('create-song-form')).toHaveTextContent('Set: set-123');

    // Check SongLists
    const songLists = screen.getAllByTestId('song-list');
    expect(songLists).toHaveLength(2);
    expect(songLists[0]).toHaveTextContent(`SongList (${mockSetSongs.length} items)`); // Set songs
    expect(songLists[1]).toHaveTextContent(`SongList (${mockActSongs.length} items)`); // Act songs

    // Check service calls
    expect(getSongsBySetId).toHaveBeenCalledWith('set-123');
    expect(getSongsByActId).toHaveBeenCalledWith('act-456');
  });

  test('renders only set songs if actId is missing', async () => {
    // Arrange
    (getSetById as jest.Mock).mockResolvedValue({ id: 'set-123', title: 'Test Set', act_id: 'act-456' });
    (getActById as jest.Mock).mockResolvedValue({ id: 'act-456', name: 'Test Act' });
    (getSongsBySetId as jest.Mock).mockResolvedValue(mockSetSongs);
    (getSongsByActId as jest.Mock).mockResolvedValue([]);

    const params = Promise.resolve({ setId: 'set-123' });
    const searchParams = Promise.resolve({}); // No actId

    // Act
    const jsx = await Set({ params, searchParams });
    render(jsx);

    // Assert
    expect(getSongsBySetId).toHaveBeenCalledWith('set-123');

    // Check that we see "No songs for this act yet."
    expect(screen.getByText('No songs for this act yet.')).toBeInTheDocument();

    // Should still have set songs
    const songLists = screen.getAllByTestId('song-list');
    expect(songLists).toHaveLength(1);
    expect(songLists[0]).toHaveTextContent(`SongList (${mockSetSongs.length} items)`);
  });

  test('displays empty state messages when song lists are empty', async () => {
    // Arrange
    (getSetById as jest.Mock).mockResolvedValue({ id: 'set-123', title: 'Test Set', act_id: 'act-456' });
    (getActById as jest.Mock).mockResolvedValue({ id: 'act-456', name: 'Test Act' });
    (getSongsBySetId as jest.Mock).mockResolvedValue([]);
    (getSongsByActId as jest.Mock).mockResolvedValue([]);

    const params = Promise.resolve({ setId: 'set-123' });
    const searchParams = Promise.resolve({ actId: 'act-456' });

    // Act
    const jsx = await Set({ params, searchParams });
    render(jsx);

    // Assert
    expect(screen.getByText('No songs in the set yet.')).toBeInTheDocument();
    expect(screen.getByText('No songs for this act yet.')).toBeInTheDocument();

    // No SongLists should be rendered
    expect(screen.queryByTestId('song-list')).not.toBeInTheDocument();
  });
});
