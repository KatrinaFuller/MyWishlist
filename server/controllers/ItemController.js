import express from 'express'
import ItemService from '../services/ItemService'

let _itemService = new ItemService().repository

export default class ItemController {
  constructor() {
    this.router = express.Router()
      .get('', this.getAll)
      .get('/:id', this.getById)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      let item = await _itemService.find({})
      return res.send(item)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      let item = await _itemService.findById(req.params.id)
      if (!item) {
        throw new Error("Invalid Item")
      }
      res.send(item)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      let item = await _itemService.create(req.body)
      res.send(item)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      let item = await _itemService.findOneAndUpdate({ _id: req.params.id, }, req.body, { new: true })
      if (item) {
        return res.send(item)
      }
      throw new Error("invalid id")
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      await _itemService.findOneAndRemove({ _id: req.params.id })
      res.send("deleted item")
    } catch (error) {
      next(error)
    }
  }

}