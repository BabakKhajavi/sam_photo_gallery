import _ from 'lodash';
/* eslint-disable @typescript-eslint/no-explicit-any */
export function transformToFormData(
  data: any,
  formData: FormData,
  parentKey: string | null = null,
) {
  _.forEach(data, (value, key) => {
    if (value === null) return;

    let formattedKey = _.isEmpty(parentKey) ? key : `${parentKey}[${key}]`;

    if (value instanceof File) {
      formData.set(formattedKey, value);
    } else if (value instanceof Array) {
      if (value.length > 0) {
        _.forEach(value, (ele) => {
          formData.append(`${formattedKey}[]`, ele);
        });
      } else {
        formData.append(`${formattedKey}`, '');
      }
    } else if (value instanceof Object) {
      transformToFormData(value, formData, formattedKey);
    } else {
      formData.set(formattedKey, value);
    }
  });
  return formData;
}
export default transformToFormData;
