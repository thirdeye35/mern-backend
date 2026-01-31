router.put("/:id", async (req, res) => {
  const { title, completed } = req.body;

  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    { title, completed },
    { new: true }
  );

  res.json(updatedTask);
});
