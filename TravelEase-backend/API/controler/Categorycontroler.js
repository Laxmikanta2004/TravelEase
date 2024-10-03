const mongoose = require('mongoose');
const Category = require('../models/category');
const HttpError = require('../models/http-error')
const { validationResult } = require('express-validator');

mongoose.connect(
    'mongodb://localhost:27017'
).then(()=> {
    console.log('Category Connected to database ')
}).catch(()=>{
    console.log('Connection Failed! ')
});

const CreateCategory = async (req,res) => {
    const createdCetegory = new Category({
        name:req.body.name
    });
    const result = await createdCetegory.save();

    res.json(result);
};
//----------------------------------------------------------------------------------------------------------
const getCategory = async (req, res) => {
    const category = await Category.find().exec();
    if(!category){
        res.send('not found')
    }

    res.json(category);
};
//---------------------------------------------------------------------------------------------------------
const getCategoryById = async(req, res) => {
    const id = req.params.categoryId;
    const category = await Category.findById(id).exec();
    if(!category)
    {
        res.send('not found');
    }
    res.json({name:category.name});
};

//----------------------------------------------------------------------------------------------------------

const updateCategory = async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(
            new HttpError('Invalid inputs passed, please check your data')
        );
    }

    const {name} = req.body;
    const cId = req.params.categoryId;

    let category;
    try{
        category = await Category.findById(cId);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong,could not update package.',
            500
        );
       return res.json(error); 
    }

    category.name = name;

    try{
        await category.save();
    }catch(err){
        const error = new HttpError('Something went wrong,could not update package.',500);
        return res.json(error);
    }
    res.status(200).json({category:category.toObject({getters:true}) });
}

//--------------------------------------------------------------------------------------------------------------

const deleteCategoryById = async (req, res, next) => {
    const id = req.params.categoryId;

    let category;
    try {
        category = await Category.findByIdAndDelete(id).exec();
    } catch (err) {
        const error = new HttpError('Something went wrong, could not delete category.', 500);
        return next(error);
    }

    if (!category) {
        return res.status(404).json({ error: 'Not Found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
};



exports.CreateCategory = CreateCategory;
exports.updateCategory = updateCategory;
exports.getCategory = getCategory;
exports.getCategoryById = getCategoryById;
exports.deleteCategoryById = deleteCategoryById;

