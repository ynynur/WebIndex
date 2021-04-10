var express = require('express');
var router = express.Router();
var HTMLParser = require('node-html-parser');
var fetch = require('node-fetch');

// router.post('/', function(req, res, next) { //post request 
//     const link = req.body.link;
//     if (link.includes('galeri')) {
//         fetch(link, { method: "GET" })
//             .then(res => res.text()) //requestten dönen responsenin rest.text diyerek textini alıyoruz (html)
//             .then(html => {
//                 var root = HTMLParser.parse(html);
//                 const title = root.querySelector('.rhd-article-title').rawText;
//                 const subtitle = root.querySelector('.rhd-article-spot').rawText;
//                 const mainContentArray = root.querySelectorAll('.description');
//                 let mainContent = [];
//                 mainContentArray.forEach((element) => {
//                     mainContent.push(element.rawText);
//                 });
//                 mainContent = mainContent.join(' ');
//                 let responseData = title + ' ' + subtitle + ' ' + mainContent;
//                 res.status(200).json({ response: responseData, success: true });
//             }).catch((error) => { //hata varsa yakala
//                 res.status(400).json({ response: "error", success: false });
//             });
//     } else if (link.includes('gundem')) {
//         console.log('aaa');
//         fetch(link, { method: "GET" })
//             .then(res => res.text()) //requestten dönen responsenin rest.text diyerek textini alıyoruz (html)
//             .then(html => {
//                 console.log(html);
//                 var root = HTMLParser.parse(html);
//                 const title = root.querySelector('.nd-article__title').rawText;
//                 const subtitle = root.querySelector('.nd-article__spot').rawText;
//                 const mainContentArray = root.querySelectorAll('p');
//                 let mainContent = [];
//                 mainContentArray.forEach((element) => {
//                     mainContent.push(element.rawText);
//                 });
//                 mainContent = mainContent.join(' ');
//                 let responseData = title + ' ' + subtitle + ' ' + mainContent;
//                 res.status(200).json({ response: responseData, success: true });
//             }).catch((error) => { //hata varsa yakala
//                 res.status(400).json({ response: "error", success: false });
//             });
//     } else if (link.includes('sporter')) {
//         fetch(link)
//             .then(res => res.text())
//             .then(html => {
//                 var root = HTMLParser.parse(html);
//                 const a = root.querySelector('.nd-article__spot').rawText;
//                 res.status(200).json({ response: a, success: true });
//             }).catch((error) => { //hata varsa yakala
//                 res.status(400).json({ response: "error", success: false });
//             });
//     } else if (link.includes('ekonomi')) {
//         fetch(link)
//             .then(res => res.text())
//             .then(html => {
//                 var root = HTMLParser.parse(html);
//                 const a = root.querySelector('p , .nd-column .nd-article__spot , .nd-column .nd-article__title').rawText;
//                 console.log(a);
//                 res.status(200).json({ response: a, success: true });
//             }).catch((error) => { //hata varsa yakala
//                 res.status(400).json({ response: "error", success: false });
//             });
//     } else {
//         res.status(200).json({ response: 'unsupported link or website', success: false });
//     }
// });

router.post('/wikipedia', (req, res, next) => {
    const link = req.body.link;
    fetch(link, { method: 'GET' }) // fetch --> http client = http istekleri yapmamızı sağlar
        .then(res => res.text()) //requestten dönen responsenin rest.text diyerek textini alıyoruz (html)
        .then((html) => {
            var root = HTMLParser.parse(html);
            const mainContentArray = root.querySelectorAll('p'); // <p>bla bla</p> <p>bla bla</p>
            let mainContent = [];

            mainContentArray.forEach((element) => { // p taglarini gez ve içeriği mainContent e at
                mainContent.push(element.textContent || element.innerText);
            });

            // success == flag ---> eğer true ise request başarılı bir şekilde cevaplanmıştır.
            res.status(200).json({ response: mainContent.toString(), success: true }); // response
        })
        .catch((error) => { //hata varsa yakala
            console.log(error);
            res.status(400).json({ response: "error", success: false });
        });
});

router.post('/wikipedia-compare', async(req, res, next) => {
    const link1 = req.body.link1;
    const link2 = req.body.link2;

    let response = {
        link1: '',
        link2: '',
    };

    await fetch(link1, { method: 'GET' })
        .then(res => res.text()) //requestten dönen responsenin rest.text diyerek textini alıyoruz (html)
        .then(html => {
            var root = HTMLParser.parse(html);
            const mainContentArray = root.querySelectorAll('p');
            let mainContent = [];
            mainContentArray.forEach((element) => {
                mainContent.push(element.textContent || element.innerText);
            });
            response.link1 = mainContent.toString();
        }).catch((error) => { //hata varsa yakala
            res.status(400).json({ response: "error", success: false });
        });

    await fetch(link2, { method: 'GET' })
        .then(res => res.text()) //requestten dönen responsenin rest.text diyerek textini alıyoruz (html)
        .then(html => {
            var root = HTMLParser.parse(html);
            const mainContentArray = root.querySelectorAll('p');
            let mainContent = [];
            mainContentArray.forEach((element) => {
                mainContent.push(element.textContent || element.innerText);
            });
            response.link2 = mainContent.toString();
        }).catch((error) => { //hata varsa yakala
            res.status(400).json({ response: "error", success: false });
        });

    res.status(200).json({ response: response, success: true });

});

module.exports = router;