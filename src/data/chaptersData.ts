import { Chapter } from '../types';

export const CHAPTERS: Chapter[] = [
  {
    id: 'bab-1',
    number: 1,
    titleArabic: 'التَّعَارُفُ',
    titleLatin: "At-Ta'aruf",
    titleMeaning: 'Perkenalan',
    description: 'Mempelajari ungkapan salam, menyapa, memperkenalkan diri dan teman, isim isyarah (هَذَا / هَذِهِ), serta kata ganti dhomir dasar.',
    badgeColor: 'emerald',
    mufrodat: [
      { id: 'm1-1', arabic: 'اِسْمِي', latin: 'Ismii', meaning: 'Namaku', type: 'isim', exampleArabic: 'اِسْمِي فَايِزٌ', exampleMeaning: 'Namaku Faiz' },
      { id: 'm1-2', arabic: 'مَنْ أَنْتَ؟', latin: 'Man anta?', meaning: 'Siapa kamu? (laki-laki)', type: 'isim', exampleArabic: 'مَنْ أَنْتَ يَا أَخِي؟', exampleMeaning: 'Siapa kamu wahai saudaraku?' },
      { id: 'm1-3', arabic: 'مَنْ أَنْتِ؟', latin: 'Man anti?', meaning: 'Siapa kamu? (perempuan)', type: 'isim', exampleArabic: 'مَنْ أَنْتِ يَا أُخْتِي؟', exampleMeaning: 'Siapa kamu wahai saudariku?' },
      { id: 'm1-4', arabic: 'طَالِبٌ', latin: 'Thaalibun', meaning: 'Siswa / Murid Laki-laki', type: 'isim', gender: 'mudzakkar', exampleArabic: 'أَنَا طَالِبٌ فِي المَدْرَسَةِ', exampleMeaning: 'Saya seorang siswa di sekolah' },
      { id: 'm1-5', arabic: 'طَالِبَةٌ', latin: 'Thaalibatun', meaning: 'Siswi / Murid Perempuan', type: 'isim', gender: 'muannats', exampleArabic: 'عَائِشَةُ طَالِبَةٌ جَدِيدَةٌ', exampleMeaning: 'Aisyah adalah siswi baru' },
      { id: 'm1-6', arabic: 'صَدِيقِي', latin: 'Shadiiqii', meaning: 'Temanku (laki-laki)', type: 'isim', gender: 'mudzakkar', exampleArabic: 'هَذَا حَسَنٌ، هُوَ صَدِيقِي', exampleMeaning: 'Ini Hasan, dia temanku' },
      { id: 'm1-7', arabic: 'صَدِيقَتِي', latin: 'Shadiiqatii', meaning: 'Temanku (perempuan)', type: 'isim', gender: 'muannats', exampleArabic: 'هَذِهِ فَاطِمَةُ، هِيَ صَدِيقَتِي', exampleMeaning: 'Ini Fatimah, dia temanku' },
      { id: 'm1-8', arabic: 'كَيْفَ حَالُكَ؟', latin: 'Kaifa haaluka?', meaning: 'Bagaimana kabarmu? (lk)', type: 'harf', exampleArabic: 'كَيْفَ حَالُكَ اليَوْمَ؟', exampleMeaning: 'Bagaimana kabarmu hari ini?' },
      { id: 'm1-9', arabic: 'بِخَيْرٍ وَالحَمْدُ لِلّٰهِ', latin: 'Bikhairin walhamdulillah', meaning: 'Baik, segala puji bagi Allah', type: 'harf', exampleArabic: 'أَنَا بِخَيْرٍ وَالحَمْدُ لِلّٰهِ', exampleMeaning: 'Saya baik, alhamdulillah' },
      { id: 'm1-10', arabic: 'مِنْ أَيْنَ أَنْتَ؟', latin: 'Min aina anta?', meaning: 'Dari mana kamu berasal?', type: 'harf', exampleArabic: 'أَنَا مِنْ مَدِينَةِ مَالَانْج', exampleMeaning: 'Saya dari kota Malang' },
      { id: 'm1-11', arabic: 'أَهْلًا وَسَهْلًا', latin: "Ahlan wa sahlan", meaning: 'Selamat datang', type: 'harf', exampleArabic: 'أَهْلًا وَسَهْلًا بِكُمْ', exampleMeaning: 'Selamat datang kalian semua' },
      { id: 'm1-12', arabic: 'شُكْرًا جَزِيلًا', latin: 'Syukran jaziilan', meaning: 'Terima kasih banyak', type: 'harf', exampleArabic: 'عَفْوًا يَا أَخِي', exampleMeaning: 'Sama-sama wahai saudaraku' },
    ],
    qawaid: {
      title: "Isim Dhomir Munfashil & Isim Isyarah Dasar",
      summary: "Membedakan kata ganti orang (Dhomir) dan kata tunjuk dekat (هَذَا / هَذِهِ) sesuai jenis Mudzakkar & Muannats.",
      explanation: `
1. **Dhomir Munfashil (Kata Ganti Mandiri):**
- هُوَ (Dia - laki-laki)
- هِيَ (Dia - perempuan)
- أَنْتَ (Kamu - laki-laki)
- أَنْتِ (Kamu - perempuan)
- أَنَا (Saya - laki-laki/perempuan)
- نَحْنُ (Kami / Kita)

2. **Isim Isyarah (Kata Tunjuk Dekat):**
- **هَذَا** (Ini) digunakan untuk kata berjenis laki-laki (**Mudzakkar**), cirinya umumnya tanpa ta' marbuthah (ة).
  *Contoh:* هَذَا طَالِبٌ (Ini siswa laki-laki).
- **هَذِهِ** (Ini) digunakan untuk kata berjenis perempuan (**Muannats**), cirinya memiliki huruf ta' marbuthah (ة) di akhir kata.
  *Contoh:* هَذِهِ طَالِبَةٌ (Ini siswi perempuan).
      `.trim(),
      examples: [
        { arabic: 'هَذَا عَلِيٌّ، هُوَ طَالِبٌ', latin: 'Haadzaa Aliyyun, huwa thaalibun', meaning: 'Ini Ali, dia seorang siswa' },
        { arabic: 'هَذِهِ فَاطِمَةُ، هِيَ طَالِبَةٌ', latin: 'Haadzihii Faathimatu, hiya thaalibatun', meaning: 'Ini Fatimah, dia seorang siswi' },
        { arabic: 'أَنَا أَحْمَدُ، أَنَا مِنْ جَاكَرْتَا', latin: 'Ana Ahmadu, ana min Jaakarta', meaning: 'Saya Ahmad, saya dari Jakarta' },
      ],
    },
    hiwar: {
      title: 'Hiwar Perkenalan Siswa Baru di Hari Pertama MTs',
      setting: 'Di teras kelas MTs antara Azzam dan Farhan',
      dialogs: [
        { speaker: 'عَزَّام', speakerRole: 'Azzam', arabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللّٰهِ وَبَرَكَاتُهُ', latin: "Assalaamu 'alaikum warahmatullaahi wabarakaatuh", meaning: 'Semoga keselamatan, rahmat Allah dan berkah-Nya tercurah kepadamu' },
        { speaker: 'فَرْحَان', speakerRole: 'Farhan', arabic: 'وَعَلَيْكُمُ السَّلَامُ وَرَحْمَةُ اللّٰهِ وَبَرَكَاتُهُ', latin: "Wa'alaikumussalaam warahmatullaahi wabarakaatuh", meaning: 'Dan semoga keselamatan serta rahmat dan berkah-Nya tercurah pula kepadamu' },
        { speaker: 'عَزَّام', speakerRole: 'Azzam', arabic: 'صَبَاحُ الخَيْرِ! اِسْمِي عَزَّام، مَا اسْمُكَ؟', latin: 'Shabaahul khair! Ismii Azzaam, masmuka?', meaning: 'Selamat pagi! Namaku Azzam, siapa namamu?' },
        { speaker: 'فَرْحَان', speakerRole: 'Farhan', arabic: 'صَبَاحُ النُّورِ! اِسْمِي فَرْحَان. أَهْلًا بِكَ يَا عَزَّام', latin: 'Shabaahun nuur! Ismii Farhaan. Ahlan bika yaa Azzaam', meaning: 'Selamat pagi juga! Namaku Farhan. Senang bertemu denganmu wahai Azzam' },
        { speaker: 'عَزَّام', speakerRole: 'Azzam', arabic: 'مِنْ أَيْنَ أَنْتَ يَا فَرْحَان؟', latin: 'Min aina anta yaa Farhaan?', meaning: 'Dari mana asalmu wahai Farhan?' },
        { speaker: 'فَرْحَان', speakerRole: 'Farhan', arabic: 'أَنَا مِنْ سُورَابَايَا، وَأَنْتَ؟', latin: 'Ana min Suurabaya, wa anta?', meaning: 'Saya dari Surabaya, dan kamu?' },
        { speaker: 'عَزَّام', speakerRole: 'Azzam', arabic: 'أَنَا مِنْ بَانْدُونْج. هَلْ أَنْتَ طَالِبٌ جَدِيدٌ؟', latin: 'Ana min Baanduung. Hal anta thaalibun jadiidun?', meaning: 'Saya dari Bandung. Apakah kamu siswa baru?' },
        { speaker: 'فَرْحَان', speakerRole: 'Farhan', arabic: 'نَعَمْ، أَنَا طَالِبٌ جَدِيدٌ فِي الفَصْلِ السَّابِعِ', latin: "Na'am, ana thaalibun jadiidun fil fashlis saabi'", meaning: 'Ya, saya siswa baru di kelas 7' },
      ],
    },
    qiraah: {
      title: 'Teks Bacaan: التَّعَارُفُ فِي المَدْرَسَةِ الجَدِيدَةِ',
      arabicText: 'هَذَا فَارُوقٌ. هُوَ طَالِبٌ جَدِيدٌ فِي المَدْرَسَةِ الثَّانَوِيَّةِ الإِسْلَامِيَّةِ. هُوَ مِنْ مَدِينَةِ سِمَارَانْج. وَهَذِهِ فِطْرِيَّةُ، هِيَ طَالِبَةٌ جَدِيدَةٌ أَيْضًا. فِطْرِيَّةُ مِنْ مَدِينَةِ يُوجْيَاكَارْتَا. هُمَا طَالِبَانِ نَشِيطَانِ فِي الفَصْلِ السَّابِعِ.',
      indonesianText: 'Ini Faruq. Dia adalah siswa baru di Madrasah Tsanawiyah. Dia berasal dari kota Semarang. Dan ini Fitriyah, dia juga siswi baru. Fitriyah berasal dari kota Yogyakarta. Keduanya adalah siswa yang rajin di kelas 7.',
    },
    quiz: [
      {
        id: 'q1-1',
        question: 'Lengkapilah kalimat berikut dengan kata ganti (dhomir) yang tepat: "هَذَا عُمَرُ، ... طَالِبٌ نَشِيطٌ"',
        arabicPrompt: 'هَذَا عُمَرُ، ... طَالِبٌ نَشِيطٌ',
        options: ['هِيَ', 'هُوَ', 'أَنْتِ', 'هَذِهِ'],
        correctIndex: 1,
        explanation: 'Umar adalah mudzakkar (laki-laki), sehingga kata ganti yang tepat adalah هُوَ (dia laki-laki).',
      },
      {
        id: 'q1-2',
        question: 'Manakah isim isyarah yang tepat untuk melengkapi: "... مَدْرَسَتِي"',
        arabicPrompt: '... مَدْرَسَتِي',
        options: ['هَذَا', 'هَذِهِ', 'هُوَ', 'أَنْتَ'],
        correctIndex: 1,
        explanation: 'Kata "madrasah" berakhiran ta\' marbuthah (muannats), maka menggunakan kata tunjuk هَذِهِ.',
      },
      {
        id: 'q1-3',
        question: 'Apakah arti dari ungkapan "كَيْفَ حَالُكَ؟" ?',
        options: ['Siapa namamu?', 'Dari mana kamu?', 'Bagaimana kabarmu?', 'Berapa umurmu?'],
        correctIndex: 2,
        explanation: '"Kaifa haaluka" adalah pertanyaan untuk menanyakan kabar kesehatan/kondisi seseorang.',
      },
      {
        id: 'q1-4',
        question: 'Jawaban yang lazim ketika seseorang mengucapkan "أَهْلًا وَسَهْلًا" adalah...',
        options: ['أَهْلًا بِكَ', 'عَفْوًا', 'إِلَى اللِّقَاءِ', 'مَعَ السَّلَامَةِ'],
        correctIndex: 0,
        explanation: 'Jawaban ramah untuk "Ahlan wa Sahlan" adalah "Ahlan bika" (untuk pria) atau "Ahlan biki" (untuk wanita).',
      },
    ],
  },
  {
    id: 'bab-2',
    number: 2,
    titleArabic: 'المَرَافِقُ المَدْرَسِيَّةُ',
    titleLatin: 'Al-Marafiq Al-Madrasiyyah',
    titleMeaning: 'Fasilitas & Lingkungan Sekolah',
    description: 'Mengenal ruangan dan fasilitas di madrasah/sekolah, kata sifat (Naat-Manut), serta kata keterangan tempat (Dharf Makan).',
    badgeColor: 'sky',
    mufrodat: [
      { id: 'm2-1', arabic: 'مَدْرَسَةٌ', latin: 'Madrasatun', meaning: 'Sekolah / Madrasah', type: 'isim', gender: 'muannats' },
      { id: 'm2-2', arabic: 'فَصْلٌ', latin: 'Fashlun', meaning: 'Ruang Kelas', type: 'isim', gender: 'mudzakkar' },
      { id: 'm2-3', arabic: 'مَكْتَبَةٌ', latin: 'Maktabatun', meaning: 'Perpustakaan', type: 'isim', gender: 'muannats' },
      { id: 'm2-4', arabic: 'مَعْمَلُ اللُّغَةِ', latin: "Ma'malul Lughah", meaning: 'Laboratorium Bahasa', type: 'isim', gender: 'mudzakkar' },
      { id: 'm2-5', arabic: 'مَسْجِدٌ', latin: 'Masjidun', meaning: 'Masjid', type: 'isim', gender: 'mudzakkar' },
      { id: 'm2-6', arabic: 'مَقْصَفٌ', latin: 'Maqshafun', meaning: 'Kantin Sekolah', type: 'isim', gender: 'mudzakkar' },
      { id: 'm2-7', arabic: 'مَلْعَبٌ', latin: "Mal'abun", meaning: 'Lapangan Olahraga', type: 'isim', gender: 'mudzakkar' },
      { id: 'm2-8', arabic: 'إِدَارَةٌ', latin: 'Idaaratun', meaning: 'Kantor / Ruang Tata Usaha', type: 'isim', gender: 'muannats' },
      { id: 'm2-9', arabic: 'حَمَّامٌ', latin: 'Hammaamun', meaning: 'Kamar Mandi / Toilet', type: 'isim', gender: 'mudzakkar' },
      { id: 'm2-10', arabic: 'أَمَامَ', latin: 'Amaama', meaning: 'Di depan', type: 'harf' },
      { id: 'm2-11', arabic: 'وَرَاءَ', latin: 'Waraa-a', meaning: 'Di belakang', type: 'harf' },
      { id: 'm2-12', arabic: 'جَانِبَ', latin: 'Jaaniba', meaning: 'Di samping / Di sebelah', type: 'harf' },
      { id: 'm2-13', arabic: 'فَوْقَ', latin: 'Fauqa', meaning: 'Di atas (menempel / melayang)', type: 'harf' },
      { id: 'm2-14', arabic: 'فِي', latin: 'Fii', meaning: 'Di dalam', type: 'harf' },
    ],
    qawaid: {
      title: "Na'at - Man'ut & Dharf Makan (Keterangan Tempat)",
      summary: "Menyusun kata benda yang disifati (Man'ut) beserta kata sifatnya (Na'at) serta penggunaan kata keterangan posisi.",
      explanation: `
1. **Aturan Na'at dan Man'ut (Sifat & Yang Disifati):**
Kata sifat (**Na'at**) harus selalu mengikuti kata benda sebelumnya (**Man'ut**) dalam hal:
- Jenis kelamin: Jika bendanya mudzakkar, sifatnya harus mudzakkar. Jika muannats (ada ة), sifatnya juga muannats (tambahkan ة).
  *Contoh:* فَصْلٌ نَظِيفٌ (Kelas yang bersih) vs مَدْرَسَةٌ نَظِيفَةٌ (Sekolah yang bersih).
  *Contoh:* مَسْجِدٌ كَبِيرٌ (Masjid yang besar) vs مَكْتَبَةٌ كَبِيرَةٌ (Perpustakaan yang besar).

2. **Dharf Makan (Keterangan Tempat):**
Kata benda setelah kata keterangan tempat harakat akhirnya menjadi kasrah/kasratain:
- أَمَامَ المَدْرَسَةِ (Di depan sekolah)
- وَرَاءَ الفَصْلِ (Di belakang kelas)
- جَانِبَ المَسْجِدِ (Di sebelah masjid)
      `.trim(),
      examples: [
        { arabic: 'المَسْجِدُ كَبِيرٌ وَنَظِيفٌ', latin: "Al-masjidu kabiirun wa nazhiifun", meaning: 'Masjid itu besar dan bersih' },
        { arabic: 'المَقْصَفُ جَانِبَ المَلْعَبِ', latin: "Al-maqshafu jaanibal mal'ab", meaning: 'Kantin itu berada di samping lapangan' },
        { arabic: 'هَذِهِ مَكْتَبَةٌ وَاسِعَةٌ', latin: 'Haadzihii maktabatun waasi\'atun', meaning: 'Ini adalah perpustakaan yang luas' },
      ],
    },
    hiwar: {
      title: 'Mengenal Fasilitas Sekolah',
      setting: 'Siswa berkeliling madrasah saat jam istirahat',
      dialogs: [
        { speaker: 'إِلْيَاس', speakerRole: 'Ilyas', arabic: 'أُنْظُرْ يَا حَامِد! هَذِهِ مَدْرَسَتُنَا، هِيَ كَبِيرَةٌ وَجَمِيلَةٌ', latin: "Unzhur yaa Haamid! Haadzihii madrasatunaa, hiya kabiiratun wa jamiilatun", meaning: 'Lihatlah wahai Hamid! Ini sekolah kita, sekolah ini besar dan indah' },
        { speaker: 'حَامِد', speakerRole: 'Hamid', arabic: 'مَا شَاءَ اللّٰهُ! وَأَيْنَ مَكْتَبَةُ المَدْرَسَةِ؟', latin: 'Maa syaa-allaah! Wa aina maktabatul madrasah?', meaning: 'Masya Allah! Dan di manakah perpustakaan sekolah?' },
        { speaker: 'إِلْيَاس', speakerRole: 'Ilyas', arabic: 'المَكْتَبَةُ جَانِبَ مَعْمَلِ اللُّغَةِ، أَمَامَ الفَصْلِ السَّابِعِ', latin: "Al-maktabatu jaaniba ma'malil lughah, amaamal fashlis saabi'", meaning: 'Perpustakaan berada di samping laboratorium bahasa, di depan kelas 7' },
        { speaker: 'حَامِد', speakerRole: 'Hamid', arabic: 'وَهَلْ فِي مَدْرَسَتِنَا مَسْجِدٌ؟', latin: 'Wa hal fii madrasatinaa masjidun?', meaning: 'Dan apakah di sekolah kita ada masjid?' },
        { speaker: 'إِلْيَاس', speakerRole: 'Ilyas', arabic: 'نَعَمْ، المَسْجِدُ وَرَاءَ الإِدَارَةِ، هُوَ مَسْجِدٌ نَظِيفٌ جِدًّا', latin: "Na'am, al-masjidu waraa-al idaarah, huwa masjidun nazhiifun jiddan", meaning: 'Ya, masjid berada di belakang kantor tata usaha, masjid itu sangat bersih' },
      ],
    },
    qiraah: {
      title: 'Teks Bacaan: مَرَافِقُ مَدْرَسَتِي المِثَالِيَّةِ',
      arabicText: 'مَدْرَسَتِي مَدْرَسَةٌ كَبِيرَةٌ فِي شَارِعِ سُودِيرْمَان. فِيهَا فَصْلٌ كَثِيرٌ وَمَكْتَبَةٌ وَاسِعَةٌ. فِي المَكْتَبَةِ كُتُبٌ مُتَنَوِّعَةٌ وَجَرَائِدُ وَمَجَلَّاتٌ. وَأَمَامَ المَدْرَسَةِ مَلْعَبٌ وَاسِعٌ، يَلْعَبُ فِيهِ الطُّلَّابُ كُرَةَ القَدَمِ.',
      indonesianText: 'Sekolahku adalah sekolah yang besar di Jalan Sudirman. Di dalamnya terdapat banyak ruang kelas dan perpustakaan yang luas. Di perpustakaan ada bermacam-macam buku, koran, dan majalah. Dan di depan sekolah ada lapangan luas tempat para siswa bermain sepak bola.',
    },
    quiz: [
      {
        id: 'q2-1',
        question: 'Manakah bentuk kata sifat yang tepat untuk melengkapi: "المَكْتَبَةُ ..."',
        arabicPrompt: 'المَكْتَبَةُ ...',
        options: ['كَبِيرٌ', 'كَبِيرَةٌ', 'نَظِيفٌ', 'جَمِيلٌ'],
        correctIndex: 1,
        explanation: 'Kata "Al-maktabah" adalah muannats (ada ة), sehingga na\'at-nya wajib muannats yaitu كَبِيرَةٌ.',
      },
      {
        id: 'q2-2',
        question: 'Apakah arti dari kata "مَقْصَفٌ" ?',
        options: ['Perpustakaan', 'Kantin', 'Masjid', 'Toilet'],
        correctIndex: 1,
        explanation: 'Maqshafun artinya kantin sekolah tempat makan dan minum siswa.',
      },
      {
        id: 'q2-3',
        question: 'Lengkapilah dengan dharf yang tepat: "المَلْعَبُ ... المَدْرَسَةِ" (Lapangan di depan sekolah)',
        arabicPrompt: 'المَلْعَبُ ... المَدْرَسَةِ',
        options: ['أَمَامَ', 'فَوْقَ', 'فِي', 'عَلَى'],
        correctIndex: 0,
        explanation: 'Kata keterangan yang bermakna "di depan" adalah أَمَامَ (amaama).',
      },
    ],
  },
  {
    id: 'bab-3',
    number: 3,
    titleArabic: 'الأَدَوَاتُ المَدْرَسِيَّةُ',
    titleLatin: 'Al-Adawat Al-Madrasiyyah',
    titleMeaning: 'Peralatan Sekolah & Warna',
    description: 'Mengetahui nama perlengkapan belajar di tas dan kelas, kepemilikan (Dhomir Muttashil -ii, -ka, -ki, -hu, -ha), serta warna benda.',
    badgeColor: 'amber',
    mufrodat: [
      { id: 'm3-1', arabic: 'كِتَابٌ', latin: 'Kitaabun', meaning: 'Buku Pelajaran / Kitab', type: 'isim', gender: 'mudzakkar' },
      { id: 'm3-2', arabic: 'دَفْتَرٌ', latin: 'Daftarun', meaning: 'Buku Tulis / Catatan', type: 'isim', gender: 'mudzakkar' },
      { id: 'm3-3', arabic: 'قَلَمٌ', latin: 'Qalamun', meaning: 'Pena / Pulpen', type: 'isim', gender: 'mudzakkar' },
      { id: 'm3-4', arabic: 'قَلَمُ الرَّصَاصِ', latin: 'Qalamur Rashash', meaning: 'Pensil', type: 'isim', gender: 'mudzakkar' },
      { id: 'm3-5', arabic: 'مِمْحَاةٌ', latin: 'Mimhaatun', meaning: 'Penghapus Pensil (Karet)', type: 'isim', gender: 'muannats' },
      { id: 'm3-6', arabic: 'طَلَّاسَةٌ', latin: 'Thallaasatun', meaning: 'Penghapus Papan Tulis', type: 'isim', gender: 'muannats' },
      { id: 'm3-7', arabic: 'مِسْطَرَةٌ', latin: 'Mistharatun', meaning: 'Penggaris', type: 'isim', gender: 'muannats' },
      { id: 'm3-8', arabic: 'حَقِيبَةٌ', latin: 'Haqiibatun', meaning: 'Tas Sekolah', type: 'isim', gender: 'muannats' },
      { id: 'm3-9', arabic: 'مِقْلَمَةٌ', latin: 'Miqlamatun', meaning: 'Tempat Pensil / Kotak Pensil', type: 'isim', gender: 'muannats' },
      { id: 'm3-10', arabic: 'سَبُّورَةٌ', latin: 'Sabbuuratun', meaning: 'Papan Tulis', type: 'isim', gender: 'muannats' },
      { id: 'm3-11', arabic: 'أَحْمَرُ', latin: 'Ahmaru', meaning: 'Merah (Mudzakkar)', type: 'isim' },
      { id: 'm3-12', arabic: 'أَزْرَقُ', latin: 'Azraqu', meaning: 'Biru (Mudzakkar)', type: 'isim' },
      { id: 'm3-13', arabic: 'أَخْضَرُ', latin: 'Akhdharu', meaning: 'Hijau (Mudzakkar)', type: 'isim' },
      { id: 'm3-14', arabic: 'أَبْيَضُ', latin: 'Abyadhu', meaning: 'Putih (Mudzakkar)', type: 'isim' },
      { id: 'm3-15', arabic: 'أَسْوَدُ', latin: 'Aswadu', meaning: 'Hitam (Mudzakkar)', type: 'isim' },
    ],
    qawaid: {
      title: 'Dhomir Muttashil Lil-Milkiyyah (Kata Ganti Kepemilikan)',
      summary: 'Menggabungkan akhiran kata ganti untuk menyatakan "milikku", "milikmu", atau "miliknya".',
      explanation: `
Rumus penggabungan dhomir kepemilikan pada kata benda (contoh: كِتَابٌ):
- **+ يْ** (Miliku): كِتَابِي (Kitabii - Bukuku)
- **+ كَ** (Milikmu laki-laki): كِتَابُكَ (Kitabuka - Bukumu [lk])
- **+ كِ** (Milikmu perempuan): كِتَابُكِ (Kitabuki - Bukumu [pr])
- **+ هُ** (Miliknya laki-laki): كِتَابُهُ (Kitabuhu - Bukunya [dia lk])
- **+ هَا** (Miliknya perempuan): كِتَابُهَا (Kitabuha - Bukunya [dia pr])

Jika kata bendanya muannats berakhiran ة (contoh: حَقِيبَةٌ), huruf ة berubah menjadi ت biasa saat bersambung:
- حَقِيبَتِي (Tas milikku)
- حَقِيبَتُكَ (Tas milikmu [lk])
      `.trim(),
      examples: [
        { arabic: 'هَذَا قَلَمِي، وَلَوْنُهُ أَزْرَقُ', latin: 'Haadzaa qalamii, wa launuhu azraqu', meaning: 'Ini adalah penaku, dan warnanya biru' },
        { arabic: 'أَيْنَ حَقِيبَتُكِ يَا عَائِشَةُ؟', latin: 'Aina haqiibatuki yaa Aisyah?', meaning: 'Di mana tasmu wahai Aisyah?' },
        { arabic: 'هَذِهِ مِسْطَرَةٌ طَوِيلَةٌ', latin: 'Haadzihii mistharatun thawiilatun', meaning: 'Ini adalah penggaris yang panjang' },
      ],
    },
    hiwar: {
      title: 'Apa yang Ada di Dalam Tas Belajarmu?',
      setting: 'Dua siswa mempersiapkan alat tulis di dalam kelas',
      dialogs: [
        { speaker: 'سَلْمَان', speakerRole: 'Salman', arabic: 'مَاذَا فِي حَقِيبَتِكَ يَا لُقْمَان؟', latin: 'Maadzaa fii haqiibatika yaa Luqman?', meaning: 'Apa yang ada di dalam tasmu wahai Luqman?' },
        { speaker: 'لُقْمَان', speakerRole: 'Luqman', arabic: 'فِي حَقِيبَتِي كِتَابُ اللُّغَةِ العَرَبِيَّةِ وَدَفْتَرٌ وَمِقْلَمَةٌ', latin: "Fii haqiibatii kitaabul lughatil 'arabiyyah wa daftarun wa miqlamatun", meaning: 'Di dalam tasku ada buku bahasa Arab, buku tulis, dan tempat pensil' },
        { speaker: 'سَلْمَان', speakerRole: 'Salman', arabic: 'وَهَلْ مَعَكَ قَلَمٌ زَائِدٌ؟ نَسِيتُ قَلَمِي فِي البَيْتِ!', latin: 'Wa hal ma\'aka qalamun zaa-id? Nasiitu qalamii fil bait!', meaning: 'Dan apakah kamu membawa pulpen cadangan? Saya lupa penaku tertinggal di rumah!' },
        { speaker: 'لُقْمَان', speakerRole: 'Luqman', arabic: 'نَعَمْ، تَفَضَّلْ هَذَا قَلَمِي الأَسْوَد، خُذْهُ!', latin: 'Na\'am, tafaddhal haadzaa qalamil aswad, khudz-hu!', meaning: 'Ya, silakan ini pulpen hitamku, ambillah!' },
        { speaker: 'سَلْمَان', speakerRole: 'Salman', arabic: 'شُكْرًا جَزِيلًا يَا أَخِي الكَرِيم!', latin: 'Syukran jaziilan yaa akhil kariim!', meaning: 'Terima kasih banyak wahai saudaraku yang mulia!' },
      ],
    },
    qiraah: {
      title: 'Teks Bacaan: أَدَوَاتِي فِي المَدْرَسَةِ',
      arabicText: 'أَنَا يُوسُف. كُلَّ صَبَاحٍ أَحْمِلُ حَقِيبَتِي إِلَى المَدْرَسَةِ. حَقِيبَتِي لَوْنُهَا أَخْضَر. فِيهَا أَدَوَاتٌ مَدْرَسِيَّةٌ كَثِيرَةٌ: فِيهَا كُتُبٌ وَدَفَاتِرُ وَأَقْلَامٌ وَمِسْطَرَةٌ وَمِمْحَاةٌ. أُحَافِظُ عَلَى أَدَوَاتِي دَائِمًا.',
      indonesianText: 'Saya Yusuf. Setiap pagi saya membawa tasku ke sekolah. Tasku berwarna hijau. Di dalamnya ada banyak peralatan sekolah: ada buku pelajaran, buku catatan, pulpen-pulpen, penggaris, dan penghapus. Saya selalu menjaga peralatanku.',
    },
    quiz: [
      {
        id: 'q3-1',
        question: 'Bagaimanakah bentuk kata untuk menyatakan "Bukunya (dia perempuan)" dalam bahasa Arab?',
        arabicPrompt: 'Buku milik dia (perempuan)',
        options: ['كِتَابُهُ', 'كِتَابُهَا', 'كِتَابُكَ', 'كِتَابِي'],
        correctIndex: 1,
        explanation: 'Kata ganti kepemilikan untuk dia perempuan adalah akhiran -haa (هَا), jadi كِتَابُهَا.',
      },
      {
        id: 'q3-2',
        question: 'Benda apakah yang disebut dengan "مِمْحَاةٌ" ?',
        options: ['Pena', 'Penggaris', 'Penghapus karet', 'Rautan pensil'],
        correctIndex: 2,
        explanation: 'Mimhaatun adalah penghapus pensil/karet, sedangkan thallaasatun adalah penghapus papan tulis.',
      },
      {
        id: 'q3-3',
        question: 'Warna apakah "أَزْرَقُ" dalam bahasa Indonesia?',
        options: ['Merah', 'Hijau', 'Kuning', 'Biru'],
        correctIndex: 3,
        explanation: 'Azraqu artinya warna biru.',
      },
    ],
  },
  {
    id: 'bab-4',
    number: 4,
    titleArabic: 'العُنْوَانُ وَالأَرْقَامُ',
    titleLatin: "Al-'Unwan wal Arqam",
    titleMeaning: 'Alamat & Angka 1-100',
    description: 'Menanyakan dan menyebutkan alamat tempat tinggal, nomor telepon, serta menghafal bilangan angka 1 sampai 100.',
    badgeColor: 'violet',
    mufrodat: [
      { id: 'm4-1', arabic: 'عُنْوَانٌ', latin: "'Unwaanun", meaning: 'Alamat', type: 'isim' },
      { id: 'm4-2', arabic: 'شَارِعٌ', latin: 'Syaari\'un', meaning: 'Jalan', type: 'isim' },
      { id: 'm4-3', arabic: 'رَقْمٌ', latin: 'Raqmun', meaning: 'Nomor', type: 'isim' },
      { id: 'm4-4', arabic: 'مَدِينَةٌ', latin: 'Madiinatun', meaning: 'Kota', type: 'isim' },
      { id: 'm4-5', arabic: 'قَرْيَةٌ', latin: 'Qaryatun', meaning: 'Desa', type: 'isim' },
      { id: 'm4-6', arabic: 'هَاتِفٌ / جَوَّالٌ', latin: 'Haatifun / Jawwaalun', meaning: 'Telepon / Handphone', type: 'isim' },
      { id: 'm4-7', arabic: 'قَرِيبٌ مِنْ', latin: 'Qariibun min', meaning: 'Dekat dari', type: 'harf' },
      { id: 'm4-8', arabic: 'بَعِيدٌ عَنْ', latin: "Ba'iidun 'an", meaning: 'Jauh dari', type: 'harf' },
      { id: 'm4-9', arabic: 'وَاحِدٌ (١)', latin: 'Waahidun', meaning: 'Satu (1)', type: 'isim' },
      { id: 'm4-10', arabic: 'اِثْنَانِ (٢)', latin: 'Itsnaani', meaning: 'Dua (2)', type: 'isim' },
      { id: 'm4-11', arabic: 'ثَلَاثَةٌ (٣)', latin: 'Tsalaatsatun', meaning: 'Tiga (3)', type: 'isim' },
      { id: 'm4-12', arabic: 'أَرْبَعَةٌ (٤)', latin: "Arba'atun", meaning: 'Empat (4)', type: 'isim' },
      { id: 'm4-13', arabic: 'خَمْسَةٌ (٥)', latin: 'Khamsatun', meaning: 'Lima (5)', type: 'isim' },
      { id: 'm4-14', arabic: 'عَشَرَةٌ (١٠)', latin: "'Asyaratun", meaning: 'Sepuluh (10)', type: 'isim' },
      { id: 'm4-15', arabic: 'عِشْرُونَ (٢٠)', latin: "'Isyruuna", meaning: 'Dua puluh (20)', type: 'isim' },
      { id: 'm4-16', arabic: 'مِائَةٌ (١٠٠)', latin: 'Mi-atun', meaning: 'Seratus (100)', type: 'isim' },
    ],
    qawaid: {
      title: "Pola Kalimat Tanya Alamat & Angka (الأَرْقَامُ)",
      summary: "Menggunakan kata tanya مَا dan كَمْ untuk menanyakan nomor serta urutan angka.",
      explanation: `
1. **Cara Menanyakan Alamat:**
- مَا عُنْوَانُكَ؟ (*Maa 'unwaanuka?* - Apa alamatmu? [lk])
- مَا عُنْوَانُكِ؟ (*Maa 'unwaanuki?* - Apa alamatmu? [pr])
- Jawaban: عُنْوَانِي فِي شَارِعِ ... رَقْمُ ... (*Alamatku di jalan ... nomor ...*)

2. **Cara Menanyakan Nomor Telepon:**
- كَمْ رَقْمُ هَاتِفِكَ؟ (*Kam raqmu haatifika?* - Berapa nomor teleponmu?)
- Jawaban: رَقْمُ هَاتِفِي هُوَ: ٠٨١٢٣٤٥٦٧٨٩ (Sebutkan angka satu persatu: shifr, tsamaniyah, wahid, itsnan...)
      `.trim(),
      examples: [
        { arabic: 'عُنْوَانِي فِي شَارِعِ أَحْمَد دَحْلَان رَقْمُ ٧', latin: 'Unwaanii fii syaari\' Ahmad Dahlan raqmu sab\'ah', meaning: 'Alamatku di Jalan Ahmad Dahlan nomor 7' },
        { arabic: 'بَيْتِي قَرِيبٌ مِنَ المَدْرَسَةِ', latin: 'Baitii qariibun minal madrasah', meaning: 'Rumahku dekat dari sekolah' },
      ],
    },
    hiwar: {
      title: 'Tanya Jawab Alamat Rumah',
      setting: 'Dua sahabat mengisi formulir pendaftaran anggota perpustakaan',
      dialogs: [
        { speaker: 'طَارِق', speakerRole: 'Thariq', arabic: 'مَا عُنْوَانُ بَيْتِكَ يَا رَشِيد؟', latin: 'Maa \'unwaanu baitika yaa Rasyiid?', meaning: 'Apa alamat rumahmu wahai Rasyid?' },
        { speaker: 'رَشِيد', speakerRole: 'Rasyid', arabic: 'عُنْوَانُ بَيْتِي فِي شَارِعِ حَمْزَة رَقْمُ ١٥', latin: 'Unwaanu baitii fii syaari\' Hamzah raqmu khamsata \'asyar', meaning: 'Alamat rumahku di Jalan Hamzah nomor 15' },
        { speaker: 'طَارِق', speakerRole: 'Thariq', arabic: 'هَلْ بَيْتُكَ بَعِيدٌ عَنِ المَدْرَسَةِ؟', latin: 'Hal baituka ba\'iidun \'anil madrasah?', meaning: 'Apakah rumahmu jauh dari sekolah?' },
        { speaker: 'رَشِيد', speakerRole: 'Rasyid', arabic: 'لَا، بَيْتِي قَرِيبٌ جِدًّا، أَمْشِي عَلَى الأَقْدَامِ كُلَّ يَوْمٍ', latin: 'Laa, baitii qariibun jiddan, amsyii \'alal aqdaam kulla yaum', meaning: 'Tidak, rumahku sangat dekat, aku berjalan kaki setiap hari' },
      ],
    },
    qiraah: {
      title: 'Teks Bacaan: عُنْوَانُ المَدْرَسَةِ وَالبَيْتِ',
      arabicText: 'هَذِهِ بِطَاقَةُ الشَّخْصِيَّةِ لِلطَّالِبِ رِضْوَان. هُوَ يَدْرُسُ فِي المَدْرَسَةِ الثَّانَوِيَّةِ الإِسْلَامِيَّةِ الحُكُومِيَّةِ ١. عُنْوَانُ مَدْرَسَتِهِ فِي شَارِعِ إِمَام بُونْجُول رَقْمُ ٢٥. وَعُنْوَانُ بَيْتِهِ فِي شَارِعِ مَاوَار رَقْمُ ٨. رَقْمُ جَوَّالِهِ: ٠٨٥٧١٢٣٤٥٦٧.',
      indonesianText: 'Ini adalah kartu identitas siswa bernama Ridwan. Dia belajar di Madrasah Tsanawiyah Negeri 1. Alamat sekolahnya di Jalan Imam Bonjol nomor 25. Dan alamat rumahnya di Jalan Mawar nomor 8. Nomor handphone-nya: 08571234567.',
    },
    quiz: [
      {
        id: 'q4-1',
        question: 'Kalimat tanya yang tepat untuk menanyakan alamat adalah...',
        options: ['كَمْ سَاعَةً؟', 'مَا عُنْوَانُكَ؟', 'مِنْ أَيْنَ أَنْتَ؟', 'مَا اسْمُكَ؟'],
        correctIndex: 1,
        explanation: 'Maa \'unwaanuka bermakna "Apa alamatmu?".',
      },
      {
        id: 'q4-2',
        question: 'Angka ٥ dalam angka latin adalah...',
        options: ['3', '5', '8', '0'],
        correctIndex: 1,
        explanation: '٥ adalah lambang angka 5 (khamsah) dalam aksara Arab.',
      },
      {
        id: 'q4-3',
        question: 'Lawan kata dari "قَرِيبٌ مِنْ" (dekat dari) adalah...',
        options: ['كَبِيرٌ', 'جَمِيلٌ', 'بَعِيدٌ عَنْ', 'نَظِيفٌ'],
        correctIndex: 2,
        explanation: 'Lawan kata dekat (qarib) adalah jauh (ba\'id \'an).',
      },
    ],
  },
  {
    id: 'bab-5',
    number: 5,
    titleArabic: 'البَيْتُ',
    titleLatin: 'Al-Bait',
    titleMeaning: 'Rumah & Bagian-bagiannya',
    description: 'Mengetahui nama-nama ruangan di dalam rumah, perabot rumah tangga, serta kaidah Khobar Muqaddam dan Mubtada Muakhkhar.',
    badgeColor: 'rose',
    mufrodat: [
      { id: 'm5-1', arabic: 'بَيْتٌ', latin: 'Baitun', meaning: 'Rumah', type: 'isim' },
      { id: 'm5-2', arabic: 'غُرْفَةُ الجُلُوسِ', latin: 'Ghurfatul Juluus', meaning: 'Ruang Tamu', type: 'isim' },
      { id: 'm5-3', arabic: 'غُرْفَةُ النَّوْمِ', latin: 'Ghurfatun Naum', meaning: 'Kamar Tidur', type: 'isim' },
      { id: 'm5-4', arabic: 'غُرْفَةُ المُذَاكَرَةِ', latin: 'Ghurfatul Mudzaakarah', meaning: 'Ruang Belajar', type: 'isim' },
      { id: 'm5-5', arabic: 'غُرْفَةُ الأَكْلِ', latin: 'Ghurfatul Akl', meaning: 'Ruang Makan', type: 'isim' },
      { id: 'm5-6', arabic: 'مَطْبَخٌ', latin: 'Mathbakhun', meaning: 'Dapur', type: 'isim' },
      { id: 'm5-7', arabic: 'حَمَّامٌ', latin: 'Hammaamun', meaning: 'Kamar Mandi', type: 'isim' },
      { id: 'm5-8', arabic: 'حَدِيقَةٌ', latin: 'Hadiiqatun', meaning: 'Taman / Kebun Rumah', type: 'isim' },
      { id: 'm5-9', arabic: 'سَرِيرٌ', latin: 'Sariirun', meaning: 'Ranjang / Tempat Tidur', type: 'isim' },
      { id: 'm5-10', arabic: 'مِنْضَدَةٌ', latin: 'Mindhadatun', meaning: 'Meja Kecil', type: 'isim' },
      { id: 'm5-11', arabic: 'خِزَانَةٌ', latin: 'Khizaanatun', meaning: 'Lemari', type: 'isim' },
      { id: 'm5-12', arabic: 'تِلْفَازٌ', latin: 'Tilfaazun', meaning: 'Televisi', type: 'isim' },
    ],
    qawaid: {
      title: "Khobar Muqaddam + Mubtada' Mu'akhkhar",
      summary: "Menyusun kalimat yang diawali dengan keterangan tempat (فِي البَيْتِ) diikuti subjek (غُرْفَةٌ كَبِيرَةٌ).",
      explanation: `
Dalam kaidah bahasa Arab, biasanya kalimat nominal dimulai dengan Mubtada' (subjek) lalu Khobar (predikat).
Namun, jika Khobarnya berupa frasa keterangan tempat/huruf jar (disebut **Syibhul Jumlah**), maka susunannya didahulukan (**Khobar Muqaddam**) dan kata bendanya diakhirkan (**Mubtada' Mu'akhkhar**):
- **فِي البَيْتِ غُرْفَةُ الجُلُوسِ** (Di dalam rumah ada ruang tamu)
- **فِي غُرْفَةِ النَّوْمِ سَرِيرٌ وَخِزَانَةٌ** (Di dalam kamar tidur ada ranjang dan lemari)
- **عَلَى المِنْضَدَةِ مِصْبَاحٌ** (Di atas meja ada lampu)
      `.trim(),
      examples: [
        { arabic: 'فِي الحَدِيقَةِ أَزْهَارٌ جَمِيلَةٌ', latin: 'Fil hadiiqati azhaarun jamiilatun', meaning: 'Di taman ada bunga-bunga yang indah' },
        { arabic: 'فِي المَطْبَخِ أُمِّي تَطْبُخُ الطَّعَامَ', latin: 'Fil mathbakhi ummii tathbukhuth tha\'aam', meaning: 'Di dapur ibuku memasak makanan' },
      ],
    },
    hiwar: {
      title: 'Berkunjung ke Rumah Teman',
      setting: 'Tamu masuk ke dalam rumah yang asri',
      dialogs: [
        { speaker: 'زَيْد', speakerRole: 'Zaid', arabic: 'تَفَضَّلْ يَا يُونُس، أَهْلًا وَسَهْلًا فِي بَيْتِي!', latin: 'Tafaddhal yaa Yuunus, ahlan wa sahlan fii baitii!', meaning: 'Silakan masuk wahai Yunus, selamat datang di rumahku!' },
        { speaker: 'يُونُس', speakerRole: 'Yunus', arabic: 'بَيْتُكَ جَمِيلٌ وَمُرَتَّبٌ يَا زَيْد! مَا شَاءَ اللّٰهُ', latin: 'Baituka jamiilun wa murattabun yaa Zaid! Maa syaa-allaah', meaning: 'Rumahmu indah dan rapi wahai Zaid! Masya Allah' },
        { speaker: 'زَيْد', speakerRole: 'Zaid', arabic: 'شُكْرًا لَكَ. هَيَّا نَجْلِسْ فِي غُرْفَةِ الجُلُوسِ', latin: 'Syukran laka. Hayyaa najlis fii ghurfatil juluus', meaning: 'Terima kasih. Mari kita duduk di ruang tamu' },
        { speaker: 'يُونُس', speakerRole: 'Yunus', arabic: 'مَاذَا فِي تِلْكَ الغُرْفَةِ هُنَاكَ؟', latin: 'Maadzaa fii tilkal ghurfati hunaak?', meaning: 'Apa yang ada di ruangan sebelah sana itu?' },
        { speaker: 'زَيْد', speakerRole: 'Zaid', arabic: 'تِلْكَ غُرْفَةُ المُذَاكَرَةِ، أَدْرُسُ فِيهَا دُرُوسِي كُلَّ لَيْلَةٍ', latin: 'Tilka ghurfatul mudzaakarah, adrusu fiihaa duruusii kulla lailah', meaning: 'Itu adalah ruang belajar, aku mempelajari pelajaran-pelajaranku di sana setiap malam' },
      ],
    },
    qiraah: {
      title: 'Teks Bacaan: بَيْتِي جَنَّتِي',
      arabicText: 'بَيْتِي صَغِيرٌ وَلَكِنَّهُ نَظِيفٌ وَمُرِيحٌ. فِيهِ غُرْفَةُ جُلُوسٍ، وَغُرْفَتَانِ لِلنَّوْمِ، وَمَطْبَخٌ، وَحَمَّامٌ. وَخَلْفَ البَيْتِ حَدِيقَةٌ فِيهَا أَشْجَارٌ مُثْمِرَةٌ. نَحْنُ نَعِيشُ فِيهِ سُعَدَاءَ.',
      indonesianText: 'Rumahku kecil tapi bersih dan nyaman. Di dalamnya ada ruang tamu, dua kamar tidur, dapur, dan kamar mandi. Di belakang rumah ada kebun yang ada pohon-pohon berbuah. Kami sekeluarga hidup bahagia di dalamnya.',
    },
    quiz: [
      {
        id: 'q5-1',
        question: 'Apakah arti bahasa Arab dari "Ruang Belajar"?',
        options: ['غُرْفَةُ النَّوْمِ', 'غُرْفَةُ الجُلُوسِ', 'غُرْفَةُ المُذَاكَرَةِ', 'المَطْبَخُ'],
        correctIndex: 2,
        explanation: 'Ghurfatul mudzakarah secara harfiah adalah ruang mengulang pelajaran/ruang belajar.',
      },
      {
        id: 'q5-2',
        question: 'Susunan kalimat "فِي البَيْتِ غُرْفَةٌ كَبِيرَةٌ" merupakan contoh penerapan kaidah...',
        options: ['Fi\'il dan Fa\'il', 'Khobar Muqaddam & Mubtada\' Mu\'akhkhar', 'Na\'at Hakiki', 'Dhomir Munfashil'],
        correctIndex: 1,
        explanation: 'Predikat berupa syibhul jumlah (فِي البَيْتِ) didahulukan dinamakan Khobar Muqaddam.',
      },
    ],
  },
  {
    id: 'bab-6',
    number: 6,
    titleArabic: 'مِنْ يَوْمِيَّاتِ الأُسْرَةِ',
    titleLatin: 'Min Yaumiyyatil Usrah',
    titleMeaning: 'Keseharian Keluarga & Kegiatan Harian',
    description: 'Menceritakan rutinitas harian di rumah sejak bangun tidur, shalat berjamaah, belajar, dan pengantar Fiil Mudhari.',
    badgeColor: 'teal',
    mufrodat: [
      { id: 'm6-1', arabic: 'يَسْتَيْقِظُ', latin: 'Yastaiqidzu', meaning: 'Dia (lk) Bangun Tidur', type: 'fiil' },
      { id: 'm6-2', arabic: 'يُصَلِّي', latin: 'Yushallii', meaning: 'Dia (lk) Shalat', type: 'fiil' },
      { id: 'm6-3', arabic: 'يَتَنَاوَلُ الفُطُورَ', latin: 'Yatanawalul Futhuur', meaning: 'Sarapan Pagi', type: 'fiil' },
      { id: 'm6-4', arabic: 'يَذْهَبُ', latin: 'Yadzhabu', meaning: 'Dia (lk) Pergi', type: 'fiil' },
      { id: 'm6-5', arabic: 'يَقْرَأُ القُرْآنَ', latin: "Yaqra'ul Qur'an", meaning: 'Membaca Al-Qur\'an', type: 'fiil' },
      { id: 'm6-6', arabic: 'يُسَاعِدُ', latin: "Yusaa'idu", meaning: 'Membantu / Menolong', type: 'fiil' },
      { id: 'm6-7', arabic: 'يَكْتُبُ الوَاجِبَ المَنْزِلِيَّ', latin: 'Yaktubul Waajib', meaning: 'Mengerjakan PR / Tugas Rumah', type: 'fiil' },
      { id: 'm6-8', arabic: 'يَنَامُ', latin: 'Yanaamu', meaning: 'Dia (lk) Tidur', type: 'fiil' },
      { id: 'm6-9', arabic: 'أَبٌ / وَالِدٌ', latin: 'Abun / Waalidun', meaning: 'Ayah', type: 'isim' },
      { id: 'm6-10', arabic: 'أُمٌّ / وَالِدَةٌ', latin: 'Ummun / Waalidatun', meaning: 'Ibu', type: 'isim' },
      { id: 'm6-11', arabic: 'أَخٌ كَبِيرٌ', latin: 'Akhun Kabiirun', meaning: 'Kakak Laki-laki', type: 'isim' },
      { id: 'm6-12', arabic: 'أُخْتٌ صَغِيرَةٌ', latin: 'Ukhtun Shaghiiratun', meaning: 'Adik Perempuan', type: 'isim' },
    ],
    qawaid: {
      title: "Pengantar Fi'il Mudhari' Sederhana Berdasarkan Pelaku",
      summary: "Memperhatikan perubahan huruf awalan pada kata kerja masa kini/rutinitas (Fi'il Mudhari').",
      explanation: `
Huruf awalan Fi'il Mudhari' berubah tergantung siapa pelakunya:
1. **هُوَ** (Dia laki-laki): berawalan **يَـ** (يَذْهَبُ - Dia pergi)
2. **هِيَ** (Dia perempuan): berawalan **تَـ** (تَذْهَبُ - Dia perempuan pergi)
3. **أَنْتَ** (Kamu laki-laki): berawalan **تَـ** (تَذْهَبُ - Kamu pergi)
4. **أَنْتِ** (Kamu perempuan): berawalan **تَـ** dan berakhiran **ـِينَ** (تَذْهَبِينَ)
5. **أَنَا** (Saya): berawalan **أَ** (أَذْهَبُ - Saya pergi)
6. **نَحْنُ** (Kami/Kita): berawalan **نَـ** (نَذْهَبُ - Kami pergi)
      `.trim(),
      examples: [
        { arabic: 'أَنَا أَسْتَيْقِظُ فِي السَّاعَةِ الرَّابِعَةِ صَبَاحًا', latin: 'Ana astaiqidzu fiis saa\'atir raabi\'ati shabaahan', meaning: 'Saya bangun pada jam empat pagi' },
        { arabic: 'أُمِّي تُعِدُّ الفُطُورَ فِي المَطْبَخِ', latin: 'Ummii tu\'iddul futhuur fil mathbakh', meaning: 'Ibuku menyiapkan sarapan di dapur' },
        { arabic: 'نَحْنُ نُصَلِّي الصُّبْحَ جَمَاعَةً فِي المَسْجِدِ', latin: 'Nahnu nushallish shubha jamaa\'atan fil masjid', meaning: 'Kami shalat subuh berjamaah di masjid' },
      ],
    },
    hiwar: {
      title: 'Kegiatan di Pagi Hari Sebelum ke Madrasah',
      setting: 'Percakapan keluarga sebelum berangkat sekolah',
      dialogs: [
        { speaker: 'الأَب', speakerRole: 'Ayah', arabic: 'مَاذَا تَفْعَلُ بَعْدَ صَلَاةِ الصُّبْحِ يَا بُنَيَّ؟', latin: 'Maadzaa taf\'alu ba\'da shalaatish shubhi yaa bunayya?', meaning: 'Apa yang kamu lakukan setelah shalat subuh wahai putraku?' },
        { speaker: 'حَسَن', speakerRole: 'Hasan', arabic: 'أَقْرَأُ القُرْآنَ الكَرِيمَ ثُمَّ أُرَتِّبُ غُرْفَتِي يَا أَبِي', latin: 'Aqra\'ul qur-aanal kariim tsumma urattibu ghurfatii yaa abii', meaning: 'Aku membaca Al-Qur\'an kemudian merapikan kamarku wahai ayah' },
        { speaker: 'الأُمّ', speakerRole: 'Ibu', arabic: 'هَيَّا يَا حَسَن، تَنَاوَلِ الفُطُورَ مَعَنَا!', latin: 'Hayyaa yaa Hasan, tanaawalil futhuura ma\'anaa!', meaning: 'Ayo Hasan, santaplah sarapan bersama kami!' },
        { speaker: 'حَسَن', speakerRole: 'Hasan', arabic: 'حَاضِرٌ يَا أُمِّي، بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ', latin: 'Haadhirun yaa ummii, bismillaahir rahmaanir rahiim', meaning: 'Baik wahai ibu, bismillahir rahmaanir rahiim' },
      ],
    },
    qiraah: {
      title: 'Teks Bacaan: يَوْمِيَّاتُ طَالِبٍ نَشِيطٍ',
      arabicText: 'كُلَّ يَوْمٍ أَسْتَيْقِظُ مُبَكِّرًا. أَتَوَضَّأُ وَأُصَلِّي الصُّبْحَ فِي المَسْجِدِ. فِي السَّاعَةِ السَّادِسَةِ أَتَنَاوَلُ الفُطُورَ الشَّهِيَّ مَعَ أُسْرَتِي. فِي السَّاعَةِ السَّادِسَةِ وَالنِّصْفِ أَذْهَبُ إِلَى المَدْرَسَةِ بِالدَّرَّاجَةِ. أَنَا أُحِبُّ أُسْرَتِي وَمَدْرَسَتِي كَثِيرًا.',
      indonesianText: 'Setiap hari saya bangun pagi-pagi. Saya berwudhu dan shalat subuh di masjid. Pada jam enam saya sarapan lezat bersama keluargaku. Pada jam enam tiga puluh saya pergi ke sekolah mengendarai sepeda. Saya sangat mencintai keluarga dan sekolahku.',
    },
    quiz: [
      {
        id: 'q6-1',
        question: 'Apakah awalan huruf fi\'il mudhari untuk subjek "أَنَا" (Saya)?',
        options: ['يَـ', 'تَـ', 'أَ', 'نَـ'],
        correctIndex: 2,
        explanation: 'Awalan fi\'il mudhari untuk Saya (أَنَا) adalah hamzah/alif (أَ), contohnya أَكْتُبُ (saya menulis).',
      },
      {
        id: 'q6-2',
        question: 'Apakah makna dari "يَتَنَاوَلُ الفُطُورَ" ?',
        options: ['Makan siang', 'Makan malam', 'Sarapan pagi', 'Minum teh'],
        correctIndex: 2,
        explanation: 'Al-Futhuur adalah sarapan pagi.',
      },
    ],
  },
];
