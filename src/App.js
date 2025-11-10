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
  LogOut
} from "lucide-react";
import "./App.css";

/* STRINGS */


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

/* LABEL HELPER */

function getLabel(obj, lang) {
  if (lang === "ar" && obj.labelAr) return obj.labelAr;
  if (obj.labelEn) return obj.labelEn;
  return obj.label || "";
}

/* CATEGORY DEFINITIONS WITH EN/AR LABELS */

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
      {
        key: "townhouse",
        labelEn: "Townhouses",
        labelAr: "تاون هاوس",
      },
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
      {
        key: "apt",
        labelEn: "Off-plan Apts",
        labelAr: "شقق على المخطط",
      },
      {
        key: "villa",
        labelEn: "Off-plan Villas",
        labelAr: "فلل على المخطط",
      },
    ],
  },
  // Community instead of Rooms for Rent
  {
    key: "community",
    labelEn: "Community",
    labelAr: "المجتمع",
    icon: User,
    isProperty: false,
    subcategories: [
      { key: "events", labelEn: "Events", labelAr: "فعاليات" },
      {
        key: "activities",
        labelEn: "Activities",
        labelAr: "أنشطة",
      },
      {
        key: "volunteering",
        labelEn: "Volunteering",
        labelAr: "تطوع",
      },
      { key: "other", labelEn: "Other", labelAr: "أخرى" },
    ],
  },
  {
    key: "motors",
    labelEn: "Cars",
    labelAr: "سيارات",
    icon: Car,
    isProperty: false,
    subcategories: [
      { key: "cars", labelEn: "Cars", labelAr: "سيارات" },
    ],
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
      {
        key: "marketing",
        labelEn: "Marketing",
        labelAr: "تسويق",
      },
    ],
  },
  {
    key: "classifieds",
    labelEn: "Classifieds",
    labelAr: "إعلانات مبوبة",
    icon: Store,
    isProperty: false,
    subcategories: [
      {
        key: "electronics",
        labelEn: "Electronics",
        labelAr: "إلكترونيات",
      },
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
      {
        key: "outdoor",
        labelEn: "Outdoor",
        labelAr: "خارجي",
      },
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

/* CAR BRANDS (demo list – extend as needed) */

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

/* MOCK LISTINGS – EN + AR */

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
    descAr:
      "شقة غرفة وصالة مشرقة في قلب دمشق بالقرب من المحلات والمقاهي.",
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
    desc:
      "Clean Camry with full service history and no major accidents.",
    descAr:
      "كامري نظيفة مع سجل صيانة كامل وبدون حوادث كبيرة.",
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
    descAr:
      "C كلاس بصيانة وكالة مع ضمان ساري ومواصفات كاملة.",
    featured: true,
  },
];

/* HELPERS */

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

/* BASIC COMPONENTS */

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

function Header({ q, setQ, onSearch, lang, setLang }) {
  const S = STRINGS[lang];
  const isAR = lang === "ar";

  return (
    <div className="hz-header">
      <div className="hz-header-inner">
        <div className="hz-search-wrap">
          <div className="hz-logo-dot">
            <img
              src="/huzzlie-logo.png"
              alt="Huzzlie"
              className="hz-logo-img"
            />
          </div>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSearch();
            }}
            placeholder={S.searchPlaceholder}
            className={
              "hz-search-input " + (isAR ? "hz-rtl-text" : "hz-ltr-text")
            }
            dir={isAR ? "rtl" : "ltr"}
          />
          <button className="hz-search-btn" onClick={onSearch}>
            <Search size={18} />
          </button>
        </div>

        <div className="hz-header-actions">
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

/* MOTORS FILTERS – horizontal chips + dropdown panels */

function MotorsFilters({ lang, filters, setFilters }) {
  const S = STRINGS[lang];
  const [activeKey, setActiveKey] = useState(null);
  const isAr = lang === "ar";

  const label = (en, ar) => (isAr ? ar : en);

  const labels = {
    brand: label("Brand", "الماركة"),
    sellerType: label("Seller", "البائع"),
    price: label("Price", "السعر"),
    year: label("Year", "السنة"),
    km: label("Max KM", "أقصى كم"),
    specs: label("Specs", "المواصفات"),
  };

  function chipClass(key) {
    return (
      "hz-filter-chip " +
      (activeKey === key ? "hz-filter-chip-active" : "")
    );
  }

  function openSheet(key) {
    setActiveKey(key);
  }

  function closeSheet() {
    setActiveKey(null);
  }

  function Sheet({ children, title }) {
    if (!activeKey) return null;
    return (
      <div className="hz-filter-sheet-backdrop" onClick={closeSheet}>
        <div
          className="hz-filter-sheet"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="hz-filter-sheet-header">
            <span>{title}</span>
            <button
              className="hz-filter-sheet-done"
              onClick={closeSheet}
            >
              {isAr ? "تم" : "Done"}
            </button>
          </div>
          <div className="hz-filter-sheet-body">{children}</div>
        </div>
      </div>
    );
  }

  // dynamic title for sheet
  const sheetTitle =
    activeKey === "brand"
      ? labels.brand
      : activeKey === "sellerType"
      ? labels.sellerType
      : activeKey === "price"
      ? labels.price
      : activeKey === "year"
      ? labels.year
      : activeKey === "km"
      ? labels.km
      : activeKey === "specs"
      ? labels.specs
      : "";

  // quick summaries for chips
  const priceSummary =
    filters.priceMin || filters.priceMax
      ? `${filters.priceMin || 0} - ${
          filters.priceMax ? filters.priceMax : label("Any", "أي")
        }`
      : "";

  const yearSummary =
    filters.yearMin || filters.yearMax
      ? `${filters.yearMin || ""}${
          filters.yearMax ? " - " + filters.yearMax : "+"
        }`
      : "";

  const kmSummary = filters.mileageMax
    ? `≤ ${filters.mileageMax}`
    : "";

  return (
    <div className="hz-filters">
      <div className="hz-filters-title">{S.carsFilters}</div>

      {/* Horizontal filter chips with chevrons */}
      <div className="hz-filter-chips-scroll">
        <button
          className={chipClass("brand")}
          onClick={() => openSheet("brand")}
        >
          <span className="hz-filter-chip-label">
            {labels.brand}
            {filters.brand ? ` · ${filters.brand}` : ""}
            <ChevronDown className="hz-filter-chip-arrow" />
          </span>
        </button>

        <button
          className={chipClass("sellerType")}
          onClick={() => openSheet("sellerType")}
        >
          <span className="hz-filter-chip-label">
            {labels.sellerType}
            {filters.sellerType
              ? ` · ${
                  filters.sellerType === "private"
                    ? label("Private", "فرد")
                    : label("Dealership", "معرض")
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
            {labels.price}
            {priceSummary ? ` · ${priceSummary}` : ""}
            <ChevronDown className="hz-filter-chip-arrow" />
          </span>
        </button>

        <button
          className={chipClass("year")}
          onClick={() => openSheet("year")}
        >
          <span className="hz-filter-chip-label">
            {labels.year}
            {yearSummary ? ` · ${yearSummary}` : ""}
            <ChevronDown className="hz-filter-chip-arrow" />
          </span>
        </button>

        <button
          className={chipClass("km")}
          onClick={() => openSheet("km")}
        >
          <span className="hz-filter-chip-label">
            {labels.km}
            {kmSummary ? ` · ${kmSummary}` : ""}
            <ChevronDown className="hz-filter-chip-arrow" />
          </span>
        </button>

        <button
          className={chipClass("specs")}
          onClick={() => openSheet("specs")}
        >
          <span className="hz-filter-chip-label">
            {labels.specs}
            {filters.specs ? ` · ${filters.specs}` : ""}
            <ChevronDown className="hz-filter-chip-arrow" />
          </span>
        </button>
      </div>

      {/* Bottom sheet body per filter */}
      <Sheet title={sheetTitle}>
        {/* BRAND */}
        {activeKey === "brand" && (
          <div className="hz-field">
            <label>{labels.brand}</label>
            <select
              value={filters.brand || ""}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  brand: e.target.value || undefined,
                }))
              }
            >
              <option value="">
                {label("Any brand", "أي ماركة")}
              </option>
              {CAR_BRANDS.map((b) =>
                b ? (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ) : null
              )}
            </select>
          </div>
        )}

        {/* SELLER */}
        {activeKey === "sellerType" && (
          <div className="hz-field">
            <label>{labels.sellerType}</label>
            <select
              value={filters.sellerType || ""}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  sellerType: e.target.value || undefined,
                }))
              }
            >
              <option value="">
                {label("Any seller", "أي بائع")}
              </option>
              <option value="private">
                {label("Private", "فرد")}
              </option>
              <option value="dealership">
                {label("Dealership", "معرض")}
              </option>
            </select>
          </div>
        )}

        {/* PRICE RANGE (min+max + dual slider style) */}
        {activeKey === "price" && (
          <div className="hz-field">
            <label>{labels.price}</label>
            <div className="hz-range-row">
              <div className="hz-range-inputs">
                <input
                  type="number"
                  className="hz-input-scroller"
                  value={filters.priceMin || ""}
                  onChange={(e) => {
                    const v = e.target.value
                      ? Number(e.target.value)
                      : undefined;
                    setFilters((f) => ({
                      ...f,
                      priceMin: v,
                    }));
                  }}
                  placeholder={label("Min", "أدنى")}
                />
                <input
                  type="number"
                  className="hz-input-scroller"
                  value={filters.priceMax || ""}
                  onChange={(e) => {
                    const v = e.target.value
                      ? Number(e.target.value)
                      : undefined;
                    setFilters((f) => ({
                      ...f,
                      priceMax: v,
                    }));
                  }}
                  placeholder={label("Max", "أعلى")}
                />
              </div>
              <div className="hz-range-slider-wrap">
                <input
                  type="range"
                  min="0"
                  max="200000"
                  value={filters.priceMin || 0}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setFilters((f) => ({
                      ...f,
                      priceMin:
                        f.priceMax && v > f.priceMax
                          ? f.priceMax
                          : v,
                    }));
                  }}
                />
                <input
                  type="range"
                  min="0"
                  max="200000"
                  value={filters.priceMax || 200000}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setFilters((f) => ({
                      ...f,
                      priceMax:
                        f.priceMin && v < f.priceMin
                          ? f.priceMin
                          : v,
                    }));
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* YEAR RANGE */}
        {activeKey === "year" && (
          <div className="hz-field">
            <label>{labels.year}</label>
            <div className="hz-range-row">
              <div className="hz-range-inputs">
                <input
                  type="number"
                  className="hz-input-scroller"
                  value={filters.yearMin || ""}
                  onChange={(e) => {
                    const v = e.target.value
                      ? Number(e.target.value)
                      : undefined;
                    setFilters((f) => ({ ...f, yearMin: v }));
                  }}
                  placeholder={label("From", "من")}
                />
                <input
                  type="number"
                  className="hz-input-scroller"
                  value={filters.yearMax || ""}
                  onChange={(e) => {
                    const v = e.target.value
                      ? Number(e.target.value)
                      : undefined;
                    setFilters((f) => ({ ...f, yearMax: v }));
                  }}
                  placeholder={label("To", "إلى")}
                />
              </div>
              <div className="hz-range-slider-wrap">
                <input
                  type="range"
                  min="1980"
                  max={new Date().getFullYear()}
                  value={filters.yearMin || 1980}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setFilters((f) => ({
                      ...f,
                      yearMin:
                        f.yearMax && v > f.yearMax
                          ? f.yearMax
                          : v,
                    }));
                  }}
                />
                <input
                  type="range"
                  min="1980"
                  max={new Date().getFullYear()}
                  value={
                    filters.yearMax ||
                    new Date().getFullYear()
                  }
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setFilters((f) => ({
                      ...f,
                      yearMax:
                        f.yearMin && v < f.yearMin
                          ? f.yearMin
                          : v,
                    }));
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* MAX KM */}
        {activeKey === "km" && (
          <div className="hz-field">
            <label>{labels.km}</label>
            <div className="hz-range-row">
              <input
                type="number"
                className="hz-input-scroller"
                value={filters.mileageMax || ""}
                onChange={(e) => {
                  const v = e.target.value
                    ? Number(e.target.value)
                    : undefined;
                  setFilters((f) => ({
                    ...f,
                    mileageMax: v,
                  }));
                }}
                placeholder={label(
                  "Max kilometers",
                  "أقصى عدد كيلومترات"
                )}
              />
              <div className="hz-range-slider-wrap">
                <input
                  type="range"
                  min="0"
                  max="500000"
                  value={filters.mileageMax || 500000}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setFilters((f) => ({
                      ...f,
                      mileageMax: v,
                    }));
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* SPECS OPTIONS */}
        {activeKey === "specs" && (
          <div className="hz-field">
            <label>{labels.specs}</label>
            <div className="hz-specs-options">
              {["GCC", "EU", "USA", "Japan"].map((s) => (
                <button
                  key={s}
                  className={
                    "hz-spec-pill " +
                    (filters.specs === s
                      ? "hz-spec-pill-active"
                      : "")
                  }
                  onClick={() =>
                    setFilters((f) => ({
                      ...f,
                      specs: f.specs === s ? undefined : s,
                    }))
                  }
                >
                  {s === "Japan"
                    ? label("Japan", "ياباني")
                    : s}
                </button>
              ))}
            </div>
          </div>
        )}
      </Sheet>
    </div>
  );
}


/* PROPERTY FILTERS */

function PropertyFilters({ filters, setFilters, lang }) {
  const S = STRINGS[lang];
  const [activeKey, setActiveKey] = useState(null);
  const isAr = lang === "ar";

  function chipClass(key) {
    return (
      "hz-filter-chip " +
      (activeKey === key ? "hz-filter-chip-active" : "")
    );
  }

  function openSheet(key) {
    setActiveKey(key);
  }

  function closeSheet() {
    setActiveKey(null);
  }

  function Sheet({ children, title }) {
    if (!activeKey) return null;
    return (
      <div className="hz-filter-sheet-backdrop" onClick={closeSheet}>
        <div
          className="hz-filter-sheet"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="hz-filter-sheet-header">
            <span>{title}</span>
            <button
              className="hz-filter-sheet-done"
              onClick={closeSheet}
            >
              {isAr ? "تم" : "Done"}
            </button>
          </div>
          <div className="hz-filter-sheet-body">{children}</div>
        </div>
      </div>
    );
  }

  const sheetTitle =
    activeKey === "priceMin"
      ? isAr
        ? "الحد الأدنى للسعر"
        : "Minimum Price"
      : activeKey === "priceMax"
      ? isAr
        ? "الحد الأعلى للسعر"
        : "Maximum Price"
      : activeKey === "areaMin"
      ? isAr
        ? "الحد الأدنى للمساحة"
        : "Minimum Area"
      : activeKey === "areaMax"
      ? isAr
        ? "الحد الأعلى للمساحة"
        : "Maximum Area"
      : "";

  return (
    <div className="hz-filters">
      <div className="hz-filters-title">{S.propertyFilters}</div>

      {/* Horizontal scrollable chips */}
      <div className="hz-filter-chips-scroll">
        <button
          className={chipClass("priceMin")}
          onClick={() => openSheet("priceMin")}
        >
          {isAr ? "أدنى سعر" : "Min Price"}
          {filters.priceMin ? ` · ${filters.priceMin}` : ""}
        </button>

        <button
          className={chipClass("priceMax")}
          onClick={() => openSheet("priceMax")}
        >
          {isAr ? "أعلى سعر" : "Max Price"}
          {filters.priceMax ? ` · ${filters.priceMax}` : ""}
        </button>

        <button
          className={chipClass("areaMin")}
          onClick={() => openSheet("areaMin")}
        >
          {isAr ? "أقل مساحة" : "Min Area"}
          {filters.areaMin ? ` · ${filters.areaMin}` : ""}
        </button>

        <button
          className={chipClass("areaMax")}
          onClick={() => openSheet("areaMax")}
        >
          {isAr ? "أكبر مساحة" : "Max Area"}
          {filters.areaMax ? ` · ${filters.areaMax}` : ""}
        </button>
      </div>

      {/* Bottom sheet */}
      <Sheet title={sheetTitle}>
        {activeKey === "priceMin" && (
          <div className="hz-field">
            <label>
              {isAr ? "الحد الأدنى للسعر" : "Minimum Price"}
            </label>
            <input
              type="number"
              className="hz-input-scroller"
              value={filters.priceMin || ""}
              onChange={(e) => {
                const n = e.target.value
                  ? Number(e.target.value)
                  : undefined;
                setFilters((f) => ({ ...f, priceMin: n }));
              }}
              placeholder={isAr ? "أدنى سعر" : "Min price"}
            />
          </div>
        )}

        {activeKey === "priceMax" && (
          <div className="hz-field">
            <label>
              {isAr ? "الحد الأعلى للسعر" : "Maximum Price"}
            </label>
            <input
              type="number"
              className="hz-input-scroller"
              value={filters.priceMax || ""}
              onChange={(e) => {
                const n = e.target.value
                  ? Number(e.target.value)
                  : undefined;
                setFilters((f) => ({ ...f, priceMax: n }));
              }}
              placeholder={isAr ? "أعلى سعر" : "Max price"}
            />
          </div>
        )}

        {activeKey === "areaMin" && (
          <div className="hz-field">
            <label>
              {isAr
                ? "الحد الأدنى للمساحة (قدم²)"
                : "Minimum Area (sqft)"}
            </label>
            <input
              type="number"
              className="hz-input-scroller"
              value={filters.areaMin || ""}
              onChange={(e) => {
                const n = e.target.value
                  ? Number(e.target.value)
                  : undefined;
                setFilters((f) => ({ ...f, areaMin: n }));
              }}
              placeholder={isAr ? "أقل مساحة" : "Min sqft"}
            />
          </div>
        )}

        {activeKey === "areaMax" && (
          <div className="hz-field">
            <label>
              {isAr
                ? "الحد الأعلى للمساحة (قدم²)"
                : "Maximum Area (sqft)"}
            </label>
            <input
              type="number"
              className="hz-input-scroller"
              value={filters.areaMax || ""}
              onChange={(e) => {
                const n = e.target.value
                  ? Number(e.target.value)
                  : undefined;
                setFilters((f) => ({ ...f, areaMax: n }));
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

      if (filters.priceMin && (l.price || 0) < filters.priceMin)
        return false;

      if (filters.priceMax && (l.price || 0) > filters.priceMax)
        return false;

      if (filters.yearMin && (l.year || 0) < filters.yearMin)
        return false;

      if (filters.yearMax && (l.year || 0) > filters.yearMax)
        return false;

      if (filters.mileageMax && (l.mileage || 0) > filters.mileageMax)
        return false;

      if (filters.specs && l.specs !== filters.specs) return false;
    }


    if (isProp) {
      if (filters.priceMin && (l.price || 0) < filters.priceMin)
        return false;
      if (filters.priceMax && (l.price || 0) > filters.priceMax)
        return false;
      if (filters.areaMin && (l.areaSqft || 0) < filters.areaMin)
        return false;
      if (filters.areaMax && (l.areaSqft || 0) > filters.areaMax)
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
        <MotorsFilters
          lang={lang}
          filters={filters}
          setFilters={setFilters}
        />
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
          transform: "translateX(-" + active * 100 + "%)",
          width: PROMO_ADS.length * 100 + "%",
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
  const localizedDesc =
    lang === "ar" && item.descAr ? item.descAr : item.desc;
  const localizedLocation =
    lang === "ar" && item.locationAr ? item.locationAr : item.location;

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
                  "hz-detail-dot " +
                  (i === 0 ? "hz-detail-dot-active" : "")
                }
              />
            ))}
          </div>
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

        <div className="hz-detail-section-title">
          {S.detailsOverview}
        </div>

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
            />
          </div>
          <div className="hz-field">
            <label>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
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

function PostDialog({ open, onClose, lang, onCreateListing }) {
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
      currency: "USD",
      category,
      subcategory,
      location: city || "Damascus",
      locationAr:
        SYRIA_CITIES.find((c) => c.en === city)?.ar || undefined,
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
            >
              <option value="">
                {lang === "ar"
                  ? "اختر القسم"
                  : "Select category"}
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
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
              <div className="hz-field">
                <label>Seller</label>
                <select
                  value={sellerType}
                  onChange={(e) => setSellerType(e.target.value)}
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
                  type="number"
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
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
                type="number"
                value={area}
                onChange={(e) => setArea(e.target.value)}
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

/* ROOT APP */

export default function App() {
  const [lang, setLang] = useState("en");
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

  const showHome = !activeCategory && activeTab === "home";
  const showFavs = !activeCategory && activeTab === "favs";

  return (
    <div className="hz-root">
      <Header
        q={search}
        setQ={setSearch}
        onSearch={handleSearch}
        lang={lang}
        setLang={setLang}
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
            {activeCategory ? (
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
            ) : null}

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

            {showHome && !searchTerm ? (
              <HomeGrid
                lang={lang}
                favs={favs}
                listings={listings}
                toggleFav={toggleFav}
                onOpenCategory={openCategory}
                onOpenListing={(item) => setSelectedListing(item)}
              />
            ) : null}

            {showFavs ? (
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
            ) : null}

            {activeTab === "account" && user ? (
              <AccountPage user={user} />
            ) : null}
          </>
        )}
      </main>

      <BottomNav
        active={activeTab}
        setActive={(tab) => {
          setActiveTab(tab);
          if (tab !== "post") {
            setActiveCategoryKey(null);
            setSelectedListing(null);
            if (tab !== "home") {
              setSearchTerm("");
            }
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
      />
    </div>
  );
}
