import React, { useState } from "react";
import {
  Search,
  Home,
  Heart,
  PlusCircle,
  User,
  Car,
  Building2,
  BedDouble,
  Store,
  Sofa,
  Briefcase,
  MapPin,
  Tag,
  ChevronRight,
  ChevronLeft,
  MessageCircle,
  Languages,
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
    home: "Home",
    favourites: "Favourites",
    placeListing: "Place Listing",
    account: "Account",
    latestListings: "Latest Listings",
    seeAll: "See all",
    feeNote:
      "Cars cost $3 per listing. Properties (rent/sale/off-plan/rooms) cost $10 per listing. Others are free.",
    motorsFilters: "Motors Filters",
    propertyFilters: "Property Filters",
    createAccountToPost: "Please create an account before placing a listing.",
    adSpace: "Ad space",
    adSpaceDesc: "External banner placement for partners.",
    detailsOverview: "Overview",
    detailsContact: "Contact seller",
    whatsappMessage: "Hi, I'm interested in your listing:",
    createAccount: "Create Account",
    or: "or",
    cancel: "Cancel",
    save: "Save",
    images: "Images",
    fileSelected: "file(s) selected",
    postingFee: "Posting fee",
    freeCategory: "This category is free to post.",
    payPostMock: "Pay & Post (mock)",
    myAds: "My Ads",
    mySearches: "My Searches",
    joinedOn: "Joined on July 2023",
    getVerified: "Get Verified",
    profileInfo: "Profile & Basic Info",
    phonesAddresses: "Phone Numbers & Addresses",
    passwordSecurity: "Password & Security",
    myAdsStatus: "My Ads Status",
    notificationsSettings: "Notifications & Email Settings",
    accountSettings: "Account Settings",
    deactivateDelete: "Deactivate / Delete Account",
    logout: "Log Out",
    featured: "Featured",
  },
  ar: {
    searchPlaceholder: "ابحث عن أي شيء...",
    home: "الرئيسية",
    favourites: "المفضلة",
    placeListing: "إضافة إعلان",
    account: "الحساب",
    latestListings: "أحدث الإعلانات",
    seeAll: "عرض الكل",
    feeNote:
      "إعلانات السيارات 3$ للإعلان. العقارات (إيجار/بيع/خطة/غرف) 10$ للإعلان. باقي الأقسام مجانية.",
    motorsFilters: "فلاتر السيارات",
    propertyFilters: "فلاتر العقارات",
    createAccountToPost: "يرجى إنشاء حساب قبل إضافة إعلان.",
    adSpace: "مساحة إعلانية",
    adSpaceDesc: "مكان لوضع إعلانات الشركاء.",
    detailsOverview: "نظرة عامة",
    detailsContact: "تواصل مع المعلن",
    whatsappMessage: "مرحباً، أنا مهتم بالإعلان:",
    createAccount: "إنشاء حساب",
    or: "أو",
    cancel: "إلغاء",
    save: "حفظ",
    images: "الصور",
    fileSelected: "ملف/ملفات محددة",
    postingFee: "رسوم النشر",
    freeCategory: "هذا القسم مجاني للنشر.",
    payPostMock: "ادفع وانشر (تجريبي)",
    myAds: "إعلاناتي",
    mySearches: "بحثي",
    joinedOn: "انضم منذ يوليو 2023",
    getVerified: "الحصول على التحقق",
    profileInfo: "الملف الشخصي والمعلومات الأساسية",
    phonesAddresses: "أرقام الهواتف والعناوين",
    passwordSecurity: "كلمة المرور والأمان",
    myAdsStatus: "حالة إعلاناتي",
    notificationsSettings: "إعدادات الإشعارات والبريد",
    accountSettings: "إعدادات الحساب",
    deactivateDelete: "إلغاء / حذف الحساب",
    logout: "تسجيل الخروج",
    featured: "مميز",
  },
};

/* CATEGORY DEFINITIONS */

const CATEGORY_DEFS = [
  {
    key: "rent",
    label: "Properties for Rent",
    labelAr: "عقارات للإيجار",
    icon: Building2,
    isProperty: true,
    subcategories: [
      { key: "apartment", label: "Apartments", labelAr: "شقق" },
      { key: "villa", label: "Villas", labelAr: "فلل" },
      { key: "townhouse", label: "Townhouses", labelAr: "تاون هاوس" },
      { key: "room", label: "Rooms", labelAr: "غرف" },
    ],
  },
  {
    key: "sale",
    label: "Properties for Sale",
    labelAr: "عقارات للبيع",
    icon: Home,
    isProperty: true,
    subcategories: [
      { key: "apartment", label: "Apartments", labelAr: "شقق" },
      { key: "villa", label: "Villas", labelAr: "فلل" },
      { key: "plot", label: "Plots", labelAr: "أراضٍ" },
      { key: "offplan", label: "Off-plan", labelAr: "على المخطط" },
    ],
  },
  {
    key: "offplan",
    label: "Off Plan Properties",
    labelAr: "عقارات على المخطط",
    icon: MapPin,
    isProperty: true,
    subcategories: [
      { key: "apt", label: "Off-plan Apts", labelAr: "شقق على المخطط" },
      { key: "villa", label: "Off-plan Villas", labelAr: "فلل على المخطط" },
    ],
  },
  {
    key: "rooms",
    label: "Rooms for Rent",
    labelAr: "غرف للإيجار",
    icon: BedDouble,
    isProperty: true,
    subcategories: [
      { key: "shared", label: "Shared", labelAr: "مشتركة" },
      { key: "private", label: "Private", labelAr: "خاصة" },
      { key: "master", label: "Master", labelAr: "ماستر" },
    ],
  },
  {
    key: "motors",
    label: "Motors",
    labelAr: "المحركات",
    icon: Car,
    isProperty: false,
    subcategories: [{ key: "cars", label: "Cars", labelAr: "سيارات" }],
  },
  {
    key: "jobs",
    label: "Jobs",
    labelAr: "وظائف",
    icon: Briefcase,
    isProperty: false,
    subcategories: [
      { key: "sales", label: "Sales", labelAr: "مبيعات" },
      { key: "it", label: "IT", labelAr: "تقنية معلومات" },
      { key: "admin", label: "Admin", labelAr: "إداري" },
      { key: "marketing", label: "Marketing", labelAr: "تسويق" },
    ],
  },
  {
    key: "classifieds",
    label: "Classifieds",
    labelAr: "إعلانات مبوبة",
    icon: Store,
    isProperty: false,
    subcategories: [
      { key: "electronics", label: "Electronics", labelAr: "إلكترونيات" },
      { key: "fashion", label: "Fashion", labelAr: "أزياء" },
      { key: "services", label: "Services", labelAr: "خدمات" },
      { key: "pets", label: "Pets", labelAr: "حيوانات أليفة" },
    ],
  },
  {
    key: "furniture",
    label: "Furniture & Garden",
    labelAr: "أثاث وحديقة",
    icon: Sofa,
    isProperty: false,
    subcategories: [
      { key: "sofa", label: "Sofas", labelAr: "كنب" },
      { key: "bed", label: "Beds", labelAr: "أسرة" },
      { key: "outdoor", label: "Outdoor", labelAr: "خارجي" },
      { key: "decor", label: "Décor", labelAr: "ديكور" },
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
  "__all",
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
  "Dongfeng",
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
  "Proton",
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
  var required = [
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

function getCityName(cityEn, lang) {
  if (!cityEn) return "";
  if (lang !== "ar") return cityEn;
  const found = SYRIA_CITIES.find((c) => c.en === cityEn);
  return found ? found.ar : cityEn;
}

function listingTitle(item, lang) {
  return lang === "ar" && item.titleAr ? item.titleAr : item.title;
}
function listingDesc(item, lang) {
  return lang === "ar" && item.descAr ? item.descAr : item.desc;
}
function listingLocation(item, lang) {
  if (lang === "ar") {
    if (item.locationAr) return item.locationAr;
    return getCityName(item.location, "ar");
  }
  return item.location;
}

/* MOCK LISTINGS */

const MOCK_LISTINGS = [
  {
    id: "l1",
    title: "1BR Apartment | Downtown Damascus",
    titleAr: "شقة غرفة نوم واحدة | وسط دمشق",
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
    ],
    desc: "Bright 1BR apartment in central Damascus, close to shops and cafés.",
    descAr:
      "شقة غرفة نوم واحدة مشرقة في وسط دمشق، قريبة من المحال التجارية والمقاهي.",
    featured: true,
  },
  {
    id: "l2",
    title: "2018 Toyota Camry | GCC | Full service",
    titleAr: "تويوتا كامري 2018 | مواصفات خليجية | سيرفس كامل",
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
    titleAr: "كنبة حديثة | شبه جديدة",
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
    descAr: "كنبة ثلاثية مريحة، استخدام بسيط.",
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
    titleAr: "مرسيدس C-Class 2021 | تحت الضمان",
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
    ],
    desc: "Dealer-maintained C-Class with remaining warranty and full options.",
    descAr: "C-Class من الوكيل مع ضمان ساري ومواصفات كاملة.",
    featured: true,
  },
];

/* BASIC COMPONENTS */

function AdBanner({ lang }) {
  const S = STRINGS[lang];
  return (
    <div className="hz-ad">
      <div className="hz-ad-label">{S.adSpace}</div>
      <div className="hz-ad-text">{S.adSpaceDesc}</div>
    </div>
  );
}

function WhatsAppButton({ number, title, lang }) {
  if (!number) return null;
  const msg = STRINGS[lang].whatsappMessage;
  const url =
    "https://wa.me/" +
    number.replace(/[^\d+]/g, "") +
    "?text=" +
    encodeURIComponent(msg + " " + title);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="hz-whatsapp"
      onClick={(e) => e.stopPropagation()}
    >
      <MessageCircle size={14} />
      <span>{lang === "ar" ? "واتساب" : "WhatsApp"}</span>
    </a>
  );
}

function ListingCard({ item, fav, onToggleFav, onOpen, lang }) {
  const title = listingTitle(item, lang);
  const loc = listingLocation(item, lang);
  const S = STRINGS[lang];

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
          alt={title}
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
        {item.featured && (
          <div className="hz-badge">{S.featured}</div>
        )}
      </div>
      <div className="hz-card-body">
        <div className="hz-card-title-row">
          <h3 className="hz-card-title">{title}</h3>
          <Tag size={14} className="hz-card-tag" />
        </div>
        <div className="hz-card-price-row">
          <span className="hz-price">
            {item.currency}{" "}
            {item.price != null ? item.price.toLocaleString() : ""}
          </span>
          <span className="hz-loc">
            <MapPin size={12} />
            {loc}
          </span>
        </div>
        <div className="hz-card-meta">
          {item.year && (
            <span>
              {lang === "ar" ? "الموديل" : "Year"}: {item.year}
            </span>
          )}
          {item.mileage && (
            <span>
              {lang === "ar" ? "المسافة" : "Mileage"}:{" "}
              {item.mileage.toLocaleString()} km
            </span>
          )}
          {item.specs && (
            <span>
              {lang === "ar" ? "المواصفات" : "Specs"}: {item.specs}
            </span>
          )}
          {item.areaSqft && (
            <span>
              {lang === "ar" ? "المساحة" : "Area"}: {item.areaSqft} sqft
            </span>
          )}
          {item.sellerType && (
            <span>
              {lang === "ar" ? "البائع" : "Seller"}:{" "}
              {item.sellerType === "private"
                ? lang === "ar"
                  ? "شخصي"
                  : "Private"
                : item.sellerType === "dealership"
                ? lang === "ar"
                  ? "معرض"
                  : "Dealership"
                : item.sellerType}
            </span>
          )}
        </div>
        <WhatsAppButton number={item.whatsapp} title={title} lang={lang} />
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
      <Item
        id="post"
        icon={PlusCircle}
        label={S.placeListing}
        onClick={onPost}
      />
      <Item
        id="account"
        icon={User}
        label={S.account}
        onClick={onAccount}
      />
    </div>
  );
}

/* MOTORS FILTERS – HORIZONTAL CHIPS + PANEL */

function MotorsFilters({ filters, setFilters, lang }) {
  const S = STRINGS[lang];
  const isAr = lang === "ar";
  const [activeFilter, setActiveFilter] = useState(null);

  function chipClass(key) {
    return (
      "hz-filter-chip " +
      (activeFilter === key ? "hz-filter-chip-active" : "")
    );
  }

  return (
    <div className="hz-filters">
      <div className="hz-filters-title">{S.motorsFilters}</div>

      <div className="hz-filter-chips-scroll">
        <button
          className={chipClass("brand")}
          onClick={() =>
            setActiveFilter(activeFilter === "brand" ? null : "brand")
          }
        >
          {isAr ? "ماركة السيارة" : "Brand"}
          {filters.brand ? ` · ${filters.brand}` : ""}
        </button>

        <button
          className={chipClass("sellerType")}
          onClick={() =>
            setActiveFilter(
              activeFilter === "sellerType" ? null : "sellerType"
            )
          }
        >
          {isAr ? "نوع البائع" : "Seller"}
          {filters.sellerType
            ? ` · ${
                filters.sellerType === "private"
                  ? isAr
                    ? "شخصي"
                    : "Private"
                  : isAr
                  ? "معرض"
                  : "Dealership"
              }`
            : ""}
        </button>

        <button
          className={chipClass("model")}
          onClick={() =>
            setActiveFilter(activeFilter === "model" ? null : "model")
          }
        >
          {isAr ? "الطراز" : "Model"}
          {filters.model ? ` · ${filters.model}` : ""}
        </button>

        <button
          className={chipClass("priceMax")}
          onClick={() =>
            setActiveFilter(
              activeFilter === "priceMax" ? null : "priceMax"
            )
          }
        >
          {isAr ? "أعلى سعر" : "Max Price"}
          {filters.priceMax ? ` · ${filters.priceMax}` : ""}
        </button>
      </div>

      <div className="hz-filter-active-panel">
        {activeFilter === "brand" && (
          <div className="hz-field">
            <label>{isAr ? "اختر الماركة" : "Select brand"}</label>
            <select
              value={filters.brand || ""}
              onChange={(e) => {
                const v = e.target.value || undefined;
                setFilters((f) => ({ ...f, brand: v }));
              }}
            >
              <option value="">
                {isAr ? "أي ماركة" : "Any brand"}
              </option>
              {CAR_BRANDS.filter((b) => b !== "__all").map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        )}

        {activeFilter === "sellerType" && (
          <div className="hz-field">
            <label>{isAr ? "نوع البائع" : "Seller type"}</label>
            <select
              value={filters.sellerType || ""}
              onChange={(e) => {
                const v = e.target.value || undefined;
                setFilters((f) => ({ ...f, sellerType: v }));
              }}
            >
              <option value="">
                {isAr ? "أي" : "Any"}
              </option>
              <option value="private">
                {isAr ? "شخصي" : "Private"}
              </option>
              <option value="dealership">
                {isAr ? "معرض" : "Dealership"}
              </option>
            </select>
          </div>
        )}

        {activeFilter === "model" && (
          <div className="hz-field">
            <label>{isAr ? "اسم الطراز" : "Model name"}</label>
            <input
              value={filters.model || ""}
              onChange={(e) => {
                const v = e.target.value || undefined;
                setFilters((f) => ({ ...f, model: v }));
              }}
              placeholder={isAr ? "مثال: C-Class" : "e.g. C-Class"}
            />
          </div>
        )}

        {activeFilter === "priceMax" && (
          <div className="hz-field">
            <label>
              {isAr ? "أقصى سعر (بالدولار/العملة المعروضة)" : "Maximum price"}
            </label>
            <input
              type="number"
              value={filters.priceMax || ""}
              onChange={(e) => {
                const n = e.target.value
                  ? Number(e.target.value)
                  : undefined;
                setFilters((f) => ({ ...f, priceMax: n }));
              }}
              placeholder={isAr ? "أدخل أقصى سعر" : "Enter max price"}
            />
          </div>
        )}
      </div>
    </div>
  );
}

/* PROPERTY FILTERS – SAME PATTERN */

function PropertyFilters({ filters, setFilters, lang }) {
  const S = STRINGS[lang];
  const [activeFilter, setActiveFilter] = useState(null);

  function chipClass(key) {
    return (
      "hz-filter-chip " +
      (activeFilter === key ? "hz-filter-chip-active" : "")
    );
  }

  return (
    <div className="hz-filters">
      <div className="hz-filters-title">{S.propertyFilters}</div>

      <div className="hz-filter-chips-scroll">
        <button
          className={chipClass("priceMin")}
          onClick={() =>
            setActiveFilter(
              activeFilter === "priceMin" ? null : "priceMin"
            )
          }
        >
          {lang === "ar" ? "أدنى سعر" : "Min Price"}
          {filters.priceMin ? ` · ${filters.priceMin}` : ""}
        </button>
        <button
          className={chipClass("priceMax")}
          onClick={() =>
            setActiveFilter(
              activeFilter === "priceMax" ? null : "priceMax"
            )
          }
        >
          {lang === "ar" ? "أعلى سعر" : "Max Price"}
          {filters.priceMax ? ` · ${filters.priceMax}` : ""}
        </button>
        <button
          className={chipClass("areaMin")}
          onClick={() =>
            setActiveFilter(
              activeFilter === "areaMin" ? null : "areaMin"
            )
          }
        >
          {lang === "ar" ? "أقل مساحة" : "Min Area"}
          {filters.areaMin ? ` · ${filters.areaMin}` : ""}
        </button>
        <button
          className={chipClass("areaMax")}
          onClick={() =>
            setActiveFilter(
              activeFilter === "areaMax" ? null : "areaMax"
            )
          }
        >
          {lang === "ar" ? "أكبر مساحة" : "Max Area"}
          {filters.areaMax ? ` · ${filters.areaMax}` : ""}
        </button>
      </div>

      <div className="hz-filter-active-panel">
        {activeFilter === "priceMin" && (
          <div className="hz-field">
            <label>
              {lang === "ar" ? "أدنى سعر" : "Minimum Price"}
            </label>
            <input
              type="number"
              value={filters.priceMin || ""}
              onChange={(e) => {
                const n = e.target.value
                  ? Number(e.target.value)
                  : undefined;
                setFilters((f) => ({ ...f, priceMin: n }));
              }}
              placeholder={lang === "ar" ? "أدنى سعر" : "Min price"}
            />
          </div>
        )}

        {activeFilter === "priceMax" && (
          <div className="hz-field">
            <label>
              {lang === "ar" ? "أعلى سعر" : "Maximum Price"}
            </label>
            <input
              type="number"
              value={filters.priceMax || ""}
              onChange={(e) => {
                const n = e.target.value
                  ? Number(e.target.value)
                  : undefined;
                setFilters((f) => ({ ...f, priceMax: n }));
              }}
              placeholder={lang === "ar" ? "أعلى سعر" : "Max price"}
            />
          </div>
        )}

        {activeFilter === "areaMin" && (
          <div className="hz-field">
            <label>
              {lang === "ar"
                ? "أقل مساحة (قدم مربع)"
                : "Minimum Area (sqft)"}
            </label>
            <input
              type="number"
              value={filters.areaMin || ""}
              onChange={(e) => {
                const n = e.target.value
                  ? Number(e.target.value)
                  : undefined;
                setFilters((f) => ({ ...f, areaMin: n }));
              }}
              placeholder={
                lang === "ar" ? "أقل مساحة" : "Min sqft"
              }
            />
          </div>
        )}

        {activeFilter === "areaMax" && (
          <div className="hz-field">
            <label>
              {lang === "ar"
                ? "أكبر مساحة (قدم مربع)"
                : "Maximum Area (sqft)"}
            </label>
            <input
              type="number"
              value={filters.areaMax || ""}
              onChange={(e) => {
                const n = e.target.value
                  ? Number(e.target.value)
                  : undefined;
                setFilters((f) => ({ ...f, areaMax: n }));
              }}
              placeholder={
                lang === "ar" ? "أكبر مساحة" : "Max sqft"
              }
            />
          </div>
        )}
      </div>
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
  setActiveSub,
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

      if (
        filters.model &&
        (!l.model ||
          l.model.toLowerCase().indexOf(filters.model.toLowerCase()) ===
            -1)
      ) {
        return false;
      }

      if (filters.sellerType && l.sellerType !== filters.sellerType)
        return false;

      if (filters.priceMax && (l.price || 0) > filters.priceMax)
        return false;
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

  const title = lang === "ar" ? cat.labelAr || cat.label : cat.label;

  return (
    <div className="hz-page">
      <div className="hz-page-header">
        <button className="hz-back-btn" onClick={onBack}>
          <ChevronLeft />
        </button>
        <h2>{title}</h2>
      </div>

      <AdBanner lang={lang} />

      {cat.subcategories && cat.subcategories.length > 1 && (
        <div className="hz-filter-chips-scroll">
          {cat.subcategories.map((s) => {
            const label = lang === "ar" ? s.labelAr || s.label : s.label;
            const isActive = activeSub === s.key;
            return (
              <button
                key={s.key}
                className={
                  "hz-filter-chip " +
                  (isActive ? "hz-filter-chip-active" : "")
                }
                onClick={() => setActiveSub(s.key)}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}

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

/* PROMO CAROUSEL – 3 ADS (ChatGPT, Ferrari, Syriatel) */

const PROMO_ADS = [
  {
    id: "chatgpt",
    titleEn: "ChatGPT for Smarter Listings",
    titleAr: "ChatGPT لإعلانات أذكى",
    descEn: "Use AI to write better titles, descriptions & replies.",
    descAr: "استخدم الذكاء الاصطناعي لصياغة عناوين ووصف أفضل.",
    ctaEn: "Open ChatGPT",
    ctaAr: "افتح ChatGPT",
    bg: "linear-gradient(135deg, #111827, #4b5563)",
    accent: "#22c55e",
    url: "https://chat.openai.com",
  },
  {
    id: "ferrari",
    titleEn: "Ferrari – The Ultimate Drive",
    titleAr: "فيراري – قمة القيادة",
    descEn: "Explore the official Ferrari world of performance & design.",
    descAr: "اكتشف عالم فيراري من الأداء والفخامة.",
    ctaEn: "Visit Ferrari",
    ctaAr: "زيارة الموقع",
    bg: "linear-gradient(135deg, #450a0a, #b91c1c)",
    accent: "#fecaca",
    url: "https://www.ferrari.com",
  },
  {
    id: "syriatel",
    titleEn: "Syriatel Online Services",
    titleAr: "خدمات سيرياتيل أونلاين",
    descEn: "Check offers, recharge & manage your line online.",
    descAr: "تحقق من العروض، اشحن وأدر خطك عبر الإنترنت.",
    ctaEn: "Go to Syriatel",
    ctaAr: "زيارة سيرياتيل",
    bg: "linear-gradient(135deg, #1d4ed8, #38bdf8)",
    accent: "#eff6ff",
    url: "https://www.syriatel.sy",
  },
];

function PromoCarousel({ lang }) {
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
    if (!url) return;
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
    if (Math.abs(diff) > 40) {
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
        {PROMO_ADS.map((ad) => {
          const title =
            lang === "ar" ? ad.titleAr || ad.titleEn : ad.titleEn;
          const desc =
            lang === "ar" ? ad.descAr || ad.descEn : ad.descEn;
          const cta = lang === "ar" ? ad.ctaAr || ad.ctaEn : ad.ctaEn;

          return (
            <div
              key={ad.id}
              className="hz-promo-slide"
              style={{ background: ad.bg }}
              onClick={() => handleClick(ad.url)}
            >
              <div className="hz-promo-content">
                <div className="hz-promo-title">{title}</div>
                <div className="hz-promo-desc">{desc}</div>
                <div
                  className="hz-promo-cta"
                  style={{ backgroundColor: ad.accent }}
                >
                  {cta}
                </div>
              </div>
            </div>
          );
        })}
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
          const label = lang === "ar" ? c.labelAr || c.label : c.label;
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
                <span>{label}</span>
              </div>
              <ChevronRight size={18} />
            </button>
          );
        })}
      </div>

      <PromoCarousel lang={lang} />

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
  const title = listingTitle(item, lang);
  const loc = listingLocation(item, lang);
  const desc = listingDesc(item, lang);

  return (
    <div className="hz-detail">
      <button className="hz-detail-back" onClick={onBack}>
        <ChevronLeft size={20} />
      </button>

      <div className="hz-detail-img-wrap">
        {item.imgs && item.imgs.length > 0 && (
          <img
            src={item.imgs[0]}
            alt={title}
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
        <div className="hz-detail-title">{title}</div>

        <div className="hz-detail-meta-row">
          {item.year && (
            <span>
              {lang === "ar" ? "الموديل" : "Year"} {item.year}
            </span>
          )}
          {item.mileage != null && (
            <span>
              {lang === "ar" ? "المسافة" : "Mileage"}{" "}
              {item.mileage.toLocaleString()} km
            </span>
          )}
          {item.specs && (
            <span>
              {lang === "ar" ? "المواصفات" : "Specs"} {item.specs}
            </span>
          )}
          {item.areaSqft && (
            <span>
              {lang === "ar" ? "المساحة" : "Area"} {item.areaSqft} sqft
            </span>
          )}
          {loc && (
            <span className="hz-detail-loc">
              <MapPin size={12} />
              {loc}
            </span>
          )}
        </div>

        <div className="hz-detail-section-title">
          {S.detailsOverview}
        </div>

        <div className="hz-detail-overview">
          {item.brand && (
            <div className="hz-detail-row">
              <span>{lang === "ar" ? "الماركة" : "Brand"}</span>
              <span>{item.brand}</span>
            </div>
          )}
          {item.model && (
            <div className="hz-detail-row">
              <span>{lang === "ar" ? "الطراز" : "Model"}</span>
              <span>{item.model}</span>
            </div>
          )}
          {item.sellerType && (
            <div className="hz-detail-row">
              <span>{lang === "ar" ? "نوع البائع" : "Seller"}</span>
              <span>
                {item.sellerType === "private"
                  ? lang === "ar"
                    ? "شخصي"
                    : "Private"
                  : item.sellerType === "dealership"
                  ? lang === "ar"
                    ? "معرض"
                    : "Dealership"
                  : item.sellerType}
              </span>
            </div>
          )}
          {item.areaSqft && (
            <div className="hz-detail-row">
              <span>{lang === "ar" ? "المساحة" : "Area"}</span>
              <span>{item.areaSqft} sqft</span>
            </div>
          )}
        </div>

        <div className="hz-detail-desc">
          {desc ||
            (lang === "ar"
              ? "ستظهر هنا تفاصيل الإعلان التي يضيفها صاحب الإعلان."
              : "Listing description will appear here with all relevant details provided by the seller.")}
        </div>

        <div className="hz-detail-contact">
          <WhatsAppButton number={item.whatsapp} title={title} lang={lang} />
        </div>
      </div>
    </div>
  );
}

/* ACCOUNT PAGE */

function AccountPage({ user, lang }) {
  const S = STRINGS[lang];
  const displayName =
    (user && user.name) ||
    (lang === "ar" ? "مستخدم هَزلي" : "Huzzlie User");

  function demo(msgEn, msgAr) {
    alert(lang === "ar" ? msgAr : msgEn);
  }

  return (
    <div className="hz-page hz-account">
      <div className="hz-account-card">
        <div className="hz-account-avatar">
          <UserCircle size={42} />
        </div>
        <div className="hz-account-main">
          <div className="hz-account-name">{displayName}</div>
          <div className="hz-account-joined">{S.joinedOn}</div>
        </div>
        <button
          className="hz-account-verify"
          onClick={() =>
            demo(
              "Verification flow coming soon (demo).",
              "ميزة التحقق قادمة قريباً (تجريبي)."
            )
          }
        >
          {S.getVerified}
        </button>
      </div>

      <div className="hz-account-actions">
        <button
          className="hz-account-action"
          onClick={() =>
            demo("My Ads section (demo).", "قسم إعلاناتي (تجريبي).")
          }
        >
          <Bookmark size={20} />
          <span>{S.myAds}</span>
        </button>
        <button
          className="hz-account-action"
          onClick={() =>
            demo(
              "My Searches section (demo).",
              "قسم عمليات البحث (تجريبي)."
            )
          }
        >
          <Search size={20} />
          <span>{S.mySearches}</span>
        </button>
      </div>

      <div className="hz-account-list">
        <button
          className="hz-account-item"
          onClick={() =>
            demo(
              "Edit basic info (demo).",
              "تعديل المعلومات الأساسية (تجريبي)."
            )
          }
        >
          <User size={18} />
          <span>{S.profileInfo}</span>
        </button>

        <button
          className="hz-account-item"
          onClick={() =>
            demo(
              "Manage phone numbers & addresses (demo).",
              "إدارة أرقام الهواتف والعناوين (تجريبي)."
            )
          }
        >
          <Phone size={18} />
          <span>{S.phonesAddresses}</span>
        </button>

        <button
          className="hz-account-item"
          onClick={() =>
            demo(
              "Change password & security settings (demo).",
              "تغيير كلمة المرور والأمان (تجريبي)."
            )
          }
        >
          <Shield size={18} />
          <span>{S.passwordSecurity}</span>
        </button>

        <button
          className="hz-account-item"
          onClick={() =>
            demo(
              "View ads status (demo).",
              "عرض حالة الإعلانات (تجريبي)."
            )
          }
        >
          <Bookmark size={18} />
          <span>{S.myAdsStatus}</span>
        </button>

        <button
          className="hz-account-item"
          onClick={() =>
            demo(
              "Notifications settings (demo).",
              "إعدادات الإشعارات والبريد (تجريبي)."
            )
          }
        >
          <Bell size={18} />
          <span>{S.notificationsSettings}</span>
        </button>

        <button
          className="hz-account-item"
          onClick={() =>
            demo(
              "General account settings (demo).",
              "إعدادات الحساب العامة (تجريبي)."
            )
          }
        >
          <Settings size={18} />
          <span>{S.accountSettings}</span>
        </button>

        <button
          className="hz-account-item hz-account-danger"
          onClick={() =>
            demo(
              "Deactivate / delete flow (demo).",
              "إلغاء / حذف الحساب (تجريبي)."
            )
          }
        >
          <Trash2 size={18} />
          <span>{S.deactivateDelete}</span>
        </button>

        <button
          className="hz-account-item"
          onClick={() =>
            demo("Logged out (demo).", "تم تسجيل الخروج (تجريبي).")
          }
        >
          <LogOut size={18} />
          <span>{S.logout}</span>
        </button>
      </div>
    </div>
  );
}

/* ACCOUNT SHEET */

function AccountSheet({ open, onClose, setUser, lang }) {
  const S = STRINGS[lang];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (!open) return null;

  function completeWithProvider(key) {
    const displayName =
      name ||
      (lang === "ar"
        ? `مستخدم ${key.toUpperCase()}`
        : `${key.toUpperCase()} User`);
    const displayEmail = email || `${key}@huzzlie.com`;
    setUser({ name: displayName, email: displayEmail });
    onClose();
  }

  function completeManual() {
    if (!name && !email) return;
    setUser({
      name: name || (lang === "ar" ? "مستخدم هَزلي" : "Huzzlie User"),
      email: email || "user@huzzlie.com",
    });
    onClose();
  }

  return (
    <div className="hz-modal-backdrop">
      <div className="hz-modal">
        <div className="hz-modal-header">
          <h3>{S.createAccount}</h3>
          <button className="hz-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="hz-modal-body">
          <button
            className="hz-provider-btn"
            onClick={() => completeWithProvider("google")}
          >
            {lang === "ar"
              ? "متابعة باستخدام Google"
              : "Continue with Google"}
          </button>
          <button
            className="hz-provider-btn"
            onClick={() => completeWithProvider("microsoft")}
          >
            {lang === "ar"
              ? "متابعة باستخدام Microsoft"
              : "Continue with Microsoft (Hotmail/Outlook)"}
          </button>
          <button
            className="hz-provider-btn"
            onClick={() => completeWithProvider("apple")}
          >
            {lang === "ar"
              ? "متابعة باستخدام Apple"
              : "Continue with Apple"}
          </button>
          <div className="hz-or">{S.or}</div>

          <div className="hz-field">
            <label>{lang === "ar" ? "الاسم" : "Name"}</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={lang === "ar" ? "اسمك" : "Your name"}
            />
          </div>
          <div className="hz-field">
            <label>
              {lang === "ar" ? "البريد الإلكتروني" : "Email"}
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div className="hz-modal-footer">
          <button className="hz-secondary" onClick={onClose}>
            {S.cancel}
          </button>
          <button className="hz-primary" onClick={completeManual}>
            {S.save}
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

  const catDef = CATEGORY_DEFS.find((c) => c.key === category);
  const fee = postingFeeFor(category, subcategory);

  if (!open) return null;

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
      alert(
        lang === "ar"
          ? "يرجى تعبئة العنوان، الفئة، القسم الفرعي ورقم الواتساب."
          : "Please fill title, category, subcategory & WhatsApp."
      );
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
        lang === "ar"
          ? "في قسم السيارات، الماركة والطراز والموديل والمواصفات ونوع البائع والمسافة ورقم الهيكل مطلوبة."
          : "For Motors > Cars, brand, model, year, specs, seller, mileage & VIN are required."
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
      locationAr: getCityName(city || "Damascus", "ar"),
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

    if (onCreateListing) onCreateListing(newListing);

    if (fee.amount) {
      alert(
        lang === "ar"
          ? `تم إنشاء الإعلان. سيتم احتساب رسوم ${fee.amount}$ (${fee.reason}) في النسخة النهائية.`
          : `Listing created. A $${fee.amount} fee would apply (${fee.reason}) in production.`
      );
    } else {
      alert(
        lang === "ar"
          ? "تم إنشاء الإعلان. هذا القسم مجاني للنشر."
          : "Listing created. This category is free to post."
      );
    }

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
          {/* Category */}
          <div className="hz-field">
            <label>{lang === "ar" ? "الفئة" : "Category"}</label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSubcategory("");
              }}
            >
              <option value="">
                {lang === "ar" ? "اختر الفئة" : "Select category"}
              </option>
              {CATEGORY_DEFS.map((c) => (
                <option key={c.key} value={c.key}>
                  {lang === "ar" ? c.labelAr || c.label : c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory */}
          <div className="hz-field">
            <label>
              {lang === "ar" ? "القسم الفرعي" : "Subcategory"}
            </label>
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
                  ? "اختر الفئة أولاً"
                  : "Select category first"}
              </option>
              {catDef &&
                catDef.subcategories.map((s) => (
                  <option key={s.key} value={s.key}>
                    {lang === "ar" ? s.labelAr || s.label : s.label}
                  </option>
                ))}
            </select>
          </div>

          {/* Titles */}
          <div className="hz-field">
            <label>
              {lang === "ar" ? "العنوان (إنجليزي)" : "Title (EN)"}
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                lang === "ar"
                  ? "عنوان الإعلان بالإنجليزية"
                  : "Listing title"
              }
            />
          </div>

          <div className="hz-field">
            <label>
              {lang === "ar" ? "العنوان (عربي)" : "Title (AR)"}
            </label>
            <input
              value={titleAr}
              onChange={(e) => setTitleAr(e.target.value)}
              placeholder={
                lang === "ar"
                  ? "عنوان الإعلان بالعربية (اختياري)"
                  : "Listing title in Arabic (optional)"
              }
            />
          </div>

          {/* Price */}
          <div className="hz-field">
            <label>
              {lang === "ar"
                ? "السعر (اختياري)"
                : "Price (optional)"}
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder={lang === "ar" ? "السعر" : "Price"}
            />
          </div>

          {/* WhatsApp */}
          <div className="hz-field">
            <label>{lang === "ar" ? "رقم واتساب" : "WhatsApp"}</label>
            <input
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="+9639xxxxxxxx"
            />
          </div>

          {/* City */}
          <div className="hz-field">
            <label>{lang === "ar" ? "المدينة" : "City"}</label>
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

          {/* Car specific */}
          {isCar(category, subcategory) && (
            <>
              <div className="hz-field">
                <label>{lang === "ar" ? "الماركة" : "Brand"}</label>
                <input
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder={
                    lang === "ar"
                      ? "مثال: Mercedes"
                      : "e.g. Mercedes"
                  }
                />
              </div>
              <div className="hz-field">
                <label>{lang === "ar" ? "الطراز" : "Model"}</label>
                <input
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder={
                    lang === "ar"
                      ? "مثال: C-Class"
                      : "e.g. C-Class"
                  }
                />
              </div>
              <div className="hz-field">
                <label>{lang === "ar" ? "الموديل" : "Year"}</label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
              <div className="hz-field">
                <label>
                  {lang === "ar" ? "نوع البائع" : "Seller"}
                </label>
                <select
                  value={sellerType}
                  onChange={(e) => setSellerType(e.target.value)}
                >
                  <option value="">
                    {lang === "ar" ? "اختر" : "Select"}
                  </option>
                  <option value="private">
                    {lang === "ar" ? "شخصي" : "Private"}
                  </option>
                  <option value="dealership">
                    {lang === "ar" ? "معرض" : "Dealership"}
                  </option>
                </select>
              </div>
              <div className="hz-field">
                <label>
                  {lang === "ar"
                    ? "المسافة (كم)"
                    : "Mileage (km)"}
                </label>
                <input
                  type="number"
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                />
              </div>
              <div className="hz-field">
                <label>
                  {lang === "ar" ? "المواصفات" : "Specs"}
                </label>
                <input
                  value={specs}
                  onChange={(e) => setSpecs(e.target.value)}
                  placeholder={
                    lang === "ar" ? "مثال: GCC" : "e.g. GCC"
                  }
                />
              </div>
              <div className="hz-field">
                <label>
                  {lang === "ar" ? "رقم الهيكل" : "VIN"}
                </label>
                <input
                  value={vin}
                  onChange={(e) => setVin(e.target.value)}
                  placeholder={
                    lang === "ar"
                      ? "رقم هيكل المركبة"
                      : "Vehicle VIN"
                  }
                />
              </div>
            </>
          )}

          {/* Property area */}
          {isAnyProperty(category) && (
            <div className="hz-field">
              <label>
                {lang === "ar"
                  ? "المساحة (قدم مربع)"
                  : "Area (sqft)"}
              </label>
              <input
                type="number"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
            </div>
          )}

          {/* Images */}
          <div className="hz-field hz-field-full">
            <label>{S.images}</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={onImagesChange}
            />
            {images && images.length > 0 && (
              <div className="hz-images-count">
                {images.length} {S.fileSelected}
              </div>
            )}
          </div>

          {/* Descriptions */}
          <div className="hz-field hz-field-full">
            <label>
              {lang === "ar"
                ? "الوصف (إنجليزي)"
                : "Description (EN)"}
            </label>
            <textarea
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder={
                lang === "ar"
                  ? "تفاصيل الإعلان بالإنجليزية..."
                  : "Details about your listing..."
              }
            />
          </div>

          <div className="hz-field hz-field-full">
            <label>
              {lang === "ar"
                ? "الوصف (عربي)"
                : "Description (AR)"}
            </label>
            <textarea
              rows={3}
              value={descAr}
              onChange={(e) => setDescAr(e.target.value)}
              placeholder={
                lang === "ar"
                  ? "تفاصيل الإعلان بالعربية..."
                  : "Listing details in Arabic (optional)..."
              }
            />
          </div>
        </div>

        <div className="hz-modal-footer">
          <div className="hz-fee-label">
            {fee.amount
              ? `${S.postingFee}: $${fee.amount} (${fee.reason})`
              : S.freeCategory}
          </div>
          <div className="hz-modal-actions">
            <button className="hz-secondary" onClick={onClose}>
              {S.cancel}
            </button>
            <button className="hz-primary" onClick={handleSubmit}>
              {S.payPostMock}
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

  const activeCategory =
    activeCategoryKey &&
    CATEGORY_DEFS.find((c) => c.key === activeCategoryKey);

  const favListings = listings.filter((l) => favs[l.id]);
  const showHome = !activeCategory && activeTab === "home";
  const showFavs = !activeCategory && activeTab === "favs";

  return (
    <div className="hz-root">
      <Header
        q={search}
        setQ={setSearch}
        onSearch={() => {}}
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
            {activeCategory && (
              <CategoryPage
                cat={activeCategory}
                listings={listings}
                favs={favs}
                toggleFav={toggleFav}
                onBack={handleBackFromCategory}
                activeSub={activeSub}
                setActiveSub={setActiveSub}
                lang={lang}
                onOpenListing={(item) => setSelectedListing(item)}
              />
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
              <AccountPage user={user} lang={lang} />
            )}
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
          }
        }}
        onPost={handlePostClick}
        onAccount={() => {
          if (!user) setAccountOpen(true);
          else {
            setActiveTab("account");
            setActiveCategoryKey(null);
            setSelectedListing(null);
          }
        }}
        lang={lang}
      />

      <AccountSheet
        open={accountOpen}
        onClose={() => setAccountOpen(false)}
        setUser={setUser}
        lang={lang}
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
