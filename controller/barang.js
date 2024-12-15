const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.insert = async (req, res) => {
  try {
    const body = req.body;
    const { price, kategori } = body;
    console.log(req.file);
    const data = {
      ...body,
      image: req.file.filename,
      price: Number(price),
      kategori: Number(kategori),
    };
    await prisma.barang.create({
      data,
    });
    res.json({
      status: true,
      msg: "Barang Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      msg: "error",
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const data = await prisma.barang.findMany({
      include: {
        kategori_barang_kategoriTokategori: true,
      },
    });
    res.json({
      status: true,
      msg: "succes",
      data: data,
    });
  } catch (error) {
    res.json({
      status: false,
      msg: "error",
    });
    console.log(error);
  }
};

exports.getByID = async (req, res) => {
  try {
    const data = await prisma.barang.findFirst({
      include: {
        kategori_barang_kategoriTokategori: true,
      },
      where: {
        id_barang: Number(req.params.id),
      },
    });
    res.json({
      status: true,
      msg: "succes",
      data: data,
    });
  } catch (error) {
    res.json({
      status: false,
      msg: "error",
    });
    console.log(error);
  }
};

exports.edit = async (req, res) => {
  try {
    const body = req.body;
    const { kategori, price } = body;
    let data = {
      ...body,
      price: Number(price),
      kategori: Number(kategori),
    };
    if (req.file) {
      data.image = req.file.filename;
    }

    await prisma.barang.update({
      where: {
        id_barang: Number(req.params.id),
      },
      data,
    });

    res.json({
      status: true,
      msg: "Update succesfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      msg: "error",
    });
  }
};

exports.deleteBarang = async (req, res) => {
  try {
    await prisma.barang.delete({
      where: {
        id_barang: Number(req.params.id),
      },
    });
    res.json({
      status: true,
      msg: "Barang Deleted succesfully",
    });
  } catch (error) {
    res.json({
      status: false,
      msg: "error",
    });
  }
};
