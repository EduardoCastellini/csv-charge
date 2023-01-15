import { ChargeEntity } from '../entities';

export interface ISave<Entity> {
  save(entity: Entity): Promise<Entity>;
}

export interface IUpdate<Entity> {
  update(entity: Entity): Promise<Entity>;
}

export interface IFindOneByDebtId<Entity> {
  findOneByDebtId(id: string): Promise<Entity | void>;
}

export interface IFindAll<Entity> {
  findAll(): Promise<Entity[] | void>;
}

export interface IDeleteOne<Entity> {
  delete(entity: Entity): Promise<Entity>;
}

export interface IChargeRepository
  extends ISave<ChargeEntity[]>,
    IFindOneByDebtId<ChargeEntity>,
    IFindAll<ChargeEntity>,
    IUpdate<ChargeEntity> {}
