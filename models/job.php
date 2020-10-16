<?php
//for heroku configuration use command heroku pg:psql postgresql-clean-34666 --app jobtrack-app to connect in terminal
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

$dbconn = pg_connect("host=localhost dbname=jobtracker");
class Job {
    public $id;
    public $company;
    public $position;
		public $application_link;
		public $resources_link;
		public $contact;
		public $notes;
		public $interest_level;
		public $interviews;
    public function __construct($id, $company, $position, $application_link, $resources_link, $contact, $notes, $interest_level, $interviews){
        $this->id = $id;
        $this->company = $company;
        $this->position = $position;
				$this->application_link = $application_link;
				$this->resources_link = $resources_link;
				$this->contact = $contact;
				$this->notes = $notes;
				$this->interest_level = $interest_level;
				$this->interviews = $interviews;
    }
}
class Jobs {
    static function delete($id){
      $query = "DELETE FROM jobs WHERE id = $1";
      $query_params = array($id);
      pg_query_params($query, $query_params);
      return self::all();
    }
    static function update($updated_job) {
      $query = "UPDATE jobs SET company = $1, position = $2, application_link = $3, resources_link = $4, contact = $5, notes = $6, interest_level = $7, interviews = $8 WHERE id = $9";
      $query_params = array($updated_job->company, $updated_job->position, $updated_job->application_link, $updated_job->resources_link, $updated_job->contact, $updated_job->notes, $updated_job->interest_level, $updated_job->interviews, $updated_job->id);
      pg_query_params($query, $query_params);
      return self::all();
    }
    static function create($job){
      $query = "INSERT INTO jobs (company, position, application_link, resources_link, contact, notes, interest_level, interviews) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
      $query_params = array($job->company, $job->position, $job->application_link, $job->resources_link, $job->contact, $job->notes, $job->interest_level, $job->interviews);
      pg_query_params($query, $query_params); //pass the query and the params to pg_query_params
      return self::all();
    }

    static function all(){
        $jobs = array();
        $results = pg_query("SELECT * FROM jobs ORDER BY id ASC");
        $row_object = pg_fetch_object($results);
        while($row_object !== false){
            $new_job = new Job(
                intval($row_object->id),
                $row_object->company,
                $row_object->position,
								$row_object->application_link,
								$row_object->resources_link,
								$row_object->contact,
								$row_object->notes,
								$row_object->interest_level,
								$row_object->interviews
            );
            $jobs[] = $new_job;
            $row_object = pg_fetch_object($results);
        }
        return $jobs;
    }
 ?>
