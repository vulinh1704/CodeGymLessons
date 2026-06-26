"use client";

import Link from "next/link";
import { useState } from "react";
import { curriculum } from "@/data/curriculum";

export function HomeScreen() {
  const visibleModules = curriculum.filter((mod) => !mod.hidden);
  const [openModules, setOpenModules] = useState<Set<string>>(
    () => new Set(visibleModules.map((m) => m.id))
  );

  function toggleModule(id: string) {
    setOpenModules((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <main className="home-app">
      <header className="home-header">
        <div className="home-brand">
          <span className="brand-logo" role="img" aria-label="CodeGym" />
          <div>
            <strong>CodeGym</strong>
            <span>Lesson Studio</span>
          </div>
        </div>
        <p>Chọn bài học để bắt đầu</p>
      </header>

      <div className="home-body">
        {visibleModules.map((mod) => {
          const isOpen = openModules.has(mod.id);
          return (
            <section key={mod.id} className="module-section">
              <button
                className="module-dropdown-btn"
                onClick={() => toggleModule(mod.id)}
                aria-expanded={isOpen}
              >
                <div className="module-dropdown-label">
                  <span className="module-tag">{mod.title}</span>
                  <h2>{mod.description}</h2>
                </div>
                <i
                  className={`fa-solid fa-chevron-down module-chevron${isOpen ? " open" : ""}`}
                  aria-hidden="true"
                />
              </button>

              {isOpen && (
                <ul className="lesson-list">
                  {mod.lessons.map((lesson, idx) => (
                    <li key={lesson.id}>
                      <Link href={`/lesson/${lesson.id}`} className="lesson-list-item">
                        <span className="lesson-list-index">{String(idx + 1).padStart(2, "0")}</span>
                        <span className="lesson-list-title">{lesson.title}</span>
                        <i className="fa-solid fa-arrow-right lesson-list-arrow" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>
    </main>
  );
}
