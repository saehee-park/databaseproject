const router = require("express").Router();

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    if (!req.session.authorization) res.json({ message: "you should login" });
    const user = await Employee.findOne({
        where: { id },
    });
    let total = 0;
    const scores = await Peer.findAll({
        where: {
            evaluation_no: user.emp_no,
        },
    });

    scores.forEach((val) => {
        total += val.evaluation_score1;
        total += val.evaluation_score2;
    });

    res.json({
        total,
        average: total / (scores.length * 2),
    });
});

router.get("/", async (req, res) => {
    let max = -1;
    let index = -1;
    const scores = await Peer.findAll({});
    scores.forEach((val, i) => {
        const temp = val.evaluation_score1 + val.evaluation_score2;
        if (max < temp) index = i;
    });
    const user = await Employee.findOne({
        where: { emp_no: scores[index].evaluation_no },
    });

    res.json(user);
});

module.exports = router;
