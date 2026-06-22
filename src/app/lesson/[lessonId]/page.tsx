import { notFound } from "next/navigation";
import { findLesson } from "@/data/curriculum";
import { LessonShell } from "@/components/LessonShell";

type LessonPageProps = {
  params: Promise<{ lessonId: string }>;
  searchParams?: Promise<{ slide?: string }>;
};

export default async function LessonPage({
  params,
  searchParams,
}: LessonPageProps) {
  const [{ lessonId }, query] = await Promise.all([
    params,
    searchParams ?? Promise.resolve<{ slide?: string }>({}),
  ]);
  const result = findLesson(lessonId);
  if (!result) notFound();
  const requestedSlide = Number(query.slide);
  const initialSlideIndex = Number.isFinite(requestedSlide) ? Math.max(requestedSlide - 1, 0) : 0;
  return <LessonShell module={result.module} lesson={result.lesson} initialSlideIndex={initialSlideIndex} />;
}
