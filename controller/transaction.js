const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.insert = async (req, res) => {
  try {
    const data = req.body;
    await prisma.transaction.create({
      data: {
        ...data,
        barangID: Number(data.barangID),
        jumlah: Number(data.jumlah),
        harga: Number(data.harga),
        total: Number(data.total),
      },
    });
    res.json({
      status: true,
      msg: "Transaction Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.confirmTransaction = async (req, res) => {
  try {
    await prisma.transaction.update({
      data: {
        status: 2,
      },
      where: {
        transactionID: Number(req.params.id),
      },
    });
    res.json({
      status: true,
      msg: "Transaction Confirmed",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const data = await prisma.transaction.findMany({
      include: {
        barang: true,
        tb_user: true,
      },
    });
    res.json({
      status: true,
      msg: "Succes",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getByUserID = async (req, res) => {
  try {
    const data = await prisma.transaction.findMany({
      where: {
        userID: req.params.id,
        tb_user: {
          role: 2,
        },
      },
      include: {
        barang: true,
      },
    });
    res.json({
      status: true,
      msg: "Succes",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
