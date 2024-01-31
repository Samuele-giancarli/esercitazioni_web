<?php
// Verifica se il form è stato inviato
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verifica se il checkbox "Remember me" è selezionato
    if (isset($_POST['remember'])) {
        // Recupera e sanitizza il valore dell'username
        $username = htmlspecialchars($_POST['username']);

        // Recupera la categoria selezionata
        $categoria = "";
        if (isset($_POST['notizie'])) {
            $categoria = htmlspecialchars($_POST['notizie']);
        }

        // Imposta i cookies con una durata di 60 minuti
        setcookie("username", $username, time() + 3600);
        setcookie("categoria", $categoria, time() + 3600);
    }
}

// Recupera i valori dei cookies, se presenti
$usernameValue = isset($_COOKIE['username']) ? htmlspecialchars($_COOKIE['username']) : "";
$categoriaValue = isset($_COOKIE['categoria']) ? htmlspecialchars($_COOKIE['categoria']) : "";
?>

<html lang="it">
<head>
    <title>Esercizio PHP</title>
</head>
<body>
<div class="header">
    <a class="home">Esercizio PHP</a>
    <div class="products">
        <a href="index.php">Homepage</a>
        <a href="settings.php">Settings</a>
    </div>
</div>

<form action="settings.php" method="post" style="border: 2px dotted blue; text-align:center; width: 400px;">
    <p>
        <label for="username">Username </label><input name="username" type="text" value="<?php echo $usernameValue; ?>">
    </p>
    <p>
        <label for="notizie">Categoria notizie:</label>
        <select name="notizie">
            <option value="">--------</option>
            <option value="politica" <?php if ($categoriaValue == "politica") echo "selected"; ?>>Politica</option>
            <option value="attualità" <?php if ($categoriaValue == "attualità") echo "selected"; ?>>Attualità</option>
            <option value="sport" <?php if ($categoriaValue == "sport") echo "selected"; ?>>Sport</option>
            <option value="scienze" <?php if ($categoriaValue == "scienze") echo "selected"; ?>>Scienze</option>
        </select>
    </p>
    <p>
        <input type="checkbox" name="remember" <?php if ($usernameValue != "" && $categoriaValue != "") echo "checked"; ?> /> Remember me
    </p>
    <p>
        <input type="submit" value="submit">
    </p>
</form>

</body>
</html>
