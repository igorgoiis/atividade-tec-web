<?php 
/*
    Autor: Igor Gois
*/

class Conexao {

    public static $instancia;


    function __construct() {

    }

    public static function getInstance() {
        if (!isset(self::$instancia)) {
            self::$instancia = new Mysqli('localhost', 'user', '', 'controle_financeiro_db');
            
            if (self::$instancia->connect_error) {
                die('Connect Error (' . self::$instancia->connect_errno . ') '. self::$instancia->connect_error);
                echo 'Falha na conexão';
            }

        }

        return self::$instancia;
    }
}

?>