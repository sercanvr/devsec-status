```markdown
### PROJE TANIMI VE HEDEFİ
DevSec Status: Programlama dilleri, kütüphane/framework'ler ve açık kaynak
siber güvenlik araçlarının GitHub Search API üzerinden çekilen güncel
popülerlik ve momentum verilerini, salt okunur, iki sayfalık (Yazılım /
Güvenlik) tek yönlü scroll bir arayüzde gösteren bilgilendirme aracı.
Kullanıcı etkileşimi (login, ödeme, form, buton ile veri çekme) yoktur —
amaç kullanıcının hızlıca bilgi alıp çıkmasıdır. Veriler günde 1 kez
GitHub Actions cron job ile otomatik güncellenir ve statik JSON olarak
yayınlanır.

**Kapsam Kararı:** v1, üç kategoriyi (Diller + Framework/Library +
Security Tools) aynı anda, tek seferde kapsar. Kademeli yaklaşım
tercih edilmedi — proje ilerleyen süreçte iteratif olarak
genişletilecek/düzenlenecektir.

### NAVBAR YAPISI
- Sabit (sticky), üstte, blur efektli (backdrop-filter: blur) arka plan
- Düzen: [Logo (sol)] — [Yazılım | Güvenlik (orta, sayfa geçiş linkleri)]
  — [Dil Seçici | Dark/Light Toggle (sağ)]
- Navbar altında, sayfa başına özel kısa bir info/tanıtım paragrafı yer alır

### DEFAULT (İLK AÇILIŞ) DURUMU
- Tema: Dark Mode
- Dil: TR
- Aktif Sayfa: Yazılım (Software)
- Tercih localStorage'a yazılır; kullanıcı değiştirirse sonraki ziyarette korunur

### SAYFA YAPISI
- **Sayfa 1 — Yazılım:** Info paragrafı → Diller (yatay bar grafik listesi)
  → Kütüphaneler/Framework'ler (yatay bar grafik listesi)
- **Sayfa 2 — Güvenlik:** Info paragrafı → Açık kaynak siber güvenlik
  araçları (Nmap, SQLMap, OWASP ZAP, Metasploit, Wireshark, John the
  Ripper vb. — yalnızca GitHub'da resmi açık kaynak deposu bulunanlar)
- Her öğe için iki gösterge: **Popülerlik** (toplam repo/star sayısı) ve
  **Momentum** (son 30 günde yıldıza göre sıralanmış aktivite)

### TEKNOLOJİ VE ÖZELLİK HAVUZU
**(Feature List)**
*   [x] Özel İsim (DevSec Status) ve Logo / Özel Tema Vurgu Rengi
*   [x] Modern UX/UI Design (Dribbble referans, 21st.dev/shadcn bileşen şeması) / Dark Mode (varsayılan) & Light Mode
*   [x] Web & Mobile Uyumluluk (Full-Responsive)
*   [x] Dil Seçeneği: TR (Varsayılan), EN, DE — react-i18next ile
*   [x] Scroll-Up Button
*   [x] Blur Efektli Sabit (Sticky) Navbar
*   [x] 2 Sayfa: Yazılım (varsayılan) / Güvenlik — React Router ile geçiş

**(Technical Stack & Standards)**
*   **Core:** TypeScript
*   **Frontend:** React.js, Vite, Tailwind CSS
*   **UI Bileşenleri:** 21st.dev (shadcn/ui tabanlı), Dribbble referanslı özel tasarım düzenlemeleri
*   **Routing:** React Router (2 sayfa arası geçiş için)
*   **i18n:** react-i18next (TR/EN/DE)
*   **Data Pipeline:** Node.js (TS) fetch script + GitHub Actions cron (günlük tetikleme)
*   **Data Source:** GitHub Search API — Diller için `language:` filtresi;
    Framework/Library ve Security Tools için küratörlü repo listesi
    (otomatik topic taraması yerine manuel doğrulanmış liste, güvenilirlik için)
*   **Data Storage:** Statik JSON (DB yok — proje adındaki "Status" ifadesiyle
    tutarlı olarak gerçek bir veritabanı kullanılmaz)
*   **Tools:** PNPM, Git
*   **Architecture:** Basit Component-Based (Atomic Design yok)
*   **Security:** XSS Koruması (dış veriden render edilen her içerik sanitize edilir), Custom CSP
*   **Quality:** Conventional Commits, Unit Test (Vitest), Caching (fetch sonuçları için staleTime/Cache-Control)

### VERİ ŞEMASI (ÖRNEK)
```typescript
interface TechEntry {
  id: string;
  name: string;
  category: "language" | "framework" | "library" | "security-tool";
  iconUrl: string;
  githubUrl: string;
  popularity: {
    totalRepos: number;
    totalStars: number;
  };
  momentum: {
    newReposLast30Days: number;
    topStarredNewRepo: { name: string; stars: number } | null;
  };
  lastUpdated: string; // ISO timestamp
}

```

### KLASÖR YAPISI

```
devsec-status/
├── .github/workflows/update-data.yml
├── public/icons/
├── scripts/
│   ├── fetch-languages.ts
│   ├── fetch-frameworks.ts
│   ├── fetch-security-tools.ts
│   └── curated-lists/
│       ├── frameworks.json
│       └── security-tools.json
├── src/
│   ├── data/
│   │   ├── languages.json
│   │   ├── frameworks.json
│   │   └── security-tools.json
│   ├── i18n/
│   │   ├── tr.json
│   │   ├── en.json
│   │   └── de.json
│   ├── pages/
│   │   ├── SoftwarePage.tsx
│   │   └── SecurityPage.tsx
│   ├── components/
│   │   ├── Navbar.tsx            # blur, sticky, logo + orta linkler + sağ kontroller
│   │   ├── LanguageSwitcher.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── PageInfo.tsx          # navbar altındaki tanıtım paragrafı
│   │   ├── ScrollToTopButton.tsx
│   │   ├── TechBar.tsx           # yatay bar grafik, tek satır
│   │   ├── TechSection.tsx       # başlık + TechBar listesi
│   │   └── Footer.tsx
│   ├── hooks/useTheme.ts
│   ├── lib/sanitize.ts
│   ├── types/tech.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tests/TechBar.test.tsx
├── tailwind.config.ts
├── vite.config.ts
├── tsconfig.json
└── package.json

```

### NOTLAR (Agent için)

-   v1 kapsamı üç kategoriyi (Dil + Framework/Library + Security Tools)  
    aynı anda içerir; kademeli değildir.
-   Varsayılan state: Dark Mode + TR + Yazılım sayfası. Bu tercih localStorage'a  
    yazılmalı, kullanıcı değiştirirse sonraki ziyarette korunmalı.
-   Framework/Library ve Security Tools listeleri otomatik GitHub topic  
    aramasıyla değil, `scripts/curated-lists/` altındaki manuel dosyalarla  
    yönetilir.
-   GitHub Search API authenticated istek limiti dakikada 30'dur; fetch  
    script'leri sorgular arası kısa gecikme (rate-limit guard) içermelidir.
-   Kapalı kaynaklı popüler araçlar (örn. Burp Suite) kapsam dışıdır.
-   Navbar blur efekti için `backdrop-filter: blur()` + yarı saydam arka  
    plan rengi (dark/light mode'a göre değişken) kullanılmalı.