import { ThesisUiPage } from './app.po';

describe('thesis-ui App', () => {
  let page: ThesisUiPage;

  beforeEach(() => {
    page = new ThesisUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
