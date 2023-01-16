import { ChargeEntity } from '@/domain/entities';
import { DateVO, Email, Government, Name, UUID } from '@/domain/value-objects';
import { InvalidPropertyError } from '@/domain/errors';

describe('ChargeEntity', () => {
  it('Should create charge on success', () => {
    const resultOrError = ChargeEntity.create({
      name: 'any_name',
      governmentId: 'any_id',
      email: 'any@mail.com',
      debtAmount: 10.2,
      debtDueDate: '2023-01-16',
      debtId: '0102'
    });

    expect(resultOrError.isRight).toBeTruthy();
    expect(resultOrError.value.getValue()).toEqual(
      expect.objectContaining({
        _createdAt: expect.any(DateVO),
        _updatedAt: expect.any(DateVO),
        _id: expect.any(UUID),
        props: {
          debtAmount: 10.2,
          debtId: '0102',
          governmentId: new Government({ value: 'any_id' }),
          debtDueDate: new DateVO('2023-01-16'),
          email: new Email({ value: 'any@mail.com' }),
          name: new Name({ value: 'any_name' })
        }
      })
    );
  });

  it('Should return InvalidPropertyError "E-mail"', () => {
    const resultOrError = ChargeEntity.create({
      name: 'any_name',
      governmentId: 'any_id',
      email: 'invalid_mail',
      debtAmount: 10.2,
      debtDueDate: '2023-01-16',
      debtId: '0102'
    });

    expect(resultOrError.isRight).toBeTruthy();
    expect(resultOrError.value).toEqual(
      new InvalidPropertyError('Email', 'invalid_mail')
    );
  });

  it('Should return InvalidPropertyError "Name"', () => {
    const resultOrError = ChargeEntity.create({
      name: 'a',
      governmentId: 'any_id',
      email: 'invalid_mail',
      debtAmount: 10.2,
      debtDueDate: '2023-01-16',
      debtId: '0102'
    });

    expect(resultOrError.isRight).toBeTruthy();
    expect(resultOrError.value).toEqual(new InvalidPropertyError('Name', 'a'));
  });
});
