import { mount } from '@vue/test-utils';
import BookList from '@/components/BookList.vue'

describe('BookList', () => {
  let mocks = {
    $store: { dispatch: jest.fn(), getters: {}, state: {booklist: {books: []}} }
  }
  const wrapper = mount(BookList, {mocks});

  test('calls sortBooks function on click', () => {
    const sortBooks = jest.fn();

    wrapper.setMethods({ sortBooks: sortBooks });

    wrapper.find('.sortBooks').trigger('click');

    expect(sortBooks).toHaveBeenCalled();
  });

  test('calls reverseSortDirection function on click', () => {
    const reverseSortDirection = jest.fn();

    wrapper.setMethods({ reverseSortDirection: reverseSortDirection });

    wrapper.find('.reverseSortDirection').trigger('click');

    expect(reverseSortDirection).toHaveBeenCalled();
  });
})
