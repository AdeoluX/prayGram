const models = require('../models');


class GenericRepo {
   constructor() {
      if (GenericRepo.instance) {
         return GenericRepo.instance;
      }
      this.data = Math.random(); // Example property
      GenericRepo.instance = this;
   }

   setOptions(model, { selectOptions, condition, paginateOptions, transaction, inclussions, data, array, changes, returning, group }) {
      console.log(model, { selectOptions, condition, paginateOptions, transaction, inclussions, data, array, changes, returning, group })
      this.query = { selectOptions, condition, paginateOptions, transaction, inclussions, data, array, changes, returning, group };
      this.dbQuery = models[model]
      return this
   }

   create = () => {
      const { data, transaction, inclussions } = this.query
      return new this.dbQuery(data).save();
   }

   update = async () => {
      const { changes, condition } = this.query
      const updated = await this.dbQuery.findOneAndUpdate(condition, changes, {returnDocument: 'after'})
      return updated;
   }

   _delete = async () => {
      const { condition, transaction } = this.query
      return this.dbQuery.destroy({
         where: condition,
         ...(transaction && { transaction })
      })
   }

   findAll = () => {
      const { selectOptions, condition, transaction, inclussions } = this.query
      return this.dbQuery.find(condition)
   }


   findOne = () => {
      const {condition} = this.query
      return this.dbQuery.findOne(condition)
   }
}

module.exports = GenericRepo;