'use client';

import { useState } from 'react';

interface MoodOption {
  id: string;
  label: string;
  emoji: string;
  color: string;
}

interface MoodSelectorProps {
  title: string;
  options: MoodOption[];
  selectedMood?: string;
  onMoodSelect: (moodId: string) => void;
}

export function MoodSelector({ title, options, selectedMood, onMoodSelect }: MoodSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
      <div className="grid grid-cols-2 gap-3">
        {options.map((mood) => (
          <button
            key={mood.id}
            onClick={() => onMoodSelect(mood.id)}
            className={`p-4 rounded-lg border transition-all duration-base ${
              selectedMood === mood.id
                ? 'border-accent bg-accent/10 shadow-card'
                : 'border-primary/10 bg-surface hover:bg-surface/80'
            }`}
          >
            <div className="text-2xl mb-2">{mood.emoji}</div>
            <div className="text-sm font-medium text-text-primary">{mood.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

export const currentMoods: MoodOption[] = [
  { id: 'stressed', label: 'Stressed', emoji: '😰', color: 'red' },
  { id: 'anxious', label: 'Anxious', emoji: '😟', color: 'orange' },
  { id: 'unfocused', label: 'Unfocused', emoji: '🤯', color: 'yellow' },
  { id: 'tired', label: 'Tired', emoji: '😴', color: 'blue' },
  { id: 'restless', label: 'Restless', emoji: '😣', color: 'purple' },
  { id: 'overwhelmed', label: 'Overwhelmed', emoji: '🤪', color: 'pink' },
];

export const desiredOutcomes: MoodOption[] = [
  { id: 'calm', label: 'Calm Down', emoji: '😌', color: 'green' },
  { id: 'focus', label: 'Focus', emoji: '🎯', color: 'blue' },
  { id: 'sleep', label: 'Sleep', emoji: '💤', color: 'indigo' },
  { id: 'energy', label: 'Energize', emoji: '⚡', color: 'yellow' },
  { id: 'confidence', label: 'Confidence', emoji: '💪', color: 'orange' },
  { id: 'peace', label: 'Inner Peace', emoji: '🕯️', color: 'purple' },
];
