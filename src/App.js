import { supabase } from "./supabaseClient";

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
    feeNote: "All listings are currently free to post for every category.",
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
    feeNote: "جميع الإعلانات مجانية حالياً في كل الأقسام.",
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

/* BASIC HELPERS */

function isCar(categoryKey, subKey) {
  return categoryKey === "motors" && subKey === "cars";
}
function isAnyProperty(categoryKey) {
  return !!CATEGORY_DEFS.find((c) => c.isProperty && c.key === categoryKey);
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

          <button type="button" className="hz-search-btn" onClick={onSearch}>
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
    city: t("City", "المدينة"),
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
  const [draftCity, setDraftCity] = useState(filters.city || "");

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
    setDraftCity(filters.city || "");
  }, [
    filters.brand,
    filters.sellerType,
    filters.priceMin,
    filters.priceMax,
    filters.yearMin,
    filters.yearMax,
    filters.mileageMax,
    filters.specs,
    filters.city,
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
          filters.priceMax == null || filters.priceMax === PRICE_MAX
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
      city: draftCity || undefined,
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
    setDraftCity("");

    setFilters({
      brand: undefined,
      sellerType: undefined,
      priceMin: undefined,
      priceMax: undefined,
      yearMin: undefined,
      yearMax: undefined,
      mileageMax: undefined,
      specs: undefined,
      city: undefined,
    });
  }

  return (
    <div className="hz-filters">
      <div className="hz-filters-title">{STRINGS[lang].carsFilters}</div>

      {/* chips */}
      <div className="hz-filter-chips-scroll">
        {/* Brand */}
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

        {/* Seller */}
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

        {/* City */}
        <button
          className={chipClass("city")}
          onClick={() => toggleExpand("city")}
        >
          <span className="hz-filter-chip-label">
            {LABELS.city}
            {filters.city ? ` · ${filters.city}` : ""}
            <ChevronDown className="hz-filter-chip-arrow" />
          </span>
        </button>

        {/* Price */}
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

        {/* Year */}
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

        {/* KM */}
        <button className={chipClass("km")} onClick={() => toggleExpand("km")}>
          <span className="hz-filter-chip-label">
            {LABELS.km}
            {kmSummary ? ` · ${kmSummary}` : ""}
            <ChevronDown className="hz-filter-chip-arrow" />
          </span>
        </button>

        {/* Specs */}
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

          {expandedKey === "city" && (
            <div className="hz-field">
              <label>{LABELS.city}</label>
              <select
                value={draftCity}
                onChange={(e) => setDraftCity(e.target.value)}
              >
                <option value="">{t("Any city", "أي مدينة")}</option>
                {SYRIA_CITIES.map((c) => (
                  <option key={c.en} value={c.en}>
                    {isAr ? c.ar : c.en}
                  </option>
                ))}
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
                onChange={(e) => setDraftKmMax(cleanNumber(e.target.value))}
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
  const isAr = lang === "ar";
  const t = (en, ar) => (isAr ? ar : en);

  const LABELS = {
    city: t("City", "المدينة"),
    price: t("Price (USD)", "السعر (دولار)"),
    area: t("Area (sqft)", "المساحة (قدم²)"),
  };

  const PRICE_MIN = 0;
  const PRICE_MAX = 2000000;
  const AREA_MIN = 0;
  const AREA_MAX = 2000;

  const [expandedKey, setExpandedKey] = useState(null);

  // drafts
  const [draftCity, setDraftCity] = useState(filters.city || "");
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

  // sync drafts when parent filters reset
  useEffect(() => {
    setDraftCity(filters.city || "");
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
    filters.city,
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

  // summaries
  const priceSummary =
    filters.priceMin != null || filters.priceMax != null
      ? `${filters.priceMin ?? PRICE_MIN} - ${
          filters.priceMax == null || filters.priceMax === PRICE_MAX
            ? t("Any", "أي")
            : filters.priceMax
        }`
      : "";

  const areaSummary =
    filters.areaMin != null || filters.areaMax != null
      ? `${filters.areaMin ?? AREA_MIN}${
          filters.areaMax != null ? " - " + filters.areaMax : "+"
        }`
      : "";

  function applyFilters() {
    const pMin = parseOrUndefined(cleanNumber(draftPriceMin));
    const pMax = parseOrUndefined(cleanNumber(draftPriceMax));
    const aMin = parseOrUndefined(cleanNumber(draftAreaMin));
    const aMax = parseOrUndefined(cleanNumber(draftAreaMax));

    setFilters((f) => ({
      ...f,
      city: draftCity || undefined,
      priceMin:
        pMin == null
          ? undefined
          : Math.max(PRICE_MIN, Math.min(pMin, PRICE_MAX)),
      priceMax:
        pMax == null
          ? undefined
          : Math.max(PRICE_MIN, Math.min(pMax, PRICE_MAX)),
      areaMin:
        aMin == null
          ? undefined
          : Math.max(AREA_MIN, Math.min(aMin, AREA_MAX)),
      areaMax:
        aMax == null
          ? undefined
          : Math.max(AREA_MIN, Math.min(aMax, AREA_MAX)),
    }));
  }

  function clearAll() {
    setDraftCity("");
    setDraftPriceMin("");
    setDraftPriceMax("");
    setDraftAreaMin("");
    setDraftAreaMax("");

    setFilters({
      city: undefined,
      priceMin: undefined,
      priceMax: undefined,
      areaMin: undefined,
      areaMax: undefined,
    });
  }

  return (
    <div className="hz-filters">
      <div className="hz-filters-title">{STRINGS[lang].propertyFilters}</div>

      {/* chips */}
      <div className="hz-filter-chips-scroll">
        {/* City */}
        <button
          className={chipClass("city")}
          onClick={() => toggleExpand("city")}
        >
          <span className="hz-filter-chip-label">
            {LABELS.city}
            {filters.city ? ` · ${filters.city}` : ""}
            <ChevronDown className="hz-filter-chip-arrow" />
          </span>
        </button>

        {/* Price */}
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

        {/* Area */}
        <button
          className={chipClass("area")}
          onClick={() => toggleExpand("area")}
        >
          <span className="hz-filter-chip-label">
            {LABELS.area}
            {areaSummary ? ` · ${areaSummary}` : ""}
            <ChevronDown className="hz-filter-chip-arrow" />
          </span>
        </button>
      </div>

      {/* expanded panel */}
      {expandedKey && (
        <div className="hz-filter-panel" style={{ marginTop: 6 }}>
          {expandedKey === "city" && (
            <div className="hz-field">
              <label>{LABELS.city}</label>
              <select
                value={draftCity}
                onChange={(e) => setDraftCity(e.target.value)}
              >
                <option value="">{t("Any city", "أي مدينة")}</option>
                {SYRIA_CITIES.map((c) => (
                  <option key={c.en} value={c.en}>
                    {isAr ? c.ar : c.en}
                  </option>
                ))}
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

          {expandedKey === "area" && (
            <div className="hz-field">
              <label>{LABELS.area}</label>
              <div
                className="hz-range-inputs"
                style={{ display: "flex", gap: 6 }}
              >
                <input
                  type="text"
                  inputMode="numeric"
                  className="hz-input-scroller"
                  value={draftAreaMin}
                  onChange={(e) =>
                    setDraftAreaMin(cleanNumber(e.target.value))
                  }
                  placeholder={t("From", "من")}
                />
                <input
                  type="text"
                  inputMode="numeric"
                  className="hz-input-scroller"
                  value={draftAreaMax}
                  onChange={(e) =>
                    setDraftAreaMax(cleanNumber(e.target.value))
                  }
                  placeholder={t("To", "إلى")}
                />
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
      if (filters.city && l.city !== filters.city) return false;

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
      if (filters.city && l.city !== filters.city) return false;

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
        <PropertyFilters
          lang={lang}
          filters={filters}
          setFilters={setFilters}
        />
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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

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

  function onTouchStart(e) {
    if (!imgs.length) return;
    setTouchStartX(e.touches[0].clientX);
    setTouchEndX(null);
  }

  function onTouchMove(e) {
    if (!imgs.length) return;
    setTouchEndX(e.touches[0].clientX);
  }

  function onTouchEnd() {
    if (touchStartX == null || touchEndX == null) return;
    const diff = touchStartX - touchEndX;
    const threshold = 40;
    if (Math.abs(diff) > threshold) {
      if (diff > 0) go(1);
      else go(-1);
    }
    setTouchStartX(null);
    setTouchEndX(null);
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
                if (imgs.length) setLightboxOpen(true);
              }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
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

      {lightboxOpen && imgs.length > 0 && (
        <div
          className="hz-lightbox-overlay"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="hz-lightbox-inner"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <button
              type="button"
              className="hz-lightbox-close"
              onClick={() => setLightboxOpen(false)}
            >
              ×
            </button>

            <div className="hz-lightbox-img-wrap">
              <img
                src={imgs[index]}
                alt={localizedTitle}
                className="hz-lightbox-img"
              />

              {imgs.length > 1 && (
                <>
                  <button
                    type="button"
                    className="hz-lightbox-arrow hz-lightbox-arrow-left"
                    onClick={() => go(-1)}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    className="hz-lightbox-arrow hz-lightbox-arrow-right"
                    onClick={() => go(1)}
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ACCOUNT PAGE */

function AccountPage({
  user,
  listings,
  onDeleteListing,
  onLogout,
  onOpenListing,
}) {
  const displayName = (user && user.name) || "Huzzlie User";

  const [section, setSection] = useState("menu");

  // use real Supabase user id and DB user_id column
  const ownerId = user?.id;
  const myAds = (listings || []).filter((l) => l.user_id === ownerId);

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
          <label>Alternate phone (optional)</label>
          <input
            value={contact.altPhone}
            onChange={(e) => {
              let v = e.target.value.replace(/[^\d+]/g, "");
              if (v.indexOf("+") > 0) {
                v = v.replace(/\+/g, "");
              } else if (v.indexOf("+") === 0) {
                v = "+" + v.slice(1).replace(/\+/g, "");
              }
              setContact((c) => ({ ...c, altPhone: v }));
            }}
            inputMode="tel"
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
              setSecurity((s) => ({
                ...s,
                currentPassword: e.target.value,
              }))
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
            {myAds.map((ad) => {
              const thumb = ad.imgs && ad.imgs.length ? ad.imgs[0] : null;
              return (
                <div key={ad.id} className="hz-myads-item">
                  <div className="hz-myads-thumb-wrap">
                    {thumb ? (
                      <img
                        src={thumb}
                        alt={ad.title}
                        className="hz-myads-thumb"
                      />
                    ) : (
                      <div className="hz-myads-thumb-placeholder">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="hz-myads-main">
                    <div className="hz-myads-title">{ad.title}</div>
                    <div className="hz-myads-meta">
                      {ad.currency}{" "}
                      {ad.price != null ? ad.price.toLocaleString() : 0} ·{" "}
                      {ad.city || ad.location || "Damascus"}
                    </div>
                    <div className="hz-myads-status-row">
                      <span
                        className={
                          "hz-myads-status " +
                          (ad.status === "active"
                            ? "hz-myads-status-active"
                            : "hz-myads-status-muted")
                        }
                      >
                        {ad.status || "Active"}
                      </span>
                    </div>
                  </div>

                  <div className="hz-myads-actions">
                    <button
                      type="button"
                      className="hz-myads-view"
                      onClick={() => onOpenListing && onOpenListing(ad)}
                    >
                      View
                    </button>
                    <button
                      type="button"
                      className="hz-myads-delete"
                      onClick={() =>
                        onDeleteListing && onDeleteListing(ad.id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
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
        <button className="hz-account-item" onClick={onLogout}>
          <LogOut size={18} />
          <span>Log out</span>
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

        <button className="hz-account-item" onClick={onLogout}>
          <LogOut size={18} />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
}

/* ACCOUNT SHEET */

function AccountSheet({ open, onClose, setUser, lang, onGoogleLogin }) {
  const isAr = lang === "ar";
  const t = (en, ar) => (isAr ? ar : en);

  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!open) return null;

  async function handleEmailSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      if (mode === "login") {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        setUser(data.user);
        onClose();
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setUser(data.user);
        onClose();
      }
    } catch (err) {
      console.error("Auth error:", err);
      setErrorMsg(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="hz-account-sheet-overlay">
      <div className="hz-account-sheet">
        <button
          type="button"
          className="hz-account-close"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="hz-account-title">{t("Account", "الحساب")}</h2>

        {/* GOOGLE LOGIN BUTTON */}
        <div className="hz-oauth-section">
          <button
            type="button"
            className="hz-google-btn"
            onClick={onGoogleLogin}
          >
            {t("Continue with Google", "تسجيل باستخدام جوجل")}
          </button>
        </div>

        <div className="hz-account-separator">
          {t("or use email", "أو باستخدام البريد الإلكتروني")}
        </div>

        {/* EMAIL/PASSWORD FORM */}
        <form className="hz-account-form" onSubmit={handleEmailSubmit}>
          <div className="hz-toggle-row">
            <button
              type="button"
              className={
                "hz-toggle-btn " +
                (mode === "login" ? "hz-toggle-btn-active" : "")
              }
              onClick={() => setMode("login")}
            >
              {t("Login", "تسجيل الدخول")}
            </button>
            <button
              type="button"
              className={
                "hz-toggle-btn " +
                (mode === "signup" ? "hz-toggle-btn-active" : "")
              }
              onClick={() => setMode("signup")}
            >
              {t("Create account", "إنشاء حساب")}
            </button>
          </div>

          <div className="hz-field">
            <label>{t("Email", "البريد الإلكتروني")}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("you@example.com", "you@example.com")}
              required
            />
          </div>

          <div className="hz-field">
            <label>{t("Password", "كلمة المرور")}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("Your password", "كلمة المرور")}
              required
            />
          </div>

          {errorMsg && <div className="hz-error-text">{errorMsg}</div>}

          <button
            type="submit"
            className="hz-primary hz-account-submit"
            disabled={loading}
          >
            {loading
              ? t("Please wait…", "يرجى الانتظار…")
              : mode === "login"
              ? t("Login", "تسجيل الدخول")
              : t("Sign up", "إنشاء حساب")}
          </button>
        </form>
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
    // basic required fields
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

    const formValues = {
      title,
      description: desc,
      price: price ? Number(price) : null,
      category,
      subcategory,
      city,
      area: isAnyProperty(category) && area ? Number(area) : null,
      whatsapp,
      images,
    };

    if (typeof onCreateListing === "function") {
      onCreateListing(formValues);
    }

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
              onChange={(e) =>
                setPrice(e.target.value.replace(/[^\d]/g, ""))
              }
              placeholder="Price"
            />
          </div>

          <div className="hz-field">
            <label>WhatsApp</label>
            <input
              value={whatsapp}
              onChange={(e) => {
                let v = e.target.value.replace(/[^\d+]/g, "");
                // allow only one "+" at the start
                if (v.indexOf("+") > 0) {
                  v = v.replace(/\+/g, "");
                } else if (v.indexOf("+") === 0) {
                  v = "+" + v.slice(1).replace(/\+/g, "");
                }
                setWhatsapp(v);
              }}
              placeholder="+9639xxxxxxxx"
              inputMode="tel"
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
              <label>
                {lang === "ar" ? "المساحة (قدم²)" : "Area (sqft)"}
              </label>
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
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={onImagesChange}
            />
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
            {lang === "ar"
              ? "جميع الإعلانات مجانية حالياً، لن يتم خصم أي رسوم."
              : "All listings are free right now – no fees will be charged."}
          </div>
          <div className="hz-modal-actions">
            <button className="hz-secondary" onClick={onClose}>
              {lang === "ar" ? "إلغاء" : "Cancel"}
            </button>
            <button className="hz-primary" onClick={handleSubmit}>
              {lang === "ar" ? "نشر الإعلان" : "Post listing"}
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

/* BOTTOM NAV */

function BottomNav({ activeTab, onTabChange, onPost, onAccount, lang }) {
  const S = STRINGS[lang || "ar"];
  const isActive = (tab) =>
    activeTab === tab ? "hz-nav-item hz-nav-item-active" : "hz-nav-item";

  return (
    <div className="hz-bottom-nav">
      {/* HOME */}
      <button
        className={isActive("home")}
        onClick={() => onTabChange("home")}
      >
        <Home size={20} />
        <span>{S.home}</span>
      </button>

      {/* FAVOURITES */}
      <button
        className={isActive("favs")}
        onClick={() => onTabChange("favs")}
      >
        <Heart size={20} />
        <span>{S.favourites}</span>
      </button>

      {/* PLACE LISTING */}
      <button className="hz-nav-item hz-nav-post" onClick={onPost}>
        <PlusCircle size={24} />
        <span>{S.placeListing}</span>
      </button>

      {/* ACCOUNT */}
      <button
        className={isActive("account")}
        onClick={onAccount}
      >
        <User size={20} />
        <span>{S.account}</span>
      </button>
    </div>
  );
}

/* ROOT APP */

export default function App() {
  // --- STATE HOOKS ---
  const [showIntro, setShowIntro] = useState(true);
  const [lang, setLang] = useState("ar"); // Arabic by default
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
  const [listings, setListings] = useState([]);

  // --- SUPABASE AUTH: KEEP USER IN SYNC ---
  useEffect(() => {
    const init = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error getting session:", error);
      } else {
        setUser(data?.session?.user ?? null);
      }
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // --- LOAD LISTINGS FROM SUPABASE + HARD-DELETE OLDER THAN 30 DAYS ---
  useEffect(() => {
    async function loadListings() {
      // 1) Calculate cutoff (30 days ago)
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - 30);

      // 2) Hard-delete old listings from Supabase
      const { error: deleteError } = await supabase
        .from("listings")
        .delete()
        .lt("created_at", cutoff.toISOString());

      if (deleteError) {
        console.error("Error deleting expired listings:", deleteError);
      }

      // 3) Load remaining active listings
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading listings:", error);
      } else {
        const mapped = (data || []).map((row) => ({
          ...row,
          imgs: row.images ? JSON.parse(row.images) : [],
        }));
        setListings(mapped);
      }
    }

    loadListings();
  }, []);

  // --- INTRO SPLASH TIMER ---
  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 900);
    return () => clearTimeout(timer);
  }, []);

  // --- USER KEY (FOR FAVOURITES, ETC) ---
  const userKey = user?.id || user?.email || null;
  console.log("user state =", user);
  console.log("userKey =", userKey);

  // CLOSE LOGIN SHEET ON LOGIN OR LOGOUT
  useEffect(() => {
    setAccountOpen(false);
  }, [user]);

  // --- LOAD FAVOURITES WHEN USER CHANGES ---
  useEffect(() => {
    console.log("🔄 loadFavorites effect fired. userKey =", userKey);

    const loadFavorites = async () => {
      if (!userKey) {
        console.log("No userKey → clearing favs");
        setFavs({});
        return;
      }

      const { data, error } = await supabase
        .from("favorites")
        .select("listing_id")
        .eq("user_id", userKey);

      if (error) {
        console.error("❌ Error loading favorites:", error);
        return;
      }

      console.log("✅ Loaded favorites from DB:", data);

      const favMap = {};
      (data || []).forEach((row) => {
        favMap[row.listing_id] = true;
      });

      setFavs(favMap);
    };

    loadFavorites();
  }, [userKey]);

  // --- NAV / CATEGORY HELPERS ---
  function handleBottomTab(tab) {
    setAccountOpen(false);

    if (tab === "favs" && !userKey) {
      setAccountOpen(true);
      return;
    }

    if (tab === "account" && !userKey) {
      setAccountOpen(true);
      return;
    }

    setActiveTab(tab);

    if (tab !== "home") {
      setActiveCategoryKey(null);
      setSelectedListing(null);
      setSearchTerm("");
    } else {
      setActiveCategoryKey(null);
      setSelectedListing(null);
    }
  }

  function openCategory(key) {
    setAccountOpen(false);

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

  // --- LOGOUT ---
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
      alert("Could not log out. Please try again.");
      return;
    }

    // Clear local state
    setUser(null);
    setFavs({});
    setActiveTab("home");
    setAccountOpen(false);
  };

  function handleAccountClick() {
    if (!user) {
      setAccountOpen(true);
      return;
    }
    setActiveTab("account");
  }

  // --- GOOGLE LOGIN (OAUTH) ---
  async function handleGoogleLogin() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      console.error("Google sign-in error:", error.message);
      alert("There was a problem signing in with Google.");
    }
  }

  // --- CREATE LISTING (WITH IMAGE UPLOAD) ---
  const handleCreateListing = async (formValues) => {
    if (!user) {
      setAccountOpen(true);
      return;
    }

    // 1) Upload images to Supabase Storage
    let imageUrls = [];

    if (formValues.images && formValues.images.length > 0) {
      const uploads = await Promise.all(
        formValues.images.map(async (file, index) => {
          try {
            const ext = file.name.split(".").pop();
            const filePath = `listings/${user.id}/${Date.now()}-${index}.${ext}`;

            const { error: uploadError } = await supabase.storage
              .from("listing-images")
              .upload(filePath, file);

            if (uploadError) {
              console.error("Error uploading image:", uploadError);
              return null;
            }

            const { data } = supabase.storage
              .from("listing-images")
              .getPublicUrl(filePath);

            return data.publicUrl;
          } catch (err) {
            console.error("Unexpected error uploading image:", err);
            return null;
          }
        })
      );

      imageUrls = uploads.filter(Boolean);
    }

    // 2) Build payload for the listings table
    const payload = {
      user_id: user.id,
      title: formValues.title,
      description: formValues.description,
      price: formValues.price,
      category: formValues.category,
      subcategory: formValues.subcategory || null,
      city: formValues.city,
      area: formValues.area,
      whatsapp: formValues.whatsapp,
      images: imageUrls.length ? JSON.stringify(imageUrls) : null,
      status: "active",
    };

    console.log("🟢 Creating listing with payload:", payload);

    const { data, error } = await supabase
      .from("listings")
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.error("❌ Error creating listing:", error);
      alert("Could not create listing, please try again.");
      return;
    }

    console.log("✅ Listing created:", data);

    const created = {
      ...data,
      imgs: data.images ? JSON.parse(data.images) : [],
    };

    setListings((prev) => [created, ...prev]);
    setPostOpen(false);
  };

  // --- DELETE LISTING ---
  const deleteListing = async (listingId) => {
    if (!user || !user.id) {
      setAccountOpen(true);
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this listing?"
    );
    if (!confirmed) return;

    const { error } = await supabase
      .from("listings")
      .delete()
      .match({ id: listingId, user_id: user.id });

    if (error) {
      console.error("❌ Error deleting listing:", error);
      alert("Could not delete listing. Please try again.");
      return;
    }

    setListings((prev) => prev.filter((l) => l.id !== listingId));
  };

  // --- SEARCH ---
  function handleSearch() {
    const term = search.trim().toLowerCase();
    setSearchTerm(term);
    setActiveCategoryKey(null);
    setSelectedListing(null);
    setActiveTab("home");
  }

  const activeCategory =
    activeCategoryKey &&
    CATEGORY_DEFS.find((c) => c.key === activeCategoryKey);

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

  // --- INTRO SCREEN ---
  if (showIntro) {
    return <IntroScreen />;
  }

  // --- TOGGLE FAVOURITE ---
  const toggleFav = async (listingId) => {
    console.log("🔥 toggleFav clicked for listingId =", listingId);
    console.log("   current userKey =", userKey);
    console.log("   current favs map =", favs);

    if (!userKey) {
      console.log("No userKey → opening account sheet");
      setAccountOpen(true);
      return;
    }

    const isFav = !!favs[listingId];
    console.log("   was favourite?", isFav);

    if (!isFav) {
      console.log("➕ Adding favourite in Supabase…");
      const { data, error } = await supabase
        .from("favorites")
        .insert({
          user_id: userKey,
          listing_id: listingId,
        })
        .select();

      if (error) {
        console.error("❌ Error adding favorite:", error);
        return;
      }

      console.log("✅ Inserted favourite row:", data);

      setFavs((prev) => ({
        ...prev,
        [listingId]: true,
      }));
    } else {
      console.log("➖ Removing favourite in Supabase…");
      const { data, error } = await supabase
        .from("favorites")
        .delete()
        .match({ user_id: userKey, listing_id: listingId })
        .select();

      if (error) {
        console.error("❌ Error removing favorite:", error);
        return;
      }

      console.log("✅ Deleted favourite row:", data);

      setFavs((prev) => {
        const copy = { ...prev };
        delete copy[listingId];
        return copy;
      });
    }
  };

  // --- RENDER ---
  return (
    <>
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
                <AccountPage
                  user={user}
                  listings={listings}
                  onDeleteListing={deleteListing}
                  onLogout={handleLogout}
                  onOpenListing={(item) => setSelectedListing(item)}
                />
              )}
            </>
          )}
        </main>

        <BottomNav
          activeTab={activeTab}
          onTabChange={handleBottomTab}
          onPost={handlePostClick}
          onAccount={handleAccountClick}
          lang={lang}
        />

        <AccountSheet
          open={accountOpen}
          onClose={() => setAccountOpen(false)}
          setUser={setUser}
          lang={lang}
          onGoogleLogin={handleGoogleLogin}
        />

        <PostDialog
          open={postOpen}
          onClose={() => setPostOpen(false)}
          lang={lang}
          onCreateListing={handleCreateListing}
          userEmail={user?.email}
        />
      </div>
    </>
  );
}
