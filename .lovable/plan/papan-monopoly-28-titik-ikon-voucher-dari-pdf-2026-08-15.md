# Papan Monopoly: 28 Titik + Ikon + Voucher dari PDF

## Yang berubah

1. **Jumlah titik: 20 → 28**, semua isinya diganti dengan daftar dari PDF (kolom Place, Question, Answer).
2. **Setiap titik punya ikon**, bukan hanya nama tempat — mengikuti kolom "Place/Icon in the Monopoly Board":
   - Earth 🌍, South America 🇪🇨/🌎, England 🏴, Scotland 🏴, Lake 🦢, Singapore 🇸🇬, Australia 🇦🇺, Japan 🇯🇵, Malaysia 🇲🇾, Thailand 🇹🇭, Indonesia 🇮🇩
   - Ikon tampil di bulatan titik pada papan (menggantikan angka), plus label nama tempat di bawahnya. Nomor urut ditampilkan kecil di sudut.
   - Titik yang belum terbuka tetap terkunci (ikon gembok).
3. **Pertanyaan & jawaban benar** diambil persis dari PDF. Karena format aplikasi pilihan ganda 4 opsi, tiap soal dibuat 1 jawaban benar (dari kolom Answer) + 3 pengecoh yang masuk akal dan setema (misal untuk stand Old Trafford: Stretford End, Sir Bobby Charlton Stand, East Stand).
4. **Voucher: 10 → 8**, diganti isi halaman 4 PDF:
   - Carousel Horse Music Box, Untuk Apa Menikah? Untuk Apa Keluarga (books), Spa days!, Sushi week!, Car drive lesson month!, Trip!, Give back to others!, Bag!
   - Deskripsi memakai teks dari PDF, plus catatan **Valid until: 15 August 2027** di bagian atas halaman hadiah.
5. Teks "memory" di bawah jawaban tiap titik memakai konteks dari pertanyaan PDF (bisa kamu edit lagi nanti).

## Catatan teknis

- Semua perubahan konten di `src/data/journey.ts`: tambah field `icon` pada tipe `Stop`, isi 28 entri, ganti `VOUCHERS` jadi 8 entri, tambah `VOUCHER_VALIDITY`.
- `JourneyBoard.tsx`: render ikon di dalam bulatan, nomor urut kecil, tetap jalur berkelok + auto-scroll ke titik aktif. Jarak antar-titik disesuaikan agar 28 titik tetap enak di HP.
- `StopCard.tsx`: tampilkan ikon + nama tempat di badge.
- `RewardsPage.tsx`: grid 8 kartu + baris masa berlaku.
- Foto: titik Singapura tetap pakai foto Merlion yang sudah diunggah; sisanya pakai placeholder sampai kamu kirim foto.
- Progress lama di browser di-reset otomatis (versi state dinaikkan) karena jumlah titik berubah.

## Bahasa: semua jadi Inggris

Seluruh aplikasi diubah ke Bahasa Inggris — bukan hanya soal dari PDF:

- Welcome screen, tombol, label papan, badge progres, pesan setelah menjawab, halaman hadiah, dan surat penutup ditulis ulang dalam Bahasa Inggris.
- Pertanyaan dan jawaban tetap persis seperti PDF.
- Konstanta konten (`WELCOME_MESSAGE`, `FINISH_MESSAGE`, `ALL_UNLOCKED_MESSAGE`, `FINAL_MESSAGE`) dan komentar panduan edit di `src/data/journey.ts` juga diterjemahkan.
- Meta title/description di route diperbarui ke Bahasa Inggris.
