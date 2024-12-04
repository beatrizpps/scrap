const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendEmail(items) {
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  
  let emailBody = '<h1 style="text-align: center;">Livros em Destaque</h1>';
  emailBody += '<ul style="list-style-type: none; padding: 0; margin: 0;">';

  emailBody += `
  <table style="width: 100%; border-collapse: collapse; text-align: center;">
    <tbody>
      ${items.map((item, index) => {
      
        const isNewRow = index % 3 === 0;
        const isLastInRow = (index + 1) % 3 === 0 || index === items.length - 1;
        
        return `
          ${isNewRow ? '<tr>' : ''}
          <td style="
            padding: 15px; 
            border: 1px solid #333; 
            background: linear-gradient(145deg, #000000, #1a1a1a); 
            border-radius: 10px; 
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.4); 
            color: #fff;">
            
            <h2 style="
              margin: 0 0 10px 0; 
              font-size: 1.5em; 
              color: #fff; 
              font-family: 'Arial', sans-serif;">
              ${item.bookName}
            </h2>
            
            <p style="
              font-weight: bold; 
              color: #ccc; 
              margin: 10px 0; 
              font-size: 1.2em;">
              Tag: <span style="color: #e63946;">${item.tag}</span>
            </p>
            
            <p style="
              margin: 10px 0; 
              color: #ccc; 
              font-size: 1.1em;">
              Preço de: <span style="text-decoration: line-through; color: #999;">${item.priceFrom}</span><br>
              Preço por: <span style="color: #e63946; font-weight: bold;">${item.priceTo}</span>
            </p>
            
            <a href="${item.link}" style="
              display: inline-block; 
              text-decoration: none; 
              color: white; 
              background: linear-gradient(145deg, #e63946, #b71c1c); 
              padding: 10px 20px; 
              border-radius: 8px; 
              font-family: 'Arial', sans-serif; 
              font-size: 0.9em; 
              margin-top: 15px; 
              transition: background 0.3s;">
              Ver no site
            </a>
            
            <div style="
              margin-top: 20px;">
              <img src="${item.imageUrl}" alt="${item.bookName}" style="
                max-width: 100%; 
                height: auto; 
                border-radius: 10px; 
                box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);">
            </div>
          </td>
          ${isLastInRow ? '</tr>' : ''}
        `;
      }).join('')}
    </tbody>
  </table>
`;

  
  emailBody += '</ul>';

  
  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL_RECIPIENT,
    subject: 'Livros em Destaque',
    html: emailBody,
  };

  
  try {
    await transporter.sendMail(mailOptions);
    console.log('E-mail enviado.');
    return true;
  } catch (error) {
    console.error('Erro ao enviar:', error);
    return false;
  }
}

module.exports = sendEmail;
