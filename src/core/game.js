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
    this.tileTypes = []
    for (let i = 0; i < n * n; i++) {
      this.board.push('')
      this.tileTypes.push(0)
    }
    // set a bunch of status flags
    this.dancerGenerated = false
    // keep track of stars positions
    this.stars = []
  }

  /**
   * helpers
   */
  // get a random integer between and includes min and max
  getRandomIntInclusive (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  // using position calculate the index
  // of this pos in this.board
  posToIndex (pos) {
    return pos.row * this.n + pos.col
  }

  // get the position from the index of the board array
  indexToPos (index) {
    let row = Math.floor(index / this.n)
    let col = Math.floor(index % this.n)
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
    // first check if there are enough stars
    if (this.stars.length >= this.k) {
      return false
    }
    let index = this.posToIndex(pos)
    // check if this pos is inside board
    if (!this.insideBoard(pos)) {
      return false
    }
    // check if this tile is not empty
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

  // check if this position is inside board
  insideBoard (pos) {
    return pos.row >= 0 && pos.col >= 0 && this.n > pos.row && this.n > pos.col
  }

  // check if this dancer move is valid
  // dancerMoveValid (posFrom, posTo) {
  //   // check the move is within 1 manhattan distance
  //   if (this.manhattanDistance(posFrom, posTo) > 1) {
  //     return false
  //   }
  //   // check if both positions are inside board
  //   if (!this.insideBoard(posFrom) || !this.insideBoard(posTo)) {
  //     return false
  //   }
  //   // check if there is a dancer at from position
  //   if () {
  //
  //   }
  // }

  /**
   * Setters
   */
  // generate random dancers and place them on the board
  generateDancers () {
    if (!this.dancerGenerated) {
      for (let i = 0; i < this.c; i++) {
        for (let j = 0; j < this.k;) {
          let random = this.getRandomIntInclusive(0, this.n * this.n - 1)
          if (this.board[random] === '') {
            this.board[random] = (i + 1).toString()
            this.tileTypes[random] = 2
            j++
          }
        }
      }
      this.dancerGenerated = true
    }
  }

  placeAStar (pos) {
    let index = this.posToIndex(pos)
    this.board[index] = '#'
    this.stars.push(pos)
  }

  cancelAStar (pos) {
    let index = this.posToIndex(pos)
    if (this.board[index] === '#') {
      this.board[index] = ''
      let iToRemove = -1
      for (let i in this.stars) {
        if (pos.row === this.stars[i].row && pos.col === this.stars[i].col) {
          iToRemove = i
          break
        }
      }
      if (iToRemove > -1) {
        this.stars.splice(iToRemove, 1)
      }
    }
  }

  toggleStar (index) {
    let pos = this.indexToPos(index)
    // check if there is a star here
    if (this.board[index] === '#') {
      // cancel this star
      this.cancelAStar(pos)
      // update tile types
      for (let i in this.tileTypes) {
        if (this.board[i] === '#') {
          this.tileTypes[i] = 1
        } else if (this.okToPlaceAStar(this.indexToPos(i))) {
          this.tileTypes[i] = 0
        } else {
          this.tileTypes[i] = 2
        }
      }
      return -1
    } else if (this.okToPlaceAStar(pos)) {
      // place a star here
      this.placeAStar(pos)
      // update tile types
      for (let i in this.tileTypes) {
        if (this.board[i] === '#') {
          this.tileTypes[i] = 1
        } else if (this.okToPlaceAStar(this.indexToPos(i))) {
          this.tileTypes[i] = 0
        } else {
          this.tileTypes[i] = 2
        }
      }
      return 1
    } else {
      // do nothing
      return 0
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

  // get the tile types
  getTileTypes () {
    return this.tileTypes
  }
}

export default Game
