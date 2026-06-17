import { LessonShell } from "@/components/LessonShell";
import { curriculum } from "@/data/curriculum";

export default function Home() {
  const currentModule = curriculum[0];
  const currentLesson = currentModule.lessons[0];

  return <LessonShell module={currentModule} lesson={currentLesson} />;
}
