export const loginTemplate = (user) => {
  const time = new Date().toLocaleString();

  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Login Notification</title>
            <style>
            body {
                background-color: #f4f4f7;
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
            }

            .email-wrapper {
                width: 100%;
                background-color: #f4f4f7;
                padding: 20px;
            }

            .email-content {
                max-width: 500px;
                margin: 0 auto;
                background: #ffffff;
                border-radius: 8px;
                padding: 30px;
                box-shadow: 0 2px 6px rgba(0,0,0,0.1);
            }

            h2 {
                color: #333;
                margin-top: 0;
            }

            .info {
                background: #f0f8ff;
                padding: 15px;
                border-radius: 6px;
                margin-top: 20px;
                font-size: 14px;
                color: #444;
            }

            .footer {
                text-align: center;
                margin-top: 25px;
                font-size: 12px;
                color: #888;
            }

            .btn {
                display: inline-block;
                margin-top: 20px;
                padding: 12px 18px;
                background-color: #4a90e2;
                color: white;
                text-decoration: none;
                border-radius: 6px;
                font-size: 14px;
            }
            </style>
        </head>

        <body>
            <div class="email-wrapper">
            <div class="email-content">
                <h2>Welcome, Login Successfully</h2>

                <p>Hello <b>${user.name}</b>,</p>
                <p>Your account was just logged into successfully.</p>

                <div class="info">
                <p><b>Email:</b> ${user.email}</p>
                <p><b>Time:</b> ${time}</p>
                <p><b>From:</b> RL Billing System</p>
                </div>

                <div class="footer">
                © ${new Date().getFullYear()} RL Billing System — All rights reserved.
                </div>
            </div>
            </div>
        </body>
        </html>
    `;
};
