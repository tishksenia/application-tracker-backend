import express from "express";
var router = express.Router();

interface Category {
  id: number;
  title: string;
  applications: number[];
}

const mockCategories: Category[] = [
  {
    id: 0,
    title: "Germany",
    applications: [1, 2, 3],
  },
];

/* GET mock categories. */
router.get("/", function (req, res, next) {
  console.log("categories");
  if (req.method === "GET") {
    res.status(200).json(mockCategories);
  } else {
    res.status(500).json({ message: "Wrong HTTP Method, use GET" });
  }
});

export { router as categoriesRouter };
