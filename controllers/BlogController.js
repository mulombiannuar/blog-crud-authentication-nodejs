const index = (req, res) => {
  res.render("pages/home", {
    title: "Home",
  });
};

const create = (req, res) => {
  res.render("user/blog/create", {
    title: "Create",
  });
};

const store = async (req, res) => {
  try {
    res
      .status(200)
      .json({ status: "success", message: "Blog saved successfully" });
  } catch (error) {
    res.status(500).send({ status: "success", message: error.message });
  }
};

const show = (req, res) => {
  const id = req.params.id;
  res.render("user/blog/show", {
    title: "Show",
  });
};

const edit = (req, res) => {
  const id = req.params.id;
  res.render("user/blog/edit", {
    title: "Edit",
  });
};

const update = (req, res) => {
  const id = req.params.id;
  res
    .status(400)
    .send({ status: "success", message: "Blog updated successfully" });
};

const destroy = (req, res) => {
  const id = req.params.id;
  res
    .status(400)
    .send({ status: "success", message: "Blog deleted successfully" });
};

module.exports = {
  index,
  create,
  store,
  show,
  edit,
  update,
  destroy,
};
