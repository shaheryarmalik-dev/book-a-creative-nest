<?php
header('Content-Type: application/json');
echo json_encode(['ok' => true, 'time' => gmdate('c')]);
exit;




