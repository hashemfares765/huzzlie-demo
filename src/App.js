import React, { useState } from "react";

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
    currency: "SYP",
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
    currency: "SYP",
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
    currency: "AED",
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

/* CURRENCY HELPERS */

const SYP_PER_USD = 14500; // demo rate
const USD_PER_SYP = 1 / SYP_PER_USD;
const USD_PER_AED = 0.27; // approx

function getPriceInCurrency(item, targetCurrency) {
  if (item.price == null) return null;
  let priceUSD;

  switch (item.currency) {
    case "USD":
      priceUSD = item.price;
      break;
    case "AED":
      priceUSD = item.price * USD_PER_AED;
      break;
    case "SYP":
      priceUSD = item.price * USD_PER_SYP;
      break;
    default:
      priceUSD = item.price;
  }

  if (targetCurrency === "USD") return priceUSD;
  if (targetCurrency === "SYP") return priceUSD * SYP_PER_USD;
  return priceUSD;
}

function formatPrice(amount, currency) {
  if (amount == null) return "";
  const rounded = Math.round(amount);
  if (currency === "USD") {
    return "$ " + rounded.toLocaleString();
  }
  if (currency === "SYP") {
    return rounded.toLocaleString() + " ل.س";
  }
  return rounded.toLocaleString() + " " + currency;
}

function getPriceDisplay(item, currency) {
  const amount = getPriceInCurrency(item, currency);
  return formatPrice(amount, currency);
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

function ListingCard({ item, fav, onToggleFav, onOpen, lang, currency }) {
  const localizedTitle =
    lang === "ar" && item.titleAr ? item.titleAr : item.title;
  const localizedLocation =
    lang === "ar" && item.locationAr ? item.locationAr : item.location;
  const priceText = getPriceDisplay(item, currency);

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
          <span className="hz-price">{priceText}</span>
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
  currency,
  setCurrency,
}) {
  const S = STRINGS[lang];
  const isAR = lang === "ar";

  return (
    <div className="hz-header">
      <div className="hz-header-inner">
        <input
  value={q}
  onChange={(e) => setQ(e.target.value)}
  placeholder={S.searchPlaceholder}
  className={
    "hz-search-input " + (isAR ? "hz-rtl-text" : "hz-ltr-text")
  }
  dir={isAR ? "rtl" : "ltr"}
/>


        <div className="hz-header-actions">
          {/* Currency toggle: USD ⇄ SYP */}
          <button
            className="hz-currency-btn"
            onClick={() =>
              setCurrency(currency === "USD" ? "SYP" : "USD")
            }
          >
            <Tag size={16} />
            <span>{currency === "USD" ? "USD / ل.س" : "ل.س / USD"}</span>
          </button>

          <button
            className="hz-lang-btn"
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

function BottomNav({ active, setActive, onPost, onAccount, lang }) {
  const S = STRINGS[lang];

  function Item({ id, icon: Icon, label, onClick }) {
    return (
      <button
        className={
          "hz-nav-item " + (active === id ? "hz-nav-item-active" : "")
        }
        onClick={
          onClick ||
          (() => {
            setActive(id);
          })
        }
      >
        <Icon size={22} />
        <span>{label}</span>
      </button>
    );
  }

  return (
    <div className="hz-bottom-nav">
      <Item id="home" icon={Home} label={S.home} />
      <Item id="favs" icon={Heart} label={S.favourites} />
      <Item id="post" icon={PlusCircle} label={S.placeListing} onClick={onPost} />
      <Item id="account" icon={User} label={S.account} onClick={onAccount} />
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

/* === FILTER SHEETS === */
/* Motors Filters – Dubizzle-style chips + sheets, currency-aware */

function MotorsFilters({ lang, filters, setFilters, currency }) {
  const isAr = lang === "ar";
  const t = (en, ar) => (isAr ? ar : en);

  const LABELS = {
    brand: t("Brand", "الماركة"),
    sellerType: t("Seller", "البائع"),
    price:
      currency === "USD"
        ? t("Price (USD)", "السعر (دولار)")
        : t("Price (SYP)", "السعر (ليرة سورية)"),
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

  const priceMin = filters.priceMin ?? PRICE_MIN;
  const priceMax = filters.priceMax ?? PRICE_MAX;
  const yearMin = filters.yearMin ?? YEAR_MIN;
  const yearMax = filters.yearMax ?? YEAR_MAX;
  const kmMax = filters.mileageMax ?? KM_MAX;

  const sheetTitleMap = {
    brand: LABELS.brand,
    sellerType: LABELS.sellerType,
    price: LABELS.price,
    year: LABELS.year,
    km: LABELS.km,
    specs: LABELS.specs,
  };

  const priceSummary =
    priceMin !== PRICE_MIN || priceMax !== PRICE_MAX
      ? `${priceMin} - ${
          priceMax === PRICE_MAX ? t("Any", "أي") : priceMax
        }`
      : "";

  const yearSummary =
    yearMin !== YEAR_MIN || yearMax !== YEAR_MAX
      ? `${yearMin}${yearMax !== YEAR_MAX ? " - " + yearMax : "+"}`
      : "";

  const kmSummary = kmMax !== KM_MAX ? `≤ ${kmMax.toLocaleString()}` : "";

  const [activeKey, setActiveKey] = useState(null);

  

  // local draft state for sheet inputs
  const [draftPriceMin, setDraftPriceMin] = useState("");
  const [draftPriceMax, setDraftPriceMax] = useState("");
  const [draftYearMin, setDraftYearMin] = useState("");
  const [draftYearMax, setDraftYearMax] = useState("");
  const [draftKmMax, setDraftKmMax] = useState("");

  function chipClass(key) {
    return "hz-filter-chip " + (activeKey === key ? "hz-filter-chip-active" : "");
  }
  function openSheet(key) {
    if (key === "price") {
      setDraftPriceMin(priceMin === PRICE_MIN ? "" : String(priceMin));
      setDraftPriceMax(priceMax === PRICE_MAX ? "" : String(priceMax));
    } else if (key === "year") {
      setDraftYearMin(yearMin === YEAR_MIN ? "" : String(yearMin));
      setDraftYearMax(yearMax === YEAR_MAX ? "" : String(yearMax));
    } else if (key === "km") {
      setDraftKmMax(kmMax === KM_MAX ? "" : String(kmMax));
    }
    setActiveKey(key);
  }
  function closeSheet() {
    setActiveKey(null);
  }

  function numSanitise(str) {
    const s = (str ?? "").toString().replace(/[^\d]/g, "");
    return s;
  }
  function parseOrUndef(str) {
    if (str === "" || str == null) return undefined;
    const n = Number(str);
    return Number.isFinite(n) ? n : undefined;
  }

  const stopEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  function commitActiveSheetAndClose() {
    if (activeKey === "price") {
      const vMin = parseOrUndef(draftPriceMin);
      const vMax = parseOrUndef(draftPriceMax);

      setFilters((f) => {
        const currentMax = f.priceMax ?? PRICE_MAX;
        const currentMin = f.priceMin ?? PRICE_MIN;

        const newMin =
          vMin == null
            ? PRICE_MIN
            : Math.max(PRICE_MIN, Math.min(vMax ?? currentMax, vMin));
        const newMax =
          vMax == null
            ? PRICE_MAX
            : Math.min(PRICE_MAX, Math.max(vMin ?? currentMin, vMax));

        return { ...f, priceMin: newMin, priceMax: newMax };
      });
    } else if (activeKey === "year") {
      const vMin = parseOrUndef(draftYearMin);
      const vMax = parseOrUndef(draftYearMax);

      setFilters((f) => {
        const currentMax = f.yearMax ?? YEAR_MAX;
        const currentMin = f.yearMin ?? YEAR_MIN;

        const newMin =
          vMin == null
            ? YEAR_MIN
            : Math.max(YEAR_MIN, Math.min(vMax ?? currentMax, vMin));
        const newMax =
          vMax == null
            ? YEAR_MAX
            : Math.min(YEAR_MAX, Math.max(vMin ?? currentMin, vMax));

        return { ...f, yearMin: newMin, yearMax: newMax };
      });
    } else if (activeKey === "km") {
      const v = parseOrUndef(draftKmMax);
      const clamped =
        v == null ? KM_MAX : Math.max(KM_MIN, Math.min(KM_MAX, v));
      setFilters((f) => ({ ...f, mileageMax: clamped }));
    }

    closeSheet();
  }

  function clearAll() {
    setFilters({});
    setDraftPriceMin("");
    setDraftPriceMax("");
    setDraftYearMin("");
    setDraftYearMax("");
    setDraftKmMax("");
    setActiveKey(null);
  }

  function Sheet({ children }) {
    if (!activeKey) return null;
    return (
      <div className="hz-modal-backdrop">
        <div
          className="hz-modal hz-modal-large hz-filter-sheet"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="hz-modal-header">
            <h3>{sheetTitleMap[activeKey] ?? ""}</h3>
            <button className="hz-close" onClick={closeSheet}>
              ×
            </button>
          </div>
          <div className="hz-modal-body">{children}</div>
          <div className="hz-modal-footer hz-modal-footer-between">
            <button className="hz-secondary" onClick={clearAll}>
              {isAr ? "مسح الكل" : "Clear all"}
            </button>
            <button className="hz-primary" onClick={commitActiveSheetAndClose}>
              {isAr ? "تم" : "Done"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hz-filters">
      <div className="hz-filters-title-row">
        <div className="hz-filters-title">{STRINGS[lang].carsFilters}</div>
        {Object.keys(filters).length > 0 && (
          <button className="hz-filters-clear-link" onClick={clearAll}>
            {isAr ? "إعادة تعيين" : "Reset"}
          </button>
        )}
      </div>

      <div className="hz-filter-chips-scroll">
        <button
          className={chipClass("brand")}
          onClick={() => openSheet("brand")}
        >
          <span className="hz-filter-chip-label">
            {LABELS.brand}
            {filters.brand ? ` · ${filters.brand}` : ""}
            <ChevronDown className="hz-filter-chip-arrow" />
          </span>
        </button>

        <button
          className={chipClass("sellerType")}
          onClick={() => openSheet("sellerType")}
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
          onClick={() => openSheet("price")}
        >
          <span className="hz-filter-chip-label">
            {LABELS.price}
            {priceSummary ? ` · ${priceSummary}` : ""}
            <ChevronDown className="hz-filter-chip-arrow" />
          </span>
        </button>

        <button
          className={chipClass("year")}
          onClick={() => openSheet("year")}
        >
          <span className="hz-filter-chip-label">
            {LABELS.year}
            {yearSummary ? ` · ${yearSummary}` : ""}
            <ChevronDown className="hz-filter-chip-arrow" />
          </span>
        </button>

        <button className={chipClass("km")} onClick={() => openSheet("km")}>
          <span className="hz-filter-chip-label">
            {LABELS.km}
            {kmSummary ? ` · ${kmSummary}` : ""}
            <ChevronDown className="hz-filter-chip-arrow" />
          </span>
        </button>

        <button
          className={chipClass("specs")}
          onClick={() => openSheet("specs")}
        >
          <span className="hz-filter-chip-label">
            {LABELS.specs}
            {filters.specs ? ` · ${filters.specs}` : ""}
            <ChevronDown className="hz-filter-chip-arrow" />
          </span>
        </button>
      </div>

      <Sheet>
        {/* BRAND */}
        {activeKey === "brand" && (
          <div className="hz-field">
            <label>{LABELS.brand}</label>
            <select
              value={filters.brand || ""}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  brand: e.target.value || undefined,
                }))
              }
              onKeyDown={stopEnter}
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

        {/* SELLER TYPE */}
        {activeKey === "sellerType" && (
          <div className="hz-field">
            <label>{LABELS.sellerType}</label>
            <select
              value={filters.sellerType || ""}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  sellerType: e.target.value || undefined,
                }))
              }
              onKeyDown={stopEnter}
            >
              <option value="">{t("Any seller", "أي بائع")}</option>
              <option value="private">{t("Private", "فرد")}</option>
              <option value="dealership">{t("Dealership", "معرض")}</option>
            </select>
          </div>
        )}

        {/* PRICE */}
        {activeKey === "price" && (
          <div className="hz-field">
            <label>{LABELS.price}</label>
            <div className="hz-range-inputs">
              <input
                type="text"
                inputMode="numeric"
                className="hz-input-scroller"
                value={draftPriceMin}
                onKeyDown={stopEnter}
                onChange={(e) => {
                  const s = numSanitise(e.target.value);
                  setDraftPriceMin(s);
                }}
                placeholder={t("Min", "أدنى")}
              />
              <input
                type="text"
                inputMode="numeric"
                className="hz-input-scroller"
                value={draftPriceMax}
                onKeyDown={stopEnter}
                onChange={(e) => {
                  const s = numSanitise(e.target.value);
                  setDraftPriceMax(s);
                }}
                placeholder={t("Max", "أعلى")}
              />
            </div>
          </div>
        )}

        {/* YEAR */}
        {activeKey === "year" && (
          <div className="hz-field">
            <label>{LABELS.year}</label>
            <div className="hz-range-inputs">
              <input
                type="text"
                inputMode="numeric"
                className="hz-input-scroller"
                value={draftYearMin}
                onKeyDown={stopEnter}
                onChange={(e) => {
                  const s = numSanitise(e.target.value);
                  setDraftYearMin(s);
                }}
                placeholder={t("From", "من")}
              />
              <input
                type="text"
                inputMode="numeric"
                className="hz-input-scroller"
                value={draftYearMax}
                onKeyDown={stopEnter}
                onChange={(e) => {
                  const s = numSanitise(e.target.value);
                  setDraftYearMax(s);
                }}
                placeholder={t("To", "إلى")}
              />
            </div>
          </div>
        )}

        {/* MAX KM */}
        {activeKey === "km" && (
          <div className="hz-field">
            <label>{LABELS.km}</label>
            <input
              type="text"
              inputMode="numeric"
              className="hz-input-scroller"
              value={draftKmMax}
              onKeyDown={stopEnter}
              onChange={(e) => {
                const s = numSanitise(e.target.value);
                setDraftKmMax(s);
              }}
              placeholder={t("Max kilometers", "أقصى عدد كيلومترات")}
            />
          </div>
        )}

        {/* SPECS */}
        {activeKey === "specs" && (
          <div className="hz-field">
            <label>{LABELS.specs}</label>
            <div className="hz-specs-options">
              {["GCC", "EU", "USA", "Japan"].map((s) => (
                <button
                  key={s}
                  className={
                    "hz-spec-pill " +
                    (filters.specs === s ? "hz-spec-pill-active" : "")
                  }
                  onClick={() =>
                    setFilters((f) => ({
                      ...f,
                      specs: f.specs === s ? undefined : s,
                    }))
                  }
                >
                  {s === "Japan" ? t("Japan", "ياباني") : s}
                </button>
              ))}
            </div>
          </div>
        )}
      </Sheet>
    </div>
  );
}

/* Property Filters – currency-aware price */

function PropertyFilters({ filters, setFilters, lang, currency }) {
  const S = STRINGS[lang];
  const [activeKey, setActiveKey] = useState(null);
  const isAr = lang === "ar";

  const [draftPriceMin, setDraftPriceMin] = useState("");
  const [draftPriceMax, setDraftPriceMax] = useState("");
  const [draftAreaMin, setDraftAreaMin] = useState("");
  const [draftAreaMax, setDraftAreaMax] = useState("");

  function chipClass(key) {
    return "hz-filter-chip " + (activeKey === key ? "hz-filter-chip-active" : "");
  }
  function openSheet(key) {
    if (key === "priceMin") {
      setDraftPriceMin(filters.priceMin ?? "");
    } else if (key === "priceMax") {
      setDraftPriceMax(filters.priceMax ?? "");
    } else if (key === "areaMin") {
      setDraftAreaMin(filters.areaMin ?? "");
    } else if (key === "areaMax") {
      setDraftAreaMax(filters.areaMax ?? "");
    }
    setActiveKey(key);
  }
  function closeSheet() {
    setActiveKey(null);
  }

  function numSanitise(str) {
    const s = (str ?? "").toString().replace(/[^\d]/g, "");
    return s;
  }
  function parseOrUndef(str) {
    if (str === "" || str == null) return undefined;
    const n = Number(str);
    return Number.isFinite(n) ? n : undefined;
  }
  const stopEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const titles = {
    priceMin:
      currency === "USD"
        ? isAr
          ? "الحد الأدنى للسعر (دولار)"
          : "Minimum Price (USD)"
        : isAr
        ? "الحد الأدنى للسعر (ليرة سورية)"
        : "Minimum Price (SYP)",
    priceMax:
      currency === "USD"
        ? isAr
          ? "الحد الأعلى للسعر (دولار)"
          : "Maximum Price (USD)"
        : isAr
        ? "الحد الأعلى للسعر (ليرة سورية)"
        : "Maximum Price (SYP)",
    areaMin: isAr ? "الحد الأدنى للمساحة" : "Minimum Area",
    areaMax: isAr ? "الحد الأعلى للمساحة" : "Maximum Area",
  };

  function commitActiveSheetAndClose() {
    if (activeKey === "priceMin") {
      const v = parseOrUndef(draftPriceMin);
      setFilters((f) => ({ ...f, priceMin: v }));
    } else if (activeKey === "priceMax") {
      const v = parseOrUndef(draftPriceMax);
      setFilters((f) => ({ ...f, priceMax: v }));
    } else if (activeKey === "areaMin") {
      const v = parseOrUndef(draftAreaMin);
      setFilters((f) => ({ ...f, areaMin: v }));
    } else if (activeKey === "areaMax") {
      const v = parseOrUndef(draftAreaMax);
      setFilters((f) => ({ ...f, areaMax: v }));
    }
    closeSheet();
  }

  function clearAll() {
    setFilters({});
    setDraftPriceMin("");
    setDraftPriceMax("");
    setDraftAreaMin("");
    setDraftAreaMax("");
    setActiveKey(null);
  }

  function Sheet({ children }) {
    if (!activeKey) return null;
    return (
      <div className="hz-modal-backdrop">
        <div
          className="hz-modal hz-modal-large hz-filter-sheet"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="hz-modal-header">
            <h3>{titles[activeKey]}</h3>
            <button className="hz-close" onClick={closeSheet}>
              ×
            </button>
          </div>
          <div className="hz-modal-body">{children}</div>
          <div className="hz-modal-footer hz-modal-footer-between">
            <button className="hz-secondary" onClick={clearAll}>
              {isAr ? "مسح الكل" : "Clear all"}
            </button>
            <button className="hz-primary" onClick={commitActiveSheetAndClose}>
              {isAr ? "تم" : "Done"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hz-filters">
      <div className="hz-filters-title-row">
        <div className="hz-filters-title">{S.propertyFilters}</div>
        {Object.keys(filters).length > 0 && (
          <button className="hz-filters-clear-link" onClick={clearAll}>
            {isAr ? "إعادة تعيين" : "Reset"}
          </button>
        )}
      </div>

      <div className="hz-filter-chips-scroll">
        <button
          className={chipClass("priceMin")}
          onClick={() => openSheet("priceMin")}
        >
          {currency === "USD"
            ? isAr
              ? "أدنى سعر (دولار)"
              : "Min Price (USD)"
            : isAr
            ? "أدنى سعر (ليرة سورية)"
            : "Min Price (SYP)"}
          {filters.priceMin ? ` · ${filters.priceMin}` : ""}
          <ChevronDown className="hz-filter-chip-arrow" />
        </button>

        <button
          className={chipClass("priceMax")}
          onClick={() => openSheet("priceMax")}
        >
          {currency === "USD"
            ? isAr
              ? "أعلى سعر (دولار)"
              : "Max Price (USD)"
            : isAr
            ? "أعلى سعر (ليرة سورية)"
            : "Max Price (SYP)"}
          {filters.priceMax ? ` · ${filters.priceMax}` : ""}
          <ChevronDown className="hz-filter-chip-arrow" />
        </button>

        <button
          className={chipClass("areaMin")}
          onClick={() => openSheet("areaMin")}
        >
          {isAr ? "أقل مساحة" : "Min Area"}
          {filters.areaMin ? ` · ${filters.areaMin}` : ""}
          <ChevronDown className="hz-filter-chip-arrow" />
        </button>

        <button
          className={chipClass("areaMax")}
          onClick={() => openSheet("areaMax")}
        >
          {isAr ? "أكبر مساحة" : "Max Area"}
          {filters.areaMax ? ` · ${filters.areaMax}` : ""}
          <ChevronDown className="hz-filter-chip-arrow" />
        </button>
      </div>

      <Sheet>
        {activeKey === "priceMin" && (
          <div className="hz-field">
            <label>{titles.priceMin}</label>
            <input
              type="text"
              inputMode="numeric"
              className="hz-input-scroller"
              value={draftPriceMin}
              onKeyDown={stopEnter}
              onChange={(e) => {
                const s = numSanitise(e.target.value);
                setDraftPriceMin(s);
              }}
              placeholder={isAr ? "أدنى سعر" : "Min price"}
            />
          </div>
        )}

        {activeKey === "priceMax" && (
          <div className="hz-field">
            <label>{titles.priceMax}</label>
            <input
              type="text"
              inputMode="numeric"
              className="hz-input-scroller"
              value={draftPriceMax}
              onKeyDown={stopEnter}
              onChange={(e) => {
                const s = numSanitise(e.target.value);
                setDraftPriceMax(s);
              }}
              placeholder={isAr ? "أعلى سعر" : "Max price"}
            />
          </div>
        )}

        {activeKey === "areaMin" && (
          <div className="hz-field">
            <label>
              {isAr ? "الحد الأدنى للمساحة (قدم²)" : "Minimum Area (sqft)"}
            </label>
            <input
              type="text"
              inputMode="numeric"
              className="hz-input-scroller"
              value={draftAreaMin}
              onKeyDown={stopEnter}
              onChange={(e) => {
                const s = numSanitise(e.target.value);
                setDraftAreaMin(s);
              }}
              placeholder={isAr ? "أقل مساحة" : "Min sqft"}
            />
          </div>
        )}

        {activeKey === "areaMax" && (
          <div className="hz-field">
            <label>
              {isAr ? "الحد الأعلى للمساحة (قدم²)" : "Maximum Area (sqft)"}
            </label>
            <input
              type="text"
              inputMode="numeric"
              className="hz-input-scroller"
              value={draftAreaMax}
              onKeyDown={stopEnter}
              onChange={(e) => {
                const s = numSanitise(e.target.value);
                setDraftAreaMax(s);
              }}
              placeholder={isAr ? "أكبر مساحة" : "Max sqft"}
            />
          </div>
        )}
      </Sheet>
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
  currency,
}) {
  const isMotors = cat.key === "motors";
  const isProp = !!cat.isProperty;
  const [filters, setFilters] = useState({});

  const filtered = listings.filter((l) => {
    if (l.category !== cat.key) return false;

    if (cat.subcategories && cat.subcategories.length && activeSub) {
      if (l.subcategory !== activeSub) return false;
    }

    const priceValue = getPriceInCurrency(l, currency) ?? 0;

    if (isMotors) {
      if (l.subcategory !== "cars") return false;
      if (filters.brand && l.brand !== filters.brand) return false;
      if (filters.sellerType && l.sellerType !== filters.sellerType) return false;
      if (filters.priceMin != null && priceValue < filters.priceMin) return false;
      if (filters.priceMax != null && priceValue > filters.priceMax) return false;
      if (filters.yearMin != null && (l.year || 0) < filters.yearMin) return false;
      if (filters.yearMax != null && (l.year || 0) > filters.yearMax) return false;
      if (filters.mileageMax != null && (l.mileage || 0) > filters.mileageMax) return false;
      if (filters.specs && l.specs !== filters.specs) return false;
    }

    if (isProp) {
      if (filters.priceMin != null && priceValue < filters.priceMin) return false;
      if (filters.priceMax != null && priceValue > filters.priceMax) return false;
      if (filters.areaMin != null && (l.areaSqft || 0) < filters.areaMin) return false;
      if (filters.areaMax != null && (l.areaSqft || 0) > filters.areaMax) return false;
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
        <MotorsFilters
          lang={lang}
          filters={filters}
          setFilters={setFilters}
          currency={currency}
        />
      )}

      {isProp && (
        <PropertyFilters
          lang={lang}
          filters={filters}
          setFilters={setFilters}
          currency={currency}
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
            currency={currency}
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
  currency,
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
            currency={currency}
          />
        ))}
      </div>
    </div>
  );
}

/* LISTING DETAIL */

function ListingDetail({ item, onBack, lang, currency }) {
  const S = STRINGS[lang];
  const localizedTitle =
    lang === "ar" && item.titleAr ? item.titleAr : item.title;
  const localizedDesc = lang === "ar" && item.descAr ? item.descAr : item.desc;
  const localizedLocation =
    lang === "ar" && item.locationAr ? item.locationAr : item.location;
  const priceText = getPriceDisplay(item, currency);

  return (
    <div className="hz-detail">
      <button className="hz-detail-back" onClick={onBack}>
        <ChevronLeft size={20} />
      </button>

      <div className="hz-detail-img-wrap">
        {item.imgs && item.imgs.length > 0 && (
          <img
            src={item.imgs[0]}
            alt={localizedTitle}
            className="hz-detail-img"
          />
        )}
        {item.imgs && item.imgs.length > 1 && (
          <div className="hz-detail-dots">
            {item.imgs.map((_, i) => (
              <span
                key={i}
                className={
                  "hz-detail-dot " + (i === 0 ? "hz-detail-dot-active" : "")
                }
              />
            ))}
          </div>
        )}
      </div>

      <div className="hz-detail-body">
        <div className="hz-detail-price">{priceText}</div>
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

function AccountPage({ user }) {
  const displayName = (user && user.name) || "Huzzlie User";

  return (
    <div className="hz-page hz-account">
      <div className="hz-account-card">
        <div className="hz-account-avatar">
          <UserCircle size={42} />
        </div>
        <div className="hz-account-main">
          <div className="hz-account-name">{displayName}</div>
          <div className="hz-account-joined">Joined on July 2023</div>
        </div>
        <button
          className="hz-account-verify"
          onClick={() => {
            alert("Verification flow coming soon (demo).");
          }}
        >
          Get Verified
        </button>
      </div>

      <div className="hz-account-actions">
        <button
          className="hz-account-action"
          onClick={() => {
            alert("My Ads section (demo).");
          }}
        >
          <Bookmark size={20} />
          <span>My Ads</span>
        </button>
        <button
          className="hz-account-action"
          onClick={() => {
            alert("My Searches section (demo).");
          }}
        >
          <Search size={20} />
          <span>My Searches</span>
        </button>
      </div>

      <div className="hz-account-list">
        <button
          className="hz-account-item"
          onClick={() => {
            alert("Edit basic info (demo).");
          }}
        >
          <User size={18} />
          <span>Profile & Basic Info</span>
        </button>

        <button
          className="hz-account-item"
          onClick={() => {
            alert("Manage phone numbers & addresses (demo).");
          }}
        >
          <Phone size={18} />
          <span>Phone Numbers & Addresses</span>
        </button>

        <button
          className="hz-account-item"
          onClick={() => {
            alert("Change password & security settings (demo).");
          }}
        >
          <Shield size={18} />
          <span>Password & Security</span>
        </button>

        <button
          className="hz-account-item"
          onClick={() => {
            alert("View ads status (demo).");
          }}
        >
          <Bookmark size={18} />
          <span>My Ads Status</span>
        </button>

        <button
          className="hz-account-item"
          onClick={() => {
            alert("Notifications settings (demo).");
          }}
        >
          <Bell size={18} />
          <span>Notifications & Email Settings</span>
        </button>

        <button
          className="hz-account-item"
          onClick={() => {
            alert("General account settings (demo).");
          }}
        >
          <Settings size={18} />
          <span>Account Settings</span>
        </button>

        <button
          className="hz-account-item hz-account-danger"
          onClick={() => {
            alert("Deactivate / delete flow (demo).");
          }}
        >
          <Trash2 size={18} />
          <span>Deactivate / Delete Account</span>
        </button>

        <button
          className="hz-account-item"
          onClick={() => {
            alert("Logged out (demo).");
          }}
        >
          <LogOut size={18} />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}

/* ACCOUNT SHEET */

function AccountSheet({ open, onClose, setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (!open) return null;

  const providers = [
    { key: "google", label: "Continue with Google" },
    {
      key: "microsoft",
      label: "Continue with Microsoft (Hotmail/Outlook)",
    },
    { key: "apple", label: "Continue with Apple" },
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

  const stopEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div className="hz-modal-backdrop">
      <div className="hz-modal">
        <div className="hz-modal-header">
          <h3>Create Account</h3>
          <button className="hz-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="hz-modal-body">
          {providers.map((p) => (
            <button
              key={p.key}
              className="hz-provider-btn"
              onClick={() => completeWithProvider(p.key)}
            >
              {p.label}
            </button>
          ))}
          <div className="hz-or">or</div>
          <div className="hz-field">
            <label>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              onKeyDown={stopEnter}
            />
          </div>
          <div className="hz-field">
            <label>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              onKeyDown={stopEnter}
            />
          </div>
        </div>
        <div className="hz-modal-footer">
          <button className="hz-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="hz-primary" onClick={completeManual}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

/* POST DIALOG */

function PostDialog({ open, onClose, lang, onCreateListing, currency }) {
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
      title,
      titleAr: titleAr || undefined,
      price: price ? Number(price) : 0,
      currency: currency,
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
          ? "A $" +
            fee.amount +
            " fee would apply (" +
            fee.reason +
            ") in production."
          : "This category is free to post.")
    );

    resetForm();
    onClose();
  }

  const stopEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const priceLabel =
    currency === "USD"
      ? lang === "ar"
        ? "السعر (دولار)"
        : "Price (USD)"
      : lang === "ar"
      ? "السعر (ليرة سورية)"
      : "Price (SYP)";

  return (
    <div className="hz-modal-backdrop">
      <div className="hz-modal hz-modal-large">
        <div className="hz-modal-header">
          <h3>{S.placeListing}</h3>
          <button className="hz-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="hz-modal-body hz-modal-grid">
          <div className="hz-field">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSubcategory("");
              }}
              onKeyDown={stopEnter}
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
              onKeyDown={stopEnter}
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
              onKeyDown={stopEnter}
            />
          </div>

          <div className="hz-field">
            <label>Title (AR)</label>
            <input
              value={titleAr}
              onChange={(e) => setTitleAr(e.target.value)}
              placeholder="عنوان الإعلان بالعربية"
              onKeyDown={stopEnter}
            />
          </div>

          <div className="hz-field">
            <label>{priceLabel}</label>
            <input
              type="text"
              inputMode="numeric"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value.replace(/[^\d]/g, ""))
              }
              placeholder="Price"
              onKeyDown={stopEnter}
            />
          </div>

          <div className="hz-field">
            <label>WhatsApp</label>
            <input
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="+9639xxxxxxxx"
              onKeyDown={stopEnter}
            />
          </div>

          <div className="hz-field">
            <label>City</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={stopEnter}
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
                  onKeyDown={stopEnter}
                />
              </div>
              <div className="hz-field">
                <label>Model</label>
                <input
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="e.g. C-Class"
                  onKeyDown={stopEnter}
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
                  onKeyDown={stopEnter}
                />
              </div>
              <div className="hz-field">
                <label>Seller</label>
                <select
                  value={sellerType}
                  onChange={(e) => setSellerType(e.target.value)}
                  onKeyDown={stopEnter}
                >
                  <option value="">
                    {lang === "ar"
                      ? "اختر نوع البائع"
                      : "Select"}
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
                  onKeyDown={stopEnter}
                />
              </div>
              <div className="hz-field">
                <label>Specs</label>
                <input
                  value={specs}
                  onChange={(e) => setSpecs(e.target.value)}
                  placeholder="e.g. GCC"
                  onKeyDown={stopEnter}
                />
              </div>
              <div className="hz-field">
                <label>VIN</label>
                <input
                  value={vin}
                  onChange={(e) => setVin(e.target.value)}
                  placeholder="Vehicle VIN"
                  onKeyDown={stopEnter}
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
                onKeyDown={stopEnter}
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
              onKeyDown={stopEnter}
            />
          </div>

          <div className="hz-field hz-field-full">
            <label>Description (AR)</label>
            <textarea
              rows={3}
              value={descAr}
              onChange={(e) => setDescAr(e.target.value)}
              placeholder="تفاصيل الإعلان بالعربية..."
              onKeyDown={stopEnter}
            />
          </div>
        </div>

        <div className="hz-modal-footer">
          <div className="hz-fee-label">
            {fee.amount
              ? "Posting fee: $" +
                fee.amount +
                " (" +
                fee.reason +
                ")"
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

/* ROOT APP */

export default function App() {
  // Arabic first by default
  const [lang, setLang] = useState("ar");
  const [currency, setCurrency] = useState("USD");

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
      alert(STRINGS[lang].createAccountToPost);
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

  return (
    <div
      className="hz-root"
      onKeyDownCapture={(e) => {
        if (
          e.key === "Enter" &&
          (e.target.closest(".hz-modal") || e.target.closest(".hz-filter-sheet"))
        ) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    >
      <Header
        q={search}
        setQ={setSearch}
        onSearch={handleSearch}
        lang={lang}
        setLang={setLang}
        disableEnterSearch={accountOpen || postOpen}
        currency={currency}
        setCurrency={setCurrency}
      />

      <main className="hz-main">
        {selectedListing ? (
          <ListingDetail
            item={selectedListing}
            onBack={() => setSelectedListing(null)}
            lang={lang}
            currency={currency}
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
                currency={currency}
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
                        currency={currency}
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
                currency={currency}
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
                      currency={currency}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === "account" && user && <AccountPage user={user} />}
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
        currency={currency}
      />
    </div>
  );
}
