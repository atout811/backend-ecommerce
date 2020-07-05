const Department = require("./departmentModel");

const depController = {
  retrive: async (req, res) => {
    try {
      const department = await Department.findOne({
        depName: req.params.depName,
      });
      console.log(department);
      if (!department)
        return res.status(404).send("This Department is not found");

      res.json(department.items);
    } catch (e) {
      return res.status(500).send(e.message);
    }
  },

  createDep: async (req, res) => {
    try {
      let department = await Department.findOne({
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
  },
  addItem: async (req, res) => {
    try {
      let department = await Department.findOne({
        depName: req.body.depName,
      });
      if (!department) return res.status(404).send("Choose Department");
      let item = department.items.find(
        item => item.itemName == req.params.itemName
      );
      console.log(item);
      if (item) {
        item.quantity += 1;
        await department.save();
        return res.send("Item increased ...");
      }
      item = {
        itemName: req.params.itemName,
        review: 0,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
      };
      await department.items.push(item);
      await department.save();
      res.json(item);
    } catch (e) {
      res.status(500).send(e.message);
    }
  },
  deleteItem: async (req, res) => {
    try {
      let department = await Department.findOne({
        depName: req.body.depName,
      });
      if (!department) return res.status(404).send("Choose Department");
      let item = department.items.find(
        item => item.itemName == req.params.itemName
      );
      console.log(item);
      if (!item) return res.send("This item isn't existed");
      department.items = department.items.filter(
        check => check.itemName != item.itemName
      );
      department.save();
      res.send("Item deleted ....");
    } catch (e) {
      res.send(e.message);
    }
  },
  updateItem: async (req, res) => {
    try {
      let department = await Department.findOne({
        depName: req.body.depName,
      });
      if (!department) return res.status(404).send("Choose Department");
      let item = department.items.find(
        item => item.itemName == req.params.itemName
      );
      console.log(item);
      if (item) {
        item.quantity += 1;
        await department.save();
        return res.send("Item increased ...");
      }
    } catch (e) {
      res.send(e.message);
    }
  },
};

module.exports = depController;
