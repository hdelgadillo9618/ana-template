<?php
const RECAPTCHA_SECRET = '6LefKK0qAAAAAOA4q6EBV9LuJdiJCyfvoVnQoBkC';
const EMAIL_REMOTE_SERVER_USERNAME = '82cd3a001@smtp-brevo.com';
const EMAIL_REMOTE_SERVER_PASSWORD = 'ADjGOydz7XkfETn2';
const EMAIL_REMOTE_SERVER_HOST = 'smtp-relay.brevo.com';
const EMAIL_REMOTE_SERVER_PORT = 587;
const MAIL_FROM = 'info@ana.care';
const MAIL_TO = 'info@ana.care';
const MAIL_TO1 = 'juliana@ana.care';
const MAIL_TO2 = 'manuel@ana.care';
const MAIL_TO3 = 'ariel@ana.care';


const MAIL_DISPLAY_FROM = 'ANAcare';
const MAIL_SUBJECT = 'ANAcare - New Email Contact';

header("Content-type: application/json");
$result = [
    'nodes' => [],
    'msg' => '',
    'status' => false,
];

$name = filter_input(INPUT_POST, "contactName", FILTER_SANITIZE_SPECIAL_CHARS);
$email = filter_input(INPUT_POST, "contactEmail", FILTER_VALIDATE_EMAIL);
$phone = filter_input(INPUT_POST, "contactPhone", FILTER_SANITIZE_SPECIAL_CHARS);
$country = filter_input(INPUT_POST, "contactCountry", FILTER_SANITIZE_SPECIAL_CHARS);
$iam = filter_input(INPUT_POST, "contactIam", FILTER_SANITIZE_SPECIAL_CHARS);
$msj = filter_input(INPUT_POST, "contactMsj", FILTER_SANITIZE_SPECIAL_CHARS);
$recaptchaResp = filter_input(INPUT_POST, 'recaptcha', FILTER_SANITIZE_SPECIAL_CHARS);
$ip = $_SERVER['REMOTE_ADDR'];

if (RECAPTCHA_SECRET !== null) {
    if (!$recaptchaResp) {
        $result["msg"] = "Must validate recaptcha.";

        echo json_encode($result);
        die();
    } else {
        $response = file_get_contents(
            "https://www.google.com/recaptcha/api/siteverify?secret=" . RECAPTCHA_SECRET . "&response=" . $recaptchaResp . "&remoteip=" . $_SERVER['REMOTE_ADDR']
        );
        $response = json_decode($response);
        if (!$response->success) {
            $this->result["msg"] = "Error recaptcha.";
            echo json_encode($result);
            die();
        }
    }
}

if (!$name) {
    $result['nodes'][] = '.contactName';
}
if (!$email) {
    $result['nodes'][] = '.contactEmail';
}
if (!$phone) {
    $result['nodes'][] = '.contactPhone';
}
if (!$country) {
    $result['nodes'][] = '.contactCountry';
}
if (!$iam) {
    $result['nodes'][] = '.contactIam';
}
if (!$msj) {
    $result['nodes'][] = '.contactMsj';
}

if (!empty($result['nodes'])) {
    http_response_code(400);
    $result['msg'] = 'Required fields must be completed.';
} else {
    require_once(__DIR__ . '/email/Email.php');
    $body = file_get_contents(__DIR__ . '/email/email.tpl');
    $body = str_replace(["{name}", "{email}", "{phone}", "{country}", "{iam}", "{msj}"],
        [$name, $email, $phone, $country, $iam, $msj], $body);
    \email\Email::sendEmailPhpMailer(MAIL_DISPLAY_FROM, MAIL_TO, MAIL_TO1, MAIL_TO2, MAIL_TO3, MAIL_SUBJECT, $body, MAIL_FROM);
    http_response_code(200);
    $result['msg'] = 'The information has been sent.';
    $result['status'] = true;
}

echo json_encode($result);