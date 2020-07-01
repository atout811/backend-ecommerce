const Item = require("./itemModel");
const Department = require("../department/departmentModel");

const itemController = {
  createItem: async (req, res) => {
    try {
      let item = await Item.findOne({ name: req.body.name });
      if (item) {
        item.quantity += 1;
        return res.status(400).send("This Item is already exist");
      }
      let department = await Department.findOne({ title: req.params.title });
      console.log(department);
      if (!department) return res.status(404).send("Please choose department");
      item = await Item({
        name: req.body.name,
        description: req.body.description,
        reviews: 0,
        quantity: 1,
      });
      item = await item.save();
      console.log(department);
      department.items.push(item);
      await department.save();
      console.log("3");
      res.status(200).send("Item Added Successfully");
    } catch (e) {
      return res.status(500).send(e.message);
    }
  },
};
module.exports = itemController;
