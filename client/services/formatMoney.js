import numeral from 'numeral'
export default (number) => numeral(number).format('$0,0.00')
