import $ from 'jquery'


export const getJsonObjectFromString = async(input_string) => {
    const meta_data = await $.getJSON(input_string)
    console.log(meta_data)
    return meta_data
  }
  
  export const reduceAddress = async(address) => {
    return address.substring(0, 4) + '..' + address.substring(address.length - 4)
  }

  
  export const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }
  
  export const zeroFillId = (token_id) => {
    const zero_filled = ('0000'+token_id).slice(-3)
    return zero_filled
  }