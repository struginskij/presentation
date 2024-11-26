import axios from "axios";
import * as Sentry from "@sentry/react";

axios.interceptors.request.use(
  function (config) {
    const { origin } = new URL(config.url);

    const allowedOrigins = [process.env.REACT_APP_BASE_ENDPOINT];
    const token = localStorage.getItem("access-token");

    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const fetchProductList = async ({ pageParam = 1 }) => {
  const data = [
    {
        "photos": [],
        "_id": "67424aefc27911b81ab5c343",
        title: "iPhone 14",
        description: "Latest model of the iPhone series.",
        "price": 999.99,
        "createdAt": "2024-11-23T21:36:47.963Z",
        "__v": 0
    },
    {
        "photos": [],
        "_id": "67424aedc27911b81ab5c341",
      title: "Samsung Galaxy S23",
      description: "Flagship Samsung smartphone with advanced features.",
        "price": 899.99,
        "createdAt": "2024-11-23T21:36:45.449Z",
        "__v": 0
    },
    {
        "photos": [],
        "_id": "67424ad3c27911b81ab5c33d",
      title: "Google Pixel 8",
      description: "Google's latest Pixel phone with pure Android experience.",
        "price": 799.99,
        "createdAt": "2024-11-23T21:36:19.025Z",
        "__v": 0
    },
    {
        "photos": [
            ""
        ],
        "_id": "674232bc41f9a40131d113df",
      title: "Dell XPS 15",
      description: "High-performance laptop for professionals.",
      price: 1499.99,
        "createdAt": "2024-11-23T19:53:32.864Z",
        "__v": 0
    },
    {
        "photos": [],
        "_id": "6742329d41f9a40131d113dd",
        "title": "Iphone 15",
        "description": "New Iphone 15",
        price: 399.99,
        "createdAt": "2024-11-23T19:53:01.199Z",
        "__v": 0
    }
]


  return data;
};

export const fetchProduct = async (id) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ENDPOINT}/product/${id}`
  );

  return data;
};

export const postProduct = async (input) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_ENDPOINT}/product/`,
      input
    );
    return data;
  } catch (error) {
    Sentry.captureException(error, {
      extra: {
        input,
        endpoint: `${process.env.REACT_APP_BASE_ENDPOINT}/product/`,
      },
    });

    Sentry.addBreadcrumb({
      category: "API",
      message: "Failed to post product",
      level: "error",
    });

    throw error;
  }
};

export const fetcRegister = async (input) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_ENDPOINT}/auth/register`,
    input
  );

  return data;
};

export const fetchLogin = async (input) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_ENDPOINT}/auth/login`,
    input
  );

  return data;
};

export const fetchMe = async () => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ENDPOINT}/auth/me`
  );
  return data;
};

export const fetchLogout = async () => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_ENDPOINT}/auth/logout`,
    {
      refresh_token: localStorage.getItem("refresh-token"),
    }
  );
  return data;
};

export const postOrder = async (input) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_ENDPOINT}/order`,
    input
  );
  return data;
};

export const fetchOrders = async () => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ENDPOINT}/order`
  );
  return data;
};

export const deleteProduct = async (product_id) => {
  const { data } = await axios.delete(
    `${process.env.REACT_APP_BASE_ENDPOINT}/product/${product_id}`
  );

  return data;
};

export const updateProduct = async (input, product_id) => {
  const { data } = await axios.put(
    `${process.env.REACT_APP_BASE_ENDPOINT}/product/${product_id}`,
    input
  );

  return data;
};
