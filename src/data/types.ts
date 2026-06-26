export type SlideTone = "intro" | "concept" | "practice" | "summary";

export type LessonVisual = {
  src: string;
  alt: string;
};

export type HtmlDemo = {
  label: string;
  code: string;
  previewHeight?: number;
};

export type CodeAnnotation = {
  token: string;
  title: string;
  description: string;
};

export type KeywordCard = {
  term: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
  detail?: string;
  detailSteps?: {
    step: string;
    formula?: string;
    guidance: string;
    prompt: string;
  }[];
  example?: string;
};

export type FlowStep = {
  icon: string;
  title: string;
  description: string;
  note?: string;
  highlight?: boolean;
};

export type LessonSlide = {
  id: string;
  title: string;
  displayNumber?: string;
  isSubSlide?: boolean;
  eyebrow?: string;
  icon?: string;
  tone: SlideTone;
  body: string[];
  copyPrompts?: {
    label: string;
    prompt: string;
  }[];
  checklist?: string[];
  keywordCards?: KeywordCard[];
  callout?: {
    label: string;
    text: string;
  };
  visual?: LessonVisual;
  timeline?: KeywordCard[];
  titleImage?: string;
  codeBlock?: { code: string; language?: string };
  annotatedCode?: { code: string; language?: string; annotations: CodeAnnotation[]; previewCode?: string; previewHeight?: number };
  htmlDemos?: HtmlDemo[];
  flow?: FlowStep[];
  link?: { label: string; url: string };
  codePractice?: { storageKey: string; targetImage?: string; targetAlt?: string; placeholder?: string; targetCode?: string };
};

export type Lesson = {
  id: string;
  title: string;
  duration: string;
  objective: string;
  slides: LessonSlide[];
};

export type CourseModule = {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  hidden?: boolean;
};
