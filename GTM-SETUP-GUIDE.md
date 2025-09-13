# 🎯 Google Tag Manager Kurulum Rehberi

Google Tag Manager (GTM) başarıyla entegre edildi! Şimdi GTM dashboard'da yapılandırma yapman gerekiyor.

## ✅ Tamamlanan Kurulumlar

### 1. **HTML Entegrasyonu**
- ✅ GTM script'i `<head>` bölümüne eklendi
- ✅ Noscript fallback `<body>` başına eklendi
- ✅ Container ID: `GTM-54DNXLKH`

### 2. **JavaScript Entegrasyonu**
- ✅ GTM utility fonksiyonları hazır
- ✅ DataLayer push fonksiyonları aktif
- ✅ Main.tsx'e GTM entegrasyonu eklendi

## 🚀 GTM Dashboard'da Yapılacaklar

### 1. **Google Analytics 4 Tag Oluştur**

1. [Google Tag Manager](https://tagmanager.google.com/) adresine git
2. Container'ını seç (`GTM-54DNXLKH`)
3. **Tags** > **New** > **Tag Configuration** > **Google Analytics: GA4 Configuration**
4. **Measurement ID**: `G-CVPZDJ1DQK` (Google Analytics ID'in)
5. **Triggering**: All Pages
6. **Tag Name**: "GA4 - Main Configuration"
7. **Save** > **Submit** > **Publish**

### 2. **Custom Event Tags Oluştur**

#### A. CV Download Conversion Tag
1. **New Tag** > **Google Analytics: GA4 Event**
2. **Configuration Tag**: GA4 - Main Configuration
3. **Event Name**: `resume_download`
4. **Event Parameters**:
   - `conversion_type`: `lead_generation`
   - `file_type`: `pdf`
5. **Triggering**: Custom Event > Event Name: `resume_download`
6. **Tag Name**: "GA4 - CV Download Conversion"

#### B. Email Click Conversion Tag
1. **New Tag** > **Google Analytics: GA4 Event**
2. **Configuration Tag**: GA4 - Main Configuration
3. **Event Name**: `email_click`
4. **Event Parameters**:
   - `conversion_type`: `contact`
   - `contact_method`: `email`
5. **Triggering**: Custom Event > Event Name: `email_click`
6. **Tag Name**: "GA4 - Email Click Conversion"

#### C. Project View Engagement Tag
1. **New Tag** > **Google Analytics: GA4 Event**
2. **Configuration Tag**: GA4 - Main Configuration
3. **Event Name**: `project_view`
4. **Event Parameters**:
   - `project_name`: `{{Project Name}}`
   - `project_type`: `{{Project Type}}`
5. **Triggering**: Custom Event > Event Name: `project_view`
6. **Tag Name**: "GA4 - Project View Engagement"

### 3. **Custom Variables Oluştur**

#### A. Project Name Variable
1. **Variables** > **New** > **Data Layer Variable**
2. **Variable Name**: `Project Name`
3. **Data Layer Variable Name**: `project_name`
4. **Save**

#### B. Project Type Variable
1. **Variables** > **New** > **Data Layer Variable**
2. **Variable Name**: `Project Type`
3. **Data Layer Variable Name**: `project_type`
4. **Save**

#### C. Language Preference Variable
1. **Variables** > **New** > **Data Layer Variable**
2. **Variable Name**: `Language Preference`
3. **Data Layer Variable Name**: `user_language_preference`
4. **Save**

### 4. **Built-in Variables Aktif Et**

1. **Variables** > **Configure** > **Built-in Variables**
2. Aktif et:
   - ✅ Page URL
   - ✅ Page Title
   - ✅ Click Element
   - ✅ Click URL
   - ✅ Click Text
   - ✅ Scroll Depth Threshold
   - ✅ Scroll Depth Units

### 5. **Triggers Oluştur**

#### A. Scroll Depth Trigger
1. **Triggers** > **New** > **Scroll Depth**
2. **Trigger Name**: "Scroll Depth - 25%, 50%, 75%, 90%"
3. **Scroll Depth Thresholds**: 25, 50, 75, 90
4. **Save**

#### B. External Link Click Trigger
1. **Triggers** > **New** > **Click - Just Links**
2. **Trigger Name**: "External Link Clicks"
3. **Wait for Tags**: 500ms
4. **Check Validation**: True
5. **This trigger fires on**: Some Clicks
6. **Click Element** contains `a[href^="http"]`
7. **Save**

### 6. **Preview Mode Test**

1. GTM'de **Preview** butonuna tıkla
2. Site URL'ini gir: `https://memir.codes`
3. Test et:
   - ✅ Sayfa yükleme
   - ✅ Dil değiştirme
   - ✅ Proje tıklama
   - ✅ CV indirme
   - ✅ Email tıklama
   - ✅ Scroll tracking

### 7. **Publish & Deploy**

1. **Submit** > **Publish**
2. **Version Name**: "Initial Setup - GA4 + Custom Events"
3. **Version Description**: "Google Analytics 4 + Custom event tracking setup"
4. **Publish**

## 📊 GTM'de Göreceğin Veriler

### **Real-time Reports**
- Container yükleme durumu
- Tag firing durumu
- DataLayer push'ları
- Error tracking

### **Debug Console**
- Event'lerin doğru çalışıp çalışmadığı
- Variable değerleri
- Trigger koşulları

## 🔧 Troubleshooting

### GTM Çalışmıyor
1. **Preview Mode**'da test et
2. **Console**'da hata var mı kontrol et
3. **Network** tab'ında GTM script'i yüklendi mi?

### Event'ler Gelmeyor
1. **DataLayer**'a push ediliyor mu?
2. **Trigger** koşulları doğru mu?
3. **Tag** yapılandırması doğru mu?

### Google Analytics'te Veri Yok
1. **GA4 Configuration Tag** çalışıyor mu?
2. **Measurement ID** doğru mu?
3. **Triggering** "All Pages" mi?

## 🎯 Sonraki Adımlar

### 1. **Conversion Goals Ayarla**
- GA4'te CV Download'ı conversion olarak işaretle
- Email Click'i conversion olarak işaretle

### 2. **Custom Reports Oluştur**
- Proje performans raporu
- Dil tercihi analizi
- Conversion funnel

### 3. **Advanced Tracking**
- Heatmap tracking (Hotjar)
- Form analytics
- A/B testing

## 📞 Destek

Herhangi bir sorun için:
- GTM Preview Mode'da debug et
- Browser Console'da hata kontrolü yap
- GitHub Issues: [memirdogan/personal-website](https://github.com/memirdogan/personal-website)
