const dataSchema = require('../models/dataModel');

// Creating a new data model with the given schema validation rules
const createData = async (req, res) => {
  try {
    const datas = await dataSchema.create(req.body);
    res.send({
      success: true,
      statusCode: 201,
      message: 'Successfully Added Data',
      data: datas,
    });
  } catch (err) {
    res.send({
      statusCode: 512, // validation error
      success: false,
      message: err.name,
    });
  }
};

//  Getting the list of data for the Specified route
const getData = async (req, res) => {
  try {
    const search = req.query.search || '';
    let sort = req.query.sort || 'updatedAt';
    // eslint-disable-next-line no-unused-expressions
    req.query.sort ? (sort = req.query.sort.split(',')) : (sort = [sort]);
    const sortBy = {};
    if (sort[1]) {
      // eslint-disable-next-line prefer-destructuring
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = 'asc';
    }
    const datas = await dataSchema.find({ userName: { $regex: search, $options: 'i' } }).sort(sortBy);
    res.send({
      success: true,
      statusCode: 200,
      data: datas,
      message: 'Successfully fetched data from the database',
    });
  } catch (error) {
    res.send({
      success: false,
      statusCode: 404,
      message: error.name,
    });
  }
};

//  Editing the contents of the particular document based on the current parameters
const editData = async (req, res) => {
  try {
    const { id } = req.params;
    const object = req.body;
    const datas = await dataSchema.findOneAndUpdate({ _id: id }, { $set: object }, { new: true });
    res.send({
      message: 'Succesfully updated',
      success: true,
      statusCode: 204,
      data: datas,
    });
  } catch (error) {
    res.send({
      message: error.name,
      statusCode: 512, // validation error
      success: false,
    });
  }
};

module.exports = { createData, getData, editData };
