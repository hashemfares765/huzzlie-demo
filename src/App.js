import React, { useState, useEffect } from "react";

import {
  Search,
  Home,
  Heart,
  PlusCircle,
  User,
  Car,
  Building2,
  Store,
  Sofa,
  Briefcase,
  MapPin,
  Tag,
  ChevronRight,
  ChevronLeft,
  MessageCircle,
  Languages,
  ChevronDown,
  UserCircle,
  Bookmark,
  Shield,
  Phone,
  Bell,
  Settings,
  Trash2,
  LogOut,
} from "lucide-react";
import "./App.css";

/* STRINGS */

const STRINGS = {
  en: {
    searchPlaceholder: "Search anything...",
    search: "Search",
    home: "Home",
    favourites: "Favourites",
    placeListing: "Place Listing",
    account: "Account",
    latestListings: "Latest Listings",
    seeAll: "See all",
    feeNote:
      "Cars cost $3 per listing. Properties (rent/sale/off-plan/rooms) cost $10 per listing. Others are free.",
    carsTitle: "Cars",
    carsFilters: "Car Filters",
    propertyFilters: "Property Filters",
    createAccountToPost: "Please create an account before placing a listing.",
    adSpace: "Ad space",
    adSpaceDesc: "External banner placement for partners.",
    brandSelectTitle: "Select a car brand",
    detailsOverview: "Overview",
    detailsShowMore: "Show more",
    detailsContact: "Contact seller",
    searchResults: "Search results",
    searchNoResults: "No results found. Try another keyword.",
  },
  ar: {
    searchPlaceholder: "ابحث عن أي شيء...",
    search: "بحث",
    home: "الرئيسية",
    favourites: "المفضلة",
    placeListing: "إضافة إعلان",
    account: "الحساب",
    latestListings: "أحدث الإعلانات",
    seeAll: "عرض الكل",
    feeNote:
      "إعلانات السيارات 3$ للإعلان. العقارات (إيجار/بيع/خطة مستقبلية/غرف) 10$ للإعلان. باقي الأقسام مجانية.",
    carsTitle: "سيارات",
    carsFilters: "فلاتر السيارات",
    propertyFilters: "فلاتر العقارات",
    createAccountToPost: "يرجى إنشاء حساب قبل إضافة إعلان.",
    adSpace: "مساحة إعلانية",
    adSpaceDesc: "مكان لوضع إعلانات الشركاء.",
    brandSelectTitle: "اختر ماركة السيارة",
    detailsOverview: "نظرة عامة",
    detailsShowMore: "عرض المزيد",
    detailsContact: "تواصل مع المعلن",
    searchResults: "نتائج البحث",
    searchNoResults: "لا توجد نتائج، جرّب كلمة أخرى.",
  },
};

/* HELPERS */

function getLabel(obj, lang) {
  if (lang === "ar" && obj.labelAr) return obj.labelAr;
  if (obj.labelEn) return obj.labelEn;
  return obj.label || "";
}

/* CATEGORY DEFINITIONS */

const CATEGORY_DEFS = [
  {
    key: "rent",
    labelEn: "Properties for Rent",
    labelAr: "عقارات للإيجار",
    icon: Building2,
    isProperty: true,
    subcategories: [
      { key: "apartment", labelEn: "Apartments", labelAr: "شقق" },
      { key: "villa", labelEn: "Villas", labelAr: "فلل" },
      { key: "townhouse", labelEn: "Townhouses", labelAr: "تاون هاوس" },
    ],
  },
  {
    key: "sale",
    labelEn: "Properties for Sale",
    labelAr: "عقارات للبيع",
    icon: Home,
    isProperty: true,
    subcategories: [
      { key: "apartment", labelEn: "Apartments", labelAr: "شقق" },
      { key: "villa", labelEn: "Villas", labelAr: "فلل" },
      { key: "plot", labelEn: "Plots", labelAr: "أراضٍ" },
      { key: "offplan", labelEn: "Off-plan", labelAr: "خطة مستقبلية" },
    ],
  },
  {
    key: "offplan",
    labelEn: "Off Plan Properties",
    labelAr: "عقارات على المخطط",
    icon: MapPin,
    isProperty: true,
    subcategories: [
      { key: "apt", labelEn: "Off-plan Apts", labelAr: "شقق على المخطط" },
      { key: "villa", labelEn: "Off-plan Villas", labelAr: "فلل على المخطط" },
    ],
  },
  {
    key: "community",
    labelEn: "Community",
    labelAr: "المجتمع",
    icon: User,
    isProperty: false,
    subcategories: [
      { key: "events", labelEn: "Events", labelAr: "فعاليات" },
      { key: "activities", labelEn: "Activities", labelAr: "أنشطة" },
      { key: "volunteering", labelEn: "Volunteering", labelAr: "تطوع" },
      { key: "other", labelEn: "Other", labelAr: "أخرى" },
    ],
  },
  {
    key: "motors",
    labelEn: "Cars",
    labelAr: "سيارات",
    icon: Car,
    isProperty: false,
    subcategories: [{ key: "cars", labelEn: "Cars", labelAr: "سيارات" }],
  },
  {
    key: "jobs",
    labelEn: "Jobs",
    labelAr: "وظائف",
    icon: Briefcase,
    isProperty: false,
    subcategories: [
      { key: "sales", labelEn: "Sales", labelAr: "مبيعات" },
      { key: "it", labelEn: "IT", labelAr: "تقنية المعلومات" },
      { key: "admin", labelEn: "Admin", labelAr: "إداري" },
      { key: "marketing", labelEn: "Marketing", labelAr: "تسويق" },
    ],
  },
  {
    key: "classifieds",
    labelEn: "Classifieds",
    labelAr: "إعلانات مبوبة",
    icon: Store,
    isProperty: false,
    subcategories: [
      { key: "electronics", labelEn: "Electronics", labelAr: "إلكترونيات" },
      { key: "fashion", labelEn: "Fashion", labelAr: "موضة" },
      { key: "services", labelEn: "Services", labelAr: "خدمات" },
      { key: "pets", labelEn: "Pets", labelAr: "حيوانات أليفة" },
    ],
  },
  {
    key: "furniture",
    labelEn: "Furniture & Garden",
    labelAr: "أثاث وحديقة",
    icon: Sofa,
    isProperty: false,
    subcategories: [
      { key: "sofa", labelEn: "Sofas", labelAr: "كنب" },
      { key: "bed", labelEn: "Beds", labelAr: "أسرة" },
      { key: "outdoor", labelEn: "Outdoor", labelAr: "خارجي" },
      { key: "decor", labelEn: "Décor", labelAr: "ديكور" },
    ],
  },
];

/* SYRIA CITIES */

const SYRIA_CITIES = [
  { en: "Damascus", ar: "دمشق" },
  { en: "Aleppo", ar: "حلب" },
  { en: "Homs", ar: "حمص" },
  { en: "Hama", ar: "حماة" },
  { en: "Latakia", ar: "اللاذقية" },
  { en: "Tartus", ar: "طرطوس" },
  { en: "Raqqa", ar: "الرقة" },
  { en: "Deir ez-Zor", ar: "دير الزور" },
  { en: "Hasakah", ar: "الحسكة" },
  { en: "Daraa", ar: "درعا" },
  { en: "Suwayda", ar: "السويداء" },
  { en: "Idlib", ar: "إدلب" },
];

/* CAR BRANDS */

const CAR_BRANDS = [
  "",
  "Abarth",
  "Acura",
  "Alfa Romeo",
  "Aston Martin",
  "Audi",
  "BAIC",
  "Bentley",
  "BMW",
  "Brilliance",
  "Bugatti",
  "BYD",
  "Cadillac",
  "Changan",
  "Chery",
  "Chevrolet",
  "Chrysler",
  "Citroen",
  "Dacia",
  "Daewoo",
  "Daihatsu",
  "Dodge",
  "Ferrari",
  "Fiat",
  "Ford",
  "Geely",
  "GMC",
  "Great Wall",
  "Haval",
  "Honda",
  "Hummer",
  "Hyundai",
  "Infiniti",
  "Isuzu",
  "JAC",
  "Jaguar",
  "Jeep",
  "Kia",
  "Lamborghini",
  "Lancia",
  "Land Rover",
  "Lexus",
  "Lincoln",
  "Lotus",
  "Maserati",
  "Maybach",
  "Mazda",
  "McLaren",
  "Mercedes",
  "MG",
  "Mini",
  "Mitsubishi",
  "Nissan",
  "Opel",
  "Peugeot",
  "Porsche",
  "Renault",
  "Rolls-Royce",
  "Seat",
  "Skoda",
  "Smart",
  "SsangYong",
  "Subaru",
  "Suzuki",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo",
];

/* MOCK LISTINGS */

const MOCK_LISTINGS = [
  {
    id: "l1",
    title: "1BR Apartment | Downtown Damascus",
    titleAr: "شقة غرفة وصالة | وسط دمشق",
    price: 3000000,
    currency: "USD",
    category: "rent",
    subcategory: "apartment",
    location: "Damascus",
    locationAr: "دمشق",
    areaSqft: 780,
    whatsapp: "+963944111222",
    imgs: [
      "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1200&auto=format&fit=crop",
    ],
    desc:
      "Bright 1BR apartment in central Damascus, close to shops and cafés.",
    descAr: "شقة غرفة وصالة مشرقة في قلب دمشق بالقرب من المحلات والمقاهي.",
    featured: true,
  },
  {
    id: "l2",
    title: "2018 Toyota Camry | GCC | Full service",
    titleAr: "تويوتا كامري 2018 | خليجي | صيانة كاملة",
    price: 15000,
    currency: "USD",
    category: "motors",
    subcategory: "cars",
    brand: "Toyota",
    model: "Camry",
    year: 2018,
    mileage: 98000,
    specs: "GCC",
    sellerType: "private",
    location: "Aleppo",
    locationAr: "حلب",
    whatsapp: "+963944333444",
    imgs: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
    ],
    desc: "Clean Camry with full service history and no major accidents.",
    descAr: "كامري نظيفة مع سجل صيانة كامل وبدون حوادث كبيرة.",
    featured: false,
  },
  {
    id: "l3",
    title: "Modern Sofa | Like New",
    titleAr: "كنبة عصرية | كالجديدة",
    price: 400,
    currency: "USD",
    category: "furniture",
    subcategory: "sofa",
    location: "Homs",
    locationAr: "حمص",
    whatsapp: "+963944555666",
    imgs: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop",
    ],
    desc: "Comfortable 3-seater sofa, barely used.",
    descAr: "كنبة مريحة لثلاثة أشخاص، مستخدمة قليلاً جداً.",
    featured: false,
  },
  {
    id: "l4",
    title: "Junior Marketing Executive",
    titleAr: "تنفيذي تسويق مبتدئ",
    price: 0,
    currency: "USD",
    category: "jobs",
    subcategory: "marketing",
    location: "Damascus",
    locationAr: "دمشق",
    whatsapp: "+963944777888",
    imgs: [
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop",
    ],
    desc: "Entry-level marketing role at a growing agency.",
    descAr: "وظيفة تسويق للمبتدئين في وكالة نامية.",
    featured: false,
  },
  {
    id: "l5",
    title: "2021 Mercedes C-Class | Warranty",
    titleAr: "مرسيدس C كلاس 2021 | ضمان",
    price: 129000,
    currency: "USD",
    category: "motors",
    subcategory: "cars",
    brand: "Mercedes",
    model: "C-Class",
    year: 2021,
    mileage: 42000,
    specs: "GCC",
    sellerType: "dealership",
    location: "Dubai",
    locationAr: "دبي",
    whatsapp: "+971581234567",
    imgs: [
      "https://images.unsplash.com/photo-1549921296-3b4a6b26b6b4?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=1200&auto=format&fit=crop",
    ],
    desc:
      "Dealer-maintained C-Class with remaining warranty and full options.",
    descAr: "C كلاس بصيانة وكالة مع ضمان ساري ومواصفات كاملة.",
    featured: true,
  },
];

/* BASIC HELPERS */

function isCar(categoryKey, subKey) {
  return categoryKey === "motors" && subKey === "cars";
}
function isAnyProperty(categoryKey) {
  return !!CATEGORY_DEFS.find((c) => c.isProperty && c.key === categoryKey);
}
function postingFeeFor(categoryKey, subKey) {
  if (isCar(categoryKey, subKey)) {
    return { amount: 3, currency: "USD", reason: "Cars category fee" };
  }
  if (isAnyProperty(categoryKey)) {
    return { amount: 10, currency: "USD", reason: "Property listing fee" };
  }
  return { amount: 0, currency: "USD", reason: "Free category" };
}
function validateCarListing(listing) {
  if (!isCar(listing.category, listing.subcategory)) return true;
  const required = [
    "brand",
    "model",
    "year",
    "specs",
    "sellerType",
    "mileage",
    "vin",
  ];
  return required.every((k) => !!listing[k]);
}

/* COMPONENTS */

function AdBanner({ lang }) {
  const S = STRINGS[lang || "en"];
  return (
    <div className="hz-ad">
      <div className="hz-ad-label">{S.adSpace}</div>
      <div className="hz-ad-text">{S.adSpaceDesc}</div>
    </div>
  );
}

function WhatsAppButton({ number, title }) {
  if (!number) return null;
  const url =
    "https://wa.me/" +
    number.replace(/[^\d+]/g, "") +
    "?text=" +
    encodeURIComponent("Hi, I'm interested in your listing: " + title);
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="hz-whatsapp"
      onClick={(e) => e.stopPropagation()}
    >
      <MessageCircle size={14} />
      <span>WhatsApp</span>
    </a>
  );
}

function ListingCard({ item, fav, onToggleFav, onOpen, lang }) {
  const localizedTitle =
    lang === "ar" && item.titleAr ? item.titleAr : item.title;
  const localizedLocation =
    lang === "ar" && item.locationAr ? item.locationAr : item.location;
  return (
    <div
      className="hz-card"
      onClick={() => {
        if (onOpen) onOpen(item);
      }}
    >
      <div className="hz-card-img-wrap">
        <img
          src={item.imgs && item.imgs[0]}
          alt={localizedTitle}
          className="hz-card-img"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFav(item.id);
          }}
          className={
            "hz-heart " + (fav ? "hz-heart-active" : "hz-heart-inactive")
          }
        >
          <Heart size={18} fill={fav ? "currentColor" : "none"} />
        </button>
        {item.featured ? <div className="hz-badge">Featured</div> : null}
      </div>
      <div className="hz-card-body">
        <div className="hz-card-title-row">
          <h3 className="hz-card-title">{localizedTitle}</h3>
          <Tag size={14} className="hz-card-tag" />
        </div>
        <div className="hz-card-price-row">
          <span className="hz-price">
            {item.currency}{" "}
            {item.price != null ? item.price.toLocaleString() : ""}
          </span>
          <span className="hz-loc">
            <MapPin size={12} />
            {localizedLocation}
          </span>
        </div>
        <div className="hz-card-meta">
          {item.year ? <span>Year: {item.year}</span> : null}
          {item.mileage ? (
            <span>Mileage: {item.mileage.toLocaleString()} km</span>
          ) : null}
          {item.specs ? <span>Specs: {item.specs}</span> : null}
          {item.areaSqft ? <span>Area: {item.areaSqft} sqft</span> : null}
          {item.sellerType ? <span>Seller: {item.sellerType}</span> : null}
        </div>
        <WhatsAppButton number={item.whatsapp} title={localizedTitle} />
      </div>
    </div>
  );
}

function Header({
  q,
  setQ,
  onSearch,
  lang,
  setLang,
  disableEnterSearch,
  onLogoClick,
}) {
  const S = STRINGS[lang];
  const isAR = lang === "ar";

  return (
    <div className="hz-header">
      <div className="hz-header-inner">
        {/* Search bar with logo inside */}
        <div className="hz-search-wrap">
          <button
            type="button"
            className="hz-logo-in-search"
            onClick={onLogoClick}
          >
            <img
              src="/huzzlie-logo.png"
              alt="Huzzlie"
              className="hz-logo-img"
            />
          </button>

          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !disableEnterSearch) {
                e.preventDefault();
                onSearch();
              }
            }}
            placeholder={S.searchPlaceholder}
            className={
              "hz-search-input " + (isAR ? "hz-rtl-text" : "hz-ltr-text")
            }
            dir={isAR ? "rtl" : "ltr"}
          />

          <button
            type="button"
            className="hz-search-btn"
            onClick={onSearch}
          >
            <Search size={18} />
          </button>
        </div>

        {/* Language toggle */}
        <div className="hz-header-actions">
          <button
            className="hz-lang-btn"
            type="button"
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
          >
            <Languages size={16} />
            <span>{lang === "en" ? "عربي" : "EN"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}


/* PROMO CAROUSEL */

const PROMO_ADS = [
  {
    id: "chatgpt",
    title: "ChatGPT for Smarter Listings",
    desc: "Use AI to write stronger titles, descriptions & replies.",
    cta: "Open ChatGPT",
    bg: "linear-gradient(135deg, #111827, #4b5563)",
    accent: "#22c55e",
    url: "https://chat.openai.com",
  },
  {
    id: "ferrari",
    title: "Ferrari – The Ultimate Drive",
    desc: "Explore the official Ferrari world of performance & design.",
    cta: "Visit Ferrari",
    bg: "linear-gradient(135deg, #450a0a, #b91c1c)",
    accent: "#fecaca",
    url: "https://www.ferrari.com",
  },
  {
    id: "syriatel",
    title: "Syriatel Online Services",
    desc: "Check offers, recharge & manage your line online.",
    cta: "Go to Syriatel",
    bg: "linear-gradient(135deg, #1d4ed8, #38bdf8)",
    accent: "#eff6ff",
    url: "https://www.syriatel.sy",
  },
];

function PromoCarousel() {
  const [active, setActive] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  function goTo(index) {
    const last = PROMO_ADS.length - 1;
    if (index < 0) index = last;
    if (index > last) index = 0;
    setActive(index);
  }

  function handleClick(url) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function onTouchStart(e) {
    setTouchStartX(e.touches[0].clientX);
    setTouchEndX(null);
  }

  function onTouchMove(e) {
    setTouchEndX(e.touches[0].clientX);
  }

  function onTouchEnd() {
    if (touchStartX == null || touchEndX == null) return;
    const diff = touchStartX - touchEndX;
    const threshold = 40;
    if (Math.abs(diff) > threshold) {
      if (diff > 0) goTo(active + 1);
      else goTo(active - 1);
    }
    setTouchStartX(null);
    setTouchEndX(null);
  }

  return (
    <div
      className="hz-promo-wrap"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="hz-promo-track"
        style={{
          transform: `translateX(-${active * 100}%)`,
          width: `${PROMO_ADS.length * 100}%`,
        }}
      >
        {PROMO_ADS.map((ad) => (
          <div
            key={ad.id}
            className="hz-promo-slide"
            style={{ background: ad.bg }}
            onClick={() => handleClick(ad.url)}
          >
            <div className="hz-promo-content">
              <div className="hz-promo-title">{ad.title}</div>
              <div className="hz-promo-desc">{ad.desc}</div>
              <div
                className="hz-promo-cta"
                style={{ backgroundColor: ad.accent }}
              >
                {ad.cta}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hz-promo-controls">
        <button
          className="hz-promo-arrow"
          onClick={(e) => {
            e.stopPropagation();
            goTo(active - 1);
          }}
        >
          <ChevronLeft size={16} />
        </button>

        <div className="hz-promo-dots">
          {PROMO_ADS.map((ad, index) => (
            <button
              key={ad.id}
              className={
                "hz-promo-dot " +
                (index === active ? "hz-promo-dot-active" : "")
              }
              onClick={(e) => {
                e.stopPropagation();
                setActive(index);
              }}
            />
          ))}
        </div>

        <button
          className="hz-promo-arrow"
          onClick={(e) => {
            e.stopPropagation();
            goTo(active + 1);
          }}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

/* === FILTERS – REWRITTEN TO USE DRAFTS + APPLY BUTTON === */

/* MOTORS FILTERS */

function MotorsFilters({ lang, filters, setFilters }) {
  const isAr = lang === "ar";
  const t = (en, ar) => (isAr ? ar : en);

  const LABELS = {
    brand: t("Brand", "الماركة"),
    sellerType: t("Seller", "البائع"),
    price: t("Price (USD)", "السعر (دولار)"),
    year: t("Year", "السنة"),
    km: t("Max KM", "أقصى كم"),
    specs: t("Specs", "المواصفات"),
  };

  const PRICE_MIN = 0;
  const PRICE_MAX = 200000;
  const YEAR_MIN = 1980;
  const YEAR_MAX = new Date().getFullYear();
  const KM_MIN = 0;
  const KM_MAX = 500000;

  // local draft state ONLY
  const [draftBrand, setDraftBrand] = useState(filters.brand || "");
  const [draftSellerType, setDraftSellerType] = useState(
    filters.sellerType || ""
  );
  const [draftPriceMin, setDraftPriceMin] = useState(
    filters.priceMin != null ? String(filters.priceMin) : ""
  );
  const [draftPriceMax, setDraftPriceMax] = useState(
    filters.priceMax != null ? String(filters.priceMax) : ""
  );
  const [draftYearMin, setDraftYearMin] = useState(
    filters.yearMin != null ? String(filters.yearMin) : ""
  );
  const [draftYearMax, setDraftYearMax] = useState(
    filters.yearMax != null ? String(filters.yearMax) : ""
  );
  const [draftKmMax, setDraftKmMax] = useState(
    filters.mileageMax != null ? String(filters.mileageMax) : ""
  );
  const [draftSpecs, setDraftSpecs] = useState(filters.specs || "");

  // sync drafts when parent filters change externally (reset)
  useEffect(() => {
    setDraftBrand(filters.brand || "");
    setDraftSellerType(filters.sellerType || "");
    setDraftPriceMin(
      filters.priceMin != null ? String(filters.priceMin) : ""
    );
    setDraftPriceMax(
      filters.priceMax != null ? String(filters.priceMax) : ""
    );
    setDraftYearMin(filters.yearMin != null ? String(filters.yearMin) : "");
    setDraftYearMax(filters.yearMax != null ? String(filters.yearMax) : "");
    setDraftKmMax(
      filters.mileageMax != null ? String(filters.mileageMax) : ""
    );
    setDraftSpecs(filters.specs || "");
  }, [
    filters.brand,
    filters.sellerType,
    filters.priceMin,
    filters.priceMax,
    filters.yearMin,
    filters.yearMax,
    filters.mileageMax,
    filters.specs,
  ]);

  const [expandedKey, setExpandedKey] = useState(null);

  function chipClass(key) {
    return (
      "hz-filter-chip " +
      (expandedKey === key ? "hz-filter-chip-active" : "")
    );
  }
  function toggleExpand(key) {
    setExpandedKey((prev) => (prev === key ? null : key));
  }

  function cleanNumber(str) {
    return (str ?? "").replace(/[^\d]/g, "");
  }
  function parseOrUndefined(str) {
    if (!str) return undefined;
    const n = Number(str);
    return Number.isFinite(n) ? n : undefined;
  }

  // summaries for chips based on committed filters
  const priceSummary =
    filters.priceMin != null || filters.priceMax != null
      ? `${filters.priceMin ?? PRICE_MIN} - ${
          filters.priceMax == null
            ? t("Any", "أي")
            : filters.priceMax === PRICE_MAX
            ? t("Any", "أي")
            : filters.priceMax
        }`
      : "";

  const yearSummary =
    filters.yearMin != null || filters.yearMax != null
      ? `${filters.yearMin ?? YEAR_MIN}${
          filters.yearMax != null ? " - " + filters.yearMax : "+"
        }`
      : "";

  const kmSummary =
    filters.mileageMax != null ? `≤ ${filters.mileageMax.toLocaleString()}` : "";

  function applyFilters() {
    const pMin = parseOrUndefined(cleanNumber(draftPriceMin));
    const pMax = parseOrUndefined(cleanNumber(draftPriceMax));
    const yMin = parseOrUndefined(cleanNumber(draftYearMin));
    const yMax = parseOrUndefined(cleanNumber(draftYearMax));
    const kMax = parseOrUndefined(cleanNumber(draftKmMax));

    setFilters((f) => ({
      ...f,
      brand: draftBrand || undefined,
      sellerType: draftSellerType || undefined,
      specs: draftSpecs || undefined,
      priceMin:
        pMin == null
          ? undefined
          : Math.max(PRICE_MIN, Math.min(pMin, PRICE_MAX)),
      priceMax:
        pMax == null
          ? undefined
          : Math.max(PRICE_MIN, Math.min(pMax, PRICE_MAX)),
      yearMin:
        yMin == null
          ? undefined
          : Math.max(YEAR_MIN, Math.min(yMin, YEAR_MAX)),
      yearMax:
        yMax == null
          ? undefined
          : Math.max(YEAR_MIN, Math.min(yMax, YEAR_MAX)),
      mileageMax:
        kMax == null
          ? undefined
          : Math.max(KM_MIN, Math.min(kMax, KM_MAX)),
    }));
  }

  function clearAll() {
    setDraftBrand("");
    setDraftSellerType("");
    setDraftPriceMin("");
    setDraftPriceMax("");
    setDraftYearMin("");
    setDraftYearMax("");
    setDraftKmMax("");
    setDraftSpecs("");

    setFilters({
      brand: undefined,
      sellerType: undefined,
      priceMin: undefined,
      priceMax: undefined,
      yearMin: undefined,
      yearMax: undefined,
      mileageMax: undefined,
      specs: undefined,
    });
  }

  return (
    <div className="hz-filters">
      <div className="hz-filters-title">{STRINGS[lang].carsFilters}</div>

      {/* chips */}
      <div className="hz-filter-chips-scroll">
        <button
          className={chipClass("brand")}
          onClick={() => toggleExpand("brand")}
        >
          <span className="hz-filter-chip-label">
            {LABELS.brand}
            {filters.brand ? ` · ${filters.brand}` : ""}
            <ChevronDown className="hz-filter-chip-arrow" />
          </span>
        </button>

        <button
          className={chipClass("sellerType")}
          onClick={() => toggleExpand("sellerType")}
        >
          <span className="hz-filter-chip-label">
            {LABELS.sellerType}
            {filters.sellerType
              ? ` · ${
                  filters.sellerType === "private"
                    ? t("Private", "فرد")
                    : t("Dealership", "معرض")
                }`
              : ""}
            <ChevronDown className="hz-filter-chip-arrow" />
          </span>
        </button>

        <button
          className={chipClass("price")}
          onClick={() => toggleExpand("price")}
        >
          <span className="hz-filter-chip-label">
            {LABELS.price}
            {priceSummary ? ` · ${priceSummary}` : ""}
            <ChevronDown className="hz-filter-chip-arrow" />
          </span>
        </button>

        <button
          className={chipClass("year")}
          onClick={() => toggleExpand("year")}
        >
          <span className="hz-filter-chip-label">
            {LABELS.year}
            {yearSummary ? ` · ${yearSummary}` : ""}
            <ChevronDown className="hz-filter-chip-arrow" />
          </span>
        </button>

        <button
          className={chipClass("km")}
          onClick={() => toggleExpand("km")}
        >
          <span className="hz-filter-chip-label">
            {LABELS.km}
            {kmSummary ? ` · ${kmSummary}` : ""}
            <ChevronDown className="hz-filter-chip-arrow" />
          </span>
        </button>

        <button
          className={chipClass("specs")}
          onClick={() => toggleExpand("specs")}
        >
          <span className="hz-filter-chip-label">
            {LABELS.specs}
            {filters.specs ? ` · ${filters.specs}` : ""}
            <ChevronDown className="hz-filter-chip-arrow" />
          </span>
        </button>
      </div>

      {/* expanded section */}
      {expandedKey && (
        <div className="hz-filter-panel" style={{ marginTop: 6 }}>
          {expandedKey === "brand" && (
            <div className="hz-field">
              <label>{LABELS.brand}</label>
              <select
                value={draftBrand}
                onChange={(e) => setDraftBrand(e.target.value)}
              >
                <option value="">{t("Any brand", "أي ماركة")}</option>
                {CAR_BRANDS.map(
                  (b) =>
                    b && (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    )
                )}
              </select>
            </div>
          )}

          {expandedKey === "sellerType" && (
            <div className="hz-field">
              <label>{LABELS.sellerType}</label>
              <select
                value={draftSellerType}
                onChange={(e) => setDraftSellerType(e.target.value)}
              >
                <option value="">{t("Any seller", "أي بائع")}</option>
                <option value="private">{t("Private", "فرد")}</option>
                <option value="dealership">{t("Dealership", "معرض")}</option>
              </select>
            </div>
          )}

          {expandedKey === "price" && (
            <div className="hz-field">
              <label>{LABELS.price}</label>
              <div
                className="hz-range-inputs"
                style={{ display: "flex", gap: 6 }}
              >
                <input
                  type="text"
                  inputMode="numeric"
                  className="hz-input-scroller"
                  value={draftPriceMin}
                  onChange={(e) =>
                    setDraftPriceMin(cleanNumber(e.target.value))
                  }
                  placeholder={t("Min", "أدنى")}
                />
                <input
                  type="text"
                  inputMode="numeric"
                  className="hz-input-scroller"
                  value={draftPriceMax}
                  onChange={(e) =>
                    setDraftPriceMax(cleanNumber(e.target.value))
                  }
                  placeholder={t("Max", "أعلى")}
                />
              </div>
            </div>
          )}

          {expandedKey === "year" && (
            <div className="hz-field">
              <label>{LABELS.year}</label>
              <div
                className="hz-range-inputs"
                style={{ display: "flex", gap: 6 }}
              >
                <input
                  type="text"
                  inputMode="numeric"
                  className="hz-input-scroller"
                  value={draftYearMin}
                  onChange={(e) =>
                    setDraftYearMin(cleanNumber(e.target.value))
                  }
                  placeholder={t("From", "من")}
                />
                <input
                  type="text"
                  inputMode="numeric"
                  className="hz-input-scroller"
                  value={draftYearMax}
                  onChange={(e) =>
                    setDraftYearMax(cleanNumber(e.target.value))
                  }
                  placeholder={t("To", "إلى")}
                />
              </div>
            </div>
          )}

          {expandedKey === "km" && (
            <div className="hz-field">
              <label>{LABELS.km}</label>
              <input
                type="text"
                inputMode="numeric"
                className="hz-input-scroller"
                value={draftKmMax}
                onChange={(e) =>
                  setDraftKmMax(cleanNumber(e.target.value))
                }
                placeholder={t("Max kilometers", "أقصى عدد كيلومترات")}
              />
            </div>
          )}

          {expandedKey === "specs" && (
            <div className="hz-field">
              <label>{LABELS.specs}</label>
              <div className="hz-specs-options">
                {["GCC", "EU", "USA", "Japan"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={
                      "hz-spec-pill " +
                      (draftSpecs === s ? "hz-spec-pill-active" : "")
                    }
                    onClick={() =>
                      setDraftSpecs((prev) => (prev === s ? "" : s))
                    }
                  >
                    {s === "Japan" ? t("Japan", "ياباني") : s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div
            className="hz-filter-actions"
            style={{
              marginTop: 8,
              display: "flex",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            <button
              type="button"
              className="hz-secondary"
              onClick={clearAll}
            >
              {t("Clear", "مسح الكل")}
            </button>
            <button
              type="button"
              className="hz-primary"
              onClick={applyFilters}
            >
              {t("Apply", "تطبيق")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* PROPERTY FILTERS */

function PropertyFilters({ filters, setFilters, lang }) {
  const S = STRINGS[lang];
  const isAr = lang === "ar";

  const [expandedKey, setExpandedKey] = useState(null);

  const [draftPriceMin, setDraftPriceMin] = useState(
    filters.priceMin != null ? String(filters.priceMin) : ""
  );
  const [draftPriceMax, setDraftPriceMax] = useState(
    filters.priceMax != null ? String(filters.priceMax) : ""
  );
  const [draftAreaMin, setDraftAreaMin] = useState(
    filters.areaMin != null ? String(filters.areaMin) : ""
  );
  const [draftAreaMax, setDraftAreaMax] = useState(
    filters.areaMax != null ? String(filters.areaMax) : ""
  );

  useEffect(() => {
    setDraftPriceMin(
      filters.priceMin != null ? String(filters.priceMin) : ""
    );
    setDraftPriceMax(
      filters.priceMax != null ? String(filters.priceMax) : ""
    );
    setDraftAreaMin(
      filters.areaMin != null ? String(filters.areaMin) : ""
    );
    setDraftAreaMax(
      filters.areaMax != null ? String(filters.areaMax) : ""
    );
  }, [
    filters.priceMin,
    filters.priceMax,
    filters.areaMin,
    filters.areaMax,
  ]);

  function chipClass(key) {
    return (
      "hz-filter-chip " +
      (expandedKey === key ? "hz-filter-chip-active" : "")
    );
  }
  function toggleExpand(key) {
    setExpandedKey((prev) => (prev === key ? null : key));
  }

  function cleanNumber(str) {
    return (str ?? "").replace(/[^\d]/g, "");
  }
  function parseOrUndefined(str) {
    if (!str) return undefined;
    const n = Number(str);
    return Number.isFinite(n) ? n : undefined;
  }

  function applyFilters() {
    const pMin = parseOrUndefined(cleanNumber(draftPriceMin));
    const pMax = parseOrUndefined(cleanNumber(draftPriceMax));
    const aMin = parseOrUndefined(cleanNumber(draftAreaMin));
    const aMax = parseOrUndefined(cleanNumber(draftAreaMax));

    setFilters((f) => ({
      ...f,
      priceMin: pMin,
      priceMax: pMax,
      areaMin: aMin,
      areaMax: aMax,
    }));
  }

  function clearAll() {
    setDraftPriceMin("");
    setDraftPriceMax("");
    setDraftAreaMin("");
    setDraftAreaMax("");
    setFilters({
      priceMin: undefined,
      priceMax: undefined,
      areaMin: undefined,
      areaMax: undefined,
    });
  }

  return (
    <div className="hz-filters">
      <div className="hz-filters-title">{S.propertyFilters}</div>

      <div className="hz-filter-chips-scroll">
        <button
          className={chipClass("priceMin")}
          onClick={() => toggleExpand("priceMin")}
        >
          {isAr ? "أدنى سعر" : "Min Price"}
          {filters.priceMin ? ` · ${filters.priceMin}` : ""}
          <ChevronDown className="hz-filter-chip-arrow" />
        </button>

        <button
          className={chipClass("priceMax")}
          onClick={() => toggleExpand("priceMax")}
        >
          {isAr ? "أعلى سعر" : "Max Price"}
          {filters.priceMax ? ` · ${filters.priceMax}` : ""}
          <ChevronDown className="hz-filter-chip-arrow" />
        </button>

        <button
          className={chipClass("areaMin")}
          onClick={() => toggleExpand("areaMin")}
        >
          {isAr ? "أقل مساحة" : "Min Area"}
          {filters.areaMin ? ` · ${filters.areaMin}` : ""}
          <ChevronDown className="hz-filter-chip-arrow" />
        </button>

        <button
          className={chipClass("areaMax")}
          onClick={() => toggleExpand("areaMax")}
        >
          {isAr ? "أكبر مساحة" : "Max Area"}
          {filters.areaMax ? ` · ${filters.areaMax}` : ""}
          <ChevronDown className="hz-filter-chip-arrow" />
        </button>
      </div>

      {expandedKey && (
        <div className="hz-filter-panel" style={{ marginTop: 6 }}>
          {expandedKey === "priceMin" && (
            <div className="hz-field">
              <label>
                {isAr ? "الحد الأدنى للسعر" : "Minimum Price"}
              </label>
              <input
                type="text"
                inputMode="numeric"
                className="hz-input-scroller"
                value={draftPriceMin}
                onChange={(e) =>
                  setDraftPriceMin(cleanNumber(e.target.value))
                }
                placeholder={isAr ? "أدنى سعر" : "Min price"}
              />
            </div>
          )}

          {expandedKey === "priceMax" && (
            <div className="hz-field">
              <label>
                {isAr ? "الحد الأعلى للسعر" : "Maximum Price"}
              </label>
              <input
                type="text"
                inputMode="numeric"
                className="hz-input-scroller"
                value={draftPriceMax}
                onChange={(e) =>
                  setDraftPriceMax(cleanNumber(e.target.value))
                }
                placeholder={isAr ? "أعلى سعر" : "Max price"}
              />
            </div>
          )}

          {expandedKey === "areaMin" && (
            <div className="hz-field">
              <label>
                {isAr
                  ? "الحد الأدنى للمساحة (قدم²)"
                  : "Minimum Area (sqft)"}
              </label>
              <input
                type="text"
                inputMode="numeric"
                className="hz-input-scroller"
                value={draftAreaMin}
                onChange={(e) =>
                  setDraftAreaMin(cleanNumber(e.target.value))
                }
                placeholder={isAr ? "أقل مساحة" : "Min sqft"}
              />
            </div>
          )}

          {expandedKey === "areaMax" && (
            <div className="hz-field">
              <label>
                {isAr
                  ? "الحد الأعلى للمساحة (قدم²)"
                  : "Maximum Area (sqft)"}
              </label>
              <input
                type="text"
                inputMode="numeric"
                className="hz-input-scroller"
                value={draftAreaMax}
                onChange={(e) =>
                  setDraftAreaMax(cleanNumber(e.target.value))
                }
                placeholder={isAr ? "أكبر مساحة" : "Max sqft"}
              />
            </div>
          )}

          <div
            className="hz-filter-actions"
            style={{
              marginTop: 8,
              display: "flex",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            <button
              type="button"
              className="hz-secondary"
              onClick={clearAll}
            >
              {isAr ? "مسح الكل" : "Clear"}
            </button>
            <button
              type="button"
              className="hz-primary"
              onClick={applyFilters}
            >
              {isAr ? "تطبيق" : "Apply"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* CATEGORY PAGE */

function CategoryPage({
  cat,
  listings,
  favs,
  toggleFav,
  onBack,
  activeSub,
  lang,
  onOpenListing,
}) {
  const isMotors = cat.key === "motors";
  const isProp = !!cat.isProperty;
  const [filters, setFilters] = useState({});

  const filtered = listings.filter((l) => {
    if (l.category !== cat.key) return false;

    if (cat.subcategories && cat.subcategories.length && activeSub) {
      if (l.subcategory !== activeSub) return false;
    }

    if (isMotors) {
      if (l.subcategory !== "cars") return false;
      if (filters.brand && l.brand !== filters.brand) return false;
      if (filters.sellerType && l.sellerType !== filters.sellerType)
        return false;
      if (filters.priceMin != null && (l.price || 0) < filters.priceMin)
        return false;
      if (filters.priceMax != null && (l.price || 0) > filters.priceMax)
        return false;
      if (filters.yearMin != null && (l.year || 0) < filters.yearMin)
        return false;
      if (filters.yearMax != null && (l.year || 0) > filters.yearMax)
        return false;
      if (filters.mileageMax != null && (l.mileage || 0) > filters.mileageMax)
        return false;
      if (filters.specs && l.specs !== filters.specs) return false;
    }

    if (isProp) {
      if (filters.priceMin != null && (l.price || 0) < filters.priceMin)
        return false;
      if (filters.priceMax != null && (l.price || 0) > filters.priceMax)
        return false;
      if (filters.areaMin != null && (l.areaSqft || 0) < filters.areaMin)
        return false;
      if (filters.areaMax != null && (l.areaSqft || 0) > filters.areaMax)
        return false;
    }

    return true;
  });

  return (
    <div className="hz-page">
      <div className="hz-page-header">
        <button className="hz-back-btn" onClick={onBack}>
          <ChevronLeft />
        </button>
        <h2>{getLabel(cat, lang)}</h2>
      </div>

      <AdBanner lang={lang} />

      {isMotors && (
        <MotorsFilters lang={lang} filters={filters} setFilters={setFilters} />
      )}

      {isProp && (
        <PropertyFilters lang={lang} filters={filters} setFilters={setFilters} />
      )}

      <div className="hz-grid">
        {filtered.map((l) => (
          <ListingCard
            key={l.id}
            item={l}
            fav={!!favs[l.id]}
            onToggleFav={toggleFav}
            onOpen={onOpenListing}
            lang={lang}
          />
        ))}
      </div>
    </div>
  );
}

/* HOME GRID */

function HomeGrid({
  lang,
  favs,
  listings,
  toggleFav,
  onOpenCategory,
  onOpenListing,
}) {
  const S = STRINGS[lang];

  return (
    <div className="hz-page">
      <div className="hz-cat-grid">
        {CATEGORY_DEFS.map((c) => {
          const Icon = c.icon;
          return (
            <button
              key={c.key}
              className="hz-cat-pill"
              onClick={() => onOpenCategory(c.key)}
            >
              <div className="hz-cat-icon-wrap">
                <Icon size={22} />
              </div>
              <div className="hz-cat-label-wrap">
                <span>{getLabel(c, lang)}</span>
              </div>
              <ChevronRight size={18} className="hz-cat-arrow" />
            </button>
          );
        })}
      </div>

      <PromoCarousel />

      <div className="hz-fee-note">{S.feeNote}</div>

      <div className="hz-section-header">
        <h3>{S.latestListings}</h3>
        <button className="hz-see-all">{S.seeAll}</button>
      </div>

      <div className="hz-grid">
        {listings.map((l) => (
          <ListingCard
            key={l.id}
            item={l}
            fav={!!favs[l.id]}
            onToggleFav={toggleFav}
            onOpen={onOpenListing}
            lang={lang}
          />
        ))}
      </div>
    </div>
  );
}

/* LISTING DETAIL */

function ListingDetail({ item, onBack, lang }) {
  const S = STRINGS[lang];
  const localizedTitle =
    lang === "ar" && item.titleAr ? item.titleAr : item.title;
  const localizedDesc = lang === "ar" && item.descAr ? item.descAr : item.desc;
  const localizedLocation =
    lang === "ar" && item.locationAr ? item.locationAr : item.location;

  const imgs = item.imgs && item.imgs.length ? item.imgs : [];
  const [index, setIndex] = useState(0);

  function go(delta) {
    if (!imgs.length) return;
    setIndex((prev) => {
      const next = prev + delta;
      if (next < 0) return imgs.length - 1;
      if (next >= imgs.length) return 0;
      return next;
    });
  }

  function goTo(i) {
    if (!imgs.length) return;
    setIndex(i);
  }

  return (
    <div className="hz-detail">
      <button className="hz-detail-back" onClick={onBack}>
        <ChevronLeft size={20} />
      </button>

      <div className="hz-detail-gallery">
        {imgs.length > 0 && (
          <>
            <div
              className="hz-detail-img-main"
              onClick={() => {
                if (imgs.length > 1) go(1);
              }}
            >
              <img
                src={imgs[index]}
                alt={localizedTitle}
                className="hz-detail-img"
              />

              {imgs.length > 1 && (
                <>
                  <button
                    type="button"
                    className="hz-detail-arrow hz-detail-arrow-left"
                    onClick={(e) => {
                      e.stopPropagation();
                      go(-1);
                    }}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    className="hz-detail-arrow hz-detail-arrow-right"
                    onClick={(e) => {
                      e.stopPropagation();
                      go(1);
                    }}
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>

            {imgs.length > 1 && (
              <div className="hz-detail-dots">
                {imgs.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={
                      "hz-detail-dot-btn " +
                      (i === index ? "hz-detail-dot-active" : "")
                    }
                    onClick={() => goTo(i)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <div className="hz-detail-body">
        <div className="hz-detail-price">
          {item.currency}{" "}
          {item.price != null ? item.price.toLocaleString() : ""}
        </div>
        <div className="hz-detail-title">{localizedTitle}</div>

        <div className="hz-detail-meta-row">
          {item.year && <span>{item.year}</span>}
          {item.mileage != null && (
            <span>{item.mileage.toLocaleString()} km</span>
          )}
          {item.specs && <span>{item.specs}</span>}
          {item.areaSqft && <span>{item.areaSqft} sqft</span>}
          {localizedLocation && (
            <span className="hz-detail-loc">
              <MapPin size={12} />
              {localizedLocation}
            </span>
          )}
        </div>

        <div className="hz-detail-section-title">{S.detailsOverview}</div>

        <div className="hz-detail-overview">
          {item.brand && (
            <div className="hz-detail-row">
              <span>Brand</span>
              <span>{item.brand}</span>
            </div>
          )}
          {item.model && (
            <div className="hz-detail-row">
              <span>Model</span>
              <span>{item.model}</span>
            </div>
          )}
          {item.sellerType && (
            <div className="hz-detail-row">
              <span>Seller</span>
              <span>{item.sellerType}</span>
            </div>
          )}
          {item.areaSqft && (
            <div className="hz-detail-row">
              <span>Area</span>
              <span>{item.areaSqft} sqft</span>
            </div>
          )}
        </div>

        <div className="hz-detail-desc">
          {localizedDesc ||
            "Listing description will appear here with all relevant details provided by the seller."}
        </div>

        <div className="hz-detail-contact">
          <WhatsAppButton number={item.whatsapp} title={localizedTitle} />
        </div>
      </div>
    </div>
  );
}



/* ACCOUNT PAGE */

function AccountPage({ user, listings })
{
  const displayName = (user && user.name) || "Huzzlie User";

  const [section, setSection] = useState("menu");
    const userKey = (user && user.email) || "demo@huzzlie.com";
  const myAds = (listings || []).filter((l) => l.ownerId === userKey);


  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    nationality: "",
    gender: "",
  });

  const [publicProfile, setPublicProfile] = useState({
    bio: "",
  });

  const [contact, setContact] = useState({
    phone: "",
    altPhone: "",
    city: "",
    address: "",
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

    const [settings, setSettings] = useState({
    language: "auto", // "auto", "ar", "en"
    emailUpdates: true,
    whatsappUpdates: true,
    showPublicProfile: true,
    showPhoneOnAds: true,
  });


  function SectionShell({ title, children }) {
    return (
      <div className="hz-page hz-account-section">
        <div className="hz-account-section-header">
          <button
            className="hz-back-btn"
            onClick={() => setSection("menu")}
          >
            <ChevronLeft />
          </button>
          <h2>{title}</h2>
        </div>
        <div className="hz-account-section-body">{children}</div>
      </div>
    );
  }

  if (section === "profile") {
    return (
      <SectionShell title="Profile & basic info">
        <div className="hz-field">
          <label>First name</label>
          <input
            value={profile.firstName}
            onChange={(e) =>
              setProfile((p) => ({ ...p, firstName: e.target.value }))
            }
          />
        </div>
        <div className="hz-field">
          <label>Last name</label>
          <input
            value={profile.lastName}
            onChange={(e) =>
              setProfile((p) => ({ ...p, lastName: e.target.value }))
            }
          />
        </div>
        <div className="hz-field">
          <label>Date of birth</label>
          <input
            type="date"
            value={profile.dob}
            onChange={(e) =>
              setProfile((p) => ({ ...p, dob: e.target.value }))
            }
          />
        </div>
        <div className="hz-field">
          <label>Nationality</label>
          <input
            value={profile.nationality}
            onChange={(e) =>
              setProfile((p) => ({ ...p, nationality: e.target.value }))
            }
          />
        </div>
        <div className="hz-field">
          <label>Gender</label>
          <select
            value={profile.gender}
            onChange={(e) =>
              setProfile((p) => ({ ...p, gender: e.target.value }))
            }
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Prefer not to say</option>
          </select>
        </div>
        <div className="hz-account-section-actions">
          <button
            className="hz-primary"
            onClick={() => alert("Profile saved (demo).")}
          >
            Save changes
          </button>
        </div>
      </SectionShell>
    );
  }

  if (section === "public") {
    return (
      <SectionShell title="My public profile">
        <div className="hz-field">
          <label>About you (visible to others)</label>
          <textarea
            rows={3}
            value={publicProfile.bio}
            onChange={(e) =>
              setPublicProfile((p) => ({ ...p, bio: e.target.value }))
            }
          />
        </div>
        <div className="hz-account-section-actions">
          <button
            className="hz-primary"
            onClick={() => alert("Public profile saved (demo).")}
          >
            Save changes
          </button>
        </div>
      </SectionShell>
    );
  }

  if (section === "contact") {
    return (
      <SectionShell title="Phone numbers & addresses">
        <div className="hz-field">
          <label>Primary phone number</label>
          <input
            value={contact.phone}
            onChange={(e) =>
              setContact((c) => ({ ...c, phone: e.target.value }))
            }
            placeholder="+9639xxxxxxx"
          />
        </div>
        <div className="hz-field">
          <label>Alternate phone (optional)</label>
          <input
            value={contact.altPhone}
            onChange={(e) =>
              setContact((c) => ({ ...c, altPhone: e.target.value }))
            }
          />
        </div>
        <div className="hz-field">
          <label>City</label>
          <input
            value={contact.city}
            onChange={(e) =>
              setContact((c) => ({ ...c, city: e.target.value }))
            }
          />
        </div>
        <div className="hz-field">
          <label>Address (not visible to other users)</label>
          <textarea
            rows={2}
            value={contact.address}
            onChange={(e) =>
              setContact((c) => ({ ...c, address: e.target.value }))
            }
          />
        </div>
        <div className="hz-account-section-actions">
          <button
            className="hz-primary"
            onClick={() => alert("Contact details saved (demo).")}
          >
            Save changes
          </button>
        </div>
      </SectionShell>
    );
  }

  if (section === "security") {
    return (
      <SectionShell title="Password & security">
        <div className="hz-field">
          <label>Current password</label>
          <input
            type="password"
            value={security.currentPassword}
            onChange={(e) =>
              setSecurity((s) => ({ ...s, currentPassword: e.target.value }))
            }
          />
        </div>
        <div className="hz-field">
          <label>New password</label>
          <input
            type="password"
            value={security.newPassword}
            onChange={(e) =>
              setSecurity((s) => ({ ...s, newPassword: e.target.value }))
            }
          />
        </div>
                <div className="hz-field">
          <label>Confirm new password</label>
          <input
            type="password"
            value={security.confirmPassword}
            onChange={(e) =>
              setSecurity((s) => ({
                ...s,
                confirmPassword: e.target.value,
              }))
            }
          />
        </div>

        <div className="hz-forgot-password-row">
          <button
            type="button"
            className="hz-link-button"
            onClick={() => {
              const target = (user && user.email) || "your email";
              alert(
                `In the real app, a reset code would be emailed to ${target}.`
              );
            }}
          >
            Forgot your password?
          </button>
        </div>

        <div className="hz-account-section-actions">
          <button
            className="hz-primary"
            onClick={() => alert("Password updated (demo).")}
          >
            Update password
          </button>
        </div>

      </SectionShell>
    );
  }

  if (section === "deactivate") {
    return (
      <SectionShell title="Deactivate / delete account">
        <p className="hz-account-warning">
          You can temporarily deactivate your account or permanently delete it.
          This is a demo only – no real deletion happens yet.
        </p>
        <div className="hz-account-section-actions hz-account-danger-actions">
          <button
            className="hz-secondary"
            onClick={() => alert("Account deactivated (demo).")}
          >
            Deactivate account
          </button>
          <button
            className="hz-danger"
            onClick={() => alert("Account deleted (demo).")}
          >
            Delete account
          </button>
        </div>
      </SectionShell>
    );
  }

    if (section === "myAds") {
    return (
      <SectionShell title="My ads">
        {myAds.length === 0 ? (
          <div className="hz-empty-state">
            You don’t have any live ads yet.
          </div>
        ) : (
          <div className="hz-myads-list">
            {myAds.map((ad) => (
              <div key={ad.id} className="hz-myads-item">
                <div className="hz-myads-main">
                  <div className="hz-myads-title">{ad.title}</div>
                  <div className="hz-myads-meta">
                    {ad.currency}{" "}
                    {ad.price != null ? ad.price.toLocaleString() : 0} ·{" "}
                    {ad.location || "Damascus"}
                  </div>
                </div>
                <div className="hz-myads-status">Live</div>
              </div>
            ))}
          </div>
        )}
      </SectionShell>
    );
  }

  if (section === "settings") {
    return (
      <SectionShell title="Account settings">
        <div className="hz-field">
          <label>Preferred language</label>
          <select
            value={settings.language}
            onChange={(e) =>
              setSettings((s) => ({ ...s, language: e.target.value }))
            }
          >
            <option value="auto">Match app language</option>
            <option value="ar">Arabic</option>
            <option value="en">English</option>
          </select>
        </div>

        <div className="hz-account-settings-group">
          <div className="hz-account-settings-title">Notifications</div>
          <label className="hz-toggle-row">
            <input
              type="checkbox"
              checked={settings.emailUpdates}
              onChange={(e) =>
                setSettings((s) => ({
                  ...s,
                  emailUpdates: e.target.checked,
                }))
              }
            />
            <span>Email updates about my ads</span>
          </label>
          <label className="hz-toggle-row">
            <input
              type="checkbox"
              checked={settings.whatsappUpdates}
              onChange={(e) =>
                setSettings((s) => ({
                  ...s,
                  whatsappUpdates: e.target.checked,
                }))
              }
            />
            <span>WhatsApp alerts for new messages</span>
          </label>
        </div>

        <div className="hz-account-settings-group">
          <div className="hz-account-settings-title">Privacy</div>
          <label className="hz-toggle-row">
            <input
              type="checkbox"
              checked={settings.showPublicProfile}
              onChange={(e) =>
                setSettings((s) => ({
                  ...s,
                  showPublicProfile: e.target.checked,
                }))
              }
            />
            <span>Show my public profile to other users</span>
          </label>
          <label className="hz-toggle-row">
            <input
              type="checkbox"
              checked={settings.showPhoneOnAds}
              onChange={(e) =>
                setSettings((s) => ({
                  ...s,
                  showPhoneOnAds: e.target.checked,
                }))
              }
            />
            <span>Show phone number on my ads</span>
          </label>
        </div>

        <div className="hz-account-section-actions">
          <button
            className="hz-primary"
            onClick={() =>
              alert("Account settings saved (demo – backend to come).")
            }
          >
            Save settings
          </button>
        </div>
      </SectionShell>
    );
  }


  // MAIN ACCOUNT MENU
  return (
    <div className="hz-page hz-account">
      <div className="hz-account-card">
        <div className="hz-account-avatar">
          <UserCircle size={42} />
        </div>
        <div className="hz-account-main">
          <div className="hz-account-name">{displayName}</div>
          <div className="hz-account-joined">Member since July 2023</div>
        </div>
        <button
          className="hz-account-verify"
          onClick={() => alert("Verification flow coming soon (demo).")}
        >
          Get Verified
        </button>
      </div>

      <div className="hz-account-actions">
        <button
          className="hz-account-action"
          onClick={() => setSection("public")}
        >
          <Bookmark size={20} />
          <span>My public profile</span>
        </button>
                <button
          className="hz-account-action"
          onClick={() => setSection("myAds")}
        >
          <Search size={20} />
          <span>My ads</span>
        </button>

      </div>

      <div className="hz-account-list">
        <button
          className="hz-account-item"
          onClick={() => setSection("profile")}
        >
          <User size={18} />
          <span>Profile & basic info</span>
        </button>

        <button
          className="hz-account-item"
          onClick={() => setSection("contact")}
        >
          <Phone size={18} />
          <span>Phone numbers & addresses</span>
        </button>

        <button
          className="hz-account-item"
          onClick={() => setSection("security")}
        >
          <Shield size={18} />
          <span>Password & security</span>
        </button>

                <button
          className="hz-account-item"
          onClick={() => setSection("myAds")}
        >
          <Bookmark size={18} />
          <span>My ads status</span>
        </button>


        <button
          className="hz-account-item"
          onClick={() => alert("Notifications settings (demo).")}
        >
          <Bell size={18} />
          <span>Notifications & email settings</span>
        </button>

        <button
  className="hz-account-item"
  onClick={() => setSection("settings")}
>
  <Settings size={18} />
  <span>Account settings</span>
</button>

        <button
          className="hz-account-item hz-account-danger"
          onClick={() => setSection("deactivate")}
        >
          <Trash2 size={18} />
          <span>Deactivate / delete account</span>
        </button>

        <button
          className="hz-account-item"
          onClick={() => alert("Logged out (demo).")}
        >
          <LogOut size={18} />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
}


/* ACCOUNT SHEET */

function AccountSheet({ open, onClose, setUser, lang }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Language strings
  const S = STRINGS[lang || "ar"];

  if (!open) return null;

  const providers = [
    { key: "google", label: S.continueGoogle || "Continue with Google" },
    {
      key: "microsoft",
      label:
        S.continueMicrosoft || "Continue with Microsoft (Hotmail/Outlook)",
    },
    { key: "apple", label: S.continueApple || "Continue with Apple" },
  ];

  function completeWithProvider(key) {
    const displayName = name || key.toUpperCase() + " User";
    const displayEmail = email || key + "@huzzlie.com";
    setUser({ name: displayName, email: displayEmail });
    onClose();
  }

  function completeManual() {
    if (!name && !email) return;
    setUser({
      name: name || "Huzzlie User",
      email: email || "user@huzzlie.com",
    });
    onClose();
  }

  return (
    <div className="hz-modal-backdrop">
      <div className="hz-modal">
        <div className="hz-modal-header">
          <h3>{S.createAccount || "Create Account"}</h3>
          <button className="hz-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="hz-modal-body">
          {/* 🔥 Inline message (instead of browser alert) */}
          <div className="hz-account-note">
            {S.createAccountToPost || "Please create an account before posting."}
          </div>

          {providers.map((p) => (
            <button
              key={p.key}
              className="hz-provider-btn"
              onClick={() => completeWithProvider(p.key)}
            >
              {p.label}
            </button>
          ))}

          <div className="hz-or">{S.or || "or"}</div>

          <div className="hz-field">
            <label>{S.nameLabel || "Name"}</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={S.namePlaceholder || "Your name"}
            />
          </div>

          <div className="hz-field">
            <label>{S.emailLabel || "Email"}</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={S.emailPlaceholder || "you@example.com"}
            />
          </div>
        </div>

        <div className="hz-modal-footer">
          <button className="hz-secondary" onClick={onClose}>
            {S.cancel || "Cancel"}
          </button>

          <button className="hz-primary" onClick={completeManual}>
            {S.save || "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}


/* POST DIALOG */

function PostDialog({ open, onClose, lang, onCreateListing, userEmail }) {

  const S = STRINGS[lang];

  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [title, setTitle] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [price, setPrice] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [sellerType, setSellerType] = useState("");
  const [mileage, setMileage] = useState("");
  const [vin, setVin] = useState("");
  const [specs, setSpecs] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [desc, setDesc] = useState("");
  const [descAr, setDescAr] = useState("");
  const [images, setImages] = useState([]);

  if (!open) return null;

  const catDef = CATEGORY_DEFS.find((c) => c.key === category);
  const fee = postingFeeFor(category, subcategory);

  function onImagesChange(e) {
    const files = Array.prototype.slice.call(e.target.files || []);
    setImages(files);
  }

  function resetForm() {
    setCategory("");
    setSubcategory("");
    setTitle("");
    setTitleAr("");
    setPrice("");
    setWhatsapp("");
    setBrand("");
    setModel("");
    setYear("");
    setSellerType("");
    setMileage("");
    setVin("");
    setSpecs("");
    setCity("");
    setArea("");
    setDesc("");
    setDescAr("");
    setImages([]);
  }

  function handleSubmit() {
    if (!title || !category || !subcategory || !whatsapp) {
      alert("Please fill title, category, subcategory & WhatsApp.");
      return;
    }

    const baseListing = {
      category,
      subcategory,
      brand: brand || undefined,
      model: model || undefined,
      year: year ? Number(year) : undefined,
      sellerType: sellerType || undefined,
      mileage: mileage ? Number(mileage) : undefined,
      vin: vin || undefined,
      specs: specs || undefined,
    };

    if (!validateCarListing(baseListing)) {
      alert(
        "For Cars, brand, model, year, specs, seller, mileage & VIN are required."
      );
      return;
    }

    const imgUrls =
      images && images.length
        ? images.map((file) => URL.createObjectURL(file))
        : [
            "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1200&auto=format&fit=crop",
          ];

        const newListing = {
      id: "user-" + Date.now(),
      ownerId: userEmail || "demo@huzzlie.com",
      title,
      titleAr: titleAr || undefined,
      price: price ? Number(price) : 0,
      currency: "USD",
      category,
      subcategory,
      location: city || "Damascus",
      locationAr: SYRIA_CITIES.find((c) => c.en === city)?.ar || undefined,
      areaSqft: isAnyProperty(category) && area ? Number(area) : undefined,
      whatsapp,
      brand: baseListing.brand,
      model: baseListing.model,
      year: baseListing.year,
      sellerType: baseListing.sellerType,
      mileage: baseListing.mileage,
      vin: baseListing.vin,
      specs: baseListing.specs,
      desc,
      descAr: descAr || undefined,
      imgs: imgUrls,
      featured: false,
    };


    if (typeof onCreateListing === "function") {
      onCreateListing(newListing);
    }

    alert(
      "Listing created. " +
        (fee.amount
          ? "A $" + fee.amount + " fee would apply (" + fee.reason + ") in production."
          : "This category is free to post.")
    );

    resetForm();
    onClose();
  }

  return (
    <div className="hz-modal-backdrop">
      <div className="hz-modal hz-modal-large hz-post-modal">

        <div className="hz-modal-header">
          <h3>{S.placeListing}</h3>
          <button className="hz-close" onClick={onClose}>
            ×
          </button>
        </div>
                <div className="hz-modal-body">

                  <div className="hz-field hz-field-full hz-post-intro">
          <div className="hz-post-title">
            {isCar(category, subcategory)
              ? lang === "ar"
                ? "أخبرنا عن سيارتك"
                : "Tell us about your car"
              : lang === "ar"
              ? "تفاصيل الإعلان"
              : "Listing details"}
          </div>
          <div className="hz-post-subtitle">
            {lang === "ar"
              ? "املأ الحقول التالية بدقة لزيادة فرص بيع إعلانك."
              : "Fill in the details carefully to get better results."}
          </div>
        </div>

          <div className="hz-field">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSubcategory("");
              }}
            >
              <option value="">
                {lang === "ar" ? "اختر القسم" : "Select category"}
              </option>
              {CATEGORY_DEFS.map((c) => (
                <option key={c.key} value={c.key}>
                  {getLabel(c, lang)}
                </option>
              ))}
            </select>
          </div>

          <div className="hz-field">
            <label>Subcategory</label>
            <select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              disabled={!catDef}
            >
              <option value="">
                {catDef
                  ? lang === "ar"
                    ? "اختر القسم الفرعي"
                    : "Select subcategory"
                  : lang === "ar"
                  ? "اختر القسم أولاً"
                  : "Select category first"}
              </option>
              {catDef &&
                catDef.subcategories &&
                catDef.subcategories.map((s) => (
                  <option key={s.key} value={s.key}>
                    {getLabel(s, lang)}
                  </option>
                ))}
            </select>
          </div>

          <div className="hz-field">
            <label>Title (EN)</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Listing title"
            />
          </div>

          <div className="hz-field">
            <label>Title (AR)</label>
            <input
              value={titleAr}
              onChange={(e) => setTitleAr(e.target.value)}
              placeholder="عنوان الإعلان بالعربية"
            />
          </div>

          <div className="hz-field">
            <label>Price (optional)</label>
            <input
              type="text"
              inputMode="numeric"
              value={price}
              onChange={(e) => setPrice(e.target.value.replace(/[^\d]/g, ""))}
              placeholder="Price"
            />
          </div>

          <div className="hz-field">
            <label>WhatsApp</label>
            <input
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="+9639xxxxxxxx"
            />
          </div>

          <div className="hz-field">
            <label>City</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">
                {lang === "ar" ? "اختر المدينة" : "Select city"}
              </option>
              {SYRIA_CITIES.map((c) => (
                <option key={c.en} value={c.en}>
                  {lang === "ar" ? c.ar : c.en}
                </option>
              ))}
            </select>
          </div>

          {isCar(category, subcategory) && (
            <>
              <div className="hz-field">
                <label>Brand</label>
                <input
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="e.g. Mercedes"
                />
              </div>
              <div className="hz-field">
                <label>Model</label>
                <input
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="e.g. C-Class"
                />
              </div>
              <div className="hz-field">
                <label>Year</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={year}
                  onChange={(e) =>
                    setYear(e.target.value.replace(/[^\d]/g, ""))
                  }
                />
              </div>
              <div className="hz-field">
                <label>Seller</label>
                <select
                  value={sellerType}
                  onChange={(e) => setSellerType(e.target.value)}
                >
                  <option value="">
                    {lang === "ar" ? "اختر نوع البائع" : "Select"}
                  </option>
                  <option value="private">
                    {lang === "ar" ? "فرد" : "Private"}
                  </option>
                  <option value="dealership">
                    {lang === "ar" ? "معرض" : "Dealership"}
                  </option>
                </select>
              </div>
              <div className="hz-field">
                <label>Mileage (km)</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={mileage}
                  onChange={(e) =>
                    setMileage(e.target.value.replace(/[^\d]/g, ""))
                  }
                />
              </div>
              <div className="hz-field">
                <label>Specs</label>
                <input
                  value={specs}
                  onChange={(e) => setSpecs(e.target.value)}
                  placeholder="e.g. GCC"
                />
              </div>
              <div className="hz-field">
                <label>VIN</label>
                <input
                  value={vin}
                  onChange={(e) => setVin(e.target.value)}
                  placeholder="Vehicle VIN"
                />
              </div>
            </>
          )}

          {isAnyProperty(category) && (
            <div className="hz-field">
              <label>{lang === "ar" ? "المساحة (قدم²)" : "Area (sqft)"}</label>
              <input
                type="text"
                inputMode="numeric"
                value={area}
                onChange={(e) =>
                  setArea(e.target.value.replace(/[^\d]/g, ""))
                }
              />
            </div>
          )}

          <div className="hz-field hz-field-full">
            <label>Images</label>
            <input type="file" multiple accept="image/*" onChange={onImagesChange} />
            {images && images.length ? (
              <div className="hz-images-count">
                {images.length} file(s) selected
              </div>
            ) : null}
          </div>

          <div className="hz-field hz-field-full">
            <label>Description (EN)</label>
            <textarea
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Details about your listing..."
            />
          </div>

          <div className="hz-field hz-field-full">
            <label>Description (AR)</label>
            <textarea
              rows={3}
              value={descAr}
              onChange={(e) => setDescAr(e.target.value)}
              placeholder="تفاصيل الإعلان بالعربية..."
            />
          </div>
        </div>

        <div className="hz-modal-footer">
          <div className="hz-fee-label">
            {fee.amount
              ? "Posting fee: $" + fee.amount + " (" + fee.reason + ")"
              : "This category is free to post."}
          </div>
          <div className="hz-modal-actions">
            <button className="hz-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="hz-primary" onClick={handleSubmit}>
              Pay &amp; Post (mock)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function IntroScreen() {
  return (
    <div className="hz-intro-root">
      <img src="/huzzlie-logo.png" alt="Logo" className="hz-intro-logo" />
    </div>
  );
}


/* ROOT APP */

function BottomNav({ activeTab, setActiveTab }) {
  const isActive = (tab) => (activeTab === tab ? "hz-nav-item active" : "hz-nav-item");

  return (
    <div className="hz-bottom-nav">
      <button className={isActive("home")} onClick={() => setActiveTab("home")}>
        <Home size={20} />
        <span>الرئيسية</span>
      </button>

      <button className={isActive("fav")} onClick={() => setActiveTab("fav")}>
        <Heart size={20} />
        <span>المفضلة</span>
      </button>

      <button className={isActive("post")} onClick={() => setActiveTab("post")}>
        <PlusCircle size={24} />
        <span>إضافة إعلان</span>
      </button>

      <button className={isActive("account")} onClick={() => setActiveTab("account")}>
        <User size={20} />
        <span>الحساب</span>
      </button>
    </div>
  );
}


export default function App() {
    const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 900);
    return () => clearTimeout(timer);
  }, []);
  

  const [lang, setLang] = useState("ar"); // set to "ar" if you want Arabic by default
  const [activeTab, setActiveTab] = useState("home");
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const [postOpen, setPostOpen] = useState(false);
  const [favs, setFavs] = useState({});
  const [activeCategoryKey, setActiveCategoryKey] = useState(null);
  const [activeSub, setActiveSub] = useState("");
  const [selectedListing, setSelectedListing] = useState(null);
  const [listings, setListings] = useState(MOCK_LISTINGS);

  function toggleFav(id) {
    setFavs((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function openCategory(key) {
    setActiveCategoryKey(key);
    const cat = CATEGORY_DEFS.find((c) => c.key === key);
    const firstSub =
      cat && cat.subcategories && cat.subcategories.length
        ? cat.subcategories[0].key
        : "";
    setActiveSub(firstSub);
    setSelectedListing(null);
    setSearchTerm("");
  }

  function handleBackFromCategory() {
    setActiveCategoryKey(null);
    setSelectedListing(null);
  }

  function handlePostClick() {
  if (!user) {
    setAccountOpen(true);
    return;
  }
  setPostOpen(true);
}


  function handleCreateListing(newListing) {
    setListings((prev) => [newListing, ...prev]);
    setActiveTab("home");
    setActiveCategoryKey(null);
    setSelectedListing(null);
  }

  function handleSearch() {
    const term = search.trim().toLowerCase();
    setSearchTerm(term);
    setActiveCategoryKey(null);
    setSelectedListing(null);
    setActiveTab("home");
  }

  const activeCategory =
    activeCategoryKey && CATEGORY_DEFS.find((c) => c.key === activeCategoryKey);

  const favListings = listings.filter((l) => favs[l.id]);

  const searchResults = searchTerm
    ? listings.filter((l) => {
        const term = searchTerm;
        const fields = [
          l.title,
          l.titleAr,
          l.desc,
          l.descAr,
          l.brand,
          l.model,
          l.location,
          l.locationAr,
          l.category,
          l.subcategory,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return fields.includes(term);
      })
    : [];

  const showHome = !activeCategory && activeTab === "home" && !searchTerm;
  const showFavs = !activeCategory && activeTab === "favs";

    if (showIntro) {
    return <IntroScreen />;
  }


  return (
    <div className="hz-root">
      <Header
  q={search}
  setQ={setSearch}
  onSearch={handleSearch}
  lang={lang}
  setLang={setLang}
  disableEnterSearch={accountOpen || postOpen}
  onLogoClick={() => {
    setActiveTab("home");
    setActiveCategoryKey(null);
    setSelectedListing(null);
    setSearchTerm("");
  }}
/>



      <main className="hz-main">
        {selectedListing ? (
          <ListingDetail
            item={selectedListing}
            onBack={() => setSelectedListing(null)}
            lang={lang}
          />
        ) : (
          <>
            {activeCategory && (
              <CategoryPage
                cat={activeCategory}
                listings={listings}
                favs={favs}
                toggleFav={toggleFav}
                onBack={handleBackFromCategory}
                activeSub={activeSub}
                lang={lang}
                onOpenListing={(item) => setSelectedListing(item)}
              />
            )}

            {!activeCategory && searchTerm && (
              <div className="hz-page">
                <div className="hz-section-header">
                  <h3>
                    {STRINGS[lang].searchResults} "{search}"
                  </h3>
                </div>
                {searchResults.length ? (
                  <div className="hz-grid">
                    {searchResults.map((l) => (
                      <ListingCard
                        key={l.id}
                        item={l}
                        fav={!!favs[l.id]}
                        onToggleFav={toggleFav}
                        onOpen={(item) => setSelectedListing(item)}
                        lang={lang}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="hz-no-results">
                    {STRINGS[lang].searchNoResults}
                  </div>
                )}
              </div>
            )}

            {showHome && (
              <HomeGrid
                lang={lang}
                favs={favs}
                listings={listings}
                toggleFav={toggleFav}
                onOpenCategory={openCategory}
                onOpenListing={(item) => setSelectedListing(item)}
              />
            )}

            {showFavs && (
              <div className="hz-page">
                <div className="hz-section-header">
                  <h3>{STRINGS[lang].favourites}</h3>
                </div>
                <div className="hz-grid">
                  {favListings.map((l) => (
                    <ListingCard
                      key={l.id}
                      item={l}
                      fav={!!favs[l.id]}
                      onToggleFav={toggleFav}
                      onOpen={(item) => setSelectedListing(item)}
                      lang={lang}
                    />
                  ))}
                </div>
              </div>
            )}

                       {activeTab === "account" && user && (
              <AccountPage user={user} listings={listings} />
            )}

          </>
        )}
      </main>

      <BottomNav
        active={activeTab}
        setActive={(tab) => {
          if (tab === "post") {
            handlePostClick();
            return;
          }
          if (tab === "account") {
            if (!user) {
              setAccountOpen(true);
              return;
            }
          }
          setActiveTab(tab);
          if (tab !== "home") {
            setActiveCategoryKey(null);
            setSelectedListing(null);
            setSearchTerm("");
          }
          if (tab === "home") {
            setActiveCategoryKey(null);
            setSelectedListing(null);
          }
        }}
        onPost={handlePostClick}
        onAccount={() => {
          if (!user) {
            setAccountOpen(true);
          } else {
            setActiveTab("account");
            setActiveCategoryKey(null);
            setSelectedListing(null);
            setSearchTerm("");
          }
        }}
        lang={lang}
      />

      <AccountSheet
        open={accountOpen}
        onClose={() => setAccountOpen(false)}
        setUser={setUser}
      />

            <PostDialog
        open={postOpen}
        onClose={() => setPostOpen(false)}
        lang={lang}
        onCreateListing={handleCreateListing}
        userEmail={user?.email}
      />

    </div>
  );
}
