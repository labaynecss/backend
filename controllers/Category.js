const { validationResult } = require('express-validator');
const CategoryModel = require('../models/CategoryModel');

class Category {
  async create(req, res) {
    const errors = validationResult(req);
    const { name } = req.body;
    if (errors.isEmpty()) {
      const exist = await CategoryModel.findOne({ name });
      if (!exist) {
        await CategoryModel.create({ name });
        return res
          .status(200)
          .json({ message: 'Your category has created successfully !' });
      } else {
        return res
          .status(400)
          .json({ errors: [{ msg: `${name} Category is Already Exist!` }] });
      }
    } else {
      return res.status(400).json({ errors: errors.array() });
    }
  }
  async categories(req, res) {
    const page = req.params.page;
    const perPage = 3;
    const skip = (page - 1) * perPage;
    try {
      const count = await CategoryModel.find({}).countDocuments();
      const response = await CategoryModel.find({})
        .skip(skip)
        .limit(perPage)
        .sort({ updatedAt: -1 });
      console.log(response);
      return res.status(200).json({ categories: response, perPage, count });
    } catch (error) {
      console.log(error.message);
    }
  }
  async fetchCategory(req, res) {
    const { id } = req.params;
    try {
      const response = await CategoryModel.findOne({ _id: id });
      return res.status(200).json({ category: response });
    } catch (error) {
      console.log(error.message);
    }
  }
  async updateCategory(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const exist = await CategoryModel.findOne({ name });
      if (!exist) {
        const response = await CategoryModel.updateOne(
          { _id: id },
          { $set: { name } },
        );
        return res
          .status(200)
          .json({ message: 'Your Category has Updated Successfully!' });
      } else {
        return res
          .status(400)
          .json({ errors: [{ msg: `${name} Category is already exist!` }] });
      }
    } else {
      return res.status(400).json({ errors: errors.array() });
    }
  }
  async deleteCategory(req, res) {
    const { id } = req.params;
    try {
      await CategoryModel.deleteOne({ _id: id });
      return res
        .status(200)
        .json({ message: 'Category has deleted successfully!' });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json('Server internal error!');
    }
  }
  async allCategories(req, res) {
    try {
      const categories = await CategoryModel.find({});
      return res.status(200).json({ categories });
    } catch (error) {
      return res.status(500).json('Server internal error!');
    }
  }
  async randomCategories(req, res) {
    try {
      const categories = await CategoryModel.aggregate([
        { $sample: { size: 3 } },
      ]);
      return res.status(200).json({ categories });
    } catch (error) {
      return res.status(500).json('Server internal error!');
    }
  }
}

module.exports = new Category();
