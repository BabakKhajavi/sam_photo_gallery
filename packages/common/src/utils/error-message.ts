/* eslint-disable @typescript-eslint/no-explicit-any */
export function getErrorMessage(error: any): string {
  let errorMessage = 'Something went wrong: Unknown Reason';
  if (error.message) {
    errorMessage = error.message;
  } else if (
    typeof error === 'object' &&
    error !== null &&
    'response' in error
  ) {
    errorMessage = error.response?.data?.message ?? errorMessage;
  }
  return errorMessage;
}
