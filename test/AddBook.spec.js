import { mount } from '@vue/test-utils';
import AddBook from '@/components/AddBook.vue'

describe('AddBook', () => {
  const wrapper = mount(AddBook);

  test('calls addBook function on click', () => {
    const addBook = jest.fn();

    wrapper.setData({ isbn: '9781643751849', title: 'Endpapers', author: 'Jennifer Savran Kelly'})
    wrapper.setMethods({addBook: addBook});

    wrapper.find('.addBook').trigger('click');

    expect(addBook).toHaveBeenCalled();
  });

  test('calls getBook function on click', () => {
    const getBook = jest.fn();

    wrapper.setData({ isbn: '9781643751849', title: 'Endpapers', author: 'Jennifer Savran Kelly' })
    wrapper.setMethods({ getBook: getBook });

    wrapper.find('.getBook').trigger('click');

    expect(getBook).toHaveBeenCalled();
  });
})
