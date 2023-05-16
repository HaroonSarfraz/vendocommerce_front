import {
  CategoriesSvg,
  ClipboardSvg,
  DashboardSvg,
  GraphSvg,
  LockSvg,
  UserLgSvg,
  UsersSvg,
} from "../assets";

function getItem(label, key, icon, children, parent = "") {
  return {
    key,
    icon,
    children,
    label,
  };
}

export const adminMenus = [
  getItem("Manage Brands", "brands", <UsersSvg />),
  getItem("Manage Users", "users", <LockSvg />),
];

export const userMenus = [
  getItem("Dashboard", "dashboard", <DashboardSvg />),
  getItem("Sales Analytics", "sales-analytics", <GraphSvg />, [
    getItem(
      "Sales",
      "sales",
      <span className="menu-bullet">
        <span className="bullet bullet-dot" />
      </span>,
      null,
      "sales-analytics"
    ),
    getItem(
      "Sales by SKU",
      "sku",
      <span className="menu-bullet">
        <span className="bullet bullet-dot" />
      </span>,
      null,
      "sales-analytics"
    ),
    getItem(
      "Sales by Product",
      "product",
      <span className="menu-bullet">
        <span className="bullet bullet-dot" />
      </span>,
      null,
      "sales-analytics"
    ),
    getItem(
      "Sales by Week",
      "week",
      <span className="menu-bullet">
        <span className="bullet bullet-dot" />
      </span>,
      null,
      "sales-analytics"
    ),
    getItem(
      "Sales by Month",
      "month",
      <span className="menu-bullet">
        <span className="bullet bullet-dot" />
      </span>,
      null,
      "sales-analytics"
    ),
  ]),
  getItem("Inventory Management", "inventory-management", <CategoriesSvg />, [
    getItem(
      "Inventory Dashboard",
      "inventory-dashboard",
      <span className="menu-bullet">
        <span className="bullet bullet-dot" />
      </span>,
      null,
      "inventory-management"
    ),
    getItem(
      "Inventory Planning",
      "planning",
      <span className="menu-bullet">
        <span className="bullet bullet-dot" />
      </span>,
      null,
      "inventory-management"
    ),
    getItem(
      "Shipping From Address",
      "shipping-from-address",
      <span className="menu-bullet">
        <span className="bullet bullet-dot" />
      </span>,
      null,
      "inventory-management"
    ),
    getItem(
      "PO Tempate",
      "po-template",
      <span className="menu-bullet">
        <span className="bullet bullet-dot" />
      </span>,
      null,
      "inventory-management"
    ),
  ]),
  getItem(
    "Advertisement Analytics",
    "advertising-analytics",
    <ClipboardSvg />,
    [
      getItem(
        "Amazon Advertising",
        "advertising-data",
        <span className="menu-bullet">
          <span className="bullet bullet-dot" />
        </span>,
        null,
        "advertising-analytics"
      ),
      getItem(
        "Total Revenue ACoS",
        "total-revenue-acos",
        <span className="menu-bullet">
          <span className="bullet bullet-dot" />
        </span>,
        null,
        "advertising-analytics"
      ),
      getItem(
        "Import Advertising data",
        "import",
        <span className="menu-bullet">
          <span className="bullet bullet-dot" />
        </span>,
        null,
        "advertising-analytics"
      ),
    ]
  ),
  getItem("Category Reports", "category-reports", <ClipboardSvg />, [
    getItem(
      "Category Performance Report",
      "category-performance-report",
      <span className="menu-bullet">
        <span className="bullet bullet-dot" />
      </span>,
      null,
      "category-reports"
    ),
    getItem(
      "Product Report",
      "product-report",
      <span className="menu-bullet">
        <span className="bullet bullet-dot" />
      </span>,
      null,
      "category-reports"
    ),
    getItem(
      "Category Product Data",
      "category-product-list",
      <span className="menu-bullet">
        <span className="bullet bullet-dot" />
      </span>,
      null,
      "category-reports"
    ),
    getItem(
      "Manage Categories",
      "manage-categories",
      <span className="menu-bullet">
        <span className="bullet bullet-dot" />
      </span>,
      null,
      "category-reports"
    ),
  ]),
  getItem("Customer Acquisition", "customer-acquisition", <UserLgSvg />, [
    getItem(
      "New v/s Repeat",
      "new-vs-repeat",
      <span className="menu-bullet">
        <span className="bullet bullet-dot" />
      </span>,
      null,
      "customer-acquisition"
    ),
    getItem(
      "LTV",
      "ltv",
      <span className="menu-bullet">
        <span className="bullet bullet-dot" />
      </span>,
      null,
      "customer-acquisition"
    ),
  ]),
];
