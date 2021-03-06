// SPDX-License-Identifier: MPL-2.0
// Copyright (C) 2018 - 2021 Gemeente Amsterdam
/**
 * Converts a query string to an object data structure.
 *
 * The first character of the query string will be stripped (whether it
 * is `?`, `/`, or any other character) before the string is parsed.
 *
 * `decodeURIComponent` will be used to decode the keys and the values.
 *
 * @param {string} queryString The query string including leading `?`.
 * @returns {Object.<string, string>} A key-value map representation of
 * the query string, or null if `queryString` is falsy.
 */
const queryStringParser = (queryString) =>
  queryString
    ? queryString
        .substring(1)
        .split('&')
        .reduce((params, query) => {
          const keyValue = query.split('=')
          const key = keyValue[0]
          keyValue.shift()
          const value = keyValue.join('=')
          return {
            ...params,
            [decodeURIComponent(key)]: decodeURIComponent(value),
          }
        }, {})
    : null

export default queryStringParser
