import { shemeValidation } from "./validationSchema.js";



const isValid = (data, type, value) => {
  
  if (data === undefined || data === null) return true;
  switch (type) {
    case "min": return data?.length < value;

    case "max": return data?.length > value;

    case "type": return typeof data !== value;

    case "todoStatus": return !value.includes(data)
      
      
    default:
      return false;
  }

 
}
const checkData = (item, validations) => {
  // validations = shemeValidation

  const isResult = validations.some((valid) => { // { type: 'string',min: 1, max: 100, key : 'text' },
    
  
    const data = item[valid.key];// hello
   
    const validArr = Object.keys(valid) //[type, min, max, key];
    const is = validArr.some((type) => { // type = type, min, max, key
      const isRes = isValid(data, type, valid[type])
      // const isRes = isValid(hello, min, valid[min])
      // const isRes = isValid(hello, min, 1)
      return isRes
    })
    return is;
  })

  return isResult

}

export const validate = (req, res, next) => {
  const keysToValidate = Object.keys(req.body);
  const schemaArr = keysToValidate.map((key) => shemeValidation[key])
  if (schemaArr.includes(undefined)) return res.status(500).json({ data: null, e: 'data is not valid!' });

  const hasErrors = checkData(req.body, schemaArr);
  if (hasErrors) return res.status(500).json({ data: null, e: 'data is not valid!' });
  next();
}
// [shemeValidation.text, shemeValidation.isDone, shemeValidation.status]



