export * from "./types";
import type { CourseModule, Lesson } from "./types";

import { lesson1 } from "./lessons/lesson-1";
import { lesson1_2 } from "./lessons/lesson-1-2";
import { htmlBasicLesson } from "./lessons/html-basic";
import { lesson2_1 } from "./lessons/lesson-2-1";
import { lesson2_2 } from "./lessons/lesson-2-2";

export function findLesson(lessonId: string): { module: CourseModule; lesson: Lesson } | null {
  for (const mod of curriculum) {
    for (const lesson of mod.lessons) {
      if (lesson.id === lessonId) return { module: mod, lesson };
    }
  }
  return null;
}

export const curriculum: CourseModule[] = [
  {
    id: "module-1",
    title: "Module 1",
    description: "Bootcamp Preparation 2.1",
    lessons: [lesson1, lesson1_2, htmlBasicLesson],
  },
  {
    id: "module-2",
    hidden: true,
    title: "Module 2",
    description: "Lập trình căn bản: tư duy, biến, kiểu dữ liệu và điều kiện.",
    lessons: [lesson2_1, lesson2_2],
  },
];
