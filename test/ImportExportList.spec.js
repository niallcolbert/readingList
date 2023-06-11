import { mount } from '@vue/test-utils';
import ImportExportList from '@/components/ImportExportList.vue';

describe('ImportExportList', () => {
  const wrapper = mount(ImportExportList);

  test('calls exportToYAML function on click', () => {
    const exportToYAML = jest.fn();

    wrapper.setMethods({ exportToYAML: exportToYAML });

    wrapper.find('.toggleCollapse').trigger('click');
    wrapper.find('.exportToYAML').trigger('click');

    expect(exportToYAML).toHaveBeenCalled();
  });

  test('calls exportToPantry function on click', () => {
    const exportToPantry = jest.fn();

    wrapper.setData({ pantryId: '9781400096893', basketName: 'books' })
    wrapper.setMethods({ exportToPantry: exportToPantry });

    wrapper.find('.exportToPantry').trigger('click');

    expect(exportToPantry).toHaveBeenCalled();
  });

  test('calls importFromPantry function on click', () => {
    const importFromPantry = jest.fn();

    wrapper.setData({ pantryId: '9781400096893', basketName: 'books' })
    wrapper.setMethods({ importFromPantry: importFromPantry });

    wrapper.find('.importFromPantry').trigger('click');

    expect(importFromPantry).toHaveBeenCalled();
  });
})
