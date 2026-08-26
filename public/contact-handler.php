<?php
/**
 * Contact form handler for walidhasan.com
 *
 * Why this file exists: the Next.js site is a static export (next.config.mjs
 * -> output: 'export'), so there is no Node.js server available on Hostinger
 * to run a Next.js API route. This plain PHP endpoint is the simplest way to
 * make the /contact form (src/views/Contact.tsx) actually deliver messages
 * on standard shared hosting, using PHP's built-in mail() function.
 *
 * BEFORE GOING LIVE, PLEASE CONFIRM (see BLOCKED-USER-INPUT.md):
 *   1. That your Hostinger plan supports PHP and outgoing mail() (most do).
 *   2. That mail sent this way reliably reaches hello@walidhasan.com and
 *      does not land in spam. PHP mail() deliverability varies by host and
 *      is often worse than a transactional email API (Resend, Postmark,
 *      SendGrid, etc.). If deliverability is a problem after testing,
 *      swapping the mail() call below for an HTTP API call is a small,
 *      isolated change.
 *   3. The destination address below (TO_EMAIL) is correct.
 */

$TO_EMAIL = 'hello@walidhasan.com';
$SITE_NAME = 'Walid Hasan';

header('Content-Type: application/json; charset=utf-8');

// Only allow POSTs from the same origin's form submission.
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

function clean($value) {
    $value = trim($value ?? '');
    // Strip characters that could be used for email header injection.
    $value = str_replace(["\r", "\n"], ' ', $value);
    return $value;
}

$name = clean($_POST['name'] ?? '');
$email = clean($_POST['email'] ?? '');
$website = clean($_POST['website'] ?? '');
$service = clean($_POST['service'] ?? '');
$budget = clean($_POST['budget'] ?? '');
$message = trim($_POST['message'] ?? '');

// Basic required-field + email validation.
if ($name === '' || $email === '' || $service === '' || $message === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Missing required fields']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Invalid email address']);
    exit;
}

// Honeypot field (optional client-side addition later): if a hidden field
// named "company_website" is ever added to the form and gets filled in,
// silently drop the submission instead of erroring (bots fill hidden
// fields; real users won't see it).
if (!empty($_POST['company_website'])) {
    echo json_encode(['ok' => true]);
    exit;
}

$subject = "New inquiry from $name via walidhasan.com";

$body = "New contact form submission from walidhasan.com\n\n";
$body .= "Name: $name\n";
$body .= "Email: $email\n";
if ($website !== '') $body .= "Website: $website\n";
$body .= "Service interest: $service\n";
if ($budget !== '') $body .= "Budget range: $budget\n";
$body .= "\nMessage:\n$message\n";

// From address stays on the site's own domain (helps with SPF/DKIM
// alignment); Reply-To is the visitor's email so replying goes to them
// directly.
$headers = [];
$headers[] = "From: $SITE_NAME Website <no-reply@walidhasan.com>";
$headers[] = "Reply-To: $name <$email>";
$headers[] = "Content-Type: text/plain; charset=UTF-8";

$sent = @mail($TO_EMAIL, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => 'Mail could not be sent']);
}
