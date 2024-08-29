import { Document, Model, UpdateQuery } from 'mongoose';
import { IBaseRepository } from './base.repository.interface';

export class BaseRepository<T extends Document> implements IBaseRepository<T> {
  constructor(private readonly model: Model<T>) {}

  async create(entity: T): Promise<T> {
    const createdEntity = new this.model(entity);
    return createdEntity.save();
  }

  async findOneById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async findAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  async update(id: string, entity: Partial<T>): Promise<T | null> {
    return this.model
      .findByIdAndUpdate(id, entity as UpdateQuery<T>, { new: true })
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }
}
