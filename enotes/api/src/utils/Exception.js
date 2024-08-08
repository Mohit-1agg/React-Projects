/**
 * The Exception class and the corresponding helper methods
 * for instantiating the exception class are meant to facilitate
 * a standard error paradigm that will facilitate relevant information
 * capture and communication back to the end user in the circumstances
 * where we are dealing with an API request (though even when not
 * handling an API request this should still be the standard).
 *
 * Reserved Error Codes:
 *
 * Codes prefixed with a "S" represent system errors (aka 5xx errors)
 * S00 - system error (generic)
 * S01 - database system error
 * S02 - 3rd party vendor error
 * S03 - internal API request error
 * ...
 * S10 - Reserved space for future growth
 *
 * Codes prefixed with a "U" represent errors caused by the user (aka 4xx errors)
 * U00 - bad request
 * U01 - not authorized
 * U02 - not found
 * ...
 * U10 - Reserved space for future growth
 */

class Exception {
  constructor (errCode, externalMsg) {
    this.errCode = errCode;
    this.externalMsg = externalMsg;
    this.data = null;
    this.srcErr = null;
  }

  /**
   * Associate a particular set of data with the
   * exception.
   *
   * @param {*} data
   * @returns
   */
  setData (data) {
    this.data = data;
    return this;
  }

  /**
   * If we are generating an exception as the result
   * of catching a previous error we want to capture
   * that source error for logging and debugging
   * purposes
   *
   * @param {*} srcErr
   * @returns
   */
  setSrcError (srcErr) {
    this.srcErr = srcErr;
    return this;
  }

  /**
   * Will convert the Exception object
   * into an Error object
   */
  toError () {
    const e = new Error(this.externalMsg);
    e.extMsg = this.externalMsg;
    e.errCode = this.errCode;

    if (this.data != null) {
      e.data = this.data;
    }
    if (this.srcErr != null) {
      e.srcErr = this.srcErr;
    }

    return e;
  }
}

/**
   * Creates a standard Exception object
   * with the provided error code and external
   * message
   *
   * @param {string} errCode the particular error code the should be associated with the exception
   * @param {string} externalMsg a user friendly error message that is safe to display to the end user in the event we are responding to an external request
   * @returns an instance of an Exception object
   */
export const standard = function (errCode, externalMsg) {
  return new Exception(errCode, externalMsg);
};

/**
   * Creates an Exception object to represent
   * a bad user request with the provided external
   * message. The error code will be automatically
   * set to "U00".
   *
   * @param {string} externalMsg a user friendly error message that is safe to display to the end user in the event we are responding to an external request
   * @returns an instance of an Exception object
   */
export const badRequest = function (externalMsg = 'Bad Request') {
  return new Exception('U00', externalMsg);
};

/**
   * Creates an Exception object to represent
   * the situation where a user request is
   * not valid due to them not being authorized
   * to perform the action. The error code will
   * be automatically set to "U01".
   *
   * @param {string} externalMsg a user friendly error message that is safe to display to the end user in the event we are responding to an external request
   * @returns an instance of an Exception object
   */
export const notAuthorized = function (externalMsg = 'Not Authorized') {
  return new Exception('U01', externalMsg);
};

/**
   * Creates an Exception object to represent
   * the situation where a user request is not
   * valid due to the requested item not existing.
   * The error code will be automatically
   * set to "U02".
   *
   * @param {string} externalMsg a user friendly error message that is safe to display to the end user in the event we are responding to an external request
   * @returns an instance of an Exception object
   */
export const notFound = function (externalMsg = 'Not Found') {
  return new Exception('U02', externalMsg);
};

/**
   * Creates an Exception object to represent
   * a general system error with the provided external
   * message. The error code will be automatically
   * set to "S00".
   *
   * @param {string} externalMsg a user friendly error message that is safe to display to the end user in the event we are responding to an external request
   * @returns an instance of an Exception object
   */
export const systemError = function (externalMsg = 'Internal Server Error') {
  return new Exception('S00', externalMsg);
};

/**
   * Creates an Exception object to represent
   * a general database error with the provided external
   * message. The error code will be automatically
   * set to "S01".
   *
   * @param {string} externalMsg a user friendly error message that is safe to display to the end user in the event we are responding to an external request
   * @returns an instance of an Exception object
   */
export const dbError = function (externalMsg = 'Internal Database Error') {
  return new Exception('S01', externalMsg);
};

/**
   * Creates an Exception object to represent
   * a general 3rd party vendor error with the provided external
   * message. The error code will be automatically
   * set to "S02".
   *
   * @param {string} externalMsg a user friendly error message that is safe to display to the end user in the event we are responding to an external request
   * @returns an instance of an Exception object
   */
export const vendorError = function (externalMsg = 'External Vendor Error') {
  return new Exception('S02', externalMsg);
};

/**
   * Creates an Exception object to represent
   * a general internal api request error with the provided external
   * message. The error code will be automatically
   * set to "S03".
   *
   * @param {string} externalMsg a user friendly error message that is safe to display to the end user in the event we are responding to an external request
   * @returns an instance of an Exception object
   */
export const internalAPIError = function (externalMsg = 'Internal API Error') {
  return new Exception('S03', externalMsg);
};

/**
   * Creates an Exception object to represent
   * a previously caught error with the provided
   * error code and external message.
   *
   * This is meant to be a shortcut function
   * in place of doing:
   * Exception.standard(errCode,externalMsg).setSrcError(err);
   *
   * @param {string} externalMsg a user friendly error message that is safe to display to the end user in the event we are responding to an external request
   * @returns an instance of an Exception object
   */
export const wrapError = function (errCode, externalMsg, err) {
  const exception = this.standard(errCode, externalMsg);
  exception.setSrcError(err);
  return exception;
};
