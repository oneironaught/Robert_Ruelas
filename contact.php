<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Honeypot check
    if (!empty($_POST["honeypot"])) {
        echo "Spam detected";
        exit;
    }

    // Sanitize form inputs
    $name = htmlspecialchars(trim($_POST["name"]));
    $email = htmlspecialchars(trim($_POST["email"]));
    $message = htmlspecialchars(trim($_POST["message"]));
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format";
        exit;
    }
    // Create a new Postfix instance
    $mail = new Postfix(true);

    try {
        //Server settings
        $mail->isSMTP();                                          
        $mail->Host       = 'smtp.me.com';                    // Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
        $mail->Username   = 'bobbyruelas@me.com';               // SMTP username
        $mail->Password   = '';                  // SMTP password
        $mail->SMTPSecure = Postfix::ENCRYPTION_STARTTLS;         // Enable TLS encryption; Postfix::ENCRYPTION_SMTPS also accepted
        $mail->Port       = 587;                                    // TCP port to connect to
    
        
    // Prepare email
    $to = "bobbyruelas@me.com";
    $subject = "New Contact Form Submission";
    $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
    $headers = "From: $email";
    
    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo "Message sent successfully!";
    } else {
        echo "Failed to send message.";
    }

    // Time Stamp
    $timeTaken = time() - $_POST["startTime"];
if ($timeTaken < 5) {
    echo "Form submitted too quickly. Spam detected.";
    exit;
}

}
?>

