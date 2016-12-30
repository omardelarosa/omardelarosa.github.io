// Define Static Page Routes

module.exports = [
  {
    path: '/index.html',
    title: 'the website of omar delarosa',
    template: 'index.pug'
  },
  {
    path: '/pages/bio.html',
    title: 'bio',
    template: 'bio.pug'
  },
  {
    path: '/pages/code.html',
    title: 'code',
    template: 'code.pug',
    chunks: [ 'code' ]
  },
  {
    path: '/pages/contact.html',
    title: 'contact',
    template: 'code.pug'
  }
];
