import { IChargeRepository } from '@/domain/contracts';
import { ChargeEntity } from '@/domain/entities';
import { RepositoryError } from '@/infra/error';
import { Context } from '../helpers/context';
import { ChargeModel, ChargeOrmMapper } from '../mappers';

export class SqliteChargeRepository implements IChargeRepository {
  constructor(private readonly ctx: Context) {}

  async save(charges: ChargeEntity[]): Promise<ChargeEntity[]> {
    await Promise.all(
      charges.map(async (charge) => {
        await this.ctx.prisma.charge
          .create({
            data: {
              id: charge.id.value,
              name: charge.props.name.value,
              governmentId: charge.props.governmentId.value,
              debtAmount: charge.props.debtAmount,
              debtDueDate: charge.props.debtDueDate.value,
              debtId: charge.props.debtId,
              email: charge.props.email.value
            }
          })
          .catch((e) => {
            console.log('E: ', e);
            throw new RepositoryError('Failed to save Charge');
          });
      })
    );
    return charges;
  }

  async update(charge: ChargeEntity): Promise<ChargeEntity> {
    await this.ctx.prisma.charge
      .update({
        where: { id: charge.id.value },
        data: {
          paidAmount: charge.props.paidAmount,
          paidAt: charge.props.paidAt?.value,
          paidBy: charge.props.paidBy?.value
        }
      })
      .catch((e) => {
        throw new RepositoryError('Failed to update Charge');
      });

    return charge;
  }

  async findOneByDebtId(id: string): Promise<ChargeEntity | void> {
    const modelCharge = await this.ctx.prisma.charge
      .findFirst({
        where: { debtId: id }
      })
      .catch((e) => {
        throw new RepositoryError('Failed to find Charge');
      });

    if (modelCharge) {
      return ChargeOrmMapper.toEntity(modelCharge as unknown as ChargeModel);
    }
  }

  async findAll(): Promise<ChargeEntity[] | void> {
    const modelCharge = await this.ctx.prisma.charge.findMany().catch((e) => {
      throw new RepositoryError('Failed to find Charge');
    });

    if (modelCharge) {
      return modelCharge.map((charge) => {
        return ChargeOrmMapper.toEntity(charge as unknown as ChargeModel);
      });
    }
  }
}
