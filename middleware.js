import { composeMiddleware } from "next-compose-middleware";
import { NextResponse } from "next/server";
import authorize from "./lib/authorize";

export default async function middleware(req) {
  return composeMiddleware(req, NextResponse.next(), {
    scripts: [],
    "/login": [authorize("reverse")],
    "/users": [authorize("default")],
    "/users/create": [authorize("default")],
    "/users/edit": [authorize("default")],
    "/sales-analytics": [authorize("default")],
    "/sales-analytics/month": [authorize("default")],
    "/sales-analytics/product": [authorize("default")],
    "/sales-analytics/sales": [authorize("default")],
    "/sales-analytics/sku": [authorize("default")],
    "/sales-analytics/week": [authorize("default")],
    "/inventory-management/inventory-dashboard": [authorize("default")],
    "/inventory-management/planning": [authorize("default")],
    "/dashboard": [authorize("default")],
    "/customer-acquisition/ltv": [authorize("default")],
    "/customer-acquisition/new-vs-repeat": [authorize("default")],
    "/brands": [authorize("default")],
    "/brands/create": [authorize("default")],
    "/brands/edit": [authorize("default")],
    "/advertising-analytics/advertising-data": [authorize("default")],
    "/advertising-analytics/total-revenue-acos": [authorize("default")],
  });
}
