const axios = require('axios');
const cheerio = require('cheerio');
const sendEmail = require('./SendEmail'); 


const url = 'https://foradoplastico.com.br/links-em-destaques/';

async function fetchData() {
  try {
    console.log('Iniciando o scraping...'); 
    
    const { data } = await axios.get(url);
    console.log('Requisição feita com sucesso.');

    const $ = cheerio.load(data);
    const items = [];

    // Seleciona os elementos de interesse
    $('div._item').each((index, element) => {
      const link = $(element).find('a').attr('href');
      const tag = $(element).find('.tag').text();
      const bookName = $(element).find('a').text().trim();
      const priceFrom = $(element).find('.from').text();
      const priceTo = $(element).find('.to').text();
      const imageUrl = $(element).find('img').attr('src'); 

      items.push({
        bookName,
        link,
        tag,
        priceFrom,
        priceTo,
        imageUrl, 
      });
    });

    console.log('Dados coletados com sucesso:', items);

   
    const emailSent = await sendEmail(items); 
    if (emailSent) {
      console.log('E-mail enviado.');
    } else {
      console.log('Falha ao enviar.');
    }
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
}

fetchData();
