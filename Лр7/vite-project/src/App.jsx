import React, { useMemo, useState } from "react";

/** Адаптивная графика: SVG-иконки (не картинками, а вектором) */
function IconTelegram(props) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <path d="M9.7 15.2 9.4 19c.4 0 .6-.2.8-.4l1.9-1.8 3.9 2.8c.7.4 1.2.2 1.4-.7l2.6-12c.2-.9-.3-1.3-1.1-1L3 9.7c-.9.3-.9.8-.2 1l4.1 1.3L16.9 7c.5-.3 1-.1.6.2L9.7 15.2z" />
        </svg>
    );
}

function IconInstagram(props) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3z" />
            <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
            <path d="M17.5 6.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
    );
}

const NAV = [
    { href: "#home", label: "Главная" },
    { href: "#about", label: "Обо мне" },
    { href: "#portfolio", label: "Портфолио" },
    { href: "#contacts", label: "Контакты" },
];

export default function App() {
    // ✅ База для GitHub Pages (учитывает base в vite.config.js)
    const BASE = import.meta.env.BASE_URL;

    // ✅ Правильные пути к картинкам из папки public/
    const GALLERY = [
        { id: 1, src: `${BASE}works/Art1.jpg`, alt: "Работа 1" },
        { id: 2, src: `${BASE}works/Art2.jpg`, alt: "Работа 2" },
        { id: 3, src: `${BASE}works/Art3.jpg`, alt: "Работа 3" },
        { id: 4, src: `${BASE}works/Art4.jpg`, alt: "Работа 4" },
        { id: 5, src: `${BASE}works/Art5.jpg`, alt: "Работа 5" },
    ];

    const [menuOpen, setMenuOpen] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [errors, setErrors] = useState({ email: "" });
    const [activeImg, setActiveImg] = useState(null);

    const canSubmit = useMemo(() => {
        return (
            form.name.trim().length > 0 &&
            form.email.trim().length > 0 &&
            form.message.trim().length > 0 &&
            !errors.email
        );
    }, [form, errors]);

    const onNavClick = (e, href) => {
        e.preventDefault();
        const id = href.replace("#", "");
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        setMenuOpen(false);
    };

    const validateEmail = (value) => {
        // Требование: проверка на наличие "@"
        if (!value.includes("@")) return "Email должен содержать символ @";
        return "";
    };

    const onChange = (key, value) => {
        setForm((p) => ({ ...p, [key]: value }));
        if (key === "email") {
            setErrors((p) => ({ ...p, email: validateEmail(value) }));
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const emailErr = validateEmail(form.email);
        setErrors({ email: emailErr });
        if (emailErr) return;

        alert(
            `Сообщение отправлено!\n\nИмя: ${form.name}\nEmail: ${form.email}\nТекст: ${form.message}`
        );
        setForm({ name: "", email: "", message: "" });
    };

    React.useEffect(() => {
        const onKey = (e) => e.key === "Escape" && setActiveImg(null);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    return (
        <div className="page">
            <header className="header">
                <a className="brand" href="#home" onClick={(e) => onNavClick(e, "#home")}>
                    <span className="brandMark" aria-hidden="true" />
                    <span>Кретова Арина</span>
                </a>

                <nav className="nav" aria-label="Навигация">
                    {NAV.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            className="navLink"
                            onClick={(e) => onNavClick(e, l.href)}
                        >
                            {l.label}
                        </a>
                    ))}
                </nav>

                <button
                    className="burger"
                    type="button"
                    aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((v) => !v)}
                >
                    <span />
                    <span />
                    <span />
                </button>
            </header>

            {menuOpen && (
                <div className="drawer" role="dialog" aria-modal="true">
                    <div className="drawerCard">
                        {NAV.map((l) => (
                            <a
                                key={l.href}
                                href={l.href}
                                className="drawerLink"
                                onClick={(e) => onNavClick(e, l.href)}
                            >
                                {l.label}
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {/* Главная */}
            <section id="home" className="section hero">
                <div className="container heroGrid">
                    <div>
                        <p className="pill">Художница • Санкт-Петербург</p>
                        <h1 className="h1">
                            Кретова Арина
                            <span className="h1sub">живопись, графика, портреты</span>
                        </h1>

                        <p className="lead">
                            Я цифровой художник, создающий работы на стыке реальности и
                            воображения. Специализируюсь на иллюстрациях и скетчах, в которых
                            каждая деталь дышит, а цвет передает историю. Люблю работать с
                            фактурой — будь то шероховатость старой стены, мягкость ткани или
                            игра света на стекле. Беру заказы на портреты, интерьерные работы и
                            книжную иллюстрацию. Предпочитаю рисовать с эскиза, чтобы вместе с
                            вами поймать идею с самого начала.
                        </p>

                        <div className="actions">
                            <a
                                className="btn btnPrimary"
                                href="#portfolio"
                                onClick={(e) => onNavClick(e, "#portfolio")}
                            >
                                Портфолио
                            </a>
                            <a
                                className="btn"
                                href="#contacts"
                                onClick={(e) => onNavClick(e, "#contacts")}
                            >
                                Связаться
                            </a>
                        </div>

                        <div className="facts">
                            <div className="fact">
                                <div className="factK">Срок</div>
                                <div className="factV">от 3–10 дней</div>
                            </div>
                            <div className="fact">
                                <div className="factK">Форматы</div>
                                <div className="factV">По договоренности</div>
                            </div>
                            <div className="fact">
                                <div className="factK">Материалы</div>
                                <div className="factV">холст, бумага, цифровой файл</div>
                            </div>
                        </div>
                    </div>

                    <div className="heroPhotoCard">
                        <img
                            className="heroPhoto"
                            src={`${BASE}other/myMain.jfif`}
                            alt="Кретова А.А."
                            loading="eager"
                        />
                        <div className="heroPhotoCap" />
                    </div>
                </div>
            </section>

            {/* Обо мне */}
            <section id="about" className="section">
                <div className="container">
                    <h2 className="h2">Обо мне</h2>
                    <div className="grid2">
                        <div className="card">
                            <h3 className="h3">Чем занимаюсь</h3>
                            <p className="muted">
                                Я рассматриваю заказ как соавторство. Ваше видение и задачи —
                                отправная точка. Отталкиваясь от них, я предлагаю художественные
                                решения, исследую с вами разные пути в композиции и цвете.
                            </p>
                        </div>
                        <div className="card">
                            <h3 className="h3">Как проходит заказ</h3>
                            <ol className="list">
                                <li>Обсуждение идеи, референсы, формат</li>
                                <li>Эскиз и согласование</li>
                                <li>Работа над финалом + фото процесса (по желанию)</li>
                                <li>Упаковка и передача</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            {/* Портфолио / Галерея */}
            <section id="portfolio" className="section">
                <div className="container">
                    <h2 className="h2">Портфолио</h2>

                    <div className="gallery">
                        {GALLERY.map((img) => (
                            <figure className="tile" key={img.id}>
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    loading="lazy"
                                    onClick={() => setActiveImg(img)}
                                />
                                <figcaption>{img.alt}</figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </section>

            {/* Контакты + форма */}
            <section id="contacts" className="section">
                <div className="container">
                    <h2 className="h2">Контакты</h2>

                    <div className="grid2">
                        <div className="card">
                            <h3 className="h3">Связаться со мной</h3>

                            <div className="contactLine">
                                <span className="muted">Телефон:</span>{" "}
                                <a href="tel:+79119163364">+7 (911) 916-33-64</a>
                            </div>
                            <div className="contactLine">
                                <span className="muted">Email:</span>{" "}
                                <a href="mailto:kretova.arisha@mail.ru">
                                    kretova.arisha@mail.ru
                                </a>
                            </div>

                            <div className="socials" aria-label="Соцсети">
                                <a
                                    className="socialBtn"
                                    href="https://t.me/Ashid0_mina"
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="Telegram"
                                >
                                    <IconTelegram className="icon" />
                                    Telegram
                                </a>

                                {/* если нужно 2 соцсети — раскомментируй и вставь ссылку */}
                                {/*
                <a
                  className="socialBtn"
                  href="https://instagram.com/username"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <IconInstagram className="icon" />
                  Instagram
                </a>
                */}
                            </div>
                        </div>

                        <form className="card form" onSubmit={onSubmit}>
                            <h3 className="h3">Форма обратной связи</h3>

                            <label className="field">
                                <span>Имя</span>
                                <input
                                    value={form.name}
                                    onChange={(e) => onChange("name", e.target.value)}
                                    required
                                    placeholder="Ваше имя"
                                />
                            </label>

                            <label className="field">
                                <span>Email</span>
                                <input
                                    value={form.email}
                                    onChange={(e) => onChange("email", e.target.value)}
                                    required
                                    placeholder="example@mail.ru"
                                    inputMode="email"
                                />
                                {errors.email && <div className="error">{errors.email}</div>}
                            </label>

                            <label className="field">
                                <span>Сообщение</span>
                                <textarea
                                    value={form.message}
                                    onChange={(e) => onChange("message", e.target.value)}
                                    required
                                    rows={5}
                                    placeholder="Опишите задачу: формат, сроки, референсы…"
                                />
                            </label>

                            <button className="btn btnPrimary" type="submit" disabled={!canSubmit}>
                                Отправить
                            </button>

                            <p className="muted small">
                                Проверка email: обязательно наличие символа <b>@</b>.
                            </p>
                        </form>
                    </div>
                </div>
            </section>

            {/* Футер */}
            <footer className="footer">
                <div className="container footerInner">
                    <div>© {new Date().getFullYear()} Кретова Арина</div>
                    <div className="footerRight">
                        <a href="tel:+79119163364">tel:+79119163364</a>
                        <span className="dot">•</span>
                        <a href="mailto:kretova.arisha@mail.ru">mailto:kretova.arisha@mail.ru</a>
                    </div>
                </div>
            </footer>

            {/* Lightbox */}
            {activeImg && (
                <div
                    className="lightbox"
                    onMouseDown={() => setActiveImg(null)}
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="lightboxCard" onMouseDown={(e) => e.stopPropagation()}>
                        <button
                            className="lightboxClose"
                            type="button"
                            onClick={() => setActiveImg(null)}
                            aria-label="Закрыть"
                        >
                            ✕
                        </button>

                        <img className="lightboxImg" src={activeImg.src} alt={activeImg.alt} />
                        <div className="lightboxText">{activeImg.alt}</div>
                    </div>
                </div>
            )}
        </div>
    );
}
