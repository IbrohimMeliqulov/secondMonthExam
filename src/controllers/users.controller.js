import pg from "../config/config.js";

const POST = async (req, res) => {
  const data = req.body;
  const user = await pg.query(
    "insert into users(full_name,age,email,phone) values($1,$2,$3,$4) RETURNING *",
    [data]
  );
  res.status(201).json({
    status: 201,
    message: "User created successfully",
    data: user,
  });
};

const GET = async (req, res) => {
  const users = await pg.query("select * from users");
  res.status(200).json({
    status: 200,
    data: users.rows,
  });
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const user = await pg.query("select * from users where id=$1", [id]);
  if (user.rows.length === 0) {
    return res.status(404).json({
      status: 404,
      message: "User not found",
    });
  }
  res.status(200).json({
    status: 200,
    data: user,
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
  await pool.query(`update users set ${str} where id=$${i}`, arr);

  res.status(201).json({
    status: 201,
    message: "User updated successfully",
  });
};

const DELETE = async (req, res) => {
  const { id } = req.params;
  const user = await pg.query("delete from users where id=$1 RETURNING *", [
    id,
  ]);
  if (user.rows.length === 0) {
    return res.status(404).json({
      status: 404,
      message: "user with this id not found",
    });
  }
  return res.status(200).json({
    status: 200,
    message: "User deleted successfully",
  });
};

export default {
  POST,
  GET,
  getOne,
  UPDATE,
  DELETE,
};
