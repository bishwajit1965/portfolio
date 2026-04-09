import {
  FaHome,
  FaBlog,
  FaShoppingCart,
  FaFileAlt,
  FaCogs,
  // FaBlogger,
  FaTachometerAlt,
} from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";

// form database(Categories)
// [
//   "All",
//   "Portfolio Home Page",
//   "Portfolio Admin Panel",
//   "Portfolio Blogs",
//   "Portfolio Pages",
//   "Nova Amin Dashboard",
//   "Nova Cart E-Commerce",
//   "Blog Mongoose Project",
//   "Test debug successful",
//   "Tested validation",
// ];
// export const ICONS = {
//   all: FaHome,
//   portablehomepage: FaHome,
//   portableadminpanel: FaCogs,
//   portableblogs: FaBlog,
//   portablepages: FaFileAlt,
//   novaadmindashboard: FaCogs,
//   novacartecommerce: FaShoppingCart,
//   blogmongooseproject: FaBlog,
//   default: FaListCheck,
// };

[
  "All",
  "Portfolio Home Page",
  "Portfolio Admin Panel",
  "Portfolio Blogs",
  "Portfolio Pages",
  "Nova Amin Dashboard",
  "Nova Cart E-Commerce",
  "Blog Mongoose Project",
  "Test debug successful",
  "Tested validation",
];

[
  "All",
  "Portfolio System",
  "Portfolio Admin Panel",
  "Portfolio Blogs",
  "Portfolio Pages",
  "Nova Admin Dashboard",
  "E-Commerce Platform",
  "Blog Platform",
];

export const ICONS = {
  all: FaHome,
  portfoliosystem: FaTachometerAlt,
  portfolioadminpanel: FaCogs,
  portfolioblogs: FaBlog,
  portfoliopages: FaFileAlt,
  novaadmindashboard: FaTachometerAlt,
  ecommerceplatform: FaShoppingCart,
  blogplatform: FaBlog,
  default: FaListCheck,
};

export const normalizeKey = (catName) =>
  catName
    .replace(/\s+/g, "") // remove spaces
    .replace(/[^a-zA-Z0-9]/g, "") // remove special characters
    .toLowerCase(); // lowercase for consistency
