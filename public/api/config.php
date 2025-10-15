<?php
// Basic configuration for PHP endpoints running on shared hosting
// Fill these with your real values or set them via environment variables in cPanel

// Stripe secret key (sk_test_... or sk_live_...)
$STRIPE_SECRET_KEY = getenv('STRIPE_SECRET_KEY') ?: '';

// Success and cancel URLs used by Stripe Checkout
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : (isset($_SERVER['HTTP_HOST']) ? (isset($_SERVER['REQUEST_SCHEME']) ? $_SERVER['REQUEST_SCHEME'] : 'https') . '://' . $_SERVER['HTTP_HOST'] : '');
$SUCCESS_URL = getenv('SUCCESS_URL') ?: ($origin . '/booking/success?session_id={CHECKOUT_SESSION_ID}');
$CANCEL_URL  = getenv('CANCEL_URL')  ?: ($origin . '/booking/cancel');

// Utility: send JSON response and exit
function json_response($data, int $status = 200): void {
  header('Content-Type: application/json');
  http_response_code($status);
  echo json_encode($data);
  exit;
}

// CORS for simple usage from the SPA
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}


