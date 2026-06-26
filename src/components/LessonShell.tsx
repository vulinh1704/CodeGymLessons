"use client";

import React from "react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Prism from "prismjs";
import "prismjs/components/prism-markup";
import { marked } from "marked";
import type { CodeAnnotation, CourseModule, FlowStep, HtmlDemo, KeywordCard, Lesson, LessonSlide, SlideTone } from "@/data/curriculum";

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
  const [selectedImage, setSelectedImage] = useState<{ src: string; caption: string } | null>(null);
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
      if (selectedImage) {
        if (event.key === "Escape") setSelectedImage(null);
        return;
      }

      const tag = (event.target as HTMLElement).tagName;
      if (tag === "TEXTAREA" || tag === "INPUT") return;

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
  }, [lesson.slides.length, selectedCard, selectedImage]);

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
          onImageSelect={setSelectedImage}
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
      {selectedImage && (
        <ImageLightbox src={selectedImage.src} caption={selectedImage.caption} onClose={() => setSelectedImage(null)} />
      )}
    </main>
  );
}

function SlideView({
  slide,
  index,
  onCardSelect,
  onImageSelect,
  onCopyPrompt,
  copiedPrompt,
}: {
  slide: LessonSlide;
  index: number;
  onCardSelect: (card: KeywordCard) => void;
  onImageSelect: (img: { src: string; caption: string }) => void;
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

          {slide.flow ? (
            <FlowView steps={slide.flow} />
          ) : null}

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
              previewCode={slide.annotatedCode.previewCode}
              previewHeight={slide.annotatedCode.previewHeight}
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

          {slide.codePractice ? (
            <CodePracticeView
              storageKey={slide.codePractice.storageKey}
              targetImage={slide.codePractice.targetImage}
              targetAlt={slide.codePractice.targetAlt}
              placeholder={slide.codePractice.placeholder}
              targetCode={slide.codePractice.targetCode}
            />
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
                const inner = card.image ? (
                  <>
                    <div className="keyword-card-hero">
                      <img src={card.image} alt={card.title} />
                    </div>
                    <strong className="keyword-card-caption">{card.term}</strong>
                  </>
                ) : (
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
                if (card.image) {
                  return (
                    <button
                      className="keyword-card keyword-card--image"
                      key={card.term}
                      onClick={() => onImageSelect({ src: card.image!, caption: card.term })}
                      type="button"
                      aria-label={`Xem ảnh: ${card.term}`}
                    >
                      {inner}
                    </button>
                  );
                }
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
  keyPrefix: string,
  seen: Set<string>
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
            `${key}-`,
            seen
          );
    if (ann && !seen.has(fullText)) {
      seen.add(fullText);
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
  previewCode,
  previewHeight,
}: {
  code: string;
  language?: string;
  annotations: CodeAnnotation[];
  previewCode?: string;
  previewHeight?: number;
}) {
  const [activeAnnotation, setActiveAnnotation] = useState<CodeAnnotation | null>(null);
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

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
    "r",
    new Set<string>()
  );

  const effectivePreview = previewCode ?? code;
  const srcDoc = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body{font-family:sans-serif;padding:16px;margin:0;line-height:1.6;}img{max-width:100%;}*{box-sizing:border-box;}</style></head><body>${effectivePreview}</body></html>`;

  return (
    <div className={`annotated-code-block${activeAnnotation ? " has-panel" : ""}${showPreview ? " has-preview" : ""}`}>
      <div className="annotated-code-main">
        <div className="code-block code-block--annotated">
          <div className="code-block-header">
            <span className="code-block-lang">{language}</span>
            <div className="code-block-actions">
              <button
                className={`code-action-btn${copied ? " copied" : ""}`}
                onClick={handleCopy}
                type="button"
              >
                <i className={`fa-solid ${copied ? "fa-check" : "fa-copy"}`} aria-hidden="true" />
                {copied ? "Đã sao chép" : "Sao chép"}
              </button>
              {previewCode !== undefined || previewHeight !== undefined ? (
                <button
                  className={`code-action-btn preview-btn${showPreview ? " active" : ""}`}
                  onClick={() => setShowPreview(!showPreview)}
                  type="button"
                >
                  <i className={`fa-solid ${showPreview ? "fa-eye-slash" : "fa-eye"}`} aria-hidden="true" />
                  {showPreview ? "Ẩn kết quả" : "Xem kết quả"}
                </button>
              ) : null}
            </div>
          </div>
          <pre>
            <code>{nodes}</code>
          </pre>
        </div>
        {showPreview && (
          <div className="html-preview-wrapper">
            <div className="html-preview-label">
              <i className="fa-solid fa-globe" aria-hidden="true" />
              Kết quả trên trình duyệt
            </div>
            <iframe
              className="html-preview-frame"
              srcDoc={srcDoc}
              title="Preview"
              sandbox="allow-same-origin"
              style={{ height: previewHeight ?? 300 }}
            />
          </div>
        )}
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
        <div className="code-annotation-panel__desc">
          {(activeAnnotation?.description ?? "").split("\n").map((line, i) =>
            line === "" ? <br key={i} /> : <p key={i}>{line}</p>
          )}
        </div>
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

function FlowView({ steps }: { steps: FlowStep[] }) {
  return (
    <div className="slide-flow">
      {steps.map((step, i) => (
        <React.Fragment key={step.title}>
          <div className={`flow-step${step.highlight ? " flow-step--highlight" : ""}`}>
            <div className="flow-step-icon">
              <i className={`fa-solid ${step.icon}`} aria-hidden="true" />
            </div>
            <strong className="flow-step-title">{step.title}</strong>
            <p className="flow-step-desc">{step.description}</p>
            {step.note && <code className="flow-step-note">{step.note}</code>}
          </div>
          {i < steps.length - 1 && (
            <div className="flow-connector" aria-hidden="true">
              <i className="fa-solid fa-chevron-right" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function ImageLightbox({ src, caption, onClose }: { src: string; caption: string; onClose: () => void }) {
  return (
    <div className="img-lightbox-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={caption}>
      <button className="img-lightbox-close" onClick={onClose} type="button" aria-label="Đóng">
        <i className="fa-solid fa-xmark" aria-hidden="true" />
      </button>
      <img src={src} alt={caption} onClick={(e) => e.stopPropagation()} />
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

function formatHTML(html: string): string {
  const TAB = "  ";
  const VOID = new Set(["br", "hr", "img", "input", "meta", "link", "area", "col", "embed"]);
  let depth = 0;
  const lines = html
    .replace(/>\s*</g, ">\n<")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  return lines
    .map((line) => {
      const isClose = /^<\//.test(line);
      const tagNameMatch = line.match(/^<\/?([a-zA-Z][a-zA-Z0-9]*)/);
      const tagName = tagNameMatch ? tagNameMatch[1].toLowerCase() : "";
      const isSelfClose = line.endsWith("/>") || VOID.has(tagName);

      if (isClose) depth = Math.max(0, depth - 1);
      const out = TAB.repeat(depth) + line;
      if (!isClose && !isSelfClose && tagName) depth++;
      return out;
    })
    .join("\n");
}

const EMMET_SNIPPETS: Record<string, { template: string; cursor: number }> = {
  // Table
  table:    { template: "<table>\n  \n</table>",                                             cursor: 10 },
  thead:    { template: "<thead>\n    \n  </thead>",                                         cursor: 11 },
  tbody:    { template: "<tbody>\n    \n  </tbody>",                                         cursor: 11 },
  tr:       { template: "<tr>\n    \n  </tr>",                                               cursor: 9  },
  th:       { template: "<th></th>",                                                         cursor: 4  },
  td:       { template: "<td></td>",                                                         cursor: 4  },
  // Form
  form:     { template: "<form action=\"\" method=\"post\">\n  \n</form>",                   cursor: 26 },
  label:    { template: "<label for=\"\"></label>",                                          cursor: 11 },
  input:    { template: "<input type=\"text\" name=\"\" placeholder=\"\">",                  cursor: 13 },
  select:   { template: "<select name=\"\">\n  <option value=\"\"></option>\n</select>",     cursor: 16 },
  option:   { template: "<option value=\"\"></option>",                                      cursor: 15 },
  textarea: { template: "<textarea name=\"\" rows=\"4\" placeholder=\"\"></textarea>",       cursor: 15 },
  button:   { template: "<button type=\"submit\"></button>",                                 cursor: 22 },
  // Text
  h1:       { template: "<h1></h1>",                                                         cursor: 4  },
  h2:       { template: "<h2></h2>",                                                         cursor: 4  },
  h3:       { template: "<h3></h3>",                                                         cursor: 4  },
  p:        { template: "<p></p>",                                                           cursor: 3  },
  strong:   { template: "<strong></strong>",                                                 cursor: 8  },
  span:     { template: "<span></span>",                                                     cursor: 6  },
  div:      { template: "<div>\n  \n</div>",                                                 cursor: 8  },
};

const SUGGEST_TAGS = [
  "table", "thead", "tbody", "tr", "th", "td",
  "form", "label", "input", "select", "option", "textarea", "button",
  "h1", "h2", "h3", "p", "strong", "span", "div", "br",
];

function CodePracticeView({
  storageKey,
  targetImage,
  targetAlt,
  placeholder,
  targetCode,
}: {
  storageKey: string;
  targetImage?: string;
  targetAlt?: string;
  placeholder?: string;
  targetCode?: string;
}) {
  const [code, setCode] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [suggestionIdx, setSuggestionIdx] = useState(0);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [dropdownLeft, setDropdownLeft] = useState(0);
  const [reviewing, setReviewing] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const taRef = React.useRef<HTMLTextAreaElement>(null);

  const submitForReview = async () => {
    if (!targetCode || !code.trim()) return;
    setReviewing(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/review-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentCode: code, targetCode }),
      });
      const data = await res.json();
      setFeedback(data.feedback ?? data.error ?? "Không có phản hồi.");
    } catch {
      setFeedback("Lỗi kết nối. Vui lòng thử lại.");
    } finally {
      setReviewing(false);
    }
  };

  const updateDropdownPos = () => {
    const ta = taRef.current;
    if (!ta) return;
    const pos = ta.selectionStart;
    const textBefore = ta.value.slice(0, pos);
    const lines = textBefore.split("\n");
    const lineIndex = lines.length - 1;
    const lineHeight = 22.5; // 13.5px font * 1.65 line-height
    const paddingTop = 14;
    const paddingLeft = 16;
    // measure character width roughly via canvas
    const charWidth = 8.1; // approx for 13.5px monospace
    const col = lines[lineIndex].length;
    setDropdownTop(paddingTop + (lineIndex + 1) * lineHeight);
    setDropdownLeft(paddingLeft + col * charWidth);
  };

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setCode(saved);
  }, [storageKey]);

  const applyValue = (val: string, cursorPos?: number) => {
    setCode(val);
    localStorage.setItem(storageKey, val);
    if (cursorPos !== undefined && taRef.current) {
      requestAnimationFrame(() => {
        taRef.current!.selectionStart = cursorPos;
        taRef.current!.selectionEnd = cursorPos;
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    const pos = e.target.selectionStart ?? val.length;
    applyValue(val);

    // Show autocomplete after "<"
    const before = val.slice(0, pos);
    const tagMatch = before.match(/<(\w*)$/);
    if (tagMatch) {
      const partial = tagMatch[1].toLowerCase();
      const filtered = SUGGEST_TAGS.filter((t) => t.startsWith(partial) && t !== partial);
      setSuggestions(filtered);
      setSuggestionIdx(0);
      requestAnimationFrame(updateDropdownPos);
    } else {
      setSuggestions([]);
    }
  };

  const applySuggestion = (tag: string) => {
    const ta = taRef.current;
    if (!ta) return;
    const pos = ta.selectionStart;
    const before = code.slice(0, pos);
    const after = code.slice(pos);
    const tagMatch = before.match(/<(\w*)$/);
    if (!tagMatch) return;
    const replaceStart = pos - tagMatch[0].length;
    const snippet = EMMET_SNIPPETS[tag];
    const insert = snippet ? `<${snippet.template.slice(1)}` : `<${tag}></${tag}>`;
    const newCode = code.slice(0, replaceStart) + insert + after;
    const newCursor = replaceStart + (snippet ? snippet.template.indexOf("\n") + 5 : tag.length + 2);
    setSuggestions([]);
    applyValue(newCode, replaceStart + (snippet ? snippet.cursor + 1 : tag.length + 2));
    ta.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const ta = taRef.current!;

    // Navigate suggestions with arrow keys
    if (suggestions.length > 0) {
      if (e.key === "ArrowDown") { e.preventDefault(); setSuggestionIdx((i) => Math.min(i + 1, suggestions.length - 1)); return; }
      if (e.key === "ArrowUp")   { e.preventDefault(); setSuggestionIdx((i) => Math.max(i - 1, 0)); return; }
      if (e.key === "Escape")    { e.preventDefault(); setSuggestions([]); return; }
      if (e.key === "Enter")     { e.preventDefault(); applySuggestion(suggestions[suggestionIdx]); return; }
    }

    if (e.key === "Tab") {
      e.preventDefault();
      const pos = ta.selectionStart;
      const before = code.slice(0, pos);
      const after = code.slice(pos);

      const wordMatch = before.match(/(\w+)$/);
      if (wordMatch) {
        const word = wordMatch[1].toLowerCase();
        const snippet = EMMET_SNIPPETS[word];
        if (snippet) {
          const start = pos - wordMatch[1].length;
          const newCode = code.slice(0, start) + snippet.template + after;
          applyValue(newCode, start + snippet.cursor);
          setSuggestions([]);
          return;
        }
      }
      const newCode = before + "  " + after;
      applyValue(newCode, pos + 2);
      return;
    }

    // Ctrl+D — nhân đôi dòng hiện tại
    if (e.ctrlKey && !e.altKey && e.key === "d") {
      e.preventDefault();
      const pos = ta.selectionStart;
      const lines = code.split("\n");
      let charCount = 0;
      let lineIdx = 0;
      for (let i = 0; i < lines.length; i++) {
        if (charCount + lines[i].length >= pos) { lineIdx = i; break; }
        charCount += lines[i].length + 1;
      }
      const newLines = [...lines];
      newLines.splice(lineIdx + 1, 0, lines[lineIdx]);
      const newCode = newLines.join("\n");
      const newPos = charCount + lines[lineIdx].length + 1 + (pos - charCount);
      applyValue(newCode, newPos);
      return;
    }

    // Ctrl+Alt+L — format HTML
    if (e.ctrlKey && e.altKey && e.key === "l") {
      e.preventDefault();
      applyValue(formatHTML(code));
      return;
    }
  };

  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(null);
  const srcDoc = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body{font-family:sans-serif;padding:16px;margin:0;line-height:1.5;}*{box-sizing:border-box;}</style></head><body>${code}</body></html>`;

  return (
    <div className="code-practice">
      {lightbox && <ImageLightbox src={lightbox.src} caption={lightbox.caption} onClose={() => setLightbox(null)} />}
      <div className="code-practice-compare">
        {targetImage && (
          <div className="code-practice-panel">
            <div className="code-practice-panel-label">
              <i className="fa-solid fa-bullseye" aria-hidden="true" />
              Mục tiêu
              <span className="code-practice-zoom-hint">
                <i className="fa-solid fa-magnifying-glass-plus" aria-hidden="true" /> nhấn để phóng to
              </span>
            </div>
            <div className="code-practice-panel-body">
              <button
                className="code-practice-img-btn"
                onClick={() => setLightbox({ src: targetImage, caption: targetAlt ?? "Mục tiêu" })}
                type="button"
              >
                <img src={targetImage} alt={targetAlt ?? "Mục tiêu"} className="code-practice-target-img" />
              </button>
            </div>
          </div>
        )}
        <div className="code-practice-panel">
          <div className="code-practice-panel-label">
            <i className="fa-solid fa-globe" aria-hidden="true" />
            Kết quả của bạn
          </div>
          <div className="code-practice-panel-body">
            {code.trim() ? (
              <iframe
                className="html-preview-frame code-practice-iframe"
                srcDoc={srcDoc}
                title="Practice preview"
                sandbox="allow-same-origin"
              />
            ) : (
              <p className="code-practice-empty">Viết code bên dưới để xem kết quả</p>
            )}
          </div>
        </div>
      </div>

      {feedback !== null && (
        <div className="ai-feedback-backdrop" onClick={() => setFeedback(null)}>
          <div className="ai-feedback-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ai-feedback-header">
              <span className="ai-feedback-title">
                <i className="fa-solid fa-robot" aria-hidden="true" /> Nhận xét từ AI
              </span>
              <button className="ai-feedback-close" onClick={() => setFeedback(null)} type="button">
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
            <div
              className="ai-feedback-body"
              dangerouslySetInnerHTML={{ __html: marked.parse(feedback) as string }}
            />
          </div>
        </div>
      )}

      <div className="code-practice-editor">
        <div className="code-block-header">
          <span className="code-block-lang">HTML</span>
          <div className="code-block-actions">
            <span className="code-practice-hint">
              <kbd>Tab</kbd> expand &nbsp;·&nbsp; <kbd>&lt;</kbd> gợi ý &nbsp;·&nbsp; <kbd>Ctrl+D</kbd> nhân đôi &nbsp;·&nbsp; <kbd>Ctrl+Alt+L</kbd> format
            </span>
            {targetCode && (
              <button
                className="ai-submit-btn"
                onClick={submitForReview}
                disabled={reviewing || !code.trim()}
                type="button"
              >
                {reviewing
                  ? <><i className="fa-solid fa-spinner fa-spin" /> Đang chấm...</>
                  : <><i className="fa-solid fa-paper-plane" /> Nộp bài</>}
              </button>
            )}
          </div>
        </div>
        <div className="code-practice-editor-body">
          <div className="code-practice-hl-wrap">
            <pre
              className="code-block code-practice-hl"
              aria-hidden="true"
              dangerouslySetInnerHTML={{
                __html: code
                  ? Prism.highlight(code, Prism.languages.markup, "markup") + "\n"
                  : "",
              }}
            />
            <textarea
              ref={taRef}
              className="code-practice-textarea"
              value={code}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onScroll={(e) => {
                const pre = (e.currentTarget.previousSibling as HTMLElement);
                if (pre) { pre.scrollTop = e.currentTarget.scrollTop; pre.scrollLeft = e.currentTarget.scrollLeft; }
              }}
              onBlur={() => setTimeout(() => setSuggestions([]), 150)}
              placeholder={placeholder ?? "<!-- Nhập code HTML của bạn vào đây -->"}
              spellCheck={false}
              autoCorrect="off"
              autoCapitalize="off"
            />
          </div>
          {suggestions.length > 0 && (
            <ul className="code-suggest-list" style={{ top: dropdownTop, left: dropdownLeft }}>
              {suggestions.map((tag, i) => (
                <li key={tag}>
                  <button
                    className={`code-suggest-item${i === suggestionIdx ? " active" : ""}`}
                    onMouseDown={(e) => { e.preventDefault(); applySuggestion(tag); }}
                    type="button"
                  >
                    <span className="code-suggest-tag">&lt;{tag}&gt;</span>
                    {EMMET_SNIPPETS[tag] && <span className="code-suggest-tab">Tab ↵</span>}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
