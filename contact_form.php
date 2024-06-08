<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Google reCAPTCHA Enterprise verification
    $apiKey = 'https://recaptchaenterprise.googleapis.com/v1/projects/my-project-6774-1717554360401/assessments?key=API_KEY'; // Replace with your API key
    $projectID = 'my-project-6774-1717554360401'; // Replace with your project ID
    $recaptchaResponse = $_POST['g-recaptcha-response'];
    $siteKey = '6LcTPvEpAAAAAFpUM_cZh5EWZzAFzYAoA_jW2cMZ'; // Replace with your site key
    $expectedAction = 'USER_ACTION'; // Replace with your expected action

    $url = "https://recaptchaenterprise.googleapis.com/v1/projects/$projectID/assessments?key=$apiKey";
    $data = array(
        'event' => array(
            'token' => $recaptchaResponse,
            'expectedAction' => $expectedAction,
            'siteKey' => $siteKey
        )
    );

    $options = array(
        'http' => array(
            'header'  => "Content-type: application/json\r\n",
            'method'  => 'POST',
            'content' => json_encode($data)
        )
    );

    $context  = stream_context_create($options);
    $response = file_get_contents($url, false, $context);

    if ($response === false) {
        echo "Failed to verify CAPTCHA.";
        exit;
    }

    $responseKeys = json_decode($response, true);

    if (!isset($responseKeys['tokenProperties']['valid']) || !$responseKeys['tokenProperties']['valid']) {
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
