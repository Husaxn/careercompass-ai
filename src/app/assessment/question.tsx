import { useRouter } from 'expo-router';
import { useState } from 'react';

import { Question } from '@/features/assessment/screens';
import { computeAssessment, QUESTIONS } from '@/features/assessment/questions';
import { assessmentStore } from '@/store';

export default function AssessmentQuestionScreen() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleSelect = (optionIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = optionIndex;
      return next;
    });
  };

  const handleNext = () => {
    if (index < QUESTIONS.length - 1) {
      setIndex((i) => i + 1);
      return;
    }

    const { topCareers, scores } = computeAssessment(answers);
    assessmentStore.addResult({
      id: `a${Date.now()}`,
      type: 'Interest assessment',
      completedAt: new Date().toISOString(),
      topCareers,
      scores,
    });
    router.replace('/assessment/result');
  };

  return (
    <Question
      total={QUESTIONS.length}
      index={index}
      question={QUESTIONS[index]}
      selected={answers[index] ?? null}
      onSelect={handleSelect}
      onNext={handleNext}
      onBack={() => {
        if (index === 0) {
          router.canGoBack() ? router.back() : router.replace('/home');
        } else {
          setIndex((i) => i - 1);
        }
      }}
    />
  );
}