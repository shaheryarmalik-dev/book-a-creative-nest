<?php
require_once __DIR__ . '/config.php';

// Very simple booking submission -> email notification
// Note: Replace the destination email with your address.
$to = 'framescoutlocations@gmail.com';

// Accept JSON or form-encoded
$raw = file_get_contents('php://input');
$data = [];
if ($raw) {
  $json = json_decode($raw, true);
  if (is_array($json)) { $data = $json; }
}
if (empty($data)) {
  $data = $_POST;
}

$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$phone = trim($data['phone'] ?? '');
$date = trim($data['date'] ?? '');
$startTime = trim($data['startTime'] ?? '');
$hours = trim($data['hours'] ?? '');
$notes = trim($data['notes'] ?? '');

if ($name === '' || $email === '' || $date === '' || $startTime === '' || $hours === '') {
  json_response(['error' => 'Missing required fields'], 400);
}

$subject = 'New Booking Request';
$body = "Name: $name\nEmail: $email\nPhone: $phone\nDate: $date\nStart: $startTime\nHours: $hours\n\nNotes:\n$notes\n";

// Basic headers
$headers   = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/plain; charset=utf-8';
$headers[] = 'From: '.$name.' <'.$email.'>';
$headers[] = 'Reply-To: '.$email;

@mail($to, $subject, $body, implode("\r\n", $headers));

json_response(['ok' => true]);




