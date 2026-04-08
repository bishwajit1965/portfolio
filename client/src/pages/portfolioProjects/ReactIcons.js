import {
  FaHome,
  FaBlog,
  FaShoppingCart,
  FaFileAlt,
  FaCogs,
  FaBlogger,
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

export const ICONS = {
  all: FaHome,
  portfoliohomepage: FaHome,
  portfolioadminpanel: FaCogs,
  portfolioblogs: FaBlog,
  portfoliopages: FaFileAlt,
  novaadmindashboard: FaTachometerAlt,
  novacartecommerce: FaShoppingCart,
  blogmongooseproject: FaBlog,
  testdebugsuccessful: FaBlogger,
  default: FaListCheck,
};

export const normalizeKey = (catName) =>
  catName
    .replace(/\s+/g, "") // remove spaces
    .replace(/[^a-zA-Z0-9]/g, "") // remove special characters
    .toLowerCase(); // lowercase for consistency
