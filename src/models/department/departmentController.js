const Department = require("./departmentModel");
const mongoose = require("mongoose");

const retrive = async (req, res) => {
  try {
    const department = await Department.findOne({
      title: req.params.title,
    }).populate("items");
    console.log(department);
    if (!department)
      return res.status(404).send("This Department is not found");

    res.json(department.items);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

const createDep = async (req, res) => {
  try {
    let department = await await Department.findOne({
      depName: req.body.depName,
    });
    if (department)
      return res.status(400).send("This Department is Already exist");
    department = await Department({
      depName: req.body.depName,
    });
    department = await department.save();
    res.status(200).send("Department added");
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

module.exports = { retrive, createDep };
