const express = require('express');
const router = express.Router();
const { orderService } = require('../services/Order');

// create new order
router.post("/newOrder", orderService.newOrder);

//  get order with max total in dates range
router.get("/getMaxTotal", orderService.getMaxTotal);

// get top 3 popular genres in dates range
router.get("/getTopGenres", orderService.getTopGenres);

// get sum total in dates range
router.get("/getSumTotal", orderService.getSumTotal);

// get top authors in dates range
router.get("/getTopAuthors", orderService.getTopAuthors);

module.exports = router;