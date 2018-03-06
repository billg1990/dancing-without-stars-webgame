// this file is used to save scores to Dr Ecco's website
// for homework use only

function saveScore(spoiler, choreo, level, score) {
  let hardness = ''
  if (level === 0) hardness = 'easy'
  else if (level === 1) hardness = 'intermediate'
  else if (level === 2) hardness = 'hard'
  else hardness = 'hell'
  $.ajax({
    url: '../../dbman/saveScore.php',
    data: {
      gamename: 'dancing2017',
      playername: 'c:' + choreo + ' vs s:' + spoiler + ' (' + hardness + ')',
      score: score
    },
    dataType: 'json',
    type: 'GET',
    success: function(response) {
      console.log('Save score success', response);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log('Save score error', xhr, ajaxOptions, thrownError);
    }
  })
}
