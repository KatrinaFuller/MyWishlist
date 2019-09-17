import express from 'express'
import { Authorize } from '../middleware/authorize.js'
import HomeService from '../services/HomeService.js'

let _homeService = new HomeService().repository

export default class HomeController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
      .use(this.defaultRoute)
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: 'No Such Route' })
  }

  async getAll(req, res, next) {
    try {
      let data = await _homeService.find({ authorId: req.session.uid })
      return res.send(data)
    }
    catch (err) {
      next(err)
    }
  }

  async getById(req, res, next) {
    try {
      let data = await _homeService.findOne({ _id: req.params.id, authorId: req.session.uid })
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.authorId = req.session.uid
      let data = await _homeService.create(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      let data = await _homeService.findOneAndUpdate({ _id: req.params.id, authorId: req.session.uid }, req.body, { new: true })
      if (data) {
        return res.send(data)
      }
      throw new Error("invlid id")
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      await _homeService.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid })
      return res.send("Successfully deleted")
    } catch (error) {
      next(error)
    }
  }

}