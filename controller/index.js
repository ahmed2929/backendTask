const { DataObject, Level, Element } =require("../DB/index")


exports.CreateDataObject = async (req, res) => {
  
  try {
    const { name, levels } = req.body;
    const dataObject = await DataObject.create({ name });
    await Promise.all(
      levels.map(async (level) => {
        const { levelID, levelName, elements } = level;
        const levelData = await Level.create({
          levelID,
          levelName,
          DataObjectId: dataObject.id,
        });
        await Promise.all(
          elements.map(async (element) => {
            const { name } = element;
            await Element.create({
              name,
              LevelId: levelData.id,
            });
          })
        );
      })
    );
    res.status(201).send({ message: "DataObject created successfully" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
 
  };
  
exports.findAllDataObject = async (req, res) => {
  try {
    const dataObjects = await DataObject.findAll({
      include: [
        {
          model: Level,
          include: [
            {
              model: Element,
            },
          ],
        },
      ],
    });
    res.status(200).send(dataObjects);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
  };
  

  exports.findOneDataObject = async (req, res) => {
    try {
      const { id } = req.params;
      const dataObject = await DataObject.findByPk(id, {
        include: [
          {
            model: Level,
            include: [
              {
                model: Element,
              },
            ],
          },
        ],
      });
      if (!dataObject) {
        return res.status(404).send({ message: "DataObject not found" });
      }
      res.status(200).send(dataObject);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };
      
  exports.deleteDataObject = async (req, res) => {
        try {
          const { id } = req.params;
          const dataObject = await DataObject.findByPk(id);
          if (!dataObject) {
            return res.status(404).send({ message: "DataObject not found" });
          }
          await dataObject.update({ deletedAt: new Date() });
          res.status(200).send({ message: "DataObject deleted successfully" });
        } catch (error) {
          res.status(400).send({ message: error.message });
        }
  };

  exports.SetLinkDataObject = async (req, res) => {
    try {
      const { id } = req.params;
      const { parentId } = req.body;
      const element = await Element.findByPk(id);
      if (!element) {
        return res.status(404).send({ message: "Element not found" });
      }
      const parentElement = await Element.findByPk(parentId);
      if (!parentElement) {
        return res.status(404).send({ message: "Parent element not found" });
      }
      if (element.LevelId === parentElement.LevelId) {
        return res
          .status(400)
          .send({
            message: "Element and parent element must not be in the same level",
          });
      }
      await element.update({ parentId });
      res.status(200).send({ message: "Parent-child link set successfully" });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
    
};