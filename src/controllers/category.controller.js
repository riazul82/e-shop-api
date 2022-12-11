const slugify = require('slugify');
const Category = require('../models/category.model');

const createCategory = (req, res) => {
    try {
        const categoryObj = {
            name: req.body.name,
            slug: slugify(req.body.name)
        }
    
        if (req.body.parentId) {
            categoryObj.parentId = req.body.parentId;
        }
       
        const cat = new Category(categoryObj);
        cat.save((err, category) => {
            if (err) {
                return res.status(400).json({ message: err.message });
            }
            return res.status(201).json(category);
        });
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}

const getCategories = (req, res) => {
    try {
        Category.find()
        .exec((err, categories) => {
            if (err) {
                return res.status(400).json({ message: err.message });
            }
            return res.status(200).json({ categories });
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = { createCategory, getCategories };