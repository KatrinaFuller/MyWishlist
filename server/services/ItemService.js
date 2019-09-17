import mongoose, { mongo } from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let _schema = new Schema({
  name: { type: String, required: true },
  imgUrl: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  store: { type: String },
  authorId: { ype: ObjectId, ref: 'User', required: true }
}, { timestamps: true })

export default class ItemService {
  get repository() {
    return mongoose.model('item', _schema)
  }
}