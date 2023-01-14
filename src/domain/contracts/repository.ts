import { ChargeEntity } from '../entities';
import { ID } from '../value-objects/id.value-object';

export interface ISave<Entity> {
  save(entity: Entity): Promise<Entity>;
}

export interface IUpdate<Entity> {
  update(entity: Entity): Promise<Entity>;
}

export interface IFindOneById<Entity> {
  findOneById(id: ID): Promise<Entity>;
}

export interface IDeleteOne<Entity> {
  delete(entity: Entity): Promise<Entity>;
}

export interface IChargeRepository
  extends ISave<ChargeEntity[]>,
    IUpdate<ChargeEntity> {}
