import { mount } from '@vue/test-utils';
import Book from '@/components/Book.vue';

describe('Book', () => {
  const wrapper = mount(Book, {
    propsData: {
      book: {
        title: 'Endpapers',
        author: 'Jennifer Savran Kelly',
        isbn: '9781643751849',
        status: 0,
        rating: 0
      },
      rating: 0,
      status: 0,
      statuses: ['Unread', 'In Progress', 'Finished']
    }
  });

  test('calls updateBookDetails function on click', () => {
    const updateBookDetails = jest.fn();

    wrapper.setData({ isbn: '9781400096893', title: 'Memoirs of a Giesha', author: 'Arther Golden', editMode: true})
    wrapper.setMethods({ updateBookDetails: updateBookDetails });

    wrapper.find('.updateDetails').trigger('click');

    expect(updateBookDetails).toHaveBeenCalled();
  });

  test('calls updateBookStatus function on click', () => {
    const updateBookStatus = jest.fn();

    wrapper.setMethods({ updateBookStatus: updateBookStatus });

    wrapper.find('.updateStatus').trigger('click');

    expect(updateBookStatus).toHaveBeenCalled();
  });

  test('calls toggleEditMode function on click', () => {
    const toggleEditMode = jest.fn();

    wrapper.setMethods({ toggleEditMode: toggleEditMode });

    wrapper.find('.toggleEditMode').trigger('click');

    expect(toggleEditMode).toHaveBeenCalled();
  });

  test('calls removeBook function on click', () => {
    const removeBook = jest.fn();

    wrapper.setMethods({ removeBook: removeBook });

    wrapper.find('.removeBook').trigger('click');

    expect(removeBook).toHaveBeenCalled();
  });
})
