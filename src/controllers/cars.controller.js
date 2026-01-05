import pg from "../config/config.js";

const GET = async (req, res) => {
  try {
    const cars = await pg.query("select * from cars");

    return res.status(200).json({
      status: 200,
      data: cars.rows,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const POST = async (req, res) => {
  try {
    const data = req.body;
    const car = await pg.query(
      "insert into cars(name,year,model,price,color) values($1,$2,$3,$4,$5) RETURNING *",
      [data.name, data.year, data.model, data.price, data.color]
    );

    return res.status(201).json({
      status: 201,
      message: "car created successfully",
      data: car.rows,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const car = pg.query("select * from cars where id=$1", [id]);
    if ((await car).rows.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "car with this id not found",
      });
    }
    return res.status(200).json({
      status: 200,
      data: car.rows[0],
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const UPDATE = async (req, res) => {
  try {
    const { id } = req.params;
    let str = "";
    let arr = [];
    let i = 1;
    for (const el in req.body) {
      arr.push(req.body[el]);
      str += el + "=" + "$" + i + ",";
      i += 1;
    }

    str = str.split("");
    str.splice(str.length - 1, 1);
    str = str.join("");
    arr.push(+id);
    await pg.query(`update cars set ${str} where id=$${i}`, arr);

    res.status(201).json({
      status: 201,
      message: "Car updated successfully",
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const DELETE = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await pg.query("delete  from cars where id=$1 RETURNING *", [
      id,
    ]);

    if (car.rows.length === 0) {
      return req.status(404).json({
        status: 404,
        message: "car with this id not found",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "car deleted successfully",
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  GET,
  POST,
  getOne,
  UPDATE,
  DELETE,
};
