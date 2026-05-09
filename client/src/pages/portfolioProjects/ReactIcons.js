import {
  FaHome,
  FaBlog,
  FaShoppingCart,
  FaFileAlt,
  FaCogs,
  FaTachometerAlt,
  FaShippingFast,
  FaCog,
} from "react-icons/fa";
import { FaChartColumn, FaListCheck } from "react-icons/fa6";

export const ICONS = {
  all: FaHome,

  // Portfolio categories
  portfoliosystem: FaTachometerAlt,
  portfolioadminpanel: FaCogs,
  portfolioblogs: FaBlog,
  portfoliopages: FaFileAlt,

  // Nova dashboard categories
  novadashboardhome: FaTachometerAlt,
  novaadminpanel: FaCogs,
  novadashboardpages: FaFileAlt,

  // Nova cart categories
  ecommerceplatform: FaTachometerAlt,
  cartandcheckout: FaShoppingCart,
  userdashboard: FaCogs,
  adminproducts: FaListCheck,
  adminorders: FaShippingFast,
  analytics: FaChartColumn,
  pages: FaFileAlt,

  // Blogging platform categories
  blogplatform: FaTachometerAlt,
  blogadmindashboard: FaCog,
  blogplatformadminpanel: FaCogs,
  blogplatformpages: FaFileAlt,

  // Default category
  default: FaListCheck,
};

export const normalizeKey = (catName) =>
  catName
    .replace(/\s+/g, "") // remove spaces
    .replace(/[^a-zA-Z0-9]/g, "") // remove special characters
    .toLowerCase(); // lowercase for consistency
