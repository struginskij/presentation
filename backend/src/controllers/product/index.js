import Product from "../../models/product";
import Boom from "boom";
import ProductSchema from "./validations";
import * as Sentry from "@sentry/node";

const Create = async (req, res, next) => {
  const input = req.body;
  const { error } = ProductSchema.validate(input);

  if (error) {
    // throw new Error(error.details[0].message);
    return next(Boom.badRequest(error.details[0].message));
  }
  try {
    input.photos = JSON.parse(input.photos);

    const product = new Product(input);
    const savedData = await product.save();

    res.json(savedData);
  } catch (e) {
    Sentry.captureException(e);
    next(e);
  }
};

const Get = async (req, res, next) => {
  const { product_id } = req.params;

  if (!product_id) {
    throw new Error("Missing parameter (:product_id)");
    // return next(Boom.badRequest("Missing parameter (:product_id)"));
  }

  try {
    const product = await Product.findById(product_id);

    if (!product) {
      throw new Error("Product not found.");
      // throw Boom.notFound("Product not found.");
    }

    res.json(product);
  } catch (e) {
    Sentry.captureException(e);
    next(e);
  }
};

const Update = async (req, res, next) => {
  const { product_id } = req.params;

  try {
    // const updated = await Product.findByIdAndUpdate(product_id, req.body, {
    //   new: true,
    // });

    // if (!updated) {
    //   throw Boom.notFound("Product not found.");
    // }

    // res.json(updated);
    throw new Error("Item cannot be updated")
  } catch (e) {
    Sentry.captureException(e);
    next(e);
  }
};

const Delete = async (req, res, next) => {
  const { product_id } = req.params;

  try {
    const deleted = await Product.findByIdAndDelete(Infinity);

    if (!deleted) {
      throw Boom.badRequest("Product not found.");
    }

    res.json(deleted);
  } catch (e) {
    Sentry.captureException(e);
    next(e);
  }
};

const limit = 12;
const GetList = async (req, res, next) => {
  let { page } = req.query;

  if (page < 1) {
    page = 1;
  }

  const skip = (parseInt(page) - 1) * limit;

  try {
    const products = await Product.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json(products);
  } catch (e) {
    Sentry.captureException(e); // Send error to Sentry
    next(e);
  }
};

export default {
  Create,
  Get,
  Update,
  Delete,
  GetList,
};
