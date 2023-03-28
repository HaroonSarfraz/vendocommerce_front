import Icons from "../components/icons";

function getItem(label, key, icon, children, parent = "") {
  return {
    key,
    icon,
    children,
    label,
  };
}

export const adminMenus = [
  getItem("Manage Users", "users", <Icons type="users" />),
];

export const userMenus = [
  // getItem("Dashboard", "dashboard", <Icons type="dashboard" />),
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
    // getItem(
    //   "Sales by SKU",
    //   "sku",
    //   <span className="menu-bullet">
    //     <span className="bullet bullet-dot" />
    //   </span>,
    //   null,
    //   "sales-analytics"
    // ),
    // getItem(
    //   "Sales by Product",
    //   "product",
    //   <span className="menu-bullet">
    //     <span className="bullet bullet-dot" />
    //   </span>,
    //   null,
    //   "sales-analytics"
    // ),
    // getItem(
    //   "Sales by Week",
    //   "week",
    //   <span className="menu-bullet">
    //     <span className="bullet bullet-dot" />
    //   </span>,
    //   null,
    //   "sales-analytics"
    // ),
    // getItem(
    //   "Sales by Month",
    //   "month",
    //   <span className="menu-bullet">
    //     <span className="bullet bullet-dot" />
    //   </span>,
    //   null,
    //   "sales-analytics"
    // ),
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
];
