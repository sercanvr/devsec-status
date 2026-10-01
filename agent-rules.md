# Agent Çalışma Kuralları

Bu dosya, IDE üzerinde çalışan agent'ın her görevde uyması gereken sabit kurallardır. Kurallar her prompt'ta tekrar açıklanmayacak, bu dosya referans alınacaktır.

---

## 1. Genel İlkeler

- Her göreve başlamadan önce görev analiz edilmeli, gerekli düşünme adımı tamamlanmalı ve ardından uygulamaya geçilmelidir. Doğrudan koda dalınmamalıdır.
- Kod yazılırken Clean Code, DRY (Don't Repeat Yourself) ve KISS (Keep It Simple, Stupid) prensiplerine uyulmalıdır.
- Projeye zarar verilmemesi için mevcut yapı ve konvansiyonlar dikkatle korunmalı, gereksiz yeniden yazım yapılmamalıdır.
- Görev tam olarak istenen kapsamda yerine getirilmeli, eksik veya kapsam dışı değişiklik yapılmamalıdır.
- `npm run lint` ve `npm run build` komutları agent tarafından çalıştırılmamalıdır. Bu kontroller kullanıcı tarafından manuel yapılacaktır. Bu komutların çalıştırılması gereksiz token tüketimine yol açtığı için kesinlikle atlanmalıdır.

---

## 2. Token ve Kaynak Kullanımı Kuralları

- Yanıtlar ve açıklamalar gerekenden fazla uzatılmamalı, gereksiz tekrar ve dolgu cümlelerden kaçınılmalıdır.
- Dosya okuma, tarama ve arama işlemleri gerekli olan minimum kapsamla sınırlı tutulmalı, ilgisiz dosyalar veya dizinler taranmamalıdır.
- Aynı bilgi tekrar tekrar sorgulanmamalı, bir defa elde edilen bağlam (context) görev boyunca hafızada tutulmalıdır.
- Görev sırasında gereksiz ara özetler, onay soruları veya açıklamalı yorumlar yapılmamalı; sadece iş akışının gerektirdiği çıktı üretilmelidir.
- Değişiklikler mümkün olduğunca tek seferde ve verimli şekilde tamamlanmalı, parça parça deneme-yanılma yöntemi tercih edilmemelidir.

---

## 3. Görev Öncesi Kontrol Adımları

Her yeni görevden önce sırasıyla şu adımlar uygulanmalıdır.

1. `main` branch'in güncelliği kontrol edilmeli.
2. Uzak depodaki (remote) güncellemeler local'e çekilmelidir (`fetch` / `pull`).
3. Hassas veri (API anahtarları, şifreler, token'lar vb.) kontrolü yapılmalı; hardcoded veri riski taşıyan dosyalar gözden geçirilerek gerekli güvenlik önlemleri hatırlatılmalıdır.
4. Bu kontrol tamamlanmadan yeni bir branch açılmamalıdır.

---

## 4. Güvenlik Kuralları (OWASP Top 10)

- Kod yazılırken, OWASP Top 10 listesinde yer alan başlıca zafiyet türleri (Injection, Broken Authentication, Sensitive Data Exposure, XXE, Broken Access Control, Security Misconfiguration, XSS, Insecure Deserialization, Bilinen Zafiyetli Bileşenler, Yetersiz Günlükleme/İzleme, CSRF) göz önünde bulundurulmalı ve bu tarz açıklara yol açacak pratiklerden kaçınılmalıdır.
- Bu kontrol, ayrıntılı bir güvenlik denetimi olarak değil, yazılan kodun genel farkındalıkla gözden geçirilmesi şeklinde, ek token maliyeti yaratmadan uygulanmalıdır.
- Şüpheli veya riskli bir durum fark edilirse, görev raporunda kısaca belirtilmelidir; kapsam dışı ayrı bir güvenlik incelemesi başlatılmamalıdır.

---

## 5. Responsive Tasarım Kuralları

- Yazılan her kod, aşağıdaki sabit media query eşiklerine uyumlu olacak şekilde geliştirilmelidir.

  ```
  1. Mobile — 390 × 844 px
  2. Tablet — 768 × 1024 px
  3. Laptop — 1366 × 768 px
  4. Desktop — 1920 × 1080 px
  ```

- Bu 4 kırılım noktası (breakpoint), global standart olarak tüm sayfa ve bileşenlerde referans alınmalıdır.
- Responsive kontrolü, ek token maliyeti yaratmayacak şekilde, kodun bu eşiklerle genel uyumluluğunun gözden geçirilmesi şeklinde uygulanmalıdır; kapsam dışı detaylı bir test süreci başlatılmamalıdır.

---

## 6. Branch Oluşturma Kuralları

- Her görev için benzersiz ve göreve özgü yeni bir branch açılmalıdır.
- Branch adı İngilizce olmalı ve Conventional Commits standardına uygun bir önek taşımalıdır (örnek önekler `feat/`, `fix/`, `refactor/`, `chore/`, `docs/`).
- Branch adı, yapılan işin içeriğini kısa ve anlaşılır şekilde yansıtmalıdır.

---

## 7. Commit Kuralları

- Her zaman local commit uygulanmalı; görev tam anlamıyla bitmeden ve kullanıcı `Kontroller tamamlandı, push edilebilir.` demeden kesinlikle gereksiz yere push edilmemelidir. Gerekirse commitler birleştirilmelidir.
- Görevin uzunluğuna ve kapsamına göre mantıklı sayıda commit atılmalıdır (tek büyük commit yerine anlamlı iş parçalarına bölünmelidir).
- Commit başlığı ve açıklaması her zaman İngilizce yazılmalıdır.
- Commit başlıkları Conventional Commits formatına uygun olmalıdır (örn. `fix: align songs page cards and admin song modal`).
- Push etmeden önce mutlaka conflict oluşuyor mu diye kontrol edilmelidir.

---

## 8. Görev Sonrası Raporlama Kuralları

Görev tamamlandığında kullanıcıya Türkçe ve edilgen bir dille, aşağıdaki sırayla ve başlıklarla rapor verilmelidir

### Yapılan Değişiklikler
- Yapılan her değişiklik madde halinde listelenmelidir.
- Değişiklik yapılan sayfa veya bileşenler, mutlaka ilgili URL bağlantısı ile belirtilerek raporlanmalıdır.
- Neyin, neden yapıldığı ve neyin değiştiği öğretici bir üslupla açıklanmalıdır.

### PR Bilgisi

- Kullanıcıdan Kontroller tamamlandı, push edilebilir. komutu geldikten sonra PR Bilgisi verilmeli, her konuşma sonunda tekrar tekrar verilmemeli.
- Başlık İngilizce olmalıdır ve örnek fix align songs page cards and admin song modal # 906 tarzında olmalıdır.
- Açıklama Türkçe, 🎯 Amaç - 🔨 Yapılanlar - 📝 Notlar - 🧪 Kontroller başlıkları ile maddeler halinde ve edilgen bir dille yazılmalıdır. (Sohbet dışında Türkçenin geçtiği tek yer burasıdır.)
- Açıklamanın ilk satırı her zaman şu formatta olmalıdır

```
İlgili issue #...
```

(Buradaki `#...` kısmına ilgili görevin issue numarası yazılmalıdır.)

- Sadece göreve uygun etiket(ler), aşağıdaki sabit liste içinden seçilerek belirtilmelidir: `UI/UX`, `Feature`, `Frontend`, `Backend`, `Refactor`, `API`, `Bug`, `Await`, `Documentation`.

---

## 9. Günlük Rapor Kuralı (Google Form - Günlük Yapılan İşler)

- Kullanıcı `Günlük rapor hazırla.` komutunu ilettiğinde, o an tamamlanmış olan görev için Google Form'a doğrudan yapıştırılabilecek bir özet hazırlanmalıdır.
- Özet, `# Başlık (PR #...)` biçiminde bir başlık satırı ile başlamalı, altında maddeler halinde, Türkçe ve edilgen bir dille yazılmış birkaç paragraflık bir açıklama yer almalıdır.
- Paragrafta yapılan işin ne olduğu ve nasıl gerçekleştirildiği net, öz ve birkaç cümle/paragraf bütünlüğünde özetlenmeli; alt madde veya çoklu liste kullanılmalıdır.
- Bu rapor yalnızca kullanıcı bu komutu verdiğinde hazırlanmalı, görev bitiminde otomatik olarak sunulmamalıdır.

Örnek format

```
# OTP Modal İyileştirmesi (PR #1044)

- Şifre sıfırlama akışındaki OTP modal simülasyonu geliştirilmiştir. Modal her açıldığında altı haneli rastgele bir doğrulama kodu üretilerek tarayıcı konsolunda gösterilmesi sağlanmıştır. Doğru kod girildiğinde onay ve işlem tamamlandı mesajları, yanlış kod girildiğinde ise kabul edilmedi bildirimi gösterilmektedir.
```

---

## 10. Genel Çalışma Akışı Özeti

1. Görev önce analiz edilir, düşünülür.
2. `main` kontrol edilir ve güncellemeler çekilir.
3. Hassas veri ve güvenlik açığı riski taşıyan noktalar (OWASP Top 10 referanslı) gözden geçirilir.
4. Göreve uygun, İngilizce ve Conventional Commits standardına uygun yeni bir branch açılır.
5. Görev, Clean Code  DRY  KISS prensiplerine ve sabit responsive breakpoint'lere uyularak tek seferde tamamlanır.
6. Uygun sayıda, İngilizce başlık ve açıklamaya sahip local commit'ler atılır.
7. Lint ve build komutları çalıştırılmaz.
8. Görev bitiminde kullanıcıya sırasıyla Yapılan Değişiklikler ve PR Bilgisi başlıkları altında Türkçe, edilgen ve öğretici bir özet sunulur (`Kontroller tamamlandı, push edilebilir.` komutu geldikten sonra geçerlidir).

---

Bu kurallar her görevde otomatik olarak geçerlidir; kullanıcı tarafından ayrıca tekrar belirtilmesine gerek yoktur.
