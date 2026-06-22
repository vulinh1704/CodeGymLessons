import Link from "next/link";
import { curriculum } from "@/data/curriculum";

export function HomeScreen() {
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
        {curriculum.filter((mod) => !mod.hidden).map((mod) => (
          <section key={mod.id} className="module-section">
            <div className="module-heading">
              <span>{mod.title}</span>
              <h2>{mod.description}</h2>
            </div>
            <div className="lesson-cards">
              {mod.lessons.map((lesson) => (
                <Link key={lesson.id} href={`/lesson/${lesson.id}`} className="lesson-card">
                  <div className="lesson-card-meta">
                    <span>
                      <i className="fa-solid fa-layer-group" aria-hidden="true" />
                      {lesson.slides.length} slides
                    </span>
                    <span>
                      <i className="fa-regular fa-clock" aria-hidden="true" />
                      {lesson.duration}
                    </span>
                  </div>
                  <h3>{lesson.title}</h3>
                  <p>{lesson.objective}</p>
                  <div className="lesson-card-cta">
                    Bắt đầu học
                    <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
