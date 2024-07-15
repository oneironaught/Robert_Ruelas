('Slider function does not throw error with multiple images', () => {
  // Arrange
  const sliderImages = [
    document.createElement('img'),
    document.createElement('img'),
    document.createElement('img'),
  ];

  // Act
  slider();

  // Assert
  expect(sliderImages[0].style.opacity).toBe('1');
  expect(sliderImages[1].style.opacity).toBe('0');
  expect(sliderImages[2].style.opacity).toBe('0');
});

const { RecaptchaEnterpriseServiceClient } = require('@google-cloud/recaptcha-enterprise');

/**
 * Create an assessment to analyze the risk of a UI action.
 *
 * @param {6774-1717554360401} projectID   - Your Google Cloud Project ID.
 * @param {6LcTPvEpAAAAAFpUM_cZh5EWZzAFzYAoA_jW2cMZ} recaptchaKey - The reCAPTCHA key associated with the site/app.
 * @param {eyJhbGciOiJSUzI1NiIsImtpZCI6IjBlMzQ1ZmQ3ZTRhOTcyNzFkZmZhOTkxZjVhODkzY2QxNmI4ZTA4MjciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzMjU1NTk0MDU1OS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjMyNTU1OTQwNTU5LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE3NTMwODU5OTIyNzI3Mzk5NTM0IiwiZW1haWwiOiJib2JieXJ1ZWxhc0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IjAtSGNKRExaeDUySmRidERYVzl2a2ciLCJpYXQiOjE3MjEwMTIzMTQsImV4cCI6MTcyMTAxNTkxNH0.gk3hy6YocO23OyQFDoeA40K2FOBI5MFals1uDcy3DK2352bgL3Wx38NmM3TCeRg9EPJeSG1sqiQ1tp4gsfiQEEdsDbzs8-F4p3KZuDY87E4WCiqyPpegWSsReIVIyp0uwbe2Mpg2u_cxPlNFpbL2rb7d5VCGBmIiX3f3A-mt6I65tMW2WlPQn5HKH-13P7Pa0L2klrcCUZBJzbRzD8aPf76DFuO1acvTCwSRgRvqsBKPjgezrKVeZbHSbieDC8TdI7iIQkUVvSjmRtdLw2m7MUmBRv0nm_sr3nIFUXlvnINhZuuQ8lbFoII4HP9ZPvevlrmzUnwh709eaEXB7hJjGw} token - The generated token obtained from the client.
 * @param {string} recaptchaAction - Action name corresponding to the token.
 * @returns {Promise<number|null>} The reCAPTCHA score or null if invalid.
 */
async function createAssessment({
  projectID = "my-project-6774-1717554360401",
  recaptchaKey = "6LcTPvEpAAAAAFpUM_cZh5EWZzAFzYAoA_jW2cMZ",
  token = "action-token",
  recaptchaAction = "action-name",
}) {
  try {
    // Create the reCAPTCHA client.
    const client = new RecaptchaEnterpriseServiceClient();
    const projectPath = client.projectPath(projectID);

    // Build the assessment request.
    const request = {
      assessment: {
        event: {
          token: token,
          siteKey: recaptchaKey,
        },
      },
      parent: projectPath,
    };

    const [response] = await client.createAssessment(request);

    // Check if the token is valid.
    if (!response.tokenProperties.valid) {
      console.error(`The CreateAssessment call failed because the token was: ${response.tokenProperties.invalidReason}`);
      return null;
    }

    // Check if the expected action was executed.
    if (response.tokenProperties.action === recaptchaAction) {
      // Get the risk score and the reason(s).
      console.log(`The reCAPTCHA score is: ${response.riskAnalysis.score}`);
      response.riskAnalysis.reasons.forEach((reason) => {
        console.log(reason);
      });

      return response.riskAnalysis.score;
    } else {
      console.error("The action attribute in your reCAPTCHA tag does not match the action you are expecting to score.");
      return null;
    }
  } catch (error) {
    console.error(`Error in createAssessment: ${error.message}`);
    return null;
  }
}

// Example usage of the function
createAssessment({
  projectID: "my-project-6774-1717554360401",
  recaptchaKey: "6LcTPvEpAAAAAFpUM_cZh5EWZzAFzYAoA_jW2cMZ",
  token: "action-token",
  recaptchaAction: "action-name",
}).then(score => {
  if (score !== null) {
    console.log(`Assessment score: ${score}`);
  } else {
    console.log("Assessment failed.");
  }
});

  