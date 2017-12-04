<!DOCTYPE html>
<html>
<head>
    <?php $base = "../../" ?>
    <base href="../../">
    <script src="js/jquery-2.2.4.min.js"></script>
    <script src="js/facebox.js"></script>
    <script src="js/gameSettings.js"></script>
    <link rel="stylesheet" type="text/css" href="css/facebox.css"/>
    <link rel="stylesheet" type="text/css" href="css/main.css"/>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.css"/>
    <script type="text/javascript">
        jQuery(document).ready(function($) {
            $('a[rel*=facebox]').facebox()
        })
    </script>
</head>
<body>
<div class="container">
    <?php include $base."header.php"; ?>
    <nav>
        <ul>
        <li><a href="">Home</a></li>
        <li><a href="games/empty">Empty Template</a></li>
        </ul>
        <?php include $base."leftMenuGame.php"; ?>
    </nav>
    <article>
        <h1 id="gameName"></h1>
        <h3 id="groupName"></h3>
        <h3>Instruction:</h3>
        <div id="gameDesc" class="jumbotron">
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
        </div>
      	<div id="scoreArea", class="jumbotron">
      	<?php
      	    include $base."getScore.php";
      	    /*
      	    * arg1: gameName, should be the same as the dir name
      	    * arg2: if your score is sortable, pass 1 if higher score is better, 0
      	    *       if smaller score is better. Otherwise no need to pass variable
      	    *
      	    */
      	    getScore("dancing2017", 0);
      	?>
      	</div>
        <h3>Settings</h3>
        <form id="gameSettings" class="well">
        </form>
    </article>
    <?php include $base."footer.php"; ?>
</div>
<script type="text/javascript">
    initInfo("Dancing without the Stars 2017", "by TK", "");
    newWindowBtn(800,800,"./games/dancing2017/index.html", ['sName', 'cName']);
</script>
</body>
</html>
