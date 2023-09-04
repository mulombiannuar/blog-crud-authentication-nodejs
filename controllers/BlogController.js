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

const store = (req, res) => {
  res
    .status(400)
    .send({ status: "success", message: "Blog saved successfully" });
};

const show = (req, res) => {
  const id = req.params.id;
  res.render("user/blog/show", {
    title: "Show",
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
  show,
  create,
  update,
  destroy,
};
