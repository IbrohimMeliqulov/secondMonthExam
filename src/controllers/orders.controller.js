import pg from "../config/config.js";

const POST = async (req, res) => {
  try {
    const { car_id, user_id, month_count, amount, start_date, end_date } =
      req.body;

    const car = pg.query("select price from cars where id=$1", [car_id]);
    const percent = car.rows[0].price * 0.2;

    if (percent > amount) {
      return {
        status: 400,
        message: "Boshlang'ich to'lova yetarli emas",
      };
    }

    const order = await pg.query(
      "insert into orders(car_id,user_id,month_count,start_date,end_date) values($1,$2,$3,$4,$5) RETURNING *",
      [car_id, user_id, month_count, start_date, end_date]
    );

    const order_id = order.rows[0].id;
    await pg.query("insert into payments (order_id,amount) values($1,$2)", [
      order_id,
      amount,
    ]);

    return res.status(201).json({
      status: 201,
      message: "Order created successfully",
      data: order.rows[0],
    });
  } catch (error) {
    console.error(error);
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
    console.error(error);
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
    console.error(error);
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
    console.error(error);
  }
};

export default {
  POST,
  GET,
  UPDATE,
  DELETE,
};
