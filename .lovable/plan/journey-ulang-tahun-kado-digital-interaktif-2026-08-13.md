# Journey Ulang Tahun — Kado Digital Interaktif

Web app satu halaman berisi papan perjalanan 20 titik kenangan, diakhiri 10 voucher digital yang dibuka satu per satu. Tanpa login, tanpa backend — semua konten mudah diedit dari satu file data.

## Alur Pengguna

```text
[Layar Sambutan]  ->  [Papan Journey 20 titik]  ->  [Kartu Kenangan tiap titik]
       nama                 token berjalan              foto + pertanyaan
                                   |                    tombol "Lihat jawaban"
                                   v
                     [Confetti selesai] -> [Halaman Hadiah: 10 voucher scratch]
```

1. **Layar sambutan** — judul "Journey Ulang Tahun [Nama]", ucapan singkat, tombol "Mulai Perjalanan", tombol musik.
2. **Papan journey** — jalur berkelok dengan 20 titik bernomor (gaya peta level mobile game). Titik yang sudah dilewati ditandai, titik aktif berdenyut, token karakter kecil beranimasi pindah ke titik berikutnya. Header menampilkan "Titik 7 dari 20" + progress bar.
3. **Kartu kenangan** — muncul sebagai modal bergaya kartu Chance: foto placeholder, nama kota, dan pertanyaan pilihan ganda dengan tepat 4 opsi. Dia harus memilih satu jawaban dulu; setelah memilih, barulah jawaban/kenangan terbuka dengan reaksi manis (pilihan tepat dapat kilauan kecil, pilihan lain tetap dibalas hangat — tanpa kesan ujian). Tombol "Lanjut" aktif setelah jawaban dipilih.
4. **Selesai** — animasi confetti + pesan, lalu tombol menuju halaman Hadiah.
5. **Halaman hadiah** — grid 10 kartu voucher tertutup. Tiap kartu dibuka lewat scratch-to-reveal (gosok pakai jari/mouse); saat terbuka muncul kilauan + confetti kecil dan isi voucher. Penghitung "3 dari 10 terbuka" dan pesan penutup saat semua terbuka.

## Visual

- Palet ungu/violet dengan gradasi lavender, pink pastel, aksen gold/cream; latar bertekstur lembut dengan bintang kecil dan awan/bulan yang mengambang pelan.
- Tipografi: judul handwritten/rounded playful, body rounded sans yang enak dibaca.
- Kartu memakai sudut membulat besar, border gold tipis, dan bayangan lembut keunguan.
- Mobile-first: papan bisa di-scroll vertikal di HP, kartu jadi sheet penuh layar di layar kecil.
- Motion ringan: token melompat antar titik, kartu masuk dengan scale-in, confetti di dua momen kunci.

## Konten

- 20 pertanyaan placeholder bertema kota/liburan (contoh: "Di kota ini, apa hal pertama yang kita lakukan?"), masing-masing dengan nama kota placeholder, 4 opsi pilihan ganda, penanda opsi yang "paling benar", dan teks kenangan yang muncul setelah menjawab — semua siap diedit.
- 10 voucher persis seperti daftar yang diberikan, masing-masing dengan ikon/emoji dan warna aksen.
- Foto: placeholder image per titik, siap diganti dengan file asli di `src/assets`.

## Musik

Pemutar musik latar kecil yang menempel di pojok (tombol play/mute, tanpa autoplay). Elemen `<audio loop>` menunjuk ke `/musik-latar.mp3` di folder `public` sebagai placeholder — tinggal ditimpa dengan lagu pilihan sendiri.

## Catatan Teknis

- Semua route di TanStack Router; halaman utama di `src/routes/index.tsx` (single page, state tahap dikelola di React state).
- Satu file data `src/data/journey.ts` mengekspor `RECIPIENT_NAME`, `STOPS` (20 objek), dan `VOUCHERS` (10 objek) — satu-satunya tempat yang perlu diedit untuk mengganti konten.
- Komponen dipecah: `WelcomeScreen`, `JourneyBoard`, `StopCard`, `RewardsPage`, `ScratchCard`, `MusicPlayer`, `Confetti`.
- Token warna ungu/gold dan font ditambahkan ke `src/styles.css` (oklch), font dimuat via `<link>` di `__root.tsx`.
- Scratch card memakai canvas ringan dengan fallback tap-to-open di perangkat yang tidak mendukung.
- Progress journey disimpan di `localStorage` agar tidak hilang kalau halaman ter-refresh.
- Metadata `head()` khusus untuk halaman: judul dan deskripsi bernuansa ulang tahun.
