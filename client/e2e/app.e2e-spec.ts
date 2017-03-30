import { Lieefu.ComPage } from './app.po';

describe('lieefu.com App', () => {
  let page: Lieefu.ComPage;

  beforeEach(() => {
    page = new Lieefu.ComPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
