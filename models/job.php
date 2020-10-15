<?php
$dbconn = null;
if(getenv('postgres://kmtfwdxzrdfehd:3d9c7078eded57223b087b050e02b68a599004ebee734599805b3ded875c8a8e@ec2-18-211-86-133.compute-1.amazonaws.com:5432/dehs9nr7f8vfhk
')){ // if using the heroku database
	$connectionConfig = parse_url(getenv('postgres://kmtfwdxzrdfehd:3d9c7078eded57223b087b050e02b68a599004ebee734599805b3ded875c8a8e@ec2-18-211-86-133.compute-1.amazonaws.com:5432/dehs9nr7f8vfhk
'));
	$host = $connectionConfig['host'];
	$user = $connectionConfig['user'];
	$password = $connectionConfig['pass'];
	$port = $connectionConfig['port'];
	$dbname = trim($connectionConfig['path'],'/');
	$dbconn = pg_connect(
		"host=".$host." ".
		"user=".$user." ".
		"password=".$password." ".
		"port=".$port." ".
		"dbname=".$dbname
	);
} else { // if using the local database, change the dbname to be whatever your local database's name is
	$dbconn = pg_connect("host=localhost dbname=jobtracker");
}

 ?>
