import { IChargeRepository, IUseCase, Result } from '@/domain/contracts';

export type Charges = {
  id: string;
  name: string;
  email: string;
  governmentId: string;
  debtAmount: number;
  debtDueDate: Date;
  debtId: string;
  paidAt?: Date;
  paidAmount?: number;
  paidBy?: string;
};

export type IListChargeUseCase = IUseCase<null, Result<Charges[]>>;

export class ListChargeUseCase implements IListChargeUseCase {
  constructor(private readonly chargeRepository: IChargeRepository) {}

  async execute(): Promise<Result<Charges[]>> {
    const charges = await this.chargeRepository.findAll();

    const chargeResponse = charges?.map(
      (charge): Charges => ({
        id: charge.id.value,
        name: charge.props.name.value,
        governmentId: charge.props.governmentId.value,
        email: charge.props.email.value,
        debtAmount: charge.props.debtAmount,
        debtDueDate: charge.props.debtDueDate.value,
        debtId: charge.props.debtId,
        paidAmount: charge.props.paidAmount,
        paidAt: charge.props.paidAt?.value,
        paidBy: charge.props.paidBy?.value
      })
    );

    return Result.ok<Charges[]>(chargeResponse);
  }
}
