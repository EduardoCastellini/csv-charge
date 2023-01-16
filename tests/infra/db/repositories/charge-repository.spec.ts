import {
  makeFakeChargeEntity,
  makeFakeChargeEntityPay
} from '@/../tests/domain/mocks';
import {
  MockContext,
  Context,
  createMockContext
} from '@/infra/db/helpers/context';
import { Prisma } from '@prisma/client';
import { SqliteChargeRepository } from '@/infra/db/repositories/charge.repository';
import { RepositoryError } from '@/infra/error';

describe('SqliteChargeRepository', () => {
  let mockCtx: MockContext;
  let ctx: Context;

  beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
  });

  describe('save', () => {
    it('should call prisma.charge.create with correct params', async () => {
      const charge = makeFakeChargeEntity();
      const model = {
        id: charge.id.value,
        name: charge.props.name.value,
        governmentId: charge.props.governmentId.value,
        debtAmount: charge.props.debtAmount,
        debtDueDate: charge.props.debtDueDate.value,
        debtId: charge.props.debtId,
        email: charge.props.email.value
      };

      mockCtx.prisma.charge.create.mockResolvedValueOnce({
        ...model,
        debtAmount: new Prisma.Decimal(model.debtAmount),
        paidAt: null,
        paidAmount: null,
        paidBy: null
      });

      const sut = new SqliteChargeRepository(ctx);

      await sut.save([charge]);

      expect(ctx.prisma.charge.create).toHaveBeenCalledWith({
        data: model
      });
    });

    it('should return error call prisma.charge.create ', async () => {
      const charge = makeFakeChargeEntity();

      mockCtx.prisma.charge.create.mockRejectedValue(new Error());

      const sut = new SqliteChargeRepository(ctx);

      try {
        await sut.save([charge]);
      } catch (error) {
        expect(error).toEqual(new RepositoryError('Failed to save Charge'));
      }
    });
  });

  describe('update', () => {
    it('should call prisma.charge.update with correct params', async () => {
      const charge = makeFakeChargeEntityPay();
      const model = {
        id: charge.id.value,
        name: charge.props.name.value,
        governmentId: charge.props.governmentId.value,
        debtAmount: charge.props.debtAmount,
        debtDueDate: charge.props.debtDueDate.value,
        debtId: charge.props.debtId,
        email: charge.props.email.value
      };

      mockCtx.prisma.charge.update.mockResolvedValueOnce({
        ...model,
        debtAmount: new Prisma.Decimal(model.debtAmount),
        paidAt: new Date('2022-10-12'),
        paidAmount: new Prisma.Decimal(100.25),
        paidBy: 'any_name'
      });

      const sut = new SqliteChargeRepository(ctx);

      await sut.update(charge);

      expect(ctx.prisma.charge.update).toHaveBeenCalledWith({
        where: { id: charge.id.value },
        data: {
          paidAmount: charge.props.paidAmount,
          paidAt: charge.props.paidAt?.value,
          paidBy: charge.props.paidBy?.value
        }
      });
    });

    it('should return error call prisma.charge.update ', async () => {
      const charge = makeFakeChargeEntity();

      mockCtx.prisma.charge.update.mockRejectedValue(new Error());

      const sut = new SqliteChargeRepository(ctx);

      try {
        await sut.update(charge);
      } catch (error) {
        expect(error).toEqual(new RepositoryError('Failed to update Charge'));
      }
    });
  });
});
