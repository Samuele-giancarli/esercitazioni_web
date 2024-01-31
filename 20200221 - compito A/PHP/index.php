<?php
// Connessione al database (assumendo che il tuo database sia chiamato 'nome_database')
$servername = "localhost";
$username = "nome_utente";
$password = "password";
$dbname = "nome_database";

$conn = new mysqli("localhost", "root", "", "febbraio", 3306);

// Verifica della connessione
if ($conn->connect_error) {
    die("Connessione al database fallita: " . $conn->connect_error);
}

// Recupera la categoria dai cookies, se presente
$categoriaUtente = isset($_COOKIE['categoria']) ? $_COOKIE['categoria'] : "";

// Costruisci la query per recuperare gli articoli in base alla categoria
if (!empty($categoriaUtente)) {
    $query = "SELECT * FROM articoli WHERE categoria = '$categoriaUtente'";
} else {
    // Se non c'è una categoria specificata, recupera tutti gli articoli
    $query = "SELECT * FROM articoli";
}

$result = $conn->query($query);

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

<article>
    <?php
    // Visualizza gli articoli
    while ($row = $result->fetch_assoc()) {
        echo '<div>';
        echo '<h1>' . $row['titolo'] . '</h1>';
        echo '<p>' . $row['descrizione'] . '</p>';
        echo '</div>';
    }

    // Chiudi la connessione al database
    $conn->close();
    ?>
</article>

</body>
</html>
