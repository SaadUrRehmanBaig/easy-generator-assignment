export interface IBaseRepository<T> {
  create(entity: T): Promise<T>;
  findOneById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  update(id: string, entity: T): Promise<T | null>;
  delete(id: string): Promise<void>;
}
