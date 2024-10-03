const mongoose = require('mongoose');
const Package = require('../models/package');
const Category = require('../models/category')
const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error')

mongoose.connect(
    'mongodb://localhost:27017'
).then(()=> {
    console.log('Package Connected to database')
}).catch(()=>{
    console.log('Connection Failed! ')
});

const CreatePackage = async (req,res) => {
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid category')
    
        const createdPackage = new Package({
        name:req.body.name,
        from_date:req.body.from_date,
        to_date:req.body.to_date,
        description:req.body.description,
        price:req.body.price,
        short_description:req.body.short_description,
        image:req.body.image,
        category:req.body.category
    });
    const result = await createdPackage.save();

    res.json(result);
};
// ---------------------------------------------------------------------------------------------------------------------------

const getPackage = async (req, res) => {
    const categoryId = req.params.categoryId;
    const package = await Package.find().populate('category','name').exec();
    if(!package){
        res.send('Not Found!')
    }
    res.json(package);

};
// --------------------------------------------------------------------------------------------------------------------------
const getPackageById = async(req,res) =>{
    const id = req.params.packageid;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid package ID' });
    }


    const package = await Package.findById(id).populate('category','name');
    if(!package)
    {
        res.send('Not Found!');
    }
    res.json(package);
};
// --------------------------------------------------------------------------------------------------------------------------
const UpdatePackage = async(req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(
            new HttpError('Invalid inputs passed, please check your data')
        );
    }

    const {name,from_date,to_date,description,price,short_description,image} = req.body;
    const packageId = req.params.packageid;

    let package;
    
    try{
       package = await Package.findById(packageId);

    } catch (err){
        const error = new HttpError(
            'Something went wrong, could not update product.',
            500
        );
        return res.json(error);
    }

    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid category')

    package.name = name;
    package.from_date = from_date;
    package.to_date = to_date;
    package.description = description;
    package.price = price;
    package.short_description = short_description;

    package.image = image;
    package.category = category;

    try{
        await package.save();
    } catch (err) {
        console.error('Error saving package:', err);
        const error = new HttpError(
            'Something went wrong, could not update place ',
            501
        );
        return res.json(error);
    }
    res.status(200).json({package:package.toObject({getters:true}) });
};
// -----------------------------------------------------------------------------------------------------------------------------
const deletePackageById = async (req, res) => {
    const pid = req.params.packageid;
    
    try {
        const package = await Package.findByIdAndDelete(pid).exec();
        if (!package) {
            return res.status(404).json({ error: 'Not Found' });
        }
        
        res.status(200).json({ message: 'Package deleted successfully' });
    } catch (err) {
        
        console.error('Error deleting package:', err);
        const error = new HttpError('Something went wrong, could not delete package.', 500);
        res.status(500).json(error);
    }
};

//----------------------------------------------------------------------------------------------------------------------------------



exports.createPackage = CreatePackage;
exports.updatePackage = UpdatePackage;
exports.getPackage = getPackage;
exports.getPackageById = getPackageById;
exports.deletePackageById = deletePackageById;