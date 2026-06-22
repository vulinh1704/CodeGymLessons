"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { CourseModule, KeywordCard, Lesson, LessonSlide, SlideTone } from "@/data/curriculum";

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

          <h2>{slide.title}</h2>

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
              {slide.checklist.map((item) => (
                <li key={item}>
                  <span aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          ) : null}

          {slide.keywordCards ? (
            <div className="keyword-grid">
              {slide.keywordCards.map((card, cardIndex) => (
                <button
                  className="keyword-card"
                  key={card.term}
                  onClick={() => onCardSelect(card)}
                  type="button"
                  aria-label={`Xem chi tiết: ${card.term} – ${card.title}`}
                >
                  <div className="keyword-card-top">
                    <span>{String(cardIndex + 1).padStart(2, "0")}</span>
                    <i className={`fa-solid ${card.icon}`} aria-hidden="true" />
                  </div>
                  <strong>{card.term}</strong>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  {card.detail ? (
                    <span className="keyword-card-more">
                      <i className="fa-solid fa-circle-info" aria-hidden="true" />
                      Xem chi tiết
                    </span>
                  ) : null}
                </button>
              ))}
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
          <p className="kw-modal-lead">
            Dựa vào bài học hôm nay, đây là các bước từ cài môi trường đến dùng AI để hoàn thành phần thực hành đơn.
          </p>

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
            <ol className="kw-modal-detail">
              {card.detail
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean)
                .map((line) => (
                  <li key={line}>{line.replace(/^\d+\.\s*/, "")}</li>
                ))}
            </ol>
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

function getSlideNumber(slide: LessonSlide, index: number) {
  return slide.displayNumber ?? String(index + 1).padStart(2, "0");
}

function clampSlideIndex(index: number, slideCount: number) {
  if (!Number.isFinite(index)) return 0;
  return Math.min(Math.max(Math.trunc(index), 0), Math.max(slideCount - 1, 0));
}
