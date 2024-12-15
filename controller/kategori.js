const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.insert = async (req, res) => {
  try {
    await prisma.kategori.create({
      data: req.body,
    });
    res.json({
      status: true,
      msg: "kategori added succesfully",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const data = await prisma.kategori.findMany({});
    res.json({
      status: true,
      msg: "Request succes",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.edit = async (req, res) => {
  try {
    await prisma.kategori.update({
      data: req.body,
      where: {
        id_kategori: Number(req.params.id),
      },
    });
    res.json({
      status: true,
      msg: "edit succesfully",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deletekategori = async (req, res) => {
  try {
    await prisma.kategori.delete({
      where: {
        id_kategori: Number(req.params.id),
      },
    });
    res.json({
      status: true,
      msg: "delete succesfully",
    });
  } catch (error) {
    console.log(error);
  }
};
