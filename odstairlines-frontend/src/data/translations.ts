export type Language = 'ar' | 'en' | 'id';

export interface TranslationData {
  // Navigation
  nav: {
    home: string;
    about: string;
    services: string;
    booking: string;
    contact: string;
  };
  // Hero section
  hero: {
    label: string;
    headlinePre: string;
    headlineHighlight: string;
    headlinePost: string;
    headlineLine1End?: string;
    headlineLine2?: string;
    intro: string;
    actionExplore: string;
    actionNews: string;
  };
  // Introduction Section
  introSection: {
    label: string;
    title: string;
    titleLine1?: string;
    titleLine2?: string;
    description: string;
    descLine1?: string;
    descLine2?: string;
    quote: string;
  };
  // Key Features
  features: {
    label: string;
    title: string;
    subtitle: string;
    cards: {
      number: string;
      title: string;
      desc: string;
    }[];
  };
  // Hajj & Umrah
  pilgrimage: {
    label: string;
    title: string;
    titleLine1?: string;
    titleLine2?: string;
    description: string;
    badge: string;
  };
  // Countdown
  countdown: {
    label: string;
    title: string;
    description: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
  // Booking info teaser
  bookingTeaser: {
    label: string;
    title: string;
    titleLine1?: string;
    titleLine2?: string;
    description: string;
    descLine1?: string;
    descLine2?: string;
    items: string[];
    action: string;
  };
  // Social
  social: {
    label: string;
    title: string;
    description: string;
  };
  // Partnership
  partnership: {
    label: string;
    title: string;
    titleLine1?: string;
    titleLine2?: string;
    description: string;
  };
  // Closing
  closing: {
    label: string;
    statement: string;
    statementLine1?: string;
    statementLine2?: string;
    action: string;
  };
  // Footer
  footer: {
    aboutLine1?: string;
    aboutLine2?: string;
    aboutText: string;
    availability: string;
    contactTitle: string;
    journeyTitle: string;
    companyTitle: string;
    rights: string;
    companyLinks: { label: string; href: string }[];
    journeyLinks: { label: string; href: string }[];
    contactLinks: { label: string; href: string }[];
  };
  // Newsletter / Alert Modal
  modal: {
    badge: string;
    title: string;
    description: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    submit: string;
    successTitle: string;
    successDesc: string;
    toastTitle: string;
    toastDesc: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationData> = {
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'عن أوديست',
      services: 'خدماتنا',
      booking: 'معلومات الحجز',
      contact: 'تواصل معنا',
    },
    hero: {
      label: 'قريباً في الأجواء',
      headlinePre: 'رحلة ',
      headlineHighlight: 'جديدة',
      headlinePost: ' بين إندونيسيا والمملكة العربية السعودية',
      headlineLine1End: ' بين إندونيسيا والمملكة',
      headlineLine2: 'العربية السعودية',
      intro: 'أوديست إيرلاينز إندو — رؤية طيران حديثة تقرّب المسافات، مع عناية خاصة برحلات الحج والعمرة.',
      actionExplore: 'اكتشف رؤيتنا',
      actionNews: 'تابع أخبار الإطلاق',
    },
    introSection: {
      label: 'مرحباً بكم على متن رؤيتنا',
      title: 'نقّرب المسافات. ونحترم معنى الرحلة.',
      titleLine1: 'نقّرب المسافات. ونحترم معنى',
      titleLine2: 'الرحلة.',
      description: 'تنطلق أوديست إيرلاينز إندو من رابط إنساني وثقافي يجمع إندونيسيا بالمملكة العربية السعودية. نعمل على تقديم تجربة سفر واضحة، عصرية، ومصممة بعناية منذ أول خطوة وحتى الوصول.',
      descLine1: 'تنطلق أوديست إيرلاينز إندو من رابط إنساني وثقافي يجمع إندونيسيا بالمملكة العربية السعودية.',
      descLine2: 'نعمل على تقديم تجربة سفر واضحة، عصرية، ومصممة بعناية منذ أول خطوة وحتى الوصول.',
      quote: 'رحلة أكثر سلاسة، واهتمام يرافقكم في كل مرحلة.',
    },
    features: {
      label: 'ما الذي نعدّ له',
      title: 'أساس رحلة حديثة',
      subtitle: 'ثلاثة محاور تشكّل ملامح تجربة أوديست القادمة.',
      cards: [
        {
          number: '01',
          title: 'أسعار وباقات',
          desc: 'خيارات وباقات سيُعلن عن تفاصيلها مع اقتراب موعد الإطلاق.',
        },
        {
          number: '02',
          title: 'مسارات تربطنا',
          desc: 'رؤية تركّز على الصلة بين إندونيسيا والمملكة العربية السعودية.',
        },
        {
          number: '03',
          title: 'أسطول حديث',
          desc: 'تجربة مقصورة معاصرة ونهج يهتم بالراحة والبساطة.',
        },
      ],
    },
    pilgrimage: {
      label: 'رحلات ذات معنى',
      title: 'الحج والعمرة في صميم رؤيتنا',
      titleLine1: 'الحج والعمرة في صميم',
      titleLine2: 'رؤيتنا',
      description: 'نفهم أن رحلة الحج أو العمرة تبدأ بالنية قبل الإقلاع، لذلك نضع احتياجات ضيوف الرحمن ضمن أولويات تصورنا للخدمة، بما يحفظ خصوصية الرحلة ويقرّب المسافة بين إندونيسيا والمملكة.',
      badge: 'عناية بالرحلة الروحانية',
    },
    countdown: {
      label: 'استعدوا للإقلاع',
      title: 'العدّ التنازلي يبدأ هنا',
      description: 'موعد الإطلاق وتفاصيله سيُعلن عنها قريباً عبر قنوات أوديست الرسمية.',
      days: 'يوم',
      hours: 'ساعة',
      minutes: 'دقيقة',
      seconds: 'ثانية',
    },
    bookingTeaser: {
      label: 'معلومات الحجز',
      title: 'كل ما تحتاجونه، في مكان واحد — قريباً',
      titleLine1: 'كل ما تحتاجونه، في مكان',
      titleLine2: 'واحد — قريباً',
      description: 'نعمل على إعداد معلومات واضحة تساعدكم على التخطيط لرحلتكم بثقة. ستتوفر التفاصيل عند الإعلان الرسمي عن الإطلاق.',
      descLine1: 'نعمل على إعداد معلومات واضحة تساعدكم على التخطيط لرحلتكم بثقة. ستتوفر التفاصيل عند',
      descLine2: 'الإعلان الرسمي عن الإطلاق.',
      items: ['آلية الحجز', 'الأسعار والباقات', 'إرشادات الرحلة'],
      action: 'تفاصيل الحجز قريباً',
    },
    social: {
      label: 'ابقوا بالقرب',
      title: 'حلّقوا معنا من الآن',
      description: 'تابعوا قنواتنا الرسمية لمعرفة أخبار الإطلاق، المستجدات، وقصص الرحلة.',
    },
    partnership: {
      label: 'شراكة محلية موثوقة',
      title: 'بالشراكة مع مجموعة منازل المختارة',
      titleLine1: 'بالشراكة مع مجموعة منازل',
      titleLine2: 'المختارة',
      description: 'تجمع هذه الشراكة فهماً محلياً للعناية بالضيوف مع رؤية أوديست لرحلة تربط إندونيسيا بالمملكة العربية السعودية.',
    },
    closing: {
      label: 'وجهتنا تبدأ بكم',
      statement: 'من إندونيسيا إلى المملكة — رحلة تبدأ بالنية وتصل بالعناية.',
      statementLine1: 'من إندونيسيا إلى المملكة — رحلة',
      statementLine2: 'تبدأ بالنية وتصل بالعناية.',
      action: 'كونوا أول من يعرف',
    },
    footer: {
      aboutLine1: 'أوديست إيرلاينز اندونيسيا رؤية طيران حديثة تربط بين',
      aboutLine2: 'إندونيسيا والمملكة العربية السعودية.',
      aboutText: 'أوديست إيرلاينز اندونيسيا رؤية طيران حديثة تربط بين إندونيسيا والمملكة العربية السعودية.',
      availability: 'تفاصيل التواصل والتشغيل ستُعلن قريباً.',
      companyTitle: 'أوديست',
      journeyTitle: 'الرحلة',
      contactTitle: 'تواصل',
      rights: '© ODST AIRLINES INDONESIA — جميع الحقوق محفوظة.',
      companyLinks: [
        { label: 'عن أوديست', href: 'https://odst.id' },
        { label: 'رؤيتنا', href: 'about' },
        { label: 'الشراكة', href: 'partnership' },
      ],
      journeyLinks: [
        { label: 'خدماتنا', href: 'services' },
        { label: 'الحج والعمرة', href: 'hajj-umrah' },
        { label: 'معلومات الحجز', href: 'booking-info' },
      ],
      contactLinks: [
        { label: 'إنستغرام', href: 'https://www.instagram.com/odst.group/' },
        { label: 'إكس', href: 'https://x.com' },
        { label: 'فيسبوك', href: 'https://www.facebook.com/ODSTAirlines/' },
      ],
    },
    modal: {
      badge: 'تنبيهات الإطلاق',
      title: 'كونوا أول من يعرف موعد الإطلاق',
      description: 'سجّلوا بريدكم الإلكتروني للحصول على إشعار فوري عند فتح باب الحجوزات والأسعار التنافسية.',
      nameLabel: 'الاسم الكامل',
      namePlaceholder: 'الاسم الكريم',
      emailLabel: 'البريد الإلكتروني',
      emailPlaceholder: 'name@example.com',
      submit: 'إشعار عند الإطلاق',
      successTitle: 'أهلاً بكم في رحلتنا',
      successDesc: 'تم تسجيل بريدكم بنجاح. سنوافيكم بجدول الرحلات وتفاصيل الإطلاق قريباً.',
      toastTitle: 'تم التسجيل بنجاح',
      toastDesc: 'شكراً لكم، ستكونون أول من يعلم بجدول الإطلاق وحجوزات التذاكر.',
    },
  },

  en: {
    nav: {
      home: 'Home',
      about: 'About ODST',
      services: 'Services',
      booking: 'Booking Info',
      contact: 'Contact Us',
    },
    hero: {
      label: 'Coming Soon to the Skies',
      headlinePre: 'A ',
      headlineHighlight: 'New Journey',
      headlinePost: ' Between Indonesia and Saudi Arabia',
      headlineLine1End: ' Between Indonesia',
      headlineLine2: 'and Saudi Arabia',
      intro: 'ODST Airlines Indonesia — A modern aviation vision bridging distances, with dedicated care for Hajj & Umrah journeys.',
      actionExplore: 'Explore Our Vision',
      actionNews: 'Follow Launch News',
    },
    introSection: {
      label: 'Welcome Aboard Our Vision',
      title: 'Bridging Distances. Honoring Every Journey.',
      titleLine1: 'Bridging Distances.',
      titleLine2: 'Honoring Every Journey.',
      description: 'ODST Airlines Indonesia is built upon the human and cultural bond connecting Indonesia and Saudi Arabia. We deliver a clear, modern, and carefully designed flight experience from the first step to arrival.',
      descLine1: 'ODST Airlines Indonesia is built upon the human and cultural bond connecting Indonesia and Saudi Arabia.',
      descLine2: 'We deliver a clear, modern, and carefully designed flight experience from the first step to arrival.',
      quote: 'A smoother voyage, with mindful care accompanying you at every step.',
    },
    features: {
      label: 'What We Are Preparing',
      title: 'Foundations of Modern Travel',
      subtitle: 'Three pillars defining the forthcoming ODST flight experience.',
      cards: [
        {
          number: '01',
          title: 'Fares & Packages',
          desc: 'Curated options and packages to be unveiled as launch approaches.',
        },
        {
          number: '02',
          title: 'Connected Routes',
          desc: 'A strategic vision focused on linking Indonesia and the Kingdom of Saudi Arabia.',
        },
        {
          number: '03',
          title: 'Modern Fleet',
          desc: 'Contemporary cabin comfort and a passenger-first approach to simplicity.',
        },
      ],
    },
    pilgrimage: {
      label: 'Meaningful Journeys',
      title: 'Hajj & Umrah at Our Heart',
      titleLine1: 'Hajj & Umrah at',
      titleLine2: 'Our Heart',
      description: 'We understand that Hajj and Umrah begin with pure intention long before takeoff. We tailor our service to the sacred needs of pilgrims, ensuring dignity, comfort, and seamless passage.',
      badge: 'Dedicated Pilgrimage Care',
    },
    countdown: {
      label: 'Prepare for Takeoff',
      title: 'The Countdown Begins Here',
      description: 'Official launch dates and operations will be announced soon across ODST official channels.',
      days: 'Days',
      hours: 'Hours',
      minutes: 'Mins',
      seconds: 'Secs',
    },
    bookingTeaser: {
      label: 'Booking Information',
      title: 'Everything You Need, In One Place — Soon',
      titleLine1: 'Everything You Need,',
      titleLine2: 'In One Place — Soon',
      description: 'We are preparing clear, transparent booking guidance to help you plan with total confidence upon launch.',
      items: ['Booking Mechanism', 'Fares & Packages', 'Flight Guidelines'],
      action: 'Booking Details Coming Soon',
    },
    social: {
      label: 'Stay Connected',
      title: 'Soar With Us From Today',
      description: 'Follow our official channels for the latest launch announcements, fleet updates, and journey stories.',
    },
    partnership: {
      label: 'Trusted Local Partnership',
      title: 'In Partnership with Manazil Al Mokhtara Group',
      titleLine1: 'In Partnership with',
      titleLine2: 'Manazil Al Mokhtara Group',
      description: 'Combining deep local hospitality mastery with ODST’s vision for seamless aviation between Indonesia and Saudi Arabia.',
    },
    closing: {
      label: 'Our Journey Begins With You',
      statement: 'From Indonesia to the Kingdom — A journey starting with intention and arriving with devotion.',
      statementLine1: 'From Indonesia to the Kingdom —',
      statementLine2: 'A journey starting with intention and arriving with devotion.',
      action: 'Be the First to Know',
    },
    footer: {
      aboutLine1: 'ODST Airlines Indonesia: A modern aviation vision connecting',
      aboutLine2: 'Indonesia and the Kingdom of Saudi Arabia.',
      aboutText: 'ODST Airlines Indonesia: A modern aviation vision connecting Indonesia and Saudi Arabia.',
      availability: 'Contact and flight operation schedules will be announced soon.',
      companyTitle: 'ODST',
      journeyTitle: 'Journey',
      contactTitle: 'Connect',
      rights: '© ODST AIRLINES INDONESIA — All Rights Reserved.',
      companyLinks: [
        { label: 'About ODST', href: 'https://odst.id' },
        { label: 'Our Vision', href: 'about' },
        { label: 'Partnership', href: 'partnership' },
      ],
      journeyLinks: [
        { label: 'Services', href: 'services' },
        { label: 'Hajj & Umrah', href: 'hajj-umrah' },
        { label: 'Booking Info', href: 'booking-info' },
      ],
      contactLinks: [
        { label: 'Instagram', href: 'https://www.instagram.com/odst.group/' },
        { label: 'X', href: 'https://x.com' },
        { label: 'Facebook', href: 'https://www.facebook.com/ODSTAirlines/' },
      ],
    },
    modal: {
      badge: 'Launch Alerts',
      title: 'Be the First to Know When We Take Off',
      description: 'Register your email to receive instant updates when booking opens, fares are announced, and inaugural flights are scheduled.',
      nameLabel: 'Full Name',
      namePlaceholder: 'Your Name',
      emailLabel: 'Email Address',
      emailPlaceholder: 'name@example.com',
      submit: 'Notify Me at Launch',
      successTitle: 'Welcome Aboard!',
      successDesc: 'Your email has been registered successfully. We will notify you as soon as flight schedules are released.',
      toastTitle: 'Successfully Registered',
      toastDesc: 'Thank you! You will be among the first to receive launch announcements and booking access.',
    },
  },

  id: {
    nav: {
      home: 'Beranda',
      about: 'Tentang ODST',
      services: 'Layanan Kami',
      booking: 'Info Pemesanan',
      contact: 'Hubungi Kami',
    },
    hero: {
      label: 'Segera di Angkasa',
      headlinePre: 'Perjalanan ',
      headlineHighlight: 'Baru',
      headlinePost: ' Antara Indonesia dan Arab Saudi',
      headlineLine1End: ' Antara Indonesia',
      headlineLine2: 'dan Arab Saudi',
      intro: 'ODST Airlines Indonesia — Visi penerbangan modern yang mendekatkan jarak, dengan dedikasi istimewa untuk perjalanan Haji dan Umrah.',
      actionExplore: 'Jelajahi Visi Kami',
      actionNews: 'Ikuti Kabar Peluncuran',
    },
    introSection: {
      label: 'Selamat Datang di Visi Kami',
      title: 'Mendekatkan Jarak. Menghormati Makna Perjalanan.',
      titleLine1: 'Mendekatkan Jarak.',
      titleLine2: 'Menghormati Makna Perjalanan.',
      description: 'ODST Airlines Indonesia bertolak dari ikatan budaya dan spiritual yang erat antara Indonesia dan Kerajaan Arab Saudi. Kami menghadirkan pengalaman terbang yang nyaman, modern, dan dirancang dengan ketulusan sejak awal hingga tiba di tujuan.',
      descLine1: 'ODST Airlines Indonesia bertolak dari ikatan budaya dan spiritual yang erat antara Indonesia dan Kerajaan Arab Saudi.',
      descLine2: 'Kami menghadirkan pengalaman terbang yang nyaman, modern, dan dirancang dengan ketulusan sejak awal hingga tiba di tujuan.',
      quote: 'Penerbangan yang lebih tenang, didampingi kepedulian di setiap fase perjalanan.',
    },
    features: {
      label: 'Yang Kami Persiapkan',
      title: 'Pondasi Penerbangan Modern',
      subtitle: 'Tiga pilar utama yang membentuk pengalaman terbang bersama ODST.',
      cards: [
        {
          number: '01',
          title: 'Tarif & Paket Khusus',
          desc: 'Pilihan tarif dan paket terpadu yang akan diumumkan menjelang peluncuran resmi.',
        },
        {
          number: '02',
          title: 'Rute Terhubung',
          desc: 'Fokus menghubungkan kota-kota utama di Indonesia langsung ke Arab Saudi.',
        },
        {
          number: '03',
          title: 'Armada Modern',
          desc: 'Kenyamanan kabin kontemporer dengan tata ruang lega dan layanan hangat.',
        },
      ],
    },
    pilgrimage: {
      label: 'Perjalanan Penuh Makna',
      title: 'Haji & Umrah di Jantung Visi Kami',
      titleLine1: 'Haji & Umrah di',
      titleLine2: 'Jantung Visi Kami',
      description: 'Kami memahami bahwa ibadah Haji dan Umrah dimulai dari niat tulus sebelum lepas landas. Kebutuhan para tamu Allah menjadi prioritas utama demi kekhusyukan dan kenyamanan ibadah Anda.',
      badge: 'Dedikasi Khusus Perjalanan Ibadah',
    },
    countdown: {
      label: 'Bersiap Lepas Landas',
      title: 'Hitung Mundur Dimulai',
      description: 'Jadwal peluncuran dan operasional perdana akan segera diumumkan melalui kanal resmi ODST.',
      days: 'Hari',
      hours: 'Jam',
      minutes: 'Menit',
      seconds: 'Detik',
    },
    bookingTeaser: {
      label: 'Informasi Pemesanan',
      title: 'Semua Kebutuhan Anda dalam Satu Tempat — Segera',
      titleLine1: 'Semua Kebutuhan Anda dalam',
      titleLine2: 'Satu Tempat — Segera',
      description: 'Kami sedang merancang sistem pemesanan yang mudah, transparan, dan terintegrasi untuk kenyamanan perjalanan Anda.',
      items: ['Mekanisme Reservasi', 'Paket & Fasilitas', 'Panduan Penerbangan'],
      action: 'Detail Pemesanan Segera Hadir',
    },
    social: {
      label: 'Tetap Terhubung',
      title: 'Terbang Bersama Kami Mulai Sekarang',
      description: 'Ikuti kanal media sosial resmi kami untuk mendapatkan informasi terkini, armada baru, dan kabar peluncuran.',
    },
    partnership: {
      label: 'Kemitraan Strategis Terpercaya',
      title: 'Bermitra dengan Manazil Al Mokhtara Group',
      titleLine1: 'Bermitra dengan',
      titleLine2: 'Manazil Al Mokhtara Group',
      description: 'Memadukan keahlian keramahan lokal kelas dunia di Tanah Suci dengan visi penerbangan modern ODST Airlines.',
    },
    closing: {
      label: 'Tujuan Kami Dimulai dari Anda',
      statement: 'Dari Indonesia menuju Tanah Suci — Perjalanan yang dimulai dengan niat dan tiba dengan ketulusan.',
      statementLine1: 'Dari Indonesia menuju Tanah Suci —',
      statementLine2: 'Perjalanan yang dimulai dengan niat dan tiba dengan ketulusan.',
      action: 'Jadilah yang Pertama Mengetahui',
    },
    footer: {
      aboutLine1: 'ODST Airlines Indonesia — Visi penerbangan modern yang menghubungkan',
      aboutLine2: 'Indonesia dan Kerajaan Arab Saudi.',
      aboutText: 'ODST Airlines Indonesia — Visi penerbangan modern yang menghubungkan Indonesia dan Arab Saudi.',
      availability: 'Informasi kontak dan jadwal operasional lengkap akan diumumkan segera.',
      companyTitle: 'ODST',
      journeyTitle: 'Perjalanan',
      contactTitle: 'Kontak',
      rights: '© ODST AIRLINES INDONESIA — Hak Cipta Dilindungi.',
      companyLinks: [
        { label: 'Tentang ODST', href: 'https://odst.id' },
        { label: 'Visi Kami', href: 'about' },
        { label: 'Kemitraan', href: 'partnership' },
      ],
      journeyLinks: [
        { label: 'Layanan Kami', href: 'services' },
        { label: 'Haji & Umrah', href: 'hajj-umrah' },
        { label: 'Info Pemesanan', href: 'booking-info' },
      ],
      contactLinks: [
        { label: 'Instagram', href: 'https://www.instagram.com/odst.group/' },
        { label: 'X', href: 'https://x.com' },
        { label: 'Facebook', href: 'https://www.facebook.com/ODSTAirlines/' },
      ],
    },
    modal: {
      badge: 'Notifikasi Peluncuran',
      title: 'Jadilah yang Pertama Mengetahui',
      description: 'Daftarkan email Anda untuk menerima informasi resmi pembukaan rute, jadwal penerbangan, dan pemesanan tiket perdana.',
      nameLabel: 'Nama Lengkap',
      namePlaceholder: 'Nama Anda',
      emailLabel: 'Alamat Email',
      emailPlaceholder: 'name@example.com',
      submit: 'Dapatkan Info Peluncuran',
      successTitle: 'Terima Kasih!',
      successDesc: 'Email Anda telah berhasil didaftarkan. Kami akan mengabari Anda segera saat jadwal penerbangan resmi dirilis.',
      toastTitle: 'Berhasil Mendaftar',
      toastDesc: 'Terima kasih, Anda akan menjadi yang pertama mendapatkan kabar peluncuran tiket ODST Airlines.',
    },
  },
};
