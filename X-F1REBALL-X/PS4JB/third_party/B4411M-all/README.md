# B41M 17PlayBox

## WebKit Host for PlayStation 4 and PlayStation 5

B41M 17PlayBox adalah host web untuk menjalankan workflow WebKit pada browser PlayStation 4 dan PlayStation 5 yang didukung. Beranda utama mendeteksi firmware bila memungkinkan, mengarahkan pengguna ke host yang sesuai, dan menyediakan cache offline setelah resource selesai diunduh.

> Gunakan hanya pada perangkat yang Anda miliki atau kelola secara sah. Proses ini dapat menyebabkan crash, reboot, kehilangan data, pembatalan garansi, atau pelanggaran ketentuan layanan.

## Fitur Utama

- Beranda pemilih host dengan deteksi firmware dan pilihan manual.
- Antarmuka terminal B41M yang konsisten pada halaman PS4 dan PS5.
- Dukungan cache offline melalui Application Cache.
- Host PS4 untuk firmware legacy dan modern.
- Pilihan chain PS4 NetCtrl atau Lapse pada folder `6`.
- Chain Lapse dan Poops untuk firmware yang tersedia pada host `11`.
- Host PS5 SlopKit dengan pengiriman payload ELF.
- Favicon dan identitas visual B41M pada halaman HTML utama.

## Dukungan Firmware

### PlayStation 4

| Host | Firmware | Keterangan |
| --- | --- | --- |
| `6/` | 6.00-11.02 | Host legacy dengan pilihan chain NetCtrl atau Lapse. |
| `11/` | 11.50, 11.52, 12.00, 12.02, 12.50, 12.52, 13.00, 13.02, 13.04, 13.50, 13.52 | Host modern dengan chain sesuai tabel offset. |

Versi firmware harus cocok dengan offset yang tersedia. Jangan menganggap semua versi di antara angka pada tabel otomatis didukung.

### PlayStation 5

| Host | Firmware |
| --- | --- |
| `ps5/` | 9.00-12.00, sesuai offset yang tersedia |

Offset PS5 tersedia di `ps5/offsets/`. Payload ELF dan BIN tersedia di `ps5/payloads/`.

## Cache Offline

Manifest yang digunakan proyek:

| Area | Manifest |
| --- | --- |
| Beranda utama | `cache.manifest` |
| PS4 legacy | `6/cache.manifest` |
| PS4 modern | `13/cache.appcache` |
| PS5 | `ps5/cache.manifest` |

Cache harus dibuat atau diperbarui ketika server masih dapat diakses. Setelah file JavaScript, CSS, HTML, payload, offset, atau patch berubah, perbarui versi komentar manifest atau regenerasi manifest agar browser mendeteksi perubahan.

Server perlu mengirim file `.manifest` dan `.appcache` dengan MIME type `text/cache-manifest` bila browser target masih memerlukan Application Cache.

## Informasi Proyek

- **Nama:** B41M 17PlayBox
- **Pemilik:** Ibrahim Yusuf
- **Alamat:** Jl. Tahir, Muara Jawa, Kukar, Kalimantan Timur, Indonesia
- **Kontak:** 085555551497
- **Hak cipta:** © 2026 B41M 17PlayBox / Ibrahim Yusuf

## Lisensi

Materi asli proyek ini dilindungi hak cipta dan dirilis dengan lisensi
proprietary **All Rights Reserved**. Lihat [LICENSE](LICENSE) untuk ketentuan
lengkap. Tanpa izin tertulis, dilarang menyalin, menggunakan, memodifikasi,
mendistribusikan, menjual, me-rebrand, atau memasukkan materi asli proyek ini
ke proyek lain.

Lisensi ini tidak menggantikan lisensi atau hak milik pihak ketiga. Kode,
offset, payload, binary, gambar, nama, dan komponen upstream tetap tunduk pada
ketentuan pemilik masing-masing serta kewajiban atribusinya.

Pemberitahuan lisensi tidak sama dengan pendaftaran paten atau merek. Untuk
perlindungan hukum yang lebih kuat, simpan bukti tanggal pembuatan dan lakukan
pendaftaran hak cipta, merek, atau paten melalui instansi resmi yang relevan.

## Penafian

Perangkat lunak ini disediakan apa adanya tanpa jaminan. Pengguna bertanggung jawab atas perangkat, data, akun, payload, dan lingkungan pengujian yang digunakan. Jangan menjalankan payload yang tidak tepercaya, dan jangan gunakan proyek ini pada perangkat yang bukan milik Anda atau tanpa izin pemiliknya.
