import pg from "../config/config.js";

const POST = async (req, res) => {
  try {
    const data = req.body;
    const payment = await pg.query(
      "insert into payments(order_id,amount) values($1,$2) RETURNING *",
      [data.order_id, data.amount]
    );

    return res.status(201).json({
      status: 201,
      message: "Payment made successfully",
      data: payment.rows,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const GET = async (req, res) => {
  try {
    const { id } = req.params;
    const payments = await pg.query(
      "select * from payments where order_id=$1",
      [Number(id)]
    );

    let user_payments = 0;

    for (const row of payments.rows) {
      user_payments += Number(row.amount);
    }

    if (payments.rows.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "There are not any payments found with this id",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Payments found",
      made_payments: user_payments,
      data: payments.rows,
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
    await pg.query(`update payments set ${str} where id=$${i}`, arr);

    res.status(201).json({
      status: 201,
      message: "payment updated successfully",
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const DELETE = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await pg.query(
      "delete from payments where id=$1 RETURNING *",
      [id]
    );
    if (payment.rows.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "There are not any payments with this id",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "payment deleted successfully",
      data: payment,
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
