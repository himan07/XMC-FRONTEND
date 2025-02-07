import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { uuid } = req.query;

    const response = await axios.get(
      "https://marketxcel.com/webservices/supplier/send_supplier_data",
      {
        headers: {
          SupplierId: "ff6a9e1fd6608945d4e4dca7ded50e85",
          Token: "Bearer 06c4e3995dafe6d7fd4afafa4ea2384d",
          uid: uuid,
        },
      }
    );

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    return res.json(response.data);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
}
