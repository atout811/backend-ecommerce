const Department = require("./departmentModel");

const retrive = async (req, res) => {
  const department = await Department.findOne({ title: req.params.title });
  console.log(department);
  if (!department) return res.status(404).send("This Department is not found");

  res.json(department.items);
};

const createDep = async (req, res) => {
  let department = await await Department.findOne({ title: req.body.title });
  if (department)
    return res.status(400).send("This Department is Already exist");
  department = await Department({ title: req.body.title });
  department = await department.save();
  res.status(200).send("Department added");
};

module.exports = { retrive, createDep };
