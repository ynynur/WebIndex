## WebIndex
Web indexleme projesinin temel amacı verilen bir URL’deki web sayfa içeriğine göre diğer birden fazla web sayfasını benzerlik bakımından indeksleyip sıralayan web tabanlı bir uygulama geliştirmektir. 
Proje sayesinde web indeksleme yöntemleri hakkında bilgi edinilmesini ve web tabanlı uygulama yazma becerisinin geliştirilmesi amaçlanmaktadır. Bu proje IntelliJIDEA üzerinde geliştirilmiştir.

Arama motorlarına baktığımız da bir arama alanı vardır ve bu alana bir anahtar kelime girildikten sonra bu anahtar kelimenin varolan içeriklerle anlamsal ilişkisine göre en yakın içeriğe sahip web siteleri listelenir.
Projede anahtar kelime yerine bir URL girilmesi ve referans gösterilen URL üzerinden bir takım işlemler gerçekleştirilmesi amaçlanmıştır.

Projede ki isterler doğrultusunda backend ve frontend uygulamaları geliştirildi.
- Frontend http://web.ucazuga.com 
- Backend  http://nur.ucazuga.com 

###  Backend
Web indexleme projesinde,
Backend tarafında; (http://localhost:3000)
- Dil olarak **JavaScript** kullanıldı. (**NodeJS runtime**)
- Uygulamanın ana fonksiyonu, endpointlere gelen isteklere cevap vermek. (Web API)
- **Rest API** standartlarını takip ederek **Express** frameworkü ile geliştirildi. 

### Frontend
Frontend tarafında; (http://localhost:4200)
- Dil olarak **TypeScript** kullanıldı. 
Uygulamanın ana fonksiyonu, UI işlemleri ve backend servislerinden veri alıp/vermek. (endpointlere istek yaparak bir response elde eder) 
- **Angular Framework’ü** ile geliştirildi.
