import { IChargeRepository } from '@/domain/contracts';
import { ChargeEntity } from '@/domain/entities';
import { Context } from '../helpers/context';

export class SqliteChargeRepository implements IChargeRepository {
  constructor(private readonly ctx: Context) {}

  async save(charges: ChargeEntity[]): Promise<ChargeEntity[]> {
    await Promise.all(
      charges.map(async (charge) => {
        await this.ctx.prisma.charge.create({
          data: {
            id: charge.id.value,
            name: charge.props.name.value,
            governmentId: 121212121,
            debtAmount: 100.1,
            debtDueDate: new Date(),
            debtId: 8292,
            email: charge.props.email.value
          }
        });
      })
    );
    return charges;
  }

  async update(charges: ChargeEntity): Promise<ChargeEntity> {
    console.log('update charges: ', charges);

    return charges;
  }
}
