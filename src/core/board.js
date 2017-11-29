'use strict'

/**
 * Generate an empty board based on size x size
 * return as an array of strings
 */
exports.generateCleanBoard = (size) => {
  let board = []
  for (let i = 0; i < size * size; i++) {
    board.push('')
  }
  return board
}
