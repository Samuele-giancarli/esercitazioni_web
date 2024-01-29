<?php
class dbh{
  public $db; /* ricordarsi public per la variabile $db */
  function connectToDB(){
    $this->db = new mysqli("localhost","root", "", "climate", 3306);
    /* è FONDAMENTALE ricordarsi di riferirsi sempre al db con $this->db nelle funzioni
    COMPRESO quello per connettere il database con mysqli */
  }

  function getCities(){
    $query = "SELECT id_temp, citta FROM temperature"; /*fare attenzione ad usare i nomi corretti delle tabelle!!! */
    $stmt = $this->db->prepare($query); /* this va con il $ quando si riferisce a db. di conseguenza db va senza */
    $stmt->execute(); /*quando eseguo non ho bisogno di una variabile in cui salvare nulla, il risultato viene salvato su stmt */

    $result = $stmt->get_result(); /*infatti poi per prendere il risultato uso stmt->get_result() e si... ora ho bisogno di una variabile per salvare il risultato*/

    $citiesList = array();

    while($row = $result->fetch_assoc()){
      $citiesList[] = $row;
    }

    return $citiesList;

  }

  function setMaxTemp($IDCity, $Tmax){
    //$query = "INSERT ? INTO max WHERE id_temp = ?"; /* query sbagliata */
    //$query = "INSERT INTO temperature (max) VALUES (?) WHERE id_temp = ?"; /*in questo caso devo usare update*/
    
    $query = "UPDATE temperature SET max = ? WHERE id_temp = ?";
    
    $stmt = $this->db->prepare($query);
    $stmt->bind_param("ii", $Tmax, $IDCity);
    $stmt->execute();
  }

  function setMinTemp($IDCity, $Tmin){
    //$query = "INSERT ? INTO min WHERE id_temp = ?";
    $query = "UPDATE temperature SET min = ? WHERE id_temp = ?";
    $stmt = $this->db->prepare($query);
    $stmt->bind_param("ii", $Tmin, $IDCity);
    $stmt->execute();
  }

  /*function isMaxPresent($IDCity){
    $query = "SELECT max FROM temperature WHERE id_temp = ?";
    $stmt = $this->db->prepare($query);
    $stmt->bind_param("i",$IDCity);
    $stmt->execute();

    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    print_r(!is_null($row['max']));
    return !is_null($row['max']);
  }*/
  /*function isMinPresent($IDCity){
    $query = "SELECT min FROM temperature WHERE id_temp = ?";
    $stmt = $this->db->prepare($query);
    $stmt->bind_param("i",$IDCity);
    $result = $stmt->execute();

    $stmt->store_result();
    
    return $stmt->num_rows > 0;
  }*/

}
?>
<html lang="it">
  <?php
    $dbh = new dbh; /*essendo una classe il dbh non ha bisogno delle parentesi, mentre la variabile a cui lo assegno, inq aunto tale ha bisogno del $ */
    $dbh->connectToDB();
  ?>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <title>Città Italiane</title>
  </head>
  <body>
    <form action="index.php" method="GET">
      <label for="citta">Città</label>
      <select name="citta">
        <?php
          foreach($dbh->getCities() as $city){
            echo "<option value='".$city['id_temp']."'>".$city['citta']."</option>";
            /* per fare in modo che il get prenda un valore id e non il nome della citta
            non basta fare così echo "<option>".$city['citta']."</option>"; ma inserire nell'option il suo value */
          }
        ?>
      </select>
      <label for="tMin">Minima</label> <input type="text" size="2" name="tMin"/>
      <label for="tMax">Massima</label> <input type="text" size="2" name="tMax"/><br />
      <input type="submit" value="Invia" />
    </form>

    <?php /*basterà fare un controllo che il get sia stato riempito correttamente */
      if(isset($_GET['tMin']) && isset($_GET['tMax']) && isset($_GET['citta'])){
        $max = $_GET['tMax'];
        $min = $_GET['tMin'];
        $id = $_GET['citta'];
        /*if(!$dbh->isMaxPresent($id)){*/
          $dbh->setMaxTemp($id,$max);
        /*}
        if(!$dbh->isMinPresent($id)){*/
          $dbh->setMinTemp($id,$min);
        /*}*/
      }
    ?>
  </body>
</html>
