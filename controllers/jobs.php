<?php
header('Content-Type: application/json');
include_once __DIR__ . '/../models/job.php';
if($_REQUEST['action'] === 'index'){
  echo json_encode( Jobs::all() );
} elseif ($_REQUEST['action'] === 'create') {
  $request_body = file_get_contents('php://input');
  $body_object = json_decode($request_body);

  $new_job = new Job(null, $body_object->company,
    $body_object->position,
    $body_object->application_link,
    $body_object->resources_link,
    $body_object->contact,
    $body_object->notes,
    $body_object->interest_level,
    $body_object->interviews);
//  print_r($new_job);
  $all_jobs = Jobs::create($new_job);
  echo json_encode($all_jobs);
} else if ($_REQUEST['action'] === 'update') {
  $request_body = file_get_contents('php://input');
  $body_object = json_decode($request_body);
  $updated_job = new Job($_REQUEST['id'], $body_object->company,
    $body_object->position,
    $body_object->application_link,
    $body_object->resources_link,
    $body_object->contact,
    $body_object->notes,
    $body_object->interest_level,
    $body_object->interviews);
  $all_jobs = Jobs::update($updated_job);
  echo json_encode($all_jobs);
} else if ($_REQUEST['action'] === 'delete') {
  $all_jobs = Jobs::delete($_REQUEST['id']);
  echo json_encode($all_jobs);
}
 ?>
