import { CatalystPage } from './app.po';

describe('catalyst App', () => {
  let page: CatalystPage;

  beforeEach(() => {
    page = new CatalystPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
