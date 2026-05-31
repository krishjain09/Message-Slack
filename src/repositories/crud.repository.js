export function crudRepository(model) {
  return {
    create: async function (data) {
      const newDoc = await model.create(data)
      return newDoc
    },
    getById: async function (id) {
      const doc = await model.findById(id)
      return doc
    },
    getAll: async function () {
      const docs = await model.find()
      return docs
    },
    deleteById: async function (id) {
      const deletedDoc = await model.findByIdAndDelete(id)
      return deletedDoc
    },
    update: async function (id, data) {
      const updatedDoc = await model.findByIdAndUpdate(id, data, { new: true })
      return updatedDoc
    }
  }
}
