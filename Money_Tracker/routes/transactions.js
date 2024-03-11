const express = require("express");
const router = express.Router();


const Transaction = require("../models/Transaction");

router.get("/", (req, res) => {
  Transaction.find()
    .sort({ date: -1 })
    .then((transactions) => res.json(transactions));
});


router.post("/", (req, res) => {
  const newTransaction = new Transaction({
    amount: req.body.amount,
    type: req.body.type,
    description: req.body.description,
  });

  newTransaction.save().then((transaction) => res.json(transaction));
});


router.delete("/:id", (req, res) => {
  Transaction.findById(req.params.id)
    .then((transaction) =>
      transaction.remove().then(() => res.json({ success: true }))
    )
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
