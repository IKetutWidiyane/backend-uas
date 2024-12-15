const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const data = req.body;
    const userExist = await prisma.tb_user.findUnique({
      where: {
        username: data.username,
      },
    });

    console.log(data);

    if (userExist) {
      res.json({
        status: false,
        msg: "Username Already Exist",
      });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(data.password, salt);
      data.password = hashPassword;

      await prisma.tb_user.create({
        data,
      });
      res.json({
        status: true,
        msg: "Registration Successfully",
        data: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
    const userExist = await prisma.tb_user.findUnique({
      where: {
        username: req.body.username,
      },
    });
    if (userExist) {
      if (bcrypt.compareSync(req.body.password, userExist.password)) {
        delete userExist.password;
        res.json({
          status: true,
          msg: "berhasil login",
          data: userExist,
        });
      } else {
        res.json({
          status: false,
          msg: "password salah",
        });
      }
    } else {
      res.json({
        status: false,
        msg: "username salah",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
