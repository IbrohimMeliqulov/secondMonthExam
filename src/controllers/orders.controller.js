import pg from "../config/config.js";

const POST = async (req, res) => {
  const data = req.body;
  const order = await pg.query(
    "insert into orders(car_id,user_id,month_count,start_date,end_date) values($1,$2,$3,$4,$5) RETURNING *",
    [data]
  );

  return res.status(201).json({
    status: 201,
    message: "Order created successfully",
    data: order,
  });
};

const GET = async (req, res) => {
  const { id } = req.params;
  const orders = await pg.query("select * from orders where user_id=$1", [id]);
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
};

const UPDATE = async (req, res) => {
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
  await pool.query(`update orders set ${str} where id=$${i}`, arr);

  res.status(201).json({
    status: 201,
    message: "order updated successfully",
  });
};

const DELETE = async (req, res) => {
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
};

export default {
  POST,
  GET,
  UPDATE,
  DELETE,
};
