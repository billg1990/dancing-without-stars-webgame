# dancing-without-stars-webgame

> Human playable dancing without stars web game, for NYU HPS course.

Try out the game here: <http://billg1990.github.io/dancing-without-stars-webgame>

Here is the original game platform I implemented for class competing.
<https://github.com/billg1990/dancing-without-stars>

## How to play

<p>
  On a <strong>N x N</strong> checker board, there are <strong>c</strong> groups of dancers in their initial positions. Each group will have a unique color and each group have <strong>k</strong> dancers.
</p>
<p>
  The choreographer is going to ask the dancers to make moves. The goal of the choreographer is to ensure that there are disjoint, contiguous vertical or horizontal line segments of dancers.
</p>
<p>
  They can be in any order, but one line should contain exactly one dancer of each color. A line can touch another line but they must be disjoint which means they can't share any dancer.
</p>
<p>
  The spoiler is going to place <strong>k</strong> stars on the board before choreographer starts to move, and try make choreographer to spend more steps to reach a final state.
</p>
<p>
  Both players will have <strong>120</strong> seconds as thinking time.
</p>
<p>
  <strong>How to play</strong><br>
  <strong>- click the button down below</strong><br>
  <strong>- enter both players' names</strong><br>
  <strong>- click GO! then spoiler starts to place stars</strong><br>
  <strong>- spoiler can click on yellow tile to cancel a star</strong><br>
  <strong>- spoiler click finish</strong><br>
  <strong>- choreographer click dance! and start to move the dancers</strong><br>
  <strong>- to move a dancer, click a dancer and click the target tile</strong><br>
  <strong>- you can also cancel a dancing move</strong><br>
  <strong>- click a dancer twice to make it stand still</strong><br>
  <strong>- once you moved all the dancers, the game will increment step automatically</strong><br>
  <strong>- once you succeed, the game will end automatically</strong><br>
  <strong>- you can click on restart for another game</strong><br>
</p>

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
## Credits to
Vue.js <https://vuejs.org/>
Element UI <http://element.eleme.io/#/en-US>

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
