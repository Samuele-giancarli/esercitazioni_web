<?php
class dbh
{
    public $db;

    public function DBconnect()
    {
        $this->db = new mysqli("localhost", "root", "", "climate", 3306);
        if ($this->db->connect_error) {
            die("Connection failed: " . $this->db->connect_error);
        }
    }

    function getMaxTemp($IDcitta)
    {
        $query = "SELECT max as temp FROM temperature WHERE id_temp = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("i", $IDcitta);
        $result = $stmt->execute();

        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $temp = $row['temp'];

        return $temp;
    }

    function getMinTemp($IDcitta)
    {
        $query = "SELECT min as temp FROM temperature WHERE id_temp = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("i", $IDcitta);
        $stmt->execute();

        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $temp = $row['temp'];

        return $temp;
    }

    function getAllCities()
    {
        $query = "SELECT id_temp, citta FROM temperature";
        $stmt = $this->db->prepare($query);
        $stmt->execute();

        $result = $stmt->get_result();

        $citiesList = array();
        while ($row = $result->fetch_assoc()) {
            $citiesList[] = $row;
        }

        return $citiesList;
    }
}

?>

<html lang="it">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <title>Città Italiane</title>
    <?php
    $dbh = new dbh;
    $dbh->DBconnect();
    ?>
</head>

<body>
    <form action="index.php" method="GET">
        <label for="citta">Città</label>
        <select name="citta">
            <?php
            foreach ($dbh->getAllCities() as $city) {
                echo "<option value=" . $city['id_temp'] . ">" . $city['citta'] . "</option>";
            }
            ?>
        </select>
        <input type="submit" value="Invia" />
    </form>

    <?php
    if (isset($_GET['citta'])) {
        $selectedCityId = $_GET['citta'];
        $maxTemp = $dbh->getMaxTemp($selectedCityId);
        $minTemp = $dbh->getMinTemp($selectedCityId);

        echo "<p>Nome della città: " . $dbh->getAllCities()[$selectedCityId - 1]['citta'] . "</p>";
        echo "<p>Temperatura minima: " . $minTemp . "</p>";
        echo "<p>Temperatura massima: " . $maxTemp . "</p>";
    }
    ?>
</body>

</html>
