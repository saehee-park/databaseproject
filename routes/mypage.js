var express = require('express');
var router = express.Router();

const { Skill, EmpSkill, Employee } = require("../models");

router.get("/", async (req, res) => {
    let mySkillList = [];
    console.log('hi');
    console.log('===========================================================');
    const user = await Employee.findOne({
        where: { emp_no: req.session.user.emp_no },
    });
    const empSkills = await EmpSkill.findAll({
        where: {
            emp_no: req.session.user.emp_no,
        },
        attributes: ["skill_no"],
    });
    for(let i=0; i<empSkills.length; i++) {
        const mySkills = await Skill.findOne( {
            where: {
                skill_no: empSkills[i].skill_no,
            }
        });
        console.log(mySkills);
        mySkillList.push(mySkills.sklil_name);
    }
    console.log(user.name);
    console.log(user.ID);
    console.log(user.PWD);
    console.log(user.education);
    console.log(user.work_experience);

    res.render('mypage/mypageview', {
        name: user.name,
        id: user.ID,
        pwd: user.PWD,
        education: user.education,
        userSkills: mySkillList,
        work_experience: user.work_experience,
    });
});

/*개인정보 수정*/
router.get("/myprofileEdit", function (req, res, next) {
    res.render("mypage/myProfileEdit", { title: "Express" });
});

module.exports = router;