"use client";

import React from "react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Prism from "prismjs";
import "prismjs/components/prism-markup";
import type { CodeAnnotation, CourseModule, HtmlDemo, KeywordCard, Lesson, LessonSlide, SlideTone } from "@/data/curriculum";

type LessonShellProps = {
  module: CourseModule;
  lesson: Lesson;
  initialSlideIndex?: number;
};

const toneLabels: Record<SlideTone, string> = {
  intro: "Mở đầu",
  concept: "Kiến thức",
  practice: "Thực hành",
  summary: "Tổng kết",
};

const fallbackToneIcons: Record<SlideTone, string> = {
  intro: "fa-graduation-cap",
  concept: "fa-book-open",
  practice: "fa-screwdriver-wrench",
  summary: "fa-flag-checkered",
};

export function LessonShell({ module, lesson, initialSlideIndex = 0 }: LessonShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeIndex, setActiveIndex] = useState(() =>
    clampSlideIndex(initialSlideIndex, lesson.slides.length),
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<KeywordCard | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  const activeSlide = lesson.slides[activeIndex];
  const progress = useMemo(
    () => ((activeIndex + 1) / lesson.slides.length) * 100,
    [activeIndex, lesson.slides.length],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (selectedCard) {
        if (event.key === "Escape") setSelectedCard(null);
        return;
      }

      if (event.key === "ArrowRight" || event.key === "PageDown") {
        setActiveIndex((current) => Math.min(current + 1, lesson.slides.length - 1));
      }

      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        setActiveIndex((current) => Math.max(current - 1, 0));
      }

      if (event.key === "Escape") {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lesson.slides.length, selectedCard]);

  useEffect(() => {
    setCopiedPrompt(null);
  }, [activeSlide.id]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (activeIndex === 0) {
      params.delete("slide");
    } else {
      params.set("slide", String(activeIndex + 1));
    }

    const query = params.toString();
    const currentQuery = searchParams.toString();
    if (query === currentQuery) return;

    const nextUrl = query ? `${pathname}?${query}` : pathname;
    router.replace(nextUrl, { scroll: false });
  }, [activeIndex, pathname, router, searchParams]);

  const goBack = () => setActiveIndex((current) => Math.max(current - 1, 0));
  const goNext = () => setActiveIndex((current) => Math.min(current + 1, lesson.slides.length - 1));
  const closeSidebar = () => setSidebarOpen(false);
  const activeDisplayNumber = getSlideNumber(activeSlide, activeIndex);
  const handleCopyPrompt = async (prompt: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(prompt);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = prompt;
        textarea.setAttribute("readonly", "true");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopiedPrompt(prompt);
    } catch {
      setCopiedPrompt(null);
    }
  };

  return (
    <main className="lesson-app">
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar} aria-hidden="true" />
      )}

      <aside className={`lesson-sidebar${sidebarOpen ? " open" : ""}`} aria-label="Danh sách bài học">
        <div className="brand">
          <span className="brand-logo" role="img" aria-label="CodeGym" />
          <div>
            <strong>CodeGym</strong>
            <span>Lesson Studio</span>
          </div>
          <button className="sidebar-close" onClick={closeSidebar} type="button" aria-label="Đóng menu">
            <i className="fa-solid fa-xmark" aria-hidden="true" />
          </button>
        </div>

        <Link href="/" className="back-home-link">
          <i className="fa-solid fa-arrow-left" aria-hidden="true" />
          Trang chủ
        </Link>

        <section className="module-panel">
          <p>{module.title}</p>
          <h1>{lesson.title}</h1>
          <span>{lesson.duration}</span>
        </section>

        <nav className="slide-list" aria-label="Danh sách slide">
          {lesson.slides.map((slide, index) => (
            <button
              className={[
                "slide-link",
                slide.isSubSlide ? "sub-slide-link" : "",
                index === activeIndex ? "active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              key={slide.id}
              onClick={() => {
                setActiveIndex(index);
                closeSidebar();
              }}
              type="button"
            >
              <span>{getSlideNumber(slide, index)}</span>
              <strong>{slide.title}</strong>
            </button>
          ))}
        </nav>
      </aside>

      <section className="stage">
        <header className="topbar">
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(true)}
            type="button"
            aria-label="Mở danh sách slide"
          >
            <i className="fa-solid fa-bars" aria-hidden="true" />
          </button>
          <div>
            <span>{module.description}</span>
            <strong>{lesson.objective}</strong>
          </div>
          <div className="counter">
            {activeDisplayNumber}/{lesson.slides.length}
          </div>
        </header>

        <div className="progress" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>

        <SlideView
          key={activeSlide.id}
          slide={activeSlide}
          index={activeIndex}
          onCardSelect={setSelectedCard}
          onCopyPrompt={handleCopyPrompt}
          copiedPrompt={copiedPrompt}
        />

        <footer className="controls" aria-label="Điều hướng slide">
          <button onClick={goBack} disabled={activeIndex === 0} type="button" aria-label="Slide trước">
            <span aria-hidden="true">←</span>
            Trước
          </button>
          <div className="step-dots">
            {lesson.slides.map((slide, index) => (
              <button
                key={slide.id}
                className={index === activeIndex ? "dot active" : "dot"}
                onClick={() => setActiveIndex(index)}
                type="button"
                aria-label={`Đến slide ${index + 1}`}
              />
            ))}
          </div>
          <button
            className="primary"
            onClick={goNext}
            disabled={activeIndex === lesson.slides.length - 1}
            type="button"
            aria-label="Slide tiếp theo"
          >
            Tiếp
            <span aria-hidden="true">→</span>
          </button>
        </footer>
      </section>

      {selectedCard && (
        <KeywordModal card={selectedCard} onClose={() => setSelectedCard(null)} />
      )}
    </main>
  );
}

function SlideView({
  slide,
  index,
  onCardSelect,
  onCopyPrompt,
  copiedPrompt,
}: {
  slide: LessonSlide;
  index: number;
  onCardSelect: (card: KeywordCard) => void;
  onCopyPrompt: (prompt: string) => void;
  copiedPrompt: string | null;
}) {
  return (
    <article className={`slide-card tone-${slide.tone}`}>
      <div className="slide-number">{getSlideNumber(slide, index)}</div>
      <div className={slide.visual ? "slide-content with-visual" : "slide-content"}>
        <div className="slide-main">
          <div className="slide-meta">
            <i className={`fa-solid ${slide.icon ?? fallbackToneIcons[slide.tone]}`} aria-hidden="true" />
            <span>{slide.eyebrow ?? toneLabels[slide.tone]}</span>
          </div>

          <h2>
            {slide.titleImage && (
              <img className="title-image" src={slide.titleImage} alt="" aria-hidden="true" />
            )}
            {slide.title}
          </h2>

          <div className="body-copy">
            {slide.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {slide.callout ? (
            <aside className="callout">
              <span>{slide.callout.label}</span>
              <strong>{slide.callout.text}</strong>
            </aside>
          ) : null}

          {slide.link ? (
            <a
              className="slide-link-btn"
              href={slide.link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
              {slide.link.label}
            </a>
          ) : null}

          {slide.annotatedCode ? (
            <AnnotatedCodeBlockView
              code={slide.annotatedCode.code}
              language={slide.annotatedCode.language}
              annotations={slide.annotatedCode.annotations}
            />
          ) : null}

          {slide.codeBlock ? (
            <CodeBlockView code={slide.codeBlock.code} language={slide.codeBlock.language} />
          ) : null}

          {slide.htmlDemos ? (
            <div className="html-demos">
              {slide.htmlDemos.map((demo) => (
                <SingleHtmlDemo key={demo.label} demo={demo} />
              ))}
            </div>
          ) : null}

          {slide.copyPrompts ? (
            <div className="prompt-grid" aria-label="Prompt mẫu có thể sao chép">
              {slide.copyPrompts.map((item) => {
                const isCopied = copiedPrompt === item.prompt;
                return (
                  <section className="prompt-card" key={`${slide.id}-${item.label}`}>
                    <div className="prompt-card-head">
                      <strong>{item.label}</strong>
                      <button
                        className={`prompt-copy-button${isCopied ? " copied" : ""}`}
                        onClick={() => onCopyPrompt(item.prompt)}
                        type="button"
                      >
                        <i className={`fa-solid ${isCopied ? "fa-check" : "fa-copy"}`} aria-hidden="true" />
                        {isCopied ? "Đã sao chép" : "Sao chép"}
                      </button>
                    </div>
                    <p>{item.prompt}</p>
                  </section>
                );
              })}
            </div>
          ) : null}

          {slide.checklist ? (
            <ul className="checklist">
              {slide.checklist.map((item) => {
                const colonIdx = item.indexOf(":");
                const before = colonIdx !== -1 ? item.slice(0, colonIdx) : null;
                const isShortcut = before !== null && before.includes("+");
                return (
                  <li key={item}>
                    <span aria-hidden="true" />
                    {isShortcut
                      ? <span><strong>{before}</strong>{item.slice(colonIdx)}</span>
                      : item}
                  </li>
                );
              })}
            </ul>
          ) : null}

          {slide.timeline ? (
            <TimelineView items={slide.timeline} onCardSelect={onCardSelect} />
          ) : null}

          {slide.keywordCards ? (
            <div className="keyword-grid">
              {slide.keywordCards.map((card, cardIndex) => {
                const isClickable = !!(card.detail || card.detailSteps);
                const inner = (
                  <>
                    <div className="keyword-card-top">
                      <span>{String(cardIndex + 1).padStart(2, "0")}</span>
                      <i className={`fa-solid ${card.icon}`} aria-hidden="true" />
                    </div>
                    <strong>{card.term}</strong>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                    {isClickable ? (
                      <span className="keyword-card-more">
                        <i className="fa-solid fa-circle-info" aria-hidden="true" />
                        Xem chi tiết
                      </span>
                    ) : null}
                  </>
                );
                return isClickable ? (
                  <button
                    className="keyword-card"
                    key={card.term}
                    onClick={() => onCardSelect(card)}
                    type="button"
                    aria-label={`Xem chi tiết: ${card.term} – ${card.title}`}
                  >
                    {inner}
                  </button>
                ) : (
                  <div className="keyword-card keyword-card--static" key={card.term}>
                    {inner}
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>

        {slide.visual ? (
          <figure className="slide-visual">
            <img src={slide.visual.src} alt={slide.visual.alt} />
          </figure>
        ) : null}
      </div>
    </article>
  );
}

function KeywordModal({ card, onClose }: { card: KeywordCard; onClose: () => void }) {
  return (
    <div className="kw-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={card.term}>
      <div className="kw-modal" onClick={(e) => e.stopPropagation()}>
        <div className="kw-modal-header">
          <i className={`fa-solid ${card.icon}`} aria-hidden="true" />
          <strong>{card.term}</strong>
          <button
            className="kw-modal-close"
            onClick={onClose}
            type="button"
            aria-label="Đóng"
          >
            <i className="fa-solid fa-xmark" aria-hidden="true" />
          </button>
        </div>

        <div className="kw-modal-body">
          <h3>{card.title}</h3>
          <p className="kw-modal-lead">{card.description}</p>

          {card.detailSteps ? (
            <div className="kw-step-list">
              {card.detailSteps.map((step) => (
                <section className="kw-step-card" key={step.step}>
                  <strong>{step.step}</strong>
                  {step.formula ? <span className="kw-step-formula">Công thức: {step.formula}</span> : null}
                  <p>{step.guidance}</p>
                  <div className="kw-step-prompt">
                    <span>Prompt mẫu</span>
                    <p>{step.prompt}</p>
                  </div>
                </section>
              ))}
            </div>
          ) : card.detail ? (
            <div className="kw-modal-detail">
              {card.detail
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean)
                .map((line) => (
                  <p key={line}>{line.replace(/^\d+\.\s*/, "")}</p>
                ))}
            </div>
          ) : null}

          {card.example ? (
            <div className="kw-modal-example">
              <span>
                <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
                Ví dụ tìm kiếm
              </span>
              <p>{card.example}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

const TL_COLORS = ["#e85d4a", "#f59e0b", "#10b981", "#3b82f6"];

function TimelineView({
  items,
  onCardSelect,
}: {
  items: KeywordCard[];
  onCardSelect: (card: KeywordCard) => void;
}) {
  return (
    <div className="slide-timeline">
      {/* Row 1: content above the line */}
      <div className="tl-row tl-row--above">
        {items.map((item, i) => {
          const color = TL_COLORS[i % TL_COLORS.length];
          return (
            <div key={item.term} className="tl-col">
              {i % 2 === 0 && (
                <>
                  <button
                    className="tl-card"
                    onClick={() => onCardSelect(item)}
                    type="button"
                    style={{ borderTopColor: color }}
                  >
                    <span className="tl-title">{item.title}</span>
                    <span className="tl-desc">{item.description}</span>
                  </button>
                  <span className="tl-year" style={{ color }}>{item.term}</span>
                  <div className="tl-connector" style={{ background: color }} />
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Row 2: horizontal line + dots */}
      <div className="tl-rail">
        <div className="tl-line" />
        {items.map((item, i) => {
          const color = TL_COLORS[i % TL_COLORS.length];
          return (
            <div key={item.term} className="tl-col">
              <div
                className="tl-dot"
                style={{ background: color, boxShadow: `0 0 0 3px #fff, 0 0 0 5px ${color}` }}
              />
            </div>
          );
        })}
      </div>

      {/* Row 3: content below the line */}
      <div className="tl-row tl-row--below">
        {items.map((item, i) => {
          const color = TL_COLORS[i % TL_COLORS.length];
          return (
            <div key={item.term} className="tl-col">
              {i % 2 === 1 && (
                <>
                  <div className="tl-connector" style={{ background: color }} />
                  <span className="tl-year" style={{ color }}>{item.term}</span>
                  <button
                    className="tl-card"
                    onClick={() => onCardSelect(item)}
                    type="button"
                    style={{ borderTopColor: color }}
                  >
                    <span className="tl-title">{item.title}</span>
                    <span className="tl-desc">{item.description}</span>
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function annoTokenText(t: string | Prism.Token): string {
  if (typeof t === "string") return t;
  const c = t.content;
  if (typeof c === "string") return c;
  return (c as (string | Prism.Token)[]).map(annoTokenText).join("");
}

function buildAnnotatedNodes(
  tokens: (string | Prism.Token)[],
  annotations: CodeAnnotation[],
  activeToken: string | null,
  onAnnotationClick: (ann: CodeAnnotation) => void,
  keyPrefix: string
): React.ReactNode[] {
  return tokens.map((t, i) => {
    const key = `${keyPrefix}${i}`;
    if (typeof t === "string") {
      return <span key={key}>{t}</span>;
    }
    const fullText = annoTokenText(t);
    const ann = annotations.find((a) => a.token === fullText);
    const innerContent =
      typeof t.content === "string"
        ? t.content
        : buildAnnotatedNodes(
            t.content as (string | Prism.Token)[],
            annotations,
            activeToken,
            onAnnotationClick,
            `${key}-`
          );
    if (ann) {
      return (
        <button
          key={key}
          className={`code-annotation-btn${activeToken === fullText ? " active" : ""}`}
          onClick={() => onAnnotationClick(ann)}
          type="button"
          title={ann.title}
        >
          <span className={`token ${t.type}`}>{innerContent}</span>
        </button>
      );
    }
    return (
      <span key={key} className={`token ${t.type}`}>
        {innerContent}
      </span>
    );
  });
}

function useHighlight(code: string, language: string) {
  const grammar = Prism.languages[language.toLowerCase()] ?? Prism.languages.markup;
  return Prism.highlight(code, grammar, language.toLowerCase());
}

function CodeBlockView({ code, language = "HTML" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);
  const highlighted = useHighlight(code, language);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        const ta = document.createElement("textarea");
        ta.value = code;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="code-block">
      <div className="code-block-header">
        <span className="code-block-lang">{language}</span>
        <button
          className={`code-action-btn${copied ? " copied" : ""}`}
          onClick={handleCopy}
          type="button"
        >
          <i className={`fa-solid ${copied ? "fa-check" : "fa-copy"}`} aria-hidden="true" />
          {copied ? "Đã sao chép" : "Sao chép"}
        </button>
      </div>
      <pre>
        <code dangerouslySetInnerHTML={{ __html: highlighted }} />
      </pre>
    </div>
  );
}

function AnnotatedCodeBlockView({
  code,
  language = "HTML",
  annotations,
}: {
  code: string;
  language?: string;
  annotations: CodeAnnotation[];
}) {
  const [activeAnnotation, setActiveAnnotation] = useState<CodeAnnotation | null>(null);
  const [copied, setCopied] = useState(false);

  const tokens = useMemo(() => Prism.tokenize(code, Prism.languages.markup), [code]);

  const handleAnnotationClick = (ann: CodeAnnotation) => {
    setActiveAnnotation((prev) => (prev?.token === ann.token ? null : ann));
  };

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        const ta = document.createElement("textarea");
        ta.value = code;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const activeToken = activeAnnotation?.token ?? null;
  const nodes = buildAnnotatedNodes(
    tokens as (string | Prism.Token)[],
    annotations,
    activeToken,
    handleAnnotationClick,
    "r"
  );

  return (
    <div className={`code-block annotated-code-block${activeAnnotation ? " has-panel" : ""}`}>
      <div className="annotated-code-main">
        <div className="code-block-header">
          <span className="code-block-lang">{language}</span>
          <button
            className={`code-action-btn${copied ? " copied" : ""}`}
            onClick={handleCopy}
            type="button"
          >
            <i className={`fa-solid ${copied ? "fa-check" : "fa-copy"}`} aria-hidden="true" />
            {copied ? "Đã sao chép" : "Sao chép"}
          </button>
        </div>
        <pre>
          <code>{nodes}</code>
        </pre>
      </div>
      <div className="code-annotation-panel">
        <div className="code-annotation-panel__header">
          <code className="code-annotation-panel__token">{activeAnnotation?.token ?? ""}</code>
          <button
            className="code-annotation-close"
            onClick={() => setActiveAnnotation(null)}
            type="button"
            aria-label="Đóng"
          >
            <i className="fa-solid fa-xmark" aria-hidden="true" />
          </button>
        </div>
        <p className="code-annotation-panel__title">{activeAnnotation?.title ?? ""}</p>
        <p className="code-annotation-panel__desc">{activeAnnotation?.description ?? ""}</p>
      </div>
    </div>
  );
}

function SingleHtmlDemo({ demo }: { demo: HtmlDemo }) {
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(demo.code);
      } else {
        const ta = document.createElement("textarea");
        ta.value = demo.code;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const srcDoc = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body{font-family:sans-serif;padding:16px;margin:0;line-height:1.6;}img{max-width:100%;}*{box-sizing:border-box;}</style></head><body>${demo.code}</body></html>`;

  return (
    <div className={`html-demo-row${showPreview ? " has-preview" : ""}`}>
      <div className="code-block html-demo-code">
        <div className="code-block-header">
          <span className="code-block-lang">{demo.label}</span>
          <div className="code-block-actions">
            <button
              className={`code-action-btn${copied ? " copied" : ""}`}
              onClick={handleCopy}
              type="button"
            >
              <i className={`fa-solid ${copied ? "fa-check" : "fa-copy"}`} aria-hidden="true" />
              {copied ? "Đã sao chép" : "Sao chép"}
            </button>
            <button
              className={`code-action-btn preview-btn${showPreview ? " active" : ""}`}
              onClick={() => setShowPreview(!showPreview)}
              type="button"
            >
              <i className={`fa-solid ${showPreview ? "fa-eye-slash" : "fa-eye"}`} aria-hidden="true" />
              {showPreview ? "Ẩn kết quả" : "Xem kết quả"}
            </button>
          </div>
        </div>
        <pre>
          <code dangerouslySetInnerHTML={{ __html: Prism.highlight(demo.code, Prism.languages.markup, "markup") }} />
        </pre>
      </div>
      <div className="html-preview-wrapper">
        <div className="html-preview-label">
          <i className="fa-solid fa-globe" aria-hidden="true" />
          Kết quả trên trình duyệt
        </div>
        <iframe
          className="html-preview-frame"
          srcDoc={srcDoc}
          title={`Preview: ${demo.label}`}
          sandbox="allow-same-origin"
          style={{ height: demo.previewHeight ?? 300 }}
        />
      </div>
    </div>
  );
}

function getSlideNumber(slide: LessonSlide, index: number) {
  return slide.displayNumber ?? String(index + 1).padStart(2, "0");
}

function clampSlideIndex(index: number, slideCount: number) {
  if (!Number.isFinite(index)) return 0;
  return Math.min(Math.max(Math.trunc(index), 0), Math.max(slideCount - 1, 0));
}
