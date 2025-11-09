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
} from "lucide-react";
import "./App.css";

const STRINGS = {
  en: {
    searchPlaceholder: "Search anything...",
    search: "Search",
    account: "Account",
    latestListings: "Latest Listings",
    placeListing: "Place Listing",
    favourites: "Favourites",
    home: "Home",
    createAccountToPost: "Please create an account before posting a listing.",
    feeCars: "Cars cost $3 per listing.",
    feeProps:
      "Properties (rent/sale/off-plan/rooms) cost $10 per listing. Others are free.",
    noFavs: "No favourites yet. Tap the heart on a listing to save it.",
    noResults: "No listings match your filters yet.",
    adTop: "External banner placement for partners.",
    adBottom: "Footer banner inventory for sponsors.",
    createAccount: "Create Account",
    signupCta: "Sign up to save favourites and post listings.",
    yourName: "Your name",
    cancel: "Cancel",
    continue: "Continue",
    orContinueWith: "Or continue with:",
    google: "Google",
    hotmail: "Hotmail",
    apple: "Apple",
    placeListingTitle: "Place a Listing",
    placeListingSub:
      "Cars $3 per listing. Properties $10 per listing. Others free (demo only).",
    category: "Category",
    selectCategory: "Select category",
    motorsType: "Motors Type",
    title: "Title",
    priceAED: "Price (AED)",
    priceOptional: "Optional",
    location: "City",
    whatsappNumber: "WhatsApp Number",
    uploadImages: "Upload Images",
    brand: "Brand",
    model: "Model",
    year: "Year",
    mileageKm: "Mileage (km)",
    specs: "Specs",
    sellerType: "Seller Type",
    select: "Select",
    private: "Private",
    dealer: "Dealership",
    vin: "VIN",
    createListingDemo: "Create Listing (demo)",
    cityPlaceholder: "Select city",
    allInMotors: "All in Motors",
    chooseBrand: "Choose a brand",
  },
  ar: {
    searchPlaceholder: "ابحث عن أي شيء...",
    search: "بحث",
    account: "الحساب",
    latestListings: "أحدث الإعلانات",
    placeListing: "أضف إعلان",
    favourites: "المفضلة",
    home: "الرئيسية",
    createAccountToPost: "يرجى إنشاء حساب قبل إضافة إعلان.",
    feeCars: "إعلانات السيارات 3$ لكل إعلان.",
    feeProps:
      "إعلانات العقارات (إيجار/بيع/أوف بلان/غرف) 10$ لكل إعلان. باقي الأقسام مجانية.",
    noFavs: "لا توجد مفضلات بعد. اضغط على القلب لحفظ إعلان.",
    noResults: "لا توجد إعلانات مطابقة للبحث/الفلاتر.",
    adTop: "مساحة إعلانية للشركاء.",
    adBottom: "مساحة إعلانية سفلية للرعاة.",
    createAccount: "إنشاء حساب",
    signupCta: "سجل لحفظ المفضلة ونشر الإعلانات.",
    yourName: "اسمك",
    cancel: "إلغاء",
    continue: "متابعة",
    orContinueWith: "أو تابع بواسطة:",
    google: "جوجل",
    hotmail: "هوتمايل",
    apple: "أبل",
    placeListingTitle: "إضافة إعلان",
    placeListingSub:
      "السيارات 3$ للإعلان. العقارات 10$ للإعلان. الباقي مجاني (تجريبي).",
    category: "القسم",
    selectCategory: "اختر القسم",
    motorsType: "نوع المركبة",
    title: "عنوان الإعلان",
    priceAED: "السعر (درهم)",
    priceOptional: "اختياري",
    location: "المدينة",
    whatsappNumber: "رقم واتساب",
    uploadImages: "رفع الصور",
    brand: "العلامة",
    model: "الموديل",
    year: "السنة",
    mileageKm: "عدد الكيلومترات",
    specs: "المواصفات",
    sellerType: "نوع البائع",
    select: "اختر",
    private: "فرد",
    dealer: "معرض",
    vin: "رقم الهيكل (VIN)",
    createListingDemo: "إنشاء إعلان (تجريبي)",
    cityPlaceholder: "اختر المدينة",
    allInMotors: "كل السيارات",
    chooseBrand: "اختر العلامة",
  },
};

const SYRIA_CITIES = [
  { id: "damascus", en: "Damascus", ar: "دمشق" },
  { id: "rif-dimashq", en: "Rif Dimashq", ar: "ريف دمشق" },
  { id: "aleppo", en: "Aleppo", ar: "حلب" },
  { id: "homs", en: "Homs", ar: "حمص" },
  { id: "hama", en: "Hama", ar: "حماة" },
  { id: "latakia", en: "Latakia", ar: "اللاذقية" },
  { id: "tartus", en: "Tartus", ar: "طرطوس" },
  { id: "idlib", en: "Idlib", ar: "إدلب" },
  { id: "deir-ez-zor", en: "Deir ez-Zor", ar: "دير الزور" },
  { id: "raqqa", en: "Raqqa", ar: "الرقة" },
  { id: "hasakah", en: "Hasakah", ar: "الحسكة" },
  { id: "qamishli", en: "Qamishli", ar: "القامشلي" },
  { id: "daraa", en: "Daraa", ar: "درعا" },
  { id: "as-suwayda", en: "As-Suwayda", ar: "السويداء" },
  { id: "palmyra", en: "Palmyra", ar: "تدمر" },
  { id: "other", en: "Other", ar: "أخرى" },
];

function getCityLabel(value, lang) {
  if (!value) return "";
  var match =
    SYRIA_CITIES.find(function (c) {
      return c.en === value || c.id === value;
    }) || null;
  if (!match) return value;
  return lang === "ar" ? match.ar : match.en;
}

const CAR_DATA = {
  "Alfa Romeo": ["Giulia", "Stelvio", "Tonale"],
  Audi: ["A3", "A4", "A6", "Q3", "Q5", "Q7", "Q8"],
  BMW: [
    "1 Series",
    "3 Series",
    "5 Series",
    "7 Series",
    "X1",
    "X3",
    "X5",
    "X6",
    "M3",
    "M5",
  ],
  Bentley: ["Bentayga", "Continental GT", "Flying Spur"],
  Cadillac: ["Escalade", "CT5", "XT5"],
  Chevrolet: ["Spark", "Cruze", "Camaro", "Corvette", "Tahoe", "Suburban"],
  Chrysler: ["300C", "Pacifica"],
  Dodge: ["Charger", "Challenger", "Durango", "Ram"],
  Ferrari: ["488", "F8", "Roma", "Portofino"],
  Fiat: ["500", "Panda"],
  Ford: ["Fiesta", "Focus", "Mustang", "Explorer", "F-150"],
  Geely: ["Coolray", "Tugella", "Okavango"],
  GMC: ["Yukon", "Sierra", "Acadia"],
  Honda: ["Civic", "Accord", "CR-V", "City"],
  Hyundai: ["Accent", "Elantra", "Sonata", "Tucson", "Santa Fe", "Creta"],
  Infiniti: ["Q50", "QX50", "QX60"],
  Jaguar: ["XE", "XF", "F-Pace"],
  Jeep: ["Wrangler", "Grand Cherokee", "Compass"],
  Kia: ["Picanto", "Rio", "Cerato", "Sportage", "Sorento"],
  "Land Rover": ["Defender", "Discovery", "Range Rover", "Range Rover Sport"],
  Lexus: ["IS", "ES", "RX", "LX"],
  Maserati: ["Ghibli", "Levante"],
  Mazda: ["Mazda3", "CX-5", "CX-9"],
  "Mercedes-Benz": ["A-Class", "C-Class", "E-Class", "S-Class", "GLC", "GLE"],
  Mini: ["Cooper", "Countryman"],
  Mitsubishi: ["Lancer", "Pajero", "Outlander"],
  Nissan: ["Sunny", "Altima", "Maxima", "Patrol", "X-Trail"],
  Opel: ["Corsa", "Astra"],
  Peugeot: ["208", "3008"],
  Porsche: ["911", "Cayenne", "Macan"],
  Renault: ["Symbol", "Duster", "Megane"],
  Skoda: ["Octavia", "Kodiaq"],
  Subaru: ["Impreza", "Forester"],
  Suzuki: ["Swift", "Vitara", "Jimny"],
  Tesla: ["Model S", "Model 3", "Model X", "Model Y"],
  Toyota: ["Yaris", "Corolla", "Camry", "RAV4", "Land Cruiser"],
  Volkswagen: ["Polo", "Golf", "Passat", "Tiguan"],
  Volvo: ["XC60", "XC90"],
  BYD: ["Atto 3", "Han"],
  Changan: ["CS35", "CS75"],
  Haval: ["H2", "H6"],
  MG: ["MG5", "ZS", "HS"],
};

const CAR_MAKES = Object.keys(CAR_DATA).sort();

const CATEGORY_DEFS = [
  { key: "rent", label: "Properties for Rent", icon: Building2, isProperty: true },
  { key: "sale", label: "Properties for Sale", icon: Home, isProperty: true },
  { key: "offplan", label: "Off Plan Properties", icon: MapPin, isProperty: true },
  { key: "rooms", label: "Rooms for Rent", icon: BedDouble, isProperty: true },
  { key: "motors", label: "Motors", icon: Car },
  { key: "jobs", label: "Jobs", icon: Briefcase },
  { key: "classifieds", label: "Classifieds", icon: Store },
  { key: "furniture", label: "Furniture & Garden", icon: Sofa },
];

const MOCK_LISTINGS = [
  {
    id: "l1",
    title: "1BR Apartment | Downtown Damascus",
    price: 3000000,
    currency: "SYP",
    category: "rent",
    location: "Damascus",
    areaSqft: 700,
    whatsapp: "+963944000111",
    img: "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=1000&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "l2",
    title: "2018 Toyota Camry | Full service",
    price: 15000,
    currency: "USD",
    category: "motors",
    subcategory: "cars",
    location: "Aleppo",
    year: 2018,
    mileage: 98000,
    specs: "GCC",
    brand: "Toyota",
    model: "Camry",
    whatsapp: "+963944000222",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "l3",
    title: "Modern Sofa | Like New",
    price: 400,
    currency: "USD",
    category: "furniture",
    location: "Homs",
    whatsapp: "+963944000333",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000&auto=format&fit=crop",
  },
];

function postingFeeFor(categoryKey, subKey) {
  if (categoryKey === "motors" && subKey === "cars") {
    return { amount: 3, currency: "USD", reason: "Cars category fee" };
  }
  if (
    categoryKey === "rent" ||
    categoryKey === "sale" ||
    categoryKey === "offplan" ||
    categoryKey === "rooms"
  ) {
    return { amount: 10, currency: "USD", reason: "Property listing fee" };
  }
  return { amount: 0, currency: "USD", reason: "Free category" };
}

function validateCarListing(listing) {
  if (listing.category !== "motors" || listing.subcategory !== "cars") return true;
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

function isPropertyCategory(key) {
  return !!CATEGORY_DEFS.find(function (c) {
    return c.key === key && c.isProperty;
  });
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
      className="hz-wa-btn"
    >
      <MessageCircle size={14} />
      WhatsApp
    </a>
  );
}

function ListingCard(props) {
  var item = props.item;
  var fav = props.fav;
  var onToggleFav = props.onToggleFav;
  var lang = props.lang || "en";
  var mainImg =
    (item.imgs && item.imgs[0]) ||
    item.img ||
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop";
  var locLabel = getCityLabel(item.location, lang);

  return (
    <div className="hz-card">
      <div className="hz-card-img-wrap">
        <img src={mainImg} alt={item.title} className="hz-card-img" />
        <button
          className={
            "hz-heart " + (fav ? "hz-heart-active" : "hz-heart-inactive")
          }
          onClick={function () {
            onToggleFav(item.id);
          }}
        >
          <Heart
            size={16}
            fill={fav ? "currentColor" : "none"}
            strokeWidth={2}
          />
        </button>
        {item.featured ? <div className="hz-badge">Featured</div> : null}
      </div>
      <div className="hz-card-body">
        <div className="hz-card-title">
          <h3>{item.title}</h3>
          <Tag size={14} className="hz-tag" />
        </div>
        <div className="hz-card-row">
          <span className="hz-price">
            {item.currency}{" "}
            {item.price || item.price === 0
              ? item.price.toLocaleString()
              : "Contact"}
          </span>
          <span className="hz-loc">
            <MapPin size={12} />
            {locLabel}
          </span>
        </div>
        <div className="hz-card-footer">
          <WhatsAppButton number={item.whatsapp} title={item.title} />
        </div>
      </div>
    </div>
  );
}

function CategoryPill(props) {
  var label = props.label;
  var Icon = props.Icon;
  var onClick = props.onClick;
  return (
    <button className="hz-cat-pill hz-cat-pill-idle" onClick={onClick}>
      <div className="hz-cat-pill-left">
        <div className="hz-cat-icon-wrap">
          <Icon size={16} />
        </div>
        <span>{label}</span>
      </div>
      <ChevronRight size={14} />
    </button>
  );
}

function MotorsFilters(props) {
  var filters = props.filters;
  var setFilters = props.setFilters;

  function update(key, value) {
    setFilters(function (prev) {
      var next = { ...prev };
      if (value === "" || value == null || Number.isNaN(value)) {
        delete next[key];
      } else {
        next[key] = value;
      }
      return next;
    });
  }

  var selectedMake = filters.make || "";
  var models = selectedMake ? CAR_DATA[selectedMake] || [] : [];
  var yearValue = filters.yearMin || 1960;
  var mileageValue = filters.mileageMax || 0;

  return (
    <div className="hz-filter-wrap">
      <div className="hz-filter-title">Motors Filters</div>
      <div className="hz-filter-grid">
        <div>
          <div className="hz-filter-label">Make</div>
          <select
            className="hz-filter-input"
            value={selectedMake}
            onChange={function (e) {
              var v = e.target.value;
              update("make", v || "");
              update("model", "");
            }}
          >
            <option value="">All makes</option>
            {CAR_MAKES.map(function (m) {
              return (
                <option key={m} value={m}>
                  {m}
                </option>
              );
            })}
          </select>
        </div>
        {selectedMake ? (
          <div>
            <div className="hz-filter-label">Model</div>
            <select
              className="hz-filter-input"
              value={filters.model || ""}
              onChange={function (e) {
                update("model", e.target.value || "");
              }}
            >
              <option value="">All models</option>
              {models.map(function (model) {
                return (
                  <option key={model} value={model}>
                    {model}
                  </option>
                );
              })}
            </select>
          </div>
        ) : null}
        <div>
          <div className="hz-filter-label">Seller</div>
          <select
            className="hz-filter-input"
            value={filters.sellerType || ""}
            onChange={function (e) {
              update("sellerType", e.target.value);
            }}
          >
            <option value="">Any</option>
            <option value="private">Private</option>
            <option value="dealership">Dealership</option>
          </select>
        </div>
        <div>
          <div className="hz-filter-label">Year from</div>
          <input
            type="range"
            min="1960"
            max="2026"
            step="1"
            className="hz-slider"
            value={yearValue}
            onChange={function (e) {
              update("yearMin", Number(e.target.value));
            }}
          />
          <input
            type="number"
            className="hz-filter-input hz-filter-input-inline"
            value={filters.yearMin || ""}
            placeholder="1960-2026"
            onChange={function (e) {
              var v = e.target.value;
              if (!v) update("yearMin", "");
              else update("yearMin", Number(v));
            }}
          />
        </div>
        <div>
          <div className="hz-filter-label">Price ≤</div>
          <input
            type="number"
            className="hz-filter-input"
            value={filters.priceMax || ""}
            onChange={function (e) {
              var v = e.target.value;
              if (!v) update("priceMax", "");
              else update("priceMax", Number(v));
            }}
          />
        </div>
        <div>
          <div className="hz-filter-label">Mileage ≤</div>
          <input
            type="range"
            min="0"
            max="1000000"
            step="5000"
            className="hz-slider"
            value={mileageValue}
            onChange={function (e) {
              update("mileageMax", Number(e.target.value));
            }}
          />
          <input
            type="number"
            className="hz-filter-input hz-filter-input-inline"
            value={filters.mileageMax || ""}
            placeholder="0 - 1000000"
            onChange={function (e) {
              var v = e.target.value;
              if (!v) update("mileageMax", "");
              else update("mileageMax", Number(v));
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

  function update(key, value) {
    setFilters(function (prev) {
      var next = { ...prev };
      if (value === "" || value == null || Number.isNaN(value)) {
        delete next[key];
      } else {
        next[key] = value;
      }
      return next;
    });
  }

  var areaMinValue = filters.areaMin || 0;
  var areaMaxValue = filters.areaMax || 0;

  return (
    <div className="hz-filter-wrap">
      <div className="hz-filter-title">Property Filters</div>
      <div className="hz-filter-grid">
        <div>
          <div className="hz-filter-label">Price ≥</div>
          <input
            type="number"
            className="hz-filter-input"
            value={filters.priceMin || ""}
            onChange={function (e) {
              var v = e.target.value;
              if (!v) update("priceMin", "");
              else update("priceMin", Number(v));
            }}
          />
        </div>
        <div>
          <div className="hz-filter-label">Price ≤</div>
          <input
            type="number"
            className="hz-filter-input"
            value={filters.priceMax || ""}
            onChange={function (e) {
              var v = e.target.value;
              if (!v) update("priceMax", "");
              else update("priceMax", Number(v));
            }}
          />
        </div>
        <div>
          <div className="hz-filter-label">Area ≥ (sqft)</div>
          <input
            type="range"
            min="0"
            max="10000"
            step="50"
            className="hz-slider"
            value={areaMinValue}
            onChange={function (e) {
              update("areaMin", Number(e.target.value));
            }}
          />
          <input
            type="number"
            className="hz-filter-input hz-filter-input-inline"
            value={filters.areaMin || ""}
            placeholder="Min sqft"
            onChange={function (e) {
              var v = e.target.value;
              if (!v) update("areaMin", "");
              else update("areaMin", Number(v));
            }}
          />
        </div>
        <div>
          <div className="hz-filter-label">Area ≤ (sqft)</div>
          <input
            type="range"
            min="0"
            max="10000"
            step="50"
            className="hz-slider"
            value={areaMaxValue}
            onChange={function (e) {
              update("areaMax", Number(e.target.value));
            }}
          />
          <input
            type="number"
            className="hz-filter-input hz-filter-input-inline"
            value={filters.areaMax || ""}
            placeholder="Max sqft"
            onChange={function (e) {
              var v = e.target.value;
              if (!v) update("areaMax", "");
              else update("areaMax", Number(v));
            }}
          />
        </div>
      </div>
    </div>
  );
}

function HuzzlieApp() {
  var [lang, setLang] = useState("en");
  var S = STRINGS[lang];

  var [user, setUser] = useState(null);
  var [search, setSearch] = useState("");
  var [activeTab, setActiveTab] = useState("home");
  var [activeCategory, setActiveCategory] = useState(null);
  var [favs, setFavs] = useState({});
  var [motorsFilters, setMotorsFilters] = useState({});
  var [propertyFilters, setPropertyFilters] = useState({});
  var [listings, setListings] = useState(MOCK_LISTINGS);

  var [showAuth, setShowAuth] = useState(false);
  var [authName, setAuthName] = useState("");

  var [showPostForm, setShowPostForm] = useState(false);
  var [postCategory, setPostCategory] = useState("");
  var [postSubcategory, setPostSubcategory] = useState("");
  var [postTitle, setPostTitle] = useState("");
  var [postPrice, setPostPrice] = useState("");
  var [postLocation, setPostLocation] = useState("");
  var [postWhatsapp, setPostWhatsapp] = useState("");
  var [postBrand, setPostBrand] = useState("");
  var [postModel, setPostModel] = useState("");
  var [postYear, setPostYear] = useState("");
  var [postMileage, setPostMileage] = useState("");
  var [postSpecs, setPostSpecs] = useState("");
  var [postSellerType, setPostSellerType] = useState("");
  var [postVin, setPostVin] = useState("");
  var [postImages, setPostImages] = useState([]);
  var [postError, setPostError] = useState("");
  var [postFeeText, setPostFeeText] = useState("");

  var [motorsBrandPickerDone, setMotorsBrandPickerDone] = useState(false);

  function openAuth() {
    setShowAuth(true);
    setAuthName("");
  }

  function completeAuth(name, provider) {
    var finalName = name || provider + " User";
    setUser({ name: finalName });
    setShowAuth(false);
  }

  function handleLoginClick() {
    if (user) {
      return;
    }
    openAuth();
  }

  function handleToggleFav(id) {
    setFavs(function (prev) {
      return { ...prev, [id]: !prev[id] };
    });
  }

  function openPost() {
    if (!user) {
      setShowAuth(true);
      return;
    }
    setPostCategory(activeCategory || "");
    setPostSubcategory("");
    setPostTitle("");
    setPostPrice("");
    setPostLocation("");
    setPostWhatsapp("");
    setPostBrand("");
    setPostModel("");
    setPostYear("");
    setPostMileage("");
    setPostSpecs("");
    setPostSellerType("");
    setPostVin("");
    setPostImages([]);
    setPostError("");
    setPostFeeText("");
    setShowPostForm(true);
  }

  function handlePostCategoryChange(catKey) {
    setPostCategory(catKey);
    setPostSubcategory("");
    var fee = postingFeeFor(catKey, "");
    if (catKey === "motors") {
      fee = postingFeeFor("motors", "cars");
    }
    if (fee.amount > 0) {
      setPostFeeText(
        "Posting fee: $" +
          fee.amount +
          " " +
          fee.currency +
          " (" +
          fee.reason +
          ")"
      );
    } else {
      setPostFeeText("Posting in this category is free.");
    }
  }

  function handleImagesChange(e) {
    var files = Array.from(e.target.files || []);
    var urls = files.map(function (f) {
      return URL.createObjectURL(f);
    });
    setPostImages(urls);
  }

  function submitListing() {
    setPostError("");

    if (!postCategory || !postTitle || !postWhatsapp) {
      setPostError("Category, title and WhatsApp are required.");
      return;
    }

    var isCar =
      postCategory === "motors" &&
      (postSubcategory === "cars" ||
        postSubcategory === "" ||
        postSubcategory == null);

    var locationValue = postLocation || "Damascus";

    var newListing = {
      id: "u" + (listings.length + 1),
      title: postTitle,
      price: postPrice ? Number(postPrice) : null,
      currency: "AED",
      category: postCategory,
      subcategory: isCar ? "cars" : postSubcategory || undefined,
      location: locationValue,
      whatsapp: postWhatsapp,
      imgs: postImages && postImages.length > 0 ? postImages.slice() : undefined,
      img:
        postImages && postImages[0]
          ? postImages[0]
          : "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop",
    };

    if (isCar) {
      newListing.brand = postBrand;
      newListing.model = postModel;
      newListing.year = postYear ? Number(postYear) : null;
      newListing.mileage = postMileage ? Number(postMileage) : null;
      newListing.specs = postSpecs;
      newListing.sellerType = postSellerType;
      newListing.vin = postVin;

      if (!validateCarListing(newListing)) {
        setPostError(
          "For car listings, brand, model, year, specs, seller type, mileage and VIN are required."
        );
        return;
      }
    }

    var fee = postingFeeFor(
      newListing.category,
      newListing.subcategory || ""
    );
    var msg =
      fee.amount > 0
        ? "Listing created (demo). Required fee: $" +
          fee.amount +
          " " +
          fee.currency +
          " (" +
          fee.reason +
          ")."
        : "Listing created (demo). No fee required.";
    alert(msg);

    setListings(function (prev) {
      return [newListing, ...prev];
    });

    setShowPostForm(false);
  }

  function filtered(listOnlyFavs) {
    var base = listOnlyFavs
      ? listings.filter(function (l) {
          return favs[l.id];
        })
      : listings.slice();

    var isMotors = activeCategory === "motors";
    var isProp = isPropertyCategory(activeCategory);

    return base.filter(function (l) {
      if (activeCategory && l.category !== activeCategory) return false;

      if (search) {
        var q = search.toLowerCase();
        var match =
          (l.title && l.title.toLowerCase().includes(q)) ||
          (l.location && l.location.toLowerCase().includes(q));
        if (!match) return false;
      }

      if (isMotors) {
        if (
          motorsFilters.make &&
          (!l.brand ||
            l.brand.toLowerCase() !== motorsFilters.make.toLowerCase())
        ) {
          return false;
        }
        if (
          motorsFilters.model &&
          (!l.model ||
            l.model.toLowerCase() !== motorsFilters.model.toLowerCase())
        ) {
          return false;
        }
        if (
          motorsFilters.sellerType &&
          l.sellerType !== motorsFilters.sellerType
        ) {
          return false;
        }
        if (
          motorsFilters.yearMin &&
          (!l.year || l.year < motorsFilters.yearMin)
        ) {
          return false;
        }
        if (
          motorsFilters.priceMax &&
          l.price != null &&
          l.price > motorsFilters.priceMax
        ) {
          return false;
        }
        if (
          motorsFilters.mileageMax &&
          l.mileage != null &&
          l.mileage > motorsFilters.mileageMax
        ) {
          return false;
        }
      }

      if (isProp) {
        if (
          propertyFilters.priceMin &&
          l.price != null &&
          l.price < propertyFilters.priceMin
        ) {
          return false;
        }
        if (
          propertyFilters.priceMax &&
          l.price != null &&
          l.price > propertyFilters.priceMax
        ) {
          return false;
        }
        if (
          propertyFilters.areaMin &&
          l.areaSqft != null &&
          l.areaSqft < propertyFilters.areaMin
        ) {
          return false;
        }
        if (
          propertyFilters.areaMax &&
          l.areaSqft != null &&
          l.areaSqft > propertyFilters.areaMax
        ) {
          return false;
        }
      }

      return true;
    });
  }

  var activeCategoryDef = CATEGORY_DEFS.find(function (c) {
    return c.key === activeCategory;
  });

  var showMotorsBrandPicker =
    activeCategory === "motors" && !motorsBrandPickerDone;

  var visibleListings =
    activeTab === "favs" ? filtered(true) : filtered(false);

  function clearMotorsMake() {
    setMotorsFilters(function () {
      return {};
    });
  }

  function setMotorsMake(m) {
    setMotorsFilters(function (prev) {
      var next = { ...prev, make: m };
      delete next.model;
      return next;
    });
  }

  return (
    <div className={"hz-root " + (lang === "ar" ? "hz-rtl" : "")}>
      <header className="hz-header">
        <div className="hz-brand">
          <div className="hz-logo-block" />
          <span className="hz-logo-text">Huzzlie</span>
        </div>
        <div className="hz-search-wrap">
          <Search size={16} className="hz-search-icon" />
          <input
            value={search}
            onChange={function (e) {
              setSearch(e.target.value);
            }}
            placeholder={S.searchPlaceholder}
            className="hz-search-input"
            dir={lang === "ar" ? "rtl" : "ltr"}
          />
          <button className="hz-search-btn">{S.search}</button>
        </div>
        <div className="hz-header-right">
          <button
            className="hz-lang-btn"
            onClick={function () {
              setLang(lang === "en" ? "ar" : "en");
            }}
          >
            {lang === "en" ? "عربى" : "EN"}
          </button>
        </div>
      </header>

      <main className="hz-main">
        {!activeCategory && (
          <>
            <div className="hz-ad-banner">
              <span>Ad space</span>
              <span className="hz-ad-sub">{S.adTop}</span>
            </div>
            <div className="hz-cat-grid">
              {CATEGORY_DEFS.map(function (c) {
                return (
                  <CategoryPill
                    key={c.key}
                    label={c.label}
                    Icon={c.icon}
                    onClick={function () {
                      setActiveCategory(c.key);
                      setActiveTab("home");
                      if (c.key === "motors") {
                        setMotorsBrandPickerDone(false);
                        setMotorsFilters({});
                      }
                    }}
                  />
                );
              })}
            </div>
            <div className="hz-fee-note">
              {S.feeCars} {S.feeProps}
            </div>
          </>
        )}

        {activeCategory && (
          <>
            <div className="hz-cat-page-head">
              <button
                className="hz-back-btn"
                onClick={function () {
                  setActiveCategory(null);
                  setMotorsFilters({});
                  setPropertyFilters({});
                  setMotorsBrandPickerDone(false);
                }}
              >
                <ChevronLeft size={16} />
                <span>All Categories</span>
              </button>
              <h2 className="hz-cat-page-title">
                {activeCategoryDef ? activeCategoryDef.label : "Listings"}
              </h2>
              <div className="hz-fee-note">
                {S.feeCars} {S.feeProps}
              </div>
            </div>

            {showMotorsBrandPicker && (
              <div className="hz-make-list-screen">
                <div className="hz-make-list-header">
                  {S.allInMotors}
                  <div className="hz-make-list-sub">{S.chooseBrand}</div>
                </div>
                <button
                  className="hz-make-list-item hz-make-list-item-active"
                  onClick={function () {
                    clearMotorsMake();
                    setMotorsBrandPickerDone(true);
                  }}
                >
                  {S.allInMotors}
                </button>
                {CAR_MAKES.map(function (m) {
                  return (
                    <button
                      key={m}
                      className="hz-make-list-item"
                      onClick={function () {
                        setMotorsMake(m);
                        setMotorsBrandPickerDone(true);
                      }}
                    >
                      {m}
                    </button>
                  );
                })}
              </div>
            )}

            {activeCategory === "motors" && !showMotorsBrandPicker ? (
              <MotorsFilters
                filters={motorsFilters}
                setFilters={setMotorsFilters}
              />
            ) : null}
            {isPropertyCategory(activeCategory) ? (
              <PropertyFilters
                filters={propertyFilters}
                setFilters={setPropertyFilters}
              />
            ) : null}
          </>
        )}

        {!showMotorsBrandPicker && (
          <>
            <div className="hz-section-head">
              <h2>
                {activeTab === "favs"
                  ? S.favourites
                  : activeCategory
                  ? "Listings"
                  : S.latestListings}
              </h2>
            </div>

            <div className="hz-list-grid">
              {visibleListings.length === 0 ? (
                <div className="hz-empty">
                  {activeTab === "favs" ? S.noFavs : S.noResults}
                </div>
              ) : (
                visibleListings.map(function (item) {
                  return (
                    <ListingCard
                      key={item.id}
                      item={item}
                      fav={!!favs[item.id]}
                      onToggleFav={handleToggleFav}
                      lang={lang}
                    />
                  );
                })
              )}
            </div>

            <div className="hz-ad-banner hz-ad-bottom">
              <span>Ad space</span>
              <span className="hz-ad-sub">{S.adBottom}</span>
            </div>
          </>
        )}
      </main>

      <nav className="hz-bottom-nav">
        <button
          className={activeTab === "home" ? "hz-nav-active" : ""}
          onClick={function () {
            setActiveTab("home");
          }}
        >
          <Home size={20} />
          <span>{S.home}</span>
        </button>
        <button
          className={activeTab === "favs" ? "hz-nav-active" : ""}
          onClick={function () {
            setActiveTab("favs");
          }}
        >
          <Heart size={20} />
          <span>{S.favourites}</span>
        </button>
        <button
          onClick={function () {
            openPost();
          }}
        >
          <PlusCircle size={24} />
          <span>{S.placeListing}</span>
        </button>
        <button
          onClick={function () {
            handleLoginClick();
            setActiveTab("account");
          }}
        >
          <User size={20} />
          <span>{S.account}</span>
        </button>
      </nav>

      {showAuth && (
        <div className="hz-modal-backdrop">
          <div className="hz-modal">
            <div className="hz-modal-title">{S.createAccount}</div>
            <div className="hz-modal-sub">{S.signupCta}</div>
            <input
              className="hz-modal-input"
              placeholder={S.yourName}
              value={authName}
              onChange={function (e) {
                setAuthName(e.target.value);
              }}
            />
            <div className="hz-modal-actions">
              <button
                className="hz-modal-btn-secondary"
                onClick={function () {
                  setShowAuth(false);
                }}
              >
                {S.cancel}
              </button>
              <button
                className="hz-modal-btn"
                onClick={function () {
                  if (!authName) return;
                  completeAuth(authName, "Huzzlie");
                }}
              >
                {S.continue}
              </button>
            </div>
            <div className="hz-modal-alt">
              {S.orContinueWith}
              <div className="hz-modal-alt-row">
                <button
                  className="hz-modal-alt-btn"
                  onClick={function () {
                    completeAuth("", "Google");
                  }}
                >
                  {S.google}
                </button>
                <button
                  className="hz-modal-alt-btn"
                  onClick={function () {
                    completeAuth("", "Microsoft");
                  }}
                >
                  {S.hotmail}
                </button>
                <button
                  className="hz-modal-alt-btn"
                  onClick={function () {
                    completeAuth("", "Apple");
                  }}
                >
                  {S.apple}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPostForm && (
        <div className="hz-modal-backdrop">
          <div className="hz-modal hz-modal-large">
            <div className="hz-modal-title">{S.placeListingTitle}</div>
            <div className="hz-modal-sub">{S.placeListingSub}</div>
            <div className="hz-post-grid">
              <div>
                <div className="hz-filter-label">{S.category}</div>
                <select
                  className="hz-modal-input"
                  value={postCategory}
                  onChange={function (e) {
                    handlePostCategoryChange(e.target.value);
                  }}
                >
                  <option value="">{S.selectCategory}</option>
                  {CATEGORY_DEFS.map(function (c) {
                    return (
                      <option key={c.key} value={c.key}>
                        {c.label}
                      </option>
                    );
                  })}
                </select>
              </div>
              {postCategory === "motors" && (
                <div>
                  <div className="hz-filter-label">{S.motorsType}</div>
                  <select
                    className="hz-modal-input"
                    value={postSubcategory}
                    onChange={function (e) {
                      setPostSubcategory(e.target.value);
                    }}
                  >
                    <option value="cars">Cars</option>
                    <option value="motorcycles">Motorcycles</option>
                    <option value="boats">Boats</option>
                    <option value="trucks">Trucks</option>
                  </select>
                </div>
              )}
              <div>
                <div className="hz-filter-label">{S.title}</div>
                <input
                  className="hz-modal-input"
                  value={postTitle}
                  onChange={function (e) {
                    setPostTitle(e.target.value);
                  }}
                  placeholder={S.title}
                />
              </div>
              <div>
                <div className="hz-filter-label">{S.priceAED}</div>
                <input
                  type="number"
                  className="hz-modal-input"
                  value={postPrice}
                  onChange={function (e) {
                    setPostPrice(e.target.value);
                  }}
                  placeholder={S.priceOptional}
                />
              </div>
              <div>
                <div className="hz-filter-label">{S.location}</div>
                <select
                  className="hz-modal-input"
                  value={postLocation}
                  onChange={function (e) {
                    setPostLocation(e.target.value);
                  }}
                >
                  <option value="">{S.cityPlaceholder}</option>
                  {SYRIA_CITIES.map(function (city) {
                    return (
                      <option key={city.id} value={city.en}>
                        {lang === "ar" ? city.ar : city.en}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <div className="hz-filter-label">{S.whatsappNumber}</div>
                <input
                  className="hz-modal-input"
                  value={postWhatsapp}
                  onChange={function (e) {
                    setPostWhatsapp(e.target.value);
                  }}
                  placeholder="+9639xxxxxxxx"
                />
              </div>
              <div>
                <div className="hz-filter-label">{S.uploadImages}</div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hz-modal-input"
                  onChange={handleImagesChange}
                />
              </div>
              {postCategory === "motors" && (
                <>
                  <div>
                    <div className="hz-filter-label">{S.brand}</div>
                    <select
                      className="hz-modal-input"
                      value={postBrand}
                      onChange={function (e) {
                        var v = e.target.value;
                        setPostBrand(v);
                        if (v && CAR_DATA[v] && CAR_DATA[v].length > 0) {
                          setPostModel(CAR_DATA[v][0]);
                        } else {
                          setPostModel("");
                        }
                      }}
                    >
                      <option value="">{S.select}</option>
                      {CAR_MAKES.map(function (m) {
                        return (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div>
                    <div className="hz-filter-label">{S.model}</div>
                    <select
                      className="hz-modal-input"
                      value={postModel}
                      onChange={function (e) {
                        setPostModel(e.target.value);
                      }}
                      disabled={!postBrand}
                    >
                      <option value="">{S.select}</option>
                      {postBrand &&
                        (CAR_DATA[postBrand] || []).map(function (model) {
                          return (
                            <option key={model} value={model}>
                              {model}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div>
                    <div className="hz-filter-label">{S.year}</div>
                    <input
                      type="number"
                      className="hz-modal-input"
                      value={postYear}
                      onChange={function (e) {
                        setPostYear(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <div className="hz-filter-label">{S.mileageKm}</div>
                    <input
                      type="number"
                      className="hz-modal-input"
                      value={postMileage}
                      onChange={function (e) {
                        setPostMileage(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <div className="hz-filter-label">{S.specs}</div>
                    <input
                      className="hz-modal-input"
                      value={postSpecs}
                      onChange={function (e) {
                        setPostSpecs(e.target.value);
                      }}
                      placeholder="GCC / US / EU"
                    />
                  </div>
                  <div>
                    <div className="hz-filter-label">{S.sellerType}</div>
                    <select
                      className="hz-modal-input"
                      value={postSellerType}
                      onChange={function (e) {
                        setPostSellerType(e.target.value);
                      }}
                    >
                      <option value="">{S.select}</option>
                      <option value="private">{S.private}</option>
                      <option value="dealership">{S.dealer}</option>
                    </select>
                  </div>
                  <div>
                    <div className="hz-filter-label">{S.vin}</div>
                    <input
                      className="hz-modal-input"
                      value={postVin}
                      onChange={function (e) {
                        setPostVin(e.target.value);
                      }}
                    />
                  </div>
                </>
              )}
            </div>

            {postImages.length > 0 && (
              <div className="hz-img-preview-row">
                {postImages.map(function (src, i) {
                  return (
                    <img
                      key={i}
                      src={src}
                      alt="preview"
                      className="hz-img-preview"
                    />
                  );
                })}
              </div>
            )}

            {postFeeText && (
              <div className="hz-post-fee-text">{postFeeText}</div>
            )}
            {postError && <div className="hz-post-error">{postError}</div>}

            <div className="hz-modal-actions">
              <button
                className="hz-modal-btn-secondary"
                onClick={function () {
                  setShowPostForm(false);
                }}
              >
                {S.cancel}
              </button>
              <button
                className="hz-modal-btn"
                onClick={function () {
                  submitListing();
                }}
              >
                {S.createListingDemo}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { postingFeeFor, validateCarListing };
export default HuzzlieApp;
