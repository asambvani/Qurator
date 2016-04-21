import numeral from 'numeral'
import configShared from '../../shared/config'

const lowestImagePrice = configShared.options.variants[0].price
const formatPrice = (number) => numeral(number).format('$0,0.00')

export const formattedLowestPrice = formatPrice(lowestImagePrice)
export default formatPrice
