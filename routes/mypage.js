const router = require("express").Router();

router.get("/", async (req, res) => {
    if (!req.session.authorization) res.json({ message: "you should login" });
    const user = await Employee.findOne({
        where: { authorization_no: req.session.authorization },
    });
    const { id, pwd, education, name, work_experience, emp_no } = user;
    const userSkills = await Skill.findAll({
        include: [
            {
                model: EmpSkill,
                where: [`emp_no = ${emp_no}`],
            },
        ],
        attributes: ["skill_name"],
    });
    res.json({
        id,
        pwd,
        education,
        skill: userSkills,
        name,
        work_experience,
    });
});

module.exports = router;