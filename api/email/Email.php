<?php

namespace email;

use PHPMailer\PHPMailer\PHPMailer;
use spk\config\constants;

class Email
{
    /**
     *
     * @param type $displayFrom
     * @param type $to
     * @param type $to2
     * @param type $to3
     * @param type $to4
     * @param type $to5
     * @param type $subject
     * @param type $body
     * @return boolean
     * @throws Exception
     */
    public static function sendEmailPhpMailer($displayFrom, $to, $to2, $to3, $to4, $subject, $body, $from)
    {
        require_once(__DIR__ . '/PHPMailer/Exception.php');
        require_once(__DIR__ . '/PHPMailer/SMTP.php');
        require_once(__DIR__ . '/PHPMailer/PHPMailer.php');
        $mail = new \PHPMailer\PHPMailer\PHPMailer();
        $mail->IsSMTP();

        $mail->CharSet = "UTF-8";
        $mail->Host = EMAIL_REMOTE_SERVER_HOST;
        $mail->Port = EMAIL_REMOTE_SERVER_PORT; //465//587
        $mail->Encoding = 'quoted-printable';
//        $mail->SMTPDebug = 4;
        $mail->SMTPAuth = true;
        $mail->SMTPSecure = 'tls'; // ssl tls ''
        $mail->Username = EMAIL_REMOTE_SERVER_USERNAME;
        $mail->Password = EMAIL_REMOTE_SERVER_PASSWORD;
        $mail->SetFrom($from, $displayFrom);
        $mail->Subject = html_entity_decode($subject);
        //$mail->Subject = $subject;
        $mail->SMTPOptions = [
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            ]
        ];
        //$mail->MsgHTML($body);
        $mail->Body = $body;
        $mail->isHTML(true);

        $mail->AddAddress($to, $displayFrom);
        $mail->AddAddress($to2, $displayFrom);
        $mail->AddAddress($to3, $displayFrom);
        $mail->AddAddress($to4, $displayFrom);
        if (!$mail->Send()) {
            throw new \Exception('No se pudo envíar el correo, pruebas más tarde.');
        } else {
            return true;
        }
    }
}