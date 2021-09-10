const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
// const fileUpload = require('express-fileupload'); // modülü kullanıma alıyoruz.
const ejs = require('ejs'); // ejs modülünü çağıralımak için
const path = require('path'); //  ilgili html dosyalarına n ulaşmak için path modülünü çağıralıyoruz
const Post = require('./models/Post'); // models klasorun içindeki post dosyası erişmek için 
const app = express();

const postContorolles = require('./contorollers/postContorolles');
const pageController = require('./contorollers/pageController');

//##################Veritabanına bağlanmak için###############
mongoose.connect('mongodb://localhost/cleanblog-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

// ################## template engine ejs #############
/*Template Engine ,EJS modülü template dosyaları görebilmek için
varsayılan olarak views klasörünün içerisindeki .ejs uzantılı dosyalara bakar*/
app.set('view engine', 'ejs');

// ################# middleware #################
app.use(express.static('public')); // Bir express uygulamasında statik dosyaları kullanmak için
//veritaban bağlanırkan bu middleware kullandık
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//method override bağlanmak için 
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

// ##################### router  yönlendermek şlemi ana sayfa gitmesine sağlar ###########

//tüm dosylar index templet yolanması sağlar yani postlar listlenmesi sağlar
app.get('/', postContorolles.getALLPOSTS);
//post üzrende tıklayınca onu özel tek bir sayfa açar ve post templet yönlenmesş sağlar
app.get('/posts/:id', postContorolles.getPOST);
app.get('/about', pageController.getAboutPage);
app.get('/add_post', pageController.getAddPage);
// eğer post üzrende her hangi bir değişmek yapmak istiyorsa edit templet ynlanması sağlar
app.get('/posts/edit/:id', pageController.getEditPage);

//  ####################action yönlendermek için post request #############

//post oluşturmak için
app.post('/posts', postContorolles.createPOST);
// post bilgileri günclemek için
app.put('/posts/:id', postContorolles.updatePOST);
//post bilgileri silmek için
app.delete('/posts/:id', postContorolles.deletePost);

// ########## port numarsı ##############

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
