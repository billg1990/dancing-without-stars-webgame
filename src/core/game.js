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
    // used by choreographer
    this.step = 0
    this.picked = -1 // keep track of which dancer is picked by choreographer
    this.numMoved = 0 // number of dancers that have been moved in the current step
    this.moved = new Map() // keep track of movements (movedTo, movedFrom)
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

  // check if choreographer has reached the goal
  checkChoreographerFinish () {
    // results should contain all the possible lines
    let results = new Map()
    for (let i in this.board) {
      if (this.board[i] !== '' && this.board[i] !== '#') {
        let rsList = this.explore(this.indexToPos(i), new Map())
        for (let j in rsList) {
          let rs = rsList[j]
          if (rs) {
            rs = Array.from(rs)
            rs = rs.sort()
            let key = rs.join()
            results.set(key, rs)
          }
        }
      }
    }
    let lines = []
    results.forEach((v, k, m) => { lines.push(v) })
    return this.checkResultLines(lines, Array.from(this.board))
  }

  // check if some lines in this result set
  // can be all the dancers on this board
  checkResultLines (resultLines, board) {
    if (!board || !resultLines) {
      return false
    }
    if (resultLines.length === 0) {
      // go through the board
      // check if every dancer
      // has been removed
      let noDancer = true
      for (let i in board) {
        if (board[i] !== '' && board[i] !== '#') {
          noDancer = false
          break
        }
      }
      return noDancer
    }
    let cur = resultLines.pop()
    // see what will happen if we delete this line
    let rs = this.checkResultLines(Array.from(resultLines), this.removeLineFromBoard(cur, board))
    if (rs) {
      return true
    }
    // see what will happen if we does not delete this line
    rs = this.checkResultLines(Array.from(resultLines), board)
    if (rs) {
      return true
    }
    // seems like not working
    return false
  }

  // remove a line from a board
  // return a board without that line
  // or null if this line is not on this board at all
  removeLineFromBoard (line, board) {
    let newBoard = Array.from(board)
    for (let i in line) {
      if (newBoard[line[i]] === '' || newBoard[line[i]] === '#') {
        newBoard = null
        break
      } else {
        newBoard[line[i]] = ''
      }
    }
    return newBoard
  }

  // explore from a spot
  // and check from each direction
  // see if there is lines that contain
  // each of each color and all colors
  explore (pos, map) {
    if (this.board[this.posToIndex(pos)] === '' || this.board[this.posToIndex(pos)] === '#') {
      // this is not a dancer
      return []
    } else {
      let dancer = this.board[this.posToIndex(pos)]
      if (map.get(dancer)) {
        return []
      } else {
        // add this one to the map
        let newMap = new Map(map)
        newMap.set(dancer, this.posToIndex(pos))
        if (newMap.size === this.c) {
          let indexes = new Set()
          newMap.forEach((v, k, m) => {
            indexes.add(v)
          })
          return [indexes]
        } else {
          // continue to the next one
          let rsList = []
          // up
          let up = new Position(pos.row - 1, pos.col)
          if (this.insideBoard(up)) {
            // check if up is already in map
            let inPath = false
            map.forEach((v, k, m) => {
              if (v === this.posToIndex(up)) {
                inPath = true
              }
            })
            if (!inPath) {
              let rs = this.explore(up, newMap)
              rsList.push.apply(rsList, rs)
            }
          }
          // down
          let down = new Position(pos.row + 1, pos.col)
          if (this.insideBoard(down)) {
            // check if down is already in map
            let inPath = false
            map.forEach((v, k, m) => {
              if (v === this.posToIndex(down)) {
                inPath = true
              }
            })
            if (!inPath) {
              let rs = this.explore(down, newMap)
              rsList.push.apply(rsList, rs)
            }
          }
          // left
          let left = new Position(pos.row, pos.col - 1)
          if (this.insideBoard(left)) {
            // check if left is already in map
            let inPath = false
            map.forEach((v, k, m) => {
              if (v === this.posToIndex(left)) {
                inPath = true
              }
            })
            if (!inPath) {
              let rs = this.explore(left, newMap)
              rsList.push.apply(rsList, rs)
            }
          }
          // right
          let right = new Position(pos.row, pos.col + 1)
          if (this.insideBoard(right)) {
            // check if right is already in map
            let inPath = false
            map.forEach((v, k, m) => {
              if (v === this.posToIndex(right)) {
                inPath = true
              }
            })
            if (!inPath) {
              let rs = this.explore(right, newMap)
              rsList.push.apply(rsList, rs)
            }
          }
          return rsList
        }
      }
    }
  }

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

  // spoiler finished placing stars
  // should change all color back to default
  donePose () {
    for (let i in this.tileTypes) {
      this.tileTypes[i] = 0
    }
  }

  // start choreographer solving stage
  startSolve () {
    // make all the star into grey (unclickable)
    for (let i in this.tileTypes) {
      if (this.board[i] === '#') {
        this.tileTypes[i] = 2
      }
    }
  }

  // return true if game is finish
  toggleDancer (index) {
    if (this.picked === -1) {
      if (this.board[index] === '' || this.board[index] === '#') {
        // do nothing
      } else if (this.moved.get(index)) {
        // cancel movement
        this.cancelDancerMove(index)
        this.updateDancerTileTypes()
      } else {
        // pick this dancer
        this.picked = index
        this.updateDancerTileTypes()
      }
    } else {
      if (this.board[index] === '#' || this.moved.get(index)) {
        // do nothing
      } else if (!this.insideBoard(this.indexToPos(index))) {
        // do nothing
      } else if (this.manhattanDistance(this.indexToPos(this.picked), this.indexToPos(index)) > 1) {
        // do nothing
      } else {
        // make a move
        // check if it is a swap
        if (this.board[index] === '') {
          // only add index to moved
          this.numMoved += 1
          this.moved.set(index, this.picked)
        } else if (this.picked === index) {
          this.numMoved += 1
          this.moved.set(index, this.picked)
        } else { // swap
          this.numMoved += 2
          this.moved.set(index, this.picked)
          this.moved.set(this.picked, index)
        }
        let tmp = this.board[index]
        this.board[index] = this.board[this.picked]
        this.board[this.picked] = tmp
        this.picked = -1
        this.updateDancerTileTypes()
        if (this.numMoved === this.c * this.k) {
          return this.nextStep()
        }
      }
    }
    return false
  }

  cancelDancerMove (index) {
    // three types
    // if thats a single move, just reverse it
    // if thats a swap then swap back
    // if there is another dancer at moveFrom then reverse that dancer first
    let movedTo = index
    let movedFrom = this.moved.get(movedTo)
    if (this.board[movedFrom] === '' || movedTo === movedFrom) {
      // just reverse it
      this.numMoved -= 1
      this.moved.delete(movedTo)
      let tmp = this.board[movedTo]
      this.board[movedTo] = this.board[movedFrom]
      this.board[movedFrom] = tmp
    } else if (this.moved.get(movedFrom) === movedTo) {
      // swap back
      this.numMoved -= 2
      this.moved.delete(movedTo)
      this.moved.delete(movedFrom)
      let tmp = this.board[movedTo]
      this.board[movedTo] = this.board[movedFrom]
      this.board[movedFrom] = tmp
    } else { // some dancer at movedFrom pos
      this.cancelDancerMove(movedFrom) // recurrsivly
      this.numMoved -= 1
      this.moved.delete(movedTo)
      let tmp = this.board[movedTo]
      this.board[movedTo] = this.board[movedFrom]
      this.board[movedFrom] = tmp
    }
  }

  updateDancerTileTypes () {
    for (let i = 0; i < this.board.length; i++) {
      if (this.picked === -1) {
        // nothing picked
        // moved - yellow
        // stars - grey
        // other - blue
        if (this.moved.has(i)) {
          this.tileTypes[i] = 3
        } else if (this.board[i] === '#') {
          this.tileTypes[i] = 2
        } else {
          this.tileTypes[i] = 0
        }
      } else {
        // picked - green
        // stars - grey
        // moved - grey
        // within move distance - blue
        // other - grey
        if (this.moved.has(i)) {
          this.tileTypes[i] = 2
        } else if (this.board[i] === '#') {
          this.tileTypes[i] = 2
        } else if (this.picked === i) {
          this.tileTypes[i] = 1
        } else if (this.manhattanDistance(this.indexToPos(this.picked), this.indexToPos(i)) === 1) {
          this.tileTypes[i] = 0
        } else {
          this.tileTypes[i] = 2
        }
      }
    }
  }

  gotoNextStep () {
    this.step += 1
    this.numMoved = 0
    this.moved.clear()
    this.updateDancerTileTypes()
  }

  nextStep () {
    this.gotoNextStep()
    return this.checkChoreographerFinish()
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

  getNumStep () {
    return this.step
  }
}

export default Game
