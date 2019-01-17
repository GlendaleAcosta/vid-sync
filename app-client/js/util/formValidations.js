export const requiredVal = value => (!value ? 'Required' : undefined)

export const emailVal = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined

export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined


const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined



export const maxLength15 = maxLength(15);
export const minLength3 = minLength(3);

export const minLength2 = minLength(5);
