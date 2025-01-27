import _ from 'lodash';
function transformToFormData(
  data: any,
  formData: FormData,
  parentKey: string | null = null,
) {
  _.forEach(data, (value, key) => {
    if (value === null) return; // else "null" will be added

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
