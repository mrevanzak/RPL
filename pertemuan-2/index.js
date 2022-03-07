const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.json());

const data = JSON.parse(fs.readFileSync("./data.json"));
const updateData = (data) => {
  fs.writeFileSync("./data.json", JSON.stringify(data));
};

app.get("/", (req, res) => {
  res.status(200).send(data);
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  const dataById = data.find((data) => data.id == id);
  if (!dataById) return res.status(404).send("data not found");
  res.status(200).send(dataById);
});

app.post("/", (req, res) => {
  const newData = {
    id: data.length + 1,
    title: req.body.title,
    price: req.body.price,
    brand: req.body.brand,
    category: req.body.category,
    image: req.body.image,
  };
  if (
    !newData.title ||
    !newData.price ||
    !newData.brand ||
    !newData.category ||
    !newData.image
  )
    return res.status(400).send("data missing");
  data.push(newData);
  res.status(200).send(data);
  updateData(data);
});

app.put("/:id", (req, res) => {
  const id = req.params.id;
  const dataById = data.find((data) => data.id == id);
  if (!dataById) return res.status(404).send("data not found");
  const updateData = {
    id: dataById.id,
    title: req.body.title,
    price: req.body.price,
    brand: req.body.brand,
    category: req.body.category,
    image: req.body.image,
  };
  if (
    !updateData.title ||
    !updateData.price ||
    !updateData.brand ||
    !updateData.category ||
    !updateData.image
  )
    return res.status(400).send("data missing");
  const index = data.indexOf(dataById);
  data.splice(index, 1, updateData);
  res.status(200).send(data);
  updateData(data);
});

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  const dataById = data.find((data) => data.id == id);
  if (!dataById) return res.status(404).send("data not found");
  const index = data.indexOf(dataById);
  data.splice(index, 1);
  res.status(200).send(data);
  updateData(data);
});

app.listen(3000, () => {
  console.log("connected");
});
