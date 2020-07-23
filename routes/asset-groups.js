var express = require('express');
var router = express.Router();
const AssetGroup = require('../models/assetGroupModel');

/* GET all  */
router.get('/', async (req, res) => {
    try {
        const requests = await AssetGroup.find();
        res.json(requests);
    } catch(err) {
        res.json({ message: err });
    }
});

/* GET one */
router.get('/:id', async (req, res) => {
    try {
        const request = await AssetGroup.findById(req.params.id);
        res.json(request);
    } catch {
        res.json({ message: err });
    }

});

/* POST/Submit one */
router.post('/', async (req, res) => {
    const request = new AssetGroup({
        pmcr: req.body.pmcr,
        pmrq: req.body.pmrq,
        equipment: req.body.equipment,
        component: req.body.component,
        title: req.body.title,
        status: req.body.status,
        owner: req.body.owner,
        by: req.body.by,
        last: req.body.last,
        due: req.body.due
    });

    try {
        const savedRequest = await request.save();
        res.status(200).json(savedRequest);
    } catch {
        res.json({ message: err });
    }
});

module.exports = router;