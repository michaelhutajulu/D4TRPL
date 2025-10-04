# D4 TRPL - Elite Software Engineering Website

Website resmi Program Studi Diploma IV Teknologi Rekayasa Perangkat Lunak dengan desain modern, elegan, dan performa tinggi.

## ✨ Fitur Utama

- **Modern UI/UX Design** - Interface yang clean dengan dark theme dan aksen gold
- **Responsive Layout** - Tampilan optimal di semua perangkat (Desktop, Tablet, Mobile)
- **Smooth Animations** - Transisi dan efek hover yang mulus menggunakan CSS animations
- **Modular Architecture** - Struktur kode terpisah untuk kemudahan maintenance
- **Performance Optimized** - Loading cepat dengan lazy loading dan caching system
- **Interactive Gallery** - Galeri foto dengan drag-to-scroll functionality
- **Dynamic Content** - Konten dimuat secara dinamis tanpa reload halaman

## 🚀 Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom styling dengan CSS Variables, Grid, Flexbox, Animations
- **Vanilla JavaScript** - Tanpa framework, pure JS untuk performance maksimal
- **Google Fonts** - Inter font family

## 📂 Struktur Folder

```
d4trpl/
├── index.html              # Main HTML file
├── style.css               # Global styles
├── script.js               # Core JavaScript functions
├── page-loader.js          # Dynamic page loading system
└── pages/                  # Page components
    ├── beranda.html        # Homepage content
    ├── profil.html         # Profile page
    ├── mahasiswa.html      # Students page
    └── kontak.html         # Contact page
```

## 🛠️ Instalasi & Setup

### Metode 1: Live Server (Recommended)

1. Clone repository:
```bash
git clone https://github.com/username/d4trpl-website.git
cd d4trpl-website
```

2. Install VS Code extension "Live Server"

3. Klik kanan pada `index.html` → "Open with Live Server"

### Metode 2: Python HTTP Server

```bash
python -m http.server 8000
```
Akses di `http://localhost:8000`

### Metode 3: XAMPP

1. Copy folder ke `htdocs/`
2. Akses di `http://localhost/d4trpl-website`

## 🎨 Design Features

### Color Palette
- **Primary Gold:** `#fbbf24`
- **Dark Background:** `#0a0a0a`
- **Card Background:** `#151515`
- **Text Primary:** `#e5e5e5`
- **Text Dimmed:** `#a3a3a3`

### Key Components

**Particle Background**
- 30 animated particles for dynamic visual effect
- Smooth floating animation with CSS keyframes

**Navigation Bar**
- Sticky navigation with blur effect on scroll
- Smooth transition between menu items
- Mobile-responsive hamburger menu

**Gallery System**
- Horizontal scroll with mouse drag
- Hover effects with image zoom
- Smooth reveal animations

**Schedule Cards**
- Interactive course schedule display
- Hover effects with border highlight
- Responsive grid layout

## 📱 Responsive Breakpoints

- **Desktop:** > 768px
- **Tablet:** 768px - 480px
- **Mobile:** < 480px

## 🔧 Customization

### Menambah Halaman Baru

1. Buat file baru di folder `pages/`, contoh: `pages/alumni.html`

2. Tambahkan di `page-loader.js`:
```javascript
pages: {
    'beranda': 'pages/beranda.html',
    'profil': 'pages/profil.html',
    'mahasiswa': 'pages/mahasiswa.html',
    'kontak': 'pages/kontak.html',
    'alumni': 'pages/alumni.html'  // Baru
}
```

3. Update navigation di `index.html`:
```html
<li><a href="#" onclick="navigate('alumni', event)">Alumni</a></li>
```

4. Tambah container:
```html
<div id="alumni" class="page"></div>
```

### Mengubah Warna Theme

Edit CSS variables di `style.css`:
```css
:root {
    --gold: #your-color;
    --dark: #your-color;
    --text: #your-color;
}
```

## 🌟 Fitur JavaScript

### Page Loader System
- Lazy loading untuk performa optimal
- Cache system untuk menghindari request berulang
- Error handling yang proper

### Navigation
- SPA-like experience tanpa page reload
- Smooth scroll to top
- Active state management

### Gallery Interaction
- Mouse drag scrolling
- Touch support untuk mobile
- Cursor change feedback

## 📊 Performance

- **First Contentful Paint:** < 1s
- **Time to Interactive:** < 2s
- **Lighthouse Score:** 90+

## 🐛 Known Issues & Limitations

- Memerlukan web server untuk menjalankan (tidak bisa dibuka langsung dengan `file://`)
- Gallery drag tidak support di browser lama
- CSS Grid tidak support di IE11

## 🤝 Contributing

Kontribusi selalu diterima! Silakan:

1. Fork repository
2. Buat branch baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👨‍💻 Author

**D4 TRPL Team**
- Website: [d4trpl.university.ac.id](https://d4trpl.university.ac.id)
- Email: d4trpl@university.ac.id
- Instagram: [@d4trpl_2025](https://instagram.com/d4trpl_2025)

## 🙏 Acknowledgments

- [Unsplash](https://unsplash.com) untuk stock photos
- [Google Fonts](https://fonts.google.com) untuk Inter font
- Inspiration dari modern web design trends

---

⭐ Star repository ini jika kamu suka! ⭐
