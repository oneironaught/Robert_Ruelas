<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Google reCAPTCHA verification
    $recaptchaSecret = '6LcTPvEpAAAAAKHEJgjs1q-ld86B-ZYwGPAn6dz5'; // Add your secret key here
    $recaptchaResponse = $_POST['g-recaptcha-response'];

    $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$recaptchaSecret&response=$recaptchaResponse");
    $responseKeys = json_decode($response, true);

    if(intval($responseKeys["success"]) !== 1) {
        echo "Please complete the CAPTCHA.";
        exit;
    }

    // Input sanitization and validation
    function sanitize_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    $name = sanitize_input($_POST['name']);
    $email = sanitize_input($_POST['email']);
    $subject = sanitize_input($_POST['subject']);
    $message = sanitize_input($_POST['message']);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format.";
        exit;
    }

    // Prevent email header injection
    $patterns = array("/\r/", "/\n/", "/%0A/", "/%0D/");
    $email = preg_replace($patterns, "", $email);
    $subject = preg_replace($patterns, "", $subject);

    $to = "bobbyruelas@gmail.com"; // Replace with your email address
    $headers = "From: " . $email . "\r\n" .
               "Reply-To: " . $email . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    $mailBody = "Name: $name\nEmail: $email\n\nMessage:\n$message";

    if (mail($to, $subject, $mailBody, $headers)) {
        echo "Message sent successfully.";
    } else {
        echo "Failed to send message.";
    }
}
?>
