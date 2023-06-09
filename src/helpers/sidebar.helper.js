import Icons from "@/src/assets/icons";

function getItem(label, key, icon, children, parent = "") {
  return {
    key,
    icon,
    children,
    label,
  };
}

export const adminMenus = [
  getItem("Manage Brands", "users", <Icons type="users" />),
  getItem("Manage Users", "permissions", <Icons type="lock" />),
];

export const userMenus = [
  getItem("Dashboard", "dashboard", <Icons type="dashboard" />),
  getItem("Sales Analytics", "sales-analytics", <Icons type="graph" />, [
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
  // getItem(
  //   "Inventory Management",
  //   "inventory-management",
  //   <Icons type="categories" />,
  //   [
  //     getItem(
  //       "Inventory Planning",
  //       "planning",
  //       <span className="menu-bullet">
  //         <span className="bullet bullet-dot" />
  //       </span>,
  //       null,
  //       "inventory-management"
  //     ),
  //   ]
  // ),
  getItem(
    "Advertisement Analytics",
    "advertising-analytics",
    <Icons type="clipboard" />,
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
    ]
  ),
];
