import * as Yup from 'yup'

export const defaultAmountSchema = (stateName: string) => {
  return Yup.object().shape({
    [stateName]: Yup.number()
      .moreThan(99, 'Allowed to withdraw a minimum of 100 coins')
      .lessThan(100001, 'Allowed to withdraw a maximum of 100000 coins')
      .required('Enter the amount in order to withdraw it')
  })
}
