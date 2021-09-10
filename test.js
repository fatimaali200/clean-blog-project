//mongoose modülünü ve ve mongoose modülüne ait Schema class ını çağıralım.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Veritabanına bağlanmak için
mongoose.connect('mongodb://localhost/cleanblog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

//uygulamamızda Photo verisini kullanacağız ve bu verimize ait olan isim ve tanım özelliği olmasını istiyoruz.
const PostSchema = new Schema({
  title: String,
  description: String,
});
//model metodu sayesinde Schema ve 'Photo' stringini kullanarak yeni bir model oluşturalım.
const Post = mongoose.model('Post', PostSchema);

// ilk dökümanımızı oluşturmaya.
Post.create({
  title: 'Post Title 1',
  description: 'Post description 1 lorem ipsum',
});

/*
//read a photo
Photo.find({}, (err, data) => {
    console.log(data);
  });
*/


