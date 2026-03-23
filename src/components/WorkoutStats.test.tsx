import { WorkoutStats } from '@/components/WorkoutStats';
import { Exercise } from '@/types/workout';
import { render, screen } from '@testing-library/react-native';
import React from 'react';

const exercises: Exercise[] = [
  { id: 'e1', name: 'Bench Press', reps: 10, numberOfSets: 3 },
  { id: 'e2', name: 'Push Up', reps: 12, numberOfSets: 4 },
];

describe('WorkoutStats', () => {
  it('renders total reps label', () => {
    render(<WorkoutStats exercises={exercises} />);
    expect(screen.getByText('Total Reps')).toBeTruthy();
  });

  it('renders est. time label', () => {
    render(<WorkoutStats exercises={exercises} />);
    expect(screen.getByText('Est. Time')).toBeTruthy();
  });

  it('computes total reps correctly', () => {
    // (10 * 3) + (12 * 4) = 30 + 48 = 78
    render(<WorkoutStats exercises={exercises} />);
    expect(screen.getByText('78')).toBeTruthy();
  });

  it('computes estimated time correctly', () => {
    // totalReps = 78, totalSets = 7, estMinutes = round((78*3 + 7*90) / 60) = round(14.4) = 14
    render(<WorkoutStats exercises={exercises} />);
    expect(screen.getByText('14')).toBeTruthy();
  });

  it('renders zero stats for empty exercises', () => {
    render(<WorkoutStats exercises={[]} />);
    expect(screen.getAllByText('0')).toHaveLength(2);
  });

  it('handles a single exercise', () => {
    const single: Exercise[] = [
      { id: 'e1', name: 'Squat', reps: 5, numberOfSets: 5 },
    ];
    // totalReps = 25, totalSets = 5, estMinutes = round((25*3 + 5*90) / 60) = round(8.75) = 9
    render(<WorkoutStats exercises={single} />);
    expect(screen.getByText('25')).toBeTruthy();
    expect(screen.getByText('9')).toBeTruthy();
  });
});
