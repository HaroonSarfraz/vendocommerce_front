import request from "@/src/api/request";

export default function handler(req, res) {
  if (req.method === "GET") {
    request.get(
      `${process.env.NEXT_PUBLIC_ADVERTISING_RETURN_URL}?${
        req.url.split("?")[1]
      }`
    );

    res.status(200).json({ status: "success" });
  }
}
