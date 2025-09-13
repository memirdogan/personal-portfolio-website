# 🚀 SEO ve Analytics Rehberi

Bu rehber, portfolyo siteniz için Google Analytics 4 ve SEO optimizasyonu kurulumunu açıklar.

## 📊 Google Analytics 4 (GA4) Kurulumu

### 1. Google Analytics Hesabı Oluşturma
1. [Google Analytics](https://analytics.google.com/) adresine git
2. "Start measuring" butonuna tıkla
3. Hesap adı: "Musa Emir Doğan Portfolio"
4. Property adı: "memir.codes"
5. Reporting time zone: "Turkey (GMT+3)"
6. Currency: "Turkish Lira (TRY)"

### 2. Measurement ID Alma
1. GA4 dashboard'da "Admin" > "Data Streams" > "Web"
2. "Add stream" > "Web"
3. Website URL: `https://memir.codes`
4. Stream name: "memir.codes"
5. **Measurement ID'i kopyala** (G-XXXXXXXXXX formatında)

### 3. Environment Variable Ayarlama
```bash
# .env dosyası oluştur
echo "VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX" > .env
```

### 4. HTML'de GA4 ID Güncelleme
`index.html` dosyasında `G-XXXXXXXXXX` yerine gerçek Measurement ID'inizi yazın.

## 🎯 Takip Edilen Events

### Otomatik Takip
- **Page Views**: Sayfa görüntülemeleri
- **Language Switch**: Dil değiştirme
- **External Link Clicks**: Dış link tıklamaları
- **Project Views**: Proje görüntülemeleri
- **Resume Downloads**: CV indirmeleri

### Custom Events
```javascript
// Manuel event tracking örneği
import { trackPortfolioEvent } from './utils/analytics';

// Dil değiştirme
trackPortfolioEvent.languageSwitch('tr');

// Proje görüntüleme
trackPortfolioEvent.projectView('RenaByte');

// Dış link tıklama
trackPortfolioEvent.externalLinkClick('GitHub', 'https://github.com/memirdogan');
```

## 🔍 SEO Optimizasyonları

### 1. Mevcut SEO Özellikleri
- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags (Facebook, LinkedIn)
- ✅ Twitter Cards
- ✅ JSON-LD structured data
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Canonical URLs
- ✅ Hreflang tags (TR/EN)
- ✅ Image alt tags
- ✅ PWA manifest

### 2. Google Search Console Kurulumu
1. [Google Search Console](https://search.google.com/search-console/) adresine git
2. "Add property" > "URL prefix"
3. Site URL: `https://memir.codes`
4. Verification method: HTML file upload
5. `google-site-verification.html` dosyasını public/ klasörüne koy

### 3. Sitemap Gönderme
1. Google Search Console'da "Sitemaps" bölümüne git
2. "Add a new sitemap" > `sitemap.xml`
3. Submit et

## 📈 Analytics Dashboard'da Görülecek Veriler

### Real-time Reports
- Aktif kullanıcılar
- Sayfa görüntülemeleri
- Coğrafi konum
- Cihaz türü

### Engagement Reports
- **Events**: language_switch, project_view, external_link_click
- **Conversions**: resume_download
- **User Engagement**: sayfa başına görüntüleme süresi

### Audience Reports
- Demografik bilgiler
- İlgi alanları
- Teknoloji kullanımı

## 🛠️ Ek SEO Araçları

### 1. All in One SEO Pack Alternatifi
Bu proje için manuel SEO optimizasyonu yapıldı. Eğer WordPress'e geçersen:
- Yoast SEO
- RankMath
- All in One SEO Pack

### 2. Performans İzleme
```bash
# Lighthouse audit
npm run build
npx lighthouse https://memir.codes --view

# Core Web Vitals
# Google PageSpeed Insights: https://pagespeed.web.dev/
```

### 3. Keyword Tracking
- Google Search Console'da "Performance" raporu
- "Musa Emir Doğan", "Cloud Engineer", "AWS Sertifikalı" aramalarını izle

## 🚀 Deployment Sonrası Yapılacaklar

### 1. Google Analytics Doğrulama
```bash
# GA4'ün çalıştığını kontrol et
# Browser Developer Tools > Network > gtag
```

### 2. Search Console Verification
- Sitemap gönder
- URL inspection yap
- Coverage raporunu kontrol et

### 3. Social Media Optimization
- LinkedIn'de profil linkini güncelle
- GitHub README'de site linkini ekle
- Twitter bio'da site linkini paylaş

## 📊 Haftalık SEO Kontrol Listesi

- [ ] Google Analytics'te yeni veriler var mı?
- [ ] Search Console'da hata var mı?
- [ ] Sitemap güncel mi?
- [ ] Yeni içerik eklendi mi?
- [ ] Backlink'ler artıyor mu?

## 🎯 Hedef Anahtar Kelimeler

### Birincil
- "Musa Emir Doğan"
- "Cloud Engineer"
- "AWS Sertifikalı"
- "DevOps Uzmanı"

### İkincil
- "memir codes"
- "emir codes"
- "Kubernetes Uzmanı"
- "Terraform"
- "Platform Engineer"

### Uzun Kuyruk
- "Musa Emir Doğan Cloud Engineer"
- "AWS Sertifikalı DevOps"
- "Kubernetes Docker uzmanı"
- "Sufle Cloud Engineer"

## 🔧 Troubleshooting

### GA4 Veri Gelmiyor
1. Measurement ID doğru mu?
2. .env dosyası build'e dahil edildi mi?
3. Ad blocker kapalı mı?

### SEO Sıralaması Düşük
1. Google Search Console'da hata var mı?
2. Sitemap güncel mi?
3. İçerik kalitesi yeterli mi?
4. Backlink'ler var mı?

## 📞 Destek

Herhangi bir sorun için:
- GitHub Issues: [memirdogan/personal-website](https://github.com/memirdogan/personal-website)
- Email: musaemird@gmail.com
