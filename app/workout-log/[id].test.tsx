import { render, screen, fireEvent } from '@testing-library/react-native';
import React from 'react';

jest.mock('@/hooks/useColorScheme', () => ({
  useColorScheme: () => 'light',
}));

const mockGoBack = jest.fn();
jest.mock('expo-router', () => ({
  useLocalSearchParams: () => ({ id: 'w1' }),
  Stack: {
    Screen: () => null,
  },
  useRouter: () => ({ back: mockGoBack }),
}));

const mockWorkout = {
  id: 'w1',
  name: 'Push Day',
  createdAt: new Date(),
  exercises: [
    { id: 'e1', name: 'Bench Press', reps: 10, numberOfSets: 3, weight: 60 },
    { id: 'e2', name: 'Squat', reps: 8, numberOfSets: 4 },
  ],
};

const mockLog = { id: 'w1', workout: mockWorkout, exercises: [], completedAt: undefined };
const mockCompleteExercise = jest.fn();
const mockGetLog = jest.fn(() => mockLog);
const mockGetWorkoutById = jest.fn(() => mockWorkout);

jest.mock('@/contexts/WorkoutContext', () => ({
  useWorkouts: () => ({ getWorkoutById: mockGetWorkoutById }),
  useWorkoutLogs: () => ({
    workoutLogs: {},
    getLog: mockGetLog,
    completeExercise: mockCompleteExercise,
  }),
}));

// Import after mocks
// eslint-disable-next-line @typescript-eslint/no-require-imports
const WorkoutLogScreen = require('@/app/workout-log/[id]').default;

function renderScreen() {
  return render(<WorkoutLogScreen />);
}

describe('WorkoutLogScreen', () => {
  beforeEach(() => {
    mockCompleteExercise.mockClear();
    mockGetLog.mockReturnValue(mockLog);
    mockGetWorkoutById.mockReturnValue(mockWorkout);
  });

  it('shows exercise names', () => {
    renderScreen();
    expect(screen.getByText('Bench Press')).toBeTruthy();
    expect(screen.getByText('Squat')).toBeTruthy();
  });

  it('shows progress counter', () => {
    renderScreen();
    expect(screen.getByText('0 / 2 exercises completed')).toBeTruthy();
  });

  it('shows sets info for exercises', () => {
    renderScreen();
    expect(screen.getByText('3 sets · 10 reps · 60 kg')).toBeTruthy();
    expect(screen.getByText('4 sets · 8 reps')).toBeTruthy();
  });

  it('calls completeExercise when exercise row is pressed', () => {
    renderScreen();
    fireEvent.press(screen.getByText('Bench Press'));
    expect(mockCompleteExercise).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'w1' }),
      'e1',
    );
  });

  it('shows not found message when workout does not exist', () => {
    mockGetWorkoutById.mockReturnValue(undefined);
    renderScreen();
    expect(screen.getByText('Workout not found')).toBeTruthy();
  });

  it('shows empty state when workout has no exercises', () => {
    mockGetWorkoutById.mockReturnValue({ ...mockWorkout, exercises: [] });
    renderScreen();
    expect(screen.getByText('No exercises yet')).toBeTruthy();
  });
});
