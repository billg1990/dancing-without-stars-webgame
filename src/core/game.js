'use strict'

import Position from './position'

class Game {
  /**
   * n  c  k
   * board size = n * n
   * groups of dancers (num of colors) = c
   * dancers in each group = k
   * max num of stars = k
   * distance between two stars >= c + 1 manhattan distance
   */

  constructor (n, c, k) {
    // set parameters
    this.n = n
    this.c = c
    this.k = k
    // initialize a clean board
    this.board = []
    for (let i = 0; i < n * n; i++) {
      this.board.push('')
    }
    // keep track of stars positions
    this.stars = []
  }

  /**
   * helpers
   */
  // using position calculate the index
  // of this pos in this.board
  posToIndex (pos) {
    return pos.row * this.n + pos.col
  }

  // get the position from the index of the board array
  indexToPos (index) {
    let row = index / this.n
    let col = index % this.n
    return new Position(row, col)
  }

  // get the manhattan distance between
  // two positions
  manhattanDistance (pos1, pos2) {
    return Math.abs(pos1.row - pos2.row) + Math.abs(pos1.col - pos2.col)
  }

  // check if it is ok to place
  // a star at this location
  okToPlaceAStar (pos) {
    let index = this.posToIndex(pos)
    // if this tile is not empty
    if (this.board[index] !== '') {
      return false
    }
    let ok = true
    for (let i = 0; i < this.stars.length; i++) {
      if (this.manhattanDistance(this.stars[i], pos) < this.c + 1) {
        ok = false
        break
      }
    }
    return ok
  }

  /**
   * Setters
   */
  placeAStar (pos) {
    let index = this.posToIndex(pos)
    this.board[index] = '#'
    this.stars.push(pos)
  }

  cancelAStar (pos) {
    let index = this.posToIndex(pos)
    if (this.board[index] === '#') {
      this.board[index] = ''
      let iToRemove = this.stars.indexOf(pos)
      if (iToRemove > -1) {
        this.stars.splice(iToRemove, 1)
      }
    }
  }

  /**
   * Getters
   */
  // return the board representation
  // as a string array
  getBoard () {
    return this.board
  }
}

export default Game
