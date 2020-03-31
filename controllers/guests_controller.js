var express = require("express");
var router = express.Router();

var guest = require("../models/guest.js");

router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public.index.html"));
});

router.get("/guests", function(req, res) {
    guest.all(function(data) {
        res.json({ guests: data });
    });
});

router.post("/guests", function(req, res) {
    guest.create([
        'name', 'sat', 'guestCount', 'arriveTime', 'satTime'
    ], [
        req.body.name, req.body.sat, req.body.guestCount, req.body.arriveTime, req.body.satTime
    ], function(result) {
        res.json({ id: result.insertId });
    });
});

router.put("/guests/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition: ", condition);
    // console.log(res.json({ id: req.params.id }));
    guest.update({
        sat: req.body.sat
    }, condition, function(result) {
        // if (result.changedRow == 0) {
        //     return res.status(404).end();
        // } else {
            console.log(result);
            res.json({ id: req.params.id });
            // res.redirect("/guests");
        // }
    });
});

router.delete("/guests/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    guest.delete(condition, function(result) {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;