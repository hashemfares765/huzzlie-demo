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
} from "lucide-react";
import "./App.css";

const BRAND = { name: "Huzzlie", primary: "#16a34a", light: "#f0fdf4" };

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
    motorsTitle: "Motors",
    motorsAllInCars: "All in Cars",
    motorsFilters: "Motors Filters",
    propertyFilters: "Property Filters",
    createAccountToPost: "Please create an account before placing a listing.",
    adSpace: "Ad space",
    adSpaceDesc: "External banner placement for partners.",
    brandSelectTitle: "Select a car brand",
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
      "إعلانات السيارات 3$ للإعلان. العقارات (إيجار/بيع/خطة/off-plan/غرف) 10$ للإعلان. الباقي مجاني.",
    motorsTitle: "المحركات",
    motorsAllInCars: "الكل في السيارات",
    motorsFilters: "فلاتر السيارات",
    propertyFilters: "فلاتر العقارات",
    createAccountToPost: "يرجى إنشاء حساب قبل إضافة إعلان.",
    adSpace: "مساحة إعلانية",
    adSpaceDesc: "مكان للبانرات الخارجية.",
    brandSelectTitle: "اختر ماركة السيارة",
  },
};

const CATEGORY_DEFS = [
  {
    key: "rent",
    label: "Properties for Rent",
    icon: Building2,
    isProperty: true,
    subcategories: [
      { key: "apartment", label: "Apartments" },
      { key: "villa", label: "Villas" },
      { key: "townhouse", label: "Townhouses" },
      { key: "room", label: "Rooms" },
    ],
  },
  {
    key: "sale",
    label: "Properties for Sale",
    icon: Home,
    isProperty: true,
    subcategories: [
      { key: "apartment", label: "Apartments" },
      { key: "villa", label: "Villas" },
      { key: "plot", label: "Plots" },
      { key: "offplan", label: "Off-plan" },
    ],
  },
  {
    key: "offplan",
    label: "Off Plan Properties",
    icon: MapPin,
    isProperty: true,
    subcategories: [
      { key: "apt", label: "Off-plan Apts" },
      { key: "villa", label: "Off-plan Villas" },
    ],
  },
  {
    key: "rooms",
    label: "Rooms for Rent",
    icon: BedDouble,
    isProperty: true,
    subcategories: [
      { key: "shared", label: "Shared" },
      { key: "private", label: "Private" },
      { key: "master", label: "Master" },
    ],
  },
  {
    key: "motors",
    label: "Motors",
    icon: Car,
    isProperty: false,
    subcategories: [{ key: "cars", label: "Cars" }],
  },
  {
    key: "jobs",
    label: "Jobs",
    icon: Briefcase,
    isProperty: false,
    subcategories: [
      { key: "sales", label: "Sales" },
      { key: "it", label: "IT" },
      { key: "admin", label: "Admin" },
      { key: "marketing", label: "Marketing" },
    ],
  },
  {
    key: "classifieds",
    label: "Classifieds",
    icon: Store,
    isProperty: false,
    subcategories: [
      { key: "electronics", label: "Electronics" },
      { key: "fashion", label: "Fashion" },
      { key: "services", label: "Services" },
      { key: "pets", label: "Pets" },
    ],
  },
  {
    key: "furniture",
    label: "Furniture & Garden",
    icon: Sofa,
    isProperty: false,
    subcategories: [
      { key: "sofa", label: "Sofas" },
      { key: "bed", label: "Beds" },
      { key: "outdoor", label: "Outdoor" },
      { key: "decor", label: "Décor" },
    ],
  },
];

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

const MOCK_LISTINGS = [
  {
    id: "l1",
    title: "1BR Apartment | Downtown Damascus",
    price: 3000000,
    currency: "SYP",
    category: "rent",
    subcategory: "apartment",
    location: "Damascus",
    areaSqft: 780,
    whatsapp: "+963944111222",
    imgs: [
      "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: true,
  },
  {
    id: "l2",
    title: "2018 Toyota Camry | GCC | Full service",
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
    whatsapp: "+963944333444",
    imgs: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: false,
  },
  {
    id: "l3",
    title: "Modern Sofa | Like New",
    price: 400,
    currency: "USD",
    category: "furniture",
    subcategory: "sofa",
    location: "Homs",
    whatsapp: "+963944555666",
    imgs: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: false,
  },
  {
    id: "l4",
    title: "Junior Marketing Executive",
    price: 0,
    currency: "SYP",
    category: "jobs",
    subcategory: "marketing",
    location: "Damascus",
    whatsapp: "+963944777888",
    imgs: [
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: false,
  },
  {
    id: "l5",
    title: "2021 Mercedes C-Class | Warranty",
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
    whatsapp: "+971581234567",
    imgs: [
      "https://images.unsplash.com/photo-1549921296-3b4a6b26b6b4?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: true,
  },
];

function isCar(categoryKey, subKey) {
  return categoryKey === "motors" && subKey === "cars";
}

function isAnyProperty(categoryKey) {
  return !!CATEGORY_DEFS.find(function (c) {
    return c.isProperty && c.key === categoryKey;
  });
}

export function postingFeeFor(categoryKey, subKey) {
  if (isCar(categoryKey, subKey)) {
    return { amount: 3, currency: "USD", reason: "Cars category fee" };
  }
  if (isAnyProperty(categoryKey)) {
    return { amount: 10, currency: "USD", reason: "Property listing fee" };
  }
  return { amount: 0, currency: "USD", reason: "Free category" };
}

export function validateCarListing(listing) {
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
  return required.every(function (k) {
    return !!listing[k];
  });
}

function AdBanner(props) {
  var S = STRINGS[props.lang || "en"];
  return (
    <div className="hz-ad">
      <div className="hz-ad-label">{S.adSpace}</div>
      <div className="hz-ad-text">{S.adSpaceDesc}</div>
    </div>
  );
}

function WhatsAppButton(props) {
  var number = props.number;
  var title = props.title;
  if (!number) return null;
  var url =
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
    >
      <MessageCircle size={14} />
      <span>WhatsApp</span>
    </a>
  );
}

function ListingCard(props) {
  var item = props.item;
  var fav = props.fav;
  var onToggleFav = props.onToggleFav;
  return (
    <div className="hz-card">
      <div className="hz-card-img-wrap">
        <img
          src={item.imgs && item.imgs[0]}
          alt={item.title}
          className="hz-card-img"
        />
        <button
          onClick={function () {
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
          <h3 className="hz-card-title">{item.title}</h3>
          <Tag size={14} className="hz-card-tag" />
        </div>
        <div className="hz-card-price-row">
          <span className="hz-price">
            {item.currency}{" "}
            {item.price != null ? item.price.toLocaleString() : ""}
          </span>
          <span className="hz-loc">
            <MapPin size={12} />
            {item.location}
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
        <WhatsAppButton number={item.whatsapp} title={item.title} />
      </div>
    </div>
  );
}

function Header(props) {
  var q = props.q;
  var setQ = props.setQ;
  var onSearch = props.onSearch;
  var lang = props.lang;
  var setLang = props.setLang;
  var onAccount = props.onAccount;
  var S = STRINGS[lang];
  var isAR = lang === "ar";
  return (
    <div className="hz-header">
      <div className="hz-header-inner">
        <div className="hz-logo-wrap">
          <div className="hz-logo-dot" />
          <span className="hz-logo-text">Huzzlie</span>
        </div>
        <div className="hz-search-wrap">
          <Search size={18} className="hz-search-icon" />
          <input
            value={q}
            onChange={function (e) {
              setQ(e.target.value);
            }}
            onKeyDown={function (e) {
              if (e.key === "Enter") onSearch();
            }}
            placeholder={S.searchPlaceholder}
            className={
              "hz-search-input " + (isAR ? "hz-rtl-text" : "hz-ltr-text")
            }
            dir={isAR ? "rtl" : "ltr"}
          />
          <button className="hz-search-btn" onClick={onSearch}>
            {S.search}
          </button>
        </div>
        <div className="hz-header-actions">
          <button
            className="hz-lang-btn"
            onClick={function () {
              setLang(lang === "en" ? "ar" : "en");
            }}
          >
            <Languages size={16} />
            <span>{lang === "en" ? "عربي" : "EN"}</span>
          </button>
          <button className="hz-account-btn" onClick={onAccount}>
            <User size={16} />
            <span>{S.account}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function BottomNav(props) {
  var active = props.active;
  var setActive = props.setActive;
  var onPost = props.onPost;
  var onAccount = props.onAccount;
  var lang = props.lang;
  var S = STRINGS[lang];
  function Item(p) {
    var Icon = p.icon;
    var id = p.id;
    var label = p.label;
    var onClick = p.onClick;
    return (
      <button
        className={
          "hz-nav-item " + (active === id ? "hz-nav-item-active" : "")
        }
        onClick={
          onClick ||
          function () {
            setActive(id);
          }
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

function MotorsFilters(props) {
  var filters = props.filters;
  var setFilters = props.setFilters;
  var lang = props.lang;
  var S = STRINGS[lang];
  return (
    <div className="hz-filters">
      <div className="hz-filters-title">{S.motorsFilters}</div>
      <div className="hz-filters-grid">
        <div className="hz-filter-block">
          <label>Brand</label>
          <select
            value={filters.brand || ""}
            onChange={function (e) {
              var v = e.target.value || undefined;
              setFilters(function (f) {
                return { ...f, brand: v };
              });
            }}
          >
            <option value="">Any</option>
            {CAR_BRANDS.filter(function (b) {
              return b !== "__all";
            }).map(function (b) {
              return (
                <option key={b} value={b}>
                  {b}
                </option>
              );
            })}
          </select>
        </div>
        <div className="hz-filter-block">
          <label>Model</label>
          <input
            placeholder="e.g. C-Class"
            value={filters.model || ""}
            onChange={function (e) {
              var v = e.target.value || undefined;
              setFilters(function (f) {
                return { ...f, model: v };
              });
            }}
          />
        </div>
        <div className="hz-filter-block">
          <label>Seller</label>
          <select
            value={filters.sellerType || ""}
            onChange={function (e) {
              var v = e.target.value || undefined;
              setFilters(function (f) {
                return { ...f, sellerType: v };
              });
            }}
          >
            <option value="">Any</option>
            <option value="private">Private</option>
            <option value="dealership">Dealership</option>
          </select>
        </div>
        <div className="hz-filter-block">
          <label>Year from: {filters.yearMin || 1960}</label>
          <input
            type="range"
            min="1960"
            max="2026"
            value={filters.yearMin || 1960}
            onChange={function (e) {
              var v = Number(e.target.value);
              setFilters(function (f) {
                return { ...f, yearMin: v };
              });
            }}
          />
        </div>
        <div className="hz-filter-block">
          <label>Price ≤ {filters.priceMax || "Any"}</label>
          <input
            type="range"
            min="0"
            max="200000"
            step="500"
            value={filters.priceMax || 0}
            onChange={function (e) {
              var v = Number(e.target.value) || undefined;
              setFilters(function (f) {
                return { ...f, priceMax: v === 0 ? undefined : v };
              });
            }}
          />
          <input
            type="number"
            placeholder="Max price"
            value={filters.priceMax || ""}
            onChange={function (e) {
              var n = e.target.value ? Number(e.target.value) : undefined;
              setFilters(function (f) {
                return { ...f, priceMax: n };
              });
            }}
          />
        </div>
        <div className="hz-filter-block">
          <label>Mileage ≤ {filters.mileageMax || "Any"} km</label>
          <input
            type="range"
            min="0"
            max="1000000"
            step="5000"
            value={filters.mileageMax || 0}
            onChange={function (e) {
              var v = Number(e.target.value) || undefined;
              setFilters(function (f) {
                return { ...f, mileageMax: v === 0 ? undefined : v };
              });
            }}
          />
          <input
            type="number"
            placeholder="Max km"
            value={filters.mileageMax || ""}
            onChange={function (e) {
              var n = e.target.value ? Number(e.target.value) : undefined;
              setFilters(function (f) {
                return { ...f, mileageMax: n };
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}

function PropertyFilters(props) {
  var filters = props.filters;
  var setFilters = props.setFilters;
  var lang = props.lang;
  var S = STRINGS[lang];
  return (
    <div className="hz-filters">
      <div className="hz-filters-title">{S.propertyFilters}</div>
      <div className="hz-filters-grid">
        <div className="hz-filter-block">
          <label>Price ≥ {filters.priceMin || 0}</label>
          <input
            type="range"
            min="0"
            max="1000000"
            step="1000"
            value={filters.priceMin || 0}
            onChange={function (e) {
              var v = Number(e.target.value) || 0;
              setFilters(function (f) {
                return { ...f, priceMin: v || undefined };
              });
            }}
          />
          <input
            type="number"
            value={filters.priceMin || ""}
            placeholder="Min price"
            onChange={function (e) {
              var n = e.target.value ? Number(e.target.value) : undefined;
              setFilters(function (f) {
                return { ...f, priceMin: n };
              });
            }}
          />
        </div>
        <div className="hz-filter-block">
          <label>Price ≤ {filters.priceMax || "Any"}</label>
          <input
            type="range"
            min="0"
            max="2000000"
            step="5000"
            value={filters.priceMax || 0}
            onChange={function (e) {
              var v = Number(e.target.value) || 0;
              setFilters(function (f) {
                return { ...f, priceMax: v || undefined };
              });
            }}
          />
          <input
            type="number"
            value={filters.priceMax || ""}
            placeholder="Max price"
            onChange={function (e) {
              var n = e.target.value ? Number(e.target.value) : undefined;
              setFilters(function (f) {
                return { ...f, priceMax: n };
              });
            }}
          />
        </div>
        <div className="hz-filter-block">
          <label>Area ≥ {filters.areaMin || 0} sqft</label>
          <input
            type="range"
            min="0"
            max="10000"
            step="50"
            value={filters.areaMin || 0}
            onChange={function (e) {
              var v = Number(e.target.value) || 0;
              setFilters(function (f) {
                return { ...f, areaMin: v || undefined };
              });
            }}
          />
          <input
            type="number"
            value={filters.areaMin || ""}
            placeholder="Min sqft"
            onChange={function (e) {
              var n = e.target.value ? Number(e.target.value) : undefined;
              setFilters(function (f) {
                return { ...f, areaMin: n };
              });
            }}
          />
        </div>
        <div className="hz-filter-block">
          <label>Area ≤ {filters.areaMax || "Any"} sqft</label>
          <input
            type="range"
            min="0"
            max="20000"
            step="50"
            value={filters.areaMax || 0}
            onChange={function (e) {
              var v = Number(e.target.value) || 0;
              setFilters(function (f) {
                return { ...f, areaMax: v || undefined };
              });
            }}
          />
          <input
            type="number"
            value={filters.areaMax || ""}
            placeholder="Max sqft"
            onChange={function (e) {
              var n = e.target.value ? Number(e.target.value) : undefined;
              setFilters(function (f) {
                return { ...f, areaMax: n };
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}

function MotorsBrandList(props) {
  var lang = props.lang;
  var S = STRINGS[lang];
  return (
    <div className="hz-page">
      <div className="hz-page-header">
        <button className="hz-back-btn" onClick={props.onBack}>
          <ChevronLeft />
        </button>
        <h2>{S.motorsTitle}</h2>
      </div>
      <AdBanner lang={lang} />
      <div className="hz-brand-list-title">{S.brandSelectTitle}</div>
      <div className="hz-brand-list">
        <button
          className="hz-brand-row"
          onClick={function () {
            props.onSelect("__all");
          }}
        >
          <span>{S.motorsAllInCars}</span>
        </button>
        {CAR_BRANDS.filter(function (b) {
          return b !== "__all";
        }).map(function (b) {
          return (
            <button
              key={b}
              className="hz-brand-row"
              onClick={function () {
                props.onSelect(b);
              }}
            >
              <span>{b}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CategoryPage(props) {
  var cat = props.cat;
  var listings = props.listings;
  var favs = props.favs;
  var toggleFav = props.toggleFav;
  var lang = props.lang;
  var S = STRINGS[lang];
  var isMotors = cat.key === "motors";
  var isProp = !!cat.isProperty;
  var motorsBrand = props.motorsBrand;
  var onMotorsBrandSelect = props.onMotorsBrandSelect;
  var [filters, setFilters] = useState({});

  if (isMotors && !motorsBrand) {
    return (
      <MotorsBrandList
        lang={lang}
        onBack={props.onBack}
        onSelect={onMotorsBrandSelect}
      />
    );
  }

  var filtered = listings.filter(function (l) {
    if (l.category !== cat.key) return false;
    if (cat.subcategories && cat.subcategories.length) {
      if (props.activeSub && l.subcategory !== props.activeSub) {
        return false;
      }
    }
    if (isMotors) {
      if (l.subcategory !== "cars") return false;
      if (motorsBrand && motorsBrand !== "__all" && l.brand !== motorsBrand) {
        return false;
      }
      if (filters.brand && l.brand !== filters.brand) return false;
      if (
        filters.model &&
        (!l.model ||
          l.model.toLowerCase().indexOf(filters.model.toLowerCase()) === -1)
      ) {
        return false;
      }
      if (filters.sellerType && l.sellerType !== filters.sellerType)
        return false;
      if (filters.yearMin && (l.year || 0) < filters.yearMin) return false;
      if (filters.priceMax && (l.price || 0) > filters.priceMax) return false;
      if (filters.mileageMax && (l.mileage || 0) > filters.mileageMax)
        return false;
    }
    if (isProp) {
      if (filters.priceMin && (l.price || 0) < filters.priceMin) return false;
      if (filters.priceMax && (l.price || 0) > filters.priceMax) return false;
      if (filters.areaMin && (l.areaSqft || 0) < filters.areaMin) return false;
      if (filters.areaMax && (l.areaSqft || 0) > filters.areaMax) return false;
    }
    return true;
  });

  return (
    <div className="hz-page">
      <div className="hz-page-header">
        <button className="hz-back-btn" onClick={props.onBack}>
          <ChevronLeft />
        </button>
        <h2>{cat.label}</h2>
      </div>
      <AdBanner lang={lang} />
      {isMotors && motorsBrand ? (
        <div className="hz-selected-brand">
          {motorsBrand === "__all"
            ? S.motorsAllInCars
            : "Brand: " + motorsBrand}
        </div>
      ) : null}
      {isMotors && motorsBrand ? (
        <MotorsFilters
          lang={lang}
          filters={filters}
          setFilters={setFilters}
        />
      ) : null}
      {isProp ? (
        <PropertyFilters
          lang={lang}
          filters={filters}
          setFilters={setFilters}
        />
      ) : null}
      <div className="hz-grid">
        {filtered.map(function (l) {
          return (
            <ListingCard
              key={l.id}
              item={l}
              fav={!!favs[l.id]}
              onToggleFav={toggleFav}
            />
          );
        })}
      </div>
    </div>
  );
}

function HomeGrid(props) {
  var lang = props.lang;
  var S = STRINGS[lang];
  var favs = props.favs;
  var toggleFav = props.toggleFav;
  return (
    <div className="hz-page">
      <AdBanner lang={lang} />
      <div className="hz-cat-grid">
        {CATEGORY_DEFS.filter(function (c) {
          return c.key !== "community";
        }).map(function (c) {
          var Icon = c.icon;
          return (
            <button
              key={c.key}
              className="hz-cat-pill"
              onClick={function () {
                props.onOpenCategory(c.key);
              }}
            >
              <div className="hz-cat-icon-wrap">
                <Icon size={22} />
              </div>
              <div className="hz-cat-label-wrap">
                <span>{c.label}</span>
              </div>
              <ChevronRight size={18} />
            </button>
          );
        })}
      </div>
      <div className="hz-fee-note">{S.feeNote}</div>
      <div className="hz-section-header">
        <h3>{S.latestListings}</h3>
        <button className="hz-see-all">{S.seeAll}</button>
      </div>
      <div className="hz-grid">
        {MOCK_LISTINGS.map(function (l) {
          return (
            <ListingCard
              key={l.id}
              item={l}
              fav={!!favs[l.id]}
              onToggleFav={toggleFav}
            />
          );
        })}
      </div>
    </div>
  );
}

function AccountSheet(props) {
  var open = props.open;
  var onClose = props.onClose;
  var setUser = props.setUser;
  var [name, setName] = useState("");
  var [email, setEmail] = useState("");

  if (!open) return null;

  var providers = [
    { key: "google", label: "Continue with Google" },
    {
      key: "microsoft",
      label: "Continue with Microsoft (Hotmail/Outlook)",
    },
    { key: "apple", label: "Continue with Apple" },
  ];

  function completeWithProvider(key) {
    var displayName = name || key.toUpperCase() + " User";
    var displayEmail = email || key + "@huzzlie.com";
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
          {providers.map(function (p) {
            return (
              <button
                key={p.key}
                className="hz-provider-btn"
                onClick={function () {
                  completeWithProvider(p.key);
                }}
              >
                {p.label}
              </button>
            );
          })}
          <div className="hz-or">or</div>
          <div className="hz-field">
            <label>Name</label>
            <input
              value={name}
              onChange={function (e) {
                setName(e.target.value);
              }}
              placeholder="Your name"
            />
          </div>
          <div className="hz-field">
            <label>Email</label>
            <input
              value={email}
              onChange={function (e) {
                setEmail(e.target.value);
              }}
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

function PostDialog(props) {
  var open = props.open;
  var onClose = props.onClose;
  var lang = props.lang;

  var S = STRINGS[lang];

  var [category, setCategory] = useState("");
  var [subcategory, setSubcategory] = useState("");
  var [title, setTitle] = useState("");
  var [price, setPrice] = useState("");
  var [whatsapp, setWhatsapp] = useState("");
  var [brand, setBrand] = useState("");
  var [model, setModel] = useState("");
  var [year, setYear] = useState("");
  var [sellerType, setSellerType] = useState("");
  var [mileage, setMileage] = useState("");
  var [vin, setVin] = useState("");
  var [city, setCity] = useState("");
  var [area, setArea] = useState("");
  var [desc, setDesc] = useState("");
  var [images, setImages] = useState([]);

  var catDef = CATEGORY_DEFS.find(function (c) {
    return c.key === category;
  });

  var fee = postingFeeFor(category, subcategory);

  function onImagesChange(e) {
    var files = Array.prototype.slice.call(e.target.files || []);
    setImages(files);
  }

  function handleSubmit() {
    if (!title || !category || !subcategory || !whatsapp) {
      alert("Please fill title, category, subcategory & WhatsApp.");
      return;
    }
    var listing = {
      category: category,
      subcategory: subcategory,
      brand: brand,
      model: model,
      year: year ? Number(year) : undefined,
      sellerType: sellerType,
      mileage: mileage ? Number(mileage) : undefined,
      vin: vin,
    };
    if (!validateCarListing(listing)) {
      alert(
        "For Motors > Cars, brand, model, year, seller, mileage & VIN are required."
      );
      return;
    }
    alert(
      "Listing ready. " +
        (fee.amount
          ? "A $" + fee.amount + " fee applies (" + fee.reason + ")."
          : "This category is free to post.") +
        " (Prototype only, not actually posted.)"
    );
    onClose();
  }

  if (!open) return null;

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
              onChange={function (e) {
                setCategory(e.target.value);
                setSubcategory("");
              }}
            >
              <option value="">Select category</option>
              {CATEGORY_DEFS.map(function (c) {
                return (
                  <option key={c.key} value={c.key}>
                    {c.label}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="hz-field">
            <label>Subcategory</label>
            <select
              value={subcategory}
              onChange={function (e) {
                setSubcategory(e.target.value);
              }}
              disabled={!catDef}
            >
              <option value="">
                {catDef ? "Select subcategory" : "Select category first"}
              </option>
              {catDef &&
                catDef.subcategories &&
                catDef.subcategories.map(function (s) {
                  return (
                    <option key={s.key} value={s.key}>
                      {s.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="hz-field">
            <label>Title</label>
            <input
              value={title}
              onChange={function (e) {
                setTitle(e.target.value);
              }}
              placeholder="Listing title"
            />
          </div>
          <div className="hz-field">
            <label>Price (optional)</label>
            <input
              type="number"
              value={price}
              onChange={function (e) {
                setPrice(e.target.value);
              }}
              placeholder="Price"
            />
          </div>
          <div className="hz-field">
            <label>WhatsApp</label>
            <input
              value={whatsapp}
              onChange={function (e) {
                setWhatsapp(e.target.value);
              }}
              placeholder="+9639xxxxxxxx"
            />
          </div>
          <div className="hz-field">
            <label>City</label>
            <select
              value={city}
              onChange={function (e) {
                setCity(e.target.value);
              }}
            >
              <option value="">Select city</option>
              {SYRIA_CITIES.map(function (c) {
                return (
                  <option key={c.en} value={c.en}>
                    {c.en}
                  </option>
                );
              })}
            </select>
          </div>
          {isCar(category, subcategory) ? (
            <>
              <div className="hz-field">
                <label>Brand</label>
                <input
                  value={brand}
                  onChange={function (e) {
                    setBrand(e.target.value);
                  }}
                  placeholder="e.g. Mercedes"
                />
              </div>
              <div className="hz-field">
                <label>Model</label>
                <input
                  value={model}
                  onChange={function (e) {
                    setModel(e.target.value);
                  }}
                  placeholder="e.g. C-Class"
                />
              </div>
              <div className="hz-field">
                <label>Year</label>
                <input
                  type="number"
                  value={year}
                  onChange={function (e) {
                    setYear(e.target.value);
                  }}
                />
              </div>
              <div className="hz-field">
                <label>Seller</label>
                <select
                  value={sellerType}
                  onChange={function (e) {
                    setSellerType(e.target.value);
                  }}
                >
                  <option value="">Select</option>
                  <option value="private">Private</option>
                  <option value="dealership">Dealership</option>
                </select>
              </div>
              <div className="hz-field">
                <label>Mileage (km)</label>
                <input
                  type="number"
                  value={mileage}
                  onChange={function (e) {
                    setMileage(e.target.value);
                  }}
                />
              </div>
              <div className="hz-field">
                <label>VIN</label>
                <input
                  value={vin}
                  onChange={function (e) {
                    setVin(e.target.value);
                  }}
                  placeholder="Vehicle VIN"
                />
              </div>
            </>
          ) : null}
          {isAnyProperty(category) ? (
            <div className="hz-field">
              <label>Area (sqft)</label>
              <input
                type="number"
                value={area}
                onChange={function (e) {
                  setArea(e.target.value);
                }}
              />
            </div>
          ) : null}
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
            <label>Description</label>
            <textarea
              rows={3}
              value={desc}
              onChange={function (e) {
                setDesc(e.target.value);
              }}
              placeholder="Details about your listing..."
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

export default function App() {
  var [lang, setLang] = useState("en");
  var [activeTab, setActiveTab] = useState("home");
  var [search, setSearch] = useState("");
  var [user, setUser] = useState(null);
  var [accountOpen, setAccountOpen] = useState(false);
  var [postOpen, setPostOpen] = useState(false);
  var [favs, setFavs] = useState({});
  var [activeCategoryKey, setActiveCategoryKey] = useState(null);
  var [activeSub, setActiveSub] = useState("");
  var [motorsBrand, setMotorsBrand] = useState(null);

  function toggleFav(id) {
    setFavs(function (prev) {
      return { ...prev, [id]: !prev[id] };
    });
  }

  function openCategory(key) {
    setActiveCategoryKey(key);
    var cat = CATEGORY_DEFS.find(function (c) {
      return c.key === key;
    });
    var firstSub =
      cat && cat.subcategories && cat.subcategories.length
        ? cat.subcategories[0].key
        : "";
    setActiveSub(firstSub);
    if (key === "motors") {
      setMotorsBrand(null);
    }
  }

  function handleBackFromCategory() {
    if (activeCategoryKey === "motors" && motorsBrand) {
      setMotorsBrand(null);
      return;
    }
    setActiveCategoryKey(null);
    setMotorsBrand(null);
  }

  function handlePostClick() {
    if (!user) {
      alert(STRINGS[lang].createAccountToPost);
      setAccountOpen(true);
      return;
    }
    setPostOpen(true);
  }

  function filteredListingsForCategory() {
    return MOCK_LISTINGS;
  }

  var activeCategory =
    activeCategoryKey &&
    CATEGORY_DEFS.find(function (c) {
      return c.key === activeCategoryKey;
    });

  var favListings = MOCK_LISTINGS.filter(function (l) {
    return favs[l.id];
  });

  var showHome = !activeCategory && activeTab === "home";
  var showFavs = !activeCategory && activeTab === "favs";

  return (
    <div className="hz-root">
      <Header
        q={search}
        setQ={setSearch}
        onSearch={function () {}}
        lang={lang}
        setLang={setLang}
        onAccount={function () {
          setAccountOpen(true);
        }}
      />

      <main className="hz-main">
        {activeCategory ? (
          <CategoryPage
            cat={activeCategory}
            listings={filteredListingsForCategory()}
            favs={favs}
            toggleFav={toggleFav}
            onBack={handleBackFromCategory}
            activeSub={activeSub}
            setActiveSub={setActiveSub}
            lang={lang}
            motorsBrand={motorsBrand}
            onMotorsBrandSelect={function (b) {
              setMotorsBrand(b);
            }}
          />
        ) : null}

        {showHome ? (
          <HomeGrid
            lang={lang}
            favs={favs}
            toggleFav={toggleFav}
            onOpenCategory={openCategory}
          />
        ) : null}

        {showFavs && !activeCategory ? (
          <div className="hz-page">
            <div className="hz-section-header">
              <h3>{STRINGS[lang].favourites}</h3>
            </div>
            <div className="hz-grid">
              {favListings.map(function (l) {
                return (
                  <ListingCard
                    key={l.id}
                    item={l}
                    fav={!!favs[l.id]}
                    onToggleFav={toggleFav}
                  />
                );
              })}
            </div>
          </div>
        ) : null}
      </main>

      <BottomNav
        active={activeTab}
        setActive={setActiveTab}
        onPost={handlePostClick}
        onAccount={function () {
          setAccountOpen(true);
        }}
        lang={lang}
      />

      <AccountSheet
        open={accountOpen}
        onClose={function () {
          setAccountOpen(false);
        }}
        setUser={setUser}
      />

      <PostDialog
        open={postOpen}
        onClose={function () {
          setPostOpen(false);
        }}
        lang={lang}
      />
    </div>
  );
}
