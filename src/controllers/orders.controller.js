import pg from "../config/config.js";

const POST = async (req, res) => {
  try {
    const data = req.body;
    const order = await pg.query(
      "insert into orders(car_id,user_id,month_count,start_date,end_date) values($1,$2,$3,$4,$5) RETURNING *",
      [
        data.car_id,
        data.user_id,
        data.month_count,
        data.start_date,
        data.end_date,
      ]
    );
    const orders = await pg.query(
      "select cars.price,orders.month_count from cars INNER JOIN orders ON cars.id=orders.car_id WHERE orders.user_id=$1",
      [data.user_id]
    );
    let totalPayment = 0;
    for (const row of orders.rows) {
      let price = row.price;

      if (row.month_count === 1) price *= 0.85;
      else if (row.month_count === 3) price *= 0.7;
      else if (row.month_count === 6) price *= 0.45;

      totalPayment += price;
    }
    return res.status(201).json({
      status: 201,
      message: "Order created successfully",
      data: order.rows,
      payment: totalPayment,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const GET = async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await pg.query("select * from orders where user_id=$1", [
      id,
    ]);
    if (orders.rows.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "You don't have any orders",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Your orders",
      data: orders.rows,
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
    await pg.query(`update orders set ${str} where id=$${i}`, arr);

    res.status(201).json({
      status: 201,
      message: "order updated successfully",
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const DELETE = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await pg.query("delete from orders where id=$1 RETURNING *", [
      id,
    ]);
    if (order.rows.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "order not found with this id",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Order deleted successfully",
      data: order,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  POST,
  GET,
  UPDATE,
  DELETE,
};
